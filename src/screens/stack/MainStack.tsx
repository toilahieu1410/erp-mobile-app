import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from '../../constants/screens';
import Main from '../Main';
import ChangePasswordScreen from '../account/ChangePasswordScreen';
import {APPHEADER} from '../../constants/appHeaderNavigator';
import HomeDetailScreen from '../home/HomeDetailScreen';
import SearchTaskScreen from '../task/SearchTaskScreen';
import PayRollScreen from '../account/PayRollScreen';
// import ItemDetailConfirm from '../../components/work/confirm/ItemDetailConfirm';

// import OfferPaymentsScreen from '../work/OfferPaymentsScreen';
// Don xac nhan
import CreateConfirm from '../../components/work/confirm/CreateConfirm';
import ListConfirm from '../../components/work/confirm/ListConfirm';
import EditConfirm from '../../components/work/confirm/EditConfirm';
import SearchConfirm from '../../components/work/confirm/SearchConfirm';

// Don nghi phep
import ListTakeLeave from '../../components/work/leave/ListTakeLeave';
import CreateTakeLeave from '../../components/work/leave/CreateTakeLeave';
import SearchTakeLeave from '../../components/work/leave/SearchTakeLeave';
import EditTakeLeave from '../../components/work/leave/EditTakeLeave';

// Don lam viec tai nha
import ListWorkFromHome from '../../components/work/workhome/ListWorkFromHome';
import SearchWorkFromHome from '../../components/work/workhome/SearchWorkFromHome';
import CreateWorkFromHome from '../../components/work/workhome/CreateWorkFromHome';
import EditWorkFromHome from '../../components/work/workhome/EditWorkFromHome';
import EditAccountScreen from '../account/EditAccountScreen';


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
        name={SCREENS.EDIT_ACCOUNT.KEY}
        component={EditAccountScreen}
        options={{
          title: SCREENS.EDIT_ACCOUNT.NAME,
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
        name={SCREENS.TAO_DON_XAC_NHAN.KEY}
        options={{
          title: SCREENS.TAO_DON_XAC_NHAN.NAME,
          headerTintColor: 'transparent',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={CreateConfirm}
      />
        <Stack.Screen
        name={SCREENS.LIST_DON_XAC_NHAN.KEY}
        options={{
          title: SCREENS.LIST_DON_XAC_NHAN.NAME,
          headerTintColor: 'transparent',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={ListConfirm}
      />
        <Stack.Screen
        name={SCREENS.EDIT_XAC_NHAN.KEY}
        options={{
          title: SCREENS.EDIT_XAC_NHAN.NAME,
          headerTintColor: 'transparent',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={EditConfirm}
      />
      <Stack.Screen
        name={SCREENS.SEARCH_DON_XAC_NHAN.KEY}
        options={{
          title: SCREENS.SEARCH_DON_XAC_NHAN.NAME,
          headerTintColor: 'transparent',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={SearchConfirm}
      />
     
      <Stack.Screen
        name={SCREENS.LIST_DON_NGHI_PHEP.KEY}
        options={{
          title: SCREENS.LIST_DON_NGHI_PHEP.NAME,
          headerTintColor: 'transparent',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={ListTakeLeave}
      />
        <Stack.Screen
        name={SCREENS.TAO_DON_NGHI_PHEP.KEY}
        options={{
          title: SCREENS.TAO_DON_NGHI_PHEP.NAME,
          headerTintColor: 'transparent',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={CreateTakeLeave}
      />

      <Stack.Screen
        name={SCREENS.EDIT_NGHI_PHEP.KEY}
        options={{
          title: SCREENS.EDIT_NGHI_PHEP.NAME,
          headerTintColor: 'transparent',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={EditTakeLeave}
      />

      <Stack.Screen
        name={SCREENS.SEARCH_DON_NGHI_PHEP.KEY}
        options={{
          title: SCREENS.SEARCH_DON_NGHI_PHEP.NAME,
          headerTintColor: 'transparent',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={SearchTakeLeave}
      />

      <Stack.Screen
        name={SCREENS.LIST_WORK_FROM_HOME.KEY}
        options={{
          title: SCREENS.LIST_WORK_FROM_HOME.NAME,
          headerTintColor: 'transparent',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={ListWorkFromHome}
      />
      <Stack.Screen
        name={SCREENS.CREATE_WORK_FROM_HOME.KEY}
        options={{
          title: SCREENS.CREATE_WORK_FROM_HOME.NAME,
          headerTintColor: 'transparent',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={CreateWorkFromHome}
      />
      <Stack.Screen
        name={SCREENS.EDIT_WORK_FROM_HOME.KEY}
        options={{
          title: SCREENS.EDIT_WORK_FROM_HOME.NAME,
          headerTintColor: 'transparent',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={EditWorkFromHome}
      />
      <Stack.Screen
        name={SCREENS.SEARCH_WORK_FROM_HOME.KEY}
        options={{
          title: SCREENS.SEARCH_WORK_FROM_HOME.NAME,
          headerTintColor: 'transparent',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={SearchWorkFromHome}
      />
      {/* <Stack.Screen
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
      /> */}
    </Stack.Navigator>
  );
};

export default MainStack;
