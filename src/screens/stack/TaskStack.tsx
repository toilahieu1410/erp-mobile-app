import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS} from '../../../constants/screens';
import {APPHEADER} from '../../../constants/appHeaderNavigator';
import TaskScreen from '../navigators/TaskScreen';
import AddTaskScreen from '../task/AddTaskScreen';
import DetailTaskScreen from '../task/DetailTaskScreen';

const Stack = createStackNavigator();

const TaskStack = () => {
  return (
    <Stack.Navigator initialRouteName={SCREENS.TASK.KEY}>
      <Stack.Screen
        name={SCREENS.TASK.KEY}
        options={{
          title: SCREENS.TASK.NAME,
          headerTitleAlign: 'center',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={TaskScreen}
      />
      <Stack.Screen
        name={SCREENS.ADDNEWTASK.KEY}
        options={{
          title: SCREENS.ADDNEWTASK.NAME,
          headerTitleAlign: 'center',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={AddTaskScreen}
      />
      <Stack.Screen
        name={SCREENS.DETAILTASK.KEY}
        options={{
          title: SCREENS.DETAILTASK.NAME,
          headerTitleAlign: 'center',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={DetailTaskScreen}
      />
    </Stack.Navigator>
  );
};

export default TaskStack;
