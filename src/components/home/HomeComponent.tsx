import {Dimensions, Image, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Avatar, TouchableRipple} from 'react-native-paper';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../../constans/screens';
import {ImageZoom} from '@likashefqet/react-native-image-zoom';
import Lightbox from 'react-native-lightbox-v2';
type cript = {
  avatar: string;
  useCreate: string;
  dateCreate: string;
  title: string;
  thumbnail: string;
};
const HomeComponent = ({
  avatar,
  useCreate,
  dateCreate,
  title,
  thumbnail,
}: cript) => {
  const navigator = useNavigation();
  const [imageHeight, setImageHeight] = useState(0);
  const getHeightImage = () => {
    if (thumbnail != undefined && thumbnail != null && thumbnail.length > 0) {
      Image.getSize(thumbnail, (width, height) => {
        const aspectRatio = width / height;
        const scaledHeight = Dimensions.get('screen').width / aspectRatio;
        setImageHeight(scaledHeight);
        return;
      });
    } else {
      setImageHeight(0);
      return;
    }
  };
  getHeightImage();
  return (
    <>
      <View className="w-full bg-white">
        <View>
          <TouchableRipple
            rippleColor="transparent"
            onPress={() => {
              //@ts-ignore
              navigator.navigate(SCREENS.HOMEDETAIL.KEY);
            }}>
            <View className="mx-3">
              <View className="flex flex-row justify-start items-center py-2">
                <Avatar.Image
                  style={{
                    backgroundColor: 'white',
                    borderColor: 'white',
                    borderWidth: 2,
                  }}
                  size={50}
                  source={{uri: avatar!}}
                  onError={err => {
                    console.log(err);
                  }}></Avatar.Image>
                <View>
                  <View className="flex flex-col ml-2">
                    <Text>{useCreate}</Text>
                    <Text>{dateCreate}</Text>
                  </View>
                </View>
              </View>
              <View className="py-2">
                <Text>{title}</Text>
              </View>
            </View>
          </TouchableRipple>
          <View>
            <Lightbox>
              <Image
                source={{uri: thumbnail}}
                style={{
                  width: '100%',
                  resizeMode: 'contain',
                  flex: 1,
                  height: imageHeight,
                }}
                onError={err => {
                  console.log(err);
                }}
              />
            </Lightbox>
          </View>
        </View>
        <View className="border-t-[1px] h-4 border-t-gray-300"></View>
      </View>
    </>
  );
};

HomeComponent.propTypes = {
  avatar: PropTypes.string,
  useCreate: PropTypes.string,
  dateCreate: PropTypes.string,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
};

export default HomeComponent;
