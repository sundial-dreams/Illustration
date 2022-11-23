import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  View,
  ViewStyle,
} from 'react-native';
import AnimatedValue = Animated.AnimatedValue;

export function useDimensions(entity: 'screen' | 'window' = 'screen') {
  return useMemo(() => Dimensions.get(entity), [entity]);
}

type TouchEvent = (event: GestureResponderEvent) => void;

export function useTouchBounceAnimated(
  animatedValue: AnimatedValue,
  scale: number = 0.8,
): [TouchEvent, TouchEvent, ViewStyle] {
  const onTouchIn = useCallback(() => {
    animatedValue.setValue(0);
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const onTouchOut = useCallback(() => {
    animatedValue.setValue(1);
    Animated.spring(animatedValue, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const animatedStyle = useMemo(() => {
    const interpolation = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, scale],
    });
    return {
      transform: [{scale: interpolation}],
    };
  }, [animatedValue, scale]);

  return [onTouchIn, onTouchOut, animatedStyle as any as ViewStyle];
}

export default function useAnimatedValue(initialValue: number) {
  const lazyRef = useRef<Animated.Value>();
  if (typeof lazyRef.current === 'undefined') {
    lazyRef.current = new Animated.Value(initialValue);
  }
  return lazyRef.current as Animated.Value;
}
