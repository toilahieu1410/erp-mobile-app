import {Dimensions, Pressable, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Avatar, TouchableRipple} from 'react-native-paper';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../../constants/screens';
import RenderHTML from 'react-native-render-html';
import ImageFullWidth from '../app/Image/ImageFullWidth';
import Lightbox from 'react-native-lightbox-v2';
import ImageView from 'react-native-image-viewing';

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
  const images = [
    {
      uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4',
    },
    {
      uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34',
    },
    {
      uri: 'https://images.unsplash.com/photo-1569569970363-df7b6160d111',
    },
  ];
  const [visible, setIsVisible] = useState(false);

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
                  onError={err => {}}></Avatar.Image>
                <View>
                  <View className="flex flex-col ml-2">
                    <Text className="text-black font-bold">{useCreate}</Text>
                    <Text className="text-gray-400">{dateCreate}</Text>
                  </View>
                </View>
              </View>
              <View className="py-2 w-full">
                <RenderHTML
                  contentWidth={Dimensions.get('screen').width}
                  source={{html: title}}
                  baseStyle={{width: '100%', color: 'black'}}
                />
              </View>
            </View>
          </TouchableRipple>
          <View>
            <Pressable
              onPress={() => {
                setIsVisible(true);
              }}>
              <Text>Test</Text>
            </Pressable>
            <ImageView
              images={images}
              imageIndex={0}
              visible={visible}
              onRequestClose={() => setIsVisible(false)}
            />

            {/* <Lightbox
              renderContent={() => (
                <View>
                  <ImageFullWidth uri={thumbnail} />
                </View>
              )}>
              <View>
                <ImageFullWidth uri={thumbnail} />
              </View>
            </Lightbox> */}
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
