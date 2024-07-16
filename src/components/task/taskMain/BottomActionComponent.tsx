import React, {useRef, useState} from 'react';
import {View, Alert} from 'react-native';

import {Icon, TouchableRipple} from 'react-native-paper';
import ActionSheet from 'react-native-actionsheet';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../../constants/screens';
import TaskService from '../../../services/taskWorks/serviceTask';
import { showMessage } from 'react-native-flash-message';

interface BottomActionTaskPropes {
  title: string;
  id: string;
  onDelete: (id: string) => void;
}


const BottomActionComponent = ({title, id, onDelete}: BottomActionTaskPropes) => {

  const actionRef = useRef();
  const navigator = useNavigation();

  const handleDelete = async () => {
    Alert.alert('Xác nhận xóa', 'Bạn chắc chắn muốn xóa mục này', [
      {
        text: 'Hủy',
        onPress: () => console.log('Cancel'),
        style: 'cancel'
      },
      {
        text: 'Đồng ý',
        onPress: async () => {
          try {
            await TaskService.deleteTask(id);
            onDelete(id);
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
    ]);
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
        options={['Done', 'Chi tiết', 'Xóa', 'cancel']}
        cancelButtonIndex={3}
        destructiveButtonIndex={2}
        onPress={index => {
          switch (index) {
            case 0:
              // Done
              break;
            case 1:
              // chi tiết
              //@ts-ignore
              navigator.navigate(SCREENS.DETAILTASK.KEY, {id: id});
              break;
            case 2:
              // xóa
              handleDelete();
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
