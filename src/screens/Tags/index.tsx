import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import AppHeaderBar from '../../components/AppHeaderBar';
import {DefaultBackgroundColor, PaddingHorizontal} from '../../styles';
import {Layout} from '../../utils';
import {
  FancyButton,
  IllusCard,
  IllusCardProps,
  IllusCardTypes,
} from './components';

const tagItems: Array<[IllusCardProps, IllusCardProps?, IllusCardProps?]> = [
  [
    {
      name: 'Genshin Impact',
      total: 2000,
      type: IllusCardTypes.Large,
      source: require('../../assets/images/2.jpg'),
    },
  ],
  [
    {
      name: 'Girl',
      total: 2000,
      type: IllusCardTypes.Small,
      source: require('../../assets/images/1.jpg'),
    },
    {
      name: 'Cat Ear',
      total: 3000,
      type: IllusCardTypes.Middle,
      source: require('../../assets/images/4.jpg'),
    },
  ],
  [
    {
      name: 'JK',
      total: 400,
      type: IllusCardTypes.Middle,
      source: require('../../assets/images/5.jpg'),
    },
    {
      name: 'Honkai 3rd',
      total: 200,
      type: IllusCardTypes.Small,
      source: require('../../assets/images/9.jpg'),
    },
  ],
  [
    {
      name: 'HuTao',
      total: 100,
      type: IllusCardTypes.Small,
      source: require('../../assets/images/10.jpg'),
    },
    {
      name: 'XinHai',
      total: 220,
      type: IllusCardTypes.Small,
      source: require('../../assets/images/8.jpg'),
    },
    {
      name: 'HuTao',
      total: 100,
      type: IllusCardTypes.Small,
      source: require('../../assets/images/11.jpg'),
    },
  ],
  [
    {
      name: 'Yuri',
      total: 1000,
      type: IllusCardTypes.Middle,
      source: require('../../assets/images/3.jpg'),
    },
    {
      name: 'Ark',
      total: 200,
      type: IllusCardTypes.Small,
      source: require('../../assets/images/7.jpg'),
    },
  ],
];

export default function Tags() {
  const elems = tagItems.map((value, i) => {
    let tagElems = value.map((tag, key) => (
      <IllusCard key={key} {...(tag as any as IllusCardProps)} />
    ));
    return (
      <View key={i} style={styles.tagItemsContainer}>
        {tagElems}
      </View>
    );
  });
  return (
    <View style={styles.tags}>
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {elems}
          <View style={styles.allButtonWrapper}>
            <FancyButton>All</FancyButton>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tags: {
    height: '100%',
    width: '100%',
    ...DefaultBackgroundColor,
  },
  main: {
    height: Layout.height - 100,
  },
  tagItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: PaddingHorizontal,
  },
  allButtonWrapper: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
