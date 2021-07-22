import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useNavigation, useRoute } from '@react-navigation/native';
import Layout from '@components/Layout';
import { Row, TextView, Utils, Button } from '@components';
import { colorPrimary, colorGrayShade3, colorSecondary } from '@colors';
import {
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { verifyOTP } from '@actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken } from '@actions/auth';

Icon.loadFont();

const styles = StyleSheet.create({
  otpViewStyle: {
    height: 100,
    marginHorizontal: 24,
    marginTop: 24,
  },

  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: '#222',
    fontSize: 16,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});

const VerifyOTP = ({ validateOTP, doSetToken }) => {
  const { params } = useRoute();
  const { navigate, goBack } = useNavigation();
  console.log("params", params)
  
  const handleSubmit = async (otp) => {
    console.log("otp", otp)
    const { mobile } = params;
    const payload = {
      mobile,
      password: otp
    };
    console.log(payload)
    try {
      const resp = await validateOTP(payload);
      console.log("resp ......")
      console.log(resp)
      doSetToken(resp.tokens.access.token, resp.user.mobile);
      // await AsyncStorage.setItem('accessToken', resp.tokens.access.token);
      navigate('ChooseMenu');
    } catch (exception) {
      console.log(exception)
      let errorMsg;
      if (exception.non_field_errors) {
        errorMsg = exception?.non_field_errors[0];
      }
      Alert.alert(
        'Error',
        errorMsg || 'Failed to Validate Password. Please try again later.',
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
            <TextView fontWeight={600} fontSize={24} style={Utils.mt(24)}>
              Verify your Mobile
            </TextView>
            <TextView style={Utils.mt(8)}>
              Enter your 4 digit password
            </TextView>
            <OTPInputView
              style={styles.otpViewStyle}
              pinCount={4}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(code) => handleSubmit(code)}
            />
            {/* <Button style={Utils.mb(16)} onPress={handleSubmit}>
              <TextView textAlign="center" style={Utils.flex(1)}>
                Submit
              </TextView>
            </Button> */}
            { /*<Row justifyContent="center" style={Utils.mt(32)}>
              <TextView
                fontWeight="bold"
                textTransform="uppercase"
                color={colorGrayShade3}>
                Resend OTP in
              </TextView>
              {
                resendButtonDisabledTime > 0 && 
                <Pressable style={Utils.ml(4)}>
                  <TextView
                    fontWeight="bold"
                    color={colorSecondary}
                    textTransform="uppercase">
                    00:{resendButtonDisabledTime}
                  </TextView>
                </Pressable>
              }
              
              { resendButtonDisabledTime <= 0 &&
                <Button
                  style={Utils.my(16)}
                  onPress={resendOtp}
                >
                  <TextView textAlign="center" style={Utils.flex(1)}>
                    {'Resend'}
                  </TextView>
                </Button>
              }
            </Row>
            <Row justifyContent="center" style={Utils.mt(32)}>
              <Pressable>
                <TextView
                  fontWeight="bold"
                  color={colorPrimary}
                  textTransform="uppercase">
                  Call me Instead
                </TextView>
              </Pressable>
            </Row>
          */}
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = null;

const mapDispatchToProps = { validateOTP: verifyOTP, doSetToken: setToken };

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOTP);
