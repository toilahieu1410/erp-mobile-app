import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {Dropdown} from 'react-native-element-dropdown';
import {Picker} from '@react-native-picker/picker';
import {styles} from '../../../assets/css/ConfirmScreen/style';
import moment from 'moment';

import PickThoiGianXinNghi from '../../picker/pickThoiGianXinNghi';
import { moderateScale } from '../../../screens/size';

const newDate = new Date();

interface CreateConfirmProps {
  onPress: () => void;
}

interface ListItems {
  id: number;
  name: string;
}

interface DataNameDropdown {
  $id: string;
  AVATAR: string | null;
  HO_VA_TEN: string;
  MA_CONG_TY: string;
  MA_PHONG_BAN: string;
  SDT: string | null;
  TEN_PHONG_BAN: string;
  USERNAME: string;
}

const dataName: DataNameDropdown[] = [
  {
    $id: '1',
    AVATAR: 'DatNT1/DatNT1_02_00_30_18_03_2024.png',
    USERNAME: 'DatNT1',
    HO_VA_TEN: 'Nguyễn Tiến Đạt',
    SDT: '0983877462',
    TEN_PHONG_BAN: 'IT phần mềm',
    MA_PHONG_BAN: 'IT_SOFT',
    MA_CONG_TY: 'HOPLONG',
  },
  {
    $id: '2',
    AVATAR: 'Avatar-Facebook-tr?ng.jpg',
    USERNAME: 'INTE026_HL',
    HO_VA_TEN: 'Dương Văn Tiến',
    SDT: '0867198572',
    TEN_PHONG_BAN: 'IT phần mềm',
    MA_PHONG_BAN: 'IT_SOFT',
    MA_CONG_TY: 'HOPLONG',
  },
  {
    $id: '3',
    AVATAR: 'TRAN_TIEN_BO.jpg',
    USERNAME: 'TECH028_HL',
    HO_VA_TEN: 'Trần Tiến Bộ',
    SDT: '0966930768',
    TEN_PHONG_BAN: 'Kỹ Thuật Bảo Hành',
    MA_PHONG_BAN: 'BAO_HANH',
    MA_CONG_TY: 'HOPLONG',
  },
  {
    $id: '4',
    AVATAR: 'TienDM/TienDM_05_02_47_27_02_2024.jpg',
    USERNAME: 'TienDM',
    HO_VA_TEN: 'Đào Mạnh Tiến',
    SDT: '0963 929 865',
    TEN_PHONG_BAN: 'Marketing',
    MA_PHONG_BAN: 'MARK_HL',
    MA_CONG_TY: 'HOPLONG',
  },
  {
    $id: '5',
    AVATAR: null,
    USERNAME: 'TungDT',
    HO_VA_TEN: 'Dương Tiếng Tùng',
    SDT: '0374799781',
    TEN_PHONG_BAN: 'Kinh doanh GiGa',
    MA_PHONG_BAN: 'SALE_GIGA',
    MA_CONG_TY: 'GIGA',
  },
  {
    $id: '6',
    AVATAR: 'PHAM_NGOC_TIEN.jpg',
    USERNAME: 'WALO006_HL',
    HO_VA_TEN: 'Phạm Ngọc Tiến',
    SDT: '0916 150 752',
    TEN_PHONG_BAN: 'Nhặt hàng HN',
    MA_PHONG_BAN: 'WALO_NHATHANG_HL',
    MA_CONG_TY: 'HOPLONG',
  },
];

