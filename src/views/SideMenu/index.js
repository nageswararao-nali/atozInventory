/* eslint-disable global-require */

import * as React from 'react';
import { Image, Linking, TouchableHighlight, ToastAndroid, View } from 'react-native';
import {
  Text, Button,
  ListItem, Footer,
} from 'react-native-elements';
import Logo from '@images/logo.png';

import styles from './styles';
import { Utils, Row, SidebarLogo, TextView } from '@components';

import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';


const SideMenu = ({mobile, navigation}) => {
  // const { navigate } = useNavigation();
  // const navigation = navigation;
  return (
    <View style={{marginTop:30}}>
      <View>
        <SidebarLogo source={Logo} onPress={() => {
            navigation.navigate('Sidsfarm')
          }}
        />

      </View>
      <View>
        <ListItem style={styles.listItem}  onPress={() => { navigation.navigate('Logout')}}>
            <Text>Logout</Text>
        </ListItem>
      </View>
   </View>
          
  );
};

// export default SideMenu;
const mapStateToProps = (state, ownProps) => {
  const mobile = state.homeReducer.mobile
  const navigation = ownProps.navigation
  return {
    mobile, navigation
  }
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);