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

import {styles} from '../../../assets/css/ConfirmScreen/style';
import moment from 'moment';
import DatePickerDay from '../../picker/datePicker';

interface CreateWorkFromHomeProps {
  onPress: () => void;
}

interface PickerItem {
  id: number;
  name: string;
  value: string;
}

const CreateWorkFromHome: React.FC<CreateWorkFromHomeProps> = () => {
  const [username, setUsername] = useState('hieunm');
  const [macongty, setMacongty] = useState('hoplong');
  const [email, setEmail] = useState('testgmail@gmail.com');
  const [phone, setPhone] = useState('0123456789');
  const [selectConfirm, setSelectConfirm] = useState<PickerItem | null>(null);
  const [lyDo, setLyDo] = useState('');
  const [muonDoDung, setMuonDoDung] = useState('')
  const [disable, setDisable] = useState(true);
  const [show, setShow] = useState(false);


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
              <Text style={styles.textHeader}>Quản lý:</Text>
              <Text>&nbsp;&nbsp;</Text>
              <Text style={styles.colorText}>{'hienlt'}</Text>
            </View>

            <View>
              <Text style={styles.textHeader}>Lý do:</Text>
              <Text>&nbsp;&nbsp;</Text>
              <View style={styles.flex}>
                <TextInput
                  style={styles.input}
                  multiline={true}
                  onChangeText={setLyDo}
                  placeholder="Nhập lý do"
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>
            <View>
              <Text style={styles.textHeader}>Mượn đồ dùng công ty:</Text>
              <Text>&nbsp;&nbsp;</Text>
              <View style={styles.flex}>
                <TextInput
                  style={styles.input}
                  multiline={true}
                  onChangeText={setMuonDoDung}
                  placeholder="Nhập đồ dùng muốn mượn"
                  underlineColorAndroid="transparent"
                />
              </View>
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

export default CreateWorkFromHome;
