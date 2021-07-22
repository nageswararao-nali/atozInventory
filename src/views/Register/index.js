import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Layout from '@components/Layout';
import { Row, TextView, Utils, Input, Button } from '@components';
import {
  colorDanger,
  colorPrimary,
  colorGrayShade3,
  colorSecondary,
} from '@colors';
import {
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
  Alert,
} from 'react-native';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { sendOTP } from '@actions/auth';
import { connect } from 'react-redux';

Icon.loadFont();

const Register = ({ fetchOTP }) => {
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
    // setSubmitting,
    // isSubmitting,
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
      await fetchOTP({
        mobile: mobile,
        used_for: 'reg',
      });
      navigate('VerifyOTP', { from: 'signup', mobile });
    } catch (exception) {
      let errorMsg;
      if (exception.non_field_errors) {
        errorMsg = exception?.non_field_errors[0];
      }
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
              Let's get you started
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
            <Button style={Utils.my(16)} onPress={handleContinue}>
              <TextView textAlign="center" style={Utils.flex(1)}>
                Continue
              </TextView>
            </Button>
            <Row justifyContent="center" style={Utils.mt(32)}>
              <TextView fontWeight="bold">Create a</TextView>
              <Pressable style={Utils.ml(4)}>
                <TextView
                  fontWeight="bold"
                  color={colorPrimary}
                  textTransform="uppercase">
                  BUSINESS ACCOUNT
                </TextView>
              </Pressable>
            </Row>
            <Row justifyContent="center" style={Utils.mt(32)}>
              <TextView
                fontWeight="bold"
                textTransform="uppercase"
                color={colorGrayShade3}>
                I agree to the
              </TextView>
              <Pressable style={Utils.ml(4)}>
                <TextView
                  fontWeight="bold"
                  color={colorSecondary}
                  textTransform="uppercase">
                  Privacy Policy
                </TextView>
              </Pressable>
            </Row>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = null;

const mapDispatchToProps = { fetchOTP: sendOTP };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
