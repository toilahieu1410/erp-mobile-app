import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS} from '../../../constans/screens';
import HomeScreen from '../navigators/HomeScreen';
import AccountScreen from '../navigators/AccountScreen';
import InforAccountScreen from '../account/InforAccountScreen';
import ChangePasswordScreen from '../account/ChangePasswordScreen';
const Stack = createStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator initialRouteName={SCREENS.ACCOUNT.KEY}>
      <Stack.Screen
        name={SCREENS.ACCOUNT.KEY}
        options={{
          headerShown: false,
        }}
        component={AccountScreen}
      />
      <Stack.Screen
        name={SCREENS.INFORACCOUNT.KEY}
        options={{
          headerShown: false,
        }}
        component={InforAccountScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
