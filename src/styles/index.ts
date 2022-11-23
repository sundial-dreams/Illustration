import {TextStyle, ViewStyle} from 'react-native';

export const DefaultFontStyle: TextStyle = {
  fontFamily: 'Times New Roman',
  color: 'black',
  fontWeight: 'bold',
};

export const DefaultBackgroundColor: ViewStyle = {
  backgroundColor: 'white',
};

// paddingHorizontal
export const PaddingHorizontal = 28;

export const FlexCenterStyle: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};

export const newShadow = (
  blur: number = 20,
  opacity: number = 0.2,
  color: string = 'black',
  offset: {width: number; height: number} = {width: 0, height: 0},
): ViewStyle => ({
  shadowColor: color,
  shadowOffset: offset,
  shadowRadius: blur,
  shadowOpacity: opacity,
});
