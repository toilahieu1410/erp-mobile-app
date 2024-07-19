import React, {useState, useEffect, useRef} from 'react';
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  TextInput,
  TouchableOpacity
} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import AppHeader from '../../components/navigators/AppHeader';
import AttachmentTaskComponent from '../../components/task/addTask/AttachmentTaskComponent';
import {Divider, Icon, Menu} from 'react-native-paper';
import ChoiceMenu from '../../components/app/menu/ChoiceMenu';
import {SCREENS} from '../../constants/screens';
import TaskService from '../../services/taskWorks/serviceTask';
import { showMessage } from 'react-native-flash-message';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { moderateScale } from '../size';

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
  typejob: number;
  customerCode: string;
  content: string;
  feedback: string;
  vote: number;
  deadline: string;
  followers: Follower[];
}

interface TypeJob {
  value: number;
  display: string;
}

const DetailTaskScreen: React.FC = () => {
  // Sử dụng hook useRoute để lấy params từ route
  const route = useRoute();
  const navigator = useNavigation();

  const { task } = route.params as {task: any}

  const [title, setTitle] = useState(task.title)
  const [content, setContent] = useState(task.content)
  const [customerCode, setCustomerCode] = useState(task.customerCode || 'string')
  const [feedBack, setFeedBack] = useState(task.feedback)
  const [vote, setVote] = useState<number>(Number(task.vote))
  const [typeJob, setTypeJob] = useState<number>(Number(task.typeJob))
  const [followers, setFollowers] = useState(task.followers.map(f => f.id))
  const [deadline, setDeadline] = useState<Date | null>(new Date(task.deadline))
  const [taskData, setTaskData] = useState({
    title,
    content,
    customerCode,
    vote,
    typeJob,
    followers
  })
  const [openDeadlinePicker, setOpenDeadlinePicker] = useState(false)
  const [changeJobTypes, setChangeJobTypes] = useState<TypeJob[]>([])

  const richTextContent = useRef<RichEditor>(null)
  const richTextFeedBack = useRef<RichEditor>(null)

  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        const response = await TaskService.getJobTypes()
        setChangeJobTypes(response.value)
      } catch (error) {
        console.error('Error fetching job types', error)
      }
    }
    fetchJobTypes()
  }, [])

  console.log(vote,'ádasda', typeJob)
  const handleSave = async () => {
    try {
      const formattedDeadline = deadline ? moment(deadline).format('DD/MM/YYYY') : '';
      const updateData = {
        
        ...taskData,
        id: task.id,
        feedback: feedBack,
        deadline: formattedDeadline,
        followers: followers ,
        vote: Number(vote), // Ensure vote is a number
        typeJob: Number(typeJob)
      }
      console.log(updateData,'updateData')
      await TaskService.updateTask(updateData)
      showMessage({
        message: 'Success',
        description: 'Cập nhập công việc thành công',
        type: 'success'
      })

   
      //@ts-ignore
      navigator.navigate(SCREENS.TASK.KEY, {id: task.id})
    } catch (error: any) {
      console.log(error,'errupdate')
      const errorMessage = error.response?.data?.detail || 'Cập nhập công việc thất bại';
      showMessage({
        message: 'Error',
        description: errorMessage,
        type: 'danger'
      })
    }
 
  }
  // const data = {
  //   id: 'KAP-1',
  //   title: 'Gặp khách hàng tại Đình Thôn',
  //   status: 'todo',
  //   userCreate: 'Duclv',
  //   fullNameCreate: 'Lâm Văn Đức',
  //   type: 'visit',
  //   customer: 'Công ty TNHH ....',
  //   customerCode: 'KH000001',
  //   descreption: 'Công ty TNHH ....',
  //   avatarUserCreate:
  //     'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
  //   watching: [
  //     {
  //       username: 'VinhLQ',
  //       fullName: 'Lâm Quang Vinh',
  //       avatar:
  //         'https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/406235614_1046644906482722_7384331104801404722_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=c42490&_nc_ohc=C331E7nigToAX8CaLVh&_nc_ht=scontent.fhan4-1.fna&oh=00_AfAjP5GkQD5p0YFG2rp93uulFCc9xz34eDC9daKb7sx1GQ&oe=65B791B5',
  //     },
  //     {
  //       username: 'Duclv',
  //       fullName: 'Lâm Văn Đức',
  //       avatar:
  //         'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
  //     },
  //     {
  //       username: 'HienLT',
  //       fullName: 'Lâm Thị Hiền',
  //       avatar:
  //         'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg',
  //     },
  //     {
  //       username: 'TanNM',
  //       fullName: 'Nguyễn Minh Tân',
  //       avatar:
  //         'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
  //     },
  //     {
  //       username: 'VinhLQ',
  //       fullName: 'Lâm Quang Vinh',
  //       avatar:
  //         'https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/406235614_1046644906482722_7384331104801404722_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=c42490&_nc_ohc=C331E7nigToAX8CaLVh&_nc_ht=scontent.fhan4-1.fna&oh=00_AfAjP5GkQD5p0YFG2rp93uulFCc9xz34eDC9daKb7sx1GQ&oe=65B791B5',
  //     },
  //   ],
  //   attachment: [{}],
  // };

  console.log(task,'ádasdas')
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
            {/* <ChoiceMenu>
              <Menu.Item
                titleStyle={{color: 'green'}}
                onPress={() => {}}
                title="Done"
              />
              <Menu.Item
                titleStyle={{color: 'red'}}
                onPress={() => {
                  Alert.alert(data.title, 'Bạn có chắc chắn xóa ?', [
                    {
                      text: 'Hủy',
                      style: 'destructive',
                    },
                    {
                      text: 'Đồng ý',
                    },
                  ]);
                }}
                title="Xóa"
              />
              <Divider />
            </ChoiceMenu> */}
            <TouchableOpacity
              onPress={ () => handleSave()}>
              <Text className="text-black font-bold text-sm px-2">Edit11</Text>
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
                <View className='mb-4 flex-row items-center justify-between'>
                  <Text className='  text-gray-700 text-sm font-bold bg-blue-400 '>Vote 111</Text>
                 <Picker
                  style={{height: moderateScale(50), width: '100%'}}
                  selectedValue={vote}
                  onValueChange={(itemValue: number)  => setVote(itemValue)}
                  className='bg-blue-400 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400' 
                 >
                  <Picker.Item label='Kem' value={1}/>
                  <Picker.Item label='TrungBinh' value={2}/>
                  <Picker.Item label='Tot' value={3}/>
                 </Picker>
                </View>
                <View className='mb-4'>
                  <Text className='block text-gray-700 text-sm font-bold mb-2'>Type Job</Text>
                  <Picker
                  selectedValue={typeJob}
                  onValueChange={(itemValue: number) => setTypeJob(itemValue)}
                  style={{ height: 50, width: '100%' }}
                >
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

export default DetailTaskScreen;
