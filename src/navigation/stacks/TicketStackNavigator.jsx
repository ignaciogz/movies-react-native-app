import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TicketScreen from '../../screens/TicketScreen';

const Stack = createNativeStackNavigator();

const TicketStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tickets"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tickets" component={TicketScreen} />
    </Stack.Navigator>
  );
};

export default TicketStackNavigator;
