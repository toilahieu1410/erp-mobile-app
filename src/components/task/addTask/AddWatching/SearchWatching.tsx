import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {Watching} from '../../../../models/Task';
import {Icon} from 'react-native-paper';
import {COLORS} from '../../../../constants/colors';
type SearchWatchingProps = {
  data?: Watching[];
  onHide?: (value: boolean) => void;
  onSelect?: (value: Watching) => void;
};

const SearchWatching = ({data = [], onHide, onSelect}: SearchWatchingProps) => {
  const dataObject = [
    {
      username: 'Lâm Văn Đức',
      fullName: 'DucLV',
      avatar:
        'https://images.twinkl.co.uk/tw1n/image/private/t_630/u/ux/crocodile2_ver_1.png',
      isExist: false,
    },
    {
      username: 'Lâm Quang Vinh',
      fullName: 'VinhLQ',
      avatar:
        'https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=600&quality=80',
      isExist: true,
    },
    {
      username: 'Lâm Thị Hiền',
      fullName: 'HienLT',
      avatar:
        'https://wallpapers.com/images/featured/nature-2ygv7ssy2k0lxlzu.jpg',
      isExist: false,
    },
  ];

  return (
    <View className="flex-1">
      <View className="flex flex-row justify-between items-center p-2">
        <TextInput
          autoFocus
          className="bg-white flex-1 text-base p-1 rounded-lg"
          placeholder="Tìm kiếm"
        />

        <Pressable
          onPress={() => {
            if (onHide) {
              onHide(false);
            }
          }}>
          <Text className="text-white font-bold px-2 text-base">Hủy</Text>
        </Pressable>
      </View>
      <ScrollView>
        <View
          className="flex-1 bg-white w-full z-10"
          style={{height: Dimensions.get('screen').height}}>
          {dataObject.map((item, index) => (
            <View
              key={index}
              className="p-2 flex flex-row flex-nowrap justify-start items-center">
              <View className="px-2">
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                  }}
                  source={{
                    uri: item.avatar,
                  }}
                />
              </View>
              <View className="h-full px-2 flex-1 justify-between flex-row items-center border-b border-b-gray-300">
                <Text className="text-base text-black">{item.fullName}</Text>
                <Icon
                  size={25}
                  source={item.isExist == true ? 'check' : 'plus'}
                  color={COLORS.PRIMARY}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchWatching;

const styles = StyleSheet.create({});
