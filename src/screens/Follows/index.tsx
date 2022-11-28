import React, {useCallback} from 'react';

import {ScrollView, StyleSheet, View} from 'react-native';
import {DefaultBackgroundColor, PaddingHorizontal} from '../../styles';
import {Layout} from '../../utils';
import {ExploreIllustratorCard} from './components';
import {Title} from '../../components/common';
import IllusFlatList from '../../components/Lists/IllusFlatList';
import {feedImages} from '../../mock';
import {useNavigation} from '@react-navigation/native';
import scss from './style.scss';

export default function Follows(): React.ReactElement {
  const navigation = useNavigation();
  const onExploreTouch = useCallback(() => {
    // @ts-ignore
    navigation.push('Explore', {});
  }, []);
  return (
    <View style={[scss.follows_screen, {height: Layout.height - 100}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
        stickyHeaderIndices={[1]}>
        <View style={scss.explore_card}>
          <ExploreIllustratorCard onTouch={onExploreTouch} />
        </View>
        <Title style={scss.title}>Newest</Title>
        <IllusFlatList data={feedImages} />
      </ScrollView>
    </View>
  );
}
