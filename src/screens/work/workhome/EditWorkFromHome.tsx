import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import ServiceWorkFromHome from '../../../services/listWorks/serviceWorkFromHome';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons';
import {SCREENS} from '../../../constants/screens';
import {moderateScale} from '../../../screens/size';
import {styles} from '../../../assets/css/ListWorksScreen/_detailWork';
import AppHeader from '../../../components/navigators/AppHeader';

const newDate = new Date();

const EditWorkFromHome: React.FC = () => {
  const navigation: any = useNavigation();
  const route = useRoute();

  const {item}: any = route.params;

  const [content, setContent] = useState(item.content);
  const [equipmentBorrow, setEquipmentBorrow] = useState(item.equipmentBorrow);
  const [startDate, setStartDate] = useState<Date | null>(
    item.startDate ? new Date(item.startDate) : null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    item.endDate ? new Date(item.endDate) : null,
  );

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleUpdate = async () => {
    if (startDate && endDate && endDate < startDate) {
      showMessage({
        message: 'Lỗi dữ liệu',
        description: 'Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu',
        type: 'danger',
      });
      return;
    }
    try {
      const payload: any = {
        content: content,
        equipmentBorrow: equipmentBorrow,
        startDate: startDate ? moment(startDate).format('DD/MM/YYYY') : '',
        endDate: endDate ? moment(endDate).format('DD/MM/YYYY') : '',
      };
      const response = await ServiceWorkFromHome.updateWorkFromHome(
        item.id,
        payload,
      );
      showMessage({
        message: response.value,
        description: 'Đơn xin làm việc tại nhà đã được sửa',
        type: 'success',
      });
      navigation.navigate(SCREENS.LIST_WORK_FROM_HOME.KEY);
    } catch (error) {
      showMessage({
        message: 'Cập nhật đơn thất bại',
        description: error.message || 'Không thể cập nhật được đơn',
        type: 'danger',
      });
    }
  };

  const handleDateChange = (
    selectedDate: Date,
    picker: 'startDate' | 'endDate',
  ) => {
    if (picker === 'startDate') {
      setStartDate(selectedDate);
      setShowStartDatePicker(false);
    } else if (picker === 'endDate') {
      setEndDate(selectedDate);
      setShowEndDatePicker(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <AppHeader
        title="Chi tiết đơn xin làm việc tại nhà"
        centerTitle={true}
        showButtonBack={true}
        backgroundColor="#fff"
        titleColor="#000"
      />
      <View style={styles.shadow}>
        <View style={styles.flexVertical}>
          <Text style={styles.textLeft}>Mã đơn</Text>
          <View style={styles.flexVerticalIcon}>
            <Text
              style={[styles.textRight, {color: '#2179A9', fontWeight: 700}]}>
              {item.code}
            </Text>
          </View>
        </View>
        <View style={styles.flexVertical}>
          <Text style={styles.textLeft}>Ngày làm đơn</Text>
          <View style={styles.flexVerticalIcon}>
            <Icon
              name="time-outline"
              size={moderateScale(20)}
              color={'#2179A9'}
            />
            <Text
              style={[
                styles.textRight,
                styles.leftDateTime,
                {color: '#2179A9'},
              ]}>
              {moment(item.createdAt).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
        <View style={styles.flexColumn}>
        <View style={styles.flexTitleDetail}>
            <Text style={styles.textLeft}>Nội dung</Text>
            <Text style={styles.charCount}>{content.length}/200</Text>
          </View>
          <TextInput
            style={styles.inputEdit}
            value={content}
            onChangeText={setContent}
            multiline
            maxLength={200}
          />
        </View>
        <View style={styles.flexColumn}>
        <View style={styles.flexTitleDetail}>
            <Text style={styles.textLeft}>Đồ dùng cần mượn</Text>
            <Text style={styles.charCount}>{content.length}/100</Text>
          </View>
          <TextInput
            style={styles.inputEdit}
            value={equipmentBorrow}
            onChangeText={setEquipmentBorrow}
            multiline
            maxLength={100}
          />
        </View>
        <View style={styles.flexVertical}>
          <Text style={styles.textLeft}>Từ ngày</Text>
          <View
            style={[
              styles.borderBottomColor,
              styles.flexVerticalIcon,
              {paddingBottom: moderateScale(10)},
            ]}>
            <TouchableOpacity
              style={[styles.rightDateTime]}
              onPress={() => setShowStartDatePicker(true)}>
              <Text style={styles.textRight}>
                {startDate
                  ? moment(startDate).format('DD/MM/YYYY')
                  : 'Chọn ngày'}
              </Text>
            </TouchableOpacity>
            <Icon
              name="today-outline"
              size={moderateScale(20)}
              color={'#2179A9'}
            />
          </View>

          <DatePicker
            modal
            open={showStartDatePicker}
            date={startDate || newDate}
            mode="date"
            onConfirm={date => handleDateChange(date, 'startDate')}
            onCancel={() => setShowStartDatePicker(false)}
          />
        </View>
        <View style={styles.flexVertical}>
          <Text style={styles.textLeft}>Đến ngày</Text>
          <View
            style={[
              styles.borderBottomColor,
              styles.flexVerticalIcon,
              {paddingBottom: moderateScale(10)},
            ]}>
            <TouchableOpacity
              style={[styles.rightDateTime]}
              onPress={() => setShowEndDatePicker(true)}>
              <Text style={styles.textRight}>
                {endDate ? moment(endDate).format('DD/MM/YYYY') : 'Chọn ngày'}
              </Text>
            </TouchableOpacity>
            <Icon
              name="today-outline"
              size={moderateScale(20)}
              color={'#2179A9'}
            />
          </View>

          <DatePicker
            modal
            open={showEndDatePicker}
            date={endDate || newDate}
            mode="date"
            onConfirm={date => handleDateChange(date, 'endDate')}
            onCancel={() => setShowEndDatePicker(false)}
          />
        </View>
        {item.status === 'Pending' && (
          <View style={styles.buttonTop}>
          <TouchableOpacity onPress={handleUpdate} style={styles.buttonSave}>
            <Text style={styles.textWhite}>Sửa</Text>
          </TouchableOpacity>
        </View>
        )}
    
      </View>
    </ScrollView>
  );
};

export default EditWorkFromHome;
