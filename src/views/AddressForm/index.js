import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Layout from '@components/Layout';
import { Row, TextView, Utils, Input, Button } from '@components';
import { colorDanger, colorPrimary } from '@colors';
import {
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
} from 'react-native';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import RadioForm from 'react-native-simple-radio-button';

Icon.loadFont();

const radioProps = [
  { label: 'Community/Apt', value: 0 },
  { label: 'Independent', value: 1 },
];

const initialValues = {
  propType: 'Community/Apt',
  plotNumber: '',
  buildingName: '',
  streetAddress: '',
  landmark: '',
};

const validationSchema = object().shape({
  propType: string().trim().required(),
  plotNumber: string().trim(),
  buildingName: string().trim(),
  streetAddress: string().trim(),
  landmark: string().trim(),
});

const AddressForm = () => {
  const { navigate, goBack } = useNavigation();

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    setFieldError,
    setFieldTouched,
    setFieldValue,
    // resetForm,
    // setSubmitting,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema,
  });

  const handleContinue = async () => {
    const { plotNumber } = values;
    if (!plotNumber.length) {
      setFieldTouched({ plotNumber: true });
      setFieldError({ plotNumber: 'Please enter plot number' });
      return;
    }
    navigate('Home');
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
              ...Utils.mt(36),
            }}>
            <Row style={Utils.mb(24)}>
              <Pressable onPress={() => goBack()}>
                <Icon name="arrow-back" size={24} />
              </Pressable>
            </Row>
            <RadioForm
              style={Utils.mb(16)}
              radio_props={radioProps}
              initial={0}
              formHorizontal={true}
              buttonColor={colorPrimary}
              selectedButtonColor={colorPrimary}
              buttonSize={10}
              onPress={(val) => setFieldValue('propType', val)}
              radioStyle={Utils.pr(16)}
            />
            <TextView style={Utils.mb(16)}>Plot/House No.</TextView>
            <Input
              placeholder="Enter Plot/House No."
              style={Utils.mb(8)}
              onChangeText={handleChange('plotNumber')}
              onBlur={handleBlur('plotNumber')}
              value={values.plotNumber}
              blurOnSubmit={false}
              maxLength={10}
            />
            {touched.plotNumber && errors.plotNumber ? (
              <TextView color={colorDanger} fontSize={14}>
                {errors.plotNumber}
              </TextView>
            ) : null}
            <TextView style={Utils.my(16)}>
              Apt Building Name (optional)
            </TextView>
            <Input
              placeholder="Enter Apt Building Name"
              style={Utils.mb(8)}
              onChangeText={handleChange('buildingName')}
              onBlur={handleBlur('buildingName')}
              value={values.buildingName}
              blurOnSubmit={false}
              maxLength={10}
            />
            {/* {touched.buildingName && errors.buildingName ? (
              <TextView color={colorDanger} fontSize={14}>
                {errors.buildingName}
              </TextView>
            ) : null} */}
            <TextView style={Utils.my(16)}>Street Address (optional)</TextView>
            <Input
              placeholder="Enter Street Address"
              style={Utils.mb(8)}
              onChangeText={handleChange('streetAddress')}
              onBlur={handleBlur('streetAddress')}
              value={values.streetAddress}
              blurOnSubmit={false}
              maxLength={10}
            />
            {/* {touched.streetAddress && errors.streetAddress ? (
              <TextView color={colorDanger} fontSize={14}>
                {errors.streetAddress}
              </TextView>
            ) : null} */}
            <TextView style={Utils.my(16)}>Landmark (optional)</TextView>
            <Input
              placeholder="Add Landmark"
              style={Utils.mb(8)}
              onChangeText={handleChange('landmark')}
              onBlur={handleBlur('landmark')}
              value={values.landmark}
              blurOnSubmit={false}
              maxLength={10}
            />
            {/* {touched.landmark && errors.landmark ? (
              <TextView color={colorDanger} fontSize={14}>
                {errors.landmark}
              </TextView>
            ) : null} */}
            <Button
              style={Utils.my(16)}
              onPress={handleContinue}
              disabled={isSubmitting}>
              <TextView textAlign="center" style={Utils.flex(1)}>
                {isSubmitting ? 'Please wait...' : 'Confirm & Finish'}
              </TextView>
            </Button>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default AddressForm;
