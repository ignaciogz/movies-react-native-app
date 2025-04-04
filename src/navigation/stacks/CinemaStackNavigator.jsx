import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BookingScreen from '../../screens/BookingScreen';
import CandyBarScreen from '../../screens/CandyBarScreen';
import CheckOutScreen from '../../screens/CheckOutScreen';
import TicketScreen from '../../screens/TicketScreen';
import TicketsListScreen from '../../screens/TicketsListScreen';

const Stack = createNativeStackNavigator();

const CinemaStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tickets"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={BookingScreen} name="Booking" />
      <Stack.Screen component={CandyBarScreen} name="CandyBar" />
      <Stack.Screen component={CheckOutScreen} name="CheckOut" />
      <Stack.Screen component={TicketScreen} name="Ticket" />
      <Stack.Screen component={TicketsListScreen} name="Tickets" />
    </Stack.Navigator>
  );
};

export default CinemaStackNavigator;
