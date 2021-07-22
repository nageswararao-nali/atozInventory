import React from 'react';
import { StatusBar } from 'react-native';

import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import Router from '@routes';
import store from '@redux';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
