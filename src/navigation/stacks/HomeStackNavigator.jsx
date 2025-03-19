import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../screens/HomeScreen';
//import MovieDetailScreen from '../screens/MovieDetailScreen';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen component={HomeScreen} name="Home" />
      {/* <Stack.Screen component={MovieDetailScreen} name="MovieDetail" /> */}
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
