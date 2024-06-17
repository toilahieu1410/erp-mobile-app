import React, {useEffect} from 'react';
import LoginScreen from './src/screens/login/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Alert, LogBox, SafeAreaView, StatusBar, Platform, I18nManager } from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {RootState, store, persistor} from './store/store';
import FlashMessage from 'react-native-flash-message';
import { checkToken} from './src/slice/Auth';
import {BaseResponse} from './src/models/BaseResponse';
import {SCREENS} from './src/constants/screens';
import MainStack from './src/screens/stack/MainStack';
import {PaperProvider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import NetInfo from '@react-native-community/netinfo';
import RNRestart from 'react-native-restart';
import {PersistGate} from 'redux-persist/integration/react';
import { navigationRef } from './store/navigationRef';



const config = {
  screens: {
    ChangePasswordScreen: {
      path: 'changepassword',
    },
    PayRollScreen: {
      path: 'payroll',
    },

    // Profile: {
    //   path: 'profile/:id',
    //   parse: {
    //     id: id => `${id}`,
    //   },
    // },
    // Notifications: 'notifications',
    // Settings: 'settings',
  },
};

const linking = {
  prefixes: [
    'hoplonglms://',
    'https://hoplonglms.com',
    'http://hoplonglms.com',
  ],
  config,
};

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const loading = useSelector(
    (state: RootState) => state.auth.loading,
  );

  useEffect(() => {
    //@ts-ignore
    dispatch(checkToken())
    //@ts-ignore
      .unwrap()
      //@ts-ignore
      .then(res => {
        // do stuff while splash screen is shown
        SplashScreen.hide();
      })
      .catch((err: BaseResponse) => {});

    const netInfomation = NetInfo.addEventListener(state => {
      if (state.isConnected != true) {
        Alert.alert(
          'Lỗi kết nối',
          'Không thể kết nối với máy chủ. Vui lòng kiểm tra kết nối internet và thử lại.',
          [{text: 'Thử lại', onPress: () => RNRestart.restart()}],
        );
      }
    });
    return () => netInfomation();
  }, []);

  if (loading) {
    return null; 
  }

  return (
    <>
      <NavigationContainer linking={linking} independent={true} ref={navigationRef}>
        <StatusBar
          backgroundColor="#2179A9"
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />
        {isAuthenticated ? (
            <MainStack />
        ) : (
          /* nếu loginState.isAuthenticated == chưa authen => sẽ vào màn hình login , ngược lại vào main để sử dụng */

          <Stack.Navigator>
            <Stack.Screen
              name={SCREENS.LOGIN.KEY}
              options={{headerShown: false}}
              component={LoginScreen}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
};

const App = () => {

  // useEffect(() => {
  //   const setLanguage = () => {
  //     const locales = getLocales()
  //     if (locales.length > 0) {
  //       const currentLocale = locales[0].languageTag; // Lấy ngôn ngữ hiện tại
  //       const targetLocale = 'en'; // Ví dụ: chuyển sang tiếng Anh

  //       if (currentLocale !== targetLocale) {
  //         // Cập nhật ngôn ngữ
  //         I18nManager.forceRTL(targetLocale === 'en'); // Chuyển sang RTL nếu cần thiết
  //         RNRestart.Restart(); // Khởi động lại ứng dụng để áp dụng thay đổi ngôn ngữ
  //       }
  //     }
  //   };

  //   setLanguage();
  // }, []);

  LogBox.ignoreAllLogs();
  return (
    <PaperProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigator />
        </PersistGate>
        <FlashMessage position="top" />
      </Provider>
    </PaperProvider>
  );
};

export default App;
