import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// @ts-ignore
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import {useRoute} from '@react-navigation/native';
import {IllusItemType} from '../../components/IllusItem';
import {Layout} from '../../utils';
import {BackButton, Tag, Title} from '../../components';
import {
  DefaultBackgroundColor,
  DefaultFontStyle,
  PaddingHorizontal,
} from '../../styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  DownLoadButton,
  FollowButton,
  IllusProgressBar,
  LikeButton,
} from './components';
import Avatar from '../../components/Avatar';
import Feed from '../../components/Feed';
import AnimatedValue = Animated.AnimatedValue;

const image1 = require('../../assets/images/avatar/avatar1.jpg');
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
  const source = (route.params as any).source;
  const dimensions = resolveAssetSource(source);
  const ratio = Layout.width / dimensions.width;
  const insets = useSafeAreaInsets();
  const imageHeight = dimensions.height * ratio;

  const scrollViewRef = useRef(null);

  const animatedBackgroundValue = useRef(new Animated.Value(0)).current;

  const animatedScaleImageValue = useRef(new Animated.Value(0)).current;

  const animatedBackgroundStyle = useMemo(
    () =>
      animatedBackgroundValue.interpolate({
        inputRange: [0, imageHeight - 80 - 80],
        outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
      }),
    [animatedBackgroundValue, imageHeight],
  );

  const animatedScaleImageStyle = useMemo(() => {
    animatedScaleImageValue.setValue(-80);
    return animatedScaleImageValue.interpolate({
      inputRange: [-imageHeight, -80],
      outputRange: [2.8, 1],
    });
  }, [animatedScaleImageValue, imageHeight]);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const backgroundAnimatedEvent = createAnimatedEventForScrollY(
        animatedBackgroundValue,
      );
      const scaleAnimatedEvent = createAnimatedEventForScrollY(
        animatedScaleImageValue,
      );
      backgroundAnimatedEvent(event);
      if (event.nativeEvent.contentOffset.y < -80) {
        scaleAnimatedEvent(event);
      }
    },
    [animatedBackgroundValue, animatedScaleImageValue],
  );

  useEffect(() => {
    scrollViewRef.current &&
      (scrollViewRef.current as any).scrollTo({x: 0, y: -80});
  }, []);

  return (
    <View style={styles.illus}>
      <Animated.View
        style={[
          styles.header,
          {paddingTop: insets.top},
          {backgroundColor: animatedBackgroundStyle},
        ]}>
        <BackButton />
      </Animated.View>
      <Animated.Image
        style={[
          styles.image,
          {height: dimensions.height * ratio},
          {transform: [{scale: animatedScaleImageStyle}]},
        ]}
        source={source}
      />
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        stickyHeaderIndices={[1]}
        scrollEventThrottle={1}
        contentContainerStyle={{
          paddingTop: dimensions.height * ratio - 80,
        }}
        contentInset={{top: 80}}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}>
        <View style={styles.illusContent}>
          <IllusProgressBar total={100} current={60} />
          <View style={styles.illusDetail}>
            <View style={styles.illusLeftDetail}>
              <Text style={styles.detailText}>2017-11-04 </Text>
              <Text style={[styles.detailText, {color: 'black'}]}>| 1.4w</Text>
              <Text style={styles.detailText}> Browse </Text>
              <Text style={[styles.detailText, {color: 'black'}]}>| 1.3w</Text>
              <Text style={styles.detailText}> Like</Text>
            </View>
            <View style={styles.illusRightDetail}>
              <Text style={styles.detailText}>
                {dimensions.width}x{dimensions.height}
              </Text>
            </View>
          </View>
          <View style={styles.illusAuthorInfo}>
            <View style={styles.authorBox}>
              <View style={styles.avatarWrapper}>
                <Avatar onTorch={() => {}} source={image1} size={50} />
              </View>
              <View style={styles.authorInfoWrapper}>
                <Text style={styles.authorNameText}>sundial-dream</Text>
                <View style={styles.followButtonWrapper}>
                  <FollowButton followed={false} />
                </View>
              </View>
            </View>
            <View style={styles.operationBox}>
              <DownLoadButton style={styles.downloadButton} />
              <LikeButton liked={false} />
            </View>
          </View>
          <Title style={styles.relatedTags}>Tags</Title>
          <View style={styles.tags}>
            {tags.map((v, i) => (
              <Tag key={i} style={styles.tag}>
                {v}
              </Tag>
            ))}
          </View>
        </View>
        <Title style={styles.recommended}>Recommended</Title>
        <Feed />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  illus: {
    width: '100%',
    height: '100%',
    ...DefaultBackgroundColor,
  },
  header: {
    height: 80,
    width: '100%',
    justifyContent: 'center',
    paddingLeft: PaddingHorizontal / 2,
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 10,
  },
  scrollView: {},
  image: {
    width: '100%',
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  illusContent: {
    width: '100%',
    backgroundColor: 'white',
  },
  illusDetail: {
    width: '100%',
    height: 12,
    marginTop: 10,
    paddingHorizontal: PaddingHorizontal,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  illusLeftDetail: {
    width: '50%',
    height: '100%',
    flexDirection: 'row',
  },
  illusRightDetail: {},
  detailText: {
    ...DefaultFontStyle,
    fontSize: 12,
    color: '#C7C7C7',
    fontWeight: 'bold',
  },
  illusAuthorInfo: {
    width: '100%',
    height: 50,
    marginTop: 20,
    paddingHorizontal: PaddingHorizontal,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  authorBox: {
    width: '50%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    marginRight: 10,
  },
  authorInfoWrapper: {
    height: '100%',
    justifyContent: 'space-around',
  },
  authorNameText: {
    ...DefaultFontStyle,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  followButtonWrapper: {},
  operationBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  downloadButton: {
    marginRight: 10,
  },
  relatedTags: {
    marginTop: 10,
    paddingLeft: PaddingHorizontal,
  },
  tags: {
    paddingHorizontal: PaddingHorizontal,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 10,
  },
  tag: {
    marginRight: 10,
  },
  recommended: {
    height: 30,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingLeft: PaddingHorizontal,
  },
});
