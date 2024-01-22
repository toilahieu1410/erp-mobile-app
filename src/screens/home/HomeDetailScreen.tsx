import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import AppHeader from '../../components/navigators/AppHeader';

const HomeDetailScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <AppHeader title="Chi tiết bảng tin" showButtonBack={true}></AppHeader>
      <View>
        <Text>HomeDetail</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeDetailScreen;
