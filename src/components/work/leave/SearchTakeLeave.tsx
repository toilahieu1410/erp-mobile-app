import React, { useState } from "react";
import {View, TouchableOpacity, Text, SafeAreaView} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-native-date-picker";
import Icon from 'react-native-vector-icons/Ionicons';
import moment from "moment";
import AppHeader from "../../navigators/AppHeader";
import { SCREENS } from "../../../constants/screens";
import { moderateScale } from "../../../screens/size";
import {styles} from '../../../assets/css/ListWorksScreen/_listWork';

const SearchTakeLeave: React.FC = () => {

  const navigation = useNavigation()
  const [fromDate, setFromDate] = useState<Date | null>(null)
  const [toDate, setToDate] = useState<Date | null>(null)
  const [showFromDatePicker, setShowFromDatePicker] = useState(false)
  const [showToDatePicker, setShowToDatePicker] = useState(false)

  const handleSearch = () => {
    //@ts-ignore
    navigation.navigate(SCREENS.LIST_DON_NGHI_PHEP.KEY, {
      fromDate: fromDate ? moment(fromDate).format('DD/MM/YYYY') : '',
      toDate: toDate ? moment(toDate).format('DD/MM/YYYY') : ''
    })
  }

  return (
    <SafeAreaView>
      <AppHeader 
        title='Tìm kiếm đơn nghỉ phép'
        showButtonBack={true}
        centerTitle={true}
        backgroundColor="#fff"
        titleColor="#000"
      />
      <DatePicker 
        modal
        open={showFromDatePicker}
        date={fromDate || new Date()}
        mode="date"
        onConfirm={date => {
          setShowFromDatePicker(false)
          setFromDate(date)
        }}
        onCancel={() => setShowFromDatePicker(false)}
      />
       <DatePicker 
        modal
        open={showToDatePicker}
        date={toDate || new Date()}
        mode="date"
        onConfirm={date => {
          setShowToDatePicker(false)
          setToDate(date)
        }}
        onCancel={() => setShowToDatePicker(false)}
      />

      <View style={styles.datePickerContainer}>
        <View style={styles.flexDateBetween}>
          <Text style={[styles.textDate, {minWidth: moderateScale(70)}]}>Từ ngày</Text>
          <View style={styles.flexDatePicker}>
            <TouchableOpacity onPress={() => setShowFromDatePicker(true)} style={styles.btnDate}>
            <Icon name="today-outline" size={moderateScale(20)} color={'#2179A9'} />
            <Text style={styles.datePickerText}>
              {fromDate ? moment(fromDate).format('DD/MM/YYYY') : 'Ngày bắt đầu'}
            </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.flexDateBetween}>
          <Text style={[styles.textDate, {minWidth: moderateScale(70)}]}>Đến ngày</Text>
          <View style={styles.flexDatePicker}>
            <TouchableOpacity onPress={() => setShowToDatePicker(true)} style={styles.btnDate}>
            <Icon name="today-outline" size={moderateScale(20)} color={'#2179A9'} />
            <Text style={styles.datePickerText}>
              {toDate ? moment(toDate).format('DD/MM/YYYY') : 'Ngày kết thúc'}
            </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          disabled={(fromDate === null || toDate === null) ? true : false}
          onPress={handleSearch}
          style={(fromDate === null || toDate === null) ? styles.buttonSearchDisabled: styles.buttonSearchEnabled}
          >
            <Icon name="search-outline" size={moderateScale(20)} color={'#fff'}/>
            <Text style={styles.textSearch}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SearchTakeLeave