import React, {useEffect, useState} from 'react';
import LoginScreen from './src/screens/login/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogBox, SafeAreaView, StatusBar, View} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {RootState, store} from './store/store';
import FlashMessage from 'react-native-flash-message';
import {checkToken} from './src/slice/Auth';
import {BaseResponse} from './src/models/BaseResponse';
import {SCREENS} from './constants/screens';
import MainStack from './src/screens/stack/MainStack';
import {PaperProvider, Text} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import {Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import NotConnectNet from './src/screens/error/NotConnectNet';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const loginState = useSelector((state: RootState) => state.Auth);
  const dispatch = useDispatch();
  const [isConnectedNet, setConnectedNet] = useState<boolean>(true);

  useEffect(() => {
    //@ts-ignore
    dispatch(checkToken())
      .unwrap()
      //@ts-ignore
      .then(res => {
        // do stuff while splash screen is shown
        SplashScreen.hide();
      })
      .catch((err: BaseResponse) => {});

    const netInfomation = NetInfo.addEventListener(state => {
      if (state.isConnected === true) {
        setConnectedNet(true);
      } else {
        setConnectedNet(false);
      }
    });
    return () => netInfomation();
  }, []);

  return (
    <>
      <NavigationContainer>
        <StatusBar
          backgroundColor="#027BE3"
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />
        {/* nếu loginState.isAuthenticated == chưa authen => sẽ vào màn hình login , ngược lại vào main để sử dụng */}
        {isConnectedNet == true ? (
          loginState.isAuthenticated === null ? (
            <SafeAreaView className="flex-1 bg-white"></SafeAreaView>
          ) : loginState.isAuthenticated == true ? (
            <MainStack />
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                name={SCREENS.LOGIN.KEY}
                options={{headerShown: false}}
                component={LoginScreen}
              />
            </Stack.Navigator>
          )
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name={'NotConnectNet'}
              options={{headerShown: false}}
              component={NotConnectNet}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
};

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <PaperProvider>
      <Provider store={store}>
        <RootNavigator></RootNavigator>
        <FlashMessage position="top" />
      </Provider>
    </PaperProvider>
  );
};

export default App;
