import React from 'react';

import {ScrollView, StyleSheet, View} from 'react-native';
import {DefaultBackgroundColor, PaddingHorizontal} from '../../styles';
import {Layout} from '../../utils';
import {ExploreIllustratorCard} from './components';
import {Title} from '../../components';
import Feed from '../../components/Feed';

export default function Follows(): React.ReactElement {
  return (
    <View style={styles.follows}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
        stickyHeaderIndices={[1]}>
        <ExploreIllustratorCard style={styles.exploreCard} />
        <Title style={styles.title}>Newest</Title>
        <Feed withPadding={false} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  follows: {
    ...DefaultBackgroundColor,
    width: '100%',
    height: Layout.height - 100,
    paddingHorizontal: PaddingHorizontal,
  },
  exploreCard: {
    marginTop: 20,
  },
  title: {
    marginTop: 20,
    height: 30,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
