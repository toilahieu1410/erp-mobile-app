import React from 'react';
import {Platform, StyleSheet, Dimensions} from 'react-native';
import {heightScale, moderateScale, widthScale} from '../../../screens/size';

const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputContainer: {
    marginBottom: moderateScale(20),
  },
  dateContainer: {
    marginBottom: moderateScale(20),
  },
  dateTextFromTo: {
    fontSize: moderateScale(14),
    color: '#333',
    alignContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: moderateScale(14),
    color: '#333',
  },
  actionSheetItem: {
    padding: moderateScale(15),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  boxXinNghiPhep: {
    position:'relative',
    marginVertical: moderateScale(8), 
    borderColor: '#ddd', 
    borderWidth: 1, 
    padding: moderateScale(10), 
    borderRadius: moderateScale(5)
  },
  charCount: {
    marginTop: moderateScale(5),
    textAlign: 'right',
    color: '#999',
  },
  flexTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  flexContent: {
    flexDirection: 'row',
    margin: moderateScale(10),
    marginTop: moderateScale(15),
    color: '#2179A9',
    paddingLeft: moderateScale(20),
  },
  flexFromTo: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  textHeader: {
    fontSize: moderateScale(16),
    color: '#444',
  },
  btnDate: {
    backgroundColor: 'transparent',
    marginRight: moderateScale(10),
  },
  scroll: {
    minHeight: height - moderateScale(100),
  },
  positionRemove: {
    position:'absolute',
    top: 0,
    right: 0,
    padding:moderateScale(3),
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
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: moderateScale(20),
  },
  pickerDropdown: {
    flex: 1,
    maxWidth: moderateScale(180),
    padding: moderateScale(10),
    // minHeight: moderateScale(40),
    borderColor: '#ddd',
    borderRadius: moderateScale(5),
    borderWidth:1,
    backgroundColor: '#fff',
  },
  textChoose: {
    textAlign:'center',
    color:'#000',
    fontSize: moderateScale(14),
  },
  buttonSaveEnabled: {
    color: '#fff',
    backgroundColor: '#2179A9',
    fontWeight: '500',
    textAlign:'center',
    borderColor: '#2179A9',
    borderWidth: 1,
    padding: moderateScale(5),
    borderRadius: moderateScale(5),
  },
  buttonSaveDisabled: {
    color: '#ccc',
    fontWeight: '500',
    borderColor: '#ccc',
    borderWidth: 1,
    textAlign:'center',
    padding: moderateScale(5),
    borderRadius: moderateScale(5),
  },
  flex: {
    flexDirection: 'row',
    marginBottom: moderateScale(20),
    alignItems: 'center',
  },
  
  flexTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: moderateScale(5)
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
    height: '100%',
  },
  colorHeader: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: Platform.OS === 'ios' ? 0 : 0.2,
    backgroundColor: 'transparent',
    elevation: 1,
  },

  dropdown: {
    height: moderateScale(40),
    position:'relative',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    marginVertical: moderateScale(10),
  },
  dropdownContainer: {
    width:'90%',
    left:20,
    top:0,
    maxHeight: moderateScale(220),
  },
  dropdownItemText: {
    fontSize: moderateScale(16),
  },
  dropdownSelectedText: {
    fontSize: moderateScale(16),
    color: '#2179A9',
  },
  dropdownSearch: {
    minWidth: moderateScale(170),
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
    color: '#2179A9',
  },
  buttonAddDisable: {
    color: '#ccc',
  },

  label: {
    fontSize: moderateScale(14),
    color: '#555',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    color: '#333',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
