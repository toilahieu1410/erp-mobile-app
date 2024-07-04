import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { IconButton } from 'react-native-paper';
import { moderateScale } from '../screens/size';
import Icon from 'react-native-vector-icons/Ionicons';

interface PaginationProps {
  page: number;
  totalItems: number;
  onPressNext: () => void;
  onPressPrev: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalItems, onPressNext, onPressPrev }) => {
  const totalPages = Math.ceil(totalItems / 5);
  const [showButtons, setShowButtons] = useState(false);

  return (
    <View style={styles.container}>
          {showButtons && (
        <View style={styles.buttonsContainer}>
          <IconButton
            icon="chevron-up"
            iconColor='#fff'
            style={styles.button}
            disabled={page <= 1}
            onPress={onPressPrev}
          />
          <IconButton
            icon="chevron-down"
            iconColor='#fff'
            style={styles.button}
            disabled={page >= totalPages}
            onPress={onPressNext}
          />
        </View>
      )}
       <TouchableOpacity onPress={() => setShowButtons(!showButtons)} style={styles.pageInfo}>
        <Icon name='chatbubble-outline' size={moderateScale(35)} color={'#fff'}/>
        <Text style={styles.pageText}>{page}/{totalPages}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: moderateScale(10),
    right: moderateScale(10)
  },
  buttonsContainer: {
    flexDirection: 'column', 
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2179A9',
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(30/2),
    fontSize: moderateScale(12),
    color: '#fff'
  },
  pageInfo: {
    position:'relative',
    marginHorizontal: moderateScale(10),
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(44/2),
    padding: moderateScale(5),
    backgroundColor: '#2179A9',

  },
  pageText: {
    fontSize: moderateScale(12),
    position:'absolute',
    alignSelf: 'center',
    top:Platform.OS === 'ios' ? moderateScale(7) : moderateScale(14),
    bottom:0,
    textAlign:'center',
    width:moderateScale(30),
     left:Platform.OS === 'ios' ? moderateScale(1) : moderateScale(7),
    color: '#fff',
  },
});

export default Pagination;