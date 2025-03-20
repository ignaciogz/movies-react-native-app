import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

import HomeStackNavigator from './stacks/HomeStackNavigator';
// import ProfileStackNavigator from './stacks/ProfileStackNavigator';
// import SearchStackNavigator from './stacks/SearchStackNavigator';
// import TicketsStackNavigator from './stacks/TicketStackNavigator';

import { COLORS, FONT_SIZE, SPACE } from '../global/theme';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
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
                <MaterialIcons
                  name="local-movies"
                  size={FONT_SIZE.ICON_NAVIGATION}
                  color={focused ? COLORS.WHITE : COLORS.VIOLET_LIGHT}
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
                <MaterialCommunityIcons
                  name="movie-search"
                  size={FONT_SIZE.ICON_NAVIGATION}
                  color={focused ? COLORS.WHITE : COLORS.VIOLET_LIGHT}
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Tickets"
        component={TicketsStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Ionicons
                  name="ticket"
                  size={FONT_SIZE.ICON_NAVIGATION}
                  color={focused ? COLORS.WHITE : COLORS.VIOLET_LIGHT}
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({focused})=> {
            return (
              <View>
                <Ionicons
                  name="person"
                  size={FONT_SIZE.ICON_NAVIGATION}
                  color={focused ? COLORS.WHITE : COLORS.VIOLET_LIGHT}
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
    backgroundColor: COLORS.BLACK,
    borderColor: COLORS.GREY,
    borderTopWidth: 2,
    height: SPACE.MD * 8,
    paddingTop: SPACE.LG * 1.5
  },
});
