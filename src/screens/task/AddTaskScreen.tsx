import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AppHeader from '../../components/navigators/AppHeader';
import {Icon, TouchableRipple} from 'react-native-paper';
import CustomTextInput from '../../components/app/input/CustomTextInput';
import SelectOption from '../../components/app/input/SelectOption';
import SelectDateTime from '../../components/app/input/SelectDate';
import CusTomTextInputMultiline from '../../components/app/input/CusTomTextInputMultiline';
import ModalAddUserWatching from '../../components/task/addTask/ModalAddUserWatching';
import {Attachment, Task, Watching} from '../../models/Task';
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
  const [watchings, setWatchings] = useState<Watching[]>([]);

  useEffect(() => {
    const data = [
      {
        username: 'Lâm Văn Đức',
        fullName: 'DucLV',
        avatar:
          'https://images.twinkl.co.uk/tw1n/image/private/t_630/u/ux/crocodile2_ver_1.png',
      },
      {
        username: 'Lâm Quang Vinh',
        fullName: 'VinhLQ',
        avatar:
          'https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=600&quality=80',
      },
      {
        username: 'Lâm Thị Hiền',
        fullName: 'HienLT',
        avatar:
          'https://wallpapers.com/images/featured/nature-2ygv7ssy2k0lxlzu.jpg',
      },
    ];
    setWatchings(data);
  }, []);
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
              <ModalAddUserWatching
                data={watchings}
                onChangeData={value => {
                  console.log(value);
                }}
              />

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
