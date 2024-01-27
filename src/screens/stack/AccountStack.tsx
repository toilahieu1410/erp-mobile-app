import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS} from '../../../constans/screens';
import AccountScreen from '../navigators/AccountScreen';
import InforAccountScreen from '../account/InforAccountScreen';
import {APPHEADER} from '../../../constans/appHeaderNavigator';
import PayRollScreen from '../account/PayRollScreen';
const Stack = createStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator initialRouteName={SCREENS.ACCOUNT.KEY}>
      <Stack.Screen
        name={SCREENS.ACCOUNT.KEY}
        options={{
          title: SCREENS.ACCOUNT.NAME,
          headerShown: APPHEADER.headerShown,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={AccountScreen}
      />
      <Stack.Screen
        name={SCREENS.INFORACCOUNT.KEY}
        options={{
          title: SCREENS.INFORACCOUNT.NAME,
          headerShown: APPHEADER.headerShown,
          headerPressColor: 'transparent',
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={InforAccountScreen}
      />
      <Stack.Screen
        name={SCREENS.PAYROLL.KEY}
        options={{
          title: SCREENS.PAYROLL.NAME,
          headerShown: APPHEADER.headerShown,
          headerPressColor: 'transparent',
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={PayRollScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
