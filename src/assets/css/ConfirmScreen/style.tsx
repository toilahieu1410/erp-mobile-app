import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { heightScale, moderateScale, widthScale } from '../../../screens/size';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flexTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(10),
    marginTop: moderateScale(10)
  },
  flexContent: {
    flexDirection: 'row',
    margin: moderateScale(10),
    marginTop: moderateScale(15),
    color: '#2179A9',
    paddingLeft: moderateScale(20)
  },
  textHeader: {
    fontSize: moderateScale(16),
    color: '#444'
  },
  btnDate: {
    backgroundColor: 'transparent',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  scroll: {
    height:'100%',
  },
  colorText: {
    color: '#03347D',
    fontWeight: 'bold',
    fontSize: moderateScale(16),
    flexShrink: 1,
  },
  textColor: {
    fontSize: moderateScale(16),
    color: '#fff',
    fontWeight: 'bold',
  },
  border: {
    borderColor:'#ccc',
    borderWidth:1,
    marginBottom:moderateScale(20)
  },
  pickerDropdown: {
    flex:1,
  },
  flex: {
    flexDirection: 'row',
    marginBottom: moderateScale(20),
    alignItems:'center'
  },
  flexTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: moderateScale(10),
    fontSize: moderateScale(20),
    backgroundColor: '#ddd',
    borderRadius: moderateScale(35) / 2,
    height: moderateScale(35),
    width: moderateScale(35),
    alignItems: 'center',
    alignContent: 'center',
    textAlignVertical: 'center',
  },
  iconImg: {
    color: '#2179A9',
    lineHeight: moderateScale(35),
  },
  iconPage: {
    marginRight: moderateScale(5),
  },
  card: {
    margin: moderateScale(15),
    padding: moderateScale(15),
    borderRadius: moderateScale(5),
    backgroundColor: '#fff',
    shadowColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  colorHeader: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: Platform.OS === 'ios' ? 0 : 0.2,
    backgroundColor: 'transparent',
    elevation: 1,
  },
  input: {
    backgroundColor: '#f5f5f5',
    flexShrink: 1,
    width: '100%',
    minHeight:35,
    maxHeight:300,
    fontSize: moderateScale(16),
  },
  dropdown: {
    width: '100%',
    height: 45,
    borderBottomColor: '#cccccc59',
    borderBottomWidth: 1,
    flexShrink: 1,
    fontSize: moderateScale(20),
  },
  datepicker: {
    color: '#000',
    fontSize: moderateScale(20),
  },
  button: {
    flexDirection: 'row',
    color: '#fff',
  },
  buttonAddEnable: {
    padding: 5,
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: moderateScale(50),
    width: widthScale(250),
    height: heightScale(35),
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1166D5',
  },
  buttonAddDisable: {
    padding: moderateScale(5),
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: moderateScale(50),
    width: widthScale(250),
    height: heightScale(35),
    backgroundColor: '#ccc',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

