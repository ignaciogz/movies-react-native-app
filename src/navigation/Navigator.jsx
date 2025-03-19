import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

//import AuthStackNavigator from './stacks/AuthStackNavigator';
import BottomTabNavigator from './BottomTabNavigator';

const Navigator = () => {
  const [user, setUser] = useState(true);

  return (
    <NavigationContainer>
      {
        user
          ? <BottomTabNavigator />
          : <BottomTabNavigator />/* <AuthStackNavigator />*/
      }
    </NavigationContainer>
  );
};

export default Navigator;
