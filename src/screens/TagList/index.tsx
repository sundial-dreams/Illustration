import React, {useCallback, useState} from 'react';

import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FlatListTabView from '../../components/Lists/FlatListTabView';
import {BackButton, Tag, Title} from '../../components/common';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  DefaultBackgroundColor,
  DefaultFontStyle,
  PaddingHorizontal,
} from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import scss from './style.scss';

import {tagNames} from '../../mock';

function TagContent() {
  const route = useRoute();
  const tagName = (route.params as any).tagName;
  const source = (route.params as any).source;

  return (
    <View style={scss.tag_content}>
      <View style={scss.tag_name_block}>
        <Text style={scss.tag_name}>#{tagName}</Text>
      </View>
      <View style={scss.tag_detail}>
        <View style={scss.tag_total}>
          <Icon name={'image'} size={14} color={'black'} />
          <Text style={scss.tag_total_text}> 13000</Text>
        </View>
        <View style={scss.tag_description_block}>
          <Text style={scss.tag_description_text}>
            Genshin Impact is an anime-style open world adventure game with a
            unique elemental reaction mechanism.
          </Text>
        </View>
      </View>
      <View style={scss.related_tags_block}>
        <Title>{'Related Tags'}</Title>
        <View style={scss.tags}>
          {tagNames.map((v, i) => (
            <Tag style={scss.tag} key={i} withBackground={true} size={14}>
              {v}
            </Tag>
          ))}
        </View>
      </View>
    </View>
  );
}

const tabItems = ['Newest', 'Popular', 'Oldest'];

type TagListRouteType = RouteProp<{
  params: {tagName: string; source: ImageSourcePropType};
}>;

export default function TagList() {
  const route = useRoute<TagListRouteType>();
  const insets = useSafeAreaInsets();

  const [scrollY, setScrollY] = useState(useSharedValue(0));
  const tagName = route.params.tagName;
  const source = route.params.source;

  const makeScrollTrans = useCallback(
    (scrollTrans: Animated.SharedValue<number>) => {
      setScrollY(scrollTrans);
    },
    [],
  );

  const headerOpacity = useDerivedValue(() => {
    const moveDistance = 50;
    return interpolate(
      scrollY.value,
      [0, moveDistance],
      [0, 1],
      Extrapolation.CLAMP,
    );
  });

  const headerTitleOpacity = useDerivedValue(() => {
    const moveDistance = 150;
    return interpolate(
      scrollY.value,
      [100, moveDistance],
      [0, 1],
      Extrapolation.CLAMP,
    );
  });

  const headerStyle = useAnimatedStyle(() => {
    return {opacity: headerOpacity.value};
  });

  const headerTitleStyle = useAnimatedStyle(() => {
    return {opacity: headerTitleOpacity.value};
  });

  return (
    <View style={scss.tag_list_screen}>
      <View style={scss.tag_cover_block}>
        <ImageBackground style={scss.tag_cover} source={source} />
      </View>
      <View style={[scss.header_bar, {paddingTop: insets.top}]}>
        <Animated.View style={[scss.header_bar_background, headerStyle]} />
        <BackButton />
        <Animated.Text style={[scss.header_bar_tag_name, headerTitleStyle]}>
          #{tagName}
        </Animated.Text>
        <View style={scss.none} />
      </View>
      <FlatListTabView
        frozeTop={0}
        makeScrollTrans={makeScrollTrans}
        renderHeader={TagContent}
        tabItems={tabItems}
      />
    </View>
  );
}
