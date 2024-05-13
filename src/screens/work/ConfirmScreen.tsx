import React, {useEffect, useState} from 'react';
import {Text, View, SafeAreaView, ScrollView} from 'react-native';
import AppHeader from '../../components/navigators/AppHeader';
import {styles} from '../../assets/css/ConfirmScreen/style';
import ButtonChange from '../../components/navigators/buttonChange';
import CreateConfirm from '../../components/work/CreateConfirm';
import ListConfirm from '../../components/work/ListConfirm';

interface CreateConfirmProps {
  onPress: () => void;
}

const ConfirmScreen= () => {
  const [page, setPage] = useState('taoDonXacNhan');
  const [buttonCreate, setButtonCreate] = useState(false);
  const [buttonList, setButtonList] = useState(true);

  return (
    <SafeAreaView>
      <AppHeader title="Xin xác nhận" showButtonBack={true} />
      <View style={styles.flexTitle}>
        <ButtonChange
          disable={buttonCreate}
          onPress={() => {
            setPage('taoDonXacNhan');
            setButtonList(true);
            setButtonCreate(false);
          }}
          title={'Tạo đơn'}
        />
        <ButtonChange
          disable={buttonList}
          onPress={() => {
            setPage('danhSachXacNhan');
            setButtonList(false);
            setButtonCreate(true);
          }}
          title={'Danh sách'}
        />
      </View>

      <View>
        {page === 'taoDonXacNhan' && (
          <CreateConfirm
            onPress={() => {
              setPage('danhSachXacNhan');
              setButtonList(!buttonList);
              setButtonCreate(!buttonCreate);
            }}
          />
        )}
        {page === 'danhSachXacNhan' && (
          <ScrollView>
            <ListConfirm navigation />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ConfirmScreen;
