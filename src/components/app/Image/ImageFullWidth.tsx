import {Image} from 'react-native';
import React, {useState} from 'react';
import {IMAGES} from '../../../constants/images';

type ImageFullWidthProps = {
  uri?: string;
};

const ImageFullWidth = ({uri}: ImageFullWidthProps) => {
  const [ratio, setRatio] = useState(0);
  const [error, setError] = useState<boolean>(false);

  Image.getSize(
    uri!,
    (width, height) => {
      setRatio(width / height);
    },
    error => {
      setError(true);
    },
  );
  return error == true
    ? uri && (
        <Image
          source={{uri: IMAGES.WARNING}}
          style={{width: '100%', aspectRatio: 16 / 9}}
        />
      )
    : uri && (
        <Image
          source={{uri: uri}}
          style={{width: '100%', height: undefined, aspectRatio: ratio}}
        />
      );
};

export default ImageFullWidth;
