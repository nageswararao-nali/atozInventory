import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import InputSpinner from "react-native-input-spinner";
// import * as ImagePicker from 'react-native-image-picker';

import { PERMISSIONS, RESULTS, request, check } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';
import Layout from '@components/Layout';
import { Row, Col, TextView, Utils, Button } from '@components';
import { colorGrayLight, colorPrimary } from '@colors';
import { Card, SearchBar } from 'react-native-elements'
import {
  Pressable,
  KeyboardAvoidingView,
  SafeAreaView,
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
import { getItems } from '@actions/items';
import { getSubCategories } from '@actions/subcategories';
import { addProduct, clearProduct, updateProduct } from '@actions/product';
import { uploadImage } from '@actions/upload_image';
import { capitalize } from 'lodash';
import Loader from '@components/Loader';
import Moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';

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
    flexDirection: 'row',
    margin: 10
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
const AddProduct = ({ route, fetchItemsData, fetchSubCategoriesData, uploadProductImage, isLoading, producticonimage, productdisplayimage, productmainimage, subCategories, items, mobile, addProductFun, clearProductfn, updateProductFun }) => {
  const { navigate, goBack } = useNavigation();
  const [category, setCategory] = useState(null);
  const [subCats, setSubCats] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [mItems, setMItems] = useState([]);
  const [price, setPrice] = useState((route.params && route.params.price) ? route.params.price : 0);
  const [productName, setProductName] = useState((route.params && route.params.id) ? route.params.name : '');
  const [itemData, setItemData] = useState('');
  const todayDate = Moment().format('YYYY-MM-DD')
  const init = async () => {
    try {
      console.log("calling items list with prod ")
      console.log(route.params)
      console.log(price)
      await fetchItemsData();
      await fetchSubCategoriesData({isCategory: false});
      
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("icon images ", producticonimage)

  /*const getProductsFn = async () => {
    await fetchProductsData({categoryId: category})
    setTimeout(function(){ 
      console.log("products")
      console.log(products)
    }, 3000);
    
  }*/
  /*useEffect(() => {
    if(category)
      getProductsFn()
  }, [category])*/

  // routes = [{"id":"1","createdAt":"2020-12-12T07:03:42.106Z","name":"KPHB","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/marcobarbosa/128.jpg"}];
  useEffect(() => {
    init();
    return () => {};
  }, []);

  useEffect(() => {
    // console.log("subcategories")
    // console.log(subCategories)
    if(subCategories.length) {
      let scats = subCategories.map((sCategory) => {
        return {label: sCategory.name, value: sCategory.id}
      })
      // console.log(scats)
      setSubCats(scats)
      if(route.params && route.params.id) {
        setCategory(route.params.categoryId)
      }
      
      // setCategory(scats[0].value)
    }
  }, [subCategories]);

  useEffect(() => {
    if (items.length) {
      console.log("items list", items.length)
      let sItems = items.map((itemDa) => {
        return {name: itemDa.name, id: itemDa.id}
      })
      // console.log("sItems")
      // console.log(sItems)
      setMItems(sItems)
      if(route.params && route.params.id) {
        setItemsData(route.params.items)
      }
    }
  }, [items]);

  const addItem = () => {
    /*let itemD = {
      item: {},
      value: '',
      quantity: 0
    }
    // let itemsDTemp = itemsData;
    // itemsDTemp.push(itemD)
    // console.log("add item", itemsDTemp)
    console.log("itemd p start")
    setItemsData(arr => [...arr, itemD])
    console.log("item p end")*/
    /*let populatedItems = [...itemsData]
    populatedItems[index].item = itemData
    setItemsData(populatedItems);*/
    setItemsData(arr => [...arr, itemData])
    // controller.reset();
  }

  const deleteItem = (index) => {
    console.log("delete index")
    console.log(index)
    let itemsDatatemp = [...itemsData];
    itemsDatatemp.splice(index, 1);
    setItemsData(itemsDatatemp)
  }

  // console.log("itemsData")
  // console.log(itemsData)
  const handleContinue = async () => {
    navigate('AddressForm');
  };

  
  const goToRouteDetails = (item) => {
    console.log(item)
    navigate('RouteDetails', item)
  }
  const getLocalTimeF = (isoDateTime) => {
    return new Date(isoDateTime)
  }
  const addProductData = async () => {
    console.log("itemsData")
    console.log(itemsData)
    // navigate('AddProduct', category)
    /*let itemsD = itemsData.filter((item) => {
      return item.id
    })*/
    let productObj = {
        "name": productName,
        "price": price,
        "image": producticonimage ? producticonimage : ((route.params && route.params.image) ? route.params.image : ''),
        "displayImage": productdisplayimage ? productdisplayimage : ((route.params && route.params.displayImage) ? route.params.displayImage : ''),
        "mainImage": productmainimage ? productmainimage : ((route.params && route.params.mainImage) ? route.params.mainImage : ''),
        "status": "Active",
        "quantity": 0,
        "isSingle": itemsData.length > 1 ? false : true,
        "categoryId": category,
        "items": itemsData
    }
    console.log("productObj")
    console.log(productObj)
    if(route.params && route.params.id) {
      await updateProductFun(route.params.id, productObj)
    } else {
      await addProductFun(productObj)
    }
    
    await clearProductfn()
    navigate('Products')
  }

  const itemChangeEvent = (item) => {
    console.log("item.................")
    console.log(item)
    let selectedItems = items.filter((itemDa) => {
      return item.id == itemDa.id
    })
    // let populatedItems = [...itemsData]
    // populatedItems[index].item = selectedItems[0]
    // setItemsData(populatedItems);
    let itemD = {
      item: selectedItems[0],
      value: '',
      quantity: 0
    }
    // setSelectedItem(item.value)
    // setItemData(itemD)
    setItemsData(arr => [...arr, itemD])
  }
  const numChangeEvent = (num, index) => {
    let populatedItems = [...itemsData]
    populatedItems[index].quantity = num
    setItemsData(populatedItems);
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
  
  /*let options = Object.keys(cities).map((item) => ({
    label: capitalize(item),
    value: item,
  }));*/
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Layout bgColor="white">
    <View style={{flex:1}}>
    <ScrollView keyboardShouldPersistTaps='always'>
    
      <View style={{margin: 10}}>
        <TextInput
            placeholder="Enter Product Name"
            style={Utils.mb(8)}
            onChangeText={(text) => setProductName(text)}
            value={productName}
          />
      </View>
      <View style={{margin: 10}}>
        <TextInput
            placeholder="Enter Price"
            style={Utils.mb(8)}
            keyboardType='numeric'
            maxLength={5}
            onChangeText={(text) => setPrice(text)}
            value={price+""}
          />

      </View>
      <View style={styles.categoryDD}>
        <View style={{width: '100%'}}>
          <DropDownPicker
            placeholder="Select Sub Category"
            searchable={true}
            searchablePlaceholder="Search for Sub Category"
            items={subCats}
            defaultValue={category}
            containerStyle={{height: 40}}
            dropDownMaxHeight={250}
            zIndex={4000}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => setCategory(item.value)}
          />
        </View>
        
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10, marginLeft: 10}}>
         <View style={{width: '100%', marginRight: 5}} >
           {/*<DropDownPicker
              placeholder="Select Item"
              searchable={true}
              searchablePlaceholder="Search for an item"
              items={mItems}
              defaultValue={''}
              containerStyle={{height: 50}}
              dropDownMaxHeight={350}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                  justifyContent: 'flex-start'
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={item => itemChangeEvent(item)}
          />*/}
          <SafeAreaView>
          <SearchableDropdown
            onItemSelect={(item) => {
              itemChangeEvent(item)
            }}
            containerStyle={{ padding: 5 }}
            onRemoveItem={(item, index) => {
              
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 430 }}
            items={mItems}
            // defaultIndex={2}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Search Item",
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                },
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />
          </SafeAreaView>
         </View>
         { /* <View style={{width: '40%'}}>
          {
            <TouchableOpacity
                  style={[styles.addItemButton, styles.addProductButton]}
                  onPress={addItem}
                  >
                  <TextView textAlign="center" style={{color: 'white', fontWeight: 'bold'}}>
                    {'Add Item'}
                  </TextView>
                </TouchableOpacity>
          }
        </View> */ }
      </View>

      <View style={{marginTop: 10}}>
        {
          itemsData.map((itemD, key) => {
            return (
              <View key={key} style={{flexDirection: 'row', margin: 10}}>
                <View>
                  <TouchableOpacity onPress={() => deleteItem(key)}>
                    <Icon name="close-circle-outline" size={25} style={{marginTop: 5}}/>
                  </TouchableOpacity>
                </View>
                <View key={key} style={{width: '50%', marginRight: 5}}>
                  <Text style={{marginTop: 10}}>
                    {(itemD['item'] && itemD['item']['id']) ? itemD['item']['name'] : ''}
                  </Text>
                </View> 
                <View>
                  <InputSpinner
                    max={10000}
                    min={0}
                    step={1}
                    skin={"round"}
                    style={{minWidth: 150}}
                    colorMax={"#f04048"}
                    colorMin={colorPrimary}
                    height={35}
                    value={itemD['quantity'] ? itemD['quantity'] : 0}
                    onChange={num => numChangeEvent(num, key)}
                  />
                </View> 
              </View>
            )
          }) 
          
        }
      </View>
      
      {
        <View>
          <View style={{margin: 10}}>
            <Button
                title="Select image"
                onPress={() => uploadImageEvent('producticonimage')}
                  
              >
              <TextView textAlign="center" style={{color: 'white', fontWeight: 'bold'}}>
                      {'Add Icon Image'}
              </TextView>
            </Button>
            {
              producticonimage ? 
              <View style={{marginTop: 10, alignItems: 'center'}}>
                <Image style={{width: 100, height: 100}} source={{uri:producticonimage}} />
              </View>
              : null
            }
            {
              producticonimage == '' && (route.params && route.params.image)?  
              <View style={{marginTop: 10, alignItems: 'center'}}>
                <Image style={{width: 100, height: 100}} source={{uri:route.params.image}} />
              </View>
              : null
            }
            
          </View>
          <View style={{margin: 10}}>
            <Button
                title="Select image"
                onPress={() => uploadImageEvent('productdisplayimage')}
                  
              >
              <TextView textAlign="center" style={{color: 'white', fontWeight: 'bold'}}>
                      {'Add Display Image'}
              </TextView>
            </Button>
            {
              productdisplayimage ? 
              <View style={{marginTop: 10, alignItems: 'center'}}>
                <Image style={{width: 150, height: 150}} source={{uri:productdisplayimage}} />
              </View>
              : null
            }
            {
              productdisplayimage == '' && (route.params && route.params.displayImage)?  
              <View style={{marginTop: 10, alignItems: 'center'}}>
                <Image style={{width: 100, height: 100}} source={{uri:route.params.displayImage}} />
              </View>
              : null
            }
            
          </View>
          <View style={{margin: 10}}>
            <Button
                title="Select image"
                onPress={() => uploadImageEvent('productmainimage')}
                  
              >
              <TextView textAlign="center" style={{color: 'white', fontWeight: 'bold'}}>
                      {'Add Main Photo'}
              </TextView>
            </Button>
            {
              productmainimage ?
              <View style={{marginTop: 10, alignItems: 'center'}}>
                <Image style={{width: 200, height: 200}} source={{uri:productmainimage}} />
              </View>
              : null
            }
            {
              productmainimage == '' && (route.params && route.params.mainImage)?  
              <View style={{marginTop: 10, alignItems: 'center'}}>
                <Image style={{width: 100, height: 100}} source={{uri:route.params.mainImage}} />
              </View>
              : null
            }
            
          </View>
        </View>
        
      }
      

      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
        <TouchableOpacity onPress={() => addProductData()} style={styles.addProductButton}>
          <TextView textAlign="center" style={{color: 'white', fontWeight: 'bold'}}>
                  {(route.params && route.params.id) ? 'Update' : 'Add'}
          </TextView>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
    
      </View>
    </Layout>
  );
};

const mapStateToProps = ({ itemsReducer: { items }, productsReducer: { isLoading }, subCategoriesReducer: { subCategories }, homeReducer: { mobile }, uploadImageReducer: { producticonimage, productdisplayimage, productmainimage } }) => ({
  isLoading,
  subCategories,
  items,
  mobile,
  producticonimage,
  productdisplayimage,
  productmainimage
});

const mapDispatchToProps = {
  fetchItemsData: getItems,
  fetchSubCategoriesData: getSubCategories,
  uploadProductImage: uploadImage,
  addProductFun: addProduct,
  updateProductFun: updateProduct,
  clearProductfn: clearProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
