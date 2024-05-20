import React, {useState} from 'react';
import {View, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import {styles} from '../../../assets/css/ConfirmScreen/_listConfirm';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthScale } from '../../../screens/size';
import { SCREENS } from '../../../constants/screens';

interface NghiPhep {
  $id: string;
  MA_SO_XIN_NGHI: string;
  NGAY_LAM_DON: string;
  NGUOI_DE_NGHI: string;
  TEN_PHONG_BAN: string;
  LY_DO_XIN_NGHI: string;
  THOI_GIAN_NGHI: string;
  TONG_SO_NGAY_NGHI: number;
  GHI_CHU: string | null;
  TRUONG_PHONG_DUYET: string | null;
  NGAY_TRUONG_PHONG_DUYET: string | null;
  TRUONG_PHONG_DA_DUYET: boolean;
  TRUONG_PHONG_HUY_DUYET: boolean;
  HO_VA_TEN: string;
  TRUONG_NHOM: string | null;
  LOAI_NGHI_PHEP: string;
  TONG_SO_NGAY_NGHI_TRONG_NAM: number;
  TONG_SO_NGAY_NGHI_OM: number;
  TONG_SO_NGAY_NGHI_HIEU_HY: number;
  TONG_SO_NGAY_NGHI_THUONG: number;
  NGUOI_BAN_GIAO: string | null;
  NOI_DUNG_BAN_GIAO: string | null;
  LEADER: string;
}

interface ViewTakeLeaveProps {
  nghiPhep: {
    listNghiPhep: NghiPhep[];
    listDemNghiPhep: number[];
  };

}

interface DanhSachNghiPhepProps {
  navigation: any;
}

