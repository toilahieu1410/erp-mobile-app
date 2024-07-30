import React, {useState, useEffect, useRef} from "react";
import {View, Text, ScrollView, Alert, TextInput, TouchableOpacity, Platform} from 'react-native'
import { useNavigation, useRoute } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import DatePicker from "react-native-date-picker";
import { Picker } from "@react-native-picker/picker";
import ActionSheet from "react-native-actions-sheet";
import moment from "moment";
import Icon from 'react-native-vector-icons/Ionicons';
import { moderateScale } from "../../../screens/size";
import ServiceTakeLeave from "../../../services/listWorks/serviceTakeLeave";
import { showMessage } from "react-native-flash-message";
import { SCREENS } from "../../../constants/screens";
import {styles} from '../../../assets/css/ListWorksScreen/_detailWork';
import AppHeader from "../../../components/navigators/AppHeader";

interface NghiPhepType {
  value: number;
  display: string
}

interface ListUsers {
  id: string, 
  hoTen: string,
  userName: string
}

const timeTypes = [
  {value: 0, display: 'Sáng'},
  {value: 1, display: 'Chiều'},
  {value: 2, display: 'Cả ngày'},
]

const newDate = new Date()

const EditTakeLeave: React.FC = () => {

  const navigation: any = useNavigation()

  const actionSheetRef = useRef<any>(null)
  const actionSheetTimeRef = useRef<any>(null) 

  const route = useRoute()

  const {item}: any = route.params

  console.log(item,'iiiiii')
  const [selectTakeLeave, setSelectTakeLeave] = useState<NghiPhepType | null>(null)
  const [takeLeaveTypes, setTakeLeaveTypes] = useState<NghiPhepType[]>([])
  const [content, setContent] = useState(item.content)
  const [leaveApplicationDetails, setLeaveApplicationDetails] = useState(
    item.detail.map((item:any) => ({
      id: item.id,
      leaveAt: new Date(item.leaveAt),
      timeType: item.timeType,
      showDatePicker: false
    }))
  )
  // const [leaveAtDate, setLeaveAtDate] = useState(initialLeaveAtDate)
    
  // const [leaveTimeType, setLeaveTimeType] = useState<number | null>(item?.leaveApplicationDetails?.[0]?.timeType || 0)
  const [handOverToUserId, setHandOverToUserId] = useState(item.handOverToUserId)
  const [handOverContent, setHandOverContent] = useState(item.handOverContent)
  const [disabled, setDisabled] = useState(true)
  const [users, setUsers] = useState<ListUsers[]>([])
  const [searchText, setSearchText] = useState('')
  const [selectedUser, setSelectedUser] = useState<string>('')


  useEffect(() => {

    const fetchTakeLeaveTypes = async () => {
      try {
        const types = await ServiceTakeLeave.getTypesTakeLeave()
        setTakeLeaveTypes(types)
        const selectedType = types.find(type => type.display === item.typeApplication)
        setSelectTakeLeave(selectedType || null)
      } catch (error) {
        console.error('Error', + error)
      }
    }
    fetchTakeLeaveTypes()
  }, [item.typeApplication])

  
  useEffect(() => {
    const fetchUsers = async () => {
      if (searchText.length >= 0) {
        try {
          const users = await ServiceTakeLeave.getUserHandOver(searchText)
          setUsers(users)
          // Tìm và đặt tên người bàn giao dựa trên handOverToUserId
        const handOverUser = users.find((user: ListUsers) => user.id === item.handOverToUserId);
        if (handOverUser) {
          setSelectedUser(handOverUser.hoTen);
        }
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      } else {
        setUsers([]);
      }
    };
    fetchUsers()
  }, [searchText])


  // useEffect(() => {
  //   if(content !== '' && handOverContent !== '') {
  //     setDisabled(false)
  //   } 
  //   if(content === '' || handOverContent === '') {
  //     setDisabled(true)
  //   }
  // },[content, handOverContent])

  const handleAddDetail = () => {
    setLeaveApplicationDetails([...leaveApplicationDetails, {id: null, leaveAt: newDate, timeType: null, showDatePicker: false}])
  }

  const handleRemoveDetail = (index: number) => {
    const newDetails = leaveApplicationDetails.filter((_, i) => i !== index)
    setLeaveApplicationDetails(newDetails)
  }

  const handleDateChange = (index: number, selectedDate: Date) => {
    const newDetails = [...leaveApplicationDetails]
    newDetails[index].leaveAt = selectedDate
    newDetails[index].showDatePicker = false
    setLeaveApplicationDetails(newDetails)
  }

  const handleTimeTypeChange = (index: number, selectedTimeType: number) => {
    const newDetails = [...leaveApplicationDetails]
    newDetails[index].timeType = selectedTimeType
    setLeaveApplicationDetails(newDetails)
  }

  const toggleDatePicker = (index: number) => {
    const newDetails = [...leaveApplicationDetails]
    newDetails.forEach((detail, i) => {
      if (i !== index) {
        detail.showDatePicker = false
      }
    })
    newDetails[index].showDatePicker = !newDetails[index].showDatePicker
    setLeaveApplicationDetails(newDetails)
  }


  const handleUserSelect = (item: ListUsers) => {
    setHandOverToUserId(item.id);
    setSelectedUser(item.hoTen);
  };

  const handleTakeLeaveChange = (itemValue: NghiPhepType | null) => {
    setSelectTakeLeave(itemValue);
  };

  const handleUpdate = async () => {
    try {
      const payload: any = {
        content: content,
        typeApplication: selectTakeLeave.value,
        handOverContent: handOverContent,
        handOverToUserId: handOverToUserId,
        leaveApplicationDetails: leaveApplicationDetails.map(detail => ({
          id: detail.id,
          leaveAt: moment(detail.leaveAt).format('DD/MM/YYYY'),
          timeType: detail?.timeType
        }))
      }
     await ServiceTakeLeave.updateTakeLeave(item.id, payload)
      showMessage({
        message: 'Success',
        description: 'Sửa đơn nghỉ phép thành công',
        type: 'success',
      });
      navigation.navigate(SCREENS.LIST_DON_NGHI_PHEP.KEY)
    } catch (error) {
      showMessage({
        message: `ERROR ${console.log(error)}`,
        description: 'Sửa đơn nghỉ phép thất bại',
        type: 'danger',
      });
    }
  }


  const openActionSheet = () => {
    actionSheetRef.current?.setModalVisible(true)
  }

  const openTimeActionSheet = () => {
    actionSheetTimeRef.current?.setModalVisible(true)
  }

  return (
    <ScrollView style={styles.container}>
      <AppHeader 
        title='Chi tiết đơn nghỉ phép'
        centerTitle={true}
        showButtonBack={true}
        backgroundColor="#fff"
        titleColor="#000"
      />
      <View style={styles.shadow}>
      <View style={styles.flexTitle}>
          <Text style={[styles.textLeft, {color: '#2179A9'}]}>Tổng số ngày nghỉ:</Text>
          <Text>&nbsp;&nbsp;</Text>
          <View style={styles.flexVerticalIcon}>
            <Text style={[styles.textRight, {color: '#2179A9', fontWeight: 'bold'}]}>
              {item.tongSoNgayNghi}
            </Text>
          </View>
        </View>
        <View style={styles.flexVertical}>
          <Text style={styles.textLeft}>Mã đơn</Text>
          <View style={styles.flexVerticalIcon}>
            <Text style={[styles.textRight, {color:'#2179A9', fontWeight: 700}]}>
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
            <Text style={[styles.textRight, styles.leftDateTime, {color:'#2179A9'}]}>
              {moment(item.createdAt).format('DD/MM/YYYY')}
            </Text>
          
          </View>
        </View>
        {leaveApplicationDetails.map((detail, index) => (
          <View key={index} style={styles.boxXinNghiPhep}>
            <View style={[styles.flexVertical, {paddingVertical: moderateScale(0), marginTop:moderateScale(20)}]}>
              <Text style={styles.textLeft}>Ngày xin nghỉ phép</Text>
              <View style={[styles.borderBottomColor,styles.flexVerticalIcon, {paddingBottom: moderateScale(10)}]}>
                <TouchableOpacity
                  style={styles.rightDateTime}
                  onPress={() => toggleDatePicker(index)}
                >
                  <Text style={styles.textRight}>{moment(detail.leaveAt).format('DD/MM/YYYY')}</Text>
                </TouchableOpacity>
                <Icon
                  name="today-outline"
                  size={moderateScale(20)}
                  color={'#2179A9'}
                />
              </View>
              {detail.showDatePicker && (
                <DatePicker 
                  modal
                  open={detail.showDatePicker}
                  date={detail.leaveAt}
                  mode="date"
                  onConfirm={date => handleDateChange(index, date)}
                  onCancel={() => toggleDatePicker}
                />
              )}
            </View>
            {Platform.OS === 'ios' ? (
              <View style={styles.flexVertical}>
                <Text style={styles.textLeft}>Thời gian nghỉ</Text>
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
                        actionSheetTimeRef.current?.hide()
                        handleTimeTypeChange(index, item.value)
                      }}
                    >
                      <Text>{item.display}</Text>
                    </TouchableOpacity>
                  ))}
                </ActionSheet>
              </View>
            ) : (
              <View style={[styles.flexVertical, {paddingVertical: moderateScale(0)}]}>
              <Text style={styles.textLeft}>Thời gian nghỉ</Text>
              <Picker
                mode="dropdown"
                style={styles.pickerDropdown}
                selectedValue={detail.timeType}
                onValueChange={itemValue => handleTimeTypeChange(index, itemValue)}
              >
                {timeTypes.map((timeType) => (
                  <Picker.Item key={timeType.value} label={timeType.display} value={timeType.value}/>
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
          <TouchableOpacity onPress={handleAddDetail} style={styles.flexCenter}>
          <Icon
              name="add-outline"
              size={moderateScale(16)}
              color={'#2179A9'}
            />
            <Text>&nbsp;</Text>
            <Text style={{ color: '#2179A9' }}>Thêm mục</Text>
          </TouchableOpacity>
          <View style={styles.flexVertical}>
            <Text style={styles.textLeft}>Bàn giao cho</Text>
            <TextInput
              editable={false}
              style={[styles.inputEdit, {color:'#2179A9'}]}
              placeholder="Tìm kiếm người bàn giao"
              value={selectedUser}
              onChangeText={setSearchText}
            />
            <Dropdown
              inputSearchStyle={styles.searchStyle}
              iconStyle={styles.iconStyle}
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
        <View style={styles.flexColumn}>
          <Text style={[styles.textLeft, {marginBottom: moderateScale(15)}]}>Nội dung nghỉ phép</Text>
          <TextInput
            style={styles.inputEdit}
            value={content}
            onChangeText={setContent}
            multiline
          />
        </View>
        {Platform.OS === 'ios' ? (
           <View style={styles.flexVertical}>
           <Text style={styles.textLeft}>Loại nghỉ phép</Text>
           <TouchableOpacity
             style={styles.pickerDropdown}
             onPress={openActionSheet}
           >
             <Text style={styles.textChoose}>
              {selectTakeLeave?.display || 'Loại nghỉ phép'}
             </Text>
           </TouchableOpacity>
           <ActionSheet ref={actionSheetRef}>
             {takeLeaveTypes.map((item) => (
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
          <View style={styles.flexVertical}>
          <Text style={styles.textLeft}>Loại nghỉ phép</Text>
          <Picker
            mode="dropdown"
            style={styles.pickerDropdown}
            selectedValue={selectTakeLeave}
            onValueChange={(itemValue) => handleTakeLeaveChange(itemValue)}>
            {takeLeaveTypes &&
              takeLeaveTypes.map((item) => (
                <Picker.Item key={item.value} label={item.display} value={item} />
            ))}
          </Picker>
        </View>
        )}
  
        <View style={styles.flexColumn}>
          <View style={styles.flexTitleDetail}>
            <Text style={styles.textLeft}>Nội dung bàn giao</Text>
            <Text style={styles.charCount}>{handOverContent.length}/200</Text>
          </View>
          <TextInput
            style={styles.inputEdit}
            value={handOverContent}
            onChangeText={setHandOverContent}
            multiline
            maxLength={200}
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
  )
}

export default EditTakeLeave