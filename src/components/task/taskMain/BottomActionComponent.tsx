import {View,Alert} from 'react-native';
import React, {useRef} from 'react';
import {Icon, TouchableRipple} from 'react-native-paper';
import ActionSheet from 'react-native-actionsheet';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../../../constants/screens';
interface BottomActionTaskPropes {
  title: string;
  id: string;
}

const BottomActionComponent = ({title, id}: BottomActionTaskPropes) => {
  const actionRef = useRef();
  const navigator = useNavigation();
  return (
    <View>
      <TouchableRipple
        onPress={() => {
          actionRef?.current?.show();
        }}
        rippleColor={'transparent'}>
        <Icon source="dots-horizontal" size={24} color="black" />
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
              Alert.alert(title, 'Bạn có chắc chắn xóa ?', [
               
                {
                  text: 'Hủy',
                  style: 'destructive',
                  onPress: () => console.log('hủy'),
                },
                {
                  text: 'Đồng ý',
                  onPress: () => console.log('oke'),
                },
              ]);
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

