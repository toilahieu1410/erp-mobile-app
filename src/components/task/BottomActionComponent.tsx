import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {Icon, TouchableRipple} from 'react-native-paper';
import ActionSheet from 'react-native-actionsheet';
interface BottomActionTaskPropes {
  title: string;
  id: string;
}

const BottomActionComponent = ({title, id}: BottomActionTaskPropes) => {
  const actionRef = useRef();
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
          console.log(id);
        }}
      />
    </View>
  );
};

export default BottomActionComponent;

const styles = StyleSheet.create({});
