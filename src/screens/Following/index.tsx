import React, {useCallback} from 'react';

import {FlatList, StyleSheet, View} from 'react-native';
import {AppHeaderBarWithBackButton} from '../../components/HeaderBar/AppHeaderBar';
import {followingUser} from '../../mock';
import {IllustratorListItem} from './components';
import scss from './style.scss';

export default function Following(): React.ReactElement {
  const renderItem = useCallback(
    ({item}) => <IllustratorListItem {...item} />,
    [],
  );
  return (
    <View style={scss.following_screen}>
      <AppHeaderBarWithBackButton title={'Following'} />
      <FlatList
        style={scss.follow_list}
        data={followingUser}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
