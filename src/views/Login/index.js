import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Layout from '@components/Layout';
import { Row, TextView, Utils, Input, Button } from '@components';
import { colorDanger } from '@colors';
import {
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
  Alert,
} from 'react-native';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { object, string } from 'yup';
import { sendOTP } from '@actions/auth';

Icon.loadFont();

const Login = ({ fetchOTP }) => {
  const { navigate, goBack } = useNavigation();

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    setFieldError,
    setFieldTouched,
    // resetForm,
    setSubmitting,
    isSubmitting,
  } = useFormik({
    initialValues: { mobile: '' },
    validationSchema: object().shape({
      mobile: string().trim().required().max(10).min(10),
    }),
  });

  const handleContinue = async () => {
    const { mobile } = values;
    if (mobile.length !== 10) {
      setFieldTouched({ mobile: true });
      setFieldError({ mobile: 'Please enter valid mobile number' });
      return;
    }
    
    try {
      setSubmitting(true);
      /*await fetchOTP({
        mobile: mobile,
        used_for: 'login',
      });*/
      setSubmitting(false);
      navigate('AtoZ', { screen: 'VerifyOTP', params: {from: 'login', mobile} });
    } catch (exception) {
      let errorMsg;
      if (exception.non_field_errors) {
        errorMsg = exception?.non_field_errors[0];
      }
      setSubmitting(false);
      Alert.alert(
        'Error',
        errorMsg || 'Failed to send OTP. Please try again later.',
      );
    }
    
    
  };

  return (
    <KeyboardAvoidingView
      style={Utils.flex(1)}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <Layout bgColor="white">
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={{ ...Utils.flexGrow(1), ...Utils.px(32) }}>
          <View
            style={{
              ...Utils.flex(1),
              ...Utils.mt(50),
            }}>
            <Row>
              <Pressable onPress={() => goBack()}>
                <Icon name="arrow-back" size={24} />
              </Pressable>
            </Row>
            <TextView fontWeight={600} fontSize={24} style={Utils.my(24)}>
              Login
            </TextView>
            <TextView style={Utils.mb(16)}>Mobile number</TextView>
            <Input
              placeholder="Enter 10 digit mobile number"
              style={Utils.mb(8)}
              onChangeText={handleChange('mobile')}
              onBlur={handleBlur('mobile')}
              value={values.mobile}
              keyboardType="numeric"
              blurOnSubmit={false}
              maxLength={10}
            />
            {touched.mobile && errors.mobile ? (
              <TextView color={colorDanger} fontSize={14}>
                {errors.mobile}
              </TextView>
            ) : null}
            <Button
              style={Utils.my(16)}
              onPress={handleContinue}
              disabled={isSubmitting}>
              <TextView textAlign="center" style={Utils.flex(1)}>
                {isSubmitting ? 'Please wait...' : 'Continue'}
              </TextView>
            </Button>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = null;

const mapDispatchToProps = {
  fetchOTP: sendOTP,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
