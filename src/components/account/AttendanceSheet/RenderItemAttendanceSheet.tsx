import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
type RenderItemAttendanceSheetScript = {
  date: string;
  dateStart?: string | null;
  dateEnd?: string | null;
};

const RenderItemAttendanceSheet = ({
  date,
  dateStart,
  dateEnd,
}: RenderItemAttendanceSheetScript) => {
  return (
    <View className="w-[25%] h-24 border border-primary">
      <View className="items-center bg-gray-300">
        <Text className="text-center align-middle font-bold text-black text-base rounded-full">
          {date}
        </Text>
      </View>
      <View>
        <View className="my-1">
          <Text className="text-green-500 text-center">07:59</Text>
        </View>
        <View className="my-1">
          <Text className="text-center text-green-500">17:59</Text>
        </View>
      </View>
    </View>
  );
};

export default RenderItemAttendanceSheet;

const styles = StyleSheet.create({});
