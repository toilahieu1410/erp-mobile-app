import React, {useEffect, useRef} from 'react';
import LoginScreen from './src/screens/login/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import HomeScreen from './src/screens/navigators/HomeScreen';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {RootState, store} from './store/store';
import FlashMessage from 'react-native-flash-message';
import {checkToken} from './src/slice/Auth';
import {BaseResponse} from './src/models/BaseResponse';
import Main from './src/screens/Main';
import {SCREENS} from './constans/screens';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREENS.MAIN.KEY}
        component={Main}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        options={{headerShown: false}}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  const loginState = useSelector((state: RootState) => state.Auth);
  const dispatch = useDispatch();
  useEffect(() => {
    //@ts-ignore
    dispatch(checkToken())
      .unwrap()
      //@ts-ignore
      .then(res => {})
      .catch((err: BaseResponse) => {});
  }, [loginState.isAuthenticated]);

  return (
    <>
      <NavigationContainer>
        <StatusBar backgroundColor="#027BE3" barStyle="light-content" />
        {loginState.isAuthenticated == false ? <AuthStack /> : <MyStack />}
      </NavigationContainer>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator></RootNavigator>
      <FlashMessage position="top" />
    </Provider>
  );
};

export default App;
