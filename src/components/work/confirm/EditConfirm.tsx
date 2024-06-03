import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styles} from '../../../assets/css/ConfirmScreen/_itemDetailConfirm';
import DatePicker from 'react-native-date-picker';
import ConfirmService from '../../../services/listWorks/serviceConfirm';
import moment from 'moment';
import {showMessage} from 'react-native-flash-message';
import {Picker} from '@react-native-picker/picker';
import AppHeader from '../../navigators/AppHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import {SCREENS} from '../../../constants/screens';
import {moderateScale} from '../../../screens/size';

interface XacNhanType {
  value: number;
  display: string;
}

const newDate = new Date();

const EditConfirm: React.FC = () => {

  const navigation: any = useNavigation();
  const route = useRoute();
  
  const {item}: any = route.params;

  const [content, setContent] = useState(item.content);
  const [dateNeedConfirm, setDateNeedConfirm] = useState(
    new Date(item.dateNeedConfirm),
  );
  const [startDate, setStartDate] = useState<Date | null>(
    item.startDate ? new Date(item.startDate) : null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    item.endDate ? new Date(item.endDate) : null,
  );
  const [showStartDateNeedConfirm, setShowStartDateNeedConfirm] = useState(false);

  const [showStartDatePicker, setShowStartDatePicker] = useState<'date' | 'time' | null>(null);
  const [showEndDatePicker, setShowEndDatePicker] = useState< 'date' | 'time' | null>(null);

  const [selectConfirm, setSelectConfirm] = useState<XacNhanType | null>(null);
  const [confirmTypes, setConfirmTypes] = useState<XacNhanType[]>([]);

  const [btnShowDate, setBtnShowDate] = useState(false)
  useEffect(() => {
    const fetchConfirmTypes = async () => {
      try {
        const types = await ConfirmService.getConfirmTypes();
        setConfirmTypes(types);
        const selectedType = types.find(type => type.display === item.type);
        setSelectConfirm(selectedType || null);
      } catch (error) {
        console.error('Error' + error);
      }
    };
    fetchConfirmTypes();
  }, []);

  useEffect(() => {
    if (dateNeedConfirm) {
      const date = moment(dateNeedConfirm).toDate();
      setStartDate(date);
      setEndDate(date);
    }
  }, [dateNeedConfirm]);

  const handleUpdate = async () => {
    const payload: any = {
      id: item.id,
      content,
      dateNeedConfirm: moment(dateNeedConfirm).format('DD/MM/YYYY'),
      type: selectConfirm?.value,
      startDate: startDate ? moment(startDate).format('DD/MM/YYYY HH:mm') : null,
      endDate: endDate ? moment(endDate).format('DD/MM/YYYY HH:mm') : null,
    };

    try {
      await ConfirmService.updateConfirm(item.id, payload);
      showMessage({
        message: 'Success',
        description: 'Sửa đơn xác nhận thành công',
        type: 'success',
      });
      setStartDate(item.startDate)
      setEndDate(item.endDate)
      navigation.navigate(SCREENS.LIST_DON_XAC_NHAN.KEY);
    } catch (error) {
      showMessage({
        message: `ERROR ${console.log(error)}`,
        description: 'Sửa đơn xác nhận thất bại',
        type: 'danger',
      });
    }
  };

  const handleConfirm = (itemValue: XacNhanType | null) => {
    setSelectConfirm(itemValue);
    if (itemValue && [1, 4, 5].includes(itemValue.value)) {
      setStartDate(newDate);
      setEndDate(newDate);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const showDatePicker = (
    picker: 'startDate' | 'endDate',
    mode: 'date' | 'time',
  ) => {
    if (picker === 'startDate') {
      setShowStartDatePicker(mode);
      setShowEndDatePicker(null);
    } else {
      setShowEndDatePicker(mode);
      setShowStartDatePicker(null);
    }
  };

  const handleDateChange = (
    selectedDate: Date | undefined,
    picker: 'startDate' | 'endDate',
    mode: 'date' | 'time',
  ) => {
    if (picker === 'startDate') {
      const currentDate = selectedDate || startDate;
      if (mode === 'date') {
        setShowStartDatePicker('time');
        setStartDate(currentDate);
      } else {
        setShowStartDatePicker(null);
        setStartDate(currentDate);
        if (endDate && currentDate && endDate < currentDate) {
          setEndDate(currentDate);
        }
      }
    } else {
      const currentDate = selectedDate || endDate;
      if (mode === 'date') {
        setShowEndDatePicker('time');
        setEndDate(currentDate);
      } else {
        setShowEndDatePicker(null);
        setEndDate(currentDate);
        if (startDate && currentDate && startDate > currentDate) {
          setStartDate(currentDate);
        }
      }
    }
  };
 
  return (
    <ScrollView style={styles.container}>
      <AppHeader
        title="Chi tiết đơn xác nhận"
        centerTitle={true}
        showButtonBack={true}
      />
      <View style={styles.shadow}>
        <View style={styles.flexVertical}>
          <Text style={styles.textLeft}>Ngày làm đơn</Text>
          <View style={styles.flexVerticalIcon}>
            <Text style={[styles.textDate,styles.rightDateTime, {color: '#2179A9'}]}>
              {moment(item.createdAt).format('DD/MM/YYYY')}
            </Text>
            <Icon
              name="timer-outline"
              size={moderateScale(20)}
              color={'#2179A9'}
            />
          </View>
        </View>
        <View style={styles.flexVertical}>
          <Text style={styles.textLeft}>Nội dung</Text>
          <TextInput
            style={styles.inputEdit}
            value={content}
            onChangeText={setContent}
            multiline
          />
        </View>
        <View style={styles.flexVertical}>
          <Text style={styles.textLeft}>Ngày cần xác nhận</Text>
          <View style={[styles.borderBottomColor,styles.flexVerticalIcon, {paddingBottom: moderateScale(10)}]}>
            <TouchableOpacity
              style={[ styles.rightDateTime]}
              onPress={() => setShowStartDateNeedConfirm(true)}>
              <Text style={styles.textDate}>
                {moment(dateNeedConfirm).format('DD/MM/YYYY')}
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
            open={showStartDateNeedConfirm}
            date={dateNeedConfirm}
            mode="date"
            onConfirm={date => {
              setShowStartDateNeedConfirm(false);
              setDateNeedConfirm(date);
            }}
            onCancel={() => setShowStartDateNeedConfirm(false)}
          />
        </View>
        <View style={styles.flexVertical}>
          <Text style={styles.textLeft}>Loại xác nhận</Text>
          <Picker
            mode="dropdown"
            style={styles.pickerDropdown}
            selectedValue={selectConfirm}
            onValueChange={itemValue => handleConfirm(itemValue)}>
            {confirmTypes &&
              confirmTypes.map(item => (
                <Picker.Item
                  key={item.value}
                  label={item.display}
                  value={item}
                />
              ))}
          </Picker>
        </View>
        {selectConfirm?.value === 1 ||
        selectConfirm?.value === 4 ||
        selectConfirm?.value === 5 ? (
          <>
            {item.startDate !== null || item.endDate !== null ? (
            <View>
              <View style={styles.flexVertical}>
                <Text style={styles.textLeft}>Thời gian từ</Text>
                
                <Text style={styles.textDate}>
                  {moment(item.startDate).format('DD/MM/YYYY HH:mm')}
                </Text>
              </View>
              <View style={styles.flexVertical}>
                <Text style={styles.textLeft}>Thời gian đến</Text>
                <Text style={styles.textDate}>
                  {moment(item.endDate).format('DD/MM/YYYY HH:mm')}
                </Text>
              </View>
            </View>
          ) : null}
                 <View style={[styles.flexVertical, {paddingVertical: 0, paddingBottom: moderateScale(15)}]}>
                <Text style={styles.textLeft}></Text>
                
                <TouchableOpacity
                  style={styles.btnShowDate}
                  onPress={() => setBtnShowDate(!btnShowDate)}>
                  <Icon name="today-outline" size={moderateScale(20)} color={'#fff'} />
                </TouchableOpacity>
              </View>
              {btnShowDate && (
              <View style={styles.flexVertical}>
                <View style={styles.flexFromTo}>
                  <Text style={styles.textLeft}>Từ</Text>
                <View style={styles.flexTime}>
                  <TouchableOpacity
                    onPress={() => showDatePicker('startDate', 'date')}
                    style={styles.rightDateTime}>
                    <Text style={styles.textDate}>
                      {startDate
                        ? moment(startDate).format('DD/MM/YYYY HH:mm')
                        : 'Chọn ngày'}
                    </Text>
                  </TouchableOpacity>
                    <Icon
                    name="today-outline"
                    size={moderateScale(20)}
                    color={'#2179A9'}
                    />
                </View>
       {showStartDatePicker === 'date' && (
         <DatePicker
           modal
           open={showStartDatePicker === 'date'}
           date={startDate || newDate}
           mode="date"
           onConfirm={date =>
             handleDateChange(date, 'startDate', 'date')
           }
           onCancel={() => setShowStartDatePicker(null)}
         />
       )}
       {showStartDatePicker === 'time' && (
         <DatePicker
           modal
           open={showStartDatePicker === 'time'}
           date={startDate || newDate}
           mode="time"
           onConfirm={date =>
             handleDateChange(date, 'startDate', 'time')
           }
           onCancel={() => setShowStartDatePicker(null)}
         />
       )}
     </View>
     <View style={styles.flexFromTo}>
       <Text style={styles.textLeft}>Đến</Text>
       <View style={styles.flexTime}>
         <TouchableOpacity
           onPress={() => showDatePicker('endDate', 'date')}
           style={styles.rightDateTime}>
           <Text style={styles.textDate}>
             {endDate
               ? moment(endDate).format('DD/MM/YYYY HH:mm')
               : 'Chọn ngày'}
           </Text>
         </TouchableOpacity>
         <Icon
           name="today-outline"
           size={moderateScale(20)}
           color={'#2179A9'}
         />
       </View>
       {showEndDatePicker === 'date' && (
         <DatePicker
           modal
           open={showEndDatePicker === 'date'}
           date={endDate || newDate}
           mode="date"
           onConfirm={date =>
             handleDateChange(date, 'endDate', 'date')
           }
           onCancel={() => setShowEndDatePicker(null)}
         />
       )}
       {showEndDatePicker === 'time' && (
         <DatePicker
           modal
           open={showEndDatePicker === 'time'}
           date={endDate || newDate}
           mode="time"
           onConfirm={date =>
             handleDateChange(date, 'endDate', 'time')
           }
           onCancel={() => setShowEndDatePicker(null)}
         />
       )}
     </View>
   </View>
              )}
       
          </>
    
          
        ) : null}
        <View>
          <TouchableOpacity onPress={handleUpdate} style={styles.buttonSave}>
            <Text style={styles.white}>Sửa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditConfirm;
