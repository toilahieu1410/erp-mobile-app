import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import ModalPage from '../../components/app/modal/ModalPage';
import AppHeader from '../../components/navigators/AppHeader';

type RootStackParamList = {
  DetailTask: {id: string};
};

type DetailTaskScreenProps = {
  route: RouteProp<RootStackParamList, 'DetailTask'>;
};
const DetailTaskScreen: React.FC<DetailTaskScreenProps> = ({
  route,
}: DetailTaskScreenProps) => {
  const {id} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={{flex: 1}}>
      <AppHeader title="Gặp khách hàng" showButtonBack={true}></AppHeader>
      <View>
        <Pressable onPress={() => setModalVisible(true)}>
          <Text>Show Modal</Text>
        </Pressable>
        <ModalPage
          showModal={modalVisible}
          onVisibleModal={value => {
            setModalVisible(value);
          }}>
          <View>
            <Text>test</Text>
          </View>
        </ModalPage>
      </View>
    </SafeAreaView>
  );
};

export default DetailTaskScreen;
