import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Text,
  TouchableWithoutFeedback,
  ImageSourcePropType,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {
  FlexCenterStyle,
  DefaultFontStyle,
  newShadow,
  PaddingHorizontal,
} from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropShadow from 'react-native-drop-shadow';
import LinearGradient from 'react-native-linear-gradient';
import {ContentWidth, Layout} from '../../utils';
import {PropsWithOnTouch, PropsWithStyle} from '../../utils/interface';
import scss from './style.scss';

import AnimatedValue = Animated.AnimatedValue;
import {useNavigation} from '@react-navigation/native';

const image1 = require('../../assets/images/6.jpg');
const image2 = require('../../assets/images/4.jpg');
const image3 = require('../../assets/images/11.jpg');

interface IllusListCoverProps extends PropsWithStyle, PropsWithOnTouch {
  name: string;
  date: string;
  icon: string;
  source: ImageSourcePropType;
  isEnd: boolean;
}

export function IllustRankingListCover({
  name,
  date,
  icon,
  style,
  source,
  isEnd,
  onTouch,
}: IllusListCoverProps): React.ReactElement {
  const navigation = useNavigation();

  const touch = useCallback(() => {
    // @ts-ignore
    navigation.navigate('Login');
  }, []);

  return (
    <DropShadow style={scss.cover_shadow}>
      <View
        style={[
          scss.cmp_illus_cover,
          {
            marginRight: isEnd ? PaddingHorizontal : PaddingHorizontal / 2,
            width: Layout.width - PaddingHorizontal * 2,
          },
          style,
        ]}>
        <TouchableWithoutFeedback onPress={touch}>
          <ImageBackground style={scss.cover_image} source={source}>
            <LinearGradient
              style={scss.cover_content}
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}>
              <View style={scss.cover_text_block}>
                <Text style={scss.cover_title}>{name}</Text>
                <Text style={scss.cover_date}>{date}</Text>
              </View>
              <DropShadow style={scss.cover_icon_shadow}>
                <View style={scss.cover_icon_block}>
                  <Icon name={icon} color={'black'} size={16} />
                </View>
              </DropShadow>
            </LinearGradient>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </View>
    </DropShadow>
  );
}

const lists: Array<IllusListCoverProps> = [
  {
    name: 'Daily List',
    date: '11/20',
    icon: 'calendar-today',
    source: image1,
    isEnd: false,
  },
  {
    name: 'Weekly List',
    date: '11/20-11/25',
    icon: 'calendar-week',
    source: image2,
    isEnd: false,
  },
  {
    name: 'Monthly List',
    date: '11',
    icon: 'calendar-month',
    source: image3,
    isEnd: true,
  },
];

function createAnimatedEventForScrollX(
  animatedValue: AnimatedValue,
): (...args: any) => void {
  return Animated.event([{nativeEvent: {contentOffset: {x: animatedValue}}}], {
    useNativeDriver: false,
  });
}

export function IllustRankingList({style}: PropsWithStyle): React.ReactElement {
  const animatedScrollX = useRef(new Animated.Value(0)).current;
  const [currentPosition, setCurrentPosition] = useState(0);
  const scrollView = useRef(null);
  const elems = lists.map((value, i) => (
    <IllustRankingListCover {...value} key={i} />
  ));
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const animatedEvent = createAnimatedEventForScrollX(animatedScrollX);
      animatedEvent(event);
    },
    [animatedScrollX],
  );
  const handleScrollDragEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const scrollViewElem = scrollView.current as any;
      console.log('offset x = ', event.nativeEvent.contentOffset.x);
      const coverPosition: Array<number> = [
        0,
        ContentWidth + PaddingHorizontal / 2,
        ContentWidth * 2 + PaddingHorizontal,
      ];
      if (offsetX > currentPosition && offsetX < coverPosition[1]) {
        setCurrentPosition(coverPosition[1]);
        scrollViewElem.scrollTo({x: coverPosition[1]});
        return;
      }
      if (offsetX > currentPosition && offsetX < coverPosition[2]) {
        setCurrentPosition(coverPosition[2]);
        scrollViewElem.scrollTo({x: coverPosition[2]});
        return;
      }
      if (offsetX < currentPosition && offsetX > coverPosition[1]) {
        setCurrentPosition(coverPosition[1]);
        scrollViewElem.scrollTo({x: coverPosition[1]});
        return;
      }
      if (offsetX < currentPosition && offsetX > coverPosition[0]) {
        setCurrentPosition(coverPosition[0]);
        scrollViewElem.scrollTo({x: coverPosition[0]});
        return;
      }
    },
    [currentPosition, scrollView],
  );
  return (
    <View style={[scss.illus_lists, style]}>
      <View style={scss.list_view_block}>
        <ScrollView
          ref={scrollView}
          style={scss.list_view}
          horizontal
          contentContainerStyle={{paddingRight: PaddingHorizontal}}
          onScroll={handleScroll}
          onScrollEndDrag={handleScrollDragEnd}
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}>
          {elems}
        </ScrollView>
      </View>
      <View style={scss.list_indicator_block}>
        {lists.map((item, index) => {
          const width = animatedScrollX.interpolate({
            inputRange: [
              ContentWidth * (index - 1),
              ContentWidth * index,
              ContentWidth * (index + 1),
            ],
            outputRange: [5, 20, 5],
            extrapolate: 'clamp',
          });
          const backgroundColor = animatedScrollX.interpolate({
            inputRange: [
              ContentWidth * (index - 1),
              ContentWidth * index,
              ContentWidth * (index + 1),
            ],
            outputRange: ['#c7c7c7', 'black', '#c7c7c7'],
          });
          return (
            <Animated.View
              key={index}
              style={[scss.indicator_dot, {width, backgroundColor}]}
            />
          );
        })}
      </View>
    </View>
  );
}
