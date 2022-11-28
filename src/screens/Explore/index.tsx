import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {AppHeaderBarWithBackButton} from '../../components/HeaderBar/AppHeaderBar';
import {illustrators} from '../../mock';
import {DefaultBackgroundColor} from '../../styles';
import {IllustratorCard} from './components';

import scss from './style.scss';

export default function Explore(): React.ReactElement {
  const renderItem = useCallback(({item}) => <IllustratorCard {...item} />, []);
  return (
    <View style={scss.explore_screen}>
      <AppHeaderBarWithBackButton title={'Explore'} />
      <FlatList data={illustrators} renderItem={renderItem} />
    </View>
  );
}
