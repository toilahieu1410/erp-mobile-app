import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from '../../../constants/screens';
import Main from '../Main';
import ChangePasswordScreen from '../account/ChangePasswordScreen';
import {APPHEADER} from '../../../constants/appHeaderNavigator';
import HomeDetailScreen from '../home/HomeDetailScreen';
import SearchTaskScreen from '../task/SearchTaskScreen';

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
        name={SCREENS.HOMEDETAIL.KEY}
        component={HomeDetailScreen}
        options={{
          title: SCREENS.HOMEDETAIL.NAME,
          headerShown: APPHEADER.headerShown,
          headerTintColor: 'transparent',
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
      />
      <Stack.Screen
        name={SCREENS.SEARCHTASK.KEY}
        options={{
          title: SCREENS.SEARCHTASK.NAME,
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={SearchTaskScreen}
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
    </Stack.Navigator>
  );
};

export default MainStack;
