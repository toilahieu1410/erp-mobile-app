import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';

import AppHeader from '../../components/navigators/AppHeader';
import CustomTextInput from '../../components/app/input/CustomTextInput';
import SelectDateTime from '../../components/app/input/SelectDate';
import CusTomTextInputMultiline from '../../components/app/input/CusTomTextInputMultiline';
import ModalAddUserWatching from '../../components/task/addTask/ModalAddUserWatching';
import {Attachment, Task, Watching} from '../../models/Task';
import AttachmentTaskComponent from '../../components/task/addTask/AttachmentTaskComponent';
import Select from '../../components/app/input/Select';
import { useNavigation } from '@react-navigation/native';
import TaskService from '../../services/taskWorks/serviceTask';
import { showMessage } from 'react-native-flash-message';
import { moderateScale } from '../size';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import ServiceTakeLeave from '../../services/listWorks/serviceTakeLeave';
import { Dropdown } from 'react-native-element-dropdown';
import { styles } from '../../assets/css/ListTaskScreen/addTaskScreen';

enum TypeJob {
  Kem = 1,
  TrungBinh = 2,
  Tot = 3
}
const AddNewTaskScreen = () => {

  const navigation = useNavigation()
  const [jobTypes, setJobTypes] = useState([])
  const [selectedJobType, setSelectedJobType] = useState({ value: null, display: '' })
  const [taskData, setTaskData] = useState({
    title: '',
    typejob: 1,
    internalCode: '',
    customerCode: '',
    content: '',
    feedback: '',
    vote: 1,
    locationCheckIn: '',
    locationCheckOut: '',
    deadline: moment(new Date()).format('DD/MM/YYYY'),
    followers: [],
  })
  // const [data, setData] = useState<Task>({
  //   id: 'null',
  //   title: undefined,
  //   type: undefined,
  //   watching: [],
  //   Attachment: [],
  // });

  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [handOverToUserId, setHandOverToUserId] = useState<string>('');

  const countries = [
    {value: 'Task', label: 'Task'},
    {value: 'Visit', label: 'Visit'},
    {value: 'Tele sale', label: 'Tele sale'},
  ];

  const [Attachment, setAttachment] = useState<Attachment[]>([]);
  const [watchings, setWatchings] = useState<Watching[]>([]);

  console.log(taskData,'taskDatataskData',users)
  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        const response = await TaskService.getJobTypes();
        if (response.isSuccess) {
          setJobTypes(response.value);
        } else {
          Alert.alert('Error', response.error.message);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch job types.');
      }
    };
    fetchJobTypes();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchText.length >= 0) {
        try {
          const users = await ServiceTakeLeave.getUserHandOver(searchText);
          setUsers(users);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      } else {
        setUsers([]);
      }
    };
    fetchUsers();
  }, [searchText]);











  const handleSave = async () => {
    try {
      const response = await TaskService.createListTask(taskData);
      if (response.isSuccess) {
        showMessage({
          message: 'Success',
          description: 'Task created successfully.',
          type: 'success',
        });
        navigation.goBack();
      } 
    } catch (error) {
      console.log(error,'ressssss')
      // Xử lý lỗi từ phản hồi API trong catch
      const errorMessages = error.response?.data?.errors?.map(err => err.message).join('\n') || 'Failed to create task.';
      showMessage({
        message: 'Error',
        description: errorMessages,
        type: 'danger',
      });
    }
  };

  const handleUserSelect = (item) => {
    setHandOverToUserId(item.id);
    setSelectedUser(item.hoTen);
    setTaskData({ ...taskData, followers: [...taskData.followers, item.id] });
  };

  // useEffect(() => {
  //   const data = [
  //     {
  //       fullName: 'Lâm Văn Đức',
  //       username: 'DucLV',
  //       avatar:
  //         'https://images.twinkl.co.uk/tw1n/image/private/t_630/u/ux/crocodile2_ver_1.png',
  //     },
  //     {
  //       fullName: 'Lâm Quang Vinh',
  //       username: 'VinhLQ',
  //       avatar:
  //         'https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=600&quality=80',
  //     },
  //     {
  //       fullName: 'Lâm Thị Hiền',
  //       username: 'HienLT',
  //       avatar:
  //         'https://wallpapers.com/images/featured/nature-2ygv7ssy2k0lxlzu.jpg',
  //     },
  //   ];
  //   setWatchings(data);
  // }, []);
  return (
    <SafeAreaView className="flex-1 bg-white">
    <AppHeader
        title="Tạo công việc"
        centerTitle
        showButtonBack
        backgroundColor="#fff"
        titleColor="#000"
        actions={
          <TouchableOpacity onPress={handleSave}>
            <Text style={{ paddingHorizontal: 10, fontWeight: 'bold', color: 'black' }}>Lưu</Text>
          </TouchableOpacity>
        }
      />
      <View style={{flex:1, marginVertical: moderateScale(10)}}>
        <ScrollView contentContainerStyle={{paddingHorizontal: 10}}>
        <View >
            <Text>Loại công việc</Text>
            <Picker
              selectedValue={selectedJobType}
              style={{ height: 50, width: '100%' }}
              onValueChange={(itemValue) => {
                setSelectedJobType(itemValue);
                setTaskData({ ...taskData, typejob: itemValue });
              }}
            >
              {jobTypes.map((type) => (
                <Picker.Item label={type.display} value={type.value} key={type.value} />
              ))}
            </Picker>
          </View>
          {selectedJobType !== null && (
            <View>
              <CustomTextInput 
                label='Tiêu đề'
                onChangeText={text => setTaskData({ ...taskData, title: text})}
                value={taskData.title}
              />
                  <CustomTextInput
                label="Mã nội bộ"
                onChangeText={text => setTaskData({ ...taskData, internalCode: text })}
                value={taskData.internalCode}
              />
              <CustomTextInput
                label="Mã khách hàng"
                onChangeText={text => setTaskData({ ...taskData, customerCode: text })}
                value={taskData.customerCode}
              />
              <CusTomTextInputMultiline
                label="Nội dung"
                onChangeText={text => setTaskData({ ...taskData, content: text })}
                value={taskData.content}
              />
                <View style={styles.flexVertical}>
            <Text style={styles.textLeft}>Bàn giao cho</Text>
            <TextInput
              editable={false}
              style={[styles.inputEdit, {color:'#2179A9'}]}
              placeholder="Tìm kiếm người bàn giao"
              value={selectedUser}
              onChangeText={setSearchText}
            />
            <Dropdown
              inputSearchStyle={styles.searchStyle}
              iconStyle={styles.iconStyle}
              style={styles.dropdown}
              containerStyle={styles.dropdownContainer}
              itemTextStyle={styles.dropdownItemText}
              selectedTextStyle={styles.dropdownSelectedText}
              data={users}
              labelField="hoTen"
              valueField="id"
              placeholder="Người bàn giao"
              search
              searchPlaceholder="Gõ để tìm kiếm"
              value={handOverToUserId}
              onChange={handleUserSelect}
            />
        </View>
                <CusTomTextInputMultiline
                label="Phản hồi"
                onChangeText={text => setTaskData({ ...taskData, feedback: text })}
                value={taskData.feedback}
              />
              <CustomTextInput
                label="Bình chọn"
                keyboardType="numeric"
                onChangeText={text => setTaskData({ ...taskData, vote: Number(text) })}
                value={String(taskData.vote)}
              />
              <CustomTextInput
                label="Vị trí CheckIn"
                onChangeText={text => setTaskData({ ...taskData, locationCheckIn: text })}
                value={taskData.locationCheckIn}
              />
              <CustomTextInput
                label="Vị trí CheckOut"
                onChangeText={text => setTaskData({ ...taskData, locationCheckOut: text })}
                value={taskData.locationCheckOut}
              />
              <SelectDateTime
                title="Deadline"
                onSelect={date => setTaskData({ ...taskData, deadline: moment(date).format('DD/MM/YYYY') })}
              />
              <AttachmentTaskComponent
                data={taskData.attachment || []}
                onChangeValue={value => setTaskData({ ...taskData, attachment: value })}
              />
                  
            </View>
          )}
        </ScrollView>

      </View>
      {/* <View className="flex-1 my-2 h-full ">
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
      </View> */}
    </SafeAreaView>
  );
};

export default AddNewTaskScreen;
