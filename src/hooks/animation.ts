import React, {useCallback, useEffect, useRef} from 'react';

import {Animated} from 'react-native';

export function useBounceAnimation() {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const animate = useCallback(() => {
    animatedValue.setValue(0);
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, 5, 0, -5, 0],
  });

  return {
    animationStyle: {
      transform: [{translateX}],
    },
    animate,
  };
}
