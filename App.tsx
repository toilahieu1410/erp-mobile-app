import React from 'react';
import LoginScreen from './src/screens/login/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import HomeScreen from './src/screens/home/HomeScreen';
import {Provider, useSelector} from 'react-redux';
import {store} from './store';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Welcome'}}
      />
    </Stack.Navigator>
  );
};
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  const token = useSelector(state => state?.AuthReducers.authToken);
  console.log(token);
  return (
    <>
      <NavigationContainer>
        <StatusBar backgroundColor="#027BE3" barStyle="light-content" />
        {token == null ? <AuthStack /> : <MyStack />}
      </NavigationContainer>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator></RootNavigator>
    </Provider>
  );
};

export default App;
