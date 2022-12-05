import React, {useCallback} from 'react';

import {FlatList, Text, View} from 'react-native';

import scss from './style.scss';
import {AppHeaderBarWithBackButton} from '../../components/HeaderBar/AppHeaderBar';
import Avatar from '../../components/common/Avatar';
import {FollowButton} from '../../components/common';
import {DataDetailCard} from './components';
import {ContentWidth, Layout} from '../../utils';
import {feedImages} from '../../mock';
import IllustListItem from '../../components/Lists/IllustListItem';
const image1 = require('../../assets/images/avatar/avatar0.jpg');
const details = [
  {title: 'Follows', value: '1.4w'},
  {title: 'Following', value: '1.2w'},
  {
    title: 'Star',
    value: '1.3w',
  },
];

function IllustratorDetailSection(): React.ReactElement {
  return (
    <>
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
    </>
  );
}

function Count(): React.ReactElement {
  return (
    <View style={scss.illus_count_title_block}>
      <View style={[scss.illus_count_title, {width: ContentWidth}]}>
        <Text style={scss.title_text}>Illustration</Text>
        <Text style={[scss.title_text, {color: 'black'}]}> 260</Text>
      </View>
    </View>
  );
}

const data = [{key: 'title'}, ...feedImages];

export default function IllustratorProfile(): React.ReactElement {
  const renderItem = useCallback(({item}) => {
    if (item.key === 'title') {
      return <Count />;
    }
    return <IllustListItem item={item} />;
  }, []);

  return (
    <View style={scss.illustrator_profile_screen}>
      <AppHeaderBarWithBackButton title={'Profile'} />
      <View style={[scss.main_profile, {height: Layout.height - 100}]}>
        <FlatList
          ListHeaderComponent={<IllustratorDetailSection />}
          data={data}
          renderItem={renderItem}
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
