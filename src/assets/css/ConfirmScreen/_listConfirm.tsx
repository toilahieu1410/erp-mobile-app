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
    borderRadius: moderateScale(10),
  },

  itemWrapper: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    overflow:'hidden',
    shadowOpacity: 0.75,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
     padding: moderateScale(10),
    // alignContent:'center'
  },
  btnDate: {
    borderBottomColor: '#ccc',
    borderBottomWidth:1,
    padding: moderateScale(7),
    flexDirection: 'row',
    alignItems: 'center',
  },

  dateText: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#999',
  },
  datePickerContainer: {
    borderTopColor: '#cecece',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical:moderateScale(8),
    paddingHorizontal: moderateScale(10),
    
  },
  flexDatePicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: moderateScale(14),
    color: '#2179A9',
    marginLeft:moderateScale(5)
  },
  contentWrapper: {
    flex: 1,
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
  textDate: {
    flexDirection: 'row',
    alignItems: 'center',
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
