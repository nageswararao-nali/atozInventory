import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

import { setToken } from '@actions/auth';
import { colorPrimary } from '@colors';
import { Col, Utils } from '@components';
import Layout from '@components/Layout';

import AuthRoutes from '@routes/auth';
import HomeRoutes from '@routes/home';
import MainRoutes from '@routes/nav';

// import messaging from '@react-native-firebase/messaging';

const Route = ({ accessToken, doSetToken }) => {
  const [isLoading, setLoading] = useState(true);

  const init = async () => {
    /*try {
      let fcmToken = await AsyncStorage.getItem('@fcmToken');
      if (!fcmToken) {
        fcmToken = await messaging().getToken();
        await AsyncStorage.setItem('@fcmToken', fcmToken);
      }
      console.log("fcm token", fcmToken)
    } catch (error) {
      console.log('Error', JSON.stringify(error));
    }*/

    const token = await AsyncStorage.getItem('accessToken');

    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        console.log('access token expired');
        await AsyncStorage.removeItem('token');
        setLoading(false);
        return;
      }
      doSetToken(token);
    }
    setLoading(false);
  };

  useEffect(() => {
    init();

    /*const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      const { notification, sentTime } = remoteMessage;
      const { title, body } = notification;
      // const tempData = [...notifications, { title, body, sentTime }];
      // console.log(" noti ", tempData)
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
      const { notification, sentTime } = remoteMessage;
      const { title, body } = notification;
      // const tempData = [...notifications, { title, body, sentTime }];
      // console.log("remote noti ", tempData)
    });


    return unsubscribe;*/
  }, []);

  /*if (!accessToken && !isLoading) {
    return <MainRoutes />;
  }

  if (accessToken) {
    return <HomeRoutes />;
  }*/
  return <MainRoutes />

  /*return (
    <Layout>
      <Col alignItems="center" justifyContent="center" style={Utils.flex(1)}>
        <ActivityIndicator size="large" color={colorPrimary} />
      </Col>
    </Layout>
  );*/
};

const mapStateToProps = ({ homeReducer: { accessToken } }) => ({
  accessToken,
});

const mapDispatchToProps = {
  doSetToken: setToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(Route);
