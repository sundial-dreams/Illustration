import React, {useCallback, useMemo, useRef} from 'react';

import {
  Animated,
  Image,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Avatar from '../../components/common/Avatar';
import {PropsWithStyle} from '../../utils/interface';
import {FollowButton} from '../../components/common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropShadow from 'react-native-drop-shadow';
import {ContentWidth} from '../../utils';
import {illustrators} from '../../mock';
import {useTouchBounceAnimated} from '../../utils/hooks';
import {useNavigation} from '@react-navigation/native';
import scss from './style.scss';

export enum IllusSizeType {
  Small,
  Middle,
}

const Padding = 10;
const IllusMargin = 5;
const IconSize = 20;

const small = (ContentWidth - 4 * IllusMargin - 2 * Padding - IconSize) / 4;

const middle = (3 * small + IllusMargin) / 2;

function useWidthFromType(type: IllusSizeType) {
  return useMemo(() => {
    switch (type) {
      case IllusSizeType.Small:
        return small;
      case IllusSizeType.Middle:
        return middle;
    }
  }, [type]);
}

function IllusImage({
  type,
  source,
  total,
  isLast = false,
}: {
  type: IllusSizeType;
  source: ImageSourcePropType;
  total?: number;
  isLast?: boolean;
}): React.ReactElement {
  const width = useWidthFromType(type);
  const image = (
    <Image
      source={source}
      style={[scss.cpm_illus_image, {width, marginRight: IllusMargin}]}
    />
  );
  const maskImage = (
    <ImageBackground
      source={source}
      style={[scss.cpm_illus_image, {width, marginRight: IllusMargin}]}>
      <View style={scss.illus_image_mask}>
        <Text style={scss.illus_image_total}>+{total}</Text>
      </View>
    </ImageBackground>
  );
  return isLast ? maskImage : image;
}

export interface IllustratorCard extends PropsWithStyle {
  avatar: ImageSourcePropType;
  username: string;
  illustrations: {type: IllusSizeType; source: ImageSourcePropType}[];
  totalIllustration: number;
}

export function IllustratorCard({
  avatar,
  username,
  illustrations,
  totalIllustration,
}: IllustratorCard): React.ReactElement {
  const scaleAnimation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const onProfileTouch = useCallback(() => {
    // @ts-ignore
    navigation.push('Profile', {username});
  }, []);

  const [onTouchIn, onTouchOut, scaleAnimationStyle] = useTouchBounceAnimated(
    scaleAnimation,
    0.95,
  );

  const illusElems = illustrations.map((v, i) => (
    <IllusImage
      key={i}
      {...v}
      isLast={i === illustrations.length - 1}
      total={totalIllustration}
    />
  ));

  return (
    <Animated.View style={[scss.cpm_illustrator_card, scaleAnimationStyle]}>
      <View style={scss.card_container}>
        <DropShadow style={[scss.card_shadow, {width: ContentWidth}]}>
          <View style={scss.card_background} />
        </DropShadow>
        <View style={scss.card_user_detail}>
          <View style={scss.card_user_avatar_block}>
            <Avatar onTorch={() => {}} source={avatar} size={60} />
            <Text style={scss.card_username}>{username}</Text>
          </View>
          <FollowButton size={14} followed={false} />
        </View>
        <TouchableWithoutFeedback
          onPress={onProfileTouch}
          onPressIn={onTouchIn}
          onPressOut={onTouchOut}>
          <View style={scss.card_illustration_block}>
            <View style={scss.card_illustrations}>{illusElems}</View>
            <View style={scss.card_enter_icon_block}>
              <Icon name={'chevron-right'} size={IconSize} color={'black'} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Animated.View>
  );
}
