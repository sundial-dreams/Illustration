import React, {useCallback} from 'react';
import {FlatList, View} from 'react-native';

import scss from './style.scss';
import {Layout} from '../../utils';
import {ExploreIllustratorCard} from './components';
import {useNavigation} from '@react-navigation/native';
import {feedImages} from '../../mock';
import IllustListItem from '../../components/Lists/IllustListItem';
import {Title} from '../../components/common';

function ExploreIllustrator(): React.ReactElement {
  const navigation = useNavigation();
  const onExploreTouch = useCallback(() => {
    // @ts-ignore
    navigation.push('Explore', {});
  }, []);
  return (
    <View style={scss.explore_card}>
      <ExploreIllustratorCard onTouch={onExploreTouch} />
    </View>
  );
}

const data = [{key: 'title'}, ...feedImages];

export default function Follows(): React.ReactElement {
  const renderItem = useCallback(({item}) => {
    if (item.key === 'title') {
      return <Title style={scss.title}>Newest</Title>;
    }

    return <IllustListItem item={item} />;
  }, []);

  return (
    <View style={[scss.follows_screen, {height: Layout.height - 100}]}>
      <FlatList
        ListHeaderComponent={<ExploreIllustrator />}
        data={data}
        stickyHeaderIndices={[1]}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
      />
    </View>
  );
}
