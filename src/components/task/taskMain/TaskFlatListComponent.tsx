import {Text, View} from 'react-native';
import React from 'react';
import {Avatar, TouchableRipple} from 'react-native-paper';
import {Task} from '../../../models/Task';
import BottomActionComponent from './BottomActionComponent';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../../constants/screens';

interface TaskProps {
  task: Task;
}
const TaskFlatListComponent = (props: TaskProps) => {
  const task = props.task;
  const navigator = useNavigation();

  const renderWatchingItems = () => {
    const watchingItems: JSX.Element[] = [];

    for (let index = 0; index < task.watching.length; index++) {
      if (task.watching.length > 0) {
        const watchingItem = task.watching[index];
        if (index < 3) {
          watchingItems.push(
            <View
              className="absolute top-0"
              style={{left: index * 13}}
              key={index.toString()}>
              <Avatar.Image
                style={{
                  backgroundColor: 'white',
                  borderColor: 'white',
                  borderWidth: 1,
                }}
                size={20}
                source={{uri: watchingItem.avatar!}}
                onError={err => {}}
              />
            </View>,
          );
        } else {
          watchingItems.push(
            <View
              key={index.toString()}
              className="absolute top-0 h-[23px] w-[23px] rounded-xl border border-white bg-primary text-center flex justify-center items-center"
              style={{left: index * 13}}>
              <Text className="text-[12px] text-white">
                {task.watching.length - 3 < 99
                  ? `+${task.watching.length - 3}`
                  : `99+`}
              </Text>
            </View>,
          );
          break;
        }
      }
    }

    return watchingItems;
  };
  return (
    <TouchableRipple
      rippleColor={'transparent'}
      className="block mb-4"
      onPress={() =>
        //@ts-ignore
        navigator.navigate(SCREENS.DETAILTASK.KEY, {id: task.id})
      }>
      <View
        className="rounded-lg border w-full border-gray-300 p-2 min-h-[100px] h-[120px] shaDownElement bg-white"
        style={{
          shadowColor: '#000000',
          shadowOffset: {width: 2, height: 5},
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 2,
        }}>
        <View className="flex flex-col flex-nowrap justify-between h-full">
          <View className="flex flex-row flex-nowrap justify-between items-start flex-1 mb-2">
            <View className="flex flex-row flex-nowrap items-start flex-1">
              <Avatar.Image
                style={{
                  backgroundColor: 'white',
                  borderColor: 'white',
                  borderWidth: 2,
                  marginRight: 8,
                }}
                size={40}
                source={{uri: task.avatarUserCreate!}}
                onError={err => {}}
              />
              <View className="flex-1">
                <Text
                  numberOfLines={2}
                  className="text-black text-sm font-bold tracking-wider">
                  {task.title}
                </Text>
              </View>
            </View>
            <View>
              <BottomActionComponent title={task.title!} id={task.id} />
            </View>
          </View>
          <View className="h-[35%] w-full bg-gray-200 flex flex-row flex-nowrap justify-between items-center ml-[3px] p-2 rounded-md border-l-2 border-l-primary">
            <View className="h-full">
              <View className="relative">{renderWatchingItems()}</View>
            </View>
            <View>
              {task.status == 'todo' ? (
                <Text className="text-gray-400 bg-white px-4 rounded-[4px]">
                  {task.status}
                </Text>
              ) : (
                <Text className="text-green-400 bg-white px-4 rounded-[4px]">
                  {task.status}
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
};

export default TaskFlatListComponent;
