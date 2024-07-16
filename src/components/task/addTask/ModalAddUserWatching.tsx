import {
  Animated,
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Watching} from '../../../models/Task';
import {IMAGES} from '../../../constants/screens';
import {Icon, TouchableRipple} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import ShowUserWatching from './AddWatching/ShowUserWatching';
import SearchWatching from './AddWatching/SearchWatching';

type ModalAddUserWatchingProps = {
  data?: Watching[];
  onChangeData?: (value: Watching[]) => void;
};

const ModalAddUserWatching = ({
  data = [],
  onChangeData,
}: ModalAddUserWatchingProps) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const [showInputSearch, setShowInputSearch] = useState<Boolean>(false);
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [watchings, setWatchings] = useState<Watching[]>([]);

  const toggleInput = () => {
    setShowInputSearch(x => {
      return !showInputSearch;
    });

    Animated.timing(slideAnimation, {
      toValue: showInputSearch ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const showInputAnimation = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0], // Giá trị ban đầu là -300, giá trị cuối cùng là 0
  });

  useEffect(() => {
    setWatchings(data);
  }, [showModal]);
  return (
    <View>
      <View className="border-y border-y-gray-400 mb-4">
        <TouchableRipple
          onPress={() => {
            setShowModal(true);
          }}>
          <View>
            <View className="flex flex-row justify-between items-center p-2">
              <View>
                <Text className=" text-gray-500">
                  Người theo dõi: 
                </Text>
                <View>
                  {data.map((item, index) => (
                    <View
                      className="p-1 flex flex-row justify-start items-center"
                      key={index}>
                      <Image
                        source={{uri: item.avatar}}
                        style={{width: 30, height: 30, borderRadius: 30}}
                      />
                      <Text className="px-1 text-black text-base">
                        {item.fullName}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              <View>
                <Icon size={25} source={'chevron-right'} />
              </View>
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
                  source={IMAGES.SEARCH}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  setShowModal(x => {
                    return false;
                  });
                  if (onChangeData) {
                    onChangeData(watchings);
                  }
                }}
                className="p-2">
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
                <SearchWatching
                  onHide={value => {
                    toggleInput();
                  }}
                />
              )}
            </Animated.View>
            <ScrollView>
              <View className="z-0 flex-1">
                {watchings.map((item, index) => (
                  <ShowUserWatching
                    data={item}
                    key={index}
                    onClose={() => {
                      setWatchings(w => {
                        const newData = [...watchings];
                        newData.splice(index, 1);
                        return newData;
                      });
                    }}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalAddUserWatching;
