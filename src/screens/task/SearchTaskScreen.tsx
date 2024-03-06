import {SafeAreaView, TextInput, View,Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {Icon} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import { Platform } from 'react-native';
const SearchTaskScreen = () => {
  const navigator = useNavigation();
  const refInputSearch = React.useRef<TextInput>();
  useEffect(() => {
    refInputSearch.current?.focus();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white">
        <View className="flex flex-row flex-nowrap justify-start items-center pr-2 border-b border-b-gray-300 bg-white" style={{elevation:3,shadowColor:'#000000',shadowOpacity:0.8}}>
            <Pressable className="px-2" onPress={()=>{navigator.goBack()}}>
            <Icon source={Platform.OS ==='ios' ? 'chevron-left' : 'arrow-left'} size={40} />
            </Pressable>
            <View className="flex-1 py-2">
                <TextInput
                ref={refInputSearch}
                className="rounded-xl text-sm flex-1 px-2 py-0 bg-gray-200"
                placeholder="Tìm kiếm công việc"
              />
            </View>
          </View>
        

    </SafeAreaView>
  );
};

export default SearchTaskScreen;
