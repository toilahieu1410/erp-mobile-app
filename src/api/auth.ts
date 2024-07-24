
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

export const API_LMS = 'https://lms.giga.vn/api/v1'

// export const authHeader = async () => {
//   const dataToken = await AsyncStorage.getItem('tokenKey')
//   const token = JSON.parse(dataToken)
//   const header = {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'x-access-token': token
//   }
//   return header

// }

export const _postApiSignIn = async (body: {username:string; password: string}) => {
  try {
    const response = await axios.post(`${API_LMS}/auth/login`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error: any) {
    throw error.response.data
  }
}