import React, {useCallback, useMemo, useState} from 'react';

import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  I18nManager,
  FlatList,
} from 'react-native';

import {
  CollapsibleHeaderTabView,
  ZTabViewProps,
} from 'react-native-tab-view-collapsible-header';
import {HFlatList} from 'react-native-head-tab-view';
import {PropsWithStyle} from '../../utils/interface';
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
} from 'react-native-tab-view';
import {ContentWidth} from '../../utils';
import {
  DefaultFontStyle,
  FlexCenterStyle,
  PaddingHorizontal,
} from '../../styles';
import {Route} from 'react-native-tab-view/src/types';
import {feedImages} from '../../mock';
import IllusListItem from './IllusItem';
import scss from './style.scss';

const getTranslateX = (
  position: Animated.AnimatedInterpolation<any>,
  routes: Route[],
  tabWidth: number,
  gap?: number,
) => {
  const inputRange = routes.map((_, i) => i);
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

interface FlatListTabBarProps extends SceneRendererProps, PropsWithStyle {
  tabWidth: number;
  onIndexChange: (index: number) => void;
  navigationState: NavigationState<{key: string}>;
}

export function FlatListTabBar({
  style,
  tabWidth,
  navigationState,
  position,
  onIndexChange,
}: FlatListTabBarProps): React.ReactElement {
  const current = navigationState.index;
  const tabItems = navigationState.routes;

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
        <View style={[scss.tab_item, {width: tabWidth}]} key={i}>
          <Animated.Text
            suppressHighlighting={true}
            style={[scss.tab_item_text, {color: 'black'}]}>
            {v.key}
          </Animated.Text>
        </View>
      </TouchableWithoutFeedback>
    );
  });
  return (
    <View style={[scss.illus_tab_bar, style]}>
      <Animated.View
        style={[
          scss.tab_item_underline,
          {
            width: tabWidth,
            transform: [{translateX: animatedTranslateXStyle}],
          },
        ]}
      />
      <Animated.View
        style={[
          scss.tab_item_background,
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

function FlatListScene({
  route,
}: {
  route: {key: string; index: number};
}): React.ReactElement {
  const renderItem = useCallback(({item}) => <IllusListItem item={item} />, []);

  return (
    <HFlatList
      data={feedImages}
      renderItem={renderItem}
      index={route.index}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
}

interface FlatListTabViewProps extends PropsWithStyle {
  renderHeader: () => React.ReactElement;
  tabItems: string[];
}

type FlatListTabViewRemainProps = Omit<
  ZTabViewProps<{key: string; index: number}>,
  | 'onIndexChange'
  | 'navigationState'
  | 'renderTabBar'
  | 'renderScene'
  | 'renderScrollHeader'
>;

export default function FlatListTabView({
  renderHeader,
  tabItems,
  ...remainProps
}: FlatListTabViewProps & FlatListTabViewRemainProps): React.ReactElement {
  const [index, setIndex] = useState(0);
  const [routes] = useState(tabItems.map((v, i) => ({key: v, index: i})));

  const tabWidth = ContentWidth / tabItems.length - PaddingHorizontal;

  const renderTabBar = useCallback(
    (
      props: SceneRendererProps & {
        navigationState: NavigationState<{key: string}>;
      },
    ) => {
      return (
        <FlatListTabBar
          {...props}
          onIndexChange={setIndex}
          tabWidth={tabWidth}
        />
      );
    },
    [tabWidth],
  );

  const renderScene = useMemo(
    () =>
      SceneMap(
        tabItems.reduce((acc, curKey) => {
          acc[curKey] = FlatListScene;
          return acc;
        }, {}),
      ),
    [tabItems],
  );

  return (
    <CollapsibleHeaderTabView
      onIndexChange={setIndex}
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      renderScrollHeader={renderHeader}
      {...remainProps}
    />
  );
}
