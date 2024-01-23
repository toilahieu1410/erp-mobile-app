import {SafeAreaView, View} from 'react-native';
import React from 'react';
import AppHeader from '../../components/navigators/AppHeader';
import Lightbox from 'react-native-lightbox-v2';
import {ViewPagerZoom} from 'react-native-image-zoom';
const TodayTaskScreen = () => {
  const renderImage = () => (
    <Image
      source={{
        uri: 'https://drive.google.com/uc?id=1pjiJvIJwbmtzztpk3xqjfYcxpqSOmwgj',
      }}
      style={{width: 500, height: 500}}
      resizeMode="contain"
    />
  );

  return (
    <SafeAreaView className="flex-1">
      <AppHeader title="Công việc hôm nay" showButtonBack={true}></AppHeader>
      <View>
        <Lightbox underlayColor="white">
          <Image
            className="w-full h-80"
            resizeMode="contain"
            source={{
              uri: 'https://www.yayomg.com/wp-content/uploads/2014/04/yayomg-pig-wearing-party-hat.jpg',
            }}
          />
        </Lightbox>

        <Image
          source={{
            uri: 'https://www.yayomg.com/wp-content/uploads/2014/04/yayomg-pig-wearing-party-hat.jpg',
            headers: {
              Referer: 'http://...',
            },
          }}></Image>
      </View>
    </SafeAreaView>
  );
};

export default TodayTaskScreen;
