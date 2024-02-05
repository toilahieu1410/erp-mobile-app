import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {Icon, TouchableRipple} from 'react-native-paper';
import {COLORS} from '../../../../constants/colors';
type InputChangePasswordProps = {
  label?: string | null;
  value?: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
};
const InputChangePassword = ({
  label,
  value,
  onChangeText,
}: InputChangePasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View className="mb-2">
      {label && <Text className="text-black">{label}</Text>}
      <View className="w-full overflow-hidden h-10 border border-gray-400 rounded-lg flex flex-row justify-between items-center pl-2 focus:border-primary">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          className="flex-1 bg-white h-full text-sm"
          secureTextEntry={!showPassword}
          onFocus={focus => {
            setIsFocus(true);
          }}
          onBlur={focus => {
            setIsFocus(false);
            setShowPassword(false);
          }}
        />
        {isFocus == true ? (
          <TouchableRipple
            rippleColor={'transparent'}
            className="px-2"
            onPress={() => setShowPassword(!showPassword)}>
            <Icon
              color={COLORS.PRIMARY}
              source={showPassword == false ? 'eye-off-outline' : 'eye-outline'}
              size={20}
            />
          </TouchableRipple>
        ) : null}
      </View>
    </View>
  );
};

export default InputChangePassword;
