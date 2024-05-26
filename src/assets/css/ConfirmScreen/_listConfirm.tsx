import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {heightScale, moderateScale, widthScale} from '../../../screens/size';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  dateWrapper: {
    color: '#ccc',
    marginBottom: moderateScale(10),
  },
  dateText: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#999',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(10),
  },
  datePickerText: {
    fontSize: moderateScale(14),
    color: '#2179A9',
  },
  contentWrapper: {
    flex: 1,
  },
  editButton: {
    backgroundColor:'#a6a6a6',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    padding:moderateScale(10),
    marginVertical: moderateScale(10),
  },
  deleteButton: {
    backgroundColor:'#ff0000',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    padding:moderateScale(10),
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
    fontSize: moderateScale(12)
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
});
