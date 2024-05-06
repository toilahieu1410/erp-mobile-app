import {Image, Linking, Text, View} from 'react-native';
import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

type NotificationPops = {
  username: string;
  fullname: string;
  title: string;
  redirect: string;
  avatar: string;
  date: string;
};
//'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg'
const NotificationComponent = ({
  username,
  fullname,
  title,
  redirect,
  avatar,
  date,
}: NotificationPops) => {
  const navigator = useNavigation();
  return (
    <TouchableRipple
      onPress={() =>
        //@ts-ignore
        Linking.openURL('https://reactnavigation.org/docs/deep-linking')
      }>
      <View className="px-2 py-4 flex flex-nowrap flex-row">
        <View>
          <Image
            source={{
              uri: avatar,
            }}
            style={{
              height: 60,
              width: 60,
              resizeMode: 'cover',
              borderRadius: 9999,
            }}
          />
        </View>
        <View className="pl-2 flex-1 flex-col flex-nowrap justify-between items-start">
          <View className="mb-2">
            <Text numberOfLines={3} className="text-black text-sm">
              <Text className="font-bold">{fullname}</Text> {title}
            </Text>
          </View>
          <View>
            <Text className="text-gray-500">{date}</Text>
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
};

export default NotificationComponent;
