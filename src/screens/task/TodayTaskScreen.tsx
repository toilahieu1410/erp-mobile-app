import {SafeAreaView, View} from 'react-native';
import React from 'react';
import AppHeader from '../../components/navigators/AppHeader';
const TodayTaskScreen = () => {
  // const renderImage = () => (
  //   <Image
  //     source={{
  //       uri: 'https://drive.google.com/uc?id=1pjiJvIJwbmtzztpk3xqjfYcxpqSOmwgj',
  //     }}
  //     style={{width: 500, height: 500}}
  //     resizeMode="contain"
  //   />
  // );

  return (
    <SafeAreaView className="flex-1">
      <AppHeader title="Công việc hôm nay" showButtonBack={true}></AppHeader>
      <View className="flex-1"></View>
    </SafeAreaView>
  );
};

export default TodayTaskScreen;
