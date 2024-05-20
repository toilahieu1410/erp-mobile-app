import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../../../assets/css/ConfirmScreen/_listConfirm';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {widthScale} from '../../../screens/size';
import ItemConfirm from './ItemDetailConfirm';
import {SCREENS} from '../../../constants/screens'

interface XacNhan {
  $id: string;
  MA_SO_XAC_NHAN: string;
  NGUOI_DE_NGHI: string;
  HO_VA_TEN: string;
  NOI_DUNG_CAN_XAC_NHAN: string;
  NGAY_CAN_XAC_NHAN: string;
  TEN_PHONG_BAN: string;
  NGAY_LAM_DON: string;
  LY_DO_HUY: null | string;
  TRUONG_PHONG_DUYET: string | null;
  NGAY_TRUONG_PHONG_DUYET: string | null;
  TRUONG_PHONG_DA_DUYET: boolean;
  TRUONG_PHONG_HUY_DUYET: boolean;
  TRUC_THUOC: string;
  LOAI_XAC_NHAN: null | string;
  THOI_GIAN_TU: null | string;
  THOI_GIAN_DEN: null | string;
  LEADER: string;
}

interface ViewConfirmProps {
  xacNhan: {
    listXacNhan: XacNhan[];
    listDemXacNhan: number[];
  };
}

interface DanhSachXacNhanProps {
  navigation: any;
}

const ListConfirm: React.FC<DanhSachXacNhanProps> = ({navigation}) => {
  const fakeListItem: XacNhan[] = [
    {
      $id: '1',
      MA_SO_XAC_NHAN: 'XNHL2403270001',
      NGAY_LAM_DON: '2024-03-27T00:00:00',
      NGUOI_DE_NGHI: 'HieuNM',
      HO_VA_TEN: 'Nguyễn Minh Hiếu',
      NOI_DUNG_CAN_XAC_NHAN:
        'Xác nhận ngày 27/03/2024 máy chấm công bị sai thời gian và chục chặc thông tin',
      NGAY_CAN_XAC_NHAN: '27/03/2024',
      LY_DO_HUY: null,
      TRUONG_PHONG_DUYET: null,
      NGAY_TRUONG_PHONG_DUYET: null,
      TRUONG_PHONG_DA_DUYET: false,
      TRUONG_PHONG_HUY_DUYET: false,
      TRUC_THUOC: 'HOPLONG',
      LOAI_XAC_NHAN: 'Quên chấm công / Không thể chấm công',
      THOI_GIAN_TU: null,
      THOI_GIAN_DEN: null,
      LEADER: 'INTE001_HL',
      TEN_PHONG_BAN: 'IT phần mềm',
    },
    {
      $id: '2',
      MA_SO_XAC_NHAN: 'XNHL2403190009',
      NGAY_LAM_DON: '2024-03-19T00:00:00',
      NGUOI_DE_NGHI: 'HieuNM',
      HO_VA_TEN: 'Nguyễn Minh Hiếu',
      NOI_DUNG_CAN_XAC_NHAN: 'xin phép về sớm từ 15h00 để đi khám sức khỏe',
      NGAY_CAN_XAC_NHAN: '19/03/2024',
      LY_DO_HUY: null,
      TRUONG_PHONG_DUYET: null,
      NGAY_TRUONG_PHONG_DUYET: null,
      TRUONG_PHONG_DA_DUYET: false,
      TRUONG_PHONG_HUY_DUYET: false,
      TRUC_THUOC: 'HOPLONG',
      LOAI_XAC_NHAN: 'Đi muộn, về sớm',
      THOI_GIAN_TU: null,
      THOI_GIAN_DEN: null,
      LEADER: 'INTE001_HL',
      TEN_PHONG_BAN: 'IT phần mềm',
    },
    {
      $id: '3',
      MA_SO_XAC_NHAN: 'XNHL2403070002',
      NGAY_LAM_DON: '2024-03-07T00:00:00',
      NGUOI_DE_NGHI: 'HieuNM',
      HO_VA_TEN: 'Nguyễn Minh Hiếu',
      NOI_DUNG_CAN_XAC_NHAN:
        'Xác nhận sáng ngày 07/03 máy chấm công bị reset sai lệch thời gian, nên ko chấm công được buổi sáng',
      NGAY_CAN_XAC_NHAN: '07/03/2024',
      LY_DO_HUY: null,
      TRUONG_PHONG_DUYET: null,
      NGAY_TRUONG_PHONG_DUYET: null,
      TRUONG_PHONG_DA_DUYET: false,
      TRUONG_PHONG_HUY_DUYET: false,
      TRUC_THUOC: 'HOPLONG',
      LOAI_XAC_NHAN: 'Quên chấm công / Không thể chấm công',
      THOI_GIAN_TU: null,
      THOI_GIAN_DEN: null,
      LEADER: 'INTE001_HL',
      TEN_PHONG_BAN: 'IT phần mềm',
    },
    {
      $id: '4',
      MA_SO_XAC_NHAN: 'XNHL2310220001',
      NGAY_LAM_DON: '2023-10-22T00:00:00',
      NGUOI_DE_NGHI: 'HieuNM',
      HO_VA_TEN: 'Nguyễn Minh Hiếu',
      NOI_DUNG_CAN_XAC_NHAN: 'Xác nhận tăng ca chủ Nhật code web x21 KingSmith',
      NGAY_CAN_XAC_NHAN: '22/10/2023',
      LY_DO_HUY: null,
      TRUONG_PHONG_DUYET: null,
      NGAY_TRUONG_PHONG_DUYET: null,
      TRUONG_PHONG_DA_DUYET: false,
      TRUONG_PHONG_HUY_DUYET: false,
      TRUC_THUOC: 'HOPLONG',
      LOAI_XAC_NHAN: 'Tăng ca/ OT',
      THOI_GIAN_TU: '2023-10-22T08:00:00',
      THOI_GIAN_DEN: '2023-10-22T18:00:00',
      LEADER: 'INTE001_HL',
      TEN_PHONG_BAN: 'IT phần mềm',
    },
    {
      $id: '5',
      MA_SO_XAC_NHAN: 'XNHL2403010001',
      NGAY_LAM_DON: '2024-03-01T00:00:00',
      NGUOI_DE_NGHI: 'HieuNM',
      HO_VA_TEN: 'Nguyễn Minh Hiếu',
      NOI_DUNG_CAN_XAC_NHAN:
        'Xác nhận không chấm công được ngày 01/03/2024 do máy chấm công hỏng',
      NGAY_CAN_XAC_NHAN: '01/03/2024',
      LY_DO_HUY: null,
      TRUONG_PHONG_DUYET: null,
      NGAY_TRUONG_PHONG_DUYET: null,
      TRUONG_PHONG_DA_DUYET: false,
      TRUONG_PHONG_HUY_DUYET: false,
      TRUC_THUOC: 'HOPLONG',
      LOAI_XAC_NHAN: 'Quên chấm công / Không thể chấm công',
      THOI_GIAN_TU: null,
      THOI_GIAN_DEN: null,
      LEADER: 'INTE001_HL',
      TEN_PHONG_BAN: 'IT phần mềm',
    },
  ];

  const [showList, setShowList] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.flexContent}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textHeader}>Tổng số đơn xác nhận:</Text>
            <Text>&nbsp;&nbsp;</Text>
            <Text
              style={[
                styles.textHeader,
                {color: '#03347D', fontWeight: 'bold'},
              ]}>
              {fakeListItem.length}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => setShowList(!showList)}>
              {showList ? (
                <Icon name="list-outline" size={20} color={'#2179A9'} />
              ) : (
                <Icon name="grid-outline" size={20} color={'#2179A9'} />
              )}
            </TouchableOpacity>
          </View>
        </View>

          <ScrollView horizontal={true}>
            <ViewTask
              xacNhan={{
                listXacNhan: fakeListItem,
                listDemXacNhan: [fakeListItem.length],
              }}
            />
          </ScrollView>

      </ScrollView>
    </View>
  );
};
export default ListConfirm;

