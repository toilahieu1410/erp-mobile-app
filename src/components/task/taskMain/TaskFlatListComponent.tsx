import React from 'react';
import {Alert, Dimensions, Text, View, useWindowDimensions} from 'react-native';
import {Avatar, TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SCREENS} from '../../../constants/screens';
import BottomActionComponent from './BottomActionComponent';
import {getDistance} from 'geolib';
import moment from 'moment';
import HTML from 'react-native-render-html';

import TaskService from '../../../services/taskWorks/serviceTask';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import { moderateScale } from '../../../screens/size';

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
  feedback: string;
  vote: string;
  locationCheckIn: string;
  locationCheckOut: string;
  deadline: string;
  createdAt: string;
  followers: Follower[];
}

interface TaskProps {
  task: ListTask;
}

const TaskFlatListComponent = ({task, onDelete}: TaskProps) => {
  const navigator = useNavigation();

  const { width } = useWindowDimensions()

  const followerNames = task.followers
    .map(follower => follower.userName)
    .join(', ');

  const handleDelete = async () => {
    Alert.alert('xác nhận xóa', 'Bạn chắc chắn muốn xóa mục này',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel'),
          style: 'cancel'
        }, 
        {
          text: 'Đồng ý',
          onPress: async () => {
            try {
              await TaskService.deleteTask(task.id)
              onDelete(task.id)
              showMessage({
                message: 'Success',
                description: 'Xóa báo cáo công việc thành công',
                type: 'success',
              });
            } catch (error) {
              showMessage({
                message: 'Error',
                description: 'Xóa báo cáo công việc thất bại',
                type: 'danger',
              });
            }
          }
        }
      ]
    )
  
  }

  const renderRightActions = () => {
    return (
      <RectButton
      style={{ backgroundColor: '#ff0000', justifyContent: 'center',
        flexDirection:'column',
        alignItems:'center',
        marginBottom: moderateScale(15) }}
        onPress={handleDelete}>
        <Icon name="trash-outline" size={moderateScale(20)} color={'#fff'} />
      <Text style={{ color: 'white', paddingHorizontal: 20 }}>Xóa</Text>
    </RectButton>
    )
  }
  // const calculateDistance = () => {
  //   if (task.locationCheckIn && task.locationCheckOut) {
  //     const [checkInLat, checkInLng] = task.locationCheckIn.split(',');
  //     const [checkOutLat, checkOutLng] = task.locationCheckOut.split(',');

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

  //     return getDistance(
  //       { latitude: checkInLatNum, longitude: checkInLngNum },
  //       { latitude: checkOutLatNum, longitude: checkOutLngNum }
  //     );
  //   }
  //   return null;
  // };

  // const distance = calculateDistance();

  return (
    <Swipeable renderRightActions={renderRightActions}>
  <TouchableRipple
      rippleColor={'transparent'}
      onPress={() =>
        //@ts-ignore
        navigator.navigate(SCREENS.DETAILTASK.KEY, {id: task.id})
      }>
      <View className="mb-4">
        <View className="bg-blue-500 inline-block p-2">
          <Text numberOfLines={2} className="text-white text-sm tracking-wider">
            {moment(task.createdAt).format('DD/MM/YYYY')}
          </Text>
        </View>

        <View className="rounded-b-lg border w-full border-gray-300 p-2 min-h-[100px] h-[120px] bg-white">
          <View className="flex flex-col flex-nowrap justify-between h-full ">
            <View className="flex flex-row flex-nowrap justify-between items-start flex-1 ">
              <View className="flex-1 flex-col justify-between ">
                <View className="flex-1 flex-row flex-nowrap">
                  <Avatar.Image
                    style={{
                      backgroundColor: 'white',
                      borderColor: 'white',
                      borderWidth: 2,
                      marginRight: 8,
                    }}
                    size={40}
                    source={{
                      uri: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
                    }}
                    onError={err => {}}
                  />
                  <View>
                    <Text
                      numberOfLines={2}
                      className="text-black text-sm font-bold tracking-wider">
                      {task.title}
                    </Text>
                    <HTML contentWidth={width} source={{html: task.content}} />
                  </View>
                </View>
                <View className="">
                  <Text
                    numberOfLines={2}
                    className="text-black text-sm font-bold tracking-wider">
                    Người theo dõi: {followerNames}
                  </Text>
                </View>
                {/* <Text className="text-gray-600 text-xs">
                  Check-in: {task.locationCheckIn || checkInLocation}
                </Text>
                <Text className="text-gray-600 text-xs">
                  Check-out: {task.locationCheckOut || checkOutLocation}
                </Text>
                {distance && (
                  <Text className="text-gray-600 text-xs">
                    Distance: {distance} meters
                  </Text>
                )} */}
              </View>
              <View>
                <BottomActionComponent title={task.title} id={task.id} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableRipple>
    </Swipeable>
  
  );
};

export default TaskFlatListComponent;
