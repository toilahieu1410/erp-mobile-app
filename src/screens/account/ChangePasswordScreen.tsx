import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Icon, TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../../components/navigators/AppHeader';
import {COLORS} from '../../../constants/colors';
import InputChangePassword from '../../components/account/ChangePassword/InputChangePassword';

const ChangePasswordScreen = () => {
  const navigator = useNavigation();
  const [password, setPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [comfirmPassword, setComfirmPassword] = useState<string>();

  return (
    <>
      <SafeAreaView className="flex-1 w-full bg-white">
        <AppHeader title="Đổi mật khẩu" showButtonBack={true}></AppHeader>
        <View className="flex-1">
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            className="w-full">
            <KeyboardAvoidingView
              behavior="padding"
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              <View className="flex flex-col justify-between h-full w-full">
                <View className="p-4">
                  <InputChangePassword
                    label="Mật khẩu hiện tại"
                    value={password}
                    onChangeText={value => setPassword(value)}
                  />
                  <InputChangePassword
                    label="Mật khẩu hiện tại"
                    value={newPassword}
                    onChangeText={value => setNewPassword(value)}
                  />
                  <InputChangePassword
                    label="Mật khẩu hiện tại"
                    value={comfirmPassword}
                    onChangeText={value => setComfirmPassword(value)}
                  />
                </View>
                <View className="py-4 px-2 z-0 border-t border-t-gray-300">
                  <Button
                    className="bg-primary rounded-full"
                    onPress={() => Alert.alert('Đổi mật khẩu thành công')}>
                    <Text className="text-center text-white text-sm">
                      Đổi mật khẩu
                    </Text>
                  </Button>
                </View>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ChangePasswordScreen;
