import {Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {Icon, TouchableRipple} from 'react-native-paper';
type CustomInputProps = {
  label?: string | null;
  value?: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
};
const CustomTextInput = ({label, value, onChangeText}: CustomInputProps) => {
  return (
    <View className="mb-4">
      {label && <Text className="text-black text-base">{label}</Text>}
      <View className="w-full overflow-hidden h-10 border border-gray-400 rounded-lg flex flex-row justify-between items-center px-2 focus:border-primary">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          className="flex-1 bg-white h-full text-sm"
        />
      </View>
    </View>
  );
};

export default CustomTextInput;
