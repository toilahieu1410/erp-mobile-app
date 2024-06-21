import React, { useEffect } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS} from '../../constants/screens';
import AccountScreen from '../navigators/AccountScreen';
import InfoAccountScreen from '../account/InfoAccountScreen';
import {APPHEADER} from '../../constants/appHeaderNavigator';
import CheckInWFHScreen from '../account/attendance/CheckInWFHScreen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
const Stack = createStackNavigator();

const AccountStack = () => {

  // const navigation = useNavigation();
  // const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (isFocused) {
  //     // @ts-ignore
  //     navigation.navigate(SCREENS.ACCOUNT.KEY);
  //   }
  // }, [isFocused, navigation]);

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
        name={SCREENS.INFOACCOUNT.KEY}
        options={{
          title: SCREENS.INFOACCOUNT.NAME,
          headerShown: APPHEADER.headerShown,
          headerPressColor: 'transparent',
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={InfoAccountScreen}
      />

      <Stack.Screen
        name={SCREENS.CHECKIN_WFH.KEY}
        component={CheckInWFHScreen}
        options={{
          title: SCREENS.CHECKIN_WFH.NAME,
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

export default AccountStack;
