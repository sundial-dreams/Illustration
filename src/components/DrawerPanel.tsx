import React from 'react';

import {StyleSheet, View} from 'react-native';

export default function DrawerPanel() {
  return <View style={styles.drawerPanel} />;
}
const styles = StyleSheet.create({
  drawerPanel: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
});
