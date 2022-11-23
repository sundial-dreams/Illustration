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
import {
  DefaultFontStyle,
  FlexCenterStyle,
  newShadow,
  PaddingHorizontal,
} from '../../styles';
import {Layout} from '../../utils';
import DropShadow from 'react-native-drop-shadow';
import {useTouchBounceAnimated} from '../../utils/hooks';
import {useNavigation} from '@react-navigation/native';

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

export interface IllusCardProps extends PropsWithStyle {
  source: ImageSourcePropType;
  type: IllusCardTypes;
  name: string;
  total: number;
  onTouch?: () => void;
}

export function IllusCard({
  source,
  name,
  total,
  type,
  onTouch,
}: IllusCardProps): React.ReactElement {
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
    <View style={[stylesOfIllusCard.illusCard, {width}]}>
      <ImageBackground style={stylesOfIllusCard.image} source={source}>
        <TouchableWithoutFeedback onPress={handleIllusCardTouch}>
          <View style={stylesOfIllusCard.mask}>
            <View style={stylesOfIllusCard.textWrapper}>
              <Text style={stylesOfIllusCard.text}>{name}</Text>
              <Text
                style={[stylesOfIllusCard.text, stylesOfIllusCard.totalText]}>
                +{total}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
}
const stylesOfIllusCard = StyleSheet.create({
  illusCard: {
    height: 110,
    overflow: 'hidden',
    borderRadius: 12,
    marginTop: gap,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  mask: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    ...FlexCenterStyle,
  },
  textWrapper: {
    width: '100%',
  },
  text: {
    ...DefaultFontStyle,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  totalText: {
    fontSize: 18,
    marginTop: 8,
  },
});

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
      <DropShadow style={stylesOfFancyButton.shadow}>
        <TouchableWithoutFeedback
          onPress={onTouch}
          onPressIn={onTouchIn}
          onPressOut={onTouchOut}>
          <View style={stylesOfFancyButton.fancyButton}>
            <Text style={stylesOfFancyButton.text}>{children}</Text>
          </View>
        </TouchableWithoutFeedback>
      </DropShadow>
    </Animated.View>
  );
}

const stylesOfFancyButton = StyleSheet.create({
  fancyButton: {
    width: 120,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'black',
    ...FlexCenterStyle,
  },
  text: {
    ...DefaultFontStyle,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shadow: newShadow(10, 0.2),
});
