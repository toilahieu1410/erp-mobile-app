import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../components/navigators/AppHeader';
import {TouchableRipple} from 'react-native-paper';
import CustomTextInput from '../../components/app/input/CustomTextInput';
import SelectDateTime from '../../components/app/input/SelectDate';
import CusTomTextInputMultiline from '../../components/app/input/CusTomTextInputMultiline';
import ModalAddUserWatching from '../../components/task/addTask/ModalAddUserWatching';
import {Attachment, Task, Watching} from '../../models/Task';
import AttachmentTaskComponent from '../../components/task/addTask/AttachmentTaskComponent';
import Select from '../../components/app/input/Select';

const AddTaskScreen = () => {
  const [data, setData] = useState<Task>({
    id: 'null',
    title: undefined,
    type: undefined,
    watching: [],
    Attachment: [],
  });

  const countries = [
    {value: 'Task', label: 'Task'},
    {value: 'Visit', label: 'Visit'},
    {value: 'Tele sale', label: 'Tele sale'},
  ];

  const [Attachment, setAttachment] = useState<Attachment[]>([]);
  const [watchings, setWatchings] = useState<Watching[]>([]);

  useEffect(() => {
    const data = [
      {
        fullName: 'Lâm Văn Đức',
        username: 'DucLV',
        avatar:
          'https://images.twinkl.co.uk/tw1n/image/private/t_630/u/ux/crocodile2_ver_1.png',
      },
      {
        fullName: 'Lâm Quang Vinh',
        username: 'VinhLQ',
        avatar:
          'https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=600&quality=80',
      },
      {
        fullName: 'Lâm Thị Hiền',
        username: 'HienLT',
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
        backgroundColor='#fff'
        titleColor='#000'
        actions={
          <TouchableRipple>
            <Text className="px-2 font-bold text-black text-sm">Lưu</Text>
          </TouchableRipple>
        }
      />
      <View className="flex-1 my-2 h-full ">
        <ScrollView className="px-2">
          <Select
            title={'Loại công việc'}
            option={countries}
            value={data?.type}
            onSelect={selected => {
              setData({
                ...data,
                type: selected.value,
              });
            }}
          />

          {data.type && (
            <View>
              <CustomTextInput
                label="Tiêu đề"
                onChangeText={() => {}}
                value={data.title}
              />
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
                  setWatchings(value);
                }}
              />

              <SelectDateTime title="DeadLine" onSelect={date => {}} />
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddTaskScreen;
