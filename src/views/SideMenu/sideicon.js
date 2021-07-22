import React, { Component } from 'react';
 
import { StyleSheet, Platform, View, Text, Image, TouchableOpacity, YellowBox, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function HamburgerIcon(props) {
  const navigation = useNavigation();
  const toggleDrawer = () => {
    navigation.toggleDrawer();
  }
    return (
 
      <View style={{ flexDirection: 'row' }}>
 
        <TouchableOpacity onPress={toggleDrawer}>
 
          <Image
            source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png' }}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
 
        </TouchableOpacity>
 
      </View>
 
    );
 
 
  
}
export default HamburgerIcon;