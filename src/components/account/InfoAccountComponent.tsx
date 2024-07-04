import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/screens'
import PropTypes from 'prop-types'
import { moderateScale } from '../../screens/size';

type InfoAccountComponentPops = {
  title: string | null;
  value?: string | null;
  icon:  string | null;
  color: string | null;
}

const InfoAccountComponent = (props: InfoAccountComponentPops) => {
  return (
    <View className="py-2 px-4 border-b border-b-gray-100 flex flex-row flex-nowrap  items-center">
       <View style={styles.iconStyle}>
        <Icon size={moderateScale(20)} color={props.color} name={props.icon} />
      </View> 
      <View>
        <Text className="text-sm  text-gray">{props.title}</Text>
        <Text className='text-black text-lg'>{props.value}</Text>
      </View>
      
    </View>
  );
};

InfoAccountComponent.prototype = {
  title: PropTypes.string,
  value: PropTypes.string,
};
export default InfoAccountComponent;

export const styles = StyleSheet.create({
  iconStyle: {
    marginRight: moderateScale(15),
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
    borderRadius: moderateScale(40/2),
    width: moderateScale(40),
    height: moderateScale(40),
    shadowColor: '#222',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  }
})