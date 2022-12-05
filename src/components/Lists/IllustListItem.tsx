import React, {useCallback, useMemo, useRef} from 'react';
import {
  Animated,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ContentWidth} from '../../utils';
import {PropsWithStyle} from '../../utils/interface';
import {useNavigation} from '@react-navigation/native';
import {PaddingHorizontal} from '../../styles';
import {useTouchBounceAnimated} from '../../utils/hooks';
import scss from './style.scss';

export enum IllustImageType {
  Small,
  Middle,
  MiddleLarge,
  Large,
}

export type IllustImageDataType = {
  source: ImageSourcePropType;
  type: IllustImageType;
};

const gap = 10;

const [small, middle, middleLarge, large] = [
  120,
  (ContentWidth - gap) / 2,
  ContentWidth - gap - 120,
  ContentWidth,
];

function useWidthWithType(type: IllustImageType): number {
  return useMemo(() => {
    switch (type) {
      case IllustImageType.Small:
        return small;
      case IllustImageType.Middle:
        return middle;
      case IllustImageType.MiddleLarge:
        return middleLarge;
      case IllustImageType.Large:
        return large;
    }
  }, [type]);
}

interface IllustImageProps extends PropsWithStyle {
  onTouch?: () => void;
  source: ImageSourcePropType;
  type: IllustImageType;
}

export function IllusImage({
  source,
  type,
  onTouch,
}: IllustImageProps): React.ReactElement {
  const width = useWidthWithType(type);
  const navigation = useNavigation();
  const scaleAnimatedValue = useRef(new Animated.Value(0)).current;
  const [onTouchIn, onTouchOut, scaleAnimatedStyle] = useTouchBounceAnimated(
    scaleAnimatedValue,
    0.95,
  );

  const onIllusItemTouch = useCallback(() => {
    // @ts-ignore
    navigation.push('Illust', {source, type});
    onTouch && onTouch!();
  }, [navigation, onTouch, source, type]);

  return (
    <Animated.View style={[scss.illust_item, {width}, scaleAnimatedStyle]}>
      <TouchableWithoutFeedback
        onPress={onIllusItemTouch}
        onPressOut={onTouchOut}
        onPressIn={onTouchIn}>
        <ImageBackground style={scss.illust_image} source={source} />
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}

interface IllusListItemProps extends PropsWithStyle {
  item: Array<{source: ImageSourcePropType; type: IllustImageType}>;
}

export default function IllustListItem({
  item,
}: IllusListItemProps): React.ReactElement {
  return (
    <View
      style={[
        scss.illust_image_container,
        {paddingHorizontal: PaddingHorizontal, paddingTop: gap},
      ]}>
      {item.map((value, i) => (
        <IllusImage key={i} {...value} />
      ))}
    </View>
  );
}
