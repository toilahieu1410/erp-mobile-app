import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type ModalPageProps = {
  showModal?: boolean | false;
  onVisibleModal?: (showModal: boolean) => void;
  children?: React.ReactNode;
};

const ModalPage = ({showModal, onVisibleModal, children}: ModalPageProps) => {
  return (
    <View>
      <Modal
        style={{width: '100%', height: '100%'}}
        animationType="slide"
        visible={showModal}
        presentationStyle="pageSheet"
        onRequestClose={() => {
          if (onVisibleModal) {
            onVisibleModal(false);
          }
        }}>
        <View className="w-full h-full">
          <View className="flex justify-start items-center flex-row h-10 w-full bg-primary z-30">
            <Pressable
              className="p-2"
              onPress={() => {
                if (onVisibleModal) {
                  onVisibleModal(false);
                }
              }}>
              <Text className="text-white font-bold">Ẩn</Text>
            </Pressable>
          </View>
          <View className="flex-1 bg-white h-full">{children}</View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalPage;

const styles = StyleSheet.create({});
