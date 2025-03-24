import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BookingScreen from '../../screens/BookingScreen';
// import CandyBarScreen from '../../screens/CandyBarScreen';
// import CartScreen from '../../screens/CartScreen';
// import TicketScreen from '../../screens/TicketScreen';

const Stack = createNativeStackNavigator();

const CinemaStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Booking"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={BookingScreen} name="Booking" />
      {/* <Stack.Screen component={CandyBarScreen} name="CandyBar" />
      <Stack.Screen component={CartScreen} name="Cart" />
      <Stack.Screen component={TicketScreen} name="Tickets" /> */}
    </Stack.Navigator>
  );
};

export default CinemaStackNavigator;
