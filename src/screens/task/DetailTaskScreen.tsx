import React, {useState, useEffect, useRef} from 'react';
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppHeader from '../../components/navigators/AppHeader';
import { showMessage } from 'react-native-flash-message';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import { MultiSelect } from 'react-native-element-dropdown';
import moment from 'moment';
import { moderateScale } from '../size';
import TaskService from '../../services/taskWorks/serviceTask';
import ServiceTakeLeave from '../../services/listWorks/serviceTakeLeave';
import { SCREENS } from '../../constants/screens';

interface Follower {
  id: string;
  userId: string;
  userName: string;
  hoTen: string;
  maPhongBan: string;
}

interface Task {
  id: string;
  title: string;
  typeJob: string; 
  customerCode: string;
  content: string;
  feedback: string;
  vote: string; 
  deadline: string;
  followers: Follower[];
}

interface TypeJob {
  value: string; // Chuyển đổi value sang kiểu string
  display: string;
}

const DetailTaskScreen: React.FC = () => {
  // Sử dụng hook useRoute để lấy params từ route
  const route = useRoute();
  const navigator = useNavigation();

  const { task } = route.params as {task: Task }

  const [title, setTitle] = useState(task.title)
  const [content, setContent] = useState(task.content)
  const [customerCode, setCustomerCode] = useState(task.customerCode || 'string')
  const [feedBack, setFeedBack] = useState(task.feedback)
  const [vote, setVote] = useState(task.vote);  
  const [typeJob, setTypeJob] = useState(task.typeJob); 
  const [followers, setFollowers] = useState<string[]>(task.followers.map(f => f.userId) || []);
  const [deadline, setDeadline] = useState<Date | null>(new Date(task.deadline))
  const [openDeadlinePicker, setOpenDeadlinePicker] = useState(false)
  const [changeJobTypes, setChangeJobTypes] = useState<TypeJob[]>([])
  const [users, setUsers] = useState<Follower[]>([]);
  const richTextContent = useRef<RichEditor>(null)
  const richTextFeedBack = useRef<RichEditor>(null)


  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        const response = await TaskService.getJobTypes()
        if (response.isSuccess) {
          setChangeJobTypes(response.value.map((item: any) => ({
            value: item.value.toString(), 
            display: item.display
          })));
        }
      } catch (error) {
        console.error('Error fetching job types', error)
      }
    }
    fetchJobTypes()
  }, [])

  const followerOptions = users.map(item => ({
    label: item.hoTen,
    value: item.id
  }))

  const handleSave = async () => {
    try {
      const formattedDeadline = deadline ? moment(deadline).format('DD/MM/YYYY') : '';
      const updateData = {
        id: task.id,
        title: title,
        content: content,
        customerCode: customerCode,
        feedback: feedBack,
        deadline: formattedDeadline,
        followers: followers || [], // Ensure followers is an array
        vote: vote, // Chuyển đổi vote thành chuỗi
        typeJob: typeJob, // Chuyển đổi typeJob thành chuỗi
      }
      // @ts-ignore
      await TaskService.updateTask(updateData)
      showMessage({
        message: 'Success',
        description: 'Cập nhập công việc thành công',
        type: 'success'
      })

      //@ts-ignore
      navigator.navigate(SCREENS.TASK.KEY, {id: task.id})
    } catch (error: any) {

      const errorMessage = error.response?.data?.detail || 'Cập nhập công việc thất bại';
      showMessage({
        message: 'Error',
        description: errorMessage,
        type: 'danger'
      })
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await ServiceTakeLeave.getUserHandOver('');
        //@ts-ignore
        setUsers(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <AppHeader
        title={task.title}
        centerTitle={true}
        showButtonBack={true}
        backgroundColor='#fff'
        titleColor='#000'
        actions={
          <View className="flex flex-row justify-end items-center">
            <TouchableOpacity onPress={ () => handleSave()}>
              <Text className="text-black font-bold text-sm px-2">Edit</Text>
            </TouchableOpacity>
          </View>
        }
      />
      <View className='flex-1'>
        <ScrollView>
            <View className='w-full '>
              <View className='bg-white shadow-md rounded px-4 pt-4 pb-8 mb-4'>
                <View className='mb-4'>
                  <Text className='block text-gray-700 text-sm font-bold mb-2'>Tiêu đề</Text>
                  <TextInput 
                    value={title}
                    onChangeText={setTitle}
                    placeholder='Title'
                    className='shadow appearance-none border-slate-300 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
                </View>
                <View className='mb-4 min-h-[180px]'>
                  <Text className='block text-gray-700 text-sm font-bold mb-2'>Nội dung </Text>
                  <RichEditor 
                    ref={richTextContent}
                    initialContentHTML={content}
                    onChange={setContent}
                    className='shadow appearance-none border-slate-300 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[100px] '
                  />
                   <RichToolbar editor={richTextContent}   selectedIconTint="blue"/>
                </View>
                <View className='mb-4 inline-block min-h-[180px]'>
                  <Text className='block text-gray-700 text-sm font-bold mb-2'>Feedback</Text>
                  <RichEditor 
                    ref={richTextFeedBack}
                    initialContentHTML={feedBack}
                    onChange={setFeedBack}
                    className='shadow appearance-none border-slate-300 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[100px]'
                  />
                   <RichToolbar editor={richTextFeedBack}   selectedIconTint="blue"/>
                </View>
          
                  <View className='mb-4'>
                  <Text className='block text-gray-700 text-sm font-bold mb-2'>Customer code</Text>
                  <TextInput 
                    value={customerCode}
                    onChangeText={setCustomerCode}
                    placeholder='Title'
                    className='shadow appearance-none border-slate-300 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
                </View>
                <View className='mb-4'>
                <Text className='block text-gray-700 text-sm font-bold mb-2'>Người theo dõi</Text>
                <MultiSelect 
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={followerOptions}
                  labelField="label"
                  valueField="value"
                  placeholder="Select followers"
                  value={followers}
                  search
                  searchPlaceholder='Search...'
                  onChange={item => setFollowers(item)}
                  renderLeftIcon={() => (
                    <Icon name='ribbon-outline' size={moderateScale(20)}/>
                  )}
                  renderItem={(item) => (
                    <View style={styles.item}>
                      <Text style={styles.selectedTextStyle}>{item.label}</Text>
                      <Icon name='close' size={moderateScale(20)}/>
                    </View>
                  )}
                  renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                      <View style={styles.selectedStyle}>
                        <Text style={styles.textSelectedStyle}>{item.label}</Text>
                        <Icon name='close' size={moderateScale(20)}/>
                      </View>
                    </TouchableOpacity>
                  )}  
                />
                </View>
                <View className='mb-4 flex-row items-center justify-between'>
                  <Text className='  text-gray-700 text-sm font-bold bg-blue-400 '>Vote </Text>
                 <Picker
                  style={{height: moderateScale(50), width: '100%'}}
                  selectedValue={vote}
                  onValueChange={(itemValue)  => setVote(itemValue)}
                  className='bg-blue-400 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400' 
                 >
                  <Picker.Item label='Kem' value={'Kem'}/>
                  <Picker.Item label='TrungBinh' value={'TrungBinh'}/>
                  <Picker.Item label='Tot' value={'Tot'}/>
                 </Picker>
                </View>
                <View className='mb-4'>
                <Text className='block text-gray-700 text-sm font-bold mb-2'>Type Job</Text>
                <Picker
                  selectedValue={typeJob}
                  onValueChange={(itemValue) => setTypeJob(itemValue)}
                  style={{ height: 50, width: '100%' }}
                >
                   <Picker.Item label={typeJob} value="" />
                  {changeJobTypes.map((jobType) => (
                    <Picker.Item key={jobType.value} label={jobType.display} value={jobType.value} />
                  ))}
                </Picker>
              </View>
                <View className='mb-4'>
                <Text className='block text-gray-700 text-sm font-bold mb-2'>Deadline</Text>
                <TouchableOpacity onPress={() => setOpenDeadlinePicker(true)}>
                  <Text className='shadow appearance-none border-slate-300 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                    {deadline ? moment(deadline).format('DD/MM/YYYY HH:mm:ss') : 'Select Deadline'}
                  </Text>
                </TouchableOpacity>
                <DatePicker
                  mode='datetime'
                  modal
                  open={openDeadlinePicker}
                  date={deadline || new Date()}
                  onConfirm={(date) => {
                    setDeadline(date);
                    setOpenDeadlinePicker(false);
                  }}
                  onCancel={() => {
                    setOpenDeadlinePicker(false);
                  }}
                />
              </View>
            </View>
              </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});

export default DetailTaskScreen;
