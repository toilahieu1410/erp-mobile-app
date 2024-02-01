import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar, Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../../components/navigators/AppHeader';
import {COLORS} from '../../../constans/colors';

const ChangePasswordScreen = () => {
  const navigator = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showComfirmPassword, setShowComfirmNewPassword] = useState(false);

  return (
    <>
      <SafeAreaView className="flex-1 w-full bg-white">
        <AppHeader title="Đổi mật khẩu" showButtonBack={true}></AppHeader>
        <LinearGradient
          colors={['#e2fcfc', '#88e3f2', '#e2fcfc', '#ffffff']}
          start={{x: 0.0, y: 0.25}}
          end={{x: 1, y: 1.0}}
          className="flex-1">
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            className="w-full">
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={80}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              <View className="flex flex-col justify-between h-full w-full">
                <View className="p-4">
                  <TextInput
                    mode="flat"
                    label="Mật khẩu hiện tại"
                    className=" bg-white border-2 rounded-xl border-gray-200 focus:border-lightPrimary focus:text-primary outline-none"
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    secureTextEntry={!showPassword}
                    right={
                      <TextInput.Icon
                        underlayColor="rgba(0, 0, 0, 0)"
                        color={COLORS.PRIMARY}
                        rippleColor="transparent"
                        onPress={() => setShowPassword(!showPassword)}
                        icon={
                          showPassword == false
                            ? 'eye-off-outline'
                            : 'eye-outline'
                        }
                        size={25}
                      />
                    }
                  />
                  <Text className="text-red-500"></Text>

                  <TextInput
                    label="Mật khẩu mới"
                    className=" bg-white border-2 rounded-xl border-gray-200 focus:border-lightPrimary  outline-none"
                    activeUnderlineColor="transparent"
                    underlineColor="transparent"
                    secureTextEntry={!showNewPassword}
                    right={
                      <TextInput.Icon
                        underlayColor="rgba(0, 0, 0, 0)"
                        rippleColor="transparent"
                        color={COLORS.PRIMARY}
                        onPress={() => setShowNewPassword(!showNewPassword)}
                        icon={
                          showNewPassword == false
                            ? 'eye-off-outline'
                            : 'eye-outline'
                        }
                        size={25}
                      />
                    }
                  />
                  <Text className="text-red-500"></Text>

                  <TextInput
                    label="Nhập lại mật khẩu"
                    className=" bg-white border-2 rounded-xl border-gray-200 focus:border-lightPrimary  outline-none"
                    activeUnderlineColor="transparent"
                    underlineColor="transparent"
                    secureTextEntry={!showComfirmPassword}
                    right={
                      <TextInput.Icon
                        underlayColor="rgba(0, 0, 0, 0)"
                        color={COLORS.PRIMARY}
                        rippleColor="transparent"
                        onPress={() =>
                          setShowComfirmNewPassword(!showComfirmPassword)
                        }
                        icon={
                          showComfirmPassword == false
                            ? 'eye-off-outline'
                            : 'eye-outline'
                        }
                        size={25}
                      />
                    }
                  />
                  <Text className="text-red-500"></Text>
                </View>
                <View className="py-4 px-2 z-0 border-t border-t-gray-300">
                  <Button
                    className="bg-primary p-1 rounded-full"
                    onPress={() => Alert.alert('Đổi mật khẩu thành công')}>
                    <Text className="text-center text-white text-lg">
                      Đổi mật khẩu
                    </Text>
                  </Button>
                </View>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

export default ChangePasswordScreen;
