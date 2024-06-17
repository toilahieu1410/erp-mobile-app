import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, SafeAreaView, ScrollView, Text, Alert, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { RadioButton } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import AuthenticateService from '../../services/Auth';
import { TouchableOpacity } from 'react-native';

interface FormData {
  hoTen: string;
  ngaySinh: string;
  gioiTinh: number;
  maPhongBan: string;
  chucVu: string;
  ngayThuViec: string;
  ngayLamChinhThuc: string;
  maChamCong: string;
  email: string;
  emailCongTy: string;
  avatar: string;
  isAdmin: boolean;
  isLeader: boolean;
  maXacNhan: string;
  leaderId: string;
  tokenSmart: string;
  maKhachHangGiga: string

}

const EditAccountScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userInfo }: any = route.params;

  const {control, handleSubmit, setValue} = useForm<FormData>()

  const [ngaySinh, setNgaySinh] = useState(new Date(userInfo.ngaySinh))
  const [ngayThuViec, setNgayThuViec] = useState(new Date(userInfo.ngayThuViec))
  const [ngayLamChinhThuc, setNgayLamChinhThuc] = useState(new Date(userInfo.ngayLamChinhThuc))

  const [openNgaySinh, setOpenNgaySinh] = useState(false)
  const [openNgayThuViec, setOpenNgayThuViec] = useState(false)
  const [openNgayLamChinhThuc, setOpenNgayLamChinhThuc] = useState(false)
  const [gender, setGender] = useState(userInfo.gioiTinh)

  const genderOptions = [
    { id: '0', label: 'Nữ', value: 0 },
    { id: '1', label: 'Nam', value: 1 },
  ]

  useEffect(() => {
    if(userInfo) {
      Object.keys(userInfo).forEach((key) => {
        setValue(key as keyof FormData, userInfo[key])
      })
    }
  }, [userInfo, setValue])

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await AuthenticateService.UpdateUser(userInfo.id, data);
      if (response.isSuccess) {
        navigation.goBack();
      } else {
        console.error(response.error.message);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // const onSubmit = async (data) => {
  //   if (!validateEmail(data.email)) {
  //     Alert.alert('Invalid Email', 'Please enter a valid email address.');
  //     return;
  //   }
  //   try {
  //     const userId = userInfo.id;
  //     const response = await AuthenticateService.UpdateUser(userId, {
  //       ...data,
  //       gioiTinh: Number(data.gioiTinh),
  //       ngaySinh: data.ngaySinh.toISOString(),
  //       ngayThuViec: data.ngayThuViec.toISOString(),
  //       ngayLamChinhThuc: data.ngayLamChinhThuc.toISOString(),
  //     });
  //     navigation.goBack();
  //   } catch (error) {
  //     console.error('Unable to update user information', error);
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView>
        <View style={styles.formGroup}>
         <Controller
          control={control}
          name="hoTen"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <Text>Họ tên</Text>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
        />
        </View>
        <View style={styles.inputContainer}>
          <Text>Ngày sinh</Text>
          <TouchableOpacity onPress={() => setOpenNgaySinh(true)}>
            <TextInput
              style={styles.input}
              editable={false}
              value={ngaySinh.toISOString().split('T')[0]}
            />
          </TouchableOpacity>
          <DatePicker
            modal
            open={openNgaySinh}
            date={ngaySinh}
            mode="date"
            onConfirm={(date) => {
              setOpenNgaySinh(false);
              setNgaySinh(date);
            }}
            onCancel={() => setOpenNgaySinh(false)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Giới tính</Text>
          <RadioGroup
            radioButtons={genderOptions}
            onPress={(radioButtonsArray) => {
              const selectedGender = radioButtonsArray.find((rb) => rb.selected);
              if (selectedGender) {
                setGender(selectedGender.value);
              }
            }}
            layout="row"
            containerStyle={styles.radioGroup}
          />
        </View>
        <View style={styles.formGroup}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Email"
              />
            )}
          />
        </View>
        <View style={styles.formGroup}>
          <Controller
            control={control}
            name="maPhongBan"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Mã phòng ban"
              />
            )}
          />
        </View>
        <View style={styles.formGroup}>
          <Controller
            control={control}
            name="chucVu"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Chức vụ"
              />
            )}
          />
        </View>
        <View style={styles.formGroup}>
          <Text>Ngày thử việc</Text>
          <Button title={getValues('ngayThuViec').toDateString()} onPress={() => {
            setSelectedDateField('ngayThuViec');
            setDatePickerVisible(true);
          }} />
        </View>
        <View style={styles.formGroup}>
          <Text>Ngày làm chính thức</Text>
          <Button title={getValues('ngayLamChinhThuc').toDateString()} onPress={() => {
            setSelectedDateField('ngayLamChinhThuc');
            setDatePickerVisible(true);
          }} />
        </View>
        <View style={styles.formGroup}>
          <Controller
            control={control}
            name="maChamCong"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Mã chấm công"
              />
            )}
          />
        </View>
        <View style={styles.formGroup}>
          <Controller
            control={control}
            name="emailCongTy"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Email công ty"
              />
            )}
          />
        </View>
        <View style={styles.formGroup}>
          <Controller
            control={control}
            name="avatar"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Avatar"
              />
            )}
          />
        </View>
        <View style={styles.formGroup}>
          <Text>Is Admin</Text>
          <Controller
            control={control}
            name="isAdmin"
            render={({ field: { onChange, value } }) => (
              <RadioButton.Group
                onValueChange={(newValue) => onChange(newValue === 'true')}
                value={value ? 'true' : 'false'}
              >
                <View style={styles.radioGroup}>
                  <Text>Yes</Text>
                  <RadioButton value="true" />
                  <Text>No</Text>
                  <RadioButton value="false" />
                </View>
              </RadioButton.Group>
            )}
          />
        </View>
        <View style={styles.formGroup}>
          <Text>Is Leader</Text>
          <Controller
            control={control}
            name="isLeader"
            render={({ field: { onChange, value } }) => (
              <RadioButton.Group
                onValueChange={(newValue) => onChange(newValue === 'true')}
                value={value ? 'true' : 'false'}
              >
                <View style={styles.radioGroup}>
                  <Text>Yes</Text>
                  <RadioButton value="true" />
                  <Text>No</Text>
                  <RadioButton value="false" />
                </View>
              </RadioButton.Group>
            )}
          />
        </View>
        <View style={styles.formGroup}>
          <Controller
            control={control}
            name="maXaNhan"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Mã xác nhận"
              />
            )}
          />
        </View>
        <View style={styles.formGroup}>
          <Controller
            control={control}
            name="leaderId"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Leader ID"
              />
            )}
          />
        </View>
        <View style={styles.formGroup}>
          <Controller
            control={control}
            name="tokenSmart"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Token Smart"
              />
            )}
          />
        </View>
        <View style={styles.formGroup}>
          <Controller
            control={control}
            name="maKhachHangGiga"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Mã khách hàng Giga"
              />
            )}
          />
        </View>
        <Button title="Save" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
      <DatePicker
        modal
        open={datePickerVisible}
        date={getValues(selectedDateField)}
        onConfirm={(date) => {
          setValue(selectedDateField, date);
          setDatePickerVisible(false);
        }}
        onCancel={() => {
          setDatePickerVisible(false);
        }}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default EditAccountScreen;
