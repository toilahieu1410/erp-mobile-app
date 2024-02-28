import {
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AppHeader from '../../components/navigators/AppHeader';
import {TouchableRipple} from 'react-native-paper';
import CustomTextInput from '../../components/app/input/CustomTextInput';
import SelectOption from '../../components/app/input/SelectOption';
import Editor from '../../components/app/input/Editor';
import SelectDateTime from '../../components/app/input/SelectDate';
import CusTomTextInputMultiline from '../../components/app/input/CusTomTextInputMultiline';

const AddTaskScreen = () => {
  console.log('test ');
  const [text, setText] = useState<string | undefined>();
  const countries = [
    {key: 'Task', display: 'Task'},
    {key: 'Visit', display: 'Visit'},
    {key: 'Tele sale', display: 'Tele sale'},
  ];
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
      <View className="flex-1 my-2">
        <ScrollView className="px-2">
          <SelectOption
            option={countries}
            title="Loại công việc"
            value={text}
            onSelect={(key, name) => {
              setText(key);
            }}
          />
          <CustomTextInput label="Tiêu đề" />
          <CustomTextInput label="Khách hàng" />

          <CusTomTextInputMultiline label="Description" />

          <CustomTextInput label="Người theo dõi" />
          <SelectDateTime
            title="DeadLine"
            onSelect={date => {
              console.log(date);
            }}
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={false}
            onRequestClose={() => {}}>
            <View className="bg-red-50 w-full h-full">
              <Text>Test</Text>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddTaskScreen;
