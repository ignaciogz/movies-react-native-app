import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, useNavigationState } from '@react-navigation/native';

import AppIcon from '../components/AppIcon';
import HomeStackNavigator from './stacks/HomeStackNavigator';
import CinemaStackNavigator from './stacks/CinemaStackNavigator';
//import ProfileStackNavigator from './stacks/ProfileStackNavigator';
import SearchStackNavigator from './stacks/SearchStackNavigator';

import { COLORS, FONT_SIZE } from '../global/theme';

const Tab = createBottomTabNavigator();

const routeMatch = (stateData,stackName, routeName) => {
  const currentRoute = stateData.routes[stateData.index];

  return currentRoute.name === stackName
          && currentRoute.state?.routes.find((r) => r.name === routeName);
}

const BottomTabNavigator = () => {
  const navigation = useNavigation();
  const state = useNavigationState((state) => state);
  const [cinemaIconColor, setCinemaIconColor] = useState(COLORS.YELLOW);

  useEffect(() => {
    if (state) {
      if (routeMatch(state, 'Cinema', 'CheckOut')) {
        setCinemaIconColor(COLORS.BLUE_LIGHT);
      } else if (routeMatch(state, 'Cinema', 'CandyBar')) {
        setCinemaIconColor(COLORS.ROSE);
      } else {
        setCinemaIconColor(COLORS.YELLOW);
      }
    }
  }, [state]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconOrigin;
          let iconColor;

          if (route.name === 'Movies') {
            iconName = 'local-movies';
            iconOrigin = 'MaterialIcons';
            iconColor = focused ? COLORS.VIOLET_LIGHT : COLORS.GREY;
          } else if (route.name === 'MovieSearch') {
            iconName = 'movie-search';
            iconOrigin = 'MaterialCommunityIcons';
            iconColor = focused ? COLORS.ORANGE : COLORS.GREY;
          } else if (route.name === 'Cinema') {
            iconName = 'ticket';
            iconOrigin = 'IonIcons';
            iconColor = focused ? cinemaIconColor : COLORS.GREY;
          } else if (route.name === 'UserProfile') {
            iconName = 'person';
            iconOrigin = 'IonIcons';
            iconColor = focused ? COLORS.RED : COLORS.GREY;
          }

          return (
            <View>
              <AppIcon
                icon={iconName}
                iconOrigin={iconOrigin}
                iconSize={FONT_SIZE.ICON_NAVIGATION}
                iconColor={iconColor}
              />
            </View>
          );
        },
      })}
      screenListeners={({ route }) => ({
        tabPress: (e) => {
          e.preventDefault();
          navigation.reset({
            index: 0,
            routes: [{ name: route.name }],
          });
        },
      })}
    >
      <Tab.Screen name="Movies" component={HomeStackNavigator} />
      <Tab.Screen name="MovieSearch" component={SearchStackNavigator} />
      <Tab.Screen name="Cinema" component={CinemaStackNavigator} />
      {/* <Tab.Screen name="UserProfile" component={ProfileStackNavigator} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
    borderColor: COLORS.GREY,
    borderTopWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    height: 64,
  },
});