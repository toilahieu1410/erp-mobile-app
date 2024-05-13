import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Button as ButtonCreate, NativeBaseProvider} from 'native-base';
import {styles} from '../../assets/css/ConfirmScreen/style';
import moment from 'moment';
import DatePickerDay from '../picker/datePicker';

interface CreateConfirmProps {
  onPress: () => void;
}

interface PickerItem {
  id: number;
  name: string;
}

const newDate = new Date();

const loaiXacNhan: PickerItem[] = [
  {
    id: 1,
    name: 'Tăng ca (OT)',
  },
  {
    id: 2,
    name: 'Quên chấm công, không thể chấm công',
  },
  {
    id: 3,
    name: 'Tăng ca (OT)',
  },
  {
    id: 4,
    name: 'Tăng ca (OT)',
  },
  {
    id: 5,
    name: 'Tăng ca (OT)',
  },
];

const CreateConfirm: React.FC<CreateConfirmProps> = () => {
  const [username, setUsername] = useState('hieunm');
  const [macongty, setMacongty] = useState('hoplong');
  const [email, setEmail] = useState('testgmail@gmail.com');
  const [phone, setPhone] = useState('0123456789');
  const [selectConfirm, setSelectConfirm] = useState<PickerItem | null>(null);
  const [lyDo, setLyDo] = useState('');
  const [disable, setDisable] = useState(true);
  const [dateTime, setDateTime] = useState(newDate);
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dateTime;
    setShow(Platform.OS === 'ios');
    if (currentDate < newDate) {
      Alert.alert('Lỗi', 'Ngày cần xác nhận không được nhỏ hơn ngày hiện tại');
    } else {
      setDateTime(currentDate);
    }
  };

  const handleConfirm = (itemValue: PickerItem) => {
    setSelectConfirm(itemValue);
  };

  useEffect(() => {
    if (lyDo !== '') {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [lyDo]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <ScrollView>
        <View style={styles.scroll}>
          <View style={styles.card}>
            <View style={styles.flex}>
              <Text style={styles.textHeader}>Người đề nghị:</Text>
              <Text>&nbsp;&nbsp;</Text>
              <Text style={styles.colorText}>{username}</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.textHeader}>Email:</Text>
              <Text>&nbsp;&nbsp;</Text>
              <Text style={styles.colorText}>{email}</Text>
            </View>
            <View style={styles.flex}>
              <Text style={styles.textHeader}>SDT:</Text>
              <Text>&nbsp;&nbsp;</Text>
              <Text style={styles.colorText}>{phone}</Text>
            </View>
            <View style={styles.border}></View>
            <View style={styles.flex}>
              <Text style={styles.textHeader}>Ngày tạo đơn:</Text>
              <Text>&nbsp;&nbsp;</Text>
              <Text style={styles.colorText}>
                {moment(newDate).format('DD/MM/YYYY')}
              </Text>
            </View>
            <View style={styles.flex}>
            <Text style={styles.textHeader}>Loại xác nhận:</Text>
              <Text>&nbsp;&nbsp;</Text>
              <Picker
              mode="dropdown"
              style={styles.pickerDropdown}
              selectedValue={selectConfirm}
              onValueChange={(itemValue, itemIndex) => handleConfirm(loaiXacNhan[itemIndex - 1])}>
              <Picker.Item label={'Loại xác nhận'} value="" />
              {loaiXacNhan &&
                loaiXacNhan.map(item => (
                  <Picker.Item label={item.name} value={item} />
                ))}
            </Picker>
            </View>
         
            <View style={styles.flex}>
              <Text style={styles.textHeader}>Ngày cần xác nhận:</Text>
              <Text>&nbsp;&nbsp;</Text>
              <TouchableOpacity
                style={styles.btnDate}
                onPress={() => setShow(!show)}>
                <Text style={styles.colorText}>
                  {moment(dateTime).format('DD/MM/YYYY')}
                </Text>
              </TouchableOpacity>
              {show && (
                <DatePickerDay
                  onChange={onChange}
                  date={dateTime}
                  mode={'date'}
                />
              )}
            </View>
            <View style={styles.flex}>
              <TextInput
                style={styles.input}
                multiline={true}
                onChangeText={setLyDo}
                placeholder="Nội dung cần xác nhận"
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={[styles.flex, {justifyContent: 'center'}]}>
              <NativeBaseProvider>
                <ButtonCreate
                  disabled={disable}
                  // onPress={(e) => console.log(e)}
                  style={
                    disable ? styles.buttonAddDisable : styles.buttonAddEnable
                  }>
                  <Text style={styles.textColor}>Tạo đề nghị</Text>
                </ButtonCreate>
              </NativeBaseProvider>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateConfirm;
