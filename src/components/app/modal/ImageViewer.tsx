import {
  Animated,
  Image,
  Modal,
  PanResponder,
  Pressable,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Icon} from 'react-native-paper';
import ZoomImage from '../Image/ZoomImage';
type ImageViewerProp = {
  uri?: string | undefined;
};

const ImageViewer = ({uri}: ImageViewerProp) => {
  const [ratio, setRatio] = useState(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Image.getSize(
      uri!,
      (width, height) => {
        setRatio(width / height);
      },
      error => {
        setRatio(0);
      },
    );
  });

  return (
    <View>
      <View>
        <Pressable
          onPress={() => {
            setShowModal(true);
          }}>
          <Image
            source={{uri: uri}}
            style={{width: '100%', height: 'auto', aspectRatio: ratio}}
          />
        </Pressable>
      </View>
      <Modal
        animationType="fade"
        visible={showModal}
        presentationStyle="fullScreen">
        <View className="relative w-full h-full bg-black">
          <Pressable
            className="p-2 z-30 absolute top-0 right-0"
            onPress={() => {
              setShowModal(false);
            }}>
            <Icon source={'close'} size={30} color="white" />
          </Pressable>
          <View className="flex-1 bg-black h-full justify-center items-center content-center">
            <ZoomImage uri={uri} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ImageViewer;
