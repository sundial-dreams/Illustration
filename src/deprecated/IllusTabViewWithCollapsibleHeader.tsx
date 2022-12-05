import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  FlatList,
  PanResponder,
  Text,
} from 'react-native';

import {
  NavigationState,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view';
import {PropsWithStyle} from '../utils/interface';
import {
  IllustImageDataType,
  IllustListItem,
} from '../components/Lists/IllustListItem';
import {Layout} from '../utils';

interface IllusTabViewWithCollapsibleHeaderProps extends PropsWithStyle {
  headerHeight: number;
  headerContent: React.ReactElement;
  tabItems: string[];
  tabData: Array<Array<Array<IllustImageDataType>>>;
}

export default function IllusTabViewWithCollapsibleHeader({
  headerHeight,
  headerContent,
  tabData,
  tabItems,
}: IllusTabViewWithCollapsibleHeaderProps): React.ReactElement {
  const [current, setCurrent] = useState(0);
  const [canScroll, setCanScroll] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerScrollY = useRef(new Animated.Value(0)).current;
  const flatListRefs = useRef<Array<{key: string; value: FlatList}>>([]);
  const flatListOffset = useRef({});
  const isFlatListGliding = useRef(false);
  const headerScrollStart = useRef(0);
  const tabIndex = useRef(0);

  const routes = useMemo(() => tabItems.map(v => ({key: v})), [tabItems]);

  const headerPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: () => false,
      onStartShouldSetPanResponder: () => {
        headerScrollY.stopAnimation();
        // TODO
        syncScrollOffset();
        return false;
      },

      onMoveShouldSetPanResponder: (e, gestureState) => {
        headerScrollY.stopAnimation();
        return Math.abs(gestureState.dy) > 5;
      },

      onPanResponderRelease: (e, gestureState) => {
        syncScrollOffset(); // TODO
        if (Math.abs(gestureState.vy) < 0.2) {
          return;
        }
        headerScrollY.setValue((scrollY as any)._value);
        Animated.decay(headerScrollY, {
          velocity: -gestureState.vy,
          useNativeDriver: true,
        }).start(() => {
          syncScrollOffset(); // TODO
        });
      },
      onPanResponderMove: (e, gestureState) => {
        flatListRefs.current!.forEach(item => {
          if (item.key !== tabItems[tabIndex.current]) {
            return;
          }
          if (item.value) {
            item.value.scrollToOffset({
              offset: -gestureState.dy + headerScrollStart.current,
              animated: false,
            });
          }
        });
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: () => {
        headerScrollStart.current = (scrollY as any)._value;
      },
    }),
  ).current;

  const flatListPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: () => false,
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => {
        headerScrollY.stopAnimation();
        return false;
      },
      onShouldBlockNativeResponder: () => false,
      onPanResponderGrant: () => {
        headerScrollY.stopAnimation();
      },
    }),
  ).current;

  useEffect(() => {
    scrollY.addListener(({value}) => {
      const key = tabItems[current];
      flatListOffset.current[key] = value;
    });

    headerScrollY.addListener(({value}) => {
      flatListRefs.current!.forEach(item => {
        if (item.key !== tabItems[current]) {
          return;
        }
        if (value > headerHeight || value < 0) {
          headerScrollY.stopAnimation();
          syncScrollOffset();
        }
        if (item.value && value <= headerHeight) {
          item.value.scrollToOffset({
            offset: value,
            animated: false,
          });
        }
      });
    });
    return () => {
      scrollY.removeAllListeners();
      headerScrollY.removeAllListeners();
    };
  }, [current, tabItems]);

  const syncScrollOffset = useCallback(() => {
    const key = tabItems[tabIndex.current];
    const value = (scrollY as any)._value;
    flatListRefs.current!.forEach(item => {
      if (item.key !== key) {
        if (value < headerHeight && value >= 0) {
          if (!item.value) {
            return;
          }

          item.value?.scrollToOffset({
            offset: value,
            animated: false,
          });
        } else if (value >= headerHeight) {
          if (
            flatListOffset.current[item.key] < headerHeight ||
            typeof flatListOffset.current[item.key] === 'undefined'
          ) {
            if (!item.value) {
              return;
            }
            item.value?.scrollToOffset({
              offset: headerHeight,
              animated: false,
            });
            flatListOffset.current[item.key] = headerHeight;
          }
        }
      }
    });
  }, [headerHeight, scrollY, tabItems]);

  const onMomentumScrollBegin = useCallback(() => {
    isFlatListGliding.current = true;
  }, []);

  const onMomentumScrollEnd = useCallback(() => {
    isFlatListGliding.current = false;
    syncScrollOffset();
  }, []);

  const onScrollEndDrag = useCallback(() => {
    syncScrollOffset();
  }, []);

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  });

  const onSwipeStart = useCallback(() => setCanScroll(false), []);
  const onSwipeEnd = useCallback(() => setCanScroll(true), []);

  const onIndexChange = useCallback(index => {
    tabIndex.current = index;
    setCurrent(index);
  }, []);

  const renderTabBarLabel = useCallback(({route, focused}) => {
    return (
      <Text style={[styles.tabBarLabel, {opacity: focused ? 1 : 0.6}]}>
        {route.key}
      </Text>
    );
  }, []);

  const renderTabBar = useCallback(
    (
      props: SceneRendererProps & {
        navigationState: NavigationState<any>;
      },
    ) => {
      const y = scrollY.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [headerHeight, 0],
        extrapolate: 'clamp',
      });

      return (
        <Animated.View
          style={[
            styles.tabBarWrapper,
            {
              transform: [
                {
                  translateY: y,
                },
              ],
            },
          ]}>
          <TabBar
            {...props}
            onTabPress={({route, preventDefault}) => {
              if (isFlatListGliding.current) {
                preventDefault();
              }
            }}
            style={styles.tabBar}
            renderLabel={renderTabBarLabel}
            indicatorStyle={styles.tabIndicator}
          />
        </Animated.View>
      );
    },
    [],
  );

  const renderItem = useCallback(({item}) => <IllusListItem item={item} />, []);
  const renderScene = useCallback(
    ({route}) => {
      const focused = route.key === routes[current].key;
      return (
        <Animated.FlatList
          {...flatListPanResponder.panHandlers}
          scrollEnabled={canScroll}
          data={tabData[current]}
          scrollEventThrottle={10}
          renderItem={renderItem}
          ref={(ref: any) => {
            if (!flatListRefs.current.includes(ref)) {
              flatListRefs.current.push({
                key: route.key,
                value: ref,
              });
            }
          }}
          onScroll={
            focused
              ? Animated.event(
                  [
                    {
                      nativeEvent: {contentOffset: {y: scrollY}},
                    },
                  ],
                  {useNativeDriver: true},
                )
              : undefined
          }
          onMomentumScrollBegin={onMomentumScrollBegin}
          onScrollEndDrag={onScrollEndDrag}
          onMomentumScrollEnd={onMomentumScrollEnd}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={{
            paddingTop: headerHeight + 40,
            minHeight: Layout.height + headerHeight,
          }}
        />
      );
    },
    [
      canScroll,
      current,
      flatListPanResponder.panHandlers,
      headerHeight,
      onMomentumScrollBegin,
      onMomentumScrollEnd,
      onScrollEndDrag,
      renderItem,
      routes,
      scrollY,
      tabData,
    ],
  );

  return (
    <View style={styles.container}>
      <TabView
        onSwipeStart={onSwipeStart}
        onSwipeEnd={onSwipeEnd}
        onIndexChange={onIndexChange}
        navigationState={{index: current, routes}}
        initialLayout={{height: 0, width: Layout.width}}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
      />
      <Animated.View
        {...headerPanResponder.panHandlers}
        style={[
          styles.headerBar,
          {height: headerHeight, transform: [{translateY: headerTranslateY}]},
        ]}>
        {headerContent}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    width: '100%',
    position: 'absolute',
  },
  tabBarWrapper: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%',
  },
  tabBar: {},
  tabIndicator: {},
  tabBarLabel: {},
});
