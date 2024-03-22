import {Pressable, View} from 'react-native';
import React, {useState} from 'react';
import {Divider, Icon, Menu} from 'react-native-paper';

type ChoiceMenuProps = {
  children: React.ReactNode;
};

const ChoiceMenu = ({children}: ChoiceMenuProps) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View>
      <Menu
        contentStyle={{backgroundColor: 'white'}}
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Pressable onPress={openMenu}>
            <Icon source={'dots-vertical'} size={25}></Icon>
          </Pressable>
        }>
        {children}
        <Menu.Item onPress={closeMenu} title="Hủy" />
      </Menu>
    </View>
  );
};

export default ChoiceMenu;
