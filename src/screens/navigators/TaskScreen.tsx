
import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Button,
  Alert,
  TextInput,
  FlatList,
  RefreshControl
} from 'react-native';
import {ActivityIndicator, TouchableRipple} from 'react-native-paper';
import {COLORS, IMAGES} from '../../constants/screens';
import AppHeader from '../../components/navigators/AppHeader';
import TaskFlatListComponent from '../../components/task/taskMain/TaskFlatListComponent';
import {Task} from '../../models/Task';
import ProcessTaskTodayComponent from '../../components/task/taskMain/ProcessTaskTodayComponent';
import {useFocusEffect, useIsFocused, useNavigation, useRoute} from '@react-navigation/native'
import {SCREENS} from '../../constants/screens'
import MenuTaskComponent from '../../components/task/taskMain/MenuTaskComponent'
import TaskService from '../../services/taskWorks/serviceTask'
import Icon from 'react-native-vector-icons/Ionicons'

// import DatePicker from 'react-native-date-picker';
 import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import moment from 'moment';
import { moderateScale } from '../size';
 import { position } from '../../utils/geoLocation';
 import MapView, {Marker, Polyline} from 'react-native-maps';

interface Follower {
  id: string;
  userId: string;
  userName: string;
  hoTen: string;
  maPhongBan: string;
}

interface ListTask {
  id: string;
  title: string;
  typeJob: string;
  content: string;
  status: string;
  customerCode: string;
  feedback: string;
  vote: string;
  locationCheckIn: string;
  locationCheckOut: string;
  deadline: string;
  createdAt: string;
  followers: Follower[];
}

const TaskScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const isFocused = useIsFocused()

  const [taskList, setTaskList] = useState<ListTask[]>([])
  const [filteredTaskList, setFilteredTaskList] = useState<ListTask[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fromDate, setFromDate] = useState<Date | null>(null)
  const [toDate, setToDate] = useState<Date | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10000)
  // const [openFromDatePicker, setOpenFromDatePicker] = useState(false)
  // const [openToDatePicker, setOpenToDatePicker] = useState(false)
  // const [checkInLocation, setCheckInLocation] = useState<string | null>(null)
  // const [checkOutLocation, setCheckOutLocation] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [refreshing, setRefreshing] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

 
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const fetchTasks = async (isRefreshing = false) => {
    if (isRefreshing) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const fromDateString = fromDate ? moment(fromDate).format('DD/MM/YYYY') : '';
      const toDateString = toDate ? moment(toDate).format('DD/MM/YYYY') : '';

      // Tăng pageSize để lấy tất cả bản ghi
      const effectivePageSize = isRefreshing ? 1000 : pageSize;

      const tasks = await TaskService.getTasks(fromDateString, toDateString, pageNumber, pageSize);

      //@ts-ignore
      const currentMonthTasks  = tasks.filter(task => {
        const taskDate = moment(task.createdAt);
        const currentMonth = moment().month();
        const currentYear = moment().year();
        return taskDate.month() === currentMonth && taskDate.year() === currentYear 
      });
      
      const filteredTasks = currentMonthTasks.filter(task => task.status === 'ChuaXuLy')
      setTaskList(currentMonthTasks);
      setFilteredTaskList(filteredTasks);
    } catch (error) {
      setError('Không lấy được danh sách công việc');
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  const filterTasks = (query: string) => {
    if (!query) {
      setFilteredTaskList(taskList);
    } else {
      const filtered = taskList.filter(task => task.title.toLowerCase().includes(query.toLowerCase()));
      setFilteredTaskList(filtered);
    }
  };

  const onRefresh = () => {
    fetchTasks(true);
  }

  useEffect(() => {
    if (isFocused) {
      const query = route.params?.searchQuery ?? '';
      if (query && query.trim() !== '') {
        setSearchQuery(query);
        setIsSearching(true);
        filterTasks(query);
      } else {
        setSearchQuery('');
        setIsSearching(false);
        fetchTasks();
      }
    } else {
      setSearchQuery('');
      setIsSearching(false);
      fetchTasks();
      // Xóa searchQuery khỏi route params sau khi xử lý
      navigation.setParams({ searchQuery: '' });
    }
  }, [isFocused, route.params?.searchQuery]);


  useEffect(() => {
    fetchTasks();
  }, [pageNumber, pageSize]);


  const handleDeleteTask = (taskId: string) => {
    setTaskList(prevList => prevList.filter(task => task.id !== taskId))
    setFilteredTaskList(prevList => prevList.filter(task => task.id !== taskId))
  }

  const handleUpdateTaskStatus = (taskId: string, status: string) => {
    setTaskList(prevList =>
      prevList.map(task => (task.id === taskId ? { ...task, status } : task))
    );
    setFilteredTaskList(prevList =>
      prevList.map(task => (task.id === taskId ? { ...task, status } : task))
    );
  };

  const requestLocationPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (result === RESULTS.GRANTED) {
      console.log('Location permission granted');
    } else {
      console.log('Location permission denied');
    }
  };

  const getTaskCountByStatus = (status: string) => {
    return taskList.filter(task => task.status === status).length
  }

  const handleStatusFilter = (status: string) => {
    if (status === '') {
      setFilteredTaskList(taskList)
    } else {
      setFilteredTaskList(taskList.filter(task => task.status === status))
    }
  }

  useEffect(() => {
    requestLocationPermission();
  }, []);
  
  // const handleCheckIn = async () => {
  //   setIsLoading(true);
  //   try {
  //     const location = await position();
  //     const lat = location.latitude;
  //     const lng = location.longitude;
  //     const locationString = `${lat},${lng}`;
  //     setCheckInLocation(locationString);
  //     setMapRegion({
  //       ...mapRegion,
  //       latitude: lat,
  //       longitude: lng,
  //     });
  //     Alert.alert('Success', 'Check-In thành công');
  //   } catch (error) {
  //     Alert.alert('Error', 'Không lấy được vị trí, vui lòng thử lại');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleCheckOut = async () => {
  //   setIsLoading(true);
  //   try {
  //     const location = await position();
  //     const lat = location.latitude;
  //     const lng = location.longitude;
  //     const locationString = `${lat},${lng}`;
  //     setCheckOutLocation(locationString);
  //     setMapRegion({
  //       ...mapRegion,
  //       latitude: lat,
  //       longitude: lng,
  //     });
  //     Alert.alert('Success', 'Check-Out thành công');
  //   } catch (error) {
  //     Alert.alert('Error', 'Không lấy được vị trí, vui lòng thử lại');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };



  if (loading && !refreshing) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }
  // const taskList: ReadonlyArray<Task> = [
  //   {
  //     id: 'KAP-1',
  //     title: 'Gặp khách hàng tại Đình Thôn',
  //     status: 'todo',
  //     userCreate: 'Duclv',
  //     fullNameCreate: 'Lâm Văn Đức',
  //     avatarUserCreate:
  //       'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
  //     watching: [
  //       {
  //         username: 'VinhLQ',
  //         fullName: 'Lâm Quang Vinh',
  //         avatar:
  //           'https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/406235614_1046644906482722_7384331104801404722_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=c42490&_nc_ohc=C331E7nigToAX8CaLVh&_nc_ht=scontent.fhan4-1.fna&oh=00_AfAjP5GkQD5p0YFG2rp93uulFCc9xz34eDC9daKb7sx1GQ&oe=65B791B5',
  //       },
  //       {
  //         username: 'Duclv',
  //         fullName: 'Lâm Văn Đức',
  //         avatar:
  //           'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
  //       },
  //       {
  //         username: 'HienLT',
  //         fullName: 'Lâm Thị Hiền',
  //         avatar:
  //           'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg',
  //       },
  //       {
  //         username: 'TanNM',
  //         fullName: 'Nguyễn Minh Tân',
  //         avatar:
  //           'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
  //       },
  //       {
  //         username: 'VinhLQ',
  //         fullName: 'Lâm Quang Vinh',
  //         avatar:
  //           'https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/406235614_1046644906482722_7384331104801404722_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=c42490&_nc_ohc=C331E7nigToAX8CaLVh&_nc_ht=scontent.fhan4-1.fna&oh=00_AfAjP5GkQD5p0YFG2rp93uulFCc9xz34eDC9daKb7sx1GQ&oe=65B791B5',
  //       },
  //     ],
  //     type: null,
  //     customer: null,
  //     customerName: null,
  //     description: null,
  //     Attachment: [],
  //     deadline: null,
  //   },
  //   {
  //     id: 'KAP-2',
  //     title: 'Ký hợp đồng tại Mỹ đình',
  //     status: 'done',
  //     userCreate: 'Duclv',
  //     fullNameCreate: 'Lâm Văn Đức',
  //     avatarUserCreate:
  //       'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
  //     watching: [
  //       {
  //         username: 'HienLT',
  //         fullName: 'Lâm Thị Hiền',
  //         avatar:
  //           'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg',
  //       },
  //       {
  //         username: 'Duclv',
  //         fullName: 'Lâm Văn Đức',
  //         avatar:
  //           'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
  //       },
  //       {
  //         username: 'TanNM',
  //         fullName: 'Nguyễn Minh Tân',
  //         avatar:
  //           'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
  //       },
  //     ],
  //     type: null,
  //     customer: null,
  //     customerName: null,
  //     description: null,
  //     Attachment: [],
  //     deadline: null,
  //   },
  //   {
  //     id: 'KAP-3',
  //     title: 'Khảo sát thị trường mới',
  //     status: 'todo',
  //     userCreate: 'Duclv',
  //     fullNameCreate: 'Lâm Văn Đức',
  //     avatarUserCreate:
  //       'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
  //     watching: [
  //       {
  //         username: 'HienLT',
  //         fullName: 'Lâm Thị Hiền',
  //         avatar:
  //           'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg',
  //       },
  //       {
  //         username: 'TanNM',
  //         fullName: 'Nguyễn Minh Tân',
  //         avatar:
  //           'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
  //       },
  //     ],
  //     type: null,
  //     customer: null,
  //     customerName: null,
  //     description: null,
  //     Attachment: [],
  //     deadline: null,
  //   },
  //   {
  //     id: 'KAP-4',
  //     title: 'Khảo sát thị trường mới',
  //     status: 'done',
  //     userCreate: 'Duclv',
  //     fullNameCreate: 'Lâm Văn Đức',
  //     avatarUserCreate:
  //       'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg',
  //     watching: [
  //       {
  //         username: 'HienLT',
  //         fullName: 'Lâm Thị Hiền',
  //         avatar:
  //           'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg',
  //       },
  //     ],
  //     type: null,
  //     customer: null,
  //     customerName: null,
  //     description: null,
  //     Attachment: [],
  //     deadline: null,
  //   },
  //   {
  //     id: 'KAP-5',
  //     title: 'Khảo sát thị trường mới',
  //     status: 'todo',
  //     fullNameCreate: 'Lâm Văn Đức',
  //     avatarUserCreate: 'a',
  //     userCreate: 'Duclv',
  //     watching: [],
  //     type: null,
  //     customer: null,
  //     customerName: null,
  //     description: null,
  //     Attachment: [],
  //     deadline: null,
  //   },
  // ];

  const ListHeader = () => (
    <View className="mt-3">
    <View className='flex-row items-center justify-between'>
      <Text className="text-black text-lg font-bold mb-4">Trạng thái công việc</Text>
      <MenuTaskComponent />
      {/* <View style={{width: '100%'}}>
              <Button
                title="Ngày bắt đầu"
                onPress={() => setOpenFromDatePicker(true)}
              />
              <Text>
                {fromDate ? fromDate.toDateString() : 'Chưa chọn ngày'}
              </Text>
              <DatePicker
                modal
                open={openFromDatePicker}
                date={fromDate || new Date()}
                mode="date"
                onConfirm={date => {
                  setOpenFromDatePicker(false);
                  setFromDate(date);
                }}
                onCancel={() => {
                  setOpenFromDatePicker(false);
                }}
              />
              <Button
                title="Ngày kết thúc"
                onPress={() => setOpenToDatePicker(true)}
              />
              <Text>{toDate ? toDate.toDateString() : 'Chưa chọn ngày'}</Text>
              <DatePicker
                modal
                open={openToDatePicker}
                date={toDate || new Date()}
                mode="date"
                onConfirm={date => {
                  setOpenToDatePicker(false);
                  setToDate(date);
                }}
                onCancel={() => {
                  setOpenToDatePicker(false);
                }}
              />
    
              <Button title="Fetch Tasks" onPress={fetchTasks} />
            </View> */}
         
          </View>
          <ProcessTaskTodayComponent 
            totalTask={taskList.length}
            countDoneTask={getTaskCountByStatus('DaHoanThanh')}
            taskList={taskList} 
            handleStatusFilter={handleStatusFilter} 
            getTaskCountByStatus={getTaskCountByStatus}
          />
          <View className="my-4 flex flex-row flex-nowrap justify-between items-center">
            <Text className="text-black text-lg font-bold">Công việc đang chưa xử lý</Text>
          </View>
        </View>
  );
  const currentMonth = moment().format('MMMM');
  
  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <AppHeader
          title={`Lịch công việc ${currentMonth}`}
          centerTitle={true}
          backgroundColor="#fff"
          titleColor="#000"
          actions={
            <View style={{flexDirection: 'row'}}>
              <TouchableRipple
              rippleColor="transparent"
              onPress={() =>
                //@ts-ignore
                navigation.navigate(SCREENS.SEARCHTASK.KEY)
              }
              >
             <Icon
                name="search-outline"
                size={moderateScale(24)}
                color={'#2179A9'}
              />
            </TouchableRipple>
            <Text>&nbsp;&nbsp;&nbsp;</Text>
            <TouchableRipple
              rippleColor={'transparent'}
              onPress={() =>
                //@ts-ignore
                navigation.navigate(SCREENS.ADDNEWTASK.KEY)
              }>
              <Icon
                name="add-circle-outline"
                size={moderateScale(24)}
                color={'#2179A9'}
              />
            </TouchableRipple>
            </View>
        
            
          }
        />
            {/* <Button title="Check In" onPress={handleCheckIn} />
          <Text>Check-In Location: {checkInLocation}</Text>
          <Button title="Check Out" onPress={handleCheckOut} />
          <Text>Check-Out Location: {checkOutLocation}</Text>
          <MapView
              style={{height: 300, marginTop: 20}}
              region={mapRegion}
            >
              {checkInLocation && (
                <Marker
                  coordinate={{
                    latitude: parseFloat(checkInLocation.split(',')[0]),
                    longitude: parseFloat(checkInLocation.split(',')[1]),
                  }}
                  title="Check-In"
                />
              )}
              {checkOutLocation && (
                <Marker
                  coordinate={{
                    latitude: parseFloat(checkOutLocation.split(',')[0]),
                    longitude: parseFloat(checkOutLocation.split(',')[1]),
                  }}
                  title="Check-Out"
                />
              )}
              {checkInLocation && checkOutLocation && (
                <Polyline
                  coordinates={[
                    {
                      latitude: parseFloat(checkInLocation.split(',')[0]),
                      longitude: parseFloat(checkInLocation.split(',')[1]),
                    },
                    {
                      latitude: parseFloat(checkOutLocation.split(',')[0]),
                      longitude: parseFloat(checkOutLocation.split(',')[1]),
                    },
                  ]}
                  strokeColor="#000"
                  strokeWidth={3}
                />
              )}
            </MapView>  */}
          <View className="flex-1">
          <FlatList
              data={filteredTaskList}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TaskFlatListComponent 
                  task={item} 
                  onDelete={handleDeleteTask}
                  onUpdateStatus={handleUpdateTaskStatus} // Truyền hàm onUpdateStatus
                />
              )}
              refreshControl={
                <RefreshControl 
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[COLORS.PRIMARY]}
                />
              }
              ListHeaderComponent={ListHeader}
              contentContainerStyle={{paddingHorizontal: moderateScale(15)}}
            />
          </View>
      </SafeAreaView>
    </>
  );
};

export default TaskScreen;
