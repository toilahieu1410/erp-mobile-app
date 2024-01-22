import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import AppHeader from '../../components/navigators/AppHeader';

const AddNewTaskScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <AppHeader title="Thêm công việc mới" showButtonBack={true}></AppHeader>
      <View>
        <Text>Add New Task Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default AddNewTaskScreen;
