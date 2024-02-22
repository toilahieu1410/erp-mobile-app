import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppHeader from '../../components/navigators/AppHeader';

const TaskListScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader
        title="Tất cả công việc"
        showButtonBack={true}
        centerTitle={true}
      />
      <View className="flex-1">
        <Text>Danh sách công việc</Text>
      </View>
    </SafeAreaView>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({});
