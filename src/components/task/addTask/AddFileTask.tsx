import {Button, Modal, Pressable, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Icon, TouchableRipple} from 'react-native-paper';

const AddFileTask = () => {
  const [showModal, setShowModal] = useState<Boolean>(false);
  return (
    <View>
      <View className="border-y border-y-gray-400 mb-4">
        <TouchableRipple
          onPress={() => {
            setShowModal(true);
          }}>
          <View className="flex flex-row justify-between items-center p-2">
            <View>
              <Text className="w-full text-gray-500">Tệp tài liệu</Text>
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
              <Pressable onPress={() => setShowModal(false)} className="p-2">
                <Text className="text-white font-bold text-base">Xong</Text>
              </Pressable>
            </View>
          </View>
          <View className="flex-1 bg-white h-full relative">
            <Button onPress={() => {}} title="Chụp từ máy ảnh" />
            <Button onPress={() => {}} title="Chọn từ thư viện" />
            <Button onPress={() => {}} title="Chọn từ kho quản lý file" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddFileTask;
