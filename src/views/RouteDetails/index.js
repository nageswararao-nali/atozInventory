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
import { getRouteDetailsData, getRouteSummary } from '@actions/route_details';
import { startRoute, getRoute } from '@actions/route';
import { capitalize } from 'lodash';
import Loader from '@components/Loader';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Card, SearchBar } from 'react-native-elements'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
// import { Separator } from 'native-base';
// import arrowRight from './assets/arrow-right.png';
// import styles from './styles';
import RouteInfo from './route_info';

import SwipeButton from 'rn-swipe-button';

import Logo from '@images/logo.png';
import Moment from 'moment';

Icon.loadFont();
MCIcon.loadFont();

const initialLayout = { width: Dimensions.get('window').width };

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
  scene: {
    flex: 1,
  },
  tabStyle: {
    opacity: 1,
    width: '100%',
    
    backgroundColor: '#282f3f',
    textAlign: 'center'
  },
  tab: {
    
  },
  tabTitle: {
    fontSize: 300
  },
  headerContainer: {
    marginTop: 5,
    marginBottom: 5
  },
  searchContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10
  },
  routeTitleContent: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: colorPrimary
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


const ComponentLeft = (props) => {
  return(
    <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 10}} >
       <TouchableOpacity style={ {justifyContent:'center', flexDirection: 'row'}} onPress={() => props.goBacks()}>
        
        <Text style={{ color: 'white', }}>Back </Text>
      </TouchableOpacity>
    </View>
  );
};
 
const ComponentCenter = () => {
  return(
    <View style={{ flex: 1, }}>
      <View>
        <Text>Delivery Details</Text>
      </View>
    </View>
  );
};
 
const ComponentRight = () => {
  return(
    <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 10}}>
      <TouchableOpacity>
        <Text style={{ color: 'white', }}> </Text>
      </TouchableOpacity>
    </View>
  );
};

