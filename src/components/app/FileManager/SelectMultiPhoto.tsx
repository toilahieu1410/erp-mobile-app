import {ImagePikerModal} from '../../../models/ImagePicker';
import {Pressable, View} from 'react-native';
import React from 'react';
import {launchImageLibrary} from 'react-native-image-picker';

type SelectMultiPhotoProps = {
  children?: React.ReactNode;
  onSelect?: (value: ImagePikerModal[]) => void;
  mediaType: 'photo' | 'video' | 'mixed';
};
const SelectMultiPhoto = ({
  children,
  onSelect,
  mediaType,
}: SelectMultiPhotoProps) => {
  const pickPhoToAsync = async () => {
    const options = {
      mediaType: mediaType,
      includeBase64: false,
      selectionLimit: 5,
    };
    //@ts-ignore
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        //@ts-ignore
      } else if (response.error) {
      } else {
        if (onSelect) {
          //@ts-ignore
          onSelect(response.assets);
        }
      }
    });
  };
  return (
    <View>
      <Pressable onPress={pickPhoToAsync}>
        <View>{children}</View>
      </Pressable>
    </View>
  );
};

export default SelectMultiPhoto;
