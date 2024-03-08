import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IMAGES} from '../../../constants/images';

const NotConnectNet = () => {
  return (
    <SafeAreaView className="bg-white flex-1 justify-center items-center content-center">
      <View>
        <Image source={IMAGES.WARNING} style={{width: '50%', height: 50}} />
        <Text>No internet</Text>
      </View>
    </SafeAreaView>
  );
};

export default NotConnectNet;

const styles = StyleSheet.create({});
