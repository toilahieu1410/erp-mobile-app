import React from 'react';
import { StyleSheet } from 'react-native';
import { heightScale } from '../../../screens/size';

import {Dimensions} from 'react-native';


export const height = Dimensions.get('window').height
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  height: {
    height: height
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
});

