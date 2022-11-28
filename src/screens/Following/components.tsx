import React from 'react';
import {View, Text, StyleSheet, ImageSourcePropType} from 'react-native';
import Avatar from '../../components/common/Avatar';
import {PropsWithOnTouch, PropsWithStyle} from '../../utils/interface';
import {FollowButton} from '../../components/common';
import {DefaultFontStyle, PaddingHorizontal} from '../../styles';
import scss from './style.scss';

const image1 = require('../../assets/images/avatar/avatar0.jpg');

const Height = 60;

export interface IllustratorListItemProps extends PropsWithStyle {
  illustrator: {
    avatar: ImageSourcePropType;
  } & PropsWithOnTouch;
  username: string;
  star: number;
  followed: number;
}

export function IllustratorListItem({
  illustrator,
  username,
  star,
  followed,
}: IllustratorListItemProps): React.ReactElement {
  return (
    <View style={[scss.follow_illustrator, {height: Height}]}>
      <View style={scss.illustrator_detail_container}>
        <Avatar onTorch={() => {}} source={illustrator.avatar} size={Height} />
        <View style={scss.detail}>
          <Text style={scss.username}>{username}</Text>
          <View style={scss.data_container}>
            <Text style={scss.text}>{star}</Text>
            <Text style={scss.text}> Star | </Text>
            <Text style={scss.text}>{followed}</Text>
            <Text style={scss.text}> Followed</Text>
          </View>
        </View>
      </View>
      <FollowButton />
    </View>
  );
}
