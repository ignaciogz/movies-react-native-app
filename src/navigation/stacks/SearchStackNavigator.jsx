import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MovieDetailScreen from '../../screens/MovieDetailScreen';
import SearchScreen from '../../screens/SearchScreen';

const Stack = createNativeStackNavigator();

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={SearchScreen} name="Search" />
      <Stack.Screen component={MovieDetailScreen} name="MovieDetail" />
    </Stack.Navigator>
  );
};

export default SearchStackNavigator;
