import React, {PropsWithChildren, useCallback} from 'react';

import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Avatar from '../common/Avatar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PropsWithOnTouch, PropsWithStyle} from '../../utils/interface';
import {DefaultFontStyle} from '../../styles';
import {useDispatch, useSelector} from 'react-redux';
import {IStore, updateOpenDrawer} from '../../store/store';
import scss from './style.scss';

const image1 = require('../../assets/images/avatar/avatar0.jpg');

function UnderlineButton({
  icon,
  children,
  onTouch,
  style,
}: PropsWithChildren &
  PropsWithOnTouch &
  PropsWithStyle & {icon: string}): React.ReactElement {
  return (
    <TouchableWithoutFeedback onPress={onTouch}>
      <View style={[scss.underline_button, style]}>
        <Icon name={icon} size={20} color="white" />
        <Text style={scss.underline_button_text}>{children}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default function DrawerPanel(): React.ReactElement {
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {openDrawer} = useSelector((state: IStore) => state.uiState);
  const onAvatarTouch = useCallback(() => {
    dispatch(updateOpenDrawer(false));
  }, [openDrawer]);

  return (
    <View style={[scss.drawer_panel, {paddingTop: inset.top}]}>
      <Avatar source={image1} size={80} onTorch={onAvatarTouch} />
      <View style={scss.button_group}>
        <UnderlineButton icon={'cog-outline'}>Setting</UnderlineButton>
        <UnderlineButton style={scss.about_button} icon={'information-outline'}>
          About
        </UnderlineButton>
      </View>
    </View>
  );
}
