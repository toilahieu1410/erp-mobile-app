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
import {Button, Button as ButtonCreate, NativeBaseProvider} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from '../../../assets/css/ListWorksScreen/style';
import moment from 'moment';
import DatePickerDay from '../../picker/datePicker';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../../navigators/AppHeader';
import { moderateScale } from '../../../screens/size';
import ServiceWorkFromHome from '../../../services/listWorks/serviceWorkFromHome';
import { showMessage } from 'react-native-flash-message';
import { SCREENS } from '../../../constants/screens';

const newDate = new Date()

const CreateWorkFromHome = () => {

  const navigation = useNavigation()
  const [content, setContent] = useState('')
  const [equipmentBorrow, setEquipmentBorrow] = useState('')
  const [fromDate, setFromDate] = useState<Date | null>(null)
  const [toDate, setToDate] = useState<Date | null>(null)
  const [disabled, setDisabled] = useState(true)
  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)

  useEffect(() => {
    if (content !== '') {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [content])

  const handleSubmit = async () => {
    try {
      const payload: any = {
        content: content,
        equipmentBorrow: equipmentBorrow,
        fromDate: fromDate ? moment(fromDate).format('DD/MM/YYYY') : '',
        toDate: toDate ? moment(toDate).format('DD/MM/YYYY') : ''
      }

      const response = await ServiceWorkFromHome.createWorkFromHome(payload);
      const message = response.value
      showMessage({
        message: message,
        description: 'Đơn của bạn đã được tạo trên hệ thống',
        type: 'success'
      })
      //@ts-ignore
      navigation.navigate(SCREENS.LIST_WORK_FROM_HOME.KEY)
    } catch (error) {
      console.error('ERRor', error)
      showMessage({
        message: 'Tạo đơn thất bại',
        description: 'Không thể tạo được đơn',
        type: 'danger'
      })
    }
  }

  const handleDateChange = (event: any, selectedDate?: Date, picker?: 'startDate' | 'endDate') => {
    if (picker === 'startDate') {
      setFromDate(selectedDate || fromDate)
      setShowStartPicker(false)
    } else if (picker === 'endDate') {
      setToDate(selectedDate || toDate)
      setShowEndPicker(false)
    }
  }
  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled>
          <AppHeader
          title="Tạo đơn xin làm việc tại nhà"
          showButtonBack={true}
          centerTitle={true}
          backgroundColor='#fff'
          titleColor='#000'
          actions={
            <NativeBaseProvider>
              <Button
                backgroundColor={'transparent'}
                disabled={disabled}
                size={moderateScale(50)}
                onPress={handleSubmit}
                >
                <Text style={disabled === true ? styles.buttonSaveDisabled : styles.buttonSaveEnabled} >Lưu</Text>
              </Button>
            </NativeBaseProvider>
          }
      />
      <ScrollView>
        <View style={styles.scroll}>
          <View style={styles.card}>
          <View style={[styles.flexTitle, styles.inputContainer]}>
              <Text style={styles.label}>Từ ngày:</Text>
              <View style={styles.flexTime}>
                <TouchableOpacity style={styles.btnDate} onPress={() => setShowStartPicker(true)}>
                  <Text style={styles.dateTextFromTo}>
                    {fromDate ? moment(fromDate).format('DD/MM/YYYY') : 'Chọn ngày'}
                  </Text>
                </TouchableOpacity>
                <Icon name="today-outline" size={moderateScale(20)} color={'#2179A9'} />
                {showStartPicker && (
                  <DatePickerDay
                    date={fromDate || newDate}
                    mode={'date'}
                    onChange={(event, date) => handleDateChange(event, date, 'startDate')}
                  />
                )}
              </View>
          </View>
            <View style={[styles.flexTitle, styles.inputContainer]}>
              <Text style={styles.label}>Đến ngày:</Text>
              <View style={styles.flexTime}>
                <TouchableOpacity style={styles.btnDate} onPress={() => setShowEndPicker(true)}>
                  <Text style={styles.dateTextFromTo}>
                    {toDate ? moment(toDate).format('DD/MM/YYYY') : 'Chọn ngày'}
                  </Text>
                </TouchableOpacity>
                <Icon name="today-outline" size={20} color={'#2179A9'} />
                {showEndPicker && (
                  <DatePickerDay
                    date={toDate || newDate}
                    mode={'date'}
                    onChange={(event, date) => handleDateChange(event, date, 'endDate')}
                  />
                )}
              </View>
            </View>
          <View style={ styles.inputContainer}>
            <View style={styles.flexTitle}>
              <Text style={styles.label}>Nội dung </Text>
              <Text style={styles.charCount}>{content.length}/200</Text>
            </View>
              <TextInput
                style={styles.input}
                multiline={true}
                value={content}
                onChangeText={setContent}
                placeholder="Nhập nội dung"
                maxLength={200}
              />
            </View>
       
          <View style={styles.inputContainer}>
          <View style={styles.flexTitle}>
                <Text style={styles.label}>Đồ dùng cần mượn</Text>
                <Text style={styles.charCount}>{equipmentBorrow.length}/100</Text>
              </View>
              <TextInput
                style={styles.input}
                multiline={true}
                value={equipmentBorrow}
                onChangeText={setEquipmentBorrow}
                placeholder="Nhập đồ dùng cần mượn"
                maxLength={100}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      </ KeyboardAvoidingView>
  )
}

export default CreateWorkFromHome;
