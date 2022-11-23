import React, {PropsWithChildren, useCallback, useMemo} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {DefaultFontStyle} from '../styles';
import {PropsWithStyle} from '../utils/interface';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

export function Title(
  props: PropsWithChildren & {style?: StyleProp<ViewStyle>},
): React.ReactElement {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        title: {
          width: '100%',
        },
        text: {
          ...DefaultFontStyle,
          fontSize: 18,
          fontWeight: 'bold',
        },
      }),
    [],
  );

  return (
    <View style={[styles.title, props.style]}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
}

export function Tag({
  children,
  withBackground = false,
  size = 16,
  style,
  onTouch = () => {},
}: {
  withBackground?: boolean;
  size?: number;
  onTouch?: () => void;
} & PropsWithChildren &
  PropsWithStyle) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        tag: {
          ...DefaultFontStyle,
          color: '#C7C7C7',
          fontSize: size,
        },
        wrapper: {
          marginTop: 10,
          paddingVertical: 2,
          borderRadius: 5,
          overflow: 'hidden',
        },
      }),
    [size],
  );
  return (
    <TouchableWithoutFeedback onPress={onTouch}>
      <View
        style={[
          styles.wrapper,
          style,
          withBackground && {backgroundColor: '#F5F5F5', paddingHorizontal: 10},
        ]}>
        <Text suppressHighlighting={true} style={styles.tag}>
          {withBackground ? '' : '#'}
          {children}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export function BackButton({
  color = 'black',
}: {color?: string} & PropsWithStyle): React.ReactElement {
  const navigation = useNavigation();
  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <Icon
      onPress={onBack}
      name={'chevron-left'}
      color={color}
      size={24}
      suppressHighlighting={true}
    />
  );
}
