import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Avatar from './Avatar';
import {
  DefaultBackgroundColor,
  DefaultFontStyle,
  PaddingHorizontal,
} from '../styles';
import {useDispatch} from 'react-redux';
import {updateOpenDrawer} from '../store/store';
import {PropsWithStyle} from '../utils/interface';
import {useNavigation} from '@react-navigation/native';

const image = require('../assets/images/avatar/avatar0.jpg');

interface IAppHeaderBar {
  title: string;
}

export default function AppHeaderBar({
  title,
}: IAppHeaderBar): React.ReactElement {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const handleMenuTouch = useCallback(() => {
    dispatch(updateOpenDrawer(true));
  }, [dispatch]);
  return (
    <View style={[styles.headerBar, {paddingTop: insets.top}]}>
      <Icon
        style={styles.menu}
        name="format-list-checkbox"
        size={24}
        color="black"
        onPress={handleMenuTouch}
        suppressHighlighting={true}
      />
      <Text style={styles.title}>{title}</Text>
      <Avatar
        style={styles.avatar}
        onTorch={() => {}}
        source={image}
        size={40}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    width: '100%',
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    ...DefaultBackgroundColor,
  },
  title: {
    ...DefaultFontStyle,
    fontSize: 24,
    fontWeight: 'bold',
  },
  menu: {
    marginLeft: 28,
  },
  avatar: {
    marginRight: 28,
  },
  headerBarWithBackButton: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...DefaultBackgroundColor,
  },
  backWrapper: {
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    left: PaddingHorizontal / 2,
  },
});

export function AppHeaderBarWithBackButton({
  title,
  style,
}: {title: string} & PropsWithStyle): React.ReactElement {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <View
      style={[styles.headerBarWithBackButton, style, {paddingTop: insets.top}]}>
      <View style={[styles.backWrapper, {top: insets.top}]}>
        <Icon
          name={'chevron-left'}
          size={24}
          color={'black'}
          suppressHighlighting={true}
          onPress={handleBack}
        />
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
