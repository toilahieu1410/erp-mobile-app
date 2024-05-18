import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { heightScale, moderateScale, widthScale } from '../../../screens/size';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {

  },
  containerLandscape: {
    height: Platform.OS === 'ios' ? heightScale(180) : heightScale(200),
  },
  containerPortal: {
    height: Platform.OS === 'ios' ? heightScale(500) : heightScale(520),
  },
  swipe: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  flexContent: {
    flexDirection: 'row',
    margin: moderateScale(10),
    marginTop: moderateScale(15),
    color: '#2179A9',

    justifyContent: 'space-between'
  },
  textHeader: {
    fontSize: moderateScale(16),
    color: '#444',
  },
  listWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  row: {
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: moderateScale(16),
    flexShrink: 1,
    padding: moderateScale(10),
    color: '#444',
  },
  row1: {
    backgroundColor: '#fff',
    width: widthScale(380),
    flex: 1,
    fontSize: moderateScale(16),
    padding: moderateScale(10),
    color: '#444',
  },
  rowHeader: {
    backgroundColor: '#2179A9',
    color: '#fff',
    fontSize: moderateScale(16),
    padding: moderateScale(10),
    flexShrink: 1,
  },
});

