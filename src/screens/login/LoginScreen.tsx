import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../slice/Auth';
import {RootState} from '../../../store/store';
import {BaseResponse} from '../../models/BaseResponse';
import {showMessage} from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import {COLORS} from '../../../constans/colors';

const LoginScreen = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [focusUsername, setFocusUsername] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const windowHeight = Dimensions.get('window').height;
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginState = useSelector((state: RootState) => state.Auth);

  const dispatch = useDispatch();

  const onLogin = () => {
    if (username == undefined || username == null || username.length == 0) {
      showMessage({
        message: 'Đã xảy ra lỗi !',
        description: 'Vui lòng nhập tên đăng nhập.',
        type: 'danger',
      });
      //@ts-ignore
      usernameRef.current?.focus();
    } else if (
      password == undefined ||
      password == null ||
      password.length == 0
    ) {
      showMessage({
        message: 'Đã xảy ra lỗi !',
        description: 'Vui lòng nhập mật khẩu.',
        duration: 5000,
        type: 'danger',
      });
      //@ts-ignore
      passwordRef.current?.focus();
    } else {
      //@ts-ignore
      dispatch(login({username: username, password: password}))
        .unwrap()
        //@ts-ignore
        .then(res => {
          // showMessage({
          //   message: 'Thành công.',
          //   description: 'Vui lòng chờ trong giây lát !',
          //   duration: 5000,
          //   type: 'success',
          // });
        })
        .catch((err: BaseResponse) => {
          showMessage({
            message: 'Đăng nhập thất bại !',
            description: err.message,
            duration: 5000,
            type: 'danger',
          });
        });
    }
  };

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
              <View className="flex justify-end items-center h-56">
                <Image
                  source={require('../../../assets/image/logo.jpg')}
                  style={{
                    resizeMode: 'contain',
                    height: 150,
                    width: 150,
                    borderRadius: 25,
                  }}
                />
              </View>
              <View className="my-16">
                <Text className="text-center text-3xl font-bold text-black py-2">
                  Đăng nhập
                </Text>
                <Text className="text-center text-base text-gray-500 font-bold tracking-wider">
                  Vui lòng đăng nhập để tiếp tục
                </Text>
              </View>
              <View className="mb-4">
                <TextInput
                  value={username}
                  onChangeText={value => {
                    setUsername(value);
                  }}
                  onFocus={() => {
                    setFocusUsername(true);
                  }}
                  onBlur={() => {
                    setFocusUsername(false);
                  }}
                  className="rounded-xl my-4 bg-white border border-white py-0 focus:border-primary"
                  placeholder="Tên đăng nhập"
                  placeholderTextColor={
                    focusUsername ? COLORS.PRIMARY : COLORS.GRAY
                  }
                  textColor={focusUsername ? COLORS.PRIMARY : COLORS.GRAY}
                  returnKeyType="next"
                  activeUnderlineColor="transparent"
                  underlineColor="transparent"
                  left={
                    <TextInput.Icon
                      icon="account-outline"
                      rippleColor="transparent"
                      color={focusUsername ? COLORS.PRIMARY : COLORS.GRAY}
                    />
                  }
                  ref={usernameRef}
                  onSubmitEditing={() => {
                    //@ts-ignore
                    passwordRef.current?.focus();
                  }}
                />
                <TextInput
                  value={password}
                  onChangeText={value => {
                    setPassword(value);
                  }}
                  onFocus={() => {
                    setFocusPassword(true);
                  }}
                  onBlur={() => {
                    setFocusPassword(false);
                  }}
                  className="rounded-xl bg-white border border-white py-0 focus:border-primary"
                  autoCorrect={false}
                  secureTextEntry={!showPassword}
                  placeholder="Mật khẩu"
                  activeUnderlineColor="transparent"
                  underlineColor="transparent"
                  placeholderTextColor={
                    focusPassword ? COLORS.PRIMARY : COLORS.GRAY
                  }
                  textColor={focusPassword ? COLORS.PRIMARY : COLORS.GRAY}
                  left={
                    <TextInput.Icon
                      icon="lock-outline"
                      rippleColor="transparent"
                      color={focusPassword ? COLORS.PRIMARY : COLORS.GRAY}
                    />
                  }
                  right={
                    focusPassword == true ? (
                      <TextInput.Icon
                        icon={showPassword ? 'eye-off' : 'eye'}
                        onPress={() => {
                          setShowPassword(!showPassword);
                        }}
                        color={COLORS.PRIMARY}
                        rippleColor="transparent"
                      />
                    ) : null
                  }
                  ref={passwordRef}
                />
              </View>
              <View>
                <Button
                  className="bg-primary rounded-lg py-[2px] shadow-sm"
                  onPress={() => onLogin()}>
                  <Text className="text-white font-bold text-sm">
                    Đăng nhập
                  </Text>
                </Button>
              </View>
            </View>
            <View className="w-full flex flex-nowrap flex-row items-center justify-center py-3">
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