const loaiXinNghi: ListItems[] = [
  {
    id: 1,
    name: 'Nghỉ thường',
  },
  {
    id: 1,
    name: 'Nghỉ ốm nằm viện/sinh con',
  },
  {
    id: 1,
    name: 'Nghỉ hiếu/hỷ',
  },
];
const CreateTakeLeave: React.FC<CreateConfirmProps> = () => {
  const [username, setUsername] = useState('hieunm');
  const [email, setEmail] = useState('test@gmail.com');
  const [phone, setPhone] = useState('0987654321');
  const [selectConfirm, setSelectConfirm] = useState<ListItems | null>(null);
  const [lyDoNghi, setLyDoNghi] = useState('');
  const [soNgayNghi, setSoNgayNghi] = useState('');
  const [banGiao, setBanGiao] = useState('')
  const [disable, setDisable] = useState(true);
  const [dateTime, setDateTime] = useState(newDate);
  const [day, setDay] = useState('Cả ngày');
  const [show, setShow] = useState(false);
  const [nameSearch, setNameSearch] = useState<string>();
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const renderLabel = () => {
    if (nameSearch || isFocus) {
      return <Text>Dropdown label</Text>;
    }
    return null;
  };

  const handleConfirm = (itemValue: ListItems) => {
    setSelectConfirm(itemValue);
  };

  useEffect(() => {
    if (lyDoNghi !== '' && soNgayNghi !== '') {
      setDisable(false);
    }
    if (lyDoNghi === '' || soNgayNghi === '') {
      setDisable(true);
    }
  }, [lyDoNghi, soNgayNghi]);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dateTime;
    setShow(Platform.OS === 'ios');
    setDateTime(currentDate);
  };

  console.log(nameSearch,'nameSearch')
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <ScrollView > 
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
              <Text style={styles.textHeader}>Phone:</Text>
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
              <Text style={styles.textHeader}>Số ngày nghỉ:</Text>
              <Text>&nbsp;&nbsp;</Text>
              <TextInput
                style={[styles.input]}
                multiline={true}
                onChangeText={setSoNgayNghi}
                placeholder="Số ngày"
              />
            </View>
            <View style={styles.flex}>
              <TextInput
                style={styles.input}
                multiline={true}
                onChangeText={setLyDoNghi}
                placeholder="Nhập lý do nghỉ"
              />
            </View>
            <View style={styles.flex}>
              <Text style={styles.textHeader}>Loại xin nghỉ:</Text>
              <Text>&nbsp;&nbsp;</Text>
              <Picker
                mode="dropdown"
                style={styles.pickerDropdown}
                selectedValue={selectConfirm}
                onValueChange={(itemValue, itemIndex) =>
                  handleConfirm(loaiXinNghi[itemIndex])
                }>
                {loaiXinNghi &&
                  loaiXinNghi.map(item => (
                    <Picker.Item label={item.name} value={item} />
                  ))}
              </Picker>
            </View>
           
            <View style={styles.flex}>
              <Text style={styles.textHeader}>Thời gian xin nghỉ</Text>
              <Text>&nbsp;&nbsp;</Text>
              <View style={styles.dropdown}>
                <NativeBaseProvider>
                  <PickThoiGianXinNghi day={day} setDay={setDay} />
                </NativeBaseProvider>
              </View>
            </View>
            <View style={styles.flex}>
              <Text style={styles.textHeader}>Người nhận bàn giao</Text>
              <Text>&nbsp;&nbsp;</Text>
              <View>
              <Dropdown
                  style={styles.dropdownSearch}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={dataName}
                  search
                  maxHeight={200}
                  valueField="$id"
                  labelField="HO_VA_TEN"
                  placeholder={!isFocus ? 'Select item' : '...'}
                  searchPlaceholder='search...'
                  value={nameSearch}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {setNameSearch(item.HO_VA_TEN);setIsFocus(false)}}
                  // renderLeftIcon={() => (
                  //   <Icon name='home' size={20} />
                  // )}
                />
              </View>
            </View>
            <View >
              <Text style={[styles.textHeader, {marginBottom:moderateScale(10)}]}>Nội dung bàn giao:</Text>
              <TextInput
                style={styles.input}
                multiline={true}
                onChangeText={setBanGiao}
                placeholder="Nhập nội dung bàn giao"
              />
            </View>
  
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateTakeLeave;
