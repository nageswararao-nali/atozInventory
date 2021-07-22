import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Utils, Row, Button, TextView } from '@components';
import Layout from '@components/Layout';
import { connect } from 'react-redux';
import { endRoute, getRoute } from '@actions/route';
import { getRouteDetailsData } from '@actions/route_details';
import { closeOrder } from '@actions/order';
import { getRoutesData } from '@actions/routes';
import Moment from 'moment';
import Loader from '@components/Loader';

Icon.loadFont();

const Map = ({ route, isLoading, updateEndRoute, fetchRoute, mobile, updateOrder, fetchRouteDetailsData, fetchRoutesData }) => {
  const { goBack, navigate } = useNavigation();
  const { routeOrdersData, routeStarted, routeId } = route.params;
  console.log("params in map")
  console.log(routeOrdersData)
  const todayDate = Moment().format('YYYY-MM-DD')
  const [coordinates, setCoordinates] = useState({
    latitude: 17.387140,
    longitude: 78.491684,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [isInitialized, setInitialized] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(({ coords }) => {
      console.log("coords")
      console.log(coords)
      /*setCoordinates({ ...coordinates, ...coords });
      setInitialized(true);*/
    });
    setInitialized(true);
    const watchId = Geolocation.watchPosition(({ coords }) => {
      /*console.log("watch coords")
      console.log(coords)
      setCoordinates({ ...coordinates, ...coords });
      console.log(coords);*/
    });
    const coords = {
      latitude: Number(routeOrdersData.present[0].latitude),
      longitude: Number(routeOrdersData.present[0].longitude)
    }
    setCoordinates({...coordinates, ...coords});
    return () => {
      if (watchId) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  const closeRoute = async () => {
    try {
      // await updateStartRoute(routeId)
      // await fetchRouteDetails(routeId)
      const orderIds = routeOrdersData.present.map((orderData) => {
        if(!orderData.delivered_at) {
          return orderData.id
        }
      })
      console.log("calling update order api ...")
      if(orderIds && orderIds.length) {
        await updateOrder(mobile, orderIds)
      }
      console.log("calling end route api ...")
      await updateEndRoute(routeId)
      console.log("calling get route api ...")
      await fetchRoute(todayDate, routeId);
      await fetchRouteDetailsData(routeId);
      console.log("not closed order ids", orderIds)
      await fetchRoutesData(todayDate)
    } catch(error) {
      console.log("error in end route")
    }
  }

  return (
    <Layout>
      { /*<Row
        style={{
          ...Utils.height(64),
          ...Utils.pl(16),
        }}
        alignItems="center">
        <Pressable
          onPress={() => goBack()}
          style={{
            ...Utils.my(20),
          }}>
          <Icon name="arrow-back" size={24} />
        </Pressable>
      </Row>
    */ }
      <MapView
        style={Utils.flex(1)}
        region={coordinates}>
        {
        routeOrdersData.present.map((presentData) => {
          if(presentData.latitude && presentData.longitude) {
          console.log("in mapp ", presentData.latitude)
          console.log("pin color ", presentData.delivered_at ? 'green' : 'red')
            return (
              <Marker
              key={presentData.shipping_address}
                coordinate={{
                  latitude: Number(presentData.latitude),
                  longitude: Number(presentData.longitude),
                }}
                title={presentData.shipping_address}
                pinColor={presentData.delivered_at ? 'green' : 'red'}
              />
            )
          }
        }
          
      
        )
        }
      </MapView>
      {
        routeStarted && 
        <Button
          style={Utils.justifyContent('center')}
          onPress={closeRoute}
          >
          <TextView
            textAlign="center"
            textTransform="uppercase"
            fontWeight="bold">
            {'Close Route'}
          </TextView>
        </Button>
      }
      
    </Layout>
  );
};

const mapStateToProps = (state, ownProps) => {
  const isLoading = state.routeReducer.isLoading;
  const routeInfo = state.routeReducer.routeInfo;
  const routeDetails = ownProps.routeDetails;
  const updateStartStatus = ownProps.updateStartStatus;
  const mobile = state.homeReducer.mobile;
  return {
    isLoading,
    routeInfo,
    routeDetails,
    updateStartStatus,
    mobile
  }
}


const mapDispatchToProps = {
  updateEndRoute: endRoute,
  fetchRoute: getRoute,
  updateOrder: closeOrder,
  fetchRouteDetailsData: getRouteDetailsData,
  fetchRoutesData: getRoutesData
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
