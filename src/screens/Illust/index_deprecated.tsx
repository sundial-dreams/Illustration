import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  GestureResponderEvent,
  ImageBackground,
  LogBox,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
// @ts-ignore
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import {useNavigation, useRoute} from '@react-navigation/native';
import {ContentWidth, Layout} from '../../utils';
import {BackButton, Tag, Title} from '../../components/common';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  DownLoadButton,
  IllustProgressBar,
  IllustProperties,
  LikeButton,
} from './components';
import Avatar from '../../components/common/Avatar';
import IllustFlatList from '../../components/Lists/IllustFlatList';
import {FollowButton} from '../../components/common';
import scss from './style.scss';

import AnimatedValue = Animated.AnimatedValue;

import {feedImages, tagNames} from '../../mock';

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

export default function Illus() {
  const route = useRoute();
  const navigation = useNavigation();
  const source = (route.params as any).source;
  const dimensions = resolveAssetSource(source);
  const ratio = Layout.width / dimensions.width;
  const insets = useSafeAreaInsets();
  const imageHeight = dimensions.height * ratio;
  const scrollY = useRef(0);

  const scrollViewRef = useRef(null);

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
    navigation.push('IllusViewer', {
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
    scrollViewRef.current &&
      (scrollViewRef.current as any).scrollTo({x: 0, y: -HeaderHeight});
  }, []);

  return (
    <View style={scss.illus_screen}>
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
            scss.illus_image,
            {height: dimensions.height * ratio},
            {transform: [{scale: animatedScaleImageStyle}]},
          ]}
          source={source}
        />
      </View>
      <ScrollView
        onTouchStart={onScrollTouchStart}
        ref={scrollViewRef}
        stickyHeaderIndices={[1]}
        scrollEventThrottle={1}
        contentContainerStyle={{
          paddingTop: dimensions.height * ratio - HeaderHeight,
        }}
        contentInset={{top: HeaderHeight}}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}>
        <View style={scss.body_container}>
          <IllustProgressBar total={100} current={60} />
          <IllustProperties
            publishDate={'2021-11-04'}
            views={122}
            likes={22}
            dimensions={dimensions}
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
              <DownLoadButton
                onTouch={onImageTouch}
                style={scss.download_button}
              />
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
        <Title style={scss.recommended_title}>Recommended</Title>
        <IllustFlatList data={feedImages} />
      </ScrollView>
    </View>
  );
}
