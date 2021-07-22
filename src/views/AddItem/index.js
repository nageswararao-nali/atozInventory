import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import InputSpinner from "react-native-input-spinner";
import * as ImagePicker from 'react-native-image-picker';

import { PERMISSIONS, RESULTS, request, check } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';
import Layout from '@components/Layout';
import { Row, Col, TextView, Utils, Button } from '@components';
import { colorGrayLight, colorPrimary } from '@colors';
import { Card, SearchBar } from 'react-native-elements'
import {
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { addItem, updateItem } from '@actions/items';
import { capitalize } from 'lodash';
import Loader from '@components/Loader';
import Moment from 'moment';

const ScreenWidth = Dimensions.get("window").width;

Icon.loadFont();
MCIcon.loadFont();

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    margin: 20,
    padding: 20,
    backgroundColor: colorPrimary,
    textAlign: 'center'
  },
  routeName: {
    flexDirection: 'row',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  noDataContainer: {

  },
  noDataContent: {
    color: '#b02502',
    fontSize: 25,
    marginTop: 30,
    textAlign: 'center'
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: colorPrimary,
    borderRadius: 100
  },
  floatingButtonStyle: {
    // resizeMode: 'contain',
    width: 50,
    height: 50,
    left: 10,
    top: 10

    //backgroundColor:'black'
  },
  pItem: {
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 20,
    borderColor: 'grey',
    borderWidth: 1,
    height: 150,
    // width: '75%',
    margin: 5
  },
  categoryDD: {
    margin: 10,
  },
  addItemButton: {
    flexDirection: 'row-reverse',
    width:100
  },
  addProductButton: {
    alignItems: "center",
    backgroundColor: colorPrimary,
    padding: 10
  },
})
const AddItem = ({route, addItemFun, updateItemFn, isLoading}) => {
  const { navigate, goBack } = useNavigation();
  const [itemName, setItemName] = useState((route.params && route.params.id) ? route.params.name : '');
  const todayDate = Moment().format('YYYY-MM-DD')
  let itemDataObj = {}
  console.log("route.params")
  console.log(route.params)
  if(route.params && route.params.id) {
    itemDataObj = route.params
    // setItemName(itemDataObj.name)
    console.log("set name")
  }
  
  useEffect(() => {
    return () => {};
  }, []);

  
  const addItemData = async () => {
    // navigate('AddProduct', category)
    let itemObj = {
        "name": itemName,
        "status": 'Active'
    }
    console.log("itemObj")
    console.log(itemObj)
    if(route.params && route.params.id) {
      await updateItemFn(route.params.id, itemObj)
      navigate('Items')
    } else {
      await addItemFun(itemObj)
    }
    
    setItemName('')
    // navigate('Products')
  }

  

  return (
    <Layout bgColor="white">
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <View style={{margin: 10}}>
        <TextInput
            placeholder="Enter Item Name"
            style={Utils.mb(8)}
            onChangeText={(text) => setItemName(text)}
            value={itemName}
          />
      </View>
      
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
        <TouchableOpacity onPress={() => addItemData()} style={styles.addProductButton}>
          <TextView textAlign="center" style={{color: 'white', fontWeight: 'bold'}}>
                  {(route.params && route.params.id) ? 'Update Item' : 'Add Item'}
          </TextView>
        </TouchableOpacity>
      </View>
    </ScrollView>
    
      
    </Layout>
  );
};

const mapStateToProps = ({ itemsReducer: { isLoading }}) => ({
  isLoading
});

const mapDispatchToProps = {
  addItemFun: addItem,
  updateItemFn: updateItem
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
