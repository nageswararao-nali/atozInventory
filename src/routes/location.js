import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ChooseCity from '@views/ChooseCity';

const { Navigator, Screen } = createStackNavigator();

const Auth = () => {
  return (
    <Navigator>
      <Screen
        name="ChooseCity"
        component={ChooseCity}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};

export default Auth;
