import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../../screens/ProfileScreen';
// import ProfileImageSelectorScreen from '../../screens/ProfileImageSelectorScreen';

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen component={ProfileImageSelectorScreen} name="ImageSelector"/> */}
      <Stack.Screen component={ProfileScreen} name="Profile" />
    </Stack.Navigator>
  );
}

export default ProfileStackNavigator;
