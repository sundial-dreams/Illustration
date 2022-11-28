import React, {useCallback, useMemo, useRef} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTouchBounceAnimated} from '../../utils/hooks';
import {PropsWithStyle} from '../../utils/interface';
import {useDispatch, useSelector} from 'react-redux';
import {IStore, updateCurrentScreenIndex} from '../../store/store';
import {
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view/lib/typescript/types';
import scss from './style.scss';

const ICON_SIZE = 24;

const Icons = ['home', 'tag-plus', 'magnify', 'account-heart'];

const hitSlop = {left: 10, right: 10, top: 5, bottom: 5};

interface AppTabBarProps extends SceneRendererProps, PropsWithStyle {
  navigationState: NavigationState<any>;
}

export default function AppTabBar({
  style,
  navigationState,
  position,
}: AppTabBarProps) {
  const scaleAnimatedValue = useRef(new Animated.Value(0)).current;
  const {index, routes} = navigationState;
  const tabNames = routes.map(v => v.key);

  const {currentScreenIndex} = useSelector((state: IStore) => state.uiState);
  const dispatch = useDispatch();

  const [onTouchIn, onTouchOut, scaleAnimatedStyle] =
    useTouchBounceAnimated(scaleAnimatedValue);

  const onTouch = useCallback((i: number) => {
    dispatch(updateCurrentScreenIndex(i));
  }, []);

  const elems = tabNames.map((name, i) => {
    const isActive = currentScreenIndex === i;
    return (
      <View style={scss.app_tab_bar_button} key={i}>
        <Animated.View style={isActive && scaleAnimatedStyle}>
          <Icon
            onPress={() => onTouch(i)}
            onPressIn={onTouchIn}
            onPressOut={onTouchOut}
            name={routes[i].icon}
            size={ICON_SIZE}
            color={isActive ? 'black' : '#efefef'}
            suppressHighlighting={true}
          />
        </Animated.View>
        <View
          style={[scss.app_tab_bar_underline, {opacity: isActive ? 1 : 0}]}
        />
      </View>
    );
  });

  return (
    <View style={[scss.app_tab_bar_container, style]}>
      <DropShadow style={scss.app_tab_bar_shadow}>
        <View style={scss.app_tab_bar}>{elems}</View>
      </DropShadow>
    </View>
  );
}
