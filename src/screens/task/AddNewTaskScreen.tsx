import React, {useEffect, useState, useRef} from 'react';
import {Alert, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';

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
import { MultiSelect  } from 'react-native-element-dropdown';
import { styles } from '../../assets/css/ListTaskScreen/addTaskScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckInOutMap from '../../components/task/taskMain/checkInOutMap';
import { position } from '../../utils/geoLocation';
import MapView, {Marker, Polyline} from 'react-native-maps';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geocoder from 'react-native-geocoding';
import { getDistance } from 'geolib';
import axios from 'axios';
import polyline from '@mapbox/polyline';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';

const apiKey = 'AIzaSyBqnaTZHOfI539sJlwuXY5uDsoJP_DPI4I';

Geocoder.init(apiKey, { language: 'vi' });

enum TypeVote {
  Kem = 'Kem',
  TrungBinh = 'TrungBinh',
  Tot = 'Tot'
}

const voteOptions = [
  {label: 'Kém', value: TypeVote.Kem},
  {label: 'Trung bình', value: TypeVote.TrungBinh},
  {label: 'Tốt', value: TypeVote.Tot}
]

const AddNewTaskScreen = () => {

  const navigation = useNavigation()
  const [jobTypes, setJobTypes] = useState([])
  const [selectedJobType, setSelectedJobType] = useState({ value: 'Task', display: 'Task' })
  const [taskData, setTaskData] = useState({
    title: '',
    typeJob: 'Task',
    internalCode: '',
    customerCode: '',
    content: '',
    feedback: '',
    vote: TypeVote.Kem,
    locationCheckIn: '',
    locationCheckOut: '',
    deadline: moment(new Date()).format('DD/MM/YYYY'),
    followers: [] as string[],
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
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])

  const countries = [
    {value: 'Task', label: 'Task'},
    {value: 'Visit', label: 'Visit'},
    {value: 'Tele sale', label: 'Tele sale'},
  ];

  const [Attachment, setAttachment] = useState<Attachment[]>([]);
  const [watchings, setWatchings] = useState<Watching[]>([]);

  const [showCheckInMap, setShowCheckInMap] = useState(false);
  const [showCheckOutMap, setShowCheckOutMap] = useState(false);
  const [addressCheckIn, setAddressCheckIn] = useState('');
  const [addressCheckOut, setAddressCheckOut] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [totalDistance, setTotalDistance] = useState<string | null>(null)
  const [routeCoords, setRouteCoords] = useState([]);
  const [mapKey, setMapKey] = useState(0);
  const [mapRegion, setMapRegion] = useState({
    latitude: 21.028511, // Vĩ độ của Hà Nội
    longitude: 105.804817, // Kinh độ của Hà Nội
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const jobTypeActionSheetRef = useRef<any>(null);
  const voteActionSheetRef = useRef<any>(null);

  const voteOption = voteOptions.find(option => option.value === taskData.vote);


  const requestLocationPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (result === RESULTS.GRANTED) {
      console.log('Quyền truy cập vị trí đã được cấp');
    } else {
      console.log('Quyền truy cập vị trí đã bị từ chối');
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

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

  // useEffect(() => {
  //   if (taskData.locationCheckIn && taskData.locationCheckOut) {
  //     const distance = calculateDistance(taskData.locationCheckIn, taskData.locationCheckOut);
  //     setTotalDistance(distance);
  //   }
  // }, [taskData.locationCheckIn, taskData.locationCheckOut]);


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

  useEffect(() => {
    // Thiết lập giá trị giả mạo cho check-in và check-out
    setTaskData({
      ...taskData,
      locationCheckIn: '21.010868729802763, 105.82114304463225',
      locationCheckOut: '20.997527485233064, 105.85684860886734'
    });
  }, []);

  useEffect(() => {
    if (taskData.locationCheckIn && taskData.locationCheckOut) {
      fetchRoute(taskData.locationCheckIn, taskData.locationCheckOut);
    }
  }, [taskData.locationCheckIn, taskData.locationCheckOut]);

  const handleSave = async () => {
   
    const payload = {
      ...taskData,
      followers: selectedUserIds,
      
    };
    try {
      // @ts-ignore
      const response = await TaskService.createTask(payload);
      
      if (response.isSuccess) {
        showMessage({
          message: 'Success',
          description: 'Tạo báo cáo công việc thành công.',
          type: 'success',
        });
        navigation.goBack();
      } 
    } catch (error) {
      // Xử lý lỗi từ phản hồi API trong catch
      const errorMessages = error.response?.data?.errors?.map(err => err.message).join('\n') || error.response.data.detail;
      showMessage({
        message: 'Error',
        description: errorMessages ,
        type: 'danger',
      });
    }
  };

  const handleUserSelect = (selectedItems: string[]) => {
    if (selectedItems && Array.isArray(selectedItems)) {
      setSelectedUserIds(selectedItems);
      setTaskData({ ...taskData, followers: selectedItems  });
    } else {
      setSelectedUserIds([]);
      setTaskData({ ...taskData, followers: [] });
    }
  };

  const handleLocationSave = async (type, location) => {
    const { coords } = location;
    const locationString = `${coords.latitude},${coords.longitude}`;
    let address = '';
    try {
      const response = await Geocoder.from(coords.latitude, coords.longitude);
      address = response.results[0].formatted_address;
    } catch (error) {
      console.error('Error fetching address:', error);
      address = 'Không xác định được địa chỉ';
    }

    if (type === 'checkin') {
      setTaskData((prevData) => ({
        ...prevData,
        locationCheckIn: locationString,
      }));
      setAddressCheckIn(address);
    } else if (type === 'checkout') {
      setTaskData((prevData) => ({
        ...prevData,
        locationCheckOut: locationString,
      }));
      setAddressCheckOut(address);
    }
    setMapRegion({
      ...mapRegion,
      latitude: coords.latitude,
      longitude: coords.longitude,
    });

    setMapKey(mapKey + 1); // Thay đổi key của MapView để tái tạo lại
  };

  const handleCheckIn = async () => {
    setIsLoading(true);
    try {
      const location = await position();
      await handleLocationSave('checkin', { coords: location });
      Alert.alert('Success', 'Check-In thành công');
    } catch (error) {
      Alert.alert('Error', 'Không lấy được vị trí, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckOut = async () => {
    // Kiểm tra nếu đã checkin thì mới được checkout
    if(!taskData.locationCheckIn) {
      Alert.alert('Error', 'Bạn phải thực hiện việc check-in trước ')
      return
    }
    setIsLoading(true);
    try {
      const location = await position();
      await handleLocationSave('checkout', { coords: location });
      Alert.alert('Success', 'Check-Out thành công');
    } catch (error) {
      Alert.alert('Error', 'Không lấy được vị trí, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  // const calculateDistance = (locationCheckIn, locationCheckOut) => {
  //   if (locationCheckIn && locationCheckOut) {
  //     const [checkInLat, checkInLng] = locationCheckIn.split(',');
  //     const [checkOutLat, checkOutLng] = locationCheckOut.split(',');

  //     const checkInLatNum = parseFloat(checkInLat);
  //     const checkInLngNum = parseFloat(checkInLng);
  //     const checkOutLatNum = parseFloat(checkOutLat);
  //     const checkOutLngNum = parseFloat(checkOutLng);

  //     if (
  //       isNaN(checkInLatNum) ||
  //       isNaN(checkInLngNum) ||
  //       isNaN(checkOutLatNum) ||
  //       isNaN(checkOutLngNum)
  //     ) {
  //       console.error('Invalid coordinates:', {
  //         checkInLatNum,
  //         checkInLngNum,
  //         checkOutLatNum,
  //         checkOutLngNum,
  //       });
  //       return null;
  //     }

  //     const distance = getDistance(
  //       { latitude: checkInLatNum, longitude: checkInLngNum },
  //       { latitude: checkOutLatNum, longitude: checkOutLngNum }
  //     );
  //     console.log(distance,'distance')
  //     return (distance / 1000).toFixed(2); // Convert meters to kilometers and format to 2 decimal places
  //   }
  //   return null;
  // };

  const fetchRoute = async (startLoc, destinationLoc) => {
    console.log(`Fetching route from ${startLoc} to ${destinationLoc}`);
    const { coords, distance } = await getDirections(startLoc, destinationLoc, apiKey);
    setRouteCoords(coords);
    setTotalDistance(distance);
  };

  const getDirections = async (startLoc, destinationLoc, apiKey) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${apiKey}`
      );
      if (response.data.routes.length === 0) {
        throw new Error('No routes found');
      }
      const points = polyline.decode(response.data.routes[0].overview_polyline.points);
      const coords = points.map(point => ({
        latitude: point[0],
        longitude: point[1],
      }));
      const distance = response.data.routes[0].legs[0].distance.text;
      return { coords, distance };
    } catch (error) {
      console.error('Error fetching directions:', error);
      return { coords: [], distance: null };
    }
  };
    
  const openJobTypeActionSheet = () => {
    jobTypeActionSheetRef.current?.setModalVisible(true);
  };

  const openVoteActionSheet = () => {
    voteActionSheetRef.current?.setModalVisible(true);
  };

  const handleVoteChange = (vote: TypeVote) => {
    setTaskData({ ...taskData, vote });
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        {Platform.OS === 'ios' ? (
              <View className="flex flex-row justify-between items-center">
                <Text className="text-black text-base">Loại công việc:</Text>
                <TouchableOpacity style={styles.pickerDropdown} onPress={openJobTypeActionSheet}>
                  <Text style={styles.textChoose}>{selectedJobType?.display || 'Loại công việc'}</Text>
                </TouchableOpacity>
                <ActionSheet ref={jobTypeActionSheetRef}>
                  {jobTypes.map(item => (
                    <TouchableOpacity
                      key={item.value}
                      style={styles.actionSheetItem}
                      onPress={() => {
                        setSelectedJobType(item);
                        setTaskData({ ...taskData, typeJob: item.value });
                        jobTypeActionSheetRef.current?.hide();
                      }}>
                      <Text>{item.display}</Text>
                    </TouchableOpacity>
                  ))}
                </ActionSheet>
              </View>
            ) : (
              <View className="flex flex-row justify-between items-center">
                <Text className="text-black text-base">Loại công việc: </Text>
                
                <Picker
                  style={{ backgroundColor: '#efefef', flex: 1 }}
                  selectedValue={selectedJobType.value}
                  onValueChange={itemValue => {
                    const selectedItem = jobTypes.find(item => item.value === itemValue);
                 
                    setSelectedJobType(selectedItem);
                    setTaskData({ ...taskData, typeJob: selectedItem.value.toString() });
                  }}>
                  {jobTypes.map(type => (
                    <Picker.Item style={{ textAlign: 'center', width: '100%' }} label={type.display} value={type.value} key={type.value} />
                  ))}
                </Picker>
              </View>
            )}
       
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

            {/* {Platform.OS === 'ios' ? (
             <View className='flex flex-row justify-between items-center'>
             <Text className='text-black text-base'>Loại công việc:</Text>
             <TouchableOpacity
               style={styles.pickerDropdown}
               onPress={openJobTypeActionSheet}>
               <Text style={styles.textChoose}>{selectedJobType?.display || 'Loại công việc'}</Text>
             </TouchableOpacity>
             <ActionSheet ref={jobTypeActionSheetRef}>
               {jobTypes.map((item) => (
                 <TouchableOpacity
                   key={item.value}
                   style={styles.actionSheetItem}
                   onPress={() => {
                    setSelectedJobType(item);
                    jobTypeActionSheetRef.current?.hide();
                   }}>
                   <Text>{item.display}</Text>
                 </TouchableOpacity>
               ))}
             </ActionSheet>
           </View>
          ) : (
            <View className='flex flex-row justify-between items-center'>
            <Text className='text-black text-base'>Trạng thái CV: </Text>
            <Picker
            style={{backgroundColor:'#efefef', flex:1, }}
              // className='border-b-4 border-indigo-500 h-[150px] w-full bg-blue'
              selectedValue={selectedJobType}
              onValueChange={(itemValue) => {
                setSelectedJobType(itemValue);
                setTaskData({ ...taskData, typejob: itemValue });
              }}
            >
              {jobTypes.map((type) => (
                <Picker.Item style={{textAlign:'center', width:'100%'}} label={type.display} value={type.value} key={type.value} />
              ))}
            </Picker>
            </View>
          )} */}

              <CusTomTextInputMultiline
                label="Nội dung"
                onChangeText={text => setTaskData({ ...taskData, content: text })}
                value={taskData.content}
              />
         
                <View style={styles.flexVertical}>
          
                <View style={[styles.flexVertical, { alignItems:'flex-start' }]}>
                  <Text style={styles.textLeft}>Người theo dõi</Text>
                <View style={styles.boxSub}>
                <MultiSelect
                  style={styles.dropdownSub}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  search
                  data={users}
                  labelField="hoTen"
                  valueField="id"
                  placeholder="Chọn người theo dõi"
                  searchPlaceholder="Gõ để tìm kiếm"
                  value={selectedUserIds}
                  onChange={handleUserSelect}
                  renderLeftIcon={() => (
                    <Icon name='close' size={moderateScale(20)} color={'#ff6600'}/>
                  )}
                  selectedStyle={styles.selectedStyle}
                />
                </View>
              </View>
              </View>
                <CusTomTextInputMultiline
                label="Phản hồi "
                onChangeText={text => setTaskData({ ...taskData, feedback: text })}
                value={taskData.feedback}
              />
              <View className=''>
                {Platform.OS === 'ios' ? (
                  <View style={styles.flexStatus}>
                    <Text style={styles.textLeft}>Chất lượng CV</Text>
                    <TouchableOpacity onPress={openVoteActionSheet} style={styles.buttonStatus}>
                      <Text style={styles.textChoose}>  <Text style={styles.textChoose}>{voteOption ? voteOption.label : 'Chưa chọn'}</Text></Text>
                    </TouchableOpacity>
                    <ActionSheet ref={voteActionSheetRef}>
                    {voteOptions.map((option) => (
                      <TouchableOpacity
                        key={option.value}
                        style={styles.actionSheetItem}
                        onPress={() => {handleVoteChange(option.value); voteActionSheetRef.current?.hide()}}
                      > 
                        <Text>{option.label}</Text>
                      </TouchableOpacity>
                    ))}
                </ActionSheet>
                  </View>
                ) : (
                  <Picker
                  selectedValue={taskData.vote}
                  style={{height:moderateScale(50), width:'100%'}}
                  onValueChange={(itemValue) => {
                    setTaskData({ ...taskData, vote: itemValue });
                  }}
                  >
                    {voteOptions.map((option) => (
                      <Picker.Item label={option.label} value={option.value} key={option.value}/>
                    ))}
                </Picker>
                )}
          
              </View>
              <View className='flex-row flex-1 justify-between items-center'>
              <CustomTextInput
                  label="Vị trí CheckIn"
                  value={taskData.locationCheckIn}
                  editable={false}
                />
                <TouchableOpacity onPress={handleCheckIn} className='min-w-[85px] ml-5 mt-3 bg-blue-400 hover:bg-blue-500  font-semibold p-2 border border-blue-400 hover:border-transparent rounded'>
                  <Text className='text-center text-white'>Check-In</Text>
                </TouchableOpacity>
              </View>
              <View className='flex-row flex-1 justify-between items-center'>
              <CustomTextInput
                  label="Vị trí CheckOut"
                  value={taskData.locationCheckOut}
                  editable={false}
                />
                <TouchableOpacity onPress={handleCheckOut} style={{backgroundColor: !taskData.locationCheckIn ? 'transparent' : '#60a5fa'}} disabled={!taskData.locationCheckIn} className='min-w-[85px] ml-5 mt-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white p-2 border border-blue-500 hover:border-transparent rounded'>
                  <Text className='text-center' style={{color: !taskData.locationCheckIn ? 'gray' : '#fff'}}>Check-Out</Text>
                </TouchableOpacity>
              </View>
                   {/* <CustomTextInput
                  label="Địa chỉ CheckIn"
                  value={addressCheckIn}
                  editable={false}
                /> */}
                
              
                 {/* <CustomTextInput
                  label="Địa chỉ CheckOut"
                  value={addressCheckOut}
                  editable={false}
                /> */}
              
                <MapView
                  style={{ height: 300, marginTop: 20 }}
                  region={mapRegion}
                  key={mapKey}
                >
                  {taskData.locationCheckIn && (
                    <Marker
                      coordinate={{
                        latitude: parseFloat(taskData.locationCheckIn.split(',')[0]),
                        longitude: parseFloat(taskData.locationCheckIn.split(',')[1]),
                      }}
                      title="Check-In"
                    />
                  )}
                  {taskData.locationCheckOut && (
                    <Marker
                      coordinate={{
                        latitude: parseFloat(taskData.locationCheckOut.split(',')[0]),
                        longitude: parseFloat(taskData.locationCheckOut.split(',')[1]),
                      }}
                      title="Check-Out"
                    />
                  )}
               {routeCoords.length > 0 && (
                    <Polyline
                      coordinates={routeCoords}
                      strokeColor="red"
                      strokeWidth={3}
                    />
                  )}
                  {/* {taskData.locationCheckIn && taskData.locationCheckOut && (
                    <Polyline
                      coordinates={[
                        {
                          latitude: parseFloat(taskData.locationCheckIn.split(',')[0]),
                          longitude: parseFloat(taskData.locationCheckIn.split(',')[1]),
                        },
                        {
                          latitude: parseFloat(taskData.locationCheckOut.split(',')[0]),
                          longitude: parseFloat(taskData.locationCheckOut.split(',')[1]),
                        },
                      ]}
                      strokeColor="#000"
                      strokeWidth={3}
                    />
                  )} */}
                </MapView>
                <CustomTextInput
                  
                  label="Tổng quãng đường (km)"
                  value={totalDistance !== null ? `${totalDistance} km` : ''}
                  editable={false}
                />
              <SelectDateTime
                title="Deadline"
                onSelect={date => setTaskData({ ...taskData, deadline: moment(date).format('DD/MM/YYYY') })}
              />
              {/* <AttachmentTaskComponent
                data={taskData.attachment || []}
                onChangeValue={value => setTaskData({ ...taskData, attachment: value })}
              /> */}
                  
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
      </TouchableWithoutFeedback>
   
  );
};

export default AddNewTaskScreen;