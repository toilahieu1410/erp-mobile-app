import React from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';

type AppBarProps = {
  showButtonBack?: Boolean | false;
  title: String | React.ReactNode;
  centerTitle?: Boolean | false;
  actions?: React.ReactElement | null;
};
{
  /* <Appbar.Header style={{elevation: 2}}>
  <Appbar.BackAction
    rippleColor="transparent"
    onPress={() => {
      navigator.goBack();
    }}
  />
  <Appbar.Content title="Thông tin tài khoản" titleStyle={{fontSize: 18}} />
</Appbar.Header>; */
}
const AppHeader = ({
  showButtonBack,
  title,
  centerTitle,
  actions,
}: AppBarProps) => {
  const navigator = useNavigation();
  return (
    <Appbar.Header style={{elevation: 3}}>
      {showButtonBack == true ? (
        <Appbar.BackAction
          rippleColor="transparent"
          className="p-0"
          onPress={() => {
            navigator.goBack();
          }}
        />
      ) : null}
      <Appbar.Content
        title={`${title}`}
        titleStyle={
          centerTitle == true
            ? {textAlign: 'center', fontSize: 18}
            : {fontSize: 18}
        }
      />
      {actions}
    </Appbar.Header>
  );
};

AppHeader.propTypes = {
  showButtonBack: PropTypes.bool,
  title: PropTypes.string,
  centerTitle: PropTypes.bool,
  actions: PropTypes.element,
};

export default AppHeader;
