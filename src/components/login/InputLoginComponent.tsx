import React, {useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';

import {useDispatch, useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../../store/store';
import {showMessage} from 'react-native-flash-message';
import {BaseResponse} from '../../models/BaseResponse';
import {COLORS} from '../../constants/screens';
import {login} from '../../slice/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FormData {
  username: string;
  password: string;
}

const InputLoginComponent: React.FC<{navigation: any}> = ({navigation}) => {

  const dispatch = useAppDispatch();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [focusUsername, setFocusUsername] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();

  const authState = useSelector((state: RootState) => state.auth);

  const onLogin = (data: FormData) => {
    dispatch(login(data))
      .unwrap()
      .then(res => {
        showMessage({
          message: 'Đăng nhập thành công',
          description: 'Bạn đã đăng nhập thành công!',
          type: 'success',
        });
      })
      .catch(err => {
        if (err && err.response.data.detail) {
          showMessage({
            message: 'Lỗi',
            description: err.response.data.detail,
            type: 'danger',
          });
        }
      });
  };



  // const onLogin = () => {
  //   if (username == undefined || username == null || username.length == 0) {
  //     showMessage({
  //       message: 'Vui lòng nhập tên đăng nhập !',
  //       duration: 5000,
  //       type: 'danger',
  //     });
  //     //@ts-ignore
  //     usernameRef.current?.focus();
  //   } else if (
  //     password == undefined ||
  //     password == null ||
  //     password.length == 0
  //   ) {
  //     showMessage({
  //       message: 'Vui lòng nhập mật khẩu !',
  //       duration: 5000,
  //       type: 'danger',
  //     });
  //     //@ts-ignore
  //     passwordRef.current?.focus();
  //   } else {
  //     //@ts-ignore
  //     dispatch(login({username: username, password: password}))
  //       .unwrap()
  //       //@ts-ignore
  //       .then(res => {})
  //       .catch((err: BaseResponse) => {
  //         showMessage({
  //           message: 'Đăng nhập thất bại !',
  //           description: err.message,
  //           duration: 5000,
  //           type: 'danger',
  //         });
  //       });
  //   }
  // };

  return (
    <View className="flex-[2]">
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, value}}) => (
          <TextInput
            // style={styles.textInputLogin}
            onChangeText={onChange}
            onFocus={() => {
              setFocusUsername(true);
            }}
            onBlur={() => {
              setFocusUsername(false);
            }}
            className="rounded-xl my-4 bg-white border border-white py-0 focus:border-primary"
            value={value}
            placeholder="Nhập tên đăng nhập"
            placeholderTextColor={focusUsername ? COLORS.PRIMARY : COLORS.GRAY}
            textColor={focusUsername ? COLORS.PRIMARY : COLORS.GRAY}
            returnKeyType="next"
            activeUnderlineColor="transparent"
            underlineColor="transparent"
            ref={usernameRef}
            left={
              <TextInput.Icon
                icon="account-outline"
                rippleColor="transparent"
                color={focusPassword ? COLORS.PRIMARY : COLORS.GRAY}
              />
            }
          />
        )}
        name="username"
        defaultValue=""
      />
      {errors.username && <Text>Chưa nhập tên đăng nhập</Text>}

      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, value}}) => (
          <TextInput
            // style={styles.textInputLogin}
            className="rounded-xl  bg-white border border-white py-0 focus:border-primary"
            onChangeText={onChange}
            onFocus={() => {
              setFocusPassword(true);
            }}
            onBlur={() => {
              setFocusPassword(false);
            }}
            secureTextEntry={!showPassword}
            activeUnderlineColor="transparent"
            underlineColor="transparent"
            placeholderTextColor={focusPassword ? COLORS.PRIMARY : COLORS.GRAY}
            textColor={focusPassword ? COLORS.PRIMARY : COLORS.GRAY}
            value={value}
            placeholder="Nhập mật khẩu"
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
            onSubmitEditing={() => {
              //@ts-ignore
              passwordRef.current?.focus();
            }}
          />
        )}
        name="password"
      />
      {errors.username && <Text>Chưa nhập mật khẩu</Text>}

   
      <View className="mt-6">
        <Button
          className="bg-primary rounded-lg py-[2px] shadow-sm"
          onPress={handleSubmit(onLogin)}>
          <Text className="text-white font-bold text-sm">Đăng nhập</Text>
        </Button>
      </View>
    </View>
  );
};

export default InputLoginComponent;

