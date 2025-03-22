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
      /* initialRouteName="Tickets" */
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Booking" component={BookingScreen} />
      {/* <Stack.Screen name="CandyBar" component={CandyBarScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Tickets" component={TicketScreen} /> */}
    </Stack.Navigator>
  );
};

export default CinemaStackNavigator;
