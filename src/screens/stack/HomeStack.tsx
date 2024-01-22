import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS} from '../../../constans/screens';
import HomeScreen from '../navigators/HomeScreen';
import {APPHEADER} from '../../../constans/appHeaderNavigator';
import HomeDetailScreen from '../home/HomeDetailScreen';
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
        name={SCREENS.HOMEDETAIL.KEY}
        options={{
          title: SCREENS.HOMEDETAIL.NAME,
          headerShown: APPHEADER.headerShown,
          headerPressColor: 'transparent',
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={HomeDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
