// import React, {useEffect, useState} from 'react'
// import {Text, View, SafeAreaView, ScrollView} from 'react-native'
// import AppHeader from '../../components/navigators/AppHeader'
// // import {styles} from '../../assets/css/ConfirmScreen/style'
// import ButtonChange from '../../components/navigators/buttonChange'
// import CreateConfirm from '../../components/work/confirm/CreateConfirm'
// import ListConfirm from '../../components/work/confirm/ListConfirm'
// import CreateWorkFromHome from '../../components/work/workhome/CreateWorkFromHome'
// import ListWorkFromHome from '../../components/work/workhome/ListWorkFromHome'


// const WorkFromHomeScreen = () => {

//   const [page, setPage] = useState('taoDeNghiWFH');
//   const [buttonCreate, setButtonCreate] = useState(false);
//   const [buttonList, setButtonList] = useState(true);

//   return (
//     <SafeAreaView>
//       <AppHeader title="Xin làm việc tại nhà" showButtonBack={true} />
//       <View style={styles.flexTitle}>
//         <ButtonChange
//           disable={buttonCreate}
//           onPress={() => {
//             setPage('taoDeNghiWFH');
//             setButtonList(true);
//             setButtonCreate(false);
//           }}
//           title={'Tạo đơn'}
//         />
//         <ButtonChange
//           disable={buttonList}
//           onPress={() => {
//             setPage('danhSachWFH');
//             setButtonList(false);
//             setButtonCreate(true);
//           }}
//           title={'Danh sách'}
//         />
//       </View>
//       <View>

//         {page === 'taoDeNghiWFH' && (
//           <CreateWorkFromHome
//             onPress={() => {
//               setPage('danhSachWFH');
//               setButtonList(!buttonList);
//               setButtonCreate(!buttonCreate);
//             }}
//           />
//         )}
//         {page === 'danhSachWFH' && (
//           <ScrollView>
//             <ListWorkFromHome navigation />
//           </ScrollView>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default WorkFromHomeScreen;
