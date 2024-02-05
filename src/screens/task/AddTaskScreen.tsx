import {SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import AppHeader from '../../components/navigators/AppHeader';
import {TouchableRipple} from 'react-native-paper';
import InputChangePassword from '../../components/account/ChangePassword/InputChangePassword';

const AddTaskScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader
        title="Tạo công việc"
        centerTitle={true}
        showButtonBack={true}
        actions={
          <TouchableRipple>
            <Text className="px-2 font-bold text-black text-sm">Lưu</Text>
          </TouchableRipple>
        }
      />
      <View className="flex-1 px-2 my-2">
        <InputChangePassword label="Tiêu đề" />
        <InputChangePassword label="Tiêu đề" />
        <InputChangePassword label="Tiêu đề" />
      </View>
    </SafeAreaView>
  );
};

export default AddTaskScreen;
