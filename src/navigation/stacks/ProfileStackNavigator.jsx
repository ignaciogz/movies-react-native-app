import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ImageSelectorScreen from '../../screens/ImageSelectorScreen';
import ProfileScreen from '../../screens/ProfileScreen';

const Stack = createNativeStackNavigator()

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Image Selector" component={ImageSelectorScreen} />
    </Stack.Navigator>
  );
}

export default ProfileStackNavigator;
