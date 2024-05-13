import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from '../../assets/css/ConfirmScreen/listConfirm';
import moment from 'moment';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { widthScale } from '../../screens/size';

interface XacNhan {
  $id: string;
  MA_SO_XAC_NHAN: string;
  NGUOI_DE_NGHI: string;
  HO_VA_TEN: string;
  NOI_DUNG_CAN_XAC_NHAN: string;
  NGAY_CAN_XAC_NHAN: string;
  NGAY_LAM_DON: string;
  LY_DO_HUY: null | string;
  TRUONG_PHONG_DUYET: string;
  NGAY_TRUONG_PHONG_DUYET: string;
  TRUONG_PHONG_DA_DUYET: boolean;
  TRUONG_PHONG_HUY_DUYET: boolean;
  TRUC_THUOC: string;
  LOAI_XAC_NHAN: null | string;
  THOI_GIAN_TU: null | string;
  THOI_GIAN_DEN: null | string;
  HIEU: null | string;
}

interface ReduxState {
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
      MA_SO_XAC_NHAN: 'XNHL2306010001',
      NGUOI_DE_NGHI: 'HieuNM',
      HO_VA_TEN: 'Nguyễn Minh Hiếu',
      NOI_DUNG_CAN_XAC_NHAN: 'xác nhận chuyển tháo lắp máy (17h15 - 19h00)',
      NGAY_CAN_XAC_NHAN: '31/05/2023',
      NGAY_LAM_DON: '2023-06-01T00:00:00',
      LY_DO_HUY: null,
      TRUONG_PHONG_DUYET: 'ACCT007_HL',
      NGAY_TRUONG_PHONG_DUYET: '2023-06-05T00:00:00',
      TRUONG_PHONG_DA_DUYET: true,
      TRUONG_PHONG_HUY_DUYET: false,
      TRUC_THUOC: 'HOPLONG',
      LOAI_XAC_NHAN: null,
      THOI_GIAN_TU: null,
      THOI_GIAN_DEN: null,
      HIEU: null,
    },
    {
      $id: '2',
      MA_SO_XAC_NHAN: 'XNHL2305040016',
      NGUOI_DE_NGHI: 'HieuNM',
      HO_VA_TEN: 'Nguyễn Minh Hiếu',
      NOI_DUNG_CAN_XAC_NHAN: 'xác nhận quên chấm công ngày 18/04/2023',
      NGAY_CAN_XAC_NHAN: '18/04/2023',
      NGAY_LAM_DON: '2023-05-04T00:00:00',
      LY_DO_HUY: null,
      TRUONG_PHONG_DUYET: 'ACCT007_HL',
      NGAY_TRUONG_PHONG_DUYET: '2023-05-04T00:00:00',
      TRUONG_PHONG_DA_DUYET: true,
      TRUONG_PHONG_HUY_DUYET: false,
      TRUC_THUOC: 'HOPLONG',
      LOAI_XAC_NHAN: null,
      THOI_GIAN_TU: null,
      THOI_GIAN_DEN: null,
      HIEU: null,
    },
    {
      $id: '3',
      MA_SO_XAC_NHAN: 'XNHL2305040020',
      NGUOI_DE_NGHI: 'HieuNM',
      HO_VA_TEN: 'Nguyễn Minh Hiếu',
      NOI_DUNG_CAN_XAC_NHAN: 'xác nhận quên chấm công ngày 20/04/2023',
      NGAY_CAN_XAC_NHAN: '20/04/2023',
      NGAY_LAM_DON: '2023-05-04T00:00:00',
      LY_DO_HUY: null,
      TRUONG_PHONG_DUYET: 'ACCT007_HL',
      NGAY_TRUONG_PHONG_DUYET: '2023-05-04T00:00:00',
      TRUONG_PHONG_DA_DUYET: true,
      TRUONG_PHONG_HUY_DUYET: false,
      TRUC_THUOC: 'HOPLONG',
      LOAI_XAC_NHAN: null,
      THOI_GIAN_TU: null,
      THOI_GIAN_DEN: null,
      HIEU: null,
    },
    {
      $id: '4',
      MA_SO_XAC_NHAN: 'XNHL2304050009',
      NGUOI_DE_NGHI: 'HieuNM',
      HO_VA_TEN: 'Nguyễn Minh Hiếu',
      NOI_DUNG_CAN_XAC_NHAN: 'Xác nhận quên chấm công ngày 03/03/2023',
      NGAY_CAN_XAC_NHAN: '03/03/2023',
      NGAY_LAM_DON: '2023-04-05T00:00:00',
      LY_DO_HUY: null,
      TRUONG_PHONG_DUYET: 'ACCT007_HL',
      NGAY_TRUONG_PHONG_DUYET: '2023-04-05T00:00:00',
      TRUONG_PHONG_DA_DUYET: true,
      TRUONG_PHONG_HUY_DUYET: false,
      TRUC_THUOC: 'HOPLONG',
      LOAI_XAC_NHAN: null,
      THOI_GIAN_TU: null,
      THOI_GIAN_DEN: null,
      HIEU: null,
    },
    {
      $id: '5',
      MA_SO_XAC_NHAN: 'XNHL2303060033',
      NGUOI_DE_NGHI: 'HieuNM',
      HO_VA_TEN: 'Nguyễn Minh Hiếu',
      NOI_DUNG_CAN_XAC_NHAN: 'xác nhận quên chấm công ngày 06/02',
      NGAY_CAN_XAC_NHAN: '06/02/2023',
      NGAY_LAM_DON: '2023-03-06T00:00:00',
      LY_DO_HUY: null,
      TRUONG_PHONG_DUYET: 'ACCT007_HL',
      NGAY_TRUONG_PHONG_DUYET: '2023-03-06T00:00:00',
      TRUONG_PHONG_DA_DUYET: true,
      TRUONG_PHONG_HUY_DUYET: false,
      TRUC_THUOC: 'HOPLONG',
      LOAI_XAC_NHAN: null,
      THOI_GIAN_TU: null,
      THOI_GIAN_DEN: null,
      HIEU: null,
    },
  ];
  const [showList, setShowList] = useState<boolean>(false)

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.flexContent}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textHeader}>Tổng số đơn xác nhận:</Text>
          <Text>&nbsp;&nbsp;</Text>
          <Text
            style={[styles.textHeader, {color: '#03347D', fontWeight: 'bold'}]}>
            {2}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => setShowList(!showList)}
          >
            {showList ? (
                  <Icon name='list-outline' size={20} color={'#2179A9'}/>
           
            ) : (
              <Icon name='grid-outline' size={20} color={'#2179A9'}/>
            )}
          </TouchableOpacity>
        </View>
      </View>
  
     

      {showList ? (
           
null
          ) : (
            <ScrollView horizontal={true} >
            <ViewTable listXacNhan={fakeListItem} />
          </ScrollView>
            // <ViewTask listXacNhan={fakeListItem}/>
          )}
      </ScrollView>
    </View>
  );
};
export default ListConfirm;

const ViewTable = ({ listXacNhan }) => {
  return (
    <View >
      <View style={[styles.container]}>
        <View style={styles.listWrapper}>
          <Text style={[styles.rowHeader, { width: widthScale(150) }]}>Ngày</Text>
          <Text style={[styles.rowHeader, { width: widthScale(150) }]}>Ngày xác nhận</Text>
          <Text style={[styles.rowHeader, { width: widthScale(500) }]}>Nội dung</Text>
        </View>
        <FlatList
          // initialNumToRender={6}
          data={listXacNhan}
          renderItem={({ item, index }) => (
            <View style={styles.listWrapper}>
              <Text style={[styles.row, { width: widthScale(150) }]}>{moment(item.NGAY_LAM_DON).format('DD/MM/YYYY')}</Text>
              <Text style={[styles.row, { width: widthScale(150) }]}>{item.NGAY_CAN_XAC_NHAN}</Text>
              <Text style={[styles.row, { width: widthScale(500) }]}>{item.NOI_DUNG_CAN_XAC_NHAN}</Text>
            </View>
          )}
        />
      </View>
    </View>


  )
}
