import React from "react"
import {Text, View, TouchableOpacity, SafeAreaView, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from '../../../assets/css/ConfirmScreen/_itemDetailConfirm';
import moment from "moment";
import { moderateScale } from "../../../screens/size";
import AppHeader from "../../navigators/AppHeader";

const ItemDetailTakeLeave:React.FC<{route: any}> = ({route}) => {

  const {item} = route.params

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
        title="Chi tiết đơn nghỉ phép"
        showButtonBack={true}
        actions={
          <TouchableOpacity
            // onPress={() =>
            //   //@ts-ignore
            //   navigation.navigate(SCREENS.SEARCHTASK.KEY)
            // }
            style={{marginRight: 10}}>
            <Icon name="list-outline" size={20} color={'#2179A9'} />
          </TouchableOpacity>
        }
      />
      <View style={styles.container}>
        <View style={styles.shadow}>
          <View style={styles.flex}>
            <View style={styles.left}>
              <Text style={styles.titleID}>{item.MA_SO_XIN_NGHI}</Text>
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
              <Text style={styles.textLeft}>Loại nghỉ phép</Text>
              <Text style={styles.textSmall}>{item.LOAI_NGHI_PHEP}</Text>
            </View>
          
            <View style={styles.flexVertical}>
            <TextInput
                editable={false} 
                selectTextOnFocus={false}
                style={styles.input}
                multiline={true}
                value={item.LY_DO_XIN_NGHI}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.flexVertical}>
                <Text style={styles.textLeft}>Thời gian nghỉ</Text>
                <Text style={styles.textSmall}>
                  {' '}
                  {(item.THOI_GIAN_NGHI)}
                </Text>
              </View>
              <View style={styles.flexVertical}>
                <Text style={styles.textLeft}>Tổng số ngày nghỉ</Text>
                <Text style={styles.textSmall}>
                  {' '}
                  {(item.TONG_SO_NGAY_NGHI)}
                </Text>
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
  )
}

export default ItemDetailTakeLeave