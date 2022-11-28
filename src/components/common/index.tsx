import React, {PropsWithChildren, useCallback, useMemo, useRef} from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {DefaultFontStyle, FlexCenterStyle, newShadow} from '../../styles';
import {PropsWithOnTouch, PropsWithStyle} from '../../utils/interface';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useTouchBounceAnimated} from '../../utils/hooks';
import DropShadow from 'react-native-drop-shadow';
import scss from './style.scss';

export function Title(
  props: PropsWithChildren & PropsWithStyle,
): React.ReactElement {
  return (
    <View style={[scss.cmp_title, props.style]}>
      <Text style={scss.title_text}>{props.children}</Text>
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
  return (
    <TouchableWithoutFeedback onPress={onTouch}>
      <View
        style={[
          scss.tag_container,
          style,
          withBackground && {backgroundColor: '#F5F5F5', paddingHorizontal: 10},
        ]}>
        <Text
          suppressHighlighting={true}
          style={[scss.cmp_tag, {fontSize: size}]}>
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

export function FollowButton({
  followed = true,
  onTouch,
  style,
  size = 16,
}: {followed?: boolean; size?: number} & PropsWithStyle &
  PropsWithOnTouch): React.ReactElement {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [onTouchIn, onTouchOut, animatedStyle] = useTouchBounceAnimated(
    animatedValue,
    0.95,
  );

  return (
    <DropShadow
      style={[scss.follow_button_shadow, !followed && {shadowColor: 'white'}]}>
      <TouchableWithoutFeedback
        onPress={onTouch}
        onPressIn={onTouchIn}
        onPressOut={onTouchOut}>
        <Animated.View
          style={[
            scss.cmp_follow_button,
            style,
            !followed && scss.un_follow,
            animatedStyle,
          ]}>
          <Text
            style={[
              scss.follow_button_text,
              {fontSize: size},
              !followed && {color: 'black'},
            ]}>
            {followed ? 'Following' : 'Follow'}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </DropShadow>
  );
}
