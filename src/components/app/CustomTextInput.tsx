import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {Icon, TouchableRipple} from 'react-native-paper';
type InputChangePasswordProps = {
  label?: string | null;
  value?: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
};
const CustomTextInput = ({
  label,
  value,
  onChangeText,
}: InputChangePasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="mb-2">
      {label && <Text className="text-black">{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        className="flex-1 bg-white text-sm h-10 w-full border border-gray-400 rounded-lg focus:border-primary"
        secureTextEntry={!showPassword}
      />
    </View>
  );
};

export default CustomTextInput;
