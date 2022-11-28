import React, {useCallback, useMemo, useRef, useState} from 'react';

import {View, Animated, ImageSourcePropType, StyleSheet} from 'react-native';
import {PropsWithStyle} from '../../utils/interface';
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';

import scss from './style.scss';

export default function ImageTransformer({
  source,
  style,
}: PropsWithStyle & {
  source: ImageSourcePropType;
}): React.ReactElement {
  const [panEnabled, setPanEnabled] = useState(false);

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const pinchRef = useRef(null);
  const panRef = useRef(null);

  const onPinchEvent = useMemo(
    () =>
      Animated.event(
        [
          {
            nativeEvent: {scale},
          },
        ],
        {useNativeDriver: true},
      ),
    [scale],
  );

  const onPanEvent = useMemo(
    () =>
      Animated.event(
        [
          {
            nativeEvent: {
              translationX: translateX,
              translationY: translateY,
            },
          },
        ],
        {useNativeDriver: true},
      ),
    [translateX, translateY],
  );

  const onPinchStateChange = useCallback(
    ({nativeEvent}) => {
      if (nativeEvent.state === State.ACTIVE) {
        setPanEnabled(true);
      }
      const nScale = nativeEvent.scale;

      if (nativeEvent.state === State.END) {
        if (nScale < 1) {
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          });
          setPanEnabled(false);
        }
      }
    },
    [scale, translateX, translateY],
  );

  return (
    <View style={scss.image_transformer}>
      <PanGestureHandler
        onGestureEvent={onPanEvent}
        ref={panRef}
        simultaneousHandlers={[pinchRef]}
        enabled={panEnabled}
        failOffsetX={[-1000, 1000]}
        shouldCancelWhenOutside>
        <Animated.View style={style}>
          <PinchGestureHandler
            ref={pinchRef}
            onGestureEvent={onPinchEvent}
            simultaneousHandlers={[panRef]}
            onHandlerStateChange={onPinchStateChange}>
            <Animated.Image
              source={source}
              style={[
                scss.image,
                {transform: [{scale}, {translateX}, {translateY}]},
              ]}
            />
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}
