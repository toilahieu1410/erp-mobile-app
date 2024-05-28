import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Button, NativeBaseProvider} from 'native-base';
import {showMessage} from 'react-native-flash-message';
import {styles} from '../../../assets/css/ConfirmScreen/style';
import moment from 'moment';
import DatePickerDay from '../../picker/datePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppHeader from '../../navigators/AppHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import {moderateScale} from '../../../screens/size';
import ConfirmService from '../../../services/listWorks/serviceConfirm';

const newDate = new Date();

interface XacNhanType {
  value: number;
  display: string;
}

const CreateConfirm = () => {
  const [selectConfirm, setSelectConfirm] = useState<XacNhanType | null>(null);
  const [confirmType, setConfirmType] = useState<XacNhanType[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [lyDo, setLyDo] = useState('');
  const [disable, setDisable] = useState(true);
  const [dateTime, setDateTime] = useState(newDate);
  const [showDate, setShowDate] = useState(false);

  const [showStartPicker, setShowStartPicker] = useState<'date' | 'time' | null>(null);
  const [showEndPicker, setShowEndPicker] = useState<'date' | 'time' | null>(null);

  useEffect(() => {
    const fetchConfirmTypes = async () => {
      try {
        const types = await ConfirmService.getConfirmTypes();
        setConfirmType(types);
      } catch (error) {
        console.error('Error' + error);
      }
    };
    fetchConfirmTypes();
  }, []);

  useEffect(() => {
    if (lyDo !== '') {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [lyDo]);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dateTime;
    setShowDate(Platform.OS === 'ios');
    setDateTime(currentDate);
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

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('token');

  //       if (token) {
  //         const response = await AuthenticateService.GetUser();
  //         const user = response.value;
  //         setUsername(user.userName);
  //         setEmail(user.email);
  //         setPhone(user.phoneNumber);
  //       }
  //     } catch (error) {
  //       console.error('Error', error);
  //     }
  //   };
  //   fetchUserData();
  // }, []);

  const handleSubmit = async () => {
    if (!selectConfirm) {
      Alert.alert('Error', 'Loại xác nhận là bắt buộc');
      return;
    }
    try {
      const payload: any = {
        content: lyDo,
        type: selectConfirm.value,
        startDate: startDate ? moment(startDate).format('DD/MM/YYYY HH:mm') : "",
        endDate: endDate ? moment(endDate).format('DD/MM/YYYY HH:mm') : "",
        dateNeedConfirm: moment(dateTime).format('DD/MM/YYYY'),
      };
      await ConfirmService.createConfirm(payload);
      showMessage({
        message: 'Tạo đơn thành công',
        description: 'Đơn xác nhận của bạn đã được tạo trên hệ thống',
        type: 'success'
      })
    } catch (error) {
      showMessage({
        message: 'Tạo đơn thất bại',
        description: 'Không thể tạo được đơn',
        type: 'danger'
      })
    }
  };

  const showDatePicker = (picker: 'startDate' | 'endDate', mode: 'date' | 'time') => {
    if (picker === 'startDate') {
      setShowStartPicker(mode);
      setShowEndPicker(null);
    } else {
      setShowEndPicker(mode);
      setShowStartPicker(null);
    }
  };

  const handleDateChange = (
    event: any,
    selectedDate: Date | undefined,
    picker: 'startDate' | 'endDate',
    mode: 'date' | 'time',
  ) => {
    if (picker === 'startDate') {
      const currentDate = selectedDate || startDate;
      if (mode === 'date') {
        setShowStartPicker('time');
        setStartDate(currentDate);
      } else {
        setShowStartPicker(null);
        setStartDate(currentDate);
      }
    } else {
      const currentDate = selectedDate || endDate;
      if (mode === 'date') {
        setShowEndPicker('time');
        setEndDate(currentDate);
      } else {
        setShowEndPicker(null);
        setEndDate(currentDate);
      }
    }
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <AppHeader
        title="Danh sách đơn xác nhận"
        showButtonBack={true}
        centerTitle={true}
        actions={
          <NativeBaseProvider>
            <Button
              backgroundColor={'transparent'}
              disabled={disable}
              size={moderateScale(50)}
              onPress={handleSubmit}>
              <Text style={disable === true ? styles.buttonSaveDisabled : styles.buttonSaveEnabled} >Lưu</Text>
            </Button>
          </NativeBaseProvider>
        }
      />
      <ScrollView>
        <View style={styles.scroll}>
          <View style={styles.card}>
            <View style={[styles.flexTitle, styles.inputContainer]}>
              <Text style={styles.label}>Ngày tạo đơn:</Text>
              <View style={styles.flexTime}>
                <Text
                  style={[
                    styles.dateText,
                    styles.btnDate,
                    {color: '#2179A9', fontWeight: '500'},
                  ]}>
                  {moment(newDate).format('DD/MM/YYYY')}
                </Text>
                <Icon name="today-outline" size={moderateScale(20)} color={'#2179A9'} />
              </View>
            </View>

            <View style={[styles.flexTitle, styles.inputContainer]}>
              <Text style={styles.label}>Ngày cần xác nhận:</Text>
              <View style={styles.flexTime}>
                <TouchableOpacity
                  style={styles.btnDate}
                  onPress={() => setShowDate(!showDate)}>
                  <Text style={styles.dateText}>
                    {moment(dateTime).format('DD/MM/YYYY')}
                  </Text>
                </TouchableOpacity>
                <Icon name="today-outline" size={moderateScale(20)} color={'#2179A9'} />
              </View>

              {showDate && (
                <DatePickerDay
                  onChange={onChangeDate}
                  date={dateTime}
                  mode={'date'}
                />
              )}
            </View>

            <View style={[styles.flexTitle, styles.inputContainer]}>
              <Text style={styles.label}>Loại xác nhận:</Text>

              <Picker
                mode="dropdown"
                style={styles.pickerDropdown}
                selectedValue={selectConfirm}
                onValueChange={itemValue => handleConfirm(itemValue)}>
                 <Picker.Item label={'Loại xác nhận'} value="" /> 
                {confirmType &&
                  confirmType.map(item => (
                    <Picker.Item label={item.display} value={item} />
                  ))}
              </Picker>
            </View>
            {selectConfirm?.value === 1 ||
            selectConfirm?.value === 4 ||
            selectConfirm?.value === 5 ? (
              <View style={[styles.flexTitle, styles.inputContainer]}>
                <View style={styles.flexFromTo}>
                  <Text style={styles.label}>Từ</Text>
                  <View
                    style={styles.flexTime}>
                    <TouchableOpacity
                      style={styles.btnDate}
                      onPress={() => showDatePicker('startDate', 'date')}>
                      <Text style={styles.dateTextFromTo}>
                        {moment(startDate).format('DD/MM/YYYY HH:mm')}
                      </Text>
                    </TouchableOpacity>
                    <Icon name="today-outline" size={20} color={'#2179A9'} />
                  </View>

                  {showStartPicker === 'date' && (
                    <DatePickerDay
                      date={startDate || newDate}
                      mode={'date'}
                      onChange={(event, date) =>
                        handleDateChange(event, date, 'startDate', 'date')
                      }
                    />
                  )}
                  {showStartPicker === 'time' && (
                    <DatePickerDay
                      date={startDate || newDate}
                      mode={'time'}
                      onChange={(event, date) =>
                        handleDateChange(event, date, 'startDate', 'time')
                      }
                    />
                  )}
                </View>
                <View style={styles.flexFromTo}>
                  <Text style={styles.label}>Đến</Text>
                  <View
                    style={styles.flexTime}>
                    <TouchableOpacity
                      style={styles.btnDate}
                      onPress={() => showDatePicker('endDate', 'date')}>
                      <Text style={styles.dateTextFromTo}>
                        {moment(endDate).format('DD/MM/YYYY HH:mm')}
                      </Text>
                    </TouchableOpacity>
                    <Icon name="today-outline" size={20} color={'#2179A9'} />
                    {showEndPicker === 'date' && (
                      <DatePickerDay
                        date={endDate || newDate}
                        mode={'date'}
                        onChange={(event, date) =>
                          handleDateChange(event, date, 'endDate', 'date')
                        }
                      />
                    )}
                    {showEndPicker === 'time' && (
                      <DatePickerDay
                        date={endDate || newDate}
                        mode={'time'}
                        onChange={(event, date) =>
                          handleDateChange(event, date, 'endDate', 'time')
                        }
                      />
                    )}
                  </View>
                </View>
              </View>
            ) : null}
            <View style={styles.inputContainer}>
              <View style={styles.flexTitle}>
                <Text style={styles.label}>Nội dung xác nhận</Text>
                <Text style={styles.charCount}>{lyDo.length}/100</Text>
              </View>
              <TextInput
                style={styles.input}
                multiline={true}
                value={lyDo}
                onChangeText={setLyDo}
                placeholder=""
                maxLength={100}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateConfirm;
