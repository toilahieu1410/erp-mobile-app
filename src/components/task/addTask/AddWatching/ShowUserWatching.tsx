import {Image, Pressable, Text, View} from 'react-native';
import React from 'react';
import {Watching} from '../../../../models/Task';
import {Icon} from 'react-native-paper';
type ShowUserWatchingProps = {
  data?: Watching[];
};
const ShowUserWatching = ({data = []}: ShowUserWatchingProps) => {
  return (
    <View>
      {data.map((item, index) => (
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
            <Pressable
              className="bg-gray-200 rounded-full p-[2px]"
              onPress={() => {}}>
              <Icon size={20} source={'close'} />
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ShowUserWatching;
