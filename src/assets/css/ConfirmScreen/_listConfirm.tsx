import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {heightScale, moderateScale, widthScale} from '../../../screens/size';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    top: '50%',
    left: '50%'
  },
  boxWrapper: {
    marginVertical:moderateScale(5),
    marginHorizontal: moderateScale(10),
    padding: moderateScale(5),
    backgroundColor: '#fff',
    borderRadius: moderateScale(5),
  },

  itemWrapper: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(5),
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    overflow: 'hidden',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: moderateScale(10),
  },
  contentWrapper: {
    flex: 1,
  },
  btnDate: {
    borderBottomColor: '#ccc',
    borderBottomWidth:1,
    padding: moderateScale(10),
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },

  dateText: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#999',
  },
  datePickerContainer: {
    margin: moderateScale(15),
    backgroundColor: '#fff',
    borderRadius: moderateScale(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    
    shadowOpacity: 0.75,
    shadowRadius: 4,
    elevation: 3,
    padding: moderateScale(10),
  },

  flexDatePicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexDateBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: moderateScale(15)
  },
  flexLoading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: moderateScale(14),
    marginLeft:moderateScale(5)
  },

  editButton: {
    minWidth:moderateScale(50),
    backgroundColor:'#a6a6a6',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    marginVertical: moderateScale(10),
  },
  deleteButton: {
    minWidth:moderateScale(50),
    backgroundColor:'#ff0000',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    marginVertical: moderateScale(10),
  },
  mainText: {
    fontSize: moderateScale(13),
    fontWeight: 'bold',
    color: '#aaa',
    marginVertical: moderateScale(5),
  },
  subText: {
    fontSize: moderateScale(16),
    color: '#333',
    fontWeight: '700',
  },
  statusWrapper: {
    borderRadius: moderateScale(4),
    alignItems: 'flex-end',
    justifyContent: 'space-between',

    // alignContent:'center',
  },
  iconWhite: {
    color: '#fff',
  },
  textWhite: {
    color: '#fff',
   
  },
  statusText: {
    padding: moderateScale(5),
    color: '#fff',
    textAlign: 'center',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    minWidth: moderateScale(60),
  },
  icon: {
    backgroundColor: '#f2f2f2',
    padding: moderateScale(3),
    borderRadius: moderateScale(5),
  },
  fontSize: {
    fontWeight: '500',
    fontSize: moderateScale(13),
    marginLeft: moderateScale(15),
  },

  buttonSearchEnabled: {
    flexDirection:'row',
    alignItems:'center',
    borderColor: '#2179A9',
    backgroundColor: '#2179A9',
    borderWidth: 1,
    borderRadius: moderateScale(20),
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    justifyContent:'center',
    alignSelf:'center'
  },
  buttonSearchDisabled: {
    flexDirection:'row',
    alignItems:'center',
    borderColor: '#ccc',
    backgroundColor: '#ccc',
    borderWidth: 1,
    borderRadius: moderateScale(20),
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    justifyContent:'center',
    alignSelf:'center'
  },
  textDate: {
    flexDirection:'row',
    
    alignItems:'center',
    color: '#2179A9',
    fontSize: moderateScale(14),
    marginRight: moderateScale(10)
  },
  textSearch: {
    color: '#fff',
    fontSize: moderateScale(14)
  },
  footerLoading: {
    padding: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#2179A9',
    fontSize: moderateScale(14),
    fontWeight: 'normal',
  },
});
