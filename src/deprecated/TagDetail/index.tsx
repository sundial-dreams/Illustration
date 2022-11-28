import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
} from 'react-native';
import {BackButton, Tag, Title} from '../../components/common';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  DefaultBackgroundColor,
  DefaultFontStyle,
  PaddingHorizontal,
} from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IllusFeedTabView, {IllusTabBar} from '../IllusFeedTabView';
import {useRoute} from '@react-navigation/native';
import useAnimatedValue from '../../utils/hooks';
import {createAnimatedEventForScrollY} from '../../utils/animated';
const image2 = require('../../assets/images/2.jpg');

const tags = [
  'Re:0',
  'HuTao',
  'XinHai',
  'Yuri',
  'JK',
  'Ark',
  'Genshin Impact',
  'Honkai 3rd',
];

const tabItems = ['Newest', 'Popular', 'Oldest'];

let oldOffsetY = 0;

export default function TagDetail(): React.ReactElement {
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const scrollView = useRef<ScrollView>(null);

  const animatedBackgroundValue = useAnimatedValue(0);
  const animatedTextOpacityValue = useAnimatedValue(0);

  const [nestedScrollViewEnabled, setNestedScrollViewEnabled] = useState(true);

  const [scrollViewEnabled, setScrollViewEnabled] = useState(true);

  const nestedBeginScrollOffsetY = useRef(0);

  const beginScrollOffsetY = useRef(0);

  const source = (route.params as any).source;
  const tagName = (route.params as any).tagName;

  const backgroundAnimatedEvent = useMemo(
    () => createAnimatedEventForScrollY(animatedBackgroundValue),
    [animatedBackgroundValue],
  );

  const textOpacityAnimatedEvent = useMemo(
    () => createAnimatedEventForScrollY(animatedTextOpacityValue),
    [animatedTextOpacityValue],
  );

  const animatedBackgroundStyle = useMemo(
    () =>
      animatedBackgroundValue.interpolate({
        inputRange: [0, 150 - 100],
        outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 255)'],
      }),
    [animatedBackgroundValue],
  );

  const animatedTextOpacityStyle = useMemo(
    () =>
      animatedTextOpacityValue.interpolate({
        inputRange: [0, 150 - 100],
        outputRange: [0, 1],
      }),
    [animatedTextOpacityValue],
  );

  useEffect(() => {
    const scrollElem = scrollView.current;
    scrollElem!.scrollTo({y: -100, animated: false});
  }, []);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      backgroundAnimatedEvent(event);
      textOpacityAnimatedEvent(event);
      const distance = 150 + 100 - 100;
      const direction = offsetY - beginScrollOffsetY.current;
      return;
    },
    [backgroundAnimatedEvent, textOpacityAnimatedEvent],
  );

  const handleNestedScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const distance = 150 + 100 - 100;
      const direction = offsetY - nestedBeginScrollOffsetY.current;
      if (nestedBeginScrollOffsetY.current <= 5 && direction > 0) {
        scrollView.current!.scrollTo({y: distance});
        return;
      }

      if (offsetY < 0) {
        scrollView.current!.scrollTo({y: -100});
      }
    },
    [],
  );

  const handleNestedScrollBeginDrag = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      nestedBeginScrollOffsetY.current = event.nativeEvent.contentOffset.y;
    },
    [],
  );

  const handleScrollBeginDrag = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      beginScrollOffsetY.current = event.nativeEvent.contentOffset.y;
    },
    [],
  );

  return (
    <View style={styles.tagDetail}>
      <Animated.View
        style={[
          styles.headerBar,
          {paddingTop: insets.top, backgroundColor: animatedBackgroundStyle},
        ]}>
        <BackButton />
        <Animated.Text
          style={[
            styles.headerBarTagName,
            {opacity: animatedTextOpacityStyle},
          ]}>
          #{tagName}
        </Animated.Text>
        <View style={styles.none} />
      </Animated.View>
      <Image style={styles.cover} source={source} />
      <ScrollView
        ref={scrollView}
        contentContainerStyle={{
          paddingTop: 150 - 100,
          flexGrow: 1,
        }}
        scrollEventThrottle={1}
        onScroll={handleScroll}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[3]}
        bounces={false}
        contentInset={{top: 100}}>
        <IllusFeedTabView
          tabItems={tabItems}
          scrollEnabled={nestedScrollViewEnabled}
          onScroll={handleNestedScroll}
          onScrollBeginDrag={handleNestedScrollBeginDrag}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tagDetail: {
    width: '100%',
    height: '100%',
    ...DefaultBackgroundColor,
  },
  headerBar: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PaddingHorizontal / 2,
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 10,
  },
  headerBarTagName: {
    ...DefaultFontStyle,
    fontSize: 20,
    color: 'black',
  },
  none: {
    width: 24,
    height: '100%',
  },
  cover: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  tagNameWrapper: {
    width: '100%',
    paddingVertical: 5,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  detail: {
    paddingTop: 5,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tagName: {
    ...DefaultFontStyle,
    fontSize: 26,
    color: 'black',
    fontWeight: 'bold',
  },
  total: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  totalValue: {
    ...DefaultFontStyle,
    fontSize: 14,
    color: 'black',
  },
  description: {
    paddingVertical: 5,
    paddingHorizontal: PaddingHorizontal,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  descriptionText: {
    ...DefaultFontStyle,
    fontSize: 14,
    fontWeight: 'normal',
    color: '#c7c7c7',
    textAlign: 'center',
  },
  relatedTagsWrapper: {
    paddingTop: 10,
    paddingHorizontal: PaddingHorizontal,
    backgroundColor: 'white',
    paddingBottom: 10,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    marginRight: 10,
  },
  illusTabs: {},
});
