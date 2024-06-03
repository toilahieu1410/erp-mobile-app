import React from 'react';
import { StyleSheet } from 'react-native';
import { heightScale, moderateScale } from '../../../screens/size';
import {Dimensions} from 'react-native';


export const height = Dimensions.get('window').height

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position:'relative'
  },
  boxInfo: {
    padding:moderateScale(15),
    backgroundColor: '#2179A9',
    position:'relative',
    zIndex:1,
    bottom:0,
    maxHeight: moderateScale(100),
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
  textRight: {
    marginLeft: moderateScale(15)
  },
  textWhite: {
    color:'#fff',
    textAlign:'center'
  },
  borderAvatar: {
    borderWidth: 2,
    borderColor: '#2179A9',
    borderRadius: Dimensions.get('screen').width * 0.15
  },
  image: {

  
  },
  height: {
    height: height,
    position:'relative',
    zIndex:1,
    top: moderateScale(55)
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

