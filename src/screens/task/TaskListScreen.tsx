import {Alert, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AppHeader from '../../components/navigators/AppHeader';
import {
  Agenda,
  AgendaEntry,
  DateData,
  LocaleConfig,
} from 'react-native-calendars';

const TaskListScreen = () => {
  LocaleConfig.locales['fr'] = {
    monthNames: [
      'Tháng Giêng',
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
      'Thg 1',
      'Thg 2',
      'Thg 3',
      'Thg 4',
      'Thg 5',
      'Thg 6',
      'Thg 7',
      'Thg 8',
      'Thg 9',
      'Thg 10',
      'Thg 11',
      'Thg 12',
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
    dayNamesShort: ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'],
    today: 'Hôm nay',
  };

  LocaleConfig.defaultLocale = 'fr';
  const [selected, setSelected] = useState(new Date());

  const renderEmptyItem = () => {};

  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    return (
      <View>
        {reservation?.data.map(item => {
          return <Text className="py-9">{item.text}</Text>;
        })}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader
        title="Tất cả công việc"
        showButtonBack={true}
        centerTitle={true}
      />
      <View className="flex-1">
        <Agenda
          items={{
            '2024-04-27': [
              {
                data: [{text: 'item 1'}, {text: 'item 2'}, {text: 'item 3'}],
              },
            ],
            '2024-04-28': [
              {
                data: [
                  {text: 'item 1'},
                  {text: 'item 2'},
                  {text: 'item 3'},
                  {text: 'item 4'},
                ],
              },
            ],
          }}
          renderEmptyData={() => {
            return <Text></Text>;
          }}
          renderItem={renderItem}
          selected={new Date().toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default TaskListScreen;
