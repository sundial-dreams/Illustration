import React, {useCallback} from 'react';

import {FlatList, View} from 'react-native';
import {Layout} from '../../utils';

import {Title} from '../../components/common';
import {IllustRankingList} from './components';
import IllustListItem from '../../components/Lists/IllustListItem';
import {feedImages} from '../../mock';

import scss from './style.scss';

function BestIllustSection(): React.ReactElement {
  return (
    <View style={[scss.best_illust_block, {height: Layout.height * 0.35}]}>
      <Title style={scss.best_illust_title}>Ranking</Title>
      <IllustRankingList />
    </View>
  );
}

const data = [{key: 'title'}, ...feedImages];

export default function Home(): React.ReactElement {
  const renderItem = useCallback(({item}) => {
    if (item.key === 'title') {
      return <Title style={scss.explore_title}>Explore</Title>;
    }
    return <IllustListItem item={item} />;
  }, []);

  return (
    <View style={[scss.home_screen, {height: Layout.height - 100}]}>
      <FlatList
        ListHeaderComponent={<BestIllustSection />}
        stickyHeaderIndices={[1]}
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
