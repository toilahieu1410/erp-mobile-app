import React from 'react';
import { StyleSheet } from 'react-native';
import { heightScale, moderateScale } from '../../../screens/size';
import {Dimensions} from 'react-native';


export const height = Dimensions.get('window').height

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flexGrow: 1,
    padding: moderateScale(15),
    borderRadius:moderateScale(15),
    margin: moderateScale(15),
    marginBottom: moderateScale(10),
    backgroundColor:'#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 8,
  },
  content: {
     flexGrow: 1,
  },
  searchStyle: {
    borderTopWidth: 1,
    position:'relative',
    borderColor: '#ddd',
  },
  btnDate: {
    marginTop:moderateScale(10),
    fontSize: moderateScale(14),
    borderWidth: 1,
    borderColor: '#e2e2e2',
    color:'#808080',
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: '#F7F8FB'
  },
  inputEdit: {
    marginTop:moderateScale(10),
    fontSize: moderateScale(14),
    borderWidth: 1,
    borderColor: '#e2e2e2',
    color:'#808080',
    padding: moderateScale(8),
    borderRadius: moderateScale(5),
    backgroundColor: '#F7F8FB'
  },
  textTitle: {
    color:'#555',
    fontSize:moderateScale(14),
  },
  textPicker: {
    color:'#555',
    fontSize:moderateScale(14),
  },
  radioButtonHorizonal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-evenly'
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  dropdown: {
    marginTop:moderateScale(10),
    height: moderateScale(40),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxInfo: {
    padding:moderateScale(15),
    backgroundColor: '#00BFFF',
    position:'relative',
    zIndex:1,
    bottom:0,
    maxHeight: moderateScale(100),
  },
  boxButton: {
   margin: moderateScale(15),
    justifyContent:'center',
    flexDirection:'row'
  },
  buttonSave: {
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 6,
    backgroundColor: '#00BFFF',
    borderColor: '#00BFFF',
    padding: moderateScale(10),
    borderWidth:1,
    width: '100%',
    borderRadius: moderateScale(50),
   
  },
  textSave: {
    color : '#fff',
    textAlign:'center',
    fontSize: moderateScale(14)
  },
  button: {
    backgroundColor: '#0984e3',
    borderRadius:moderateScale(5),
    marginVertical: moderateScale(10)
   
  },
  buttonClick: {
    padding: moderateScale(8),
    
  },
  boxUser: {
    backgroundColor:'#fff',
    position:'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 8,
    top:moderateScale(10),
    zIndex:999,
    borderRadius: moderateScale(5),
    padding:moderateScale(15),
  },
  flexCenter: {
    flexDirection:'row',
    alignItems:'center',

  },
  formGroup: {
    marginBottom: moderateScale(15),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
  },

  textRight: {
    marginLeft: moderateScale(15)
  },
  textWhite: {
    color:'#fff',
    textAlign:'center'
  },
  buttonEdit: {
    borderRadius:moderateScale(5),
    backgroundColor: '#0066ff',
    textAlign:'center',
    padding:moderateScale(10),
    flexDirection:'row',
    justifyContent:'center'
  },
  borderAvatar: {
    borderWidth: 2,
    borderColor: '#cecece',
    width: moderateScale(70),
    height: moderateScale(70),
    backgroundColor:'#fff',
    justifyContent: 'center', 
    alignItems: 'center',  
    borderRadius: moderateScale(70) / 2 
  },

  height: {
    height: height,
    position:'relative',
    zIndex:1,
    top: moderateScale(70)
  },
  headerContainer: {
    flex: 1,
  },
  userInfoSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    backgroundColor: 'gray',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: 'gray',
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 15,
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  iconLeft: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronRight: {
    color: '#027BE3',
  },

  //info account 
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: moderateScale(10),
  },
  boxAvatar: {
    width: moderateScale(110),
    height: moderateScale(110),
    backgroundColor:'#fff',
    justifyContent: 'center', 
    alignItems: 'center',  
    borderRadius: moderateScale(110) / 2 
  },
  imageAvatar: {
    backgroundColor:'transparent',
    resizeMode:'cover',
    
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  infoName: {
    marginTop: moderateScale(5),
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  textUsername: {
    fontSize:moderateScale(18),
    color: '#2179A9',
    marginBottom:moderateScale(5) 
  },
  textEmail: {
    fontSize:moderateScale(16),
  },
  infoDetail: {
    borderRadius: moderateScale(10),
    margin: moderateScale(20),
    marginTop: moderateScale(10),
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    overflow: 'hidden',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    backgroundColor:'#fff'
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  tabButton: {
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center',
    padding: moderateScale(5),
    borderRadius: moderateScale(5),
    backgroundColor:'#f8f8f9',
    minWidth: moderateScale(70),
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    overflow: 'hidden',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  tabText: {
    fontSize: moderateScale(12),
    color: 'gray',
  },
  activeTab: {
    backgroundColor: '#dbf2ff',
  },
  activeTabText: {
    color: '#2179A9',
  },
  avatarIcon: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(40/2),
    borderWidth: 2,
    borderColor: '#dedede',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sizeIcon: {
    textAlign:'center',
    width: moderateScale(20),
    height: moderateScale(20),
  }
});

