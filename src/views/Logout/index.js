import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useNavigation, useRoute } from '@react-navigation/native';
import Layout from '@components/Layout';
import { Row, TextView, Utils } from '@components';
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
import { removeToken } from '@actions/auth';

Icon.loadFont();



const Logout = ({ doRemoveToken }) => {
  const { navigate, goBack } = useNavigation();
    async function handleLogout() {
      try {
        doRemoveToken();
        await AsyncStorage.removeItem('accessToken');
        navigate('AuthHome');
      } catch (exception) {
        console.log("exception")
        console.log(exception)
        let errorMsg;
        if (exception.non_field_errors) {
          errorMsg = exception?.non_field_errors[0];
        }
        Alert.alert(
          'Error',
          errorMsg || 'Failed to Logout. Please try again later.',
        );
      }
    }
    handleLogout()
  

  return (
    <View></View>
  );
};

const mapStateToProps = null;

const mapDispatchToProps = { doRemoveToken: removeToken };

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
