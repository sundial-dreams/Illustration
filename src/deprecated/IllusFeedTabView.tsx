import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  createContext,
  useContext,
} from 'react';

import {
  Animated,
  Easing,
  I18nManager,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {PropsWithStyle} from '../utils/interface';
import {DefaultFontStyle, FlexCenterStyle, PaddingHorizontal} from '../styles';
import {ContentWidth, Layout} from '../utils';
import IllusFlatList from '../components/Lists/IllusFlatList';
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView,
} from 'react-native-tab-view';
import {Route} from 'react-native-tab-view/src/types';

const getTranslateX = (
  position: Animated.AnimatedInterpolation<any>,
  routes: Route[],
  tabWidth: number,
  gap?: number,
) => {
  const inputRange = routes.map((_, i) => i);
  console.log('input range', inputRange);
  // every index contains widths at all previous indices
  const outputRange = routes.reduce<number[]>((acc, _, i) => {
    if (i === 0) {
      return [0];
    }
    return [...acc, acc[i - 1] + tabWidth + (gap ?? 0)];
  }, []);

  const translateX = position.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  });

  return Animated.multiply(translateX, I18nManager.isRTL ? -1 : 1);
};

interface IllusTabBarProps extends PropsWithStyle {
  tabWidth: number;
  onIndexChange: (index: number) => void;
  renderProps: SceneRendererProps & {
    navigationState: NavigationState<{key: string}>;
  };
}

export function IllusTabBar({
  style,
  tabWidth,
  renderProps,
  onIndexChange,
}: IllusTabBarProps): React.ReactElement {
  const current = renderProps.navigationState.index;
  const tabItems = renderProps.navigationState.routes;
  const position = renderProps.position;

  const inputRange = tabItems.map((v, i) => i);

  const handleIndexChange = useCallback(
    (index: number) => {
      if (index === current) {
        return;
      }
      onIndexChange(index);
    },
    [current, onIndexChange],
  );

  const gap =
    (ContentWidth - tabItems.length * tabWidth) / (tabItems.length - 1);

  const animatedTranslateXStyle = useMemo(
    () => getTranslateX(position, tabItems, tabWidth, gap),
    [gap, position, tabItems, tabWidth],
  );

  const elems = tabItems.map((v, i) => {
    return (
      <TouchableWithoutFeedback onPress={() => handleIndexChange(i)}>
        <View style={[styles.tabItem, {width: tabWidth}]} key={i}>
          <Animated.Text
            suppressHighlighting={true}
            style={[styles.tabItemText, {color: 'black'}]}>
            {v.key}
          </Animated.Text>
        </View>
      </TouchableWithoutFeedback>
    );
  });
  return (
    <View style={[styles.illusTabs, style]}>
      <Animated.View
        style={[
          styles.tabItemUnderline,
          {
            width: tabWidth,
            transform: [{translateX: animatedTranslateXStyle}],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.tabItemBackground,
          {
            width: tabWidth,
            transform: [{translateX: animatedTranslateXStyle}],
          },
        ]}
      />
      {elems}
    </View>
  );
}

interface IllusFeedTabViewProps extends PropsWithStyle {
  scrollEnabled: boolean;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onScrollBeginDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  tabItems: string[];
}

const ScrollContext = createContext<Omit<IllusFeedTabViewProps, 'tabItems'>>({
  onScroll: () => {},
  scrollEnabled: false,
  onScrollBeginDrag: () => {},
});

function EmbedContextForFeed({style}: PropsWithStyle): React.ReactElement {
  const {scrollEnabled, onScroll, onScrollBeginDrag} =
    useContext(ScrollContext);
  return (
    <IllusFlatList
      scrollEnabled={scrollEnabled}
      onScrollBeginDrag={onScrollBeginDrag}
      onScroll={onScroll}
    />
  );
}

export default function IllusFeedTabView({
  style,
  scrollEnabled,
  onScroll,
  onScrollBeginDrag,
  tabItems,
}: IllusFeedTabViewProps): React.ReactElement {
  const [current, setCurrent] = useState(0);

  const renderScene = useMemo(
    () =>
      SceneMap(
        tabItems.reduce((acc, curKey) => {
          acc[curKey] = EmbedContextForFeed;
          return acc;
        }, {}),
      ),
    [tabItems],
  );

  const routes = useMemo(() => tabItems.map(v => ({key: v})), [tabItems]);

  const tabWidth = ContentWidth / tabItems.length - PaddingHorizontal;

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{key: string}>;
    },
  ) => {
    return (
      <IllusTabBar
        onIndexChange={setCurrent}
        tabWidth={tabWidth}
        renderProps={props}
      />
    );
  };

  return (
    <ScrollContext.Provider
      value={{onScroll, scrollEnabled, onScrollBeginDrag}}>
      <TabView
        style={[styles.tabView, style]}
        onIndexChange={setCurrent}
        navigationState={{
          index: current,
          routes,
        }}
        lazy
        renderTabBar={renderTabBar}
        tabBarPosition="top"
        renderScene={renderScene}
      />
    </ScrollContext.Provider>
  );
}

const styles = StyleSheet.create({
  illusTabView: {
    minHeight: 50,
    width: '100%',
  },
  tabView: {backgroundColor: 'white', height: Layout.height + 100},
  illusTabs: {
    height: 40,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: PaddingHorizontal,
    paddingTop: 5,
    justifyContent: 'space-between',
  },
  tabItem: {
    height: 30,
    ...FlexCenterStyle,
  },
  tabItemText: {
    ...DefaultFontStyle,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  tabItemUnderline: {
    height: 2,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: PaddingHorizontal,
  },

  tabItemBackground: {
    height: 30,
    backgroundColor: 'transparent',
    position: 'absolute',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    left: PaddingHorizontal,
    top: 5,
  },
});
