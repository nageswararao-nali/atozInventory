import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import InputSpinner from "react-native-input-spinner";
// import * as ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

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
import { addCategory } from '@actions/categories';
import { uploadImage } from '@actions/upload_image';
import { clearProduct } from '@actions/product';
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
const AddCategory = ({ addCategoryFun, categoryimage, uploadProductImage, clearProductfn, isLoading}) => {
  const { navigate, goBack } = useNavigation();
  const [categoryName, setCategoryName] = useState('');
  const todayDate = Moment().format('YYYY-MM-DD')
  
  useEffect(() => {
    return () => {};
  }, []);

  
  const addCategoryData = async () => {
    // navigate('AddProduct', category)
    let itemObj = {
        "name": categoryName,
        "image": categoryimage,
        "isCategory": true,
        "status": 'Active'
    }
    console.log("itemObj")
    console.log(itemObj)
    await addCategoryFun(itemObj)
    await clearProductfn()
    setCategoryName('')
    // navigate('Products')
  }
  const uploadImageEvent = (type) => {
    ImagePicker.openPicker({
      cropping: true,
      freeStyleCropEnabled: true,
      avoidEmptySpaceAroundImage: true
    }).then(image => {
      console.log(image);
      const data = new FormData();
      data.append('name', 'avatar');
      data.append('imageType', type);
      data.append('fileData', {
        uri : Platform.OS === "android"
            ? image.path
            : image.path.replace("file://", ""),
        type: 'image/png',
        name: image.path.split("/").pop()
      });
      console.log("kupload data")
      console.log(data)
      console.log(data.fileData)
      uploadProductImage(data)
    });

    /*ImagePicker.launchImageLibrary(
    // ImagePicker.launchCamera(
        {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 200,
          maxWidth: 200,
        },
        (response) => {
          // setResponse(response);
          const data = new FormData();
          data.append('name', 'avatar');
          data.append('imageType', type);
          data.append('fileData', {
            uri : response.uri,
            type: response.type,
            name: response.fileName
          });
          console.log("kupload data")
          console.log(data)
          console.log(data.fileData)
          uploadProductImage(data)
        }
      )*/
  }
  

  return (
    <Layout bgColor="white">
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <View style={{margin: 10}}>
        <TextInput
            placeholder="Enter Category Name"
            style={Utils.mb(8)}
            onChangeText={(text) => setCategoryName(text)}
            value={categoryName}
          />
      </View>
      <View style={{margin: 10}}>
        <Button
            title="Select image"
            onPress={() => uploadImageEvent('categoryimage')}
              
          >
          <TextView textAlign="center" style={{color: 'white', fontWeight: 'bold'}}>
                  {'Add Category Image'}
          </TextView>
        </Button>
        {
          categoryimage ? 
          <View style={{marginTop: 10, alignItems: 'center'}}>
            <Image style={{width: 100, height: 100}} source={{uri:categoryimage}} />
          </View>
          : null
        }
        
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
        <TouchableOpacity onPress={() => addCategoryData()} style={styles.addProductButton}>
          <TextView textAlign="center" style={{color: 'white', fontWeight: 'bold'}}>
                  {'Add Category'}
          </TextView>
        </TouchableOpacity>
      </View>
    </ScrollView>
    
      
    </Layout>
  );
};

const mapStateToProps = ({ categoriesReducer: { isLoading}, uploadImageReducer: { categoryimage }}) => ({
  isLoading,
  categoryimage
});

const mapDispatchToProps = {
  addCategoryFun: addCategory,
  uploadProductImage: uploadImage,
  clearProductfn: clearProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);
