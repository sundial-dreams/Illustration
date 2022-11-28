import React from 'react';

import {StyleSheet, View} from 'react-native';
import {DeleteButton, SearchBox} from './components';
import {Layout} from '../../utils';

import {Tag, Title} from '../../components/common';
import {tagNames} from '../../mock';
import scss from './style.scss';

export default function Find(): React.ReactElement {
  const recommendTagsElem = tagNames.map((name, i) => (
    <Tag key={i} style={scss.tag_item}>
      {name}
    </Tag>
  ));
  const historyTagsElem = tagNames.map((name, i) => (
    <Tag key={i} style={scss.tag_item} withBackground>
      {name}
    </Tag>
  ));
  return (
    <View style={[scss.find_screen, {height: Layout.height - 100}]}>
      <SearchBox />
      <View style={scss.tags_block}>{recommendTagsElem}</View>
      <View style={scss.history_block}>
        <Title>History</Title>
        {historyTagsElem}
        <View style={scss.delete_button_block}>
          <DeleteButton onTouch={() => {}}>{'delete all'}</DeleteButton>
        </View>
      </View>
    </View>
  );
}
