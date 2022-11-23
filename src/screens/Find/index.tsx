import React from 'react';

import {StyleSheet, View} from 'react-native';
import {DeleteButton, SearchBox} from './components';
import {Layout} from '../../utils';
import {
  DefaultBackgroundColor,
  FlexCenterStyle,
  PaddingHorizontal,
} from '../../styles';
import {Tag, Title} from '../../components';

const tags = [
  'Re:0',
  'HuTao',
  'XinHai',
  'Yuri',
  'JK',
  'Ark',
  'Genshin Impact',
  'Honkai 3rd',
];

export default function Find(): React.ReactElement {
  const recommendTagsElem = tags.map((name, i) => (
    <Tag key={i} style={styles.tag}>
      {name}
    </Tag>
  ));
  const historyTagsElem = tags.map((name, i) => (
    <Tag key={i} style={styles.tag} withBackground={true}>
      {name}
    </Tag>
  ));
  return (
    <View style={styles.find}>
      <SearchBox />
      <View style={styles.tagsWrapper}>{recommendTagsElem}</View>
      <View style={styles.historyWrapper}>
        <Title>History</Title>
        {historyTagsElem}
        <View style={styles.deleteButtonWrapper}>
          <DeleteButton onTouch={() => {}}>{'delete all'}</DeleteButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  find: {
    width: '100%',
    height: Layout.height - 100,
    paddingHorizontal: PaddingHorizontal,
    ...DefaultBackgroundColor,
  },
  tagsWrapper: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    marginRight: 10,
  },
  historyWrapper: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  deleteButtonWrapper: {
    width: '100%',
    marginTop: 10,
    ...FlexCenterStyle,
  },
});
