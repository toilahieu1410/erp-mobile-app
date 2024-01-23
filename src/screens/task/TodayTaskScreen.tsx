import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import AppHeader from '../../components/navigators/AppHeader';
import Lightbox from 'react-native-lightbox-v2';
import {useNavigation} from '@react-navigation/native';
const WINDOW_WIDTH = Dimensions.get('window').width;
const BASE_PADDING = 10;
const TodayTaskScreen = () => {
  const navigator = useNavigation();
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
            style={styles.contain}
            resizeMode="contain"
            source={{
              uri: 'https://www.yayomg.com/wp-content/uploads/2014/04/yayomg-pig-wearing-party-hat.jpg',
            }}
          />
        </Lightbox>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: BASE_PADDING,
  },
  closeButton: {
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    padding: 8,
    borderRadius: 3,
    textAlign: 'center',
    margin: 10,
    alignSelf: 'flex-end',
  },
  customHeaderBox: {
    height: 150,
    backgroundColor: '#6C7A89',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginLeft: -BASE_PADDING,
    marginRight: -BASE_PADDING,
  },
  col: {
    flex: 1,
  },
  square: {
    width: WINDOW_WIDTH / 2,
    height: WINDOW_WIDTH / 2,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  squareFirst: {
    backgroundColor: '#C0392B',
  },
  squareSecond: {
    backgroundColor: '#019875',
  },
  squareText: {
    textAlign: 'center',
    color: 'white',
  },
  carousel: {
    height: WINDOW_WIDTH - BASE_PADDING * 2,
    width: WINDOW_WIDTH - BASE_PADDING * 2,
    backgroundColor: 'white',
  },
  contain: {
    flex: 1,
    height: 150,
  },
  text: {
    marginVertical: BASE_PADDING * 2,
  },
});
export default TodayTaskScreen;
