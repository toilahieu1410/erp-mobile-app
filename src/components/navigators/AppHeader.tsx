import React from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';
import {Platform, Text} from 'react-native';
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
    <Appbar.Header
      style={{
        elevation: Platform.OS === 'ios' ? 1 : 4,
        backgroundColor: backgroundColor,
        height: 50,
      }}
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
        titleStyle={{fontSize: 16, fontWeight: 'bold', color: titleColor}}
      />

      {actions && (
        <Text style={{marginRight:moderateScale(5)}}>
          {/* Thêm View bao bọc actions với marginRight */}
          {actions}
        </Text>
      )}
    </Appbar.Header>
  );
};

AppHeader.propTypes = {
  showButtonBack: PropTypes.bool,
  title: PropTypes.string,
  centerTitle: PropTypes.bool,
  actions: PropTypes.element,
  backgroundColor: PropTypes.string,
  titleColor: PropTypes.string,
};

export default AppHeader;
