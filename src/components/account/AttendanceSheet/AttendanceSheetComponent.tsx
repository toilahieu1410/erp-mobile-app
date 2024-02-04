import {ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import RenderItemAttendanceSheet from './RenderItemAttendanceSheet';

const AttendanceSheetComponent = () => {
  const date = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  return (
    <View className="flex-1">
      <ScrollView>
        <View className="flex flex-row flex-wrap justify-start items-center">
          {date.map(item => {
            return <RenderItemAttendanceSheet date={item.toString()} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default AttendanceSheetComponent;
