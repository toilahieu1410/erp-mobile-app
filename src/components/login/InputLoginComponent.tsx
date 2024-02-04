import {StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import React, {useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {BaseResponse} from '../../models/BaseResponse';
import {COLORS} from '../../../constants/colors';
import {login} from '../../slice/Auth';

const InputLoginComponent = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [focusUsername, setFocusUsername] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onLogin = () => {
    if (username == undefined || username == null || username.length == 0) {
      showMessage({
        message: 'Vui lòng nhập tên đăng nhập !',
        duration: 5000,
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
        message: 'Vui lòng nhập mật khẩu !',
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
        .then(res => {})
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
    <View className="flex-[2]">
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
        placeholderTextColor={focusUsername ? COLORS.PRIMARY : COLORS.GRAY}
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
        placeholderTextColor={focusPassword ? COLORS.PRIMARY : COLORS.GRAY}
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
              icon={showPassword == false ? 'eye-off' : 'eye'}
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
      <View className="mt-6">
        <Button
          className="bg-primary rounded-lg py-[2px] shadow-sm"
          onPress={() => onLogin()}>
          <Text className="text-white font-bold text-sm">Đăng nhập</Text>
        </Button>
      </View>
    </View>
  );
};

export default InputLoginComponent;

const styles = StyleSheet.create({});
