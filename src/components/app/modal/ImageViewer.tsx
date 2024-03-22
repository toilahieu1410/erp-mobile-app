import {Image, Modal, Pressable, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from 'react-native-paper';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
import ZoomImage from '../Image/ZoomImage';
type ImageViewerProp = {
  uri?: string | undefined;
};

const ImageViewer = ({uri}: ImageViewerProp) => {
  const [ratio, setRatio] = useState(0);
  const [showModal, setShowModal] = useState<boolean>(false);

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
            className="p-2 z-30 absolute top-10 right-0"
            onPress={() => {
              setShowModal(false);
            }}>
            <Icon source={'close'} size={30} color="white" />
          </Pressable>
          <View className="flex-1 bg-black h-full justify-center items-center content-center">
            <ReactNativeZoomableView
              maxZoom={5}
              minZoom={1}
              zoomStep={0.5}
              initialZoom={1}
              bindToBorders={true}>
              <Image
                style={{width: '100%', height: 'auto', aspectRatio: ratio}}
                source={{uri: uri}}
              />
            </ReactNativeZoomableView>
            {/* <ZoomImage uri={uri} aspectRatio={ratio} /> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ImageViewer;
