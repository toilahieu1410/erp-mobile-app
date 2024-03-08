import {Image, NativeModules, SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import {IMAGES} from '../../../constants/images';
import {Button} from 'react-native-paper';

const NotConnectNet = () => {
  return (
    <SafeAreaView className="bg-white flex-1 justify-center items-center content-center">
      <View className="flex flex-col justify-center items-center">
        <Image source={IMAGES.WARNING} style={{width: 60, height: 60}} />
        <Text className="w-full text-center">No internet</Text>
      </View>
      <Button
        onPress={() => NativeModules.DevSettings.reload()}
        className="bg-primary">
        <Text className="text-white font-bold">Tải lại</Text>
      </Button>
    </SafeAreaView>
  );
};

export default NotConnectNet;
