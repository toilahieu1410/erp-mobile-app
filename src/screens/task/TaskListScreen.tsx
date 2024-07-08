import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import AppHeader from '../../components/navigators/AppHeader';
import CalendarStrip from 'react-native-calendar-strip';
import TaskFlatListComponent from '../../components/task/taskMain/TaskFlatListComponent';
import { Task } from '../../models/Task';
import moment from 'moment';
import 'moment/locale/vi';  // Import locale tiếng Việt

moment.locale('vi');  // Thiết lập locale là tiếng Việt

const TaskListScreen = () => {
  const [selected, setSelected] = useState(new Date());
  const locale = {
    name: 'vi',
    config: {
      months: 'Tháng 1_Tháng 2_Tháng 3_Tháng 4_Tháng 5_Tháng 6_Tháng 7_Tháng 8_Tháng 9_Tháng 10_Tháng 11_Tháng 12'.split('_'),
      monthsShort: 'Th1_Th2_Th3_Th4_Th5_Th6_Th7_Th8_Th9_Th10_Th11_Th12'.split('_'),
      weekdays: 'Chủ Nhật_Thứ Hai_Thứ Ba_Thứ Tư_Thứ Năm_Thứ Sáu_Thứ Bảy'.split('_'),
      weekdaysShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
      weekdaysMin: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
      longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY LT',
        LLLL: 'dddd, D MMMM YYYY LT',
      },
      calendar: {
        sameDay: '[Hôm nay] LT',
        nextDay: '[Ngày mai] LT',
        nextWeek: 'dddd [tuần tới] LT',
        lastDay: '[Hôm qua] LT',
        lastWeek: 'dddd [tuần trước] LT',
        sameElse: 'L',
      },
      relativeTime: {
        future: 'trong %s',
        past: '%s trước',
        s: 'vài giây',
        m: 'một phút',
        mm: '%d phút',
        h: 'một giờ',
        hh: '%d giờ',
        d: 'một ngày',
        dd: '%d ngày',
        M: 'một tháng',
        MM: '%d tháng',
        y: 'một năm',
        yy: '%d năm',
      },
      week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4, // The week that contains Jan 4th is the first week of the year.
      },
    },
  };

  const taskList: ReadonlyArray<Task> = [
    // ... (Danh sách các task như trong mã gốc của bạn)
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader
        title="Tất cả công việc"
        showButtonBack={true}
        centerTitle={true}
        backgroundColor='#fff'
        titleColor='#000'
      />
      <View className="flex-1">
        <CalendarStrip
          selectedDate={selected}
          calendarAnimation={{ type: 'sequence', duration: 30 }}
          style={{ paddingTop: 10, paddingBottom: 10 }}
          innerStyle={[]}
          calendarHeaderStyle={{ color: 'black' }}
          dateNumberStyle={{ color: 'black' }}
          dateNameStyle={{ color: 'black' }}
          highlightDateNumberStyle={{ color: '#32a3f4' }}
          highlightDateNameStyle={{ color: '#32a3f4' }}
          disabledDateNameStyle={{ color: 'grey' }}
          disabledDateNumberStyle={{ color: 'grey' }}
          scrollable={true}
          leftSelector={[]}
          rightSelector={[]}
          locale={locale}
          scrollerPaging={true}
          onDateSelected={date => {
            setSelected(date.toDate());
          }}
        />

        <View style={styles.body}>
          <ScrollView>
            <View>
              {taskList.flatMap((task, index) => {
                return <TaskFlatListComponent task={task} key={index} />;
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#DDDDDD',
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default TaskListScreen;