const RouteDetails = ({ route, fetchRouteDetailsData, fetchRouteSummary, isLoading, routeData, routeInfo, fetchRoute, routeSummary }) => {
  const { navigate, goBack } = useNavigation();
  // const [route, setRoute] = useState(null);
  const todayDate = Moment().format('YYYY-MM-DD')
  const [search, setSearch] = useState(null);
  const [isTabContent, setIsTabContent] = useState(false);
  // const [routeStarted, setrouteStarted] = useState(false);
    // console.log("routeInfoData", route.params)
    const routeId = route.params.id;
  let finalRouteData = {
    present: [],
    changes: [],
    no_orders: [],
    products: {}
  };
    // let routeInfoData = {}
    // const routeInfoData = route.params;
    /*if(routeInfo.delivery_started_at) {
      setrouteStarted(true)
    }*/
    let today = new Date();
    const dateValue = today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+ today.getFullYear();
    // console.log(dateValue);
  const init = async () => {
    console.log("am in init ", routeId)
    try {

      await fetchRoute(todayDate, routeId);
      await fetchRouteDetailsData(routeId);
      await fetchRouteSummary(routeId);

      getRoutesTabs()
      // routeInfoData = routeInfo
    } catch (error) {
      console.log("am in error ")
      console.log(error);
    }
  };
  // console.log("routeData", routeData)
  finalRouteData.present = routeData;
  finalRouteData.products = routeSummary;

  const gotoOrderDetails = (item) => {
    // console.log(item)
    const orderData = {
      orderDetails : item,
      routeStarted: routeInfo.delivery_started_at ? true : false,
      routeId: routeInfo.id
    }
    navigate('OrderDetails', orderData)
  }
  const refreshRouteData = () => {
    init();
  }
  const gotoMap = (finalRouteData) => {
    // console.log(finalRouteData)
    // console.log("map icon pressed");
    const routeData = {
      routeOrdersData : finalRouteData,
      routeStarted: routeInfo.delivery_started_at ? true : false,
      routeId: routeInfo.id
    }
    navigate('Map', routeData)
  }
  // console.log("routeData products", finalRouteData.products)
  useEffect(() => {
    init();
    return () => {
      finalRouteData = {
        present: [],
        changes: [],
        no_orders: [],
        products: {}
      }
      // routeId = "";
      setSearch(null);
      setIsTabContent(false)
    };
  }, []);

  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState([
    { key: 'present', title: 'Orders (0)' },
    // { key: 'changes', title: 'Changes ('  + finalRouteData.changes.length + ')' },
    // { key: 'no_orders', title: 'Orders ('  + finalRouteData.no_orders.length + ')' },
    { key: 'products', title: 'Products' },
  ]);
  const getRoutesTabs = () => {
    finalRouteData.present = routeData;
    setTimeout(() => {
      console.log("am in set routes fun", finalRouteData.present)
      console.log("am in set routes fun", finalRouteData.present.length)
      setRoutes( [
        { key: 'present', title: 'Orders (' + finalRouteData.present.length + ')' },
        // { key: 'changes', title: 'Changes ('  + finalRouteData.changes.length + ')' },
        // { key: 'no_orders', title: 'Orders ('  + finalRouteData.no_orders.length + ')' },
        { key: 'products', title: 'Products' },
      ])
      setIsTabContent(true)
    }, 1000)
    
  }
  
   const renderPresentItem = ({ item }) => (
    <TouchableOpacity onPress={() => gotoOrderDetails(item)}>
      <Card>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{item.block + ' ' + item.house}</Text>
          <Text>{'Order Qty ' + item.items.length}</Text>
          {
            item.delivered_at && 
            <View>
              <Icon name='checkmark-circle-outline' size={30} />
            </View>
          }
          
        </View>
        <Card.Divider/>
        <View style={{marginBottom: 20}}>
          {
            item.items.map((productData) => (
              <View key={Math.random()} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>{productData.variant_details} </Text>
                <Text> {productData.quantity} (Qty)</Text>
              </View>
              ))
          }
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>{item.customer_note ? item.customer_note : 'Customer note here'}</Text>
        </View>
        <Card.Divider/>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{marginRight: 20}}>{item.id}</Text>
          <Text style={{flexShrink: 1}}>{item.shipping_address}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
  
   const PresentRoute = () => (
      <View style={[styles.scene, {  }]} >
        <FlatList 
          data={finalRouteData.present}
          renderItem={renderPresentItem}
          keyExtractor={item =>  {return item.id + '_' + item.variant_details}}
        />
        <TouchableOpacity
          onPress={() => gotoMap(finalRouteData)}
          style={styles.touchableOpacityStyle}>
            <Icon name="location" size={30} style={styles.floatingButtonStyle} />
          </TouchableOpacity>
      </View>
    );
     
    const ChangesRoute = () => (
      <View style={[styles.scene, {  }]} />
    );
    const NoOrders = () => (
      <View style={[styles.scene, {  }]} />
    );
    const ProductsRoute = () => {
      // console.log("finalRouteData p", finalRouteData.products)
      // console.log("finalRouteData p1", finalRouteData.products.no_of_orders)
      return (
      <View style={[styles.scene, {  }]} >
        
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{marginLeft: 10}}>Total Orders</Text>
          <Text style={{marginRight: 10, fontWeight: 'bold'}}>{finalRouteData.products.no_of_orders}</Text>
        </View>
        <Card>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
            <Text>Category</Text>
            <Text>T.Qty</Text>
          </View>
          {
          finalRouteData.products.categories && Object.keys(finalRouteData.products.categories).map((productCategoryData) => (
          <Collapse>
            <CollapseHeader>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 10, backgroundColor: colorPrimary, paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5}}>
                  <Text>{productCategoryData}</Text>
                  <Text style={{fontWeight: 'bold'}}>{finalRouteData.products.categories[productCategoryData].categoryWiseCount}</Text>
                </View>
                <Card.Divider/>
            </CollapseHeader>
            <CollapseBody>
              <View style={{marginBottom: 20}}>
                {
                  finalRouteData.products.categories[productCategoryData].variants.map((productData) => (
                    <View key={Math.random()} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Text>{productData.name}:</Text>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{marginRight: 10, fontWeight: 'bold'}}>{productData.quantity}</Text>
                        <Text>Qty</Text>
                      </View>
                    </View>
                    ))
                }
              </View>
            </CollapseBody>
          </Collapse>
          ))
        }
        
        
        </Card>
      </View>
    )};
  const renderScene = SceneMap({
    present: PresentRoute,
    // changes: ChangesRoute,
    // no_orders: NoOrders,
    products: ProductsRoute,
  });

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

  if (isLoading) {
    return <Loader />;
  }
  const goToRouteDetails = (item) => {
    console.log(item)
  }
  
  const goBacksc = () => {
    goBack()
  }
  const updateSwipeStatusMessage = () => {
    console.log("am in update swipe status")
    // setrouteStarted(true)
    refreshRouteData()
  }

  /*let options = Object.keys(cities).map((item) => ({
    label: capitalize(item),
    value: item,
  }));*/
  const arrowIcon = () => <Icon name="arrow-forward" size={30} />;
  const mapIcon = () => <Icon name="location" size={30} />;
  return (
    <Layout bgColor="white">
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.routeTitleContent}>{routeInfo.name}</Text>
          <View style={styles.searchContent}>
            <Text style={{marginTop: 5, fontWeight: 'bold', color: colorPrimary}}>{dateValue}</Text>
            <View style={styles.searchContent}>
              { <View><Icon name="search" size={30} /></View>  }
              { /*<View>
                <SearchBar
                  placeholder="Type Here..."
                  onChangeText={serVal => setSearch(serVal)}
                  value={search}
                />
              </View> */}
              <View style={{marginLeft: 15}}>
                <TouchableOpacity onPress={() => refreshRouteData()}>
                  <Icon name="refresh" size={30} />
                </TouchableOpacity>
              </View>
            </View>
            
          </View>
        </View>
        {
          routeInfo.id && 
          <RouteInfo 
            routeDetails={routeInfo}
            updateStartStatus={updateSwipeStatusMessage}
          />
        }
        
        {
          finalRouteData.present && finalRouteData.present.length && isTabContent && <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={props => (
            <TabBar
              {...props}
              style={{ color: '#333', padding: 5, backgroundColor: 'white', marginBottom: 15 }}
              tabStyle={{ backgroundColor: 'white', fontWeight: 'bold' }}
              activeTabContainerStyle={{ backgroundColor: 'white', color: '#333' }}
              labelStyle={{ color: '#333', fontWeight: 'bold', fontSize: 13, textAlign: 'center' }}
            />
          )}
        />
        }
        
      </View>
    </Layout>
  );
};

const mapStateToProps = ({ routeDetailsReducer: { isLoading, routeData, routeSummary }, routeReducer: {routeInfo} }) => ({
  isLoading,
  routeData,
  routeSummary,
  routeInfo
});

const mapDispatchToProps = {
  fetchRouteDetailsData: getRouteDetailsData,
  fetchRouteSummary: getRouteSummary,
  fetchRoute: getRoute
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteDetails);
