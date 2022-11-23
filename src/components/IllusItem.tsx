import React, {useCallback, useMemo} from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ContentWidth} from '../utils';
import {PropsWithStyle} from '../utils/interface';
import {useNavigation} from '@react-navigation/native';

export enum IllusItemType {
  Small,
  Middle,
  MiddleLarge,
  Large,
}

const gap = 10;

const [small, middle, middleLarge, large] = [
  120,
  (ContentWidth - gap) / 2,
  ContentWidth - gap - 120,
  ContentWidth,
];

function useWidthWithType(type: IllusItemType): number {
  return useMemo(() => {
    switch (type) {
      case IllusItemType.Small:
        return small;
      case IllusItemType.Middle:
        return middle;
      case IllusItemType.MiddleLarge:
        return middleLarge;
      case IllusItemType.Large:
        return large;
    }
  }, [type]);
}

interface IllusItemProps extends PropsWithStyle {
  onTouch?: () => void;
  source: ImageSourcePropType;
  type: IllusItemType;
}

export default function IllusItem({
  source,
  type,
  onTouch,
}: IllusItemProps): React.ReactElement {
  const width = useWidthWithType(type);
  const navigation = useNavigation();

  const onIllusItemTouch = useCallback(() => {
    // @ts-ignore
    navigation.push('Illus', {source, type});
    onTouch && onTouch!();
  }, [navigation, onTouch, source, type]);

  return (
    <View style={[styles.illusItem, {width}]}>
      <TouchableWithoutFeedback onPress={onIllusItemTouch}>
        <ImageBackground style={styles.image} source={source} />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  illusItem: {
    height: 140,
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: gap,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
