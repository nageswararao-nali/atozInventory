import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  Text, Container, Button,
  List, ListItem, Content, Footer,
} from 'react-native-elements';
import Sidebar from '@views/SideMenu';
import SideIcon from '@views/SideMenu/sideicon';
import AuthHome from '@views/AuthHome';
// import VerifyOTP from '@views/VerifyOTP';

import stackNav from '@routes/auth';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="AuthHome" drawerContent={(props) => <Sidebar {...props} />}>
      <Drawer.Screen name="AtoZ" component={stackNav} />
      <Drawer.Screen name="AuthHome" component={AuthHome} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;

/*const drawernav = createDrawerNavigator({
  Home: {
      screen: stackNav,
    }
  }, {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,  
});

export default drawernav;*/