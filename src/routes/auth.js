import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthHome from '@views/AuthHome';
import Login from '@views/Login';
import Logout from '@views/Logout';
import Register from '@views/Register';
import VerifyOTP from '@views/VerifyOTP';
// import ChooseCity from '@views/ChooseCity';
import ChooseMenu from '@views/ChooseMenu';
import Categories from '@views/Categories';
import AddCategory from '@views/Categories/add';
import SubCategories from '@views/SubCategories';
import AddSubCategory from '@views/SubCategories/add';
import Items from '@views/Items';
import AddItem from '@views/AddItem';
import Products from '@views/Products';
import AddProduct from '@views/AddProduct';
import Orders from '@views/Orders';
import Users from '@views/Users';

import Map from '@views/Map';
import AddressForm from '@views/AddressForm';
import HomeRoutes from '@routes/home';
import RouteDetails from '@views/RouteDetails';
import OrderDetails from '@views/OrderDetails';
import SideIcon from '@views/SideMenu/sideicon';
import { colorGrayLight, colorPrimary } from '@colors';

const { Navigator, Screen } = createStackNavigator();

const Auth = (props) => {
  return (
    <Navigator screenOptions={{
        headerStyle: {
          backgroundColor: colorPrimary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      { /* <Screen
        name="AuthHome"
        component={AuthHome}
        options={{ headerShown: false }}
      /> */ }
      <Screen name="Login" component={Login} options={{ headerShown: false }} /> 
      <Screen name="Logout" component={Logout} options={{ headerShown: false }} /> 
      {
        <Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
      }
      
      { <Screen
        name="VerifyOTP"
        component={VerifyOTP}
        options={{ headerShown: false }}
      />  }
      
      <Screen
        name="ChooseMenu"
        component={ChooseMenu}
        options={{ 
          headerShown: true, 
          headerTitleStyle: { marginLeft: '25%' },
          title: 'Choose Options', 
          headerLeft: () => <SideIcon />,
          
        }}
      />
      <Screen
        name="Categories"
        component={Categories}
        options={{ 
          headerShown: true, 
          headerTitleStyle: { marginLeft: '25%' },
          title: 'Categories', 
          
        }}
      />
      <Screen
        name="AddCategory"
        component={AddCategory}
        options={{ 
          headerShown: true, 
          headerTitleStyle: { marginLeft: '25%' },
          title: 'Add Category', 
          
        }}
      />
      <Screen
        name="SubCategories"
        component={SubCategories}
        options={{ 
          headerShown: true, 
          headerTitleStyle: { marginLeft: '25%' },
          title: 'Sub Categories', 
          
        }}
      />
      <Screen
        name="AddSubCategory"
        component={AddSubCategory}
        options={{ 
          headerShown: true, 
          headerTitleStyle: { marginLeft: '25%' },
          title: 'Add Sub Category', 
          
        }}
      />
      <Screen
        name="Items"
        component={Items}
        options={{ 
          headerShown: true, 
          headerTitleStyle: { marginLeft: '25%' },
          title: 'Items', 
          
        }}
      />
      <Screen
        name="Orders"
        component={Orders}
        options={{ 
          headerShown: true, 
          headerTitleStyle: { marginLeft: '25%' },
          title: 'Orders', 
          
        }}
      />
      <Screen
        name="Users"
        component={Users}
        options={{ 
          headerShown: true, 
          headerTitleStyle: { marginLeft: '25%' },
          title: 'Users', 
          
        }}
      />
      <Screen
        name="addItem"
        component={AddItem}
        options={{ 
          headerShown: true, 
          headerTitleStyle: { marginLeft: '25%' },
          title: 'Add Item', 
          
        }}
      />
      <Screen
        name="Products"
        component={Products}
        options={{ 
          headerShown: true, 
          headerTitleStyle: { marginLeft: '25%' },
          title: 'Products', 
          
        }}
      />
      <Screen
        name="AddProduct"
        component={AddProduct}
        options={{ 
          headerShown: true, 
          headerTitleStyle: { marginLeft: '25%' },
          title: 'Add Product', 
          
        }}
      />
      <Screen
        name="RouteDetails"
        component={RouteDetails}
        options={{ 
          headerShown: true, 
          headerTitleStyle: { alignSelf: 'center' },
          title: 'Delivery Details',
          
        }}
      />
      <Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{ 
          headerShown: true, 
          headerTitleStyle: { alignSelf: 'center' },
          title: 'Order Details',
          
        }}
      />
      <Screen 
        name="Map" 
        component={Map} 
        options={{ 
          headerShown: true,
          headerTitleStyle: { alignSelf: 'center' },
          title: 'Route Points' 
        }} 
      />
      <Screen
        name="AddressForm"
        component={AddressForm}
        options={{ headerShown: false }}
      />
      <Screen
        name="Home"
        component={HomeRoutes}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};

export default Auth;
