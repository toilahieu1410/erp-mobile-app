import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Icon} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
type SelectDateTimeProps = {
  title?: string | null;
  value?: string | null;
  onSelect?: (date: Date) => void;
};

const SelectDate = ({title, value, onSelect}: SelectDateTimeProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dateChoice, setDateChoice] = useState<Date>(new Date());

  return (
    <View className="mb-4">
      {title && <Text className="text-black text-base">{title}</Text>}
      <View>
        <TouchableOpacity
          onPress={() => {
            setShowModal(!showModal);
          }}
          activeOpacity={1}
          delayPressIn={150}>
          <View className="w-full overflow-hidden h-10 flex flex-row justify-between items-center p-2 border border-gray-400 rounded-lg focus:border-primary">
            <Text className="flex-1 text-black pr-2">
              {moment(dateChoice).format('DD/MM/YYYY')}
            </Text>
            <Icon
              source={showModal ? `chevron-up` : `chevron-down`}
              size={25}
            />
          </View>
        </TouchableOpacity>
        <DatePicker
          locale="vi"
          modal
          mode="date"
          title="Chọn ngày"
          open={showModal}
          date={dateChoice}
          onConfirm={date => {
            setShowModal(false);
            setDateChoice(date);
            if (onSelect) {
              onSelect(date);
            }
          }}
          onCancel={() => {
            setShowModal(false);
          }}
        />
      </View>
    </View>
  );
};

export default SelectDate;
