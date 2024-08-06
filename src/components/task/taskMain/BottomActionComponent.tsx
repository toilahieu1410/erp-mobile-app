import React, {useRef, useState} from 'react';
import {View, Alert} from 'react-native';

import {Icon, TouchableRipple} from 'react-native-paper';
import ActionSheet from 'react-native-actionsheet';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../../constants/screens';
import TaskService from '../../../services/taskWorks/serviceTask';
import { showMessage } from 'react-native-flash-message';
import moment from 'moment';

interface ListTask {
  id: string;
  title: string;
  typeJob: string;
  status: string;
  customerCode: string;
  content: string;
  feedback: string;
  vote: string;
  locationCheckIn: string;
  locationCheckOut: string;
  deadline: string;
  createdAt: string;
  followers: Follower[];
}

interface Follower {
  id: string;
  userId: string;
  userName: string;
  hoTen: string;
  maPhongBan: string;
}


interface BottomActionTaskPropes {
  title: string;
  id: string;
  status: string;
  task: ListTask; 
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: string) => void
}


const BottomActionComponent = ({title, id, status, task,  onDelete, onUpdateStatus}: BottomActionTaskPropes) => {

  const actionRef = useRef();
  const navigator = useNavigation();

  // const handleDelete = async () => {
  //   Alert.alert('Xác nhận xóa', 'Bạn chắc chắn muốn xóa mục này', [
  //     {
  //       text: 'Hủy',
  //       onPress: () => console.log('Cancel'),
  //       style: 'cancel'
  //     },
  //     {
  //       text: 'Đồng ý',
  //       onPress: async () => {
  //         try {
  //           await TaskService.deleteTask(id);
  //           onDelete(id);
  //           showMessage({
  //             message: 'Success',
  //             description: 'Xóa báo cáo công việc thành công',
  //             type: 'success',
  //           });
  //         } catch (error) {
  //           showMessage({
  //             message: 'Error',
  //             description: 'Xóa báo cáo công việc thất bại',
  //             type: 'danger',
  //           });
  //         }
  //       }
  //     }
  //   ]);
  // };

  const handleStatusChange = async (newStatus: string) => {
    try {
      const formattedDeadline = task.deadline ? moment(task.deadline).format('DD/MM/YYYY') : '';
      const followersIds = task.followers.map(follower => follower.userId)
      const updatedTask = {
        id,
        title: title,
        typeJob: task.typeJob,
        content: task.content,
        feedback: task.feedback,
        vote: task.vote,
        deadline: formattedDeadline,
        followers: followersIds,
        status: newStatus, // Thêm trường status mới
      };
      if (task.followers.length > 0) {
        task.followers.forEach(follower => {
          if (!follower.id || !follower.userId || !follower.userName || !follower.hoTen || !follower.maPhongBan) {
            throw new Error('Followers data is not in the correct format');
          }
        });
      }
      await TaskService.updateTask(updatedTask);
      onUpdateStatus(id, newStatus);
      showMessage({
        message: 'Success',
        description: `Cập nhật trạng thái thành công: ${newStatus}`,
        type: 'success',
      });
    } catch (error) {

      showMessage({
        message: 'Error',
        description: 'Cập nhật trạng thái thất bại',
        type: 'danger',
      });
    }
  };

  return (
    <View>
      <TouchableRipple
        onPress={() => {
          //@ts-ignore
          actionRef?.current?.show();
        }}
        rippleColor={'transparent'}>
        <Icon source="dots-horizontal" size={24} color="#fff" />
      </TouchableRipple>
      <ActionSheet
        ref={actionRef}
        title={title}
        options={['ChuaXuLy', 'DangXuLy', 'DaHoanThanh', 'cancel']}
        cancelButtonIndex={3}
        destructiveButtonIndex={2}
        onPress={index => {
          switch (index) {
            case 0:
              handleStatusChange('ChuaXuLy');
              break;
            case 1:
              handleStatusChange('DangXuLy');
              break;
            case 2:
              handleStatusChange('DaHoanThanh');
              break;
            case 3:
              //cancel

              break;
            default:
              break;
          }
        }}
      />
    </View>
  );
};

export default BottomActionComponent;
