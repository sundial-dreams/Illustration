import React, {useCallback, useRef, useState} from 'react';

import {
  View,
  TouchableWithoutFeedback,
  TextInput,
  NativeSyntheticEvent,
  TextInputTextInputEventData,
  Text,
  Animated,
} from 'react-native';
import {PropsWithOnTouch, PropsWithStyle} from '../../utils/interface';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import scss from './style.scss';
import {useNavigation} from '@react-navigation/native';
import {ContentWidth} from '../../utils';
import DropShadow from 'react-native-drop-shadow';
import {useTouchBounceAnimated} from '../../utils/hooks';

export function GoBackButton({style}: PropsWithStyle): React.ReactElement {
  const navigation = useNavigation();

  const onGoBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <View style={[scss.cmp_go_back_button, style]}>
      <Icon
        name={'arrow-left'}
        color={'black'}
        size={18}
        suppressHighlighting
        onPress={onGoBack}
      />
    </View>
  );
}

interface InputBoxProps extends PropsWithStyle {
  value: string;
  type: 'emailAddress' | 'password' | 'username';
  placeholder: string;
  onInput: (value: string) => void;
}

export function InputBox({
  value,
  type,
  placeholder,
  onInput,
  style,
}: InputBoxProps): React.ReactElement {
  const label =
    type === 'emailAddress'
      ? 'Email'
      : type === 'username'
      ? 'Username'
      : 'Password';

  const icon =
    type === 'emailAddress'
      ? 'email'
      : type === 'username'
      ? 'account'
      : 'lock';

  return (
    <Animated.View style={[scss.cmp_input_box, {width: ContentWidth}, style]}>
      <View style={scss.box_label}>
        <Icon name={icon} size={18} color={'#131313'} />
        <Text style={scss.label_text}>{label}</Text>
      </View>
      <TextInput
        style={scss.text_input}
        autoCapitalize="none"
        placeholder={placeholder}
        value={value}
        placeholderTextColor={'#c7c7c7'}
        textContentType={type}
        onChangeText={onInput}
      />
    </Animated.View>
  );
}

export function CheckBox({
  checked,
  onCheck,
  style,
}: {
  checked: boolean;
  onCheck?: () => void;
} & PropsWithStyle): React.ReactElement {
  return (
    <TouchableWithoutFeedback onPress={onCheck}>
      <View style={[scss.cmp_check_box, style]}>
        <View
          style={[
            scss.check_state,
            {backgroundColor: checked ? 'black' : 'transparent'},
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

export function SignButton({
  text,
  onTouch,
}: {text: string} & PropsWithOnTouch): React.ReactElement {
  const scaleAnimatedValue = useRef(new Animated.Value(0)).current;
  const [onTouchIn, onTouchOut, scaleAnimatedStyle] = useTouchBounceAnimated(
    scaleAnimatedValue,
    0.98,
  );

  return (
    <DropShadow style={scss.sign_button_shadow}>
      <TouchableWithoutFeedback
        onPress={onTouch}
        onPressIn={onTouchIn}
        onPressOut={onTouchOut}>
        <Animated.View
          style={[
            scss.cmp_sign_button,
            {width: (ContentWidth * 3) / 5},
            scaleAnimatedStyle,
          ]}>
          <Text style={scss.sign_in_button_text}>{text}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </DropShadow>
  );
}

export function UnderlineButton({
  text,
  onTouch,
}: {text: string} & PropsWithOnTouch): React.ReactElement {
  return (
    <TouchableWithoutFeedback onPress={onTouch}>
      <View style={scss.cmp_underline_button}>
        <Text style={scss.underline_text}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
