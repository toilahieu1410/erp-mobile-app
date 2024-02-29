import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from 'react-native-paper';
type SelectOptionProps = {
  title?: string | null;
  value?: string | null;
  option: OptionProps[] | [];
  onSelect?: ((key: string, display: string) => void) | undefined;
};
type OptionProps = {
  key: string;
  display: string;
};
const SelectOption = ({option, title, value, onSelect}: SelectOptionProps) => {
  const [displayName, setDisplayName] = useState<string | undefined>();
  const [showOption, setShowOption] = useState<boolean>(false);
  useEffect(() => {
    if (value != null && value != undefined && value.length > 0) {
      for (let i = 0; i < option.length; i++) {
        if (option[i].key == value) {
          setDisplayName(option[i].display);
          break;
        }
      }
    }
  });
  return (
    <View className="mb-4 z-50">
      {title && <Text className="text-black text-base">{title}</Text>}
      <View>
        <TouchableOpacity
          onPress={() => {
            setShowOption(!showOption);
          }}
          activeOpacity={1}
          delayPressIn={150}>
          <View className="w-full overflow-hidden h-10 flex flex-row justify-between items-center p-2 border border-gray-400 rounded-lg focus:border-primary">
            <Text className="flex-1 text-black pr-2">{displayName}</Text>
            <Icon
              source={showOption ? `chevron-up` : `chevron-down`}
              size={25}
            />
          </View>
        </TouchableOpacity>
        <View className={`relative z-10 ${showOption ? 'block' : 'hidden'}`}>
          <View
            className="max-h-40 w-full border border-gray-300 rounded-lg my-1 bg-white"
            style={{
              shadowColor: '#000000',
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowRadius: 5,
              shadowOpacity: 5.0,
              elevation: 8,
            }}>
            <ScrollView>
              {option?.map((item, index) => {
                return (
                  <TouchableOpacity
                    className={`px-2 py-3 ${
                      index == option.length - 1
                        ? 'border-b-[0px]'
                        : 'border-b-[1px] border-b-gray-300'
                    } `}
                    key={index}
                    onPress={() => {
                      if (onSelect) {
                        setDisplayName(item.display);
                        setShowOption(!showOption);
                        onSelect(item.key, item.display);
                      }
                    }}>
                    <Text className="text-black text-sm">{item.display}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SelectOption;
