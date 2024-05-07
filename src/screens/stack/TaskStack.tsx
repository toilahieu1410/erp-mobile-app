import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS} from '../../constants/screens';
import {APPHEADER} from '../../constants/appHeaderNavigator';
import TaskScreen from '../navigators/TaskScreen';
import AddTaskScreen from '../task/AddTaskScreen';
import DetailTaskScreen from '../task/DetailTaskScreen';
import TaskListScreen from '../task/TaskListScreen';
import EditTaskScreen from '../task/EditTaskScreen';

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
      <Stack.Screen
        name={SCREENS.EDITTASK.KEY}
        options={{
          title: SCREENS.EDITTASK.NAME,
          headerTitleAlign: 'center',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={EditTaskScreen}
      />

      <Stack.Screen
        name={SCREENS.TASK_LIST.KEY}
        options={{
          title: SCREENS.TASK_LIST.NAME,
          headerTitleAlign: 'center',
          headerShown: APPHEADER.headerShown,
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={TaskListScreen}
      />
    </Stack.Navigator>
  );
};

export default TaskStack;
