import React, {useCallback} from 'react';
import {FlatList, FlatListProps} from 'react-native';
import IllusListItem, {IllusImageDataType} from './IllusItem';

interface IllusFlatListProps
  extends Omit<FlatListProps<Array<IllusImageDataType>>, 'renderItem'> {}

export default function IllusFlatList(
  props: IllusFlatListProps,
): React.ReactElement {
  const renderItem = useCallback(({item}) => <IllusListItem item={item} />, []);
  return (
    <FlatList
      {...props}
      renderItem={renderItem}
      keyExtractor={(x, i) => String(i)}
      showsVerticalScrollIndicator={false}
    />
  );
}
