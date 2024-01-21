import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS} from '../../../constans/screens';
import HomeScreen from '../navigators/HomeScreen';
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName={SCREENS.HOME.KEY}>
      <Stack.Screen
        name={SCREENS.HOME.KEY}
        options={{
          headerShown: false,
        }}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
