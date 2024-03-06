import {Image, Modal, Pressable, ScrollView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon, TouchableRipple} from 'react-native-paper';
import SelectMultiDocument from '../../app/FileManager/SelectMultiDocument';
import TakePhotoFormCamera from '../../app/FileManager/TakePhotoFormCamera';
import SelectMultiPhoto from '../../app/FileManager/SelectMultiPhoto';
import {Attachment} from '../../../models/Task';
import ThumbnailFileComponent from '../../app/FileManager/ThumbnailFileComponent';
type AttachmentProps = {
  data?: Attachment[] | [];
  onChangeValue?: (value: Attachment[]) => void;
};

const AttachmentTaskComponent = ({
  data = [],
  onChangeValue,
}: AttachmentProps) => {
  const [documentFile, setDocumentFile] = useState<Attachment[]>([]);
  const [showModal, setShowModal] = useState<Boolean>(false);
  useEffect(() => {
    setDocumentFile(data);
  }, [showModal]);

  return (
    <View>
      <View className="border-y border-y-gray-400 mb-4">
        <TouchableRipple
          onPress={() => {
            setShowModal(true);
          }}>
          <View className="flex flex-row justify-between items-center p-2">
            <View className="flex-1">
              <Text className="w-full text-gray-500 mb-2">Tệp tài liệu</Text>
              <View className="flex flex-col justify-start">
                {data.map((item, index) => (
                  <View
                    key={index}
                    className="flex flex-row flex-nowrap justify-start items-center">
                    <View style={{width: 50, height: 50}}>
                      <ThumbnailFileComponent
                        url={item.uri}
                        type={item.fileType}
                      />
                    </View>
                    <View className="flex-1">
                      <Text numberOfLines={1}>{item.fileName}</Text>
                    </View>
                  </View>
                ))}
              </View>
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
        <View className="w-full flex-1 h-full">
          <View className="flex justify-start items-center flex-row h-10 w-full bg-primary z-30">
            <Pressable
              className="p-2"
              onPress={() => {
                setShowModal(false);
              }}>
              <Text className="text-white font-bold text-base">Ẩn</Text>
            </Pressable>
            <View className="flex-1 flex-row justify-end items-center">
              <Pressable
                onPress={() => {
                  if (onChangeValue) {
                    onChangeValue(documentFile);
                  }
                  setShowModal(x => {
                    return false;
                  });
                }}
                className="p-2">
                <Text className="text-white font-bold text-base">Xong</Text>
              </Pressable>
            </View>
          </View>
          <View className="flex-1 bg-white h-full relative">
            <View className="py-2">
              <TakePhotoFormCamera
                mediaType="mixed"
                onSelect={value => {
                  if (value != null && value != undefined) {
                    const updatedDocumentFile = [...documentFile];
                    // Lặp qua từng tệp được chọn và thêm chúng vào mảng updatedDocumentFile
                    const element = {
                      uri: value.uri,
                      size: value.fileSize,
                      fileType: value.type,
                      fileName: value.fileName,
                      choice: false,
                    };
                    updatedDocumentFile.push(element);
                    // Cập nhật state documentFile với mảng updatedDocumentFile
                    setDocumentFile(updatedDocumentFile);
                  }
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
                  if (value != null && value != undefined) {
                    const updatedDocumentFile = [...documentFile];
                    // Lặp qua từng tệp được chọn và thêm chúng vào mảng updatedDocumentFile
                    for (let index = 0; index < value.length; index++) {
                      const element = {
                        uri: value[index].uri,
                        size: value[index].fileSize,
                        fileType: value[index].type,
                        fileName: value[index].fileName,
                        choice: false,
                      };
                      updatedDocumentFile.push(element);
                    }
                    // Cập nhật state documentFile với mảng updatedDocumentFile
                    setDocumentFile(updatedDocumentFile);
                  }
                }}>
                <Text className="text-white bg-blue-400 p-2 text-center font-bold uppercase">
                  Chọn từ thư viện
                </Text>
              </SelectMultiPhoto>
            </View>
            <View className="py-2">
              <SelectMultiDocument
                onSelect={value => {
                  if (value != null && value != undefined) {
                    const updatedDocumentFile = [...documentFile];
                    // Lặp qua từng tệp được chọn và thêm chúng vào mảng updatedDocumentFile
                    for (let index = 0; index < value.length; index++) {
                      const element = {
                        uri: value[index].uri,
                        size: value[index].size,
                        fileType: value[index].type,
                        fileName: value[index].name,
                        choice: false,
                      };
                      updatedDocumentFile.push(element);
                    }
                    // Cập nhật state documentFile với mảng updatedDocumentFile
                    setDocumentFile(updatedDocumentFile);
                  }
                }}>
                <Text className="text-white bg-blue-400 p-2 text-center font-bold">
                  CHỌN TỪ KHO QUẢN LÝ FILE
                </Text>
              </SelectMultiDocument>
            </View>
            <ScrollView className="flex-1">
              <View className="mt-4 flex-1 flex flex-row flex-wrap">
                {documentFile.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{elevation: 4}}
                      className="w-full relative flex flex-row x-wrap justify-between items-center px-2 my-2 bg-white">
                      <View className="flex-1">
                        <View style={{width: 100, height: 100}}>
                          <ThumbnailFileComponent
                            url={item.uri}
                            type={item.fileType}
                          />
                        </View>
                      </View>
                      <Pressable
                        onPress={() => {
                          setDocumentFile(px => {
                            const newData = [...documentFile];
                            newData.splice(index, 1);
                            return newData;
                          });
                        }}
                        className="px-2">
                        <Icon source={'close'} size={35} color={'red'} />
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AttachmentTaskComponent;
