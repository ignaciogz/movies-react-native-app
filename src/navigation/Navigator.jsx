import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import AuthStackNavigator from './stacks/AuthStackNavigator';
import BottomTabNavigator from './BottomTabNavigator';

const Navigator = () => {
  const {user} = useSelector((state) => state.user.value);

  return (
    <NavigationContainer>
      {
        user
          ? <BottomTabNavigator />
          : <AuthStackNavigator />
      }
    </NavigationContainer>
  );
};

export default Navigator;
