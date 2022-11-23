import React, {useCallback} from 'react';
import {
  FlatList,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import IllusItem, {IllusItemType} from './IllusItem';
import {PropsWithStyle} from '../utils/interface';
import {PaddingHorizontal} from '../styles';
import {feedImages} from '../mock';

interface FeedProps extends PropsWithStyle {
  data?: Array<Array<any>>;
  length?: number;
  withPadding?: boolean;
  scrollEnabled?: boolean;
  onScroll?: (events: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export default function Feed({
  withPadding = true,
  data = feedImages,
  scrollEnabled = true,
  onScroll,
  style,
}: FeedProps): React.ReactElement {
  const renderItem = useCallback(
    ({item}) => (
      <View
        style={[
          styles.illusItemWrapper,
          withPadding && {paddingHorizontal: PaddingHorizontal},
        ]}>
        {item.map((value, key) => (
          <IllusItem key={key} source={value!.source} type={value!.type} />
        ))}
      </View>
    ),
    [withPadding],
  );

  return (
    <FlatList
      contentContainerStyle={style}
      data={data}
      renderItem={renderItem}
      keyExtractor={(x, i) => String(i)}
      scrollEnabled={scrollEnabled}
      onScroll={onScroll}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  illusItemWrapper: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
