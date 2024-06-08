import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {Button, NativeBaseProvider} from 'native-base';
import {Dropdown} from 'react-native-element-dropdown';
import {Picker} from '@react-native-picker/picker';
import {styles} from '../../../assets/css/ConfirmScreen/style';
import moment from 'moment';

import PickThoiGianXinNghi from '../../picker/pickThoiGianXinNghi';
import Icon from 'react-native-vector-icons/Ionicons';
import { moderateScale } from '../../../screens/size';
import DatePickerDay from '../../picker/datePicker';
import ServiceTakeLeave from '../../../services/listWorks/serviceTakeLeave';
import { showMessage } from 'react-native-flash-message';
import AppHeader from '../../navigators/AppHeader';
import { TouchableOpacity } from 'react-native';
import { SCREENS } from '../../../constants/screens';
import { useNavigation } from '@react-navigation/native';


const newDate = new Date();

interface NghiPhepType {
  value: number,
  display: string
}

const timeTypes = [
  {value: 0, display: 'Sáng'},
  {value: 1, display: 'Chiều'},
  {value: 2, display: 'Cả ngày'},
]

const CreateTakeLeave = () => {

  const navigation = useNavigation();

  const [selectTakeLeave, setSelectTakeLeave] = useState<NghiPhepType | null>(null)
  const [takeleaveType, setTakeleaveType] = useState<NghiPhepType[]>([])
  const [leaveAtDate, setLeaveAtDate] = useState(newDate)

  const [handOverToUserId, setHandOverToUserId] = useState('3fa85f64-5717-4562-b3fc-2c963f66afa6')
  const [handOverContent, setHandOverContent] = useState('')
  const [leaveTimeType, setLeaveTimeType] = useState<number | null>(null)
  const [lyDoXinNghi, setLyDoXinNghi] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [showDatePicker, setShowDatePicker] = useState(false)

  useEffect(() => {
    const fetchTakeLeaveTypes = async () => {
      try {
        const types = await ServiceTakeLeave.getTypesTakeLeave()
        setTakeleaveType(types)
      } catch (error) {
        console.error('Error' + error)
      }
    }
    fetchTakeLeaveTypes()
  },[])

  useEffect(() => {
    if (lyDoXinNghi !== ''  && handOverContent !== '') {
      setDisabled(false);
    }
    if (lyDoXinNghi === ''  || handOverContent === '') {
      setDisabled(true);
    }
  }, [lyDoXinNghi, handOverContent]);

  const handleSubmit = async () => {
    if (!selectTakeLeave) {
      Alert.alert('Error', 'Loại nghỉ phép là bắt buộc')
      return
    }
    try {
      const payload = {
        content: lyDoXinNghi,
        typeApplication: selectTakeLeave.value.toString(),
        handOverContent: handOverContent,
        handOverToUserId: handOverToUserId,
        leaveApplicationDetails: [
          {
            leaveAt: moment(leaveAtDate).format('DD/MM/YYYY'),
            timeType: leaveTimeType
          }
        ]
      }
      console.log(payload,'pâyyyyyy')
      await ServiceTakeLeave.createTakeLeave(payload)
   
      showMessage({
        message: 'Tạo đơn thành công',
        description: 'Đơn nghỉ phép của bạn đã được tạo trên hệ thống',
        type:'success'
      })
        //@ts-ignore
       navigation.navigate(SCREENS.LIST_DON_NGHI_PHEP.KEY)
    } catch (error) {
      showMessage({
        message: 'Tạo đơn thất bại',
        description: 'Không tạo được đơn nghỉ phép',
        type:'danger'
      })
    }
  }

  const handleDateChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || leaveAtDate;
    setShowDatePicker(Platform.OS === 'ios');
    setLeaveAtDate(currentDate)
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <AppHeader 
        title='Tạo đơn nghỉ phép'
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
            onPress={handleSubmit}>
            <Text style={disabled === true ? styles.buttonSaveDisabled : styles.buttonSaveEnabled} >Lưu</Text>
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
                  ]}>{moment(newDate).format('DD/MM/YYYY')}</Text>
                  <Icon name="today-outline" size={moderateScale(20)} color={'#2179A9'} />
              </View>
            </View>
            <View style={[styles.flexTitle, styles.inputContainer]}>
              <Text style={styles.label}>Ngày xin nghỉ phép:</Text>
              <View style={styles.flexTime}>
                <TouchableOpacity
                  style={styles.btnDate}
                  onPress={() => setShowDatePicker(!showDatePicker)}>
                  <Text style={styles.dateText}>
                  { moment(leaveAtDate).format('DD/MM/YYYY') }
                  </Text>
                </TouchableOpacity>
                <Icon name="today-outline" size={moderateScale(20)} color={'#2179A9'} />
              </View>

              {showDatePicker && (
                <DatePickerDay
                  onChange={handleDateChange}
                  date={leaveAtDate}
                  mode={'date'}
                />
              )}
            </View>
            <View style={[styles.flexTitle, styles.inputContainer]}>
            <Text style={styles.label}>Bàn giao cho</Text>
              <TextInput 
                style={styles.input}
                value={handOverToUserId}
                onChangeText={setHandOverToUserId}
                placeholder='Bàn giao'
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.flexTitle}>
                <Text style={styles.label}>Lý do xin nghỉ</Text>
                <Text style={styles.charCount}>{lyDoXinNghi.length}/200</Text>
              </View>
              <TextInput 
                style={styles.input}
                multiline={true}
                value={lyDoXinNghi}
                onChangeText={setLyDoXinNghi}
                placeholder='Nhập lý do nghỉ'
                maxLength={200}
              />
            </View>
            <View style={[styles.flexTitle, styles.inputContainer]}>
              <Text style={styles.label}>Loại nghỉ phép</Text>
                <Picker
                  mode='dropdown'
                  style={styles.pickerDropdown}
                  selectedValue={selectTakeLeave}
                  onValueChange={itemValue => setSelectTakeLeave(itemValue)}
                >
                  <Picker.Item label='Chọn loại nghỉ phép' value={''} />
                  {takeleaveType && 
                    takeleaveType.map(item => (
                      <Picker.Item key={item.value} label={item.display} value={item}/>
                    ))
                  }
                </Picker>
            </View>
            <View style={[styles.flexTitle, styles.inputContainer]}>
                <Text style={styles.label}>Thời gian xin nghỉ:</Text>
                <Picker
                  mode="dropdown"
                  style={styles.pickerDropdown}
                  selectedValue={leaveTimeType}
                  onValueChange={itemValue => setLeaveTimeType(itemValue)}>
                  <Picker.Item label={'Chọn thời gian nghỉ'} value="" />
                  {timeTypes.map(item => (
                    <Picker.Item key={item.value} label={item.display} value={item.value} />
                  ))}
                </Picker>
              </View>
              <View style={styles.inputContainer}>
              <View style={styles.flexTitle}>
                <Text style={styles.label}>Nội dung bàn giao</Text>
                <Text style={styles.charCount}>{handOverContent.length}/200</Text>
              </View>
              <TextInput 
                style={styles.input}
                multiline={true}
                value={handOverContent}
                onChangeText={setHandOverContent}
                placeholder='Nhập nội dung bàn giao'
                maxLength={200}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateTakeLeave;
