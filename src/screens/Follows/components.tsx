import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {ContentWidth} from '../../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Avatar from '../../components/common/Avatar';
import {PropsWithStyle} from '../../utils/interface';
import scss from './style.scss';

const image1 = require('../../assets/images/avatar/avatar0.jpg');
const image2 = require('../../assets/images/avatar/avatar1.jpg');

export function ExploreIllustratorCard({
  style,
  onTouch,
}: {onTouch?: () => void} & PropsWithStyle): React.ReactElement {
  return (
    <TouchableWithoutFeedback onPress={onTouch}>
      <View style={[scss.cpm_explore_card, {width: ContentWidth}, style]}>
        <Icon
          suppressHighlighting={true}
          name={'account-group'}
          size={24}
          color={'#c7c7c7'}
        />
        <Text style={scss.explore_card_text} suppressHighlighting={true}>
          Explore Illustrator
        </Text>
        <View style={scss.explore_avatar_group}>
          <Avatar
            style={scss.avatar1}
            source={image1}
            size={40}
            touchable={false}
          />
          <Avatar
            style={scss.avatar2}
            source={image2}
            size={40}
            touchable={false}
          />
          <Avatar
            style={scss.avatar3}
            source={image1}
            size={40}
            touchable={false}
          />
        </View>
        <Icon
          suppressHighlighting={true}
          name={'chevron-right'}
          size={24}
          color={'#c7c7c7'}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
