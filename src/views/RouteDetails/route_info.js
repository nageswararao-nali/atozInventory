import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import SwipeButton from 'rn-swipe-button';
import { colorGrayLight, colorPrimary } from '@colors';
import { getRouteDetailsData, getRouteSummary } from '@actions/route_details';
import { connect } from 'react-redux';
import {
  View,
  Text
} from 'react-native';
import Moment from 'moment';
import { startRoute, getRoute } from '@actions/route';
import { getRoutesData } from '@actions/routes';
import { Card } from 'react-native-elements'
const RouteInfo = ({ route, routeDetails, updateStartRoute, updateStartStatus, isLoading, routeInfo, fetchRoute, fetchRoutesData }) => {
	const [routeStartedStatus, setRouteStartedStatus] = useState(false);

  	// console.log("this.props.routeDetails")
  	// console.log(routeDetails)
  	const todayDate = Moment().format('YYYY-MM-DD')
  	// const routeDetails = props.routeDetails;
  	// console.log(props.routeDetails)
  	/*if(routeDetails.delivery_started_at) {
  		setRouteStartedStatus(true)
  	}*/
  	const updateSwipeStatusMessage = async () => {
    	console.log("am in route start ...")
    	try {
    		await updateStartRoute(routeDetails.id)
    		await fetchRoutesData(todayDate)
    		// await fetchRoute(todayDate, routeDetails.id)
    	} catch (error) {
    		console.log("error in update start route")
    		console.log(error)
    	}
    	// setRouteStartedStatus(true)
    	updateStartStatus()
  	}
  	useEffect(() => {
	    return () => {};
	  }, []);
  	const arrowIcon = () => <Icon name="arrow-forward" size={30} />;
    return (
    	<View>
    		{
    			routeDetails.delivery_started_at ?
    			<Card>
	    			<View style={{flexDirection: 'row'}}>
			        	<View style={{width: '50%', textAlign: 'center'}}>
			        		<Text style={{textAlign: 'center', fontWeight: 'bold'}}>Route Start Time</Text>
			        		<Text style={{textAlign: 'center'}}>{routeDetails.delivery_started_at ? Moment(routeDetails.delivery_started_at).format('hh:mm:ss') : 'start time'}</Text>
			        	</View>
			        	{
			        		routeDetails.delivery_ended_at && 
			        		<View style={{width: '50%', textAlign: 'center'}}>
				        		<Text style={{textAlign: 'center', fontWeight: 'bold'}}>Route End Time</Text>
				        		<Text style={{textAlign: 'center'}}>{routeDetails.delivery_ended_at ? Moment(routeDetails.delivery_ended_at).format('hh:mm:ss') : 'end time'}</Text>
				        	</View>
			        	}
			        	
			        </View>
		        </Card>
	        :
	        <SwipeButton
		            thumbIconBackgroundColor="#FFFFFF"
		            thumbIconComponent={arrowIcon}
		            title="Swipe to Start"
		            railStyles={{
		              backgroundColor: colorPrimary,
		              borderColor: "#FFFFFF",
		            }}
		            railBackgroundColor={colorGrayLight}
		            onSwipeSuccess={updateSwipeStatusMessage}
		        />
    		}
    		
    	</View>
    	
	)
}

const mapStateToProps = (state, ownProps) => {
	const isLoading = state.routeReducer.isLoading;
	const routeInfo = state.routeReducer.routeInfo;
	const routeDetails = ownProps.routeDetails;
	const updateStartStatus = ownProps.updateStartStatus;
	return {
		isLoading,
		routeInfo,
		routeDetails,
		updateStartStatus
	}
}


const mapDispatchToProps = {
  updateStartRoute: startRoute,
  fetchRoute: getRoute,
  fetchRoutesData: getRoutesData
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteInfo);