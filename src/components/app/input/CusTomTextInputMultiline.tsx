import React, { useRef } from 'react';
import {Text, TextInput, View, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

type CustomInputProps = {
  label?: string | null;
  value?: string | null;
  onChangeText?: ((text: string) => void) | undefined;
};
const CusTomTextInputMultiline = ({
  label,
  value,
  onChangeText,
}: CustomInputProps) => {

  const richText = useRef<RichEditor>(null)

 
  const dismissKeyboard = () => {
    if (richText.current) {
      richText.current.dismissKeyboard()
    }
    Keyboard.dismiss()
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
    <View className="mb-4">
      {label && <Text className="text-black text-base">{label}</Text>}
      <View className="w-full overflow-hidden border border-gray-400 rounded-lg flex flex-row justify-between items-center px-2 focus:border-primary">
        <RichEditor 
          ref={richText}
          initialContentHTML={value || ''}
          onChange={onChangeText}
          style={{flex: 1, minHeight: 100, maxHeight: 100}}
        />
      </View>
      <RichToolbar 
        editor={richText}
        actions={['bold', 'italic', 'underline','justifyLeft','justifyCenter','justifyRight','justifyFull','image','insertLink',  'undo', 'redo']}
        iconTint="black"
        selectedIconTint="blue"
        selectedButtonStyle={{ backgroundColor: 'transparent' }}
      />
    </View>
  </TouchableWithoutFeedback>


  );
};

export default CusTomTextInputMultiline;
