import {Animated, View} from 'react-native';
import React, {useRef} from 'react';
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';

const ZoomImage = ({uri}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const onZoomStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };
  const onZoomEvent = Animated.event(
    [
      {
        nativeEvent: {scale: scale},
      },
    ],
    {
      useNativeDriver: true,
    },
  );
  return (
    <View>
      <PinchGestureHandler
        onGestureEvent={onZoomEvent}
        onHandlerStateChange={onZoomStateChange}>
        <Animated.Image
          source={{
            uri: uri,
          }}
          style={{
            width: 500,
            height: 300,
            transform: [{scale: scale}],
          }}
          resizeMode="contain"
        />
      </PinchGestureHandler>
    </View>
  );
};

export default ZoomImage;
