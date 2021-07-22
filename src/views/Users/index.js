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
import { getUsers } from '@actions/users';
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
const Users = ({ fetchUsersFn, isLoading, users, mobile }) => {
  const { navigate, goBack } = useNavigation();
  const [item, setitem] = useState(null);
  const init = async () => {
    try {
      await fetchUsersFn({'sortBy': 'name'});
    } catch (error) {
      console.log(error);
    }
  };

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
    navigate('Register')
  }

  const deleteItemAlert = (item) => {
    Alert.alert(
    'Delete Item',
    'Are you sure to delete Item',
    [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'Yes', onPress: () => {
        console.log("delete functionality  ....")
        deleteItemFn(item.id)
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
        users.length ?
        <View style={styles.container}>
          <FlatList 
            keyExtractor={(item) => { return item.id + item.name}}
            data={users}
            renderItem={({item}) => (
              <TouchableOpacity onLongPress={() => deleteItemAlert(item)} onPress={() => goToEditItem(item)}>
                  <Card>
                    <Text style={styles.routeName}>{item.name + " - " + item.mobile}</Text>
                  </Card>
              </TouchableOpacity>
              )}
          />
          
        </View>
        :
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataContent}>No Items Found</Text>
        </View>
      }
      <View>
        <TouchableOpacity
          onPress={() => addItem()}
          style={styles.touchableOpacityStyle}>
            <Icon name="add" size={30} style={styles.floatingButtonStyle} />
          </TouchableOpacity>
      </View>
    </Layout>
  );
};

const mapStateToProps = ({ usersReducer: { isLoading, users }, homeReducer: { mobile } }) => ({
  isLoading,
  users,
  mobile
});

const mapDispatchToProps = {
  fetchUsersFn: getUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
