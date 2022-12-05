import React from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {Title} from '../../components/common';
import {IllustRankingList} from './components';
import {Layout} from '../../utils';
import IllustFlatList from '../../components/Lists/IllustFlatList';
import {feedImages} from '../../mock';
import scss from './style.scss';

export default function Home(): React.ReactElement {
  return (
    <View style={[scss.home_screen, {height: Layout.height - 100}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
        contentContainerStyle={{paddingBottom: 100}}>
        <View style={[scss.best_illust_block, {height: Layout.height * 0.35}]}>
          <Title style={scss.best_illust_title}>Illustration Lists</Title>
          <IllustRankingList />
        </View>
        <Title style={scss.explore_title}>Explore</Title>
        <IllustFlatList data={feedImages} />
      </ScrollView>
    </View>
  );
}
