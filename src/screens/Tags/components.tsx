import React, {PropsWithChildren, useCallback, useMemo, useRef} from 'react';
import {
  Animated,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {PropsWithStyle} from '../../utils/interface';
import {PaddingHorizontal} from '../../styles';
import {Layout} from '../../utils';
import DropShadow from 'react-native-drop-shadow';
import {useTouchBounceAnimated} from '../../utils/hooks';
import {useNavigation} from '@react-navigation/native';
import scss from './style.scss';

export enum IllusCardTypes {
  Small,
  Middle,
  Large,
}

const contentSize = Layout.width - 2 * PaddingHorizontal;
const gap = 10;
const small = (contentSize - 2 * gap) / 3;
const middle = contentSize - small - gap;
const large = contentSize;

function useWidthWithType(type: IllusCardTypes): number {
  return useMemo(() => {
    switch (type) {
      case IllusCardTypes.Small:
        return small;
      case IllusCardTypes.Middle:
        return middle;
      case IllusCardTypes.Large:
        return large;
    }
  }, [type]);
}

export interface IllusTagCoverProps extends PropsWithStyle {
  source: ImageSourcePropType;
  type: IllusCardTypes;
  name: string;
  total: number;
  onTouch?: () => void;
}

export function IllusTagCover({
  source,
  name,
  total,
  type,
  onTouch,
}: IllusTagCoverProps): React.ReactElement {
  const width = useWidthWithType(type);
  const navigation = useNavigation();
  const handleIllusCardTouch = useCallback(() => {
    console.log('click me');
    // @ts-ignore
    navigation.push('TagDetail', {
      source: source,
      tagName: name,
    });
  }, [name, navigation, source]);

  return (
    <View style={[scss.cmp_illus_cover, {width, marginTop: gap}]}>
      <ImageBackground style={scss.cover_image} source={source}>
        <TouchableWithoutFeedback onPress={handleIllusCardTouch}>
          <View style={scss.image_mask}>
            <View style={scss.cover_tag_block}>
              <Text style={scss.cover_text}>{name}</Text>
              <Text style={scss.cover_total_text}>+{total}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
}

interface FancyButtonProps extends PropsWithStyle, PropsWithChildren {
  onTouch?: () => void;
}

export function FancyButton({
  children,
  onTouch,
}: FancyButtonProps): React.ReactElement {
  const scaleAnimatedValue = useRef(new Animated.Value(0)).current;
  const [onTouchIn, onTouchOut, scaleAnimatedStyle] = useTouchBounceAnimated(
    scaleAnimatedValue,
    0.9,
  );
  return (
    <Animated.View style={scaleAnimatedStyle}>
      <DropShadow style={scss.fancy_button_shadow}>
        <TouchableWithoutFeedback
          onPress={onTouch}
          onPressIn={onTouchIn}
          onPressOut={onTouchOut}>
          <View style={scss.cmp_fancy_button}>
            <Text style={scss.fancy_button_text}>{children}</Text>
          </View>
        </TouchableWithoutFeedback>
      </DropShadow>
    </Animated.View>
  );
}
