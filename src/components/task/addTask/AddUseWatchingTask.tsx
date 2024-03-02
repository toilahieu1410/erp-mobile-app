import {Animated, Pressable, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {Watching} from '../../../models/Task';
import {TextInput} from 'react-native-paper';

type AddUserWatchingTaskProps = {
  UserWatching?: Watching[] | [];
  onChangeData?: (value: Watching[]) => void;
  showInputSearch?: boolean | false;
};

const AddUseWatchingTask = ({
  UserWatching,
  onChangeData,
  showInputSearch,
}: AddUserWatchingTaskProps) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const toggleInput = () => {
    Animated.timing(slideAnimation, {
      toValue: showInputSearch ? 0 : 1,
      duration: 500, // Độ dài của animation (200s trong ví dụ này)
      useNativeDriver: true, // Sử dụng native driver để tối ưu hóa hiệu suất
    }).start();
  };

  const showInputAnimation = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0], // Giá trị ban đầu là -300, giá trị cuối cùng là 0
  });

  return (
    <View>
      <Animated.View
        style={{
          transform: [{translateY: showInputAnimation}],
        }}>
        {showInputSearch && (
          <TextInput className="border-2 border-black"></TextInput>
        )}
      </Animated.View>
      <Pressable onPress={toggleInput}>
        <Text>Test</Text>
      </Pressable>
    </View>
  );
};

export default AddUseWatchingTask;
