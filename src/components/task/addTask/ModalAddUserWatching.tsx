import {
  Animated,
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Watching} from '../../../models/Task';
import {IMAGES} from '../../../../constants/images';
import {Icon, TouchableRipple} from 'react-native-paper';
type ModalAddUserWatchingProps = {
  data?: Watching[] | [];
  onChangeData?: Watching[] | [];
};

const ModalAddUserWatching = ({
  data,
  onChangeData,
}: ModalAddUserWatchingProps) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const [showInputSearch, setShowInputSearch] = useState<Boolean>(false);
  const [showModal, setShowModal] = useState<Boolean>(false);
  const toggleInput = () => {
    setShowInputSearch(!showInputSearch);
    Animated.timing(slideAnimation, {
      toValue: showInputSearch ? 0 : 1,
      duration: 500, // Độ dài của animation (200s trong ví dụ này)
      useNativeDriver: true, // Sử dụng native driver để tối ưu hóa hiệu suất
    }).start();
  };

  const showInputAnimation = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0], // Giá trị ban đầu là -300, giá trị cuối cùng là 0
  });
  return (
    <View>
      <View className="border-y border-y-gray-400  mb-4">
        <TouchableRipple
          onPress={() => {
            setShowModal(true);
          }}>
          <View className="flex flex-row justify-between items-center p-2">
            <View>
              <Text className="w-full text-gray-500">Người theo dõi</Text>
            </View>
            <View>
              <Icon size={25} source={'chevron-right'} />
            </View>
          </View>
        </TouchableRipple>
      </View>
      <Modal
        style={{width: '100%', height: '100%', backgroundColor: 'red'}}
        animationType="slide"
        visible={showModal}
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <View className="w-full h-full">
          <View className="flex justify-start items-center flex-row h-10 w-full bg-primary z-30">
            <Pressable
              className="p-2"
              onPress={() => {
                setShowModal(false);
              }}>
              <Text className="text-white font-bold text-base">Ẩn</Text>
            </Pressable>
            <View className="flex-1 flex-row justify-end items-center">
              <Pressable onPress={toggleInput} className="p-2">
                <Image
                  style={{width: 20, height: 20, tintColor: 'white'}}
                  source={IMAGES.SEARCH}></Image>
              </Pressable>
              <Pressable onPress={toggleInput} className="p-2">
                <Text className="text-white font-bold text-base">Xong</Text>
              </Pressable>
            </View>
          </View>
          <View className="flex-1 bg-white h-full relative">
            <Animated.View
              className="absolute top-0 w-full bg-primary z-10"
              style={{
                transform: [{translateY: showInputAnimation}],
              }}>
              {showInputSearch && (
                <View className="flex flex-row justify-between items-center p-2">
                  <TextInput className="bg-white flex-1 text-xs p-1 rounded-lg"></TextInput>
                  <TouchableRipple
                    rippleColor="transparent"
                    onPress={() => {
                      toggleInput();
                    }}>
                    <Text className="text-white font-bold px-2 text-base">
                      Hủy
                    </Text>
                  </TouchableRipple>
                </View>
              )}
            </Animated.View>
            <View className="z-0">
              <Text>Test</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalAddUserWatching;
