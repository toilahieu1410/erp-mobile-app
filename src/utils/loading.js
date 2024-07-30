import React from "react"
import {View, Text} from 'react-native'
import {styles} from '../assets/css/Loading/style'
import { ActivityIndicator } from "react-native-paper"

const LoadingPage = () => {
  return (
    <View style={styles.boxLoading}>
    <Text style={styles.textTitle}>Đang tải dữ liệu</Text>
    <ActivityIndicator size="small" color="#2179A9" />
  </View>
  )
}

export default LoadingPage