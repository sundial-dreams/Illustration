import React, {PropsWithChildren, useRef} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {PropsWithOnTouch, PropsWithStyle} from '../../utils/interface';
import DropShadow from 'react-native-drop-shadow';
import {
  DefaultFontStyle,
  FlexCenterStyle,
  newShadow,
  PaddingHorizontal,
} from '../../styles';
import {useTouchBounceAnimated} from '../../utils/hooks';

export function FollowButton({
  followed = true,
  onTouch,
  style,
}: {followed?: boolean} & PropsWithStyle &
  PropsWithOnTouch): React.ReactElement {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [onTouchIn, onTouchOut, animatedStyle] = useTouchBounceAnimated(
    animatedValue,
    0.95,
  );

  return (
    <DropShadow style={stylesOfFollowButton.shadow}>
      <TouchableWithoutFeedback
        onPress={onTouch}
        onPressIn={onTouchIn}
        onPressOut={onTouchOut}>
        <Animated.View
          style={[stylesOfFollowButton.followButton, style, animatedStyle]}>
          <Text style={stylesOfFollowButton.text}>
            {followed ? 'Following' : 'Follow'}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </DropShadow>
  );
}

const stylesOfFollowButton = StyleSheet.create({
  shadow: newShadow(10, 0.2),
  followButton: {
    paddingHorizontal: 10,
    height: 28,
    ...FlexCenterStyle,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  text: {
    ...DefaultFontStyle,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

interface DetailCardProps extends PropsWithStyle {
  details: Array<{title: string; value: string; canTouch?: boolean}>;
}

export function DetailCard({
  details,
  style,
}: DetailCardProps): React.ReactElement {
  const elems = details.map((v, i) => (
    <View
      style={[
        stylesOfDetailCard.detail,
        i === details.length - 1 && {
          borderRightWidth: 0,
        },
        i === 0 && {borderLeftWidth: 0},
      ]}
      key={i}>
      <Text style={stylesOfDetailCard.value}>{v.value}</Text>
      <Text style={stylesOfDetailCard.title}>{v.title}</Text>
    </View>
  ));
  return <View style={[stylesOfDetailCard.detailCard, style]}>{elems}</View>;
}

const stylesOfDetailCard = StyleSheet.create({
  detailCard: {
    width: '100%',
    paddingHorizontal: PaddingHorizontal,
    height: 30,
    flexDirection: 'row',
  },
  detail: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRightWidth: 0.5,
    borderRightColor: 'black',
    borderLeftWidth: 0.5,
    borderLeftColor: 'black',
  },
  title: {
    ...DefaultFontStyle,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#c7c7c7',
  },
  value: {
    ...DefaultFontStyle,
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
  },
});
