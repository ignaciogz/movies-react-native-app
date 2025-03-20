import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BookingScreen from '../../screens/BookingScreen';
import CandyBarScreen from '../../screens/CandyBarScreen';
import CartScreen from '../../screens/CartScreen';

const Stack = createNativeStackNavigator();

const CheckOutStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Booking"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="CandyBar" component={CandyBarScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default CheckOutStack;
