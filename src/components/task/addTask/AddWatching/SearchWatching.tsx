import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Watching} from '../../../../models/Task';
type SearchWatchingProps = {
  onHide?: (value: boolean) => void;
  onSelect?: (value: Watching) => void;
};

const SearchWatching = ({onHide, onSelect}: SearchWatchingProps) => {
  return (
    <View>
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
      <View className="flex-1 bg-white h-full w-full z-10"></View>
    </View>
  );
};

export default SearchWatching;

const styles = StyleSheet.create({});
