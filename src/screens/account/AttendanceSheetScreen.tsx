import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Agenda} from 'react-native-calendars';
import AppHeader from '../../components/navigators/AppHeader';
import AttendanceSheetComponent from '../../components/account/AttendanceSheet/AttendanceSheetComponent';
import {Icon, TouchableRipple} from 'react-native-paper';

const AttendanceSheetScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader title="Thông tin chấm công" showButtonBack={true} />
      <View className="flex-1">
        <View className="flex flex-row flex-nowrap justify-between items-center py-2 px-2 border-b border-b-primary">
          <TouchableRipple>
            <Icon source={'chevron-left'} size={35} />
          </TouchableRipple>
          <Text className="text-black text-base">Tháng 01 năm 2023</Text>
          <TouchableRipple>
            <Icon source={'chevron-right'} size={35} />
          </TouchableRipple>
        </View>
        <AttendanceSheetComponent />
      </View>
    </SafeAreaView>
  );
};

export default AttendanceSheetScreen;
