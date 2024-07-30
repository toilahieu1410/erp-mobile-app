import Geocoder from 'react-native-geocoding'
import Geolocation from '@react-native-community/geolocation'
const api_key = 'AIzaSyBqnaTZHOfI539sJlwuXY5uDsoJP_DPI4I'

Geocoder.init(api_key, {language: 'vi'})

// Chuyen doi dia chi sang kinh do, vi do
export const geolocation = (local) => {
  return new Promise (async (resolve, reject) => {
    try {
      const location = await Geocoder.from(local)
      resolve(location.results[0].geometry.location)
    } catch (error) {
      reject('error')
    }
  })
}

// Chuyen doi kinh do, vi do sang dia chi
export const geolocationDecode = (lat, lng) => {
  return new Promise (async (resolve, reject) => {
    try {
      const address = await Geocoder.from(lat, lng)
      resolve(address.results[0].formatted_address)
    } catch (error) {
      reject('error')
    }
  })
}

// Lay vi tri hien tai nguoi dung
export const position = () => {
  return new Promise (async (resolve, reject) => {
    try {
      await Geolocation.getCurrentPosition(
          (text) => {resolve(text.coords)},
          (error) => {console.log(error)},
          {enableHighAccuracy: false, timeout: 20000, maximumAge: 100000}
      )
    } catch (error) {
      reject('error');
    }
  })
}