import SelectDropdown from 'react-native-select-dropdown';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {Icon} from 'react-native-paper';
type SelectOptionProps = {
  title?: string | null;
  value?: string | null;
  option?: OptionProps[] | [];
  onSelect?: ((data: OptionProps) => void) | undefined;
};

type OptionProps = {
  label: string;
  value: string;
};

const Select = ({title, value, option, onSelect}: SelectOptionProps) => {
  return (
    <View>
      <Text style={styles.label}>{title}</Text>
      <SelectDropdown
        data={option!}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
        renderItem={(selectItem: OptionProps, index, isSelect) => {
          if (selectItem.label == value || selectItem.value == value) {
            isSelect = true;
          }
          return (
            <View>
              <Text
                style={[
                  styles.textOption,
                  isSelect ? styles.isSelected : null,
                ]}>
                {selectItem.label}
              </Text>
            </View>
          );
        }}
        onSelect={data => {
          if (onSelect) {
            onSelect(data);
          }
        }}
        renderButton={(selectItem, isopen) => {
          return (
            <View style={styles.value}>
              <Text style={styles.textValue}>{value}</Text>
              <Icon source={isopen ? `chevron-up` : `chevron-down`} size={25} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  label: {
    color: 'black',
    fontSize: 16,
  },
  value: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 7,
    paddingBottom: 7,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  textValue: {
    color: 'black',
    fontSize: 14,
    width: '100%',
    flex: 1,
  },

  textOption: {
    width: '100%',
    color: 'black',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 7,
    paddingBottom: 7,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(209 213 219)',
  },
  dropdownMenuStyle: {
    borderColor: 'rgb(209, 213, 219)',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowRadius: 5,
    shadowOpacity: 5.0,
    elevation: 3,
  },
  isSelected: {
    backgroundColor: '#cce5ff',
  },
});
