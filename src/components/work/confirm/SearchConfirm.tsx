import React, { useState } from "react";
import {View, TouchableOpacity, Text, SafeAreaView} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-native-date-picker";
import { Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {styles} from '../../../assets/css/ConfirmScreen/_listConfirm';
import AppHeader from "../../navigators/AppHeader";
import { SCREENS } from "../../../constants/screens";

const SearchConfirm: React.FC = () => {
  
  const navigation = useNavigation()
  const [fromDate, setFromDate] = useState<Date | null>(null)
  const [toDate, setToDate] = useState<Date | null>(null)
  const [showFromDatePicker, setShowFromDatePicker] = useState(false)
  const [showToDatePicker, setShowToDatePicker] = useState(false)

  const handleSearch = () => {
     //@ts-ignore
    navigation.navigate(SCREENS.LIST_DON_XAC_NHAN.KEY,  {
      fromDate: fromDate ? moment(fromDate).format('DD/MM/YYYY') : '',
      toDate: toDate ? moment(toDate).format('DD/MM/YYYY') : '',
    });
  };
  

  return (
    <SafeAreaView>
           <AppHeader
        title="Tìm kiếm đơn xác nhận"
        showButtonBack={true}
        centerTitle={true}
      />
      <DatePicker
        modal
        open={showFromDatePicker}
        date={fromDate || new Date()}
        mode="date"
        onConfirm={date => {
          setShowFromDatePicker(false);
          setFromDate(date);
        }}
        onCancel={() => {
          setShowFromDatePicker(false);
        }}
      />
      <DatePicker
        modal
        open={showToDatePicker}
        date={toDate || new Date()}
        mode="date"
        onConfirm={date => {
          setShowToDatePicker(false);
          setToDate(date);
        }}
        onCancel={() => {
          setShowToDatePicker(false);
        }}
      />

      <View style={styles.datePickerContainer}>
        <View style={styles.flexDatePicker}>
          <TouchableOpacity onPress={() => setShowFromDatePicker(true)} style={styles.btnDate}>
            <Icon name="today-outline" size={20} color={'#2179A9'} />
            <Text style={styles.datePickerText}>
              {fromDate ? moment(fromDate).format('DD/MM/YYYY') : 'Ngày bắt đầu'}
            </Text>
          </TouchableOpacity>
          <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
          <TouchableOpacity onPress={() => setShowToDatePicker(true)} style={styles.btnDate}>
            <Icon name="today-outline" size={20} color={'#2179A9'} />
            <Text style={styles.datePickerText}>
              {toDate ? moment(toDate).format('DD/MM/YYYY') : 'Ngày kết thúc'}
            </Text>
          </TouchableOpacity>
          <Button onPress={handleSearch}>
            <Text>SEARCH</Text>
            {/* <Icon name="search-sharp" size={20} color={'#2179A9'} /> */}
          </Button>
        </View>
    
      </View>
    </SafeAreaView>
  );

}

export default SearchConfirm;