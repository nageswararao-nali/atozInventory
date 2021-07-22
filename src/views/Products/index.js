import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';

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
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { getProducts } from '@actions/products';
import { deleteProduct } from '@actions/product';
import { getSubCategories } from '@actions/subcategories';
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
})
const ProductImageComponent = (props) => {
  console.log("props d", props.data.image)
  return(
    <Image style={{width: 100, height: 100}}  source={{uri: props.data.image}} />
  );
};
const Products = ({ fetchProductsData, fetchSubCategoriesData, deleteProductFn, isLoading, subCategories, products, mobile }) => {
  const { navigate, goBack } = useNavigation();
  const [category, setCategory] = useState(null);
  const [subCats, setSubCats] = useState([]);
  const todayDate = Moment().format('YYYY-MM-DD')
  const init = async () => {
    try {
      console.log("calling sub categories list with prod ", todayDate)
      await fetchSubCategoriesData({isCategory: false});
      
    } catch (error) {
      console.log(error);
    }
  };

  const getProductsFn = async () => {
    await fetchProductsData({categoryId: category, 'sortBy': 'createdAt:desc', 'limit': 1000})
  }

  useEffect(() => {
    console.log("subcategories")
    console.log(subCategories)
    if(subCategories.length) {
      let scats = subCategories.map((sCategory) => {
        return {label: sCategory.name, value: sCategory.id}
      })
      console.log(scats)
      setSubCats(scats)
      setCategory(scats[0].value)
    }
  }, [subCategories])

  useEffect(() => {
    if(category)
      getProductsFn()
    return () => ""
  }, [category])

  useEffect(() => {
    console.log("products ==>", products)
    return () => []
  }, [products])


  // routes = [{"id":"1","createdAt":"2020-12-12T07:03:42.106Z","name":"KPHB","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/marcobarbosa/128.jpg"}];
  useEffect(() => {
    init();
    return () => {};
  }, []);

  
  const handleContinue = async () => {
    navigate('AddressForm');
  };

  if (isLoading) {
    return <Loader />;
  }
  const goToRouteDetails = (item) => {
    console.log(item)
    navigate('RouteDetails', item)
  }
  const getLocalTimeF = (isoDateTime) => {
    return new Date(isoDateTime)
  }
  const addProduct = () => {
    navigate('AddProduct', category)
  }
  const editProduct = (item) => {
    console.log("calling edit")
    console.log(item)
    navigate('AddProduct', item)
  }

  
  const deleteProductEvent = (item) => {
    Alert.alert(
    'Delete Product',
    'Are you sure to delete Product',
    [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'Yes', onPress: () => {
        console.log("delete functionality  ....")
        deleteProductFn(item.id)
      } }
    ],
    { cancelable: false }
  );
  }
  
  /*let options = Object.keys(cities).map((item) => ({
    label: capitalize(item),
    value: item,
  }));*/

  return (
    <Layout bgColor="white">
    <View>
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
      {
        products.length ?
        <View style={styles.container}>
          <FlatList 
            keyExtractor={(item) => { return item.id + item.name}}
            data={products}

            renderItem={({item}) => (
              <TouchableOpacity onLongPress={() => deleteProductEvent(item)} onPress={() => editProduct(item)}>
                  <Card>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{height: 100}}>
                        { item.image ?
                          <Image style={{width: 100, height: 100, borderRadius: 10}}  source={{uri: item.image}} />
                          :
                          <Image style={{width: 175, height: 125, borderRadius: 10}}  source={require('@images/logo.png')} />
                        }
                      </View>
                      <View style={{marginLeft: 10}}>
                        <TextView 
                          textTransform="uppercase"
                          fontWeight="bold"> {item.name} </TextView>
                        <Text gray caption>Price: {item.price ? item.price : '0'}</Text>
                        <Text gray caption>Items: {item.isSingle ? 'Single' : 'Multiple'}</Text>
                        { !item.isSingle && <Text gray caption>No of Items: {item.items.length}</Text> }
                      </View>
                    </View>
                    
                    
                  </Card>
              </TouchableOpacity>
              )}
          />
          
        </View>
        :
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataContent}>No Products Found</Text>
        </View>
      }
      <View>
        <TouchableOpacity
          onPress={() => addProduct()}
          style={styles.touchableOpacityStyle}>
            <Icon name="add" size={30} style={styles.floatingButtonStyle} />
          </TouchableOpacity>
      </View>
      
    </Layout>
  );
};

const mapStateToProps = ({ productsReducer: { isLoading, products }, subCategoriesReducer: { subCategories }, homeReducer: { mobile } }) => ({
  isLoading,
  subCategories,
  products,
  mobile
});

const mapDispatchToProps = {
  fetchProductsData: getProducts,
  fetchSubCategoriesData: getSubCategories,
  deleteProductFn: deleteProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);

