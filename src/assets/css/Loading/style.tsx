import { StyleSheet } from "react-native";
import { moderateScale } from "../../../screens/size";

export const styles = StyleSheet.create({
  boxLoading: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
  },
  textTitle: {
    flexDirection:'row',
    
    alignItems:'center',
    color: '#2179A9',
    fontSize: moderateScale(14),
    marginRight: moderateScale(10)
  }
})