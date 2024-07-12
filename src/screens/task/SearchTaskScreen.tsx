import React, {LegacyRef, useEffect, useRef, useState} from 'react'
import {SafeAreaView, TextInput, View,Text, Pressable, Platform, StyleSheet, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-paper'
import {useNavigation} from '@react-navigation/native'
import { moderateScale } from '../size';

const SearchTaskScreen = () => {

  const navigator = useNavigation();
  const refInputSearch = useRef<TextInput>(null)
  const [searchTask, setSearchTask] = useState('')

  useEffect(() => {
    //@ts-ignore
    refInputSearch.current?.focus()
  }, [])

  const handleSearch = () => {
  
    if (searchTask.trim()) {
        //@ts-ignore
        navigator.navigate('TaskScreen', { searchQuery: searchTask });
    }
  }

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
            placeholder="Tìm kiếm công việc"
            value={searchTask}
            onChangeText={setSearchTask}
          />
        </View>
        <TouchableOpacity
          style={[styles.searchButton, !searchTask.trim() && styles.disabledButton]}
          onPress={handleSearch}
          disabled={!searchTask.trim()}>
          <Text style={styles.searchButtonText}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    paddingRight: 10,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    height: 40,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  searchButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#2179A9',
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: moderateScale(16),
  },
});

export default SearchTaskScreen;
