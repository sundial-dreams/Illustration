import React from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {Title} from '../../components/common';
import {IllusLists} from './components';
import {Layout} from '../../utils';
import IllusFlatList from '../../components/Lists/IllusFlatList';
import {feedImages} from '../../mock';
import scss from './style.scss';

export default function Home(): React.ReactElement {
  return (
    <View style={[scss.home_screen, {height: Layout.height - 100}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
        contentContainerStyle={{paddingBottom: 100}}>
        <View style={[scss.illus_lists_block, {height: Layout.height * 0.35}]}>
          <Title style={scss.illus_lists_title}>Illustration Lists</Title>
          <IllusLists />
        </View>
        <Title style={scss.explore_title}>Explore</Title>
        <IllusFlatList data={feedImages} />
      </ScrollView>
    </View>
  );
}
