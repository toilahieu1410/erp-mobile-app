import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Select, FormControl, CheckIcon} from 'native-base';

interface PickThoiGianXinNghiProps {
  day: string;
  setDay: (value: string) => void;
}

const PickThoiGianXinNghi: React.FC<PickThoiGianXinNghiProps> = ({
  day,
  setDay,
}) => {
  return (
    <FormControl style={styles.container}>
      <Select
      
        _selectedItem={{
          bg: 'blue.500',
          color: '#fff',
          endIcon: <CheckIcon size="5" />,
        }}
        color={'#000'}
        selectedValue={day}
        accessibilityLabel='Chọn thời gian'
        placeholder='Chọn thời gian'
        onValueChange={setDay}>
        <Select.Item label="Cả ngày" value="Cả ngày" />
        <Select.Item label="Sáng" value="Sáng" />
        <Select.Item label="Chiều" value="Chiều" />
      </Select>
    </FormControl>
  );
};

export default PickThoiGianXinNghi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
