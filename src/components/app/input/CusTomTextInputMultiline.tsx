import {Text, TextInput, View} from 'react-native';
import React from 'react';
type CustomInputProps = {
  label?: string | null;
  value?: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
};
const CusTomTextInputMultiline = ({
  label,
  value,
  onChangeText,
}: CustomInputProps) => {
  return (
    <View className="mb-4">
      {label && <Text className="text-black text-base">{label}</Text>}
      <View className="w-full overflow-hidden border border-gray-400 rounded-lg flex flex-row justify-between items-center px-2 focus:border-primary">
        <TextInput
          value={value}
          multiline={true}
          numberOfLines={10}
          scrollEnabled={true}
          textAlignVertical="top"
          onChangeText={onChangeText}
          className="flex-1 bg-white text-sm h-[200px] max-h-[200px]"
        />
      </View>
    </View>
  );
};

export default CusTomTextInputMultiline;
