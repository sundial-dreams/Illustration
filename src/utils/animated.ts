import {Animated} from 'react-native';
import AnimatedValue = Animated.AnimatedValue;

export function createAnimatedEventForScrollY(
  animatedValue: AnimatedValue,
): (...args: any[]) => void {
  return Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: animatedValue,
          },
        },
      },
    ],
    {useNativeDriver: false},
  );
}
