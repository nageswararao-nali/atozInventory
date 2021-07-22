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
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '@actions/items';
import { getOrders, rejectOrder, processOrder } from '@actions/order';
import { capitalize } from 'lodash';
import Loader from '@components/Loader';
import Moment from 'moment';

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
})
const Orders = ({ fetchOrersFn, deleteItemFn, isLoading, items, mobile, orders, rejectOrderFn, processOrderFn }) => {
  const { navigate, goBack } = useNavigation();
  const [item, setitem] = useState(null);
  const todayDate = Moment().format('YYYY-MM-DD')
  const init = async () => {
    try {
      console.log("calling items list with date ", todayDate)
      await fetchOrersFn();
      // console.log(items)
    } catch (error) {
      console.log(error);
    }
  };
console.log("orders")
console.log(orders)
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
  const goToEditItem = (item) => {
    console.log(item)
    navigate('addItem', item)
  }
  const getLocalTimeF = (isoDateTime) => {
    return new Date(isoDateTime)
  }
  const addItem = () => {
    navigate('addItem')
  }

  const rejectOrder = (orderId) => {
    Alert.alert(
    'Delete Item',
    'Are you sure to Reject Order',
    [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'Yes', onPress: () => {
        console.log("delete functionality  ....")
        rejectOrderFn(orderId)
      } }
    ],
    { cancelable: false }
  );
  }
  const processOrder = (orderId) => {
    Alert.alert(
    'Delete Item',
    'Are you sure to Accept Order',
    [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'Yes', onPress: () => {
        console.log("delete functionality  ....")
        processOrderFn(orderId)
        
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
      {
        orders.length ?
        <View style={styles.container}>
          <FlatList 
            keyExtractor={(item) => { return item.id }}
            data={orders}
            renderItem={({item}) => (
              <TouchableOpacity onLongPress={() => deleteItemAlert(item)} onPress={() => goToEditItem(item)}>
                  <Card>
                    <Text style={styles.routeName}>{item.name + "- " + item.mobile}</Text>
                    <Text style={styles.routeName}>Total Quantity: {item.totalItems ? item.totalItems : 0}</Text>
                    <Text style={styles.routeName}>Total Price: {item.totalValue ? item.totalValue : 0}</Text>
                    <Card.Divider/>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <Button 
                      onPress={() => processOrder(item.id)}
                      title="Accept" style={{backgroundColor: 'green', height:30}}>
                        <Text style={{textAlign: 'center'}}>Accept</Text>
                      </Button>
                      <Button 
                      onPress={() => rejectOrder(item.id)}
                      title="Accept"  style={{backgroundColor: 'grey', height: 30}}>
                        <Text style={{textAlign: 'center'}}>Reject</Text>
                      </Button>
                    </View>
                    
                  </Card>
              </TouchableOpacity>
              )}
          />
          
        </View>
        :
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataContent}>No Orders Found</Text>
        </View>
      }
    </Layout>
  );
};

const mapStateToProps = ({ itemsReducer: { items }, homeReducer: { mobile }, orderReducer: {isLoading, orders} }) => ({
  isLoading,
  items,
  mobile,
  orders
});

const mapDispatchToProps = {
  fetchOrersFn: getOrders,
  deleteItemFn: deleteItem,
  rejectOrderFn: rejectOrder,
  processOrderFn: processOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
