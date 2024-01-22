import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS} from '../../../constans/screens';
import {APPHEADER} from '../../../constans/appHeaderNavigator';
import TaskScreen from '../navigators/TaskScreen';
import TodayTaskScreen from '../task/TodayTaskScreen';
import TaskOverviewScreen from '../task/TaskOverviewScreen';
import AllTaskScreen from '../task/AllTaskScreen';
import AddNewTaskScreen from '../task/AddNewTaskScreen';
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
        name={SCREENS.TODAYTASK.KEY}
        options={{
          title: SCREENS.TODAYTASK.NAME,
          headerShown: APPHEADER.headerShown,
          headerPressColor: 'transparent',
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={TodayTaskScreen}
      />

      <Stack.Screen
        name={SCREENS.TASKOVERVIEW.KEY}
        options={{
          title: SCREENS.TASKOVERVIEW.NAME,
          headerShown: APPHEADER.headerShown,
          headerPressColor: 'transparent',
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={TaskOverviewScreen}
      />
      <Stack.Screen
        name={SCREENS.ALLTASK.KEY}
        options={{
          title: SCREENS.ALLTASK.NAME,
          headerShown: APPHEADER.headerShown,
          headerPressColor: 'transparent',
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={AllTaskScreen}
      />

      <Stack.Screen
        name={SCREENS.ADDNEWTASK.KEY}
        options={{
          title: SCREENS.ADDNEWTASK.NAME,
          headerShown: APPHEADER.headerShown,
          headerPressColor: 'transparent',
          headerTitleStyle: {
            fontWeight: APPHEADER.headerStyle.fontWeight,
            fontSize: APPHEADER.headerStyle.fontSize,
          },
        }}
        component={AddNewTaskScreen}
      />
    </Stack.Navigator>
  );
};

export default TaskStack;
