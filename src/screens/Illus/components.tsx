import React, {useRef} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Layout} from '../../utils';
import {PropsWithOnTouch, PropsWithStyle} from '../../utils/interface';
import {DefaultFontStyle, FlexCenterStyle, newShadow} from '../../styles';
import DropShadow from 'react-native-drop-shadow';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTouchBounceAnimated} from '../../utils/hooks';

export function IllusProgressBar({
  total,
  current,
}: {total: number; current: number} & PropsWithStyle): React.ReactElement {
  return (
    <View
      style={[
        stylesOfProgress.progressBar,
        {width: (current / total) * Layout.width},
      ]}
    />
  );
}

const stylesOfProgress = StyleSheet.create({
  progressBar: {
    height: 2,
    width: 0,
    backgroundColor: 'black',
  },
});

export function FollowButton({
  followed,
  onTouch,
}: {
  followed: boolean;
  onTouch?: () => void;
}): React.ReactElement {
  const scaleAnimatedValue = useRef(new Animated.Value(0)).current;
  const [onTouchIn, onTouchOut, scaleAnimatedStyle] = useTouchBounceAnimated(
    scaleAnimatedValue,
    0.95,
  );
  return (
    <DropShadow style={stylesOfFollowButton.shadow}>
      <TouchableWithoutFeedback
        onPress={onTouch}
        onPressOut={onTouchOut}
        onPressIn={onTouchIn}>
        <Animated.View
          style={[
            stylesOfFollowButton.followButton,
            scaleAnimatedStyle,
            followed && {backgroundColor: 'black'},
          ]}>
          <Text
            style={[stylesOfFollowButton.text, followed && {color: 'white'}]}>
            {followed ? 'Following' : 'Follow'}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </DropShadow>
  );
}

const stylesOfFollowButton = StyleSheet.create({
  followButton: {
    width: 60,
    height: 20,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: 'white',
    ...FlexCenterStyle,
  },
  text: {
    ...DefaultFontStyle,
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
  shadow: newShadow(5, 0.1),
});

export function DownLoadButton({
  onTouch,
  style,
}: PropsWithStyle & PropsWithOnTouch): React.ReactElement {
  const scaleAnimatedValue = useRef(new Animated.Value(0)).current;
  const [onTouchIn, onTouchOut, scaleAnimatedStyle] = useTouchBounceAnimated(
    scaleAnimatedValue,
    0.95,
  );
  return (
    <DropShadow style={stylesOfDownLoadButton.shadow}>
      <TouchableWithoutFeedback
        onPress={onTouch}
        onPressOut={onTouchOut}
        onPressIn={onTouchIn}>
        <Animated.View
          style={[
            stylesOfDownLoadButton.downloadButton,
            style,
            scaleAnimatedStyle,
          ]}>
          <Icon
            name={'tray-arrow-down'}
            size={14}
            color={'white'}
            suppressHighlighting={true}
          />
          <Text suppressHighlighting={true} style={stylesOfDownLoadButton.text}>
            Download
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </DropShadow>
  );
}

const stylesOfDownLoadButton = StyleSheet.create({
  downloadButton: {
    width: 100,
    height: 30,
    borderRadius: 20,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  text: {
    ...DefaultFontStyle,
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  shadow: newShadow(5, 0.1),
});

export function LikeButton({
  liked,
  onTouch,
  style,
}: {liked: boolean} & PropsWithOnTouch & PropsWithStyle): React.ReactElement {
  const scaleAnimatedValue = useRef(new Animated.Value(0)).current;
  const [onTouchIn, onTouchOut, scaleAnimatedStyle] = useTouchBounceAnimated(
    scaleAnimatedValue,
    0.95,
  );
  const name = liked ? 'cards-heart' : 'cards-heart-outline';
  return (
    <DropShadow style={stylesOfLikeButton.shadow}>
      <TouchableWithoutFeedback
        onPress={onTouch}
        onPressIn={onTouchIn}
        onPressOut={onTouchOut}>
        <Animated.View
          style={[stylesOfLikeButton.likeButton, style, scaleAnimatedStyle]}>
          <Icon
            name={name}
            suppressHighlighting={true}
            size={14}
            color={'white'}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </DropShadow>
  );
}

const stylesOfLikeButton = StyleSheet.create({
  likeButton: {
    width: 30,
    height: 30,
    backgroundColor: 'black',
    borderRadius: 20,
    ...FlexCenterStyle,
  },
  shadow: newShadow(5, 0.1),
});
