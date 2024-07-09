import React, { useEffect, useState, useRef } from 'react';
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
import { Picker } from '@react-native-picker/picker';
import { showMessage } from 'react-native-flash-message';
import { styles } from '../../../assets/css/ListWorksScreen/style';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { moderateScale } from '../../../screens/size';
import ServiceConfirm from '../../../services/listWorks/serviceConfirm';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../../constants/screens';
import AppHeader from '../../../components/navigators/AppHeader';
import DatePickerDay from '../../../components/picker/datePicker';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';

const newDate = new Date();

interface XacNhanType {
  value: number;
  display: string;
}

const CreateConfirm = () => {

  const navigation = useNavigation();

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

  const actionSheetRef = useRef<any>(null);

  useEffect(() => {
    const fetchConfirmTypes = async () => {
      try {
        const types = await ServiceConfirm.getConfirmTypes();
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
      const response = await ServiceConfirm.createConfirm(payload);
      const message = response.value
      showMessage({
        message: message,
        description: 'Đơn xác nhận của bạn đã được tạo trên hệ thống',
        type: 'success'
      });
      // @ts-ignore
      navigation.navigate(SCREENS.LIST_DON_XAC_NHAN.KEY);
    } catch (error) {
      showMessage({
        message: 'Tạo đơn thất bại',
        description: 'Không thể tạo được đơn',
        type: 'danger'
      });
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

  const openActionSheet = () => {
    actionSheetRef.current?.setModalVisible(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <AppHeader
        title="Tạo đơn xác nhận"
        showButtonBack={true}
        centerTitle={true}
        backgroundColor='#fff'
        titleColor='#000'
        actions={
        <TouchableOpacity
          style={{backgroundColor:'transparent', width: moderateScale(50)}}
          disabled={disable}
          
          onPress={handleSubmit}>
          <Text style={disable === true ? styles.buttonSaveDisabled : styles.buttonSaveEnabled} >Lưu</Text>
        </TouchableOpacity>
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
            {Platform.OS === 'ios' ? (
              <View style={[styles.flexTitle, styles.inputContainer]}>
                <Text style={styles.label}>Loại xác nhận:</Text>
                <TouchableOpacity
                  style={styles.pickerDropdown}
                  onPress={openActionSheet}>
                  <Text style={styles.textChoose}>{selectConfirm?.display || 'Loại xác nhận'}</Text>
                </TouchableOpacity>
                <ActionSheet ref={actionSheetRef}>
                  {confirmType.map((item) => (
                    <TouchableOpacity
                      key={item.value}
                      style={styles.actionSheetItem}
                      onPress={() => {
                        handleConfirm(item);
                        actionSheetRef.current?.hide();
                      }}>
                      <Text>{item.display}</Text>
                    </TouchableOpacity>
                  ))}
                </ActionSheet>
              </View>
            ) : (
              <View style={[styles.flexTitle, styles.inputContainer]}>
                <Text style={styles.label}>Loại xác nhận:</Text>
                <Picker
                  mode="dropdown"
                  style={styles.pickerDropdown}
                  selectedValue={selectConfirm}
                  onValueChange={itemValue => handleConfirm(itemValue)}>
                  <Picker.Item label={'Loại xác nhận'} value="" />
                  {confirmType.map(item => (
                    <Picker.Item label={item.display} value={item} key={item.value} />
                  ))}
                </Picker>
              </View>
            )}
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
