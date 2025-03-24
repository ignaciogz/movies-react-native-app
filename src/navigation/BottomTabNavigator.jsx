import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AppIcon from '../components/AppIcon';
import HomeStackNavigator from './stacks/HomeStackNavigator';
import CinemaStackNavigator from './stacks/CinemaStackNavigator';
// import ProfileStackNavigator from './stacks/ProfileStackNavigator';
// import SearchStackNavigator from './stacks/SearchStackNavigator';

import { COLORS, FONT_SIZE, SPACE } from '../global/theme';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}
    >

      <Tab.Screen
        name="Movies"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <AppIcon
                  icon="local-movies"
                  iconOrigin="MaterialIcons"
                  iconSize={FONT_SIZE.ICON_NAVIGATION}
                  iconColor={focused ? COLORS.WHITE : COLORS.VIOLET_LIGHT}
                />
              </View>
            );
          },
        }}
      />

      {/* <Tab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <AppIcon
                  icon="movie-search"
                  iconOrigin="MaterialCommunityIcons"
                  iconSize={FONT_SIZE.ICON_NAVIGATION}
                  iconColor={focused ? COLORS.WHITE : COLORS.VIOLET_LIGHT}
                />
              </View>
            );
          },
        }}
      /> */}

      <Tab.Screen
        name="Cinema"
        component={CinemaStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <AppIcon
                  icon="ticket"
                  iconOrigin="IonIcons"
                  iconSize={FONT_SIZE.ICON_NAVIGATION}
                  iconColor={focused ? COLORS.WHITE : COLORS.VIOLET_LIGHT}
                />
              </View>
            );
          },
        }}
      />

      {/* <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({focused})=> {
            return (
              <View>
                <AppIcon
                  icon="person"
                  iconOrigin="IonIcons"
                  iconSize={FONT_SIZE.ICON_NAVIGATION}
                  iconColor={focused ? COLORS.WHITE : COLORS.VIOLET_LIGHT}
                />
              </View>
            );
          }
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
    borderColor: COLORS.GREY,
    borderTopWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    height: SPACE.MD * 8,
  },
});
