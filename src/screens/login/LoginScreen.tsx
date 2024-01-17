import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

const LoginScreen = () => {
  const windowWidth = Dimensions.get('window').width;
  const input1Ref = useRef();
  const input2Ref = useRef();
  const windowHeight = Dimensions.get('window').height;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior="height"
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{height: windowHeight}}
            className="flex flex-col justify-between items-center bg-gray-100">
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
                  className="rounded-xl my-4 bg-white border border-white py-0"
                  placeholder="Username"
                  placeholderTextColor="#828C90"
                  returnKeyType="next"
                  activeUnderlineColor="transparent"
                  underlineColor="transparent"
                  left={<TextInput.Icon icon="account-outline" />}
                  ref={input1Ref}
                  onSubmitEditing={() => {
                    input2Ref.current?.focus();
                  }}
                />
                <TextInput
                  className="rounded-xl bg-white border border-white py-0"
                  autoCorrect={false}
                  secureTextEntry={!showPassword}
                  placeholder="Password"
                  placeholderTextColor="#828C90"
                  activeUnderlineColor="transparent"
                  underlineColor="transparent"
                  left={<TextInput.Icon icon="account-outline" />}
                  right={
                    <TextInput.Icon
                      icon="eye"
                      onPress={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  }
                  ref={input2Ref}
                />
              </View>
              <View>
                <Button className="bg-primary rounded-lg py-[2px] shadow-sm">
                  <Text className="text-white font-bold text-sm">
                    Đăng nhập
                  </Text>
                </Button>
              </View>
            </View>
            <View className="w-full flex flex-nowrap flex-row items-center justify-center py-2">
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
