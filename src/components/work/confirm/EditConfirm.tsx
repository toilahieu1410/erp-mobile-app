import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styles} from '../../../assets/css/ConfirmScreen/_itemDetailConfirm';
import DatePicker from 'react-native-date-picker';
import ConfirmService from '../../../services/listWorks/serviceConfirm';
import moment from 'moment';
import {showMessage} from 'react-native-flash-message';
import {Picker} from '@react-native-picker/picker';
import AppHeader from '../../navigators/AppHeader';
import { SCREENS } from '../../../constants/screens';

interface XacNhanType {
  value: number;
  display: string;
}

const newDate = new Date();

const EditConfirm: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {item} = route.params;

  const [content, setContent] = useState(item.content);
  const [dateNeedConfirm, setDateNeedConfirm] = useState(
    new Date(item.dateNeedConfirm),
  );
  const [startDate, setStartDate] = useState<Date | null>(
    item.startDate ? new Date(item.startDate) : null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    item.endDate ? new Date(item.endDate) : null,
  );
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [selectConfirm, setSelectConfirm] = useState<XacNhanType | null>(null);
  const [confirmTypes, setConfirmTypes] = useState<XacNhanType[]>([]);

  useEffect(() => {
    const fetchConfirmTypes = async () => {
      try {
        const types = await ConfirmService.getConfirmTypes();
        setConfirmTypes(types);
        const selectedType = types.find(type => type.display === item.type);
        setSelectConfirm(selectedType || null);
      } catch (error) {
        console.error('Error' + error);
      }
    };
    fetchConfirmTypes();
  }, []);

  const handleUpdate = async () => {
    const payload: any = {
      id: item.Id,
      content,
      dateNeedConfirm: moment(dateNeedConfirm).format('DD/MM/YYYY'),
      type: selectConfirm?.value,
      startDate: startDate
        ? moment(startDate).format('DD/MM/YYYY HH:mm')
        : null,
      endDate: endDate ? moment(endDate).format('DD/MM/YYYY HH:mm') : null,
    };

    try {
      await ConfirmService.updateConfirm(item.id, payload);
      showMessage({
        message: 'Success',
        description: 'Sửa đơn xác nhận thành công',
        type: 'success',
      });
      navigation.navigate(SCREENS.LIST_DON_XAC_NHAN.KEY)
    } catch (Error) {
      showMessage({
        message: 'Error',
        description: 'Sửa đơn xác nhận thất bại',
        type: 'danger',
      });
    }
  };

  const handleConfirm = (itemValue: XacNhanType | null) => {
    setSelectConfirm(itemValue);
    if (itemValue && [1, 4, 5].includes(itemValue.value)) {
      setStartDate(newDate);
      setEndDate(newDate);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  console.log(item, 'item');
  return (
    <ScrollView style={styles.container}>
      <AppHeader
        title="Sửa đơn xác nhận"
        centerTitle={true}
        showButtonBack={true}
      />
      <View style={styles.shadow}>
        <View style={styles.flexVertical}>
          <Text style={styles.textLeft}>Mã đơn</Text>
          <Text style={styles.textLeft}>{item.Id}</Text>
        </View>
        <View style={styles.flexVertical}>
          <Text style={styles.textLeft}>Nội dung</Text>
          <TextInput
            style={styles.inputEdit}
            value={content}
            onChangeText={setContent}
            multiline
          />
        </View>
        <View style={styles.flexVertical}>
          <Text style={styles.textLeft}>Ngày cần xác nhận</Text>
          <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
            <Text style={styles.textDate}>
              {moment(dateNeedConfirm).format('DD/MM/YYYY')}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={showStartDatePicker}
            date={dateNeedConfirm}
            mode="date"
            onConfirm={date => {
              setShowStartDatePicker(false);
              setDateNeedConfirm(date);
            }}
            onCancel={() => setShowStartDatePicker(false)}
          />
        </View>
        <View style={styles.flexVertical}>
          <Text style={styles.textLeft}>Loại xác nhận</Text>
          <Picker
            mode="dropdown"
            style={styles.pickerDropdown}
            selectedValue={selectConfirm}
            onValueChange={itemValue => handleConfirm(itemValue)}>
            {confirmTypes &&
              confirmTypes.map(item => (
                <Picker.Item
                  key={item.value}
                  label={item.display}
                  value={item}
                />
              ))}
          </Picker>
        </View>
        <View>
          <TouchableOpacity onPress={handleUpdate} style={styles.buttonSave}>
            <Text style={styles.white}>Sửa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditConfirm;
