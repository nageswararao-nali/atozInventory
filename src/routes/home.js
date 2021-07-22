import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colorAccent, colorGray } from '@colors';

import Dashboard from '@views/Home';
import Products from '@views/Products';
import Notifications from '@views/Notifications';
import Account from '@views/Account';

const { Navigator, Screen } = createBottomTabNavigator();

Icon.loadFont();

const Home = () => {
  return (
    <Navigator
      initialRouteName="Dashboard"
      tabBarOptions={{
        activeTintColor: colorAccent,
        inactiveTintColor: colorGray,
        keyboardHidesTabBar: true,
      }}>
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Screen
        name="Products"
        component={Products}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="storefront" color={color} size={size} />
          ),
        }}
      />
      <Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="notifications-none" color={color} size={size} />
          ),
        }}
      />
      <Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Navigator>
  );
};

export default Home;
