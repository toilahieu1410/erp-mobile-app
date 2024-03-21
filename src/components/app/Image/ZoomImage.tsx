import {Animated, View} from 'react-native';
import React, {useState} from 'react';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
type ZoomImageProps = {
  uri?: string;
  aspectRatio?: number | string | undefined;
};

const ZoomImage = ({uri, aspectRatio}: ZoomImageProps) => {
  const scale = new Animated.Value(1);
  const [translateX, setTranslateX] = useState(new Animated.Value(0));
  const [translateY, setTranslateY] = useState(new Animated.Value(0));

  const onZoomEvent = Animated.event([{nativeEvent: {scale: scale}}], {
    useNativeDriver: true,
  });

  const onZoomStateChange = (event: {nativeEvent: {oldState: number}}) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const onPinchGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          scale: scale,
        },
      },
    ],
    {useNativeDriver: true},
  );

  const onPinchHandlerStateChange = (event: {
    nativeEvent: {oldState: number};
  }) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <PinchGestureHandler
        onGestureEvent={onPinchGestureEvent}
        onHandlerStateChange={onPinchHandlerStateChange}>
        <Animated.Image
          source={{
            uri: uri,
          }}
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: aspectRatio,
            transform: [
              {scale: scale},
              {translateX: translateX},
              {translateY: translateY},
            ],
          }}
          resizeMode="contain"
        />
      </PinchGestureHandler>
    </View>
  );
};

export default ZoomImage;
