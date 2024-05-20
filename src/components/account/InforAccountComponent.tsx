import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {Icon} from 'react-native-paper'
import {COLORS} from '../../constants/screens'
import PropTypes from 'prop-types'

type InforAccountComponentPops = {
  title: string | null;
  value?: string | null;
}

const InforAccountComponent = (props: InforAccountComponentPops) => {
  return (
    <View className="py-2 px-4 border-b border-b-gray-300 flex flex-row flex-nowrap justify-between items-center">
      <View>
        <Text className="text-sm font-bold text-black">{props.title}</Text>
        <Text>{props.value}</Text>
      </View>
      <View>
        <Icon size={30} color={COLORS.PRIMARY} source="chevron-right"></Icon>
      </View>
    </View>
  );
};

InforAccountComponent.prototype = {
  title: PropTypes.string,
  value: PropTypes.string,
};
export default InforAccountComponent;
