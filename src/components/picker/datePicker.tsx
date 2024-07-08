import React from 'react';
import {View, Platform} from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';

interface DatePickerDayProps {
  onChange: (event: any, date?: Date) => void
  date: Date
  mode: 'date' | 'time' | 'datetime' | 'countdown'
}

const DatePickerDay: React.FC<DatePickerDayProps> = ({
  onChange,
  date,
  mode,

}) => {
  return (
    <View>
      <DatePicker
        testID="dateTimePicker"
        value={date}
        mode={mode}
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        // is24Hour={true}
        onChange={onChange}
        minuteInterval={5}
      />
    </View>
  );
};

export default DatePickerDay;
