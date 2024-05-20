import React from 'react'
import {TouchableOpacity,Text, StyleSheet} from 'react-native'
import {widthScale, heightScale, moderateScale} from '../../screens/size'

interface ButtonChangeProps {
  onPress: () => void;
  disable: boolean;
  title: string
}

const ButtonChange: React.FC<ButtonChangeProps> = ({onPress, disable, title}) => {
  return (
    <TouchableOpacity
      style={disable ? styles.buttonDisable : styles.buttonEnable}
      onPress={onPress}>
      <Text style={disable ? styles.textDisable : styles.textEnable}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonChange;

const styles = StyleSheet.create({
  buttonEnable: {
    backgroundColor: '#1166D5',
    flexDirection: 'row',
    width: moderateScale(170),
    padding: moderateScale(5),
    borderRadius: moderateScale(20),
    justifyContent: 'center',
  },
  buttonDisable: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: moderateScale(170),
    padding: moderateScale(5),
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    borderColor: '#1166D5',
    borderWidth: 1,
  },
  textEnable: {
    color: '#fff',
    textAlign: 'center',
    fontSize: moderateScale(16),
  },
  textDisable: {
    color: '#1166D5',
    textAlign: 'center',
    fontSize: moderateScale(16),
  },
});
