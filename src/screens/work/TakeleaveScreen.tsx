import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import AppHeader from '../../components/navigators/AppHeader';
import {styles} from '../../assets/css/ConfirmScreen/style';
import ButtonChange from '../../components/navigators/buttonChange';
import CreateTakeLeave from '../../components/work/leave/CreateTakeLeave';
import ListTakeLeave from '../../components/work/leave/ListTakeLeave';

const TakeLeaveScreen = () => {
  const [page, setPage] = useState('taoDonNghiPhep');
  const [buttonCreate, setButtonCreate] = useState(false);
  const [buttonList, setButtonList] = useState(true);

  return (
    <SafeAreaView>
      <AppHeader title="Xin nghỉ phép" showButtonBack={true} />
      <View style={styles.flexTitle}>
        <ButtonChange
          disable={buttonCreate}
          onPress={() => {
            setPage('taoDonNghiPhep');
            setButtonList(true);
            setButtonCreate(false);
          }}
          title="Tạo đơn"
        />
        <ButtonChange
          disable={buttonList}
          onPress={() => {
            setPage('danhSachNghiPhep');
            setButtonList(false);
            setButtonCreate(true);
          }}
          title="Danh sách"
        />
      </View>
      <View>
        {page === 'taoDonNghiPhep' && (
          <CreateTakeLeave 
            onPress={() => {
              setPage('danhSachNghiPhep')
              setButtonList(!buttonList)
              setButtonCreate(!buttonCreate)
            }}
          />
        )}
        {page === 'danhSachNghiPhep' && (
          <ScrollView>
            <ListTakeLeave navigation/>
          </ScrollView>
        )}
        </View>
    </SafeAreaView>
  );
};

export default TakeLeaveScreen;
