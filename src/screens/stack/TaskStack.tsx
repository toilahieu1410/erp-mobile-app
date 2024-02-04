import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS} from '../../../constants/screens';
import {APPHEADER} from '../../../constants/appHeaderNavigator';
import TaskScreen from '../navigators/TaskScreen';
import AddTaskScreen from '../task/AddTaskScreen';

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
    </Stack.Navigator>
  );
};

export default TaskStack;
