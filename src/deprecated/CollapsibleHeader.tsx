import React, {
  PropsWithChildren,
  Ref,
  RefObject,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import {
  View,
  Animated,
  StyleSheet,
  PanResponder,
  ScrollView,
  FlatList,
} from 'react-native';
import {PropsWithStyle} from '../utils/interface';
import AnimatedValue = Animated.AnimatedValue;

interface CollapsibleHeaderProps extends PropsWithStyle, PropsWithChildren {
  flatListScrollY: AnimatedValue;
  flatListRef: RefObject<FlatList>;
  height: number;
  syncScrollOffset: () => void;
  scrollY: AnimatedValue;
}

export default function CollapsibleHeader({
  children,
  style,
  flatListScrollY,
  flatListRef,
  height,
  syncScrollOffset,
  scrollY,
}: CollapsibleHeaderProps): React.ReactElement {
  const scrollStart = useRef(0);

  const headerPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (event, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => false,
      onStartShouldSetPanResponder(event, gestureState) {
        scrollY.stopAnimation();
        syncScrollOffset();
        return false;
      },
      onMoveShouldSetPanResponder(event, gestureState) {
        scrollY.stopAnimation();
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderRelease(event, gestureState) {
        syncScrollOffset();
        if (Math.abs(gestureState.vy) < 0.2) {
          return;
        }
        scrollY.setValue((flatListScrollY as any)._value);
        Animated.decay(scrollY, {
          velocity: -gestureState.vy,
          useNativeDriver: true,
        }).start(() => {
          syncScrollOffset();
        });
      },
      onPanResponderMove(event, gestureState) {
        const list = flatListRef.current;
        list?.scrollToOffset({
          offset: -gestureState.dy + scrollStart.current,
          animated: false,
        });
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant(event, gestureState) {
        scrollStart.current = (flatListScrollY as any)._value;
      },
    }),
  ).current;

  useEffect(() => {
    scrollY.addListener(({value}) => {
      let list = flatListRef.current;
      if (value > height || value < 0) {
        scrollY.stopAnimation();
        syncScrollOffset();
      }
      if (value <= height) {
        list?.scrollToOffset({
          offset: value,
          animated: false,
        });
      }
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, [scrollY, flatListRef, height, syncScrollOffset]);
  const translateY = useMemo(
    () =>
      flatListScrollY.interpolate({
        inputRange: [0, height],
        outputRange: [0, -height],
        extrapolate: 'clamp',
      }),
    [height, flatListScrollY],
  );

  return (
    <Animated.View
      {...headerPanResponder.panHandlers}
      style={[
        styles.headerBar,
        style,
        {
          transform: [
            {
              translateY,
            },
          ],
        },
      ]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    width: '100%',
  },
});
