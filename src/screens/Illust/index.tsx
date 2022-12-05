import React, {useCallback, useEffect, useMemo, useRef} from 'react';

import {
  Animated,
  FlatList,
  GestureResponderEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import {ContentWidth, Layout} from '../../utils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import scss from './style.scss';
import AnimatedValue = Animated.AnimatedValue;

import {feedImages, tagNames} from '../../mock';
import {BackButton, FollowButton, Tag, Title} from '../../components/common';
import Avatar from '../../components/common/Avatar';
import {
  DownLoadButton,
  IllustProgressBar,
  IllustProperties,
  LikeButton,
} from './components';
import IllustListItem from '../../components/Lists/IllustListItem';

const image1 = require('../../assets/images/avatar/avatar1.jpg');

const HeaderHeight = 100;

function createAnimatedEventForScrollY(
  animatedValue: AnimatedValue,
): (...args: any[]) => void {
  return Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: animatedValue,
          },
        },
      },
    ],
    {useNativeDriver: false},
  );
}

const data = [{key: 'title'}, ...feedImages];

export default function Illust(): React.ReactElement {
  const route = useRoute();
  const navigation = useNavigation();
  const source = (route.params as any).source;
  const dimensions = resolveAssetSource(source);
  const ratio = Layout.width / dimensions.width;
  const insets = useSafeAreaInsets();
  const imageHeight = dimensions.height * ratio;
  const scrollY = useRef(0);

  const flatListRef = useRef<FlatList>(null);

  const animatedBackgroundValue = useRef(new Animated.Value(0)).current;

  const animatedScaleImageValue = useRef(new Animated.Value(0)).current;

  const animatedTranslateYValue = useRef(new Animated.Value(0)).current;

  const animatedBackgroundStyle = useMemo(
    () =>
      animatedBackgroundValue.interpolate({
        inputRange: [0, imageHeight - HeaderHeight - HeaderHeight],
        outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
      }),
    [animatedBackgroundValue, imageHeight],
  );

  const animatedScaleImageStyle = useMemo(() => {
    animatedScaleImageValue.setValue(-HeaderHeight);
    return animatedScaleImageValue.interpolate({
      inputRange: [-imageHeight, -HeaderHeight],
      outputRange: [2.8, 1],
    });
  }, [animatedScaleImageValue, imageHeight]);

  const animatedTranslateYStyle = useMemo(() => {
    animatedTranslateYValue.setValue(HeaderHeight / 2);
    return animatedTranslateYValue.interpolate({
      inputRange: [
        imageHeight - HeaderHeight - HeaderHeight + 40,
        imageHeight - HeaderHeight - HeaderHeight + 40 + 50,
      ],
      outputRange: [50, 0],
      extrapolate: 'clamp',
    });
  }, [animatedTranslateYValue, imageHeight]);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const backgroundAnimatedEvent = createAnimatedEventForScrollY(
        animatedBackgroundValue,
      );

      const scaleAnimatedEvent = createAnimatedEventForScrollY(
        animatedScaleImageValue,
      );

      const translateYAnimatedEvent = createAnimatedEventForScrollY(
        animatedTranslateYValue,
      );

      backgroundAnimatedEvent(event);
      translateYAnimatedEvent(event);

      if (event.nativeEvent.contentOffset.y < -HeaderHeight) {
        scaleAnimatedEvent(event);
      }
      scrollY.current = event.nativeEvent.contentOffset.y;
    },
    [animatedBackgroundValue, animatedScaleImageValue],
  );

  const onImageTouch = useCallback(() => {
    // @ts-ignore
    navigation.push('IllustViewer', {
      source,
      ...dimensions,
    });
  }, [source]);

  const onScrollTouchStart = useCallback((event: GestureResponderEvent) => {
    const y = event.nativeEvent.locationY;
    const offsetY = scrollY.current;
    if (
      y > HeaderHeight &&
      y < dimensions.height * ratio - offsetY + HeaderHeight
    ) {
      onImageTouch();
    }
  }, []);

  useEffect(() => {
    flatListRef.current &&
      (flatListRef.current as any).scrollToOffset({offset: -HeaderHeight});
  }, []);

  const renderItem = useCallback(({item}) => {
    if (item.key === 'title') {
      return <Title style={scss.recommended_title}>Recommended</Title>;
    }
    return <IllustListItem item={item} />;
  }, []);

  return (
    <View style={scss.illust_screen}>
      <Animated.View
        style={[
          scss.header_bar,
          {paddingTop: insets.top, height: HeaderHeight},
          {backgroundColor: animatedBackgroundStyle},
        ]}>
        <BackButton />
        <Animated.View
          style={[
            scss.header_bar_user_block,
            {
              width: ContentWidth - 24,
              transform: [{translateY: animatedTranslateYStyle}],
            },
          ]}>
          <View style={scss.header_bar_avatar_block}>
            <Avatar source={image1} size={40} />
            <Text style={scss.header_bar_username}>sundial-dreams</Text>
          </View>
          <FollowButton followed={false} size={14} />
        </Animated.View>
      </Animated.View>
      <View>
        <Animated.Image
          style={[
            scss.illust_image,
            {height: dimensions.height * ratio},
            {transform: [{scale: animatedScaleImageStyle}]},
          ]}
          source={source}
        />
      </View>
      <FlatList
        keyExtractor={(_, x) => x.toString()}
        onTouchStart={onScrollTouchStart}
        ref={flatListRef}
        stickyHeaderIndices={[1]}
        scrollEventThrottle={1}
        contentContainerStyle={{
          paddingTop: dimensions.height * ratio - HeaderHeight,
        }}
        contentInset={{top: HeaderHeight}}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        ListHeaderComponent={<IllusContentSection dimensions={dimensions} />}
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
}

interface IllusContentSectionProps {
  dimensions: {width: number; height: number};
}

function IllusContentSection(
  props: IllusContentSectionProps,
): React.ReactElement {
  return (
    <View style={scss.body_container}>
      <IllustProgressBar total={100} current={60} />
      <IllustProperties
        publishDate={'2021-11-04'}
        views={122}
        likes={22}
        dimensions={props.dimensions}
      />
      <View style={scss.content}>
        <View style={scss.illustrator_block}>
          <View style={scss.avatar_block}>
            <Avatar source={image1} size={50} />
          </View>
          <View style={scss.illustrator_detail_block}>
            <Text style={scss.illustrator_name}>sundial-dream</Text>
            <View>
              <FollowButton followed={false} />
            </View>
          </View>
        </View>
        <View style={scss.operation_block}>
          <DownLoadButton style={scss.download_button} />
          <LikeButton liked={false} />
        </View>
      </View>
      <Title style={scss.related_tags_block}>Tags</Title>
      <View style={scss.tags}>
        {tagNames.map((v, i) => (
          <Tag key={i} style={scss.tag}>
            {v}
          </Tag>
        ))}
      </View>
    </View>
  );
}
