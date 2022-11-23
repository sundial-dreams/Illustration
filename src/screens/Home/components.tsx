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
import {PropsWithStyle} from '../../utils/interface';
import AnimatedValue = Animated.AnimatedValue;

const image1 = require('../../assets/images/6.jpg');
const image2 = require('../../assets/images/4.jpg');
const image3 = require('../../assets/images/11.jpg');

interface IllusListCoverProps extends PropsWithStyle {
  name: string;
  date: string;
  icon: string;
  source: ImageSourcePropType;
  isEnd: boolean;
  onTouch?: () => void;
}

export function IllusListCover({
  name,
  date,
  icon,
  style,
  source,
  isEnd,
  onTouch,
}: IllusListCoverProps): React.ReactElement {
  return (
    <DropShadow style={stylesOfIllusListCover.shadow}>
      <View
        style={[
          stylesOfIllusListCover.illusCard,
          style,
          {marginRight: isEnd ? PaddingHorizontal : PaddingHorizontal / 2},
        ]}>
        <TouchableWithoutFeedback onPress={onTouch}>
          <ImageBackground style={stylesOfIllusListCover.image} source={source}>
            <LinearGradient
              style={stylesOfIllusListCover.content}
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}>
              <View style={stylesOfIllusListCover.textWrapper}>
                <Text style={stylesOfIllusListCover.titleText}>{name}</Text>
                <Text style={stylesOfIllusListCover.dateText}>{date}</Text>
              </View>
              <DropShadow style={stylesOfIllusListCover.iconShadow}>
                <View style={stylesOfIllusListCover.iconWrapper}>
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

const stylesOfIllusListCover = StyleSheet.create({
  illusCard: {
    width: Layout.width - PaddingHorizontal * 2,
    height: 200,
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textWrapper: {
    height: 50,
    justifyContent: 'space-between',
    marginLeft: 12,
  },
  titleText: {
    ...DefaultFontStyle,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  dateText: {
    ...DefaultFontStyle,
    fontSize: 16,
    color: 'white',
  },
  iconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    marginRight: 12,
    ...FlexCenterStyle,
  },
  iconShadow: newShadow(10),
  shadow: newShadow(10, 0.1),
});

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

export function IllusLists({style}: PropsWithStyle): React.ReactElement {
  const animatedScrollX = useRef(new Animated.Value(0)).current;
  const [currentPosition, setCurrentPosition] = useState(0);
  const scrollView = useRef(null);
  const elems = lists.map((value, i) => <IllusListCover {...value} key={i} />);
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
    <View style={[stylesOfIllusLists.illusLists, style]}>
      <View style={stylesOfIllusLists.scrollViewWrapper}>
        <ScrollView
          ref={scrollView}
          style={stylesOfIllusLists.scrollView}
          horizontal
          contentContainerStyle={{paddingRight: PaddingHorizontal}}
          onScroll={handleScroll}
          onScrollEndDrag={handleScrollDragEnd}
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}>
          {elems}
        </ScrollView>
      </View>
      <View style={stylesOfIllusLists.indicatorContainer}>
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
              style={[stylesOfIllusLists.normalDot, {width, backgroundColor}]}
            />
          );
        })}
      </View>
    </View>
  );
}

const stylesOfIllusLists = StyleSheet.create({
  illusLists: {
    width: Layout.width,
    height: '100%',
  },
  scrollViewWrapper: {
    height: '80%',
  },
  scrollView: {
    paddingTop: 18,
    paddingLeft: PaddingHorizontal,
  },
  indicatorContainer: {
    ...FlexCenterStyle,
    marginTop: 5,
  },
  normalDot: {
    height: 5,
    width: 5,
    borderRadius: 3,
    marginHorizontal: 4,
    backgroundColor: '#c7c7c7',
  },
});
