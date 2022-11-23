import React from 'react';

import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {AppHeaderBarWithBackButton} from '../../components/AppHeaderBar';
import {ContentWidth, Layout} from '../../utils';
import {
  DefaultBackgroundColor,
  DefaultFontStyle,
  FlexCenterStyle,
  PaddingHorizontal,
} from '../../styles';
import Avatar from '../../components/Avatar';
import {DetailCard, FollowButton} from './components';
import Feed from '../../components/Feed';

const image1 = require('../../assets/images/avatar/avatar0.jpg');

export default function Profile(): React.ReactElement {
  return (
    <View style={styles.profile}>
      <AppHeaderBarWithBackButton title={'Profile'} />
      <View style={styles.main}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[4]}>
          <View style={styles.avatarWrapper}>
            <Avatar onTorch={() => {}} source={image1} size={80} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.username}>Sundial Dreams</Text>
            <Text style={styles.homepage}>Pixiv: http://</Text>
          </View>
          <View style={styles.followButtonWrapper}>
            <FollowButton />
          </View>
          <DetailCard
            style={styles.detailCard}
            details={[
              {title: 'Follows', value: '1.4w'},
              {title: 'Following', value: '1.2w'},
              {
                title: 'Star',
                value: '1.3w',
              },
            ]}
          />
          <View style={styles.illusFeedTitleWrapper}>
            <View style={styles.illusFeedTitle}>
              <Text style={styles.illusTitle}>Illustration</Text>
              <Text style={[styles.illusTitle, {color: 'black'}]}> 260</Text>
            </View>
          </View>
          <Feed />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    height: '100%',
    width: '100%',
    ...DefaultBackgroundColor,
  },
  main: {
    width: '100%',
    height: Layout.height - 100,
  },
  avatarWrapper: {
    height: 80,
    ...FlexCenterStyle,
  },
  userInfo: {
    marginTop: 10,
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  username: {
    ...DefaultFontStyle,
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  homepage: {
    ...DefaultFontStyle,
    fontSize: 16,
    color: '#c7c7c7',
  },
  followButtonWrapper: {
    ...FlexCenterStyle,
    marginTop: 15,
  },
  detailCard: {
    marginTop: 15,
  },
  illusFeedTitleWrapper: {
    width: '100%',
    paddingHorizontal: PaddingHorizontal,
    marginTop: 15,
    backgroundColor: 'white',
    paddingBottom: 5,
  },
  illusFeedTitle: {
    height: 36,
    width: ContentWidth,
    borderRadius: 5,
    backgroundColor: '#FAFAFA',
    ...FlexCenterStyle,
    flexDirection: 'row',
  },
  illusTitle: {
    ...DefaultFontStyle,
    fontSize: 16,
    color: '#c7c7c7',
    fontWeight: 'bold',
  },
});
