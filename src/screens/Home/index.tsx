import React from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import AppHeaderBar from '../../components/AppHeaderBar';
import {Title} from '../../components';
import {DefaultBackgroundColor, PaddingHorizontal} from '../../styles';
import {IllusLists} from './components';
import {Layout} from '../../utils';
import Feed from '../../components/Feed';

export default function Home(): React.ReactElement {
  return (
    <View style={styles.home}>
      <View style={styles.main}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]}
          contentContainerStyle={{paddingBottom: 100}}>
          <View style={styles.illusListsContainer}>
            <Title style={styles.illusListsTitle}>Illustration Lists</Title>
            <IllusLists />
          </View>
          <Title style={styles.exploreTitle}>Explore</Title>
          <Feed />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    height: '100%',
    width: '100%',
    ...DefaultBackgroundColor,
  },
  main: {
    height: Layout.height - 100,
  },
  illusListsContainer: {
    width: '100%',
    height: Layout.height * 0.35,
    paddingTop: 10,
  },
  illusListsTitle: {
    marginLeft: PaddingHorizontal,
  },
  scrollView: {},
  exploreTitle: {
    paddingBottom: 10,
    marginLeft: PaddingHorizontal,
    backgroundColor: 'white',
  },
});
