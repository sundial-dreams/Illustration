import React from 'react';

import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {AppHeaderBarWithBackButton} from '../../components/HeaderBar/AppHeaderBar';
import {ContentWidth, Layout} from '../../utils';
import {
  DefaultBackgroundColor,
  DefaultFontStyle,
  FlexCenterStyle,
  PaddingHorizontal,
} from '../../styles';
import Avatar from '../../components/common/Avatar';
import {DataDetailCard} from './components';
import IllustFlatList from '../../components/Lists/IllustFlatList';
import {feedImages} from '../../mock';
import {FollowButton} from '../../components/common';
import scss from './style.scss';

const image1 = require('../../assets/images/avatar/avatar0.jpg');
const details = [
  {title: 'Follows', value: '1.4w'},
  {title: 'Following', value: '1.2w'},
  {
    title: 'Star',
    value: '1.3w',
  },
];
export default function IllustratorProfile(): React.ReactElement {
  return (
    <View style={scss.illustrator_profile_screen}>
      <AppHeaderBarWithBackButton title={'Profile'} />
      <View style={scss.main_profile}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[4]}>
          <View style={scss.illustrator_avatar_block}>
            <Avatar source={image1} size={80} />
          </View>
          <View style={scss.illustrator_detail}>
            <Text style={scss.username}>Sundial Dreams</Text>
            <Text style={scss.description}>Pixiv: http://</Text>
          </View>
          <View style={scss.follow_button_block}>
            <FollowButton />
          </View>
          <DataDetailCard style={scss.data_detail_card} details={details} />
          <View style={scss.illus_count_title_block}>
            <View style={[scss.illus_count_title, {width: ContentWidth}]}>
              <Text style={scss.title_text}>Illustration</Text>
              <Text style={[scss.title_text, {color: 'black'}]}> 260</Text>
            </View>
          </View>
          <IllustFlatList data={feedImages} />
        </ScrollView>
      </View>
    </View>
  );
}
