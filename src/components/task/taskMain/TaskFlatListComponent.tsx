import React from 'react';
import { Text, View } from 'react-native';
import { Avatar, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../../constants/screens';
import BottomActionComponent from './BottomActionComponent';
import { getDistance } from 'geolib';
import moment from 'moment';

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
  task: Task;
}

const TaskFlatListComponent = ({ task }: TaskProps) => {
  const navigator = useNavigation();

  const followerNames = task.followers.map(follower => follower.userName).join(', ')
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
    <TouchableRipple
      rippleColor={'transparent'}
      onPress={() =>
        //@ts-ignore
        navigator.navigate(SCREENS.DETAILTASK.KEY, { id: task.id })
      }
    > 
      <View className='mb-4'>
        <View className='bg-blue-500 inline-block p-2'>
        <Text numberOfLines={2}  className="text-white text-sm tracking-wider">
        {moment(task.createdAt).format('DD/MM/YYYY')}
      </Text>
        </View>
     
      <View className="rounded-b-lg border w-full border-gray-300 p-2 min-h-[100px] h-[120px] bg-white">
        <View className="flex flex-col flex-nowrap justify-between h-full ">
          <View className="flex flex-row flex-nowrap justify-between items-start flex-1 ">
             
               <View className="flex-1 flex-col justify-between ">
                <View className='flex-1 flex-row flex-nowrap'>
                <Avatar.Image
                style={{
                  backgroundColor: 'white',
                  borderColor: 'white',
                  borderWidth: 2,
                  marginRight: 8,
                }}
                size={40}
                source={{ uri: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png' }}
                onError={(err) => {}}
              />
              <View>
              <Text
                  numberOfLines={2}
                  className="text-black text-sm font-bold tracking-wider"
                >
                   {task.title}
                </Text>
                <Text
                  numberOfLines={2}
                  className="text-gray text-xs tracking-wider"
                >
                  {task.content}
                </Text>
              </View>
               
                </View>
                <View className=''>
                <Text
                  numberOfLines={2}
                  className="text-black text-sm font-bold tracking-wider"
                >
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
  );
};

export default TaskFlatListComponent;
