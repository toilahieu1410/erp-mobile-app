import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from '../../constants/screens';
import Main from '../Main';
import ChangePasswordScreen from '../account/ChangePasswordScreen';
import {APPHEADER} from '../../constants/appHeaderNavigator';
import HomeDetailScreen from '../home/HomeDetailScreen';
import SearchTaskScreen from '../task/SearchTaskScreen';
import PayRollScreen from '../account/PayRollScreen';
import ConfirmScreen from '../work/ConfirmScreen';
import TakeLeaveScreen from '../work/TakeleaveScreen';
import ItemDetailConfirm from '../../components/work/confirm/ItemDetailConfirm';
import ItemDetailTakeLeave from '../../components/work/leave/ItemDetailTakeLeave';
import WorkFromHomeScreen from '../work/WorkfromhomeScreen';
import OfferPaymentsScreen from '../work/OfferPaymentsScreen';

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
      <Stack.Screen
        name={SCREENS.PAYROLL.KEY}
        options={{
          title: SCREENS.PAYROLL.NAME,
          headerTintColor: 'transparent',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={PayRollScreen}
      />
      <Stack.Screen
        name={SCREENS.XIN_XAC_NHAN.KEY}
        options={{
          title: SCREENS.XIN_XAC_NHAN.NAME,
          headerTintColor: 'transparent',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={ConfirmScreen}
      />
      <Stack.Screen
        name={SCREENS.DETAIL_XAC_NHAN.KEY}
        options={{
          title: SCREENS.DETAIL_XAC_NHAN.NAME,
          headerTintColor: 'transparent',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={ItemDetailConfirm}
      />
      <Stack.Screen
        name={SCREENS.XIN_NGHI_PHEP.KEY}
        options={{
          title: SCREENS.XIN_NGHI_PHEP.NAME,
          headerTintColor: 'transparent',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={TakeLeaveScreen}
      />
      <Stack.Screen
        name={SCREENS.DETAIL_NGHI_PHEP.KEY}
        options={{
          title: SCREENS.DETAIL_NGHI_PHEP.NAME,
          headerTintColor: 'transparent',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={ItemDetailTakeLeave}
      />
      <Stack.Screen
        name={SCREENS.WORK_FROM_HOME.KEY}
        options={{
          title: SCREENS.WORK_FROM_HOME.NAME,
          headerTintColor: 'transparent',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={WorkFromHomeScreen}
      />
      <Stack.Screen
        name={SCREENS.OFFERPAYMENTS.KEY}
        options={{
          title: SCREENS.OFFERPAYMENTS.NAME,
          headerTintColor: 'transparent',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={OfferPaymentsScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
