import React, { useCallback, useEffect, useState } from 'react';
import { View, Button, StyleSheet, SafeAreaView, ScrollView, Text, Alert, TextInput,TouchableOpacity, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { ActivityIndicator, Avatar, RadioButton } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import AuthenticateService from '../../services/Auth';
import ServiceTakeLeave from '../../services/listWorks/serviceTakeLeave';
import { Dropdown } from "react-native-element-dropdown";
import moment from 'moment';
import AppHeader from '../../components/navigators/AppHeader';
import { showMessage } from 'react-native-flash-message';
import { styles } from '../../assets/css/AccountScreen/style';
import SelectPhoto from '../../components/app/FileManager/SelectPhoto';
import { COLORS } from '../../constants/screens';
import LoadingPage from '../../utils/loading.js';


interface FormData {
  userId: string;
  hoTen: string;
  ngaySinh: string;
  gioiTinh: string;
  soDienThoai: string;
  maPhongBan: string;
  chucVu: string;
  ngayThuViec: string;
  ngayLamChinhThuc: string;
  maChamCong: string;
  // email: string;
  emailCongTy: string;
  avatar: string;
  isAdmin: boolean;
  isLeader: boolean;
  maXacNhan: string;
  leaderId: string;
  maKhachHangGiga?: string

}
interface ListUsers {
  id: string;
  hoTen: string;
  userName: string;
}

const EditAccountScreen = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const { userInfo }: any = route.params;

  const {control, handleSubmit, setValue } = useForm<FormData>()
  const [userData, setUserData] = useState(userInfo)
  const [selectedImage, setSelectedImage] = useState(userInfo.avatar)
  const [ngaySinh, setNgaySinh] = useState(new Date(userInfo.ngaySinh))
  const [ngayThuViec, setNgayThuViec] = useState(new Date(userInfo.ngayThuViec))
  const [ngayLamChinhThuc, setNgayLamChinhThuc] = useState(new Date(userInfo.ngayLamChinhThuc))

  const [openNgaySinh, setOpenNgaySinh] = useState(false)
  const [openNgayThuViec, setOpenNgayThuViec] = useState(false)
  const [openNgayLamChinhThuc, setOpenNgayLamChinhThuc] = useState(false)
  const [gender, setGender] = useState(userInfo.gioiTinh)
  const [users, setUsers] = useState<ListUsers[]>([]);
  const [leaderName, setLeaderName] = useState<string>(userInfo.leader);
  const [leaderId, setLeaderId] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)


  const genderOptions = [
    { id: 0, label: 'Nam', value: 'Nam' },
    { id: 1, label: 'Nữ', value: 'Nu' },
  ]

  useEffect(() => {
    if(userInfo) {
      Object.keys(userInfo).forEach((key) => {
        setValue(key as keyof FormData, userInfo[key])
      })
    }
  }, [userInfo, setValue])

  useFocusEffect(
    useCallback(() => {
      const fetchUsers = async () => {
        setLoading(true)
        try {
          const response = await ServiceTakeLeave.getUserHandOver('');
          setUsers(response);

          const leader = response.find(user => user.hoTen === userInfo.leader);
          if (leader) {
            setLeaderId(leader.id)
            setLeaderName(leader.hoTen);
            setValue('leaderId', leader.id)
          }
        } catch (error) {
          console.error('Không thể lấy danh sách người dùng', error);
        } finally {
          setLoading(false)
        }
      };

      fetchUsers();
    }, [userInfo.leader])
  );

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };


  const handleImageSelect = async (image) => {
    const newAvatarPath = image.uri;
    setSelectedImage(newAvatarPath);
    setUserData(prevUserData => ({
      ...prevUserData,
      avatar: newAvatarPath
    }));
  
    try {
      if (userInfo && userInfo.id) {
        const response = await AuthenticateService.UpdateUser(userInfo.id, { avatar: newAvatarPath });
        if (response.isSuccess) {
          showMessage({
            message: 'Avatar updated successfully',
            description: 'Your avatar has been updated',
            type: 'success'
          });
        } else {
          showMessage({
            message: 'Failed to update avatar',
            description: response.error.message || 'An error occurred',
            type: 'danger'
          });
        }
      }
    } catch (error) {
      console.error('Failed to update avatar', error);
      showMessage({
        message: 'Failed to update avatar',
        description: error.message || 'An error occurred',
        type: 'danger'
      });
    }
  };

  const onSubmit = async (data: FormData) => {
    // if(!validateEmail(data.email)) {
    //   Alert.alert('Invalid Email', 'Vui lòng nhập đúng định dạng email')
    //   return
    // }
    

    try {
      const formattedData = {
        ...data,
        gioiTinh: gender,
        isAdmin: data.isAdmin ?? false,
        isLeader: data.isLeader ?? false, 
        ngaySinh: moment(ngaySinh).format('DD/MM/YYYY'),
        ngayThuViec: moment(ngayThuViec).format('DD/MM/YYYY'),
        ngayLamChinhThuc: moment(ngayLamChinhThuc).format('DD/MM/YYYY'),
        leaderId: leaderId
      };
      console.log(data,'resss', formattedData)

      if(data.avatar === undefined) {
        delete formattedData.avatar
      }
      if(data.maXacNhan === undefined) {
        delete formattedData.maXacNhan
      }
      const selectedUser = users.find(user => user.hoTen === leaderName);
     
      if (selectedUser) {
        data.leaderId = selectedUser.hoTen;
      }

      const response = await AuthenticateService.UpdateUser(userInfo.id, formattedData);
      console.log(response,'bbbbbbbbbb',formattedData, userInfo)
      if (response.isSuccess) {
        showMessage({
          message: 'Dữ liệu đã được cập nhật',
          description: 'Thông tin cá nhân của bạn đã được cập nhật trên hệ thống',
          type: 'success'
        })
        navigation.goBack();
      } else {
        console.error(response.error.message);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
        <AppHeader
          title="Cập nhật thông tin cá nhân"
          centerTitle={true}
          showButtonBack={true}
          backgroundColor="#fff"
          titleColor="#000"
      />

      <ScrollView contentContainerStyle={styles.content} >
      <View style={styles.body}>
   {/* <View className="relative">
              <Avatar.Image
                size={Dimensions.get('screen').width * 0.25}
                source={{ uri: selectedImage }}>
              </Avatar.Image>
              <View className="absolute p-0 bottom-0 right-0">
                <SelectPhoto
                mediaType='photo'
                  onSelect={handleImageSelect}>
                  <Avatar.Icon
                    size={(Dimensions.get('screen').width * 0.3) / 4.5}
                    icon="plus-circle-outline"
                    color={COLORS.WHITE}
                    style={{
                      backgroundColor: '#027BE3',
                    }}
                  />
                </SelectPhoto>
              </View>
            </View> */}
            <View style={styles.formGroup}>
            <Text style={styles.textTitle}>Họ tên</Text>
                <Controller 
                  control={control}
                  name='hoTen'
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={styles.inputEdit}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.textTitle}>Ngày sinh</Text>
              <TouchableOpacity onPress={() => setOpenNgaySinh(true)} style={styles.btnDate}>
                <Text style={styles.textPicker}>{moment(ngaySinh).format('DD/MM/YYYY')}</Text>
              </TouchableOpacity>
              <DatePicker 
                mode='date'
                modal
                open={openNgaySinh}
                date={ngaySinh}
                onConfirm={(date) => {
                  setNgaySinh(date)
                  setOpenNgaySinh(false)
                }}
                onCancel={() => {
                  setOpenNgaySinh(false)
                }}
              />
            </View>
          
            <View style={styles.formGroup}>
                <Text style={styles.textTitle}>Giới tính</Text>
                <RadioButton.Group
                  onValueChange={(newValue) => {
                    setGender(newValue);
                  }}
                  value={gender}
                >
                  <View style={styles.radioButtonHorizonal}>
                    {genderOptions.map((option) => (
                    <View style={styles.radioButtonContainer} key={option.value}>
                       <RadioButton value={option.value}  />
                      <Text>{option.label}</Text>
                    </View>
                  ))}
                </View>
                </RadioButton.Group>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.textTitle}>Số điện thoại</Text>
              <Controller 
                control={control}
                name='soDienThoai'
                render={({field: {onChange, value}}) => (
                  <TextInput 
                    style={styles.inputEdit}
                    onChangeText={onChange}
                    value={value ? value.toString() : ''}
                    keyboardType='phone-pad'
                  />
                )}
              />
            </View>
            {/* <View style={styles.formGroup}>
              <Text style={styles.textTitle}>Email</Text>
              <Controller 
                control={control}
                name='email'
                render={({field: {onChange, value}}) => (
                  <TextInput 
                    style={styles.inputEdit}
                    onChangeText={onChange}
                    value={value}
                    keyboardType='email-address'
                  />
                )}
              />
            </View> */}
            <View style={styles.formGroup}>
              <Text style={styles.textTitle}>Email Công ty</Text>
              <Controller 
                control={control}
                name='emailCongTy'
                render={({field: {onChange, value}}) => (
                  <TextInput 
                    style={styles.inputEdit}
                    onChangeText={onChange}
                    value={value}
                    keyboardType='email-address'
                  />
                )}
              />
            </View>
            <View style={styles.formGroup}>
              <Text>Leader</Text>
              <Controller
                control={control}
                name='leaderId'
                defaultValue={leaderId}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    search
                    inputSearchStyle={styles.searchStyle}
                    searchPlaceholder="Gõ để tìm kiếm"
                    style={styles.dropdown}
                    data={users.map(user => ({ label: user.hoTen, value: user.id }))}
                    labelField="label"
                    valueField="value"
                    value={value}
                    onChange={item => {
                      setLeaderName(item.label);
                      setLeaderId(item.value)
                      onChange(item.value);
                    }}
                    placeholder="Chọn người lãnh đạo"
                  />
                )}
              />
            </View>
          
            <View style={styles.formGroup}>
              <Text style={styles.textTitle}>Mã phòng ban</Text>
              <Controller 
                control={control}
                name='maPhongBan'
                render={({field: {onChange, value}}) => (
                  <TextInput 
                    style={styles.inputEdit}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.textTitle}>Chức vụ</Text>
              <Controller 
                control={control}
                name='chucVu'
                render={({field: {onChange, value}}) => (
                  <TextInput 
                    style={styles.inputEdit}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
         
            <View style={styles.formGroup}>
                <Text style={styles.textTitle}>Ngày thử việc</Text>
                <TouchableOpacity onPress={() => setOpenNgayThuViec(true)} style={styles.btnDate}>
                  <Text style={styles.textPicker}>{moment(ngayThuViec).format('DD/MM/YYYY')}</Text>
                </TouchableOpacity>
                <DatePicker 
                  mode='date'
                  modal
                  open={openNgayThuViec}
                  date={ngayThuViec}
                  onConfirm={(date) => {
                    setNgayThuViec(date)
                    setOpenNgayThuViec(false)
                  }}
                  onCancel={() => {
                    setOpenNgayThuViec(false)
                  }}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.textTitle}>Ngày làm chính thức</Text>
                <TouchableOpacity onPress={() => setOpenNgayLamChinhThuc(true)} style={styles.btnDate}>
                  <Text style={styles.textPicker}>{moment(ngayLamChinhThuc).format('DD/MM/YYYY')}</Text>
                </TouchableOpacity>
                <DatePicker 
                  mode='date'
                  modal
                  open={openNgayLamChinhThuc}
                  date={ngayLamChinhThuc}
                  onConfirm={(date) => {
                    setNgayLamChinhThuc(date)
                    setOpenNgayLamChinhThuc(false)
                  }}
                  onCancel={() => {
                    setOpenNgayLamChinhThuc(false)
                  }}
                />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.textTitle}>Mã xác nhận</Text>
              <Controller 
                control={control}
                name='maXacNhan'
                render={({ field: {onChange, value}}) => (
                  <TextInput 
                    style={styles.inputEdit}
                    onChangeText={(value) => onChange(parseInt(value))}
                    value={value ? value.toString() : ''}
                    keyboardType='numeric'
                  />
                )}
              />
              
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.textTitle}>Avatar</Text>
              <Controller
                control={control}
                name="avatar"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.inputEdit}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
            <View style={styles.radioButtonHorizonal}>
            {/* <View style={[styles.formGroup, styles.radioButtonContainer]}>
            <Controller 
                control={control}
                name='isAdmin'
                render={({field: {onChange, value}}) => (
                  <RadioButton 
                    value={value}
                    status={value ? 'checked' : 'unchecked'}
                    onPress={() => onChange(!value)}
                  />
                )}
              />
              <Text style={styles.textTitle}>Is Admin</Text>
              
            </View> */}
            <View style={[styles.formGroup, styles.radioButtonContainer]}>
            <Controller 
                control={control}
                name='isLeader'
                render={({field: {onChange, value}}) => (
                  <RadioButton 
                    value={value}
                    status={value ? 'checked' : 'unchecked'}
                    onPress={() => onChange(!value)}
                  />
                )}
              />
              <Text style={styles.textTitle}>Is Leader</Text>
              </View>
            </View>
          </View>
      </ScrollView>
        </>
      )}

      <View style={styles.boxButton}>
        <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit(onSubmit)} >
          <Text style={styles.textSave}>Lưu thông tin</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};



export default EditAccountScreen;
