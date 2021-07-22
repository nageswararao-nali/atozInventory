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
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { getRoutesData } from '@actions/routes';
import { capitalize } from 'lodash';
import Loader from '@components/Loader';
import Moment from 'moment';

const { width } = Dimensions.get('window');

Icon.loadFont();
MCIcon.loadFont();

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  category: {
   // this should be dynamic based on screen width
   minWidth: '30%',
   maxWidth: '30%',
   maxHeight: '30%',
 },
  tileView: {
    // justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 20,
    borderColor: 'grey',
    borderWidth: 1,
    height: 150,
    // width: '75%',
    margin: 5
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
  }
})
const ChooseRoute = ({ fetchRoutesData, isLoading, routes, mobile }) => {
  const { navigate, goBack } = useNavigation();
  const [route, setRoute] = useState(null);
  const todayDate = Moment().format('YYYY-MM-DD')
  const init = async () => {
    try {
      console.log("calling routes list with date ", todayDate)
      // await fetchRoutesData(todayDate);
      console.log(routes)
    } catch (error) {
      console.log(error);
    }
  };

  // routes = [{"id":"1","createdAt":"2020-12-12T07:03:42.106Z","name":"KPHB","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/marcobarbosa/128.jpg"}];
  useEffect(() => {
    init();
    return () => {};
  }, []);

  const navigateToMap = async () => {
    try {
      const results = await check(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        }),
      );
      if (results === RESULTS.GRANTED) {
        navigate('Map');
      } else if (results === RESULTS.DENIED) {
        const reqResults = await request(
          Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          }),
        );
        if (reqResults === RESULTS.GRANTED) {
          navigate('Map');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleContinue = async () => {
    navigate('AddressForm');
  };

  /*if (isLoading) {
    return <Loader />;
  }*/
  const goToRouteDetails = (item) => {
    console.log(item)
    navigate('RouteDetails', item)
  }
  const getLocalTimeF = (isoDateTime) => {
    return new Date(isoDateTime)
  }
  /*let options = Object.keys(cities).map((item) => ({
    label: capitalize(item),
    value: item,
  }));*/

  return (
    <Layout bgColor="white">
      <View style={{marginTop: 10}}>
        <Row justifyContent="center">
          <TextView 
          textTransform="uppercase"
          fontWeight="bold"> {'Welcome'} </TextView>
        </Row>
        <Row justifyContent="center" style={{marginTop: 10}}>
          <TextView 
          textTransform="uppercase"
          fontWeight="bold" style={{color: colorPrimary, fontSize: 20}}> {mobile} </TextView>
        </Row>
        <TouchableOpacity onPress={()=> navigate('Categories')}>
            <Card>
              <View style={{flexDirection: 'row'}}>
                <View style={{width:'20%'}}>
                  <Image style={{width: 30, height: 30, borderRadius: 10}}  source={require('@images/logo.png')} />
                </View>
                <View>
                  <Text style={styles.routeName}>{'Categories'}</Text>
                </View>
              </View>
            </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigate('SubCategories')}>
            <Card>
              <View style={{flexDirection: 'row'}}>
                <View style={{width:'20%'}}>
                  <Image style={{width: 30, height: 30, borderRadius: 10}}  source={require('@images/logo.png')} />
                </View>
                <View>
                  <Text style={styles.routeName}>{'Sub Categories'}</Text>
                </View>
              </View>
            </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigate('Items')}>
            <Card>
              <View style={{flexDirection: 'row'}}>
                <View style={{width:'20%'}}>
                  <Image style={{width: 30, height: 30, borderRadius: 10}}  source={require('@images/logo.png')} />
                </View>
                <View>
                  <Text style={styles.routeName}>{'Items'}</Text>
                </View>
              </View>
            </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigate('Products')}>
            <Card>
              <View style={{flexDirection: 'row'}}>
                <View style={{width:'20%'}}>
                  <Image style={{width: 30, height: 30, borderRadius: 10}}  source={require('@images/logo.png')} />
                </View>
                <View>
                  <Text style={styles.routeName}>{'Products'}</Text>
                </View>
              </View>
            </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigate('Orders')}>
            <Card>
              <View style={{flexDirection: 'row'}}>
                <View style={{width:'20%'}}>
                  <Image style={{width: 30, height: 30, borderRadius: 10}}  source={require('@images/logo.png')} />
                </View>
                <View>
                  <Text style={styles.routeName}>{'Orders'}</Text>
                </View>
              </View>
            </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigate('Users')}>
            <Card>
              <View style={{flexDirection: 'row'}}>
                <View style={{width:'20%'}}>
                  <Image style={{width: 30, height: 30, borderRadius: 10}}  source={require('@images/logo.png')} />
                </View>
                <View>
                  <Text style={styles.routeName}>{'Users'}</Text>
                </View>
              </View>
            </Card>
        </TouchableOpacity>
        
      </View>
      { /*
      <View style={{marginTop: 10}}>
        <Row style={{marginLeft: 5, marginRight: 10}}>
         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
           <TouchableOpacity>
             <View style={styles.tileView}>
              <View style={{height: 100}}>
                <Image style={{width: 175, height: 125}}  source={require('@images/logo.png')}/>
              </View>
              <TextView 
              textTransform="uppercase"
              fontWeight="bold"> {'Categories'} </TextView>
            </View>
           </TouchableOpacity>
           <TouchableOpacity>
             <View style={styles.tileView}>
              <View style={{height: 100}}>
                <Image style={{width: 175, height: 125}}  source={require('@images/logo.png')}/>
              </View>
              <TextView 
              textTransform="uppercase"
              fontWeight="bold"> {'Sub Categories'} </TextView>
            </View>
           </TouchableOpacity>
         </View>
         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}> 
           <TouchableOpacity onPress={()=> navigate('Items')}>
             <View style={styles.tileView}>
              <View style={{height: 100}}>
                <Image style={{width: 175, height: 125}}  source={require('@images/logo.png')}/>
              </View>
              <TextView 
              textTransform="uppercase"
              fontWeight="bold"> {'Items'} </TextView>
            </View>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=> navigate('Products')}>
             <View style={styles.tileView}>
              <View style={{height: 100}}>
                <Image style={{width: 175, height: 125}}  source={require('@images/logo.png')}/>
              </View>
              <TextView 
              textTransform="uppercase"
              fontWeight="bold"> {'Products'} </TextView>
            </View>
           </TouchableOpacity>
         </View>
        </Row>
        <Row justifyContent="center" style={{marginTop: 10, marginLeft: 10, marginRight: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
           <TouchableOpacity onPress={()=> navigate('Orders')}>
             <View style={styles.tileView}>
              <View style={{height: 100}}>
                <Image style={{width: 125, height: 100}}  source={require('@images/logo.png')}/>
              </View>
              <TextView 
              textTransform="uppercase"
              fontWeight="bold"> {'Orders'} </TextView>
            </View>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=> navigate('SubCategories')}>
             <View style={styles.tileView}>
              <View style={{height: 100}}>
                <Image style={{width: 175, height: 125}}  source={require('@images/logo.png')}/>
              </View>
              <TextView 
              textTransform="uppercase"
              fontWeight="bold"> {'Sub Categories'} </TextView>
            </View>
           </TouchableOpacity>
         </View>
        </Row> 
      </View>
      */}
      
    </Layout>
  );
};

const mapStateToProps = ({ routesReducer: { isLoading, routes }, homeReducer: { mobile } }) => ({
  isLoading,
  routes,
  mobile
});

const mapDispatchToProps = {
  fetchRoutesData: getRoutesData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseRoute);
