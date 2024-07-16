import {Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {Icon, TouchableRipple} from 'react-native-paper';
type CustomInputProps = {
  label?: string | null;
  value?: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  editable?: boolean;
};
const CustomTextInput = ({label, value, onChangeText, editable = true }: CustomInputProps) => {
  return (
    <View className="mb-4 flex-1">
      {label && <Text className="text-black text-base mb-2">{label}</Text>}
      <View className="overflow-hidden h-10 border border-gray-400 rounded-lg flex flex-row justify-between px-2 focus:border-primary">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          className="bg-white text-sm flex-1 text-black"
        />
      </View>
    </View>
  );
};

export default CustomTextInput;
