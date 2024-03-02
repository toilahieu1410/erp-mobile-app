import {
  Button,
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Icon, TouchableRipple} from 'react-native-paper';
import SelectDocument from '../../app/FileManager/SelectDocument';
import SelectMultiDocument from '../../app/FileManager/SelectMultiDocument';
import TakePhotoFormCamera from '../../app/FileManager/TakePhotoFormCamera';
import SelectMultiPhoto from '../../app/FileManager/SelectMultiPhoto';
import {Attachment} from '../../../models/Task';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import {Document} from 'react-native-render-html';

const AddFileTask = () => {
  const [documentFile, setDocumentFile] = useState<Attachment[]>([]);

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
            <View className="py-2">
              <TakePhotoFormCamera
                mediaType="mixed"
                onSelect={value => {
                  console.log(value);
                }}>
                <Text className="text-white bg-blue-400 p-2 text-center font-bold uppercase">
                  Chụp từ máy ảnh
                </Text>
              </TakePhotoFormCamera>
            </View>
            <View className="py-2">
              <SelectMultiPhoto
                mediaType="mixed"
                onSelect={value => {
                  const updatedDocumentFile = [...documentFile];

                  // Lặp qua từng tệp được chọn và thêm chúng vào mảng updatedDocumentFile
                  for (let index = 0; index < value.length; index++) {
                    const element = {
                      uri: value[index].uri,
                      size: value[index].fileSize,
                      fileType: value[index].type,
                      fileName: value[index].fileName,
                    };

                    updatedDocumentFile.push(element);
                  }

                  // Cập nhật state documentFile với mảng updatedDocumentFile
                  setDocumentFile(updatedDocumentFile);
                }}>
                <Text className="text-white bg-blue-400 p-2 text-center font-bold uppercase">
                  Chọn từ thư viện
                </Text>
              </SelectMultiPhoto>
            </View>
            <View className="py-2">
              <SelectMultiDocument
                onSelect={value => {
                  console.log(value);
                }}>
                <Text className="text-white bg-blue-400 p-2 text-center font-bold">
                  CHỌN TỪ KHO QUẢN LÝ FILE
                </Text>
              </SelectMultiDocument>
            </View>
            <View className="mt-4 flex flex-row flex-wrap">
              {documentFile.map((item, index) => (
                <View
                  className={`w-1/2 relative pb-2 pl-2 ${
                    index % 2 != 0 && 'pr-2'
                  }`}>
                  {item.fileType.includes('image') && (
                    <Image
                      source={{uri: item.uri}}
                      style={{width: '100%', height: 150}}
                    />
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddFileTask;
