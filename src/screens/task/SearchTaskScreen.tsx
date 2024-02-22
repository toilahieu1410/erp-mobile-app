import {Platform, SafeAreaView, TextInput, View} from 'react-native';
import React, {useEffect} from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
const SearchTaskScreen = () => {
  const navigator = useNavigation();
  const refInputSearch = React.useRef<TextInput>();
  useEffect(() => {
    refInputSearch.current?.focus();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Appbar.Header
        style={{
          elevation: Platform.OS === 'ios' ? 2 : 4,
          backgroundColor: '#ffffff',
          height: 50,
        }}>
        <Appbar.BackAction
          rippleColor="transparent"
          className="p-0 m-0"
          onPress={() => {
            navigator.goBack();
          }}
        />
        <View className="flex flex-1 flex-row justify-between items-center w-full bg-gray-300 rounded-xl overflow-hidden mr-2">
          <TextInput
            ref={refInputSearch}
            className="rounded-xl text-sm flex-1 px-2 py-0"
            placeholder="Tìm kiếm công việc"
          />
        </View>
      </Appbar.Header>
    </SafeAreaView>
  );
};

export default SearchTaskScreen;
