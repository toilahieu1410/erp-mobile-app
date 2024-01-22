import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from '../../../constans/screens';
import Main from '../Main';
import ChangePasswordScreen from '../account/ChangePasswordScreen';
import {APPHEADER} from '../../../constans/appHeaderNavigator';
import {TextStyle} from 'react-native';
import TaskOverviewScreen from '../task/TaskOverviewScreen';
import TodayTaskScreen from '../task/TodayTaskScreen';
import AllTaskScreen from '../task/AllTaskScreen';
import AddNewTaskScreen from '../task/AddNewTaskScreen';

const MainStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={SCREENS.MAIN.KEY}>
      <Stack.Screen
        name={SCREENS.MAIN.KEY}
        component={Main}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREENS.CHANGEPASSWORD.KEY}
        component={ChangePasswordScreen}
        options={{
          title: SCREENS.CHANGEPASSWORD.NAME,
          headerShown: APPHEADER.headerShown,
          headerTintColor: 'transparent',
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
      />
      <Stack.Screen
        name={SCREENS.TODAYTASK.KEY}
        options={{
          title: SCREENS.TODAYTASK.NAME,
          headerShown: APPHEADER.headerShown,
          navigationBarColor: 'transparent',
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={TodayTaskScreen}
      />

      <Stack.Screen
        name={SCREENS.TASKOVERVIEW.KEY}
        options={{
          title: SCREENS.TASKOVERVIEW.NAME,
          headerShown: APPHEADER.headerShown,
          navigationBarColor: 'transparent',
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={TaskOverviewScreen}
      />
      <Stack.Screen
        name={SCREENS.ALLTASK.KEY}
        options={{
          title: SCREENS.ALLTASK.NAME,
          headerShown: APPHEADER.headerShown,
          navigationBarColor: 'transparent',
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={AllTaskScreen}
      />

      <Stack.Screen
        name={SCREENS.ADDNEWTASK.KEY}
        options={{
          title: SCREENS.ADDNEWTASK.NAME,
          headerShown: APPHEADER.headerShown,
          navigationBarColor: 'transparent',
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={AddNewTaskScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
