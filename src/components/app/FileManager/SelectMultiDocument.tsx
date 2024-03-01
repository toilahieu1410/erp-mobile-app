import {Alert, Pressable, View} from 'react-native';
import React from 'react';
import DocumentPicker from 'react-native-document-picker';
import {DocumentSelect} from '../../../models/DocumentPicker';
type SelectMultiDocumentProps = {
  children?: React.ReactNode;
  onSelect?: (value: DocumentSelect[]) => void;
};
const SelectMultiDocument = ({
  children,
  onSelect,
}: SelectMultiDocumentProps) => {
  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        allowMultiSelection: true,
        type: [DocumentPicker.types.allFiles], // Chọn tất cả các loại tài liệu
      });
      if (onSelect) {
        onSelect(res);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        //@ts-ignore
        Alert.alert('Document picker error:', err);
      }
    }
  };
  return (
    <View>
      <Pressable onPress={pickDocument}>
        <View>{children}</View>
      </Pressable>
    </View>
  );
};

export default SelectMultiDocument;
