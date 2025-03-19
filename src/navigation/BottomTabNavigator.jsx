import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

import HomeStackNavigator from './stacks/HomeStackNavigator';
import ProfileStackNavigator from './stacks/ProfileStackNavigator';
import SearchStackNavigator from './stacks/SearchStackNavigator';
import TicketsStackNavigator from './stacks/TicketsStackNavigator';

import { COLORS, SPACE } from '../global/theme';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarHideOnKeyboard: true,
        headerShown: false,
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
                  size={24}
                  color={focused ? COLORS.YELLOW : COLORS.BLACK}
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <MaterialCommunityIcons
                  name="movie-search"
                  size={24}
                  color={focused ? COLORS.YELLOW : COLORS.BLACK}
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
                  size={24}
                  color={focused ? COLORS.YELLOW : COLORS.BLACK}
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
                  size={24}
                  color={focused ? COLORS.YELLOW : COLORS.BLACK}
                />
              </View>
            );
          }
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.ROSE,
    borderTopWidth: 0,
    height: SPACE.MD * 10
  },
});