const ViewTask: React.FC<ViewConfirmProps> = ({xacNhan}) => {

  const navigation: any = useNavigation()

    const checkStatusIcon = (
    TRUONG_PHONG_DA_DUYET: boolean,
    TRUONG_PHONG_HUY_DUYET: boolean,
  ) => {
    if (TRUONG_PHONG_DA_DUYET === true && TRUONG_PHONG_HUY_DUYET === false) {
      return <Icon name="checkmark-sharp" size={35} color={'#40A578'} />;
    }
    if (TRUONG_PHONG_DA_DUYET === false && TRUONG_PHONG_HUY_DUYET === false) {
      return <Icon name="refresh-sharp" size={35} color={'#1679AB'} />;
    }
    if (TRUONG_PHONG_HUY_DUYET !== false) {
      return <Icon name="close-sharp" size={35} color={'#FA7070'} />;
    }
  }
  
  return (
    <View style={[styles.container]}>
      <View style={styles.listWrapper}>
        <Text style={[styles.rowHeader, { width: widthScale(100) }]}>Ngày xác nhận</Text>
        <Text style={[styles.rowHeader, { width: widthScale(180) }]}>Loại xác nhận</Text>
        <Text style={[styles.rowHeader, { width: widthScale(80) }]}>Trạng thái</Text>
      </View>
      <FlatList

        data={xacNhan.listXacNhan}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate(SCREENS.DETAIL_XAC_NHAN.KEY, {item: item })} style={styles.listWrapper}>
            {/* <Text style={[styles.row, { width: widthScale(150) }]}>{moment(item.NGAY_LAM_DON).format('DD/MM/YYYY')}</Text> */}
            <Text style={[styles.row, { width: widthScale(100) }]}>{(item.NGAY_CAN_XAC_NHAN) }</Text>
            <Text style={[styles.row, { width: widthScale(180) }]}>{item.LOAI_XAC_NHAN}</Text>
            <Text style={[styles.row, { width: widthScale(80) }]}>{checkStatusIcon(item.TRUONG_PHONG_DA_DUYET, item.TRUONG_PHONG_HUY_DUYET)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
