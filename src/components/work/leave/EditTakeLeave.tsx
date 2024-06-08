import React, {useState, useEffect} from "react";
import {View, Text, ScrollView, Alert, TextInput, TouchableOpacity} from 'react-native'
import { useNavigation, useRoute } from "@react-navigation/native";
import {styles} from '../../../assets/css/ConfirmScreen/_itemDetailConfirm';
import AppHeader from "../../navigators/AppHeader";
import moment from "moment";
import Icon from 'react-native-vector-icons/Ionicons';
import { moderateScale } from "../../../screens/size";
import ServiceTakeLeave from "../../../services/listWorks/serviceTakeLeave";
import { showMessage } from "react-native-flash-message";
import { SCREENS } from "../../../constants/screens";
import DatePicker from "react-native-date-picker";
import { Picker } from "@react-native-picker/picker";

interface NghiPhepType {
  value: number;
  display: string
}

const timeTypes = [
  {value: 0, display: 'Sáng'},
  {value: 1, display: 'Chiều'},
  {value: 2, display: 'Cả ngày'},
]

const newDate = new Date()

const EditTakeLeave: React.FC = () => {

  const navigation: any = useNavigation()
  const route = useRoute()

  const {item}: any = route.params
 // Kiểm tra và chuyển đổi leaveAt thành Date
 const initialLeaveAtDate = item?.leaveApplicationDetails?.[0]?.leaveAt 
 ? new Date(item.leaveApplicationDetails[0].leaveAt) 
 : new Date();

  const [selectTakeLeave, setSelectTakeLeave] = useState<NghiPhepType | null>(null)
  const [takeLeaveTypes, setTakeLeaveTypes] = useState<NghiPhepType[]>([])
  const [content, setContent] = useState(item.content)
  const [leaveAtDate, setLeaveAtDate] = useState(initialLeaveAtDate)
    
  const [leaveTimeType, setLeaveTimeType] = useState<number | null>(item?.leaveApplicationDetails?.[0]?.timeType || 0)
  const [handOverToUserId, setHandOverToUserId] = useState(item.handOverToUserId)
  const [handOverContent, setHandOverContent] = useState(item.handOverContent)
  const [showLeaveAtDate, setShowLeaveAtDate] = useState(false)
  const [btnShowDate, setBtnShowDate] = useState(false)
  const [disabled, setDisabled] = useState(true)

  console.log(item,'item')

  useEffect(() => {
    const fetchTakeLeaveTypes = async () => {
      try {
        const types = await ServiceTakeLeave.getTypesTakeLeave()
        setTakeLeaveTypes(types)
        const selectedType = types.find(type => type.display === item.type)
        setSelectTakeLeave(selectedType || null)
      } catch (error) {
        console.error('Error', + error)
      }
    }
    fetchTakeLeaveTypes()
  }, [])

  useEffect(() => {
    if(content !== '' && handOverContent !== '') {
      setDisabled(false)
    } 
    if(content === '' || handOverContent === '') {
      setDisabled(true)
    }
  },[content, handOverContent])

  const handleUpdate = async () => {

    try {
      const payload = {
        content: content,
        typeApplication: selectTakeLeave.value.toString(),
        handOverContent: handOverContent,
        handOverToUserId: handOverToUserId,
        leaveApplicationDetails: [
          {
            id: item.detail[0].id,
            leaveAt: moment(leaveAtDate).format('DD/MM/YYYY'),
            timeType: leaveTimeType
          }
        ]
      }
      console.log(item.id, 'ádasda', payload)
      await ServiceTakeLeave.updateTakeLeave(item.id, payload)
      showMessage({
        message: 'Success',
        description: 'Sửa đơn nghỉ phép thành công',
        type: 'success',
      });
      setLeaveAtDate(item.detail[0].leaveAt)
      navigation.navigate(SCREENS.LIST_DON_NGHI_PHEP.KEY)
    } catch (error) {
      showMessage({
        message: `ERROR ${console.log(error)}`,
        description: 'Sửa đơn nghỉ phép thất bại',
        type: 'danger',
      });
    }
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
        <View style={styles.flexVertical}>
          <Text style={styles.textLeft}>Ngày làm đơn</Text>
          <View style={styles.flexVerticalIcon}>
            <Text style={[styles.textDate, styles.rightDateTime, {color:'#2179A9'}]}>
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
          <Text style={styles.textLeft}>Ngày xin nghỉ phép</Text>
          <View style={[styles.borderBottomColor,styles.flexVerticalIcon, {paddingBottom: moderateScale(10)}]}>
            <TouchableOpacity
              style={[ styles.rightDateTime]}
              onPress={() => setBtnShowDate(true)}>
              <Text style={styles.textDate}>
                {moment(leaveAtDate).format('DD/MM/YYYY')}
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
            open={btnShowDate}
            date={leaveAtDate}
            mode="date"
            onConfirm={date => {
              setBtnShowDate(false);
              setLeaveAtDate(date);
            }}
            onCancel={() => setBtnShowDate(false)}
          />
        </View>
        <View style={styles.flexVertical}>
          <Text style={styles.textLeft}>Nội dung nghỉ phép</Text>
          <TextInput
            style={styles.inputEdit}
            value={content}
            onChangeText={setContent}
            multiline
          />
        </View>
        <View style={styles.flexVertical}>
          <Text style={styles.textLeft}>Loại nghỉ phép</Text>
          <Picker
            mode="dropdown"
            style={styles.pickerDropdown}
            selectedValue={selectTakeLeave}
            onValueChange={(itemValue) => setSelectTakeLeave(itemValue)}>
            {takeLeaveTypes &&
              takeLeaveTypes.map((item) => (
                <Picker.Item key={item.value} label={item.display} value={item} />
              ))}
          </Picker>
        </View>
        <View style={styles.flexVertical}>
          <Text style={styles.textLeft}>Thời gian nghỉ</Text>
          <Picker
            mode="dropdown"
            style={styles.pickerDropdown}
            selectedValue={leaveTimeType}
            onValueChange={(itemValue) => setLeaveTimeType(itemValue)}>
            {timeTypes.map((timeType) => (
              <Picker.Item key={timeType.value} label={timeType.display} value={timeType.value} />
            ))}
          </Picker>
        </View>
        <View style={styles.flexVertical}>
          <Text style={styles.textLeft}>Người bàn giao</Text>
          <TextInput
            style={styles.inputEdit}
            value={handOverToUserId}
            onChangeText={setHandOverToUserId}
          />
        </View>
        <View style={styles.flexVertical}>
          <Text style={styles.textLeft}>Nội dung bàn giao</Text>
          <TextInput
            style={styles.inputEdit}
            value={handOverContent}
            onChangeText={setHandOverContent}
            multiline
          />
        </View>
        <View>
          <TouchableOpacity onPress={handleUpdate} style={styles.buttonSave}>
            <Text style={styles.white}>Sửa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default EditTakeLeave