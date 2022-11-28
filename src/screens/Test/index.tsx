import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import FlatListTabView from '../../components/Lists/FlatListTabView';
import {DefaultBackgroundColor} from '../../styles';

function Header() {
  return (
    <View style={styles.headerBar}>
      <Text>Hello world</Text>
    </View>
  );
}
const tabItems = ['A', 'B', 'C'];

export default function Test() {
  return (
    <View style={styles.app}>
      <FlatListTabView renderHeader={Header} tabItems={tabItems} />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    width: '100%',
    height: '100%',
    ...DefaultBackgroundColor,
  },
  headerBar: {
    width: '100%',
    height: 200,
    backgroundColor: 'green',
  },
});
