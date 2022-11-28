import React, {useRef} from 'react';
import {Animated, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Layout} from '../../utils';
import {PropsWithOnTouch, PropsWithStyle} from '../../utils/interface';
import DropShadow from 'react-native-drop-shadow';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTouchBounceAnimated} from '../../utils/hooks';
import scss from './style.scss';

export function IllusProgressBar({
  total,
  current,
}: {total: number; current: number} & PropsWithStyle): React.ReactElement {
  return (
    <View
      style={[scss.cpm_progress_bar, {width: (current / total) * Layout.width}]}
    />
  );
}

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
    <DropShadow style={scss.download_button_shadow}>
      <TouchableWithoutFeedback
        onPress={onTouch}
        onPressOut={onTouchOut}
        onPressIn={onTouchIn}>
        <Animated.View
          style={[scss.cmp_download_button, style, scaleAnimatedStyle]}>
          <Icon
            name={'tray-arrow-down'}
            size={14}
            color={'white'}
            suppressHighlighting={true}
          />
          <Text suppressHighlighting={true} style={scss.download_button_text}>
            Download
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </DropShadow>
  );
}

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
    <DropShadow style={scss.like_button_shadow}>
      <TouchableWithoutFeedback
        onPress={onTouch}
        onPressIn={onTouchIn}
        onPressOut={onTouchOut}>
        <Animated.View
          style={[scss.cpm_like_button, style, scaleAnimatedStyle]}>
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

interface IllusPropertiesProps {
  publishDate: string;
  views: number;
  likes: number;
  dimensions: {
    width: number;
    height: number;
  };
}

export function IllusProperties({
  publishDate,
  views,
  likes,
  dimensions,
}: IllusPropertiesProps): React.ReactElement {
  return (
    <View style={scss.cmp_illus_properties}>
      <View style={scss.illus_data_detail}>
        <Text style={scss.data_detail_text}>{publishDate + ' '}</Text>
        <Text style={[scss.data_detail_text, {color: 'black'}]}>
          | {' ' + views + ' '}
        </Text>
        <Text style={scss.data_detail_text}> Views </Text>
        <Text style={[scss.data_detail_text, {color: 'black'}]}>
          | {' ' + likes}
        </Text>
        <Text style={scss.data_detail_text}> Likes</Text>
      </View>
      <View>
        <Text style={scss.data_detail_text}>
          {dimensions.width}x{dimensions.height}
        </Text>
      </View>
    </View>
  );
}
