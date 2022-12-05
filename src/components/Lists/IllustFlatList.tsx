import React, {useCallback} from 'react';
import {FlatList, FlatListProps} from 'react-native';
import IllustListItem, {IllustImageDataType} from './IllustListItem';

interface IllusFlatListProps
  extends Omit<FlatListProps<Array<IllustImageDataType>>, 'renderItem'> {}

export default function IllustFlatList(
  props: IllusFlatListProps,
): React.ReactElement {
  const renderItem = useCallback(
    ({item}) => <IllustListItem item={item} />,
    [],
  );
  return (
    <FlatList
      {...props}
      renderItem={renderItem}
      keyExtractor={(x, i) => String(i)}
      showsVerticalScrollIndicator={false}
    />
  );
}
