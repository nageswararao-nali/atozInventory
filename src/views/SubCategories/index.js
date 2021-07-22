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
  Alert,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { getSubCategories, deleteSubCategory } from '@actions/subcategories';
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
const SubCategories = ({ fetchSubCategoriesData, deleteSubCategoryFn, isLoading, subCategories, mobile }) => {
  const { navigate, goBack } = useNavigation();
  const [category, setCategory] = useState(null);
  const todayDate = Moment().format('YYYY-MM-DD')
  const init = async () => {
    try {
      console.log("calling subCategories list with date ", todayDate)
      await fetchSubCategoriesData({isCategory: false});
      console.log(subCategories)
    } catch (error) {
      console.log(error);
    }
  };

  // routes = [{"id":"1","createdAt":"2020-12-12T07:03:42.106Z","name":"KPHB","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/marcobarbosa/128.jpg"}];
  useEffect(() => {
    init();
    return () => {};
  }, []);

  const addSubCategory = () => {
    navigate('AddSubCategory')
  }
  const editSubCategory = (item) => {
    navigate('AddSubCategory', item)
  }

  const deleteSubCategoryEvent = (item) => {
    Alert.alert(
      'Delete Sub Category',
      'Are you sure to delete Sub Category',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Yes', onPress: () => {
          console.log("delete functionality  ....", item)
          deleteSubCategoryFn(item.id)
        } }
      ],
      { cancelable: false }
    );
  }

  

  if (isLoading) {
    return <Loader />;
  }
  

  return (
    <Layout bgColor="white">
      {
        subCategories.length ?
        <View style={styles.container}>
          <FlatList 
            keyExtractor={(item) => { return item.id + item.name}}
            data={subCategories}
            renderItem={({item}) => (
              <TouchableOpacity onLongPress={() => deleteSubCategoryEvent(item)} onPress={() => editSubCategory(item)}>
                  <Card>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width:'20%'}}>
                        <Image style={{width: 30, height: 30, borderRadius: 10}}  source={{uri: item.image}} />
                      </View>
                      <View>
                        <Text style={styles.routeName}>{item.name}</Text>
                      </View>
                    </View>
                  </Card>
              </TouchableOpacity>
              )}
          />
          
        </View>
        :
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataContent}>No Sub categories Found</Text>
        </View>
      }
      <View>
        <TouchableOpacity
          onPress={addSubCategory}
          style={styles.touchableOpacityStyle}>
            <Icon name="add" size={30} style={styles.floatingButtonStyle} />
          </TouchableOpacity>
      </View>
      
    </Layout>
  );
};

const mapStateToProps = ({ subCategoriesReducer: { isLoading, subCategories }, homeReducer: { mobile } }) => ({
  isLoading,
  subCategories,
  mobile
});

const mapDispatchToProps = {
  fetchSubCategoriesData: getSubCategories,
  deleteSubCategoryFn: deleteSubCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(SubCategories);
