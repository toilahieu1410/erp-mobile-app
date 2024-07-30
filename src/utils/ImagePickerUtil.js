import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const selectSingleImageFromCamera = async () => {
  const options = {
    mediaType: 'photo', // Chỉ chụp ảnh
  };

  const responseData = null;
  await launchCamera(options, response => {
    responseData = response;
  });

  return responseData;
};

export const selectSingleImageFromGallery = () => {
  const options = {
    mediaType: 'photo', // Chỉ chọn ảnh
  };

  launchImageLibrary(options, response => {
    if (response.errorCode) {
      return response;
    } else {
      return response.uri;
    }
  });
};
