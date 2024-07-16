import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { heightScale, moderateScale, widthScale } from '../../../screens/size';

export const styles = StyleSheet.create({
  container:{
  
  },
  flexTitle: {
    justifyContent:'center',
    flexDirection: 'row',
    alignItems:'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: moderateScale(10),
  },
  flexTitleDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(15)
  },
  flex: {
    flexDirection:'row',
    justifyContent:'space-between',
  },
  flexRight: {
    flexDirection:'row',
  },
  flexVertical: {
    position:'relative',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingTop:moderateScale(20),
  
  },
  flexColumn: {
    flexDirection:'column',
    paddingTop:moderateScale(20),
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
  flexCenter: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center'
  },
  charCount: {
    color: '#999',
  },
  positionRemove: {
    position:'absolute',
    top: 0,
    right: 0,
    padding:moderateScale(3),
    
  },
  boxSub: {
    backgroundColor:'#fafafa',
    flex:1,
    marginLeft: moderateScale(10)
  },
  boxXinNghiPhep: {
    position:'relative',
    marginVertical: moderateScale(8), 
    borderColor: '#ddd', 
    borderWidth: 1, 
    padding: moderateScale(10), 
    borderRadius: moderateScale(5)
  },
  borderBottomColor: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    
  },
  leftDateTime: {
    marginLeft:moderateScale(5)
  },
  rightDateTime: {
    marginRight:moderateScale(10)
  },
  buttonTop: {
    marginTop:moderateScale(15)
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
    padding: moderateScale(10),
    flex:1,
    maxWidth:moderateScale(180),
    borderColor: '#ddd',
    borderRadius: moderateScale(5),
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
    minHeight: moderateScale(40),
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderRadius: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    fontSize: moderateScale(14),
  },
  dropdown: {
    borderWidth: 1,
    position:'relative',
    borderColor: '#ddd',
    height:moderateScale(40),
    borderRadius: moderateScale(5),
    paddingHorizontal: moderateScale(5),

  },
  dropdownSub: {
    backgroundColor:'#efefef',
    width: '100%',
    flex:1,
    minWidth: moderateScale(200),
    minHeight: moderateScale(40)
  },
  iconStyle: {
    width: moderateScale(24),
  },
  dropdownContainer: {
    borderWidth: 1,
    position:'relative',
    borderColor: '#ddd',
    width:'90%',
    left:20,
    top:0,
    maxHeight: moderateScale(220),
  },
  dropdownItemText: {
    fontSize: moderateScale(16),
  },
  searchStyle: {
    borderBottomWidth: 1,
    position:'relative',
    borderColor: '#ddd',
  },
  dropdownSelectedText: {
    
    fontSize: moderateScale(16),
    color: '#2179A9',
  },
  actionSheetItem: {
    padding: moderateScale(15),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
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
  textWhite: {
    color: '#fff',
    fontSize: moderateScale(14),
  },
 
  textSmall: {
    fontSize: moderateScale(14),
    
  },
  textLeft: {
    fontSize: moderateScale(14),
    color:'#777',
    marginTop: moderateScale(10)
  },
  textChoose: {
    textAlign:'center',
    color:'#000',
    fontSize: moderateScale(14),
  },
  textRight: {
    fontSize: moderateScale(14),
    color:'#000'
  },


  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: moderateScale(8),
    backgroundColor: '#fff',
    borderColor: '#00BFFF',
    borderWidth: 1,
    
  },
});

