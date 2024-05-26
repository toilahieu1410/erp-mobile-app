import React, {useEffect, useState} from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import AppHeader from '../../navigators/AppHeader';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from '../../../assets/css/ConfirmScreen/_itemDetailConfirm';
import moment from 'moment';
import {moderateScale} from '../../../screens/size';

const ItemDetailConfirm: React.FC<{route: any}> = ({route}) => {

  const {item} = route.params;

  const checkStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return (
          <View style={[styles.statusWrapper, {backgroundColor: '#27b376'}]}>
            <Text style={styles.statusText}>Đã duyệt</Text>
          </View>
        );
      case 'Pending':
        return (
          <View style={[styles.statusWrapper, {backgroundColor: '#3366ff'}]}>
            <Text style={styles.statusText}>Chưa duyệt</Text>
          </View>
        );
      case 'Reject':
        return (
          <View style={[styles.statusWrapper, {backgroundColor: '#cc2a36'}]}>
            <Text style={styles.statusText}>Hủy duyệt</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView>
      <AppHeader title="Chi tiết đơn xác nhận" showButtonBack={true} />
      <View style={styles.container}>
        <View style={styles.shadow}>
          <View style={styles.flexVertical}>
            <Text style={styles.textLeft}>Ngày tạo đơn</Text>
            <View style={styles.boxRight}>
              <Text
                style={[
                  {color: '#2179A9', fontWeight: '500'},
                  styles.textSmall,
                ]}>
                {moment(item.createdAt).format('DD/MM/YYYY')}
              </Text>
              <Icon
                name="today-outline"
                size={20}
                color={'#2179A9'}
                style={{marginLeft: moderateScale(10)}}
              />
            </View>
          </View>
          <View style={styles.flexVertical}>
            <Text style={styles.textLeft}>Loại xác nhận</Text>
            <Text style={styles.textSmall}>{item.type}</Text>
          </View>
          {item.startDate !== null || item.endDate !== null ? (
            <View>
              <View style={styles.flexVertical}>
                <Text style={styles.textLeft}>Thời gian từ</Text>
                <Text style={styles.textSmall}>
                  {moment(item.startDate).format('DD/MM/YYYY HH:mm')}
                </Text>
              </View>
              <View style={styles.flexVertical}>
                <Text style={styles.textLeft}>Thời gian đến</Text>
                <Text style={styles.textSmall}>
                  {moment(item.endDate).format('DD/MM/YYYY HH:mm')}
                </Text>
              </View>
            </View>
          ) : null}
          <View style={styles.flexVertical}>
            <Text style={styles.textLeft}>Nội dung</Text>
            <TextInput
              editable={false}
              selectTextOnFocus={false}
              style={styles.input}
              multiline={true}
              value={item.content}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.flexVertical}>
            <Text style={styles.textLeft}>Ngày xác nhận</Text>
            <View style={styles.boxRight}>
              <Text style={[styles.textSmall]}>
                {moment(item.dateNeedConfirm).format('DD/MM/YYYY')}
              </Text>
              <Icon
                name="today-outline"
                size={20}
                color={'#2179A9'}
                style={{marginLeft: moderateScale(10)}}
              />
            </View>
          </View>
          <View style={styles.flexVertical}>
            <Text style={styles.textLeft}>Trạng thái</Text>
            {checkStatusIcon(item.status)}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ItemDetailConfirm;
