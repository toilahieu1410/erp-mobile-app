import {SafeAreaView, TextInput, View, Pressable} from 'react-native';
import React, {LegacyRef, useEffect} from 'react';
import {Icon} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';
const SearchTaskScreen = () => {
  const navigator = useNavigation();
  const refInputSearch = React.useRef();
  useEffect(() => {
    refInputSearch.current?.focus();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View
        className="flex flex-row flex-nowrap justify-start items-center pr-2 bg-white py-2 border-y border-y-gray-200"
        style={{
          elevation: 2,
        }}>
        <Pressable
          className="px-2"
          onPress={() => {
            navigator.goBack();
          }}>
          <Icon
            source={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-left'}
            size={Platform.OS === 'ios' ? 40 : 25}
          />
        </Pressable>
        <View className="flex-1">
          <TextInput
            ref={refInputSearch}
            className="rounded-xl bg-gray-200 text-base px-2"
            style={{paddingBottom: 3, paddingTop: 3, verticalAlign: 'middle'}}
            placeholder="Tìm kiếm công việc"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchTaskScreen;
