import {Pressable, View} from 'react-native';
import React from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {ImagePikerModal} from '../../../models/ImagePicker';

type SelectPhotoProps = {
  children?: React.ReactNode;
  onSelect?: (value: ImagePikerModal) => void;
  mediaType: 'photo' | 'video' | 'mixed';
};
const SelectPhoto = ({children, onSelect, mediaType}: SelectPhotoProps) => {
  const pickPhoToAsync = async () => {
    const options = {
      mediaType: mediaType,
      includeBase64: false,
      selectionLimit: 1,
    };
    //@ts-ignore
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        //@ts-ignore
      } else if (response.error) {
      } else {
        if (onSelect) {
          //@ts-ignore
          onSelect(response.assets?.[0]);
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

export default SelectPhoto;
