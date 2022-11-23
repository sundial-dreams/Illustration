import React, {useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTouchBounceAnimated} from '../utils/hooks';
import {PropsWithStyle} from '../utils/interface';
import {useDispatch, useSelector} from 'react-redux';
import {IStore, updateCurrentScreen} from '../store/store';

const ICON_SIZE = 24;

const Icons = ['home', 'tag-plus', 'magnify', 'account-heart'];

interface NavigatorProps extends PropsWithStyle {}

export default function Navigator({style}: NavigatorProps) {
  const scaleAnimatedValue = useRef(new Animated.Value(0)).current;

  const {currentScreen} = useSelector((state: IStore) => state.uiState);
  const dispatch = useDispatch();

  const [onTouchIn, onTouchOut, scaleAnimatedStyle] =
    useTouchBounceAnimated(scaleAnimatedValue);

  const elems = Icons.map((icon, i) => {
    const isActive = currentScreen === i;
    return (
      <View style={styles.iconButton} key={i}>
        <Animated.View style={isActive && scaleAnimatedStyle}>
          <Icon
            name={icon}
            size={ICON_SIZE}
            color={isActive ? 'black' : '#efefef'}
            suppressHighlighting={true}
            onPress={() => dispatch(updateCurrentScreen(i))}
            onPressIn={e => {
              onTouchIn(e);
              // setCurrent(i);
            }}
            onPressOut={onTouchOut}
          />
        </Animated.View>
        <View
          style={[styles.iconButtonUnderline, {opacity: isActive ? 1 : 0}]}
        />
      </View>
    );
  });

  return (
    <View style={[styles.navigator_wrapper, style]}>
      <DropShadow style={styles.iconShadow}>
        <View style={styles.navigator}>{elems}</View>
      </DropShadow>
    </View>
  );
}

const styles = StyleSheet.create({
  navigator_wrapper: {
    position: 'absolute',
    bottom: 25,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 20,
  },
  iconShadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    width: '90%',
    height: 60,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  navigator: {
    width: '90%',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconButton: {
    position: 'relative',
    width: 24,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonUnderline: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: 'black',
  },
});
