import React, {useEffect, useState} from 'react';

import {Text, View, TouchableOpacity, SafeAreaView, TextInput} from 'react-native';
import AppHeader from '../../navigators/AppHeader';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from '../../../assets/css/ConfirmScreen/_itemDetailConfirm';
import moment from 'moment';
import {moderateScale} from '../../../screens/size';

const ItemDetailConfirm: React.FC<{route: any}> = ({route}) => {

  const {item} = route.params;

  const checkStatus = (
    TRUONG_PHONG_DA_DUYET: boolean,
    TRUONG_PHONG_HUY_DUYET: boolean,
  ) => {
    if (TRUONG_PHONG_DA_DUYET === true && TRUONG_PHONG_HUY_DUYET === false) {
      return (
        <View style={styles.colorGreen}>
          <Text style={styles.white}>Đã duyệt</Text>
        </View>
      );
    }
    if (TRUONG_PHONG_DA_DUYET === false && TRUONG_PHONG_HUY_DUYET === false) {
      return (
        <View style={styles.colorBlue}>
          <Text style={styles.white}>Chờ duyệt</Text>
        </View>
      );
    }
    if (TRUONG_PHONG_HUY_DUYET !== false) {
      return (
        <View style={styles.colorRed}>
          <Text style={styles.white}>Hủy duyệt</Text>
        </View>
      );
    }
  };
  

  return (
    <SafeAreaView>
      <AppHeader
        title="Chi tiết đơn xác nhận"
        showButtonBack={true}
        actions={
          <TouchableRipple
            rippleColor="transparent"
            // onPress={() =>
            //   //@ts-ignore
            //   navigation.navigate(SCREENS.SEARCHTASK.KEY)
            // }
            style={{marginRight: 10}}>
            <Icon name="list-outline" size={20} color={'#2179A9'} />
          </TouchableRipple>
        }
      />
      <View style={styles.container}>
        <View style={styles.shadow}>
          <View style={styles.flex}>
            <View style={styles.left}>
              <Text style={styles.titleID}>{item.MA_SO_XAC_NHAN}</Text>
            </View>
            <View>
              <View style={styles.flexRight}>
                <Icon
                  name="timer-outline"
                  size={moderateScale(20)}
                  color={'#2179A9'}
                />
                <Text style={styles.textDate}>
                  {moment(item.NGAY_LAM_DON).format('DD/MM/YYYY')}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.flexVertical}>
              <Text style={styles.textLeft}>Người yêu cầu</Text>
              <Text style={styles.textSmall}>
                {item.NGUOI_DE_NGHI} - {item.HO_VA_TEN}
              </Text>
            </View>
            <View style={styles.flexVertical}>
              <Text style={styles.textLeft}>Phòng ban</Text>
              <Text style={styles.textSmall}>{item.TEN_PHONG_BAN}</Text>
            </View>
            <View style={styles.flexVertical}>
              <Text style={styles.textLeft}>Loại xác nhận</Text>
              <Text style={styles.textSmall}>{item.LOAI_XAC_NHAN}</Text>
            </View>
            {moment(item.THOI_GIAN_TU).isValid() && moment(item.THOI_GIAN_DEN).isValid() ? (
              <View style={styles.flexVertical}>
                <Text style={styles.textLeft}>Thời gian</Text>
                <Text style={styles.textSmall}>
                  {' '}
                  {moment(item.THOI_GIAN_TU).format('DD/MM/YYYY HH:mm')} -{' '}
                  {moment(item.THOI_GIAN_DEN).format('DD/MM/YYYY HH:mm')}
                </Text>
              </View>
            ) : (
              ''
            )}
            <View style={styles.flexVertical}>
            <TextInput
                editable={false} 
                selectTextOnFocus={false}
                style={styles.input}
                multiline={true}
                value={item.NOI_DUNG_CAN_XAC_NHAN}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.flexVertical}>
              <Text style={styles.textLeft}>Trạng thái</Text>
              <Text style={styles.textSmall}>{checkStatus(
                item.TRUONG_PHONG_DA_DUYET, item.TRUONG_PHONG_HUY_DUYET
              )}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
    // <View>
    //   {data.TRUONG_PHONG_DA_DUYET === false &&
    //   data.TRUONG_PHONG_HUY_DUYET === false ? (
    //     <SwipeRow
    //       rightOpenValue={-75}
    //       disableRightSwipe={true}
    //       stopRightSwipe={-75}
    //       right={
    //         <TouchableOpacity
    //           style={{
    //             alignItems: 'center',
    //             backgroundColor: 'red',
    //             flex: 1,
    //             justifyContent: 'center',
    //           }}
    //           onPress={() => console.log('Delete')}>
    //           <Icon name="ios-trash" size={moderateScale(30)} color="#fff" />
    //         </TouchableOpacity>
    //       }>
    //       <View style={styles.card}>
    //         <View style={styles.center}>
    //           <Text style={[styles.textHeader, styles.colorText]}>
    //             Ngày {moment(data.NGAY_LAM_DON).format('DD/MM/YYYY')}
    //           </Text>
    //         </View>
    //         <View style={styles.flexCenter}>
    //           <View style={styles.flex}>
    //             <Text style={styles.textHeader}>Ngày xác nhận: </Text>
    //             <Text style={styles.colorText}>{data.NGAY_CAN_XAC_NHAN}</Text>
    //           </View>

    //           <View>
    //             {checkIcon(
    //               data.TRUONG_PHONG_DA_DUYET,
    //               data.TRUONG_PHONG_HUY_DUYET,
    //             )}
    //           </View>
    //         </View>
    //         <View style={[styles.flex, styles.content]}>
    //           <Text style={styles.textHeader}>
    //             {data.NOI_DUNG_CAN_XAC_NHAN}
    //           </Text>
    //         </View>
    //       </View>
    //     </SwipeRow>
    //   ) : (
    //     <View style={styles.card}>
    //       <View style={styles.center}>
    //         <Text style={[styles.textHeader, styles.colorText]}>
    //           Ngày {moment(data.NGAY_LAM_DON).format('DD/MM/YYYY')}
    //         </Text>
    //       </View>
    //       <View style={styles.flexCenter}>
    //         <View style={styles.flex}>
    //           <Text style={styles.textHeader}>Ngày xác nhận: </Text>
    //           <Text style={styles.colorText}>{data.NGAY_CAN_XAC_NHAN}</Text>
    //         </View>

    //         <View>
    //           {checkIcon(
    //             data.TRUONG_PHONG_DA_DUYET,
    //             data.TRUONG_PHONG_HUY_DUYET,
    //           )}
    //         </View>
    //       </View>
    //       <View style={[styles.flex, styles.content]}>
    //         <Text style={styles.textHeader}>{data.NOI_DUNG_CAN_XAC_NHAN}</Text>
    //       </View>
    //     </View>
    //   )}
    // </View>
  );
};

export default ItemDetailConfirm;
