import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { heightScale, moderateScale, widthScale } from '../../../screens/size';

export const styles = StyleSheet.create({

  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: moderateScale(5),
    marginBottom: moderateScale(10),
  },
  colorText: {
    color: '#03347D',
    fontWeight: 'bold',
  },
  flexContent: {
    flexDirection: 'row',
    margin: moderateScale(10),
    marginTop: moderateScale(15),
    color: '#2179A9',
    paddingLeft: moderateScale(20),
  },

  center: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  flexTitle: {
    flexDirection: 'row',
    margin: moderateScale(20),
    marginTop: moderateScale(10),
    color: '#2179A9',
  },
  icon: {
    borderRadius: moderateScale(5),
    backgroundColor: '#1566D5',
    color: '#fff',
  },
  content: {
    marginTop: moderateScale(10),
    backgroundColor: '#f5f5f5',
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
  },
  flexCenter: {
    marginTop: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textHeader: {
    fontSize: moderateScale(16),
    color: '#444',
  },
  white: {
    color: '#fff',
    fontSize: moderateScale(12),
  },
  width: {
    minWidth: widthScale(180),
    justifyContent: 'space-between',
    flex: 1,
    textAlign: 'center',
  },

  text: {
    fontWeight: '700',
    fontSize: moderateScale(18),
    textAlign: 'center',
    marginBottom: moderateScale(10),
    color: '#03347D',
  },
  timesheet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    padding: moderateScale(10),
    margin: moderateScale(7),
    backgroundColor: '#fff',
    borderRadius: moderateScale(5),
  },
  title: {
    color: '#03347D',
    fontSize: moderateScale(15),
  },
  titleLeft: {
    color: '#555',
    fontSize: moderateScale(16),
    minWidth: widthScale(150),
  },
  number: {
    fontSize: moderateScale(16),
    color: '#555',
  },
  value: {
    color: '#03347D',
    fontSize: moderateScale(15),
    flex: 3,
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  whiteButton: {
    color: '#fff',
    fontSize: moderateScale(16),
  },
});

