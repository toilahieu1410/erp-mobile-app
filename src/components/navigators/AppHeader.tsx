import React from 'react';
import {Platform, SafeAreaView, StyleSheet, Text} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';

import { moderateScale } from '../../screens/size';

type AppBarProps = {
  showButtonBack?: Boolean | false;
  title: String | React.ReactNode;
  centerTitle?: Boolean | false;
  actions?: React.ReactElement;
  backgroundColor?: string;
  titleColor: string
};

const AppHeader = ({
  showButtonBack,
  title,
  centerTitle,
  actions,
  backgroundColor= '#fff',
  titleColor = '#000'
}: AppBarProps) => {
  const navigator = useNavigation();

  return (
    <SafeAreaView style={{backgroundColor: backgroundColor}}>
    <Appbar.Header
      style={
        [
          styles.header, {backgroundColor},
          Platform.OS === 'ios' && styles.iosHeader
        ]
      }
      statusBarHeight={Platform.OS === 'ios' ? 0 : undefined}
      mode={
        Platform.OS === 'ios' || centerTitle == true
          ? 'center-aligned'
          : 'small'
      }>
      {showButtonBack == true ? (
        <Appbar.BackAction
          rippleColor="transparent"
          className="p-0 m-0"
          onPress={() => {
            navigator.goBack();
          }}
        />
      ) : null}
      <Appbar.Content
        title={`${title}`}
        titleStyle={[styles.title, {color: titleColor}]}
      />
      {typeof title === 'string' ? title : ''}
      {actions && (
        <Text style={styles.actions}>
          {/* Thêm View bao bọc actions với marginRight */}
          {actions}
        </Text>
      )}
    </Appbar.Header>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  header: {
    elevation: Platform.OS === 'ios' ? 1 : 4,
    height: moderateScale(50)
  },
  iosHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '700'
  },
  actions: {
    marginRight: moderateScale(5)
  }
})

AppHeader.propTypes = {
  showButtonBack: PropTypes.bool,
  title: PropTypes.string,
  centerTitle: PropTypes.bool,
  actions: PropTypes.element,
  backgroundColor: PropTypes.string,
  titleColor: PropTypes.string,
};

export default AppHeader;
