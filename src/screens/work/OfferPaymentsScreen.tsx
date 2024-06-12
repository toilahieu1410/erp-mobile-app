import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import AppHeader from '../../components/navigators/AppHeader';
import {styles} from '../../assets/css/ListWorksScreen/style';
import ButtonChange from '../../components/navigators/buttonChange';
import CreateTakeLeave from '../../components/work/leave/CreateTakeLeave';
import ListTakeLeave from '../../components/work/leave/ListTakeLeave';
import CreateOfferPayments from '../../components/work/offer/CreateOfferPayments';
import ListOfferPayments from '../../components/work/offer/ListOfferPayments';

const OfferPaymentsScreen = () => {
  const [page, setPage] = useState('taoDeNghiThanhToanThuong');
  const [buttonCreate, setButtonCreate] = useState(false);
  const [buttonList, setButtonList] = useState(true);

  return (
    <SafeAreaView>
      <AppHeader title="Tạo đề nghị thanh toán thường" showButtonBack={true} />
      <View style={styles.flexTitle}>
        <ButtonChange
          disable={buttonCreate}
          onPress={() => {
            setPage('taoDeNghiThanhToanThuong');
            setButtonList(true);
            setButtonCreate(false);
          }}
          title="Tạo đơn"
        />
        <ButtonChange
          disable={buttonList}
          onPress={() => {
            setPage('danhSachDeNghiThanhToanThuong');
            setButtonList(false);
            setButtonCreate(true);
          }}
          title="Danh sách"
        />
      </View>
      <View>
        {page === 'taoDeNghiThanhToanThuong' && (
          <CreateOfferPayments 
            onPress={() => {
              setPage('danhSachDeNghiThanhToanThuong')
              setButtonList(!buttonList)
              setButtonCreate(!buttonCreate)
            }}
          />
        )}
        {page === 'danhSachDeNghiThanhToanThuong' && (
          <ScrollView>
            <ListOfferPayments />
          </ScrollView>
        )}
        </View>
    </SafeAreaView>
  );
};

export default OfferPaymentsScreen;
