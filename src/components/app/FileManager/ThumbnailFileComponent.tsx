import {Image, Text, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-paper';
type ThumbnailFileComponentProps = {
  type: string;
  url?: string;
};

const ThumbnailFileComponent = ({type, url}: ThumbnailFileComponentProps) => {
  return (
    <View className="w-full h-full">
      {type.includes('image') && (
        <Image source={{uri: url}} style={{width: '100%', height: '100%'}} />
      )}
      {type.includes('video') && (
        <View className="w-full h-full bg-gray-200 items-center justify-center">
          <Icon source={'play'} size={50} color="gray" />
        </View>
      )}
      {type.includes('video') == false && type.includes('image') == false && (
        <View className="w-full h-full bg-gray-200 items-center justify-center">
          <View>
            <Text className="font-bold text-base">{type}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default ThumbnailFileComponent;
