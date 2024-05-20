import {Dimensions} from 'react-native';

const windowDimensions = Dimensions.get('window')
const width = windowDimensions.width;
const height = windowDimensions.height;

//Chieu rong va cao cho design chuan
const guidelineBaseWidth = 360;
const guidelineBaseHeight = 600;

export const widthScale = (size: number):number => (width / guidelineBaseWidth) * size;
export const heightScale = (size: number):number => (height / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor: number =  0.5):number =>
  size + (widthScale(size) - size) * factor;
