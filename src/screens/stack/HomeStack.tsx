import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS} from '../../constants/screens';
import HomeScreen from '../navigators/HomeScreen';
import {APPHEADER} from '../../constants/appHeaderNavigator';
import LoginScreen from '../login/LoginScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
      <Stack.Navigator initialRouteName={SCREENS.HOME.KEY}>
        <Stack.Screen
          name={SCREENS.HOME.KEY}
          options={{
            title: SCREENS.HOME.NAME,
            headerShown: APPHEADER.headerShown,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: APPHEADER.headerStyle.fontWeight,
              fontSize: APPHEADER.headerStyle.fontSize,
            },
          }}
          component={HomeScreen}
        />
        <Stack.Screen
          name={SCREENS.LOGIN.KEY}
          component={LoginScreen}
          options={{
            title: SCREENS.LOGIN.NAME,
            headerShown: APPHEADER.headerShown,
            headerTintColor: 'transparent',
            headerTitleStyle: {
              fontWeight: APPHEADER.headerStyle.fontWeight,
              fontSize: APPHEADER.headerStyle.fontSize,
            },
          }}
        />
      </Stack.Navigator>
  );
};

export default HomeStack;
