import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {PropsWithStyle} from '../../utils/interface';
import {useNavigation} from '@react-navigation/native';
import scss from './style.scss';

interface DetailCardProps extends PropsWithStyle {
  details: Array<{title: string; value: string; canTouch?: boolean}>;
}

export function DataDetailCard({
  details,
  style,
}: DetailCardProps): React.ReactElement {
  const navigation = useNavigation();
  const onFollowingTouch = useCallback(() => {
    // @ts-ignore
    navigation.push('Following', {
      illustrator: {},
    });
  }, []);
  const elems = details.map((v, i) => {
    const elem = (
      <View
        style={[
          scss.data_detail,
          i === details.length - 1 && {
            borderRightWidth: 0,
          },
          i === 0 && {borderLeftWidth: 0},
        ]}
        key={i}>
        <Text style={scss.data_detail_value}>{v.value}</Text>
        <Text style={scss.data_detail_title}>{v.title}</Text>
      </View>
    );
    if (v.title.toLowerCase() === 'following') {
      return (
        <TouchableWithoutFeedback onPress={onFollowingTouch}>
          {elem}
        </TouchableWithoutFeedback>
      );
    }
    return elem;
  });
  return <View style={[scss.cmp_data_detail_card, style]}>{elems}</View>;
}
