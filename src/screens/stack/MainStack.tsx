import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from '../../../constans/screens';
import Main from '../Main';
import ChangePasswordScreen from '../account/ChangePasswordScreen';
import {APPHEADER} from '../../../constans/appHeaderNavigator';
import {TextStyle} from 'react-native';

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
    </Stack.Navigator>
  );
};

export default MainStack;
