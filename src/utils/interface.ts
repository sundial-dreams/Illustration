import {TextStyle, ViewStyle} from 'react-native';

export interface PropsWithStyle {
  style?: ViewStyle | TextStyle;
}

export interface PropsWithOnTouch {
  onTouch?: () => void;
}
