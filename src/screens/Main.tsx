import React, { useEffect } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {SCREENS} from '../constants/screens';
import {Image, Text, View} from 'react-native';
import {COLORS, IMAGES} from '../constants/screens';
import NotificationScreen from './navigators/NotificationScreen';
import HomeStack from './stack/HomeStack';
import AccountStack from './stack/AccountStack';
import TaskStack from './stack/TaskStack';

const Main = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={SCREENS.HOMESTACK.KEY}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name={SCREENS.HOMESTACK.KEY}
        component={HomeStack}
        options={{
          tabBarLabel: SCREENS.HOMESTACK.NAME,
          tabBarShowLabel: true,
          tabBarLabelStyle: {fontSize: 12},
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={IMAGES.HOME}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.PRIMARY : COLORS.GRAY,
              }}
            />
          ),
          tabBarActiveTintColor: COLORS.PRIMARY,
          tabBarInactiveTintColor: COLORS.GRAY,
        }}
      />
      <Tab.Screen
        name={SCREENS.TASKSTACK.KEY}
        component={TaskStack}
        options={{
          headerShown: false,
          tabBarLabel: SCREENS.TASKSTACK.NAME,
          tabBarShowLabel: true,
          tabBarLabelStyle: {fontSize: 12},
          tabBarIcon: ({focused}) => (
            <Image
              source={IMAGES.TASK}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.PRIMARY : COLORS.GRAY,
              }}
            />
          ),
          tabBarActiveTintColor: COLORS.PRIMARY,
          tabBarInactiveTintColor: COLORS.GRAY,
        }}
      />
      <Tab.Screen
        name={SCREENS.NOTIFICATION.KEY}
        component={NotificationScreen}
        options={{
          headerShown: false,
          tabBarLabel: SCREENS.NOTIFICATION.NAME,
          tabBarShowLabel: true,
          tabBarLabelStyle: {fontSize: 12},
          tabBarIcon: ({focused}) => (
            <View className="relative">
              <Image
                source={IMAGES.NOTIFICATION}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? COLORS.PRIMARY : COLORS.GRAY,
                }}
              />
              <View className="absolute right-[-5px] bg-red-500 rounded-full min-w-[18px] h-[18px]  top-[1px] p-[1px]">
                <Text className="text-center text-xs font-bold text-white">
                  99+
                </Text>
              </View>
            </View>
          ),
          tabBarActiveTintColor: COLORS.PRIMARY,
          tabBarInactiveTintColor: COLORS.GRAY,
        }}
      />
      <Tab.Screen
        name={SCREENS.ACCOUNTSTACK.KEY}
        component={AccountStack}
        options={{
          headerShown: false,
          tabBarLabel: SCREENS.ACCOUNTSTACK.NAME,
          tabBarShowLabel: true,
          tabBarLabelStyle: {fontSize: 12},
          tabBarIcon: ({focused}) => (
            <Image
              source={IMAGES.USER}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.PRIMARY : COLORS.GRAY,
              }}
            />
          ),
          tabBarActiveTintColor: COLORS.PRIMARY,
          tabBarInactiveTintColor: COLORS.GRAY,
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
