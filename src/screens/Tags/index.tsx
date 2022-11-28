import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {DefaultBackgroundColor, PaddingHorizontal} from '../../styles';
import {Layout} from '../../utils';
import {FancyButton, IllusTagCover, IllusTagCoverProps} from './components';
import scss from './style.scss';

import {tagItems} from '../../mock';

export default function Tags() {
  const elems = tagItems.map((value, i) => {
    let tagElems = value.map((tag, key) => (
      <IllusTagCover key={key} {...(tag as any as IllusTagCoverProps)} />
    ));
    return (
      <View key={i} style={scss.tag_items_container}>
        {tagElems}
      </View>
    );
  });
  return (
    <View style={[scss.tags_screen, {height: Layout.height - 100}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {elems}
        <View style={scss.all_button_block}>
          <FancyButton>All</FancyButton>
        </View>
      </ScrollView>
    </View>
  );
}