const ListTakeLeave: React.FC<DanhSachNghiPhepProps> = () => {
  const listTakeLeave: NghiPhep[] = [
    {
      $id: '1',
      MA_SO_XIN_NGHI: 'NPHL2405070001',
      NGAY_LAM_DON: '2024-05-07T00:00:00',
      NGUOI_DE_NGHI: 'HieuNM',
      TEN_PHONG_BAN: 'IT phần mềm',
      LY_DO_XIN_NGHI: 'Đưa vợ đi khám sức khỏe',
      THOI_GIAN_NGHI: '07/05/2024-Chiều;',
      TONG_SO_NGAY_NGHI: 0.5,
      GHI_CHU: null,
      TRUONG_PHONG_DUYET: null,
      NGAY_TRUONG_PHONG_DUYET: null,
      TRUONG_PHONG_DA_DUYET: false,
      TRUONG_PHONG_HUY_DUYET: false,
      HO_VA_TEN: 'Nguyễn Minh Hiếu',
      TRUONG_NHOM: null,
      LOAI_NGHI_PHEP: 'Nghỉ thường',
      TONG_SO_NGAY_NGHI_TRONG_NAM: 1,
      TONG_SO_NGAY_NGHI_OM: 0,
      TONG_SO_NGAY_NGHI_HIEU_HY: 0,
      TONG_SO_NGAY_NGHI_THUONG: 1,
      NGUOI_BAN_GIAO: 'INTE026_HL - Dương Văn Tiến - IT phần mềm',
      NOI_DUNG_BAN_GIAO: '<p>giga digital</p>',
      LEADER: 'INTE001_HL',
    },
    {
      $id: '2',
      MA_SO_XIN_NGHI: 'NPHL2404200001',
      NGAY_LAM_DON: '2024-04-20T00:00:00',
      NGUOI_DE_NGHI: 'HieuNM',
      TEN_PHONG_BAN: 'IT phần mềm',
      LY_DO_XIN_NGHI: 'Xin nghỉ buổi chiều đi khám sức khỏe',
      THOI_GIAN_NGHI: '22/04/2024-Chiều;',
      TONG_SO_NGAY_NGHI: 0.5,
      GHI_CHU: null,
      TRUONG_PHONG_DUYET: null,
      NGAY_TRUONG_PHONG_DUYET: null,
      TRUONG_PHONG_DA_DUYET: false,
      TRUONG_PHONG_HUY_DUYET: false,
      HO_VA_TEN: 'Nguyễn Minh Hiếu',
      TRUONG_NHOM: null,
      LOAI_NGHI_PHEP: 'Nghỉ thường',
      TONG_SO_NGAY_NGHI_TRONG_NAM: 1,
      TONG_SO_NGAY_NGHI_OM: 0,
      TONG_SO_NGAY_NGHI_HIEU_HY: 0,
      TONG_SO_NGAY_NGHI_THUONG: 1,
      NGUOI_BAN_GIAO: 'Không',
      NOI_DUNG_BAN_GIAO: '<p>gigadigital</p>',
      LEADER: 'INTE001_HL',
    },
    {
      $id: '3',
      MA_SO_XIN_NGHI: 'NPHL2404080001',
      NGAY_LAM_DON: '2024-04-08T00:00:00',
      NGUOI_DE_NGHI: 'HieuNM',
      TEN_PHONG_BAN: 'IT phần mềm',
      LY_DO_XIN_NGHI: 'Xin nghỉ phép vì lí do bà ngoại mất',
      THOI_GIAN_NGHI: '10/04/2024-Cả ngày;',
      TONG_SO_NGAY_NGHI: 1,
      GHI_CHU: null,
      TRUONG_PHONG_DUYET: null,
      NGAY_TRUONG_PHONG_DUYET: null,
      TRUONG_PHONG_DA_DUYET: false,
      TRUONG_PHONG_HUY_DUYET: false,
      HO_VA_TEN: 'Nguyễn Minh Hiếu',
      TRUONG_NHOM: null,
      LOAI_NGHI_PHEP: 'Nghỉ hiếu/hỷ',
      TONG_SO_NGAY_NGHI_TRONG_NAM: 1,
      TONG_SO_NGAY_NGHI_OM: 0,
      TONG_SO_NGAY_NGHI_HIEU_HY: 0,
      TONG_SO_NGAY_NGHI_THUONG: 1,
      NGUOI_BAN_GIAO: 'INTE026_HL - Dương Văn Tiến - IT phần mềm',
      NOI_DUNG_BAN_GIAO: '<p>web giga, bảo h&agrave;nh ecovacs</p>',
      LEADER: 'INTE001_HL',
    },
    {
      $id: '4',
      MA_SO_XIN_NGHI: 'NPHL2102010012',
      NGAY_LAM_DON: '2021-02-01T00:00:00',
      NGUOI_DE_NGHI: 'HieuNM',
      TEN_PHONG_BAN: 'IT phần mềm',
      LY_DO_XIN_NGHI: 'Testtttt ',
      THOI_GIAN_NGHI: '01/02/2021-Cả ngày;',
      TONG_SO_NGAY_NGHI: 1,
      GHI_CHU: 'test',
      TRUONG_PHONG_DUYET: 'ACCT007_HL',
      NGAY_TRUONG_PHONG_DUYET: '2021-02-01T00:00:00',
      TRUONG_PHONG_DA_DUYET: false,
      TRUONG_PHONG_HUY_DUYET: true,
      HO_VA_TEN: 'Nguyễn Minh Hiếu',
      TRUONG_NHOM: null,
      LOAI_NGHI_PHEP: 'Nghỉ thường',
      TONG_SO_NGAY_NGHI_TRONG_NAM: 3.5,
      TONG_SO_NGAY_NGHI_OM: 0,
      TONG_SO_NGAY_NGHI_HIEU_HY: 0,
      TONG_SO_NGAY_NGHI_THUONG: 3.5,
      NGUOI_BAN_GIAO: null,
      NOI_DUNG_BAN_GIAO: null,
      LEADER: 'INTE001_HL',
    },
    {
      $id: '5',
      MA_SO_XIN_NGHI: 'NPHL2401040001',
      NGAY_LAM_DON: '2024-01-04T00:00:00',
      NGUOI_DE_NGHI: 'HieuNM',
      TEN_PHONG_BAN: 'IT phần mềm',
      LY_DO_XIN_NGHI: 'Xin nghỉ vì lí do sức khỏe',
      THOI_GIAN_NGHI: '03/01/2024-Cả ngày;',
      TONG_SO_NGAY_NGHI: 1,
      GHI_CHU: null,
      TRUONG_PHONG_DUYET: 'ACCT007_HL',
      NGAY_TRUONG_PHONG_DUYET: '2024-01-06T00:00:00',
      TRUONG_PHONG_DA_DUYET: true,
      TRUONG_PHONG_HUY_DUYET: false,
      HO_VA_TEN: 'Nguyễn Minh Hiếu',
      TRUONG_NHOM: null,
      LOAI_NGHI_PHEP: 'Nghỉ thường',
      TONG_SO_NGAY_NGHI_TRONG_NAM: 1,
      TONG_SO_NGAY_NGHI_OM: 0,
      TONG_SO_NGAY_NGHI_HIEU_HY: 0,
      TONG_SO_NGAY_NGHI_THUONG: 1,
      NGUOI_BAN_GIAO: 'INTE026_HL - Dương Văn Tiến - IT phần mềm',
      NOI_DUNG_BAN_GIAO: '<p>web giga, giga account</p>',
      LEADER: 'INTE001_HL',
    },
  ];

  const [showList, setShowList] = useState<boolean>(false)




  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.flexContent}>
          <Text style={styles.textHeader}>Tổng số ngày nghỉ phép:</Text>
          <Text>&nbsp;&nbsp;</Text>
          <Text
            style={[styles.textHeader, {color: '#03347D', fontWeight: 'bold'}]}>
            1
          </Text>
        </View>
        <View>
          <ViewTask 
            nghiPhep={{
              listNghiPhep: listTakeLeave,
              listDemNghiPhep:[1]
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ListTakeLeave;

const ViewTask: React.FC<ViewTakeLeaveProps> = ({nghiPhep}) => {

  const navigation: any = useNavigation()

  const checkStatusIcon = (
    TRUONG_PHONG_DA_DUYET: boolean,
    TRUONG_PHONG_HUY_DUYET: boolean
  ) => {
    if (TRUONG_PHONG_DA_DUYET === true && TRUONG_PHONG_HUY_DUYET === false) {
      return <Icon name='checkmark-sharp' size={35} color={'#40A578'} />
    }
    if (TRUONG_PHONG_DA_DUYET === false && TRUONG_PHONG_HUY_DUYET === false) {
      return <Icon name='refresh-sharp' size={35} color={'#1679AB'} />
    }
    if (TRUONG_PHONG_HUY_DUYET !== false) {
      return <Icon name='close-sharp' size={35} color={'#FA7070'} />
    }
  }

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = ('0' + date.getDate()).slice(-2); // Thêm số 0 phía trước nếu cần và lấy hai ký tự cuối
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    <View style={[styles.container]}>
    <View style={styles.listWrapper}>
      <Text style={[styles.rowHeader, { width: widthScale(100) }]}>Ngày làm đơn</Text>
      <Text style={[styles.rowHeader, { width: widthScale(180) }]}>Loại nghỉ phép</Text>
      <Text style={[styles.rowHeader, { width: widthScale(80) }]}>Trạng thái</Text>
    </View>
    <FlatList
      data={nghiPhep.listNghiPhep}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.DETAIL_NGHI_PHEP.KEY, {item: item })} style={styles.listWrapper}>
          {/* <Text style={[styles.row, { width: widthScale(150) }]}>{moment(item.NGAY_LAM_DON).format('DD/MM/YYYY')}</Text> */}
          <Text style={[styles.row, { width: widthScale(100) }]}>{formatDate(item.NGAY_LAM_DON)}</Text>
          <Text style={[styles.row, { width: widthScale(180) }]}>{item.LOAI_NGHI_PHEP}</Text>
          <Text style={[styles.row, { width: widthScale(80) }]}>{checkStatusIcon(item.TRUONG_PHONG_DA_DUYET, item.TRUONG_PHONG_HUY_DUYET)}</Text>
        </TouchableOpacity>
      )}
    />
  </View> 
  )
}
