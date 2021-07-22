import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';

import { PERMISSIONS, RESULTS, request, check } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';
import Layout from '@components/Layout';
import { Row, Col, TextView, Utils, Button } from '@components';
import { colorGrayLight, colorPrimary } from '@colors';
import { NavigationBar } from 'navigationbar-react-native';
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
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { closeOrder } from '@actions/order';
import { getRouteDetailsData } from '@actions/route_details';
import { capitalize } from 'lodash';
import Loader from '@components/Loader';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Card } from 'react-native-elements'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
// import { Separator } from 'native-base';

Icon.loadFont();
MCIcon.loadFont();

const initialLayout = { width: Dimensions.get('window').width };

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  secContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    padding: 10
  },
  lableForm: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: 10
  },
  labelName: {
    textTransform: 'uppercase',
    width: '25%'
  },
  labelValue: {
    fontWeight: 'bold'
  },
  addressText: {
    flexShrink: 1
  },
  rowAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:5,
    marginBottom: 5
  },
  lineStyle:{
    borderBottomColor: colorGrayLight,
    borderBottomWidth: 1,
    marginTop: 5,
    marginBottom: 5
  }
})




const OrderDetails = ({ route, updateOrder, isLoading, orderInfo, fetchRouteDetailsData, mobile }) => {
  const { navigate, goBack } = useNavigation();
  const [isSubmiting, setisSubmiting] = useState(false);
  const [totleQuantity, setTotleQuantity] = useState(0);
    console.log("params", route.params)
    const orderData = route.params.orderDetails;
    const routeStarted = route.params.routeStarted;
    const routeId = route.params.routeId;
  const init = async () => {
    try {
      // await fetchRouteDetailsData(params.id);
    } catch (error) {
      console.log(error);
    }
  };
  let totleQuantityCount = 0;
  orderData.items.map((prdData) => {
    totleQuantityCount = totleQuantityCount + prdData.quantity
  })
  // setTotleQuantity(totleQuantityCount)
  // console.log("routeData", routeData)
  /*const orderData = {
    
        shortName: "SMR 3B 303",
        address: "SMR FH and KPHB",
        products: [
          {
            productName: "BM",
            categoryName: "Milk",
            count: "2"
          },
          {
            productName: "CM",
            categoryName: "Curd",
            count: "1"
          }
        ],
        totalProducts: "3",
        id: "100234"
  }*/
  useEffect(() => {
    init();
    return () => {};
  }, []);

  const closeOrder = async () => {
    console.log("close order")
    setisSubmiting(true)
    try {
      await updateOrder(mobile, [orderData.id]);
      await fetchRouteDetailsData(routeId)
      goBack()
    } catch (error) {
      console.log(error);
    }
    setisSubmiting(false)
  }

  
  if (isLoading) {
    return <Loader />;
  }
  
  return (
    <Layout bgColor="white">
      <View style={styles.container}>
        <View style={styles.secContainer}>
          <View style={styles.lableForm}>
            <Text style={styles.labelName}>Order Id: </Text>
            <Text style={styles.labelValue}>{orderData.id}</Text>
          </View>
          <View style={styles.lableForm}>
            <Text style={styles.labelName}>Short Name: </Text>
            <Text style={styles.labelValue}>{orderData.block + ' ' + orderData.house}</Text>
          </View>
          <View style={styles.lableForm}>
            <Text style={styles.labelName}>Address: </Text>
            <Text style={[styles.labelValue, styles.addressText]}>{orderData.shipping_address}</Text>
          </View>
        </View>
        <View style={styles.secContainer}>
          <View style={[styles.lineStyle, styles.rowAlign]}>
            <Text style={{fontWeight: 'bold'}}>Total Quantity</Text>
            <Text style={{fontWeight: 'bold', marginRight: 30}}>{totleQuantityCount}</Text>
          </View>
          <View style={{marginBottom: 20}}>
            {
              orderData.items.map((productData) => (
                <View key={productData.variant_details} style={styles.rowAlign}>
                  <Text>{productData.variant_details}: </Text>
                  <Text style={{marginRight: 30}}>{productData.quantity}</Text>
                </View>
                
                ))
            }
          </View>
        </View>
        <View style={styles.secContainer}>
          <Text>{orderData.customer_note ? orderData.customer_note : 'Customer Note here ...'}</Text>
        </View>
        
        {
          routeStarted && 
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
            {
              orderData.delivered_at ?
              <Text style={{fontWeight: 'bold'}}>
                {'Delivered!'}
              </Text>
              : 
              <Button
                title="Close Order"
                color="#f194ff"
                onPress={closeOrder}
              >
                <Text style={{textAlign: 'center'}}>{isSubmiting ? 'Closing ...' : 'Close Order'}</Text>
              </Button>
            }
            
          </View>
        }
        
        
      </View>
      
    </Layout>
  );
};

const mapStateToProps = ({ orderReducer: { isLoading, orderInfo }, homeReducer: { mobile } }) => ({
  isLoading,
  orderInfo,
  mobile
});

const mapDispatchToProps = {
  updateOrder: closeOrder,
  fetchRouteDetailsData: getRouteDetailsData
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
