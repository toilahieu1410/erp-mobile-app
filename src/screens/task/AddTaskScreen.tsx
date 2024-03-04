import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import AppHeader from '../../components/navigators/AppHeader';
import {Icon, TouchableRipple} from 'react-native-paper';
import CustomTextInput from '../../components/app/input/CustomTextInput';
import SelectOption from '../../components/app/input/SelectOption';
import SelectDateTime from '../../components/app/input/SelectDate';
import CusTomTextInputMultiline from '../../components/app/input/CusTomTextInputMultiline';
import ModalAddUserWatching from '../../components/task/addTask/ModalAddUserWatching';
import {Attachment, Task} from '../../models/Task';
import AttachmentTaskComponent from '../../components/task/addTask/AttachmentTaskComponent';

const AddTaskScreen = () => {
  const [data, setData] = useState<Task>({
    type: null,
  });

  const countries = [
    {key: 'Task', display: 'Task'},
    {key: 'Visit', display: 'Visit'},
    {key: 'Tele sale', display: 'Tele sale'},
  ];

  const [Attachment, setAttachment] = useState<Attachment[]>([]);

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
      <View className="flex-1 my-2 h-full ">
        <ScrollView className="px-2">
          <SelectOption
            option={countries}
            title="Loại công việc"
            value={data?.type}
            onSelect={(key, name) => {
              setData({
                ...data,
                type: key, // Update the age property
              });
            }}
          />
          {data.type && (
            <View>
              <CustomTextInput label="Tiêu đề" />
              <CustomTextInput label="Khách hàng" />
              {data.type == 'Task' ? (
                <CusTomTextInputMultiline label="Mô tả" />
              ) : (
                <View>
                  <CusTomTextInputMultiline label="Nội dung trao đổi" />
                  <CusTomTextInputMultiline label="Khách hàng đã trao đổi" />
                </View>
              )}

              <AttachmentTaskComponent
                data={Attachment}
                onChangeValue={value => setAttachment(value)}
              />
              <ModalAddUserWatching />

              <SelectDateTime
                title="DeadLine"
                onSelect={date => {
                  console.log(date);
                }}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddTaskScreen;
