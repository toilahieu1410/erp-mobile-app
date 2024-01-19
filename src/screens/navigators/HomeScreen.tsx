import {Alert, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {RootState, useAppDispatch} from '../../../store/store';
import {useSelector} from 'react-redux';
import {logout} from '../../slice/Auth';
import {showMessage} from 'react-native-flash-message';
import {BaseResponse} from '../../models/BaseResponse';
const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const LogoutScreen = () => {
    dispatch(logout())
      .unwrap()
      .then(res => {
        showMessage({
          type: 'success',
          position: 'top',
          message: 'Đăng xuất thành công',
        });
      })
      .catch((err: BaseResponse) => {
        Alert.alert('Thất bại', err.message);
      });
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button onPress={() => LogoutScreen()}>
        <Text className="text-red-600">Logout</Text>
      </Button>
    </View>
  );
};

export default HomeScreen;
