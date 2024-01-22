import {SafeAreaView, Text, View} from 'react-native';
import React, {Fragment, useState} from 'react';
import AppHeader from '../../components/navigators/AppHeader';
import {
  Agenda,
  AgendaSchedule,
  Calendar,
  DateData,
  LocaleConfig,
} from 'react-native-calendars';
import {COLORS} from '../../../constans/colors';
import {TextInput} from 'react-native-paper';

interface State {
  items?: AgendaSchedule;
}
const TaskOverviewScreen: React.FC = () => {
  const [items, setItems] = useState({});
  LocaleConfig.locales['vi'] = {
    monthNames: [
      'Tháng Một',
      'Tháng Hai',
      'Tháng Ba',
      'Tháng Tư',
      'Tháng Năm',
      'Tháng Sáu',
      'Tháng Bảy',
      'Tháng Tám',
      'Tháng Chín',
      'Tháng Mười',
      'Tháng Mười Một',
      'Tháng Mười Hai',
    ],
    monthNamesShort: [
      'Th01',
      'Th02',
      'Th03',
      'Th04',
      'Th05',
      'Th06',
      'Th07',
      'Th08',
      'Th09',
      'Th10',
      'Th11',
      'Th12',
    ],
    dayNames: [
      'Chủ Nhật',
      'Thứ Hai',
      'Thứ Ba',
      'Thứ Tư',
      'Thứ Năm',
      'Thứ Sáu',
      'Thứ Bảy',
    ],
    dayNamesShort: ['CN', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7'],
    today: 'Hôm nay',
  };
  LocaleConfig.defaultLocale = 'vi';
  const dateNow = new Date();
  const [dateChoice, setDateChoice] = useState<string>('');

  return (
    <SafeAreaView className="flex-1">
      <AppHeader title="Tổng quan" showButtonBack={true}></AppHeader>
      <View className="flex-1">
        <TextInput value={dateChoice}></TextInput>
        <Calendar
          markingType={'dot'}
          theme={{
            calendarBackground: COLORS.WHITE,
            textSectionTitleColor: COLORS.BLACK,
            textSectionTitleDisabledColor: 'gray',
            dayTextColor: COLORS.BLACK,
            todayTextColor: COLORS.WHITE,
            todayBackgroundColor: COLORS.PRIMARY,
            selectedDayTextColor: COLORS.PRIMARY,
            monthTextColor: COLORS.BLACK,
            indicatorColor: COLORS.BLACK,
            selectedDayBackgroundColor: COLORS.PRIMARY,
            arrowColor: COLORS.BLACK,
          }}
          onDayPress={date => {
            setDateChoice(date.dateString);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default TaskOverviewScreen;
