import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import AppHeader from '../../components/navigators/AppHeader';
import {TouchableRipple} from 'react-native-paper';
import SelectOption from '../../components/app/input/SelectOption';
import {Task} from '../../models/Task';
import CustomTextInput from '../../components/app/input/CustomTextInput';
import CusTomTextInputMultiline from '../../components/app/input/CusTomTextInputMultiline';
import AttachmentTaskComponent from '../../components/task/addTask/AttachmentTaskComponent';
import ModalAddUserWatching from '../../components/task/addTask/ModalAddUserWatching';
import SelectDateTime from '../../components/app/input/SelectDate';
import Select from '../../components/app/input/Select';
const EditTaskScreen = () => {
  const route = useRoute();
  //@ts-ignore
  const {id} = route.params;
  const [data, setData] = useState<Task>({
    id: 'KAP-1',
    title: 'Gặp khách hàng tại Đình Thôn',
    status: 'todo',
    userCreate: 'Duclv',
    fullNameCreate: 'Lâm Văn Đức',
    type: 'Visit',
    customerName: 'Công ty TNHH ....',
    customer: 'KH000001',
    description: 'Công ty TNHH ....',
    avatarUserCreate:
      'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
    watching: [
      {
        username: 'VinhLQ',
        fullName: 'Lâm Quang Vinh',
        avatar:
          'https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/406235614_1046644906482722_7384331104801404722_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=c42490&_nc_ohc=C331E7nigToAX8CaLVh&_nc_ht=scontent.fhan4-1.fna&oh=00_AfAjP5GkQD5p0YFG2rp93uulFCc9xz34eDC9daKb7sx1GQ&oe=65B791B5',
      },
      {
        username: 'Duclv',
        fullName: 'Lâm Văn Đức',
        avatar:
          'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
      },
      {
        username: 'HienLT',
        fullName: 'Lâm Thị Hiền',
        avatar:
          'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg',
      },
      {
        username: 'TanNM',
        fullName: 'Nguyễn Minh Tân',
        avatar:
          'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
      },
      {
        username: 'VinhLQ',
        fullName: 'Lâm Quang Vinh',
        avatar:
          'https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/406235614_1046644906482722_7384331104801404722_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=c42490&_nc_ohc=C331E7nigToAX8CaLVh&_nc_ht=scontent.fhan4-1.fna&oh=00_AfAjP5GkQD5p0YFG2rp93uulFCc9xz34eDC9daKb7sx1GQ&oe=65B791B5',
      },
    ],
    Attachment: [],
    deadline: new Date(2024, 4, 27),
  });

  const countries = [
    {value: 'Task', label: 'Task'},
    {value: 'Visit', label: 'Visit'},
    {value: 'Tele sale', label: 'Tele sale'},
  ];
  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader
        title={`${id}`}
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
                value={data.title}
                onChangeText={text => {
                  setData(prevState => ({
                    ...prevState,
                    title: text,
                  }));
                }}
              />
              <CustomTextInput
                label="Khách hàng"
                value={data.customerName}
                onChangeText={text => {
                  setData(prevState => ({
                    ...prevState,
                    customerName: text,
                  }));
                }}
              />
              {data.type == 'Task' ? (
                <CusTomTextInputMultiline
                  label="Mô tả"
                  value={data.description}
                  onChangeText={text =>
                    setData(prevState => ({
                      ...prevState,
                      description: text,
                    }))
                  }
                />
              ) : (
                <View>
                  <CusTomTextInputMultiline label="Nội dung trao đổi" />
                  <CusTomTextInputMultiline label="Khách hàng đã trao đổi" />
                </View>
              )}

              <AttachmentTaskComponent
                data={data.Attachment}
                onChangeValue={value =>
                  setData(prevState => ({
                    ...prevState,
                    Attachment: value,
                  }))
                }
              />
              <ModalAddUserWatching
                data={data.watching}
                onChangeData={value => {
                  setData(prevState => ({
                    ...prevState,
                    watching: value,
                  }));
                }}
              />

              <SelectDateTime
                title="DeadLine"
                value={data.deadline}
                onSelect={date => {
                  setData(prevState => ({
                    ...prevState,
                    deadline: date,
                  }));
                }}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditTaskScreen;
