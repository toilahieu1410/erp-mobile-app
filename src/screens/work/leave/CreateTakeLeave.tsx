import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import ActionSheet from 'react-native-actions-sheet'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { Dropdown } from 'react-native-element-dropdown'
import { showMessage } from 'react-native-flash-message'
import moment from 'moment'
import { moderateScale } from '../../../screens/size'
import ServiceTakeLeave from '../../../services/listWorks/serviceTakeLeave'
import { SCREENS } from '../../../constants/screens'
import DatePickerDay from '../../../components/picker/datePicker'
import AppHeader from '../../../components/navigators/AppHeader'
import { styles } from '../../../assets/css/ListWorksScreen/style'

const newDate = new Date()

interface NghiPhepType {
  value: number,
  display: string
}

interface LeaveApplicationDetail {
  leaveAt: Date,
  timeType: number | null,
  showDatePicker: boolean
}

interface ListUsers {
  id: string, 
  hoTen: string,
  userName: string
}

const timeTypes = [
  { value: 1, display: 'Sáng' },
  { value: 2, display: 'Chiều' },
  { value: 3, display: 'Cả ngày' },
]

const CreateTakeLeave = () => {

  const navigation = useNavigation()

  const actionSheetRef = useRef<any>(null)
  const actionSheetTimeRef = useRef<any>(null) 

  const [selectTakeLeave, setSelectTakeLeave] = useState<NghiPhepType | null>(null)
  const [takeleaveType, setTakeleaveType] = useState<NghiPhepType[]>([])
  const [handOverToUserId, setHandOverToUserId] = useState('')
  const [handOverContent, setHandOverContent] = useState('')
  const [lyDoXinNghi, setLyDoXinNghi] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [users, setUsers] = useState<ListUsers[]>([])
  const [searchText, setSearchText] = useState('')
  const [selectedUser, setSelectedUser] = useState<string>('')

  const [leaveApplicationDetails, setLeaveApplicationDetails] = useState<LeaveApplicationDetail[]>([{ leaveAt: newDate, timeType: null, showDatePicker: false }])

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
  }, [])

  useEffect(() => {
    if (lyDoXinNghi !== '' && handOverContent !== '') {
      setDisabled(false);
    }
    if (lyDoXinNghi === '' || handOverContent === '') {
      setDisabled(true);
    }
  }, [lyDoXinNghi, handOverContent]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchText.length >= 0) {
        try {
          const users = await ServiceTakeLeave.getUserHandOver(searchText)
          setUsers(users)
        } catch (error) {
          console.error('Error fetching users:', error)
        }
      } else {
        setUsers([])
      }
    }
    fetchUsers()
  }, [searchText])

  const handleAddDetail = () => {
    setLeaveApplicationDetails([...leaveApplicationDetails, { leaveAt: newDate, timeType: null, showDatePicker: false }]);
  };

  const handleRemoveDetail = (index: number) => {
    const newDetails = leaveApplicationDetails.filter((_, i) => i !== index);
    setLeaveApplicationDetails(newDetails);
  };

  const handleDateChange = (index: number, selectedDate: Date) => {
    const newDetails = [...leaveApplicationDetails];
    newDetails[index].leaveAt = selectedDate;
    newDetails[index].showDatePicker = false;
    setLeaveApplicationDetails(newDetails);
  };

  const handleTimeTypeChange = (index: number, selectedTimeType: number) => {
    const newDetails = [...leaveApplicationDetails];
    newDetails[index].timeType = selectedTimeType;
    setLeaveApplicationDetails(newDetails);
  };

  const toggleDatePicker = (index: number) => {
    const newDetails = [...leaveApplicationDetails];
    newDetails.forEach((detail, i) => {
      if (i !== index) {
        detail.showDatePicker = false;
      }
    });
    newDetails[index].showDatePicker = !newDetails[index].showDatePicker;
    setLeaveApplicationDetails(newDetails);
  };

  const handleUserSelect = (item: ListUsers) => {
    setHandOverToUserId(item.id)
    setSelectedUser(item.hoTen)
  }
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
        leaveApplicationDetails: leaveApplicationDetails.map(detail => ({
          leaveAt: moment(detail.leaveAt).format('DD/MM/YYYY'),
          timeType: detail.timeType
        }))
      }
      //@ts-ignore
      await ServiceTakeLeave.createTakeLeave(payload)

      showMessage({
        message: 'Tạo đơn thành công',
        description: 'Đơn nghỉ phép của bạn đã được tạo trên hệ thống',
        type: 'success'
      })
      //@ts-ignore
      navigation.navigate(SCREENS.LIST_DON_NGHI_PHEP.KEY)
    } catch (error) {
      showMessage({
        message: 'Tạo đơn thất bại',
        description: 'Không tạo được đơn nghỉ phép',
        type: 'danger'
      })
    }
  }

  const openActionSheet = () => {
    actionSheetRef.current?.setModalVisible(true)
  }

  const openTimeActionSheet = () => {
    actionSheetTimeRef.current?.setModalVisible(true)
  }

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
            <TouchableOpacity
              style={{backgroundColor:'transparent', width: moderateScale(50)}}
              disabled={disabled}
              onPress={handleSubmit}>
              <Text style={disabled === true ? styles.buttonSaveDisabled : styles.buttonSaveEnabled} >Lưu</Text>
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
                    { color: '#2179A9', fontWeight: '500' },
                  ]}>{moment(newDate).format('DD/MM/YYYY')}</Text>
                <Icon name="today-outline" size={moderateScale(20)} color={'#2179A9'} />
              </View>
            </View>
            {leaveApplicationDetails.map((detail, index) => (
              <View key={index} style={styles.boxXinNghiPhep}>
                <View style={[styles.flexTitle, styles.inputContainer, {marginTop:moderateScale(20), marginBottom:0}]}>
                  <Text style={styles.label}>Ngày xin nghỉ phép:</Text>
                  <View style={styles.flexTime}>
                    <TouchableOpacity
                      style={styles.btnDate}
                      onPress={() => toggleDatePicker(index)}>
                      <Text style={styles.dateText}>
                        {moment(detail.leaveAt).format('DD/MM/YYYY')}
                      </Text>
                    </TouchableOpacity>
                    <Icon name="today-outline" size={moderateScale(20)} color={'#2179A9'} />
                  </View>
                  {detail.showDatePicker && (
                    <DatePickerDay
                      onChange={(event, date) => handleDateChange(index, date || newDate)}
                      date={detail.leaveAt}
                      mode={'date'}
                    />
                  )}
                </View>
                {Platform.OS === 'ios' ? (
                  <View style={[styles.flexTitle, styles.inputContainer, {marginTop: moderateScale(10)}]}>
                     <Text style={styles.label}>Thời gian xin nghỉ</Text>
                      <TouchableOpacity
                        style={styles.pickerDropdown}
                        onPress={openTimeActionSheet}
                      >
                     
                      <Text style={styles.textChoose}>
                        {timeTypes.find(t => t.value === detail.timeType)?.display || 'Chọn thời gian nghỉ'}
                        </Text>
                      </TouchableOpacity> 
                      <ActionSheet ref={actionSheetTimeRef}>
                        {timeTypes.map((item) => (
                          <TouchableOpacity
                            key={item.value}
                            style={styles.actionSheetItem}
                            onPress={() => {
                              handleTimeTypeChange(index, item.value)
                              actionSheetTimeRef.current?.hide()
                            }}
                          >
                               {}
                            <Text>{item.display}</Text>
                          </TouchableOpacity>
                        ))}
                      </ActionSheet>
                  </View>
                ) : (
                  <View style={[styles.flexTitle, styles.inputContainer, {marginBottom: 0}]}>
                  <Text style={styles.label}>Thời gian xin nghỉ:</Text>
                  <Picker
                    mode="dropdown"
                    style={styles.pickerDropdown}
                    selectedValue={detail.timeType}
                    onValueChange={itemValue => handleTimeTypeChange(index, itemValue)}>
                    <Picker.Item label={'Chọn thời gian nghỉ'} value="" />
                    {timeTypes.map(item => (
                      <Picker.Item key={item.value} label={item.display} value={item.value} />
                    ))}
                  </Picker>
                </View>
                )}
            
                {leaveApplicationDetails.length > 1 && (
              <TouchableOpacity onPress={() => handleRemoveDetail(index)} style={styles.positionRemove}>
                 <Icon
                  name="close"
                  size={moderateScale(20)}
                  color={'red'}
                />
              </TouchableOpacity>
            )}
              </View>
            ))}
            <TouchableOpacity onPress={handleAddDetail} style={{ marginVertical: 10, alignItems: 'center' }}>
              <Text style={{ color: '#2179A9' }}>Thêm mục</Text>
            </TouchableOpacity>
            <View style={[styles.flexTitle, styles.inputContainer]}>
              <Text style={styles.label}>Bàn giao cho</Text>
              <TextInput
                editable={false}
                style={styles.input}
                placeholder='Tìm kiếm người bàn giao'
                value={selectedUser}
                onChangeText={setSearchText}
              />
              <Dropdown
                style={styles.dropdown}
                containerStyle={styles.dropdownContainer}
                itemTextStyle={styles.dropdownItemText}
                selectedTextStyle={styles.dropdownSelectedText}
                data={users}
                labelField="hoTen"
                valueField="id"
                placeholder="Người bàn giao"
                search
                searchPlaceholder="Gõ để tìm kiếm"
                value={handOverToUserId}
                onChange={handleUserSelect}
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
            {Platform.OS === 'ios' ? (
              <View style={[styles.flexTitle, styles.inputContainer]}>
                <Text style={styles.label}>Loại nghỉ phép</Text>
                <TouchableOpacity
                  style={styles.pickerDropdown}
                  onPress={openActionSheet}
                > 
                <Text style={styles.textChoose}>{selectTakeLeave?.display || 'Loại nghỉ phép'}</Text>
                </TouchableOpacity>
                <ActionSheet ref={actionSheetRef}>
                  {takeleaveType.map((item) => (
                    <TouchableOpacity
                      key={item.value}
                      style={styles.actionSheetItem}
                      onPress={() => {
                        setSelectTakeLeave(item)
                        actionSheetRef.current?.hide()
                      }}
                    >
                    <Text>{item.display}</Text>
                    </TouchableOpacity>
                  ))}
                </ActionSheet>
              </View>
            ) : (
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
                      <Picker.Item key={item.value} label={item.display} value={item} />
                    ))
                  }
                </Picker>
              </View>
            )}
         
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
