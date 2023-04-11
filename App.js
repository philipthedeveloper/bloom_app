import React, {useState, useEffect} from 'react';
import Context from './components/Context';
import Home from './screens/Home';
import Details from './screens/Details';
import Product from './screens/Product';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {PermissionsAndroid} from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    (async () => {
      await requestLocationPermission();
    })();
    return;
  }, []);

  return (
    <NavigationContainer>
      <Context>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            // gestureEnabled: true,
            // gestureDirection: "horizontal",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Product" component={Product} />
        </Stack.Navigator>
      </Context>
    </NavigationContainer>
  );
};

export default App;
