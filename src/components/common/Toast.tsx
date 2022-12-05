import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

import {Text, View, Animated} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import {PropsWithStyle} from '../../utils/interface';
import scss from './style.scss';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export function Toast({
  text,
  style,
}: {
  text: string;
} & PropsWithStyle): React.ReactElement {
  return (
    <DropShadow style={scss.toast_shadow}>
      <Animated.View style={[scss.cmp_toast, style]}>
        <Text style={scss.toast_text}>{text}</Text>
      </Animated.View>
    </DropShadow>
  );
}

interface IToastContext {
  show: (callback?: Animated.EndCallback) => void;
  text: string;
  setText: (text: string) => void;
  hide: () => void;
}

const ToastContext = createContext<IToastContext>({
  show: () => {},
  text: '',
  setText: () => {},
  hide: () => {},
});

export default function useToast(): (text: string) => void {
  const {show, setText, hide} = useContext(ToastContext);

  return useCallback(
    (text: string, duration: number = 2000) => {
      setText(text);
      show(() => {
        if (duration !== 0) {
          setTimeout(hide, duration);
        }
      });
    },
    [show, setText, hide],
  );
}

export function ToastProvider({children}: PropsWithChildren) {
  const [text, setText] = useState('');
  const insets = useSafeAreaInsets();
  const {show, hide, animationStyles} = useSlideAnimation({
    from: -100,
    to: insets.top + 10,
  });

  return (
    <ToastContext.Provider value={{text, show, hide, setText}}>
      {children}
      <View style={scss.toast_wrapper} pointerEvents={'box-none'}>
        <Toast text={text} style={animationStyles} />
      </View>
    </ToastContext.Provider>
  );
}

function useSlideAnimation(topOffset: {from: number; to: number}) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const show = useCallback(
    (callback?: Animated.EndCallback) => {
      Animated.spring(animatedValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start(callback);
    },
    [animatedValue],
  );

  const hide = useCallback(() => {
    Animated.spring(animatedValue, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const translateY = useMemo(
    () =>
      animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [topOffset.from, topOffset.to],
      }),
    [animatedValue, topOffset],
  );

  const opacity = useMemo(
    () =>
      animatedValue.interpolate({
        inputRange: [0, 0.7, 1],
        outputRange: [0, 1, 1],
      }),
    [animatedValue],
  );

  return {
    show,
    hide,
    animatedValue,
    animationStyles: {
      opacity,
      transform: [{translateY}],
    },
  };
}
