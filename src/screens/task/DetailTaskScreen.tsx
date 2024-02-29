import {
  Alert,
  Animated,
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
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

  const [isInputVisible, setIsInputVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));

  const toggleInput = () => {
    setIsInputVisible(!isInputVisible);
    Animated.timing(slideAnim, {
      toValue: isInputVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideStyle = {
    transform: [
      {
        translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 100],
        }),
      },
    ],
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <AppHeader title="Gặp khách hàng" showButtonBack={true}></AppHeader>
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={toggleInput}>
            <View style={styles.button}>
              <Animated.View style={slideStyle}>
                {isInputVisible && (
                  <TextInput style={styles.input} placeholder="Enter text" />
                )}
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 180,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});

export default DetailTaskScreen;
