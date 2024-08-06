import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
import {Button as ButtonCreate, NativeBaseProvider} from 'native-base';
import {styles} from '../../../assets/css/ListWorksScreen/style';

interface CreateOfferPaymentsProps {
  onPress: () => void;
}

interface Payments {
  id: number;
  name: string;
  value: string;
}

const listPayments: Payments[] = [
  {
    id: 1,
    name: 'Tiền mặt',
    value: 'tienmat',
  },
  {
    id: 2,
    name: 'Chuyển khoản',
    value: 'chuyenkhoan',
  },
];

const CreateOfferPayments: React.FC<CreateOfferPaymentsProps> = () => {
  const [username, setUsername] = useState('hieunm');

  const [noiDungThanhToan, setNoiDungThanhToan] = useState('');
  const [ghiChu, setGhiChu] = useState('');
  const [disable, setDisable] = useState(true);
  const [show, setShow] = useState(false);
  const [selectConfirm, setSelectConfirm] = useState<Payments | null>(null);

  const richText = useRef(null);

  useEffect(() => {
    if (noiDungThanhToan !== '') {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [noiDungThanhToan]);

  const handleConfirm = (itemValue: Payments) => {
    setSelectConfirm(itemValue);
  };

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

            <View>
              <Text style={styles.textHeader}>
                Nội dung thanh toán/Chuyển khoản:
              </Text>
              <Text>&nbsp;&nbsp;</Text>
              <View style={styles.flex}>
                <TextInput
                  style={styles.input}
                  multiline={true}
                  onChangeText={setNoiDungThanhToan}
                  placeholder="Nhập nội dung thanh toán"
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>
            <View>
              <Text style={styles.textHeader}>Ghi chú đơn:</Text>
              <Text>&nbsp;&nbsp;</Text>
              <View style={styles.flex}>
                <TextInput
                  style={styles.input}
                  multiline={true}
                  onChangeText={setGhiChu}
                  placeholder="Ghi chú"
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>
            <View style={styles.flex}>
              <Text style={styles.textHeader}>Loại xác nhận:</Text>
              <Text>&nbsp;&nbsp;</Text>
              <Picker
                mode="dropdown"
                style={styles.pickerDropdown}
                selectedValue={selectConfirm}
                onValueChange={(itemValue, itemIndex) =>
                  handleConfirm(listPayments[itemIndex - 1])
                }>
                <Picker.Item label={'Chọn'} value="" />
                {listPayments &&
                  listPayments.map(item => (
                    <Picker.Item label={item.name} value={item} />
                  ))}
              </Picker>
            </View>
            <View>
              <Text style={styles.textHeader}>Đính kèm:</Text>
              <Text>&nbsp;&nbsp;</Text>
              {/* <View className="">
                <RichToolbar
                  editor={richText}
                  selectedIconTint="#873c1e"
                  iconTint="#312921"
                  actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.setUnderline,
                    actions.heading1,
                    actions.heading2,
                    actions.heading3,
                    actions.insertLine,
                    actions.setParagraph,
                    actions.removeFormat,
                    actions.alignLeft,
                    actions.alignCenter,
                    actions.alignRight,
                    actions.alignFull,
                    actions.insertBulletsList,
                    actions.insertOrderedList,
                    actions.checkboxList,
                    actions.insertLink,
                    actions.insertImage,
                    actions.fontSize,
                    actions.fontName,
                    actions.setHR,
                    actions.indent,
                    actions.outdent,
                    actions.undo,
                    actions.redo,
                    actions.code,
                    // actions.table,
                    actions.line,
                    actions.prepareInsert,
                    actions.restoreSelection,
                    actions.setTextColor,
                    actions.setBackgroundColor,
                    //actions.init,
                    // actions.setEditorHeight,
                    //actions.setFooterHeight,
                    //actions.setPlatform,
                  ]}
                  // onPressAddImage={() => {
                  //   pickerImage();
                  // }}
                  // onInsertLink={() => {
                  //   insertLink();
                  // }}
                  iconMap={{
                    [actions.heading1]: () => (
                      <Text style={{fontSize: 16}}>h1</Text>
                    ),
                    [actions.heading2]: () => (
                      <Text style={{fontSize: 16}}>h2</Text>
                    ),
                    [actions.heading3]: () => (
                      <Text style={{fontSize: 16}}>h3</Text>
                    ),
                    [actions.setParagraph]: () => (
                      <Text style={{fontSize: 16}}>p</Text>
                    ),
                    [actions.setTextColor]: () => (
                      <Image
                        source={IMAGES.SET_TEXT_COLOR}
                        style={{height: 20, width: 20}}
                      />
                    ),
                    [actions.setBackgroundColor]: () => (
                      <Image
                        source={IMAGES.FILL_COLOR}
                        style={{height: 20, width: 20}}
                      />
                    ),
                  }}
                />
                <View className=" border border-gray-400 rounded-lg">
                  <RichEditor
                    //onFocus={() =>}
                    //onBlur={() => }
                    ref={richText}
                    androidHardwareAccelerationDisabled={true}
                    onChange={text => {
                      // setText(text);
                    }}
                    initialContentHTML={
                      'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'
                    }
                  />
                </View>
              </View> */}
            </View>
          
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateOfferPayments;
