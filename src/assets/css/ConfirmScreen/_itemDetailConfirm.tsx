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
    paddingVertical:moderateScale(15),
  
  },
  flexFromTo: {
    justifyContent:'flex-start',
    flexDirection:'column',
  },
  flexTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: moderateScale(10),
    marginTop: moderateScale(20)
  },
  flexVerticalIcon: {
    flexDirection: 'row',
    alignItems:'center'
  },
  borderBottomColor: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    
  },
  rightDateTime: {
    marginRight:moderateScale(10)
  },
  buttonSave: {
    borderRadius:moderateScale(5),
    backgroundColor: '#0066ff',
    textAlign:'center',
    padding:moderateScale(10),
    flexDirection:'row',
    justifyContent:'center'
  },
  boxRight: {
    flexDirection:'row',
    alignContent:'center'
  },
  statusWrapper: {
    borderRadius: moderateScale(4),
    alignItems:'flex-end',
    justifyContent:'space-between',
  },
  statusText: {
    padding:moderateScale(5),
    color: '#fff',
    textAlign:'center',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    minWidth:moderateScale(60),
  },
  shadow: {
    shadowColor: '#171717',
    backgroundColor: 'white',
    margin: moderateScale(10),
    borderRadius: moderateScale(10),
    shadowOffset: {
      width: 0,
      height: 5,
    },
    overflow:'hidden',
    shadowOpacity: 0.75,
    shadowRadius: 4,
    elevation: 3,
     padding: moderateScale(10),
  },
  titleID: {
    fontSize:moderateScale(18),
    color: '#2179A9',
    marginBottom:moderateScale(10)
  },
  pickerDropdown: {
    flex:1,
    maxWidth:moderateScale(180),
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  btnShowDate: {
    backgroundColor : '#2179A9',
    padding: moderateScale(3),
    borderRadius: moderateScale(5)
  },
  input: {
    color: '#2179A9',
    fontSize:moderateScale(14)
  },
  inputEdit: {
    fontSize:moderateScale(14),
    borderBottomColor: '#ccc',
    borderBottomWidth:1,
    minWidth: moderateScale(100)
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
    
  },
  textDate: {
    fontSize: moderateScale(16),
    color:'#000'
  }
});

