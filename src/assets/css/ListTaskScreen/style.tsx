import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { heightScale, moderateScale } from '../../../screens/size';


export const height = Dimensions.get('window').height

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listAllWorks: {
    flex:1,
  },
  boxFull: {
    width: '100%',
    borderRadius:moderateScale(10)
  },
  listStatusWork: {
    flexDirection:'row',
    justifyContent:'space-between'
  },

  boxLeft: {
    backgroundColor: '#006266',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    width: moderateScale(160),
    height:moderateScale(160),
    borderRadius:moderateScale(10)
  },
  boxRight: {
    flexDirection:'column',
    alignContent:'center',
    justifyContent:'space-between',
  },
  boxCenterWidthFull: {
    marginBottom: moderateScale(20),
    backgroundColor: '#273c75',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    width: '100%',
    height:moderateScale(70),
    borderRadius:moderateScale(10),

  },
  boxRightTop: {
    backgroundColor: '#0097e6',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    width: moderateScale(170),
    height:moderateScale(70),
    borderRadius:moderateScale(10),
    paddingLeft: moderateScale(20)
  },
  boxRightBottom: {
    backgroundColor: '#eb4d4b',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    width: moderateScale(170),
    height:moderateScale(70),
    borderRadius:moderateScale(10),
    paddingLeft: moderateScale(20)
  },
  textTitle: {
    fontWeight:'700',
    color:'#fff',
    fontSize:moderateScale(16)
  },
  textDescription: {
    fontWeight:'400',
    color:'#ccc',
    fontSize:moderateScale(12)
  },
  iconRounded: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(40/2),
    backgroundColor:'#fefefe',
    textAlignVertical:'center',
    textAlign:'center',
   
  },
  textRight: {
    marginLeft: moderateScale(10)
  },
  listDetailWorks: {
    minHeight: moderateScale(100),
    backgroundColor: '#F4F7FD',
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
    flexDirection:'row',
    justifyContent:'space-between'
  },
  boxDetailLeft: {

  },
  boxDetailRight: {
    
  }
});

