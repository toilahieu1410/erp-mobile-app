import {Alert, PermissionsAndroid, Pressable, View} from 'react-native';
import React, {useEffect} from 'react';
import {launchCamera} from 'react-native-image-picker';
import {ImagePikerModal} from '../../../models/ImagePicker';

type TakePhotoFormCameraProps = {
  children?: React.ReactNode;
  onSelect?: (value: ImagePikerModal) => void;
  mediaType: 'photo' | 'video' | 'mixed';
};

const TakePhotoFormCamera = ({
  children,
  onSelect,
  mediaType,
}: TakePhotoFormCameraProps) => {
  const takePhotoCamera = () => {
    const options = {
      saveToPhotos: true,
      mediaType: mediaType,
    };

    //@ts-ignore
    launchCamera(options, response => {
      if (response.didCancel) {
        //@ts-ignore
      } else if (response.error) {
        //@ts-ignore
        Alert.alert('Camera Error: ', response.error);
      } else {
        if (onSelect) {
          //@ts-ignore
          onSelect(response.assets?.[0]);
        }
      }
    });
  };

  useEffect(() => {
    try {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'Cho phép truy cập camera.',
        message: 'Cần cấp quyền truy cập camera',
        buttonNeutral: 'Để sau',
        buttonNegative: 'Đồng ý',
        buttonPositive: 'Hủy',
      });
    } catch (err) {}
  }, []);

  return (
    <View>
      <Pressable onPress={takePhotoCamera}>
        <View>{children}</View>
      </Pressable>
    </View>
  );
};

export default TakePhotoFormCamera;
