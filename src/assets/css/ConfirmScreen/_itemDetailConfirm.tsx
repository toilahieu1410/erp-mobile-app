import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { heightScale, moderateScale, widthScale } from '../../../screens/size';

export const styles = StyleSheet.create({
  container:{
  
  },
  flex: {
    flexDirection:'row',
    justifyContent:'space-between',
 
  },
  flexRight: {
    flexDirection:'row',
  },
  flexVertical: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderBottomColor: '#ddd',
    borderBottomWidth:1,
    paddingVertical:moderateScale(15),
  
  },
  left: {
  
  },
  list: {

  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: 'white',
    borderRadius: moderateScale(8),
    padding: moderateScale(15),
    width: '100%',
    marginVertical: moderateScale(10),
  },
  titleID: {
    fontSize:moderateScale(18),
    color: '#2179A9',
    marginBottom:moderateScale(10)
  },
  input: {
    width: '100%',
    color: '#2179A9',
    fontSize:moderateScale(14)
  },
  colorGreen: {
    backgroundColor: 'green',
    padding: moderateScale(5),
    borderRadius: moderateScale(5),
  },
  colorBlue: {
    backgroundColor: '#1566D5',
    marginLeft: moderateScale(10),
    padding: moderateScale(5),
    borderRadius: moderateScale(5),
  },
  colorRed: {
    backgroundColor: 'red',
    marginLeft: moderateScale(10),
    padding: moderateScale(5),
    borderRadius: moderateScale(5),
  },
  white: {
    color: '#fff',
    fontSize: moderateScale(14),
  },
  textLeft: {
    fontSize: moderateScale(14),
    color:'#777',
  },
  textSmall: {
    fontSize: moderateScale(14),
    color:'#333',
  
  },
  textDate: {
    fontSize: moderateScale(16),
    color:'#000'
  }
});

