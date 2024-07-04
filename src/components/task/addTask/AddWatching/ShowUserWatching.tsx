import {
  GestureResponderEvent,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Watching} from '../../../../models/Task';
import {Icon} from 'react-native-paper';
type ShowUserWatchingProps = {
  data?: Watching;
  onClose?: null | ((event: GestureResponderEvent) => void) | undefined;
};
const ShowUserWatching = ({data, onClose}: ShowUserWatchingProps) => {
  return (
    <View className="p-2 flex flex-row flex-nowrap justify-start items-center">
      <View className="px-2">
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
          }}
          source={{
            uri: data?.avatar,
          }}
        />
      </View>
      <View className="h-full px-2 flex-1 justify-between flex-row items-center border-b border-b-gray-300">
        <Text className="text-base text-black">{data?.fullName}</Text>
        <Pressable
          className="bg-gray-300 rounded-full p-[2px]"
          onPress={onClose}>
          <Icon size={20} source={'close'} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default ShowUserWatching;
