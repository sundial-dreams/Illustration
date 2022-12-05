import {Animated, TextStyle, ViewStyle} from 'react-native';

export interface PropsWithStyle {
  style?: ViewStyle | TextStyle | any;
}

export interface PropsWithOnTouch {
  onTouch?: () => void;
}
