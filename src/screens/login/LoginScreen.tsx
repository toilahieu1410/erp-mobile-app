import React from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import Spinner from 'react-native-loading-spinner-overlay';
import InputLoginComponent from '../../components/login/InputLoginComponent';

const LoginScreen = () => {
  const windowHeight = Dimensions.get('window').height;
  const loginState = useSelector((state: RootState) => state.Auth);
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior="height"
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Spinner
            visible={loginState.loading}
            textContent={'Đang tải...'}
            textStyle={{color: '#32a3f4'}}
            color="#32a3f4"
          />
          <View
            style={{height: windowHeight}}
            className="flex flex-col justify-between items-center bg-gray-100 w-full">
            <View className="flex-1 w-full px-5">
              <View className="flex-[2] justify-end items-center">
                <View className="h-44">
                  <Image
                    source={require('../../assets/images/logo.jpg')}
                    style={{
                      resizeMode: 'contain',
                      aspectRatio: 1,
                      flex: 1,
                      width: '100%',
                      borderRadius: 25,
                    }}
                  />
                </View>
              </View>
              <View className="flex-[1] justify-center items-center">
                <Text className="text-center text-3xl font-bold text-black pb-2">
                  Đăng nhập
                </Text>
                <Text className="text-center text-base text-gray-500 font-bold tracking-wider">
                  Vui lòng đăng nhập để tiếp tục
                </Text>
              </View>
              <InputLoginComponent />
            </View>
            <View className="w-full flex flex-nowrap flex-row items-center justify-center py-3 my-3">
              <Text className="font-bold text-base tracking-wide text-black">
                Không có tài khoản?
              </Text>
              <Text className="ml-1 font-bold text-base tracking-wide text-primary">
                Vui lòng liên hệ IT hỗ trợ
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default LoginScreen;
