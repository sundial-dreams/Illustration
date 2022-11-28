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

export enum IllusImageType {
  Small,
  Middle,
  MiddleLarge,
  Large,
}

export type IllusImageDataType = {
  source: ImageSourcePropType;
  type: IllusImageType;
};

const gap = 10;

const [small, middle, middleLarge, large] = [
  120,
  (ContentWidth - gap) / 2,
  ContentWidth - gap - 120,
  ContentWidth,
];

function useWidthWithType(type: IllusImageType): number {
  return useMemo(() => {
    switch (type) {
      case IllusImageType.Small:
        return small;
      case IllusImageType.Middle:
        return middle;
      case IllusImageType.MiddleLarge:
        return middleLarge;
      case IllusImageType.Large:
        return large;
    }
  }, [type]);
}

interface IllusImageProps extends PropsWithStyle {
  onTouch?: () => void;
  source: ImageSourcePropType;
  type: IllusImageType;
}

export function IllusImage({
  source,
  type,
  onTouch,
}: IllusImageProps): React.ReactElement {
  const width = useWidthWithType(type);
  const navigation = useNavigation();
  const scaleAnimatedValue = useRef(new Animated.Value(0)).current;
  const [onTouchIn, onTouchOut, scaleAnimatedStyle] = useTouchBounceAnimated(
    scaleAnimatedValue,
    0.95,
  );

  const onIllusItemTouch = useCallback(() => {
    // @ts-ignore
    navigation.push('Illus', {source, type});
    onTouch && onTouch!();
  }, [navigation, onTouch, source, type]);

  return (
    <Animated.View style={[scss.illus_item, {width}, scaleAnimatedStyle]}>
      <TouchableWithoutFeedback
        onPress={onIllusItemTouch}
        onPressOut={onTouchOut}
        onPressIn={onTouchIn}>
        <ImageBackground style={scss.illus_image} source={source} />
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}

interface IllusListItemProps extends PropsWithStyle {
  item: Array<{source: ImageSourcePropType; type: IllusImageType}>;
}

export default function IllusListItem({
  item,
}: IllusListItemProps): React.ReactElement {
  return (
    <View
      style={[
        scss.illus_image_container,
        {paddingHorizontal: PaddingHorizontal, paddingTop: gap},
      ]}>
      {item.map((value, i) => (
        <IllusImage key={i} {...value} />
      ))}
    </View>
  );
}
