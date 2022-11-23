import React, {PropsWithChildren} from 'react';
import {View, Animated} from 'react-native';
import {PropsWithStyle} from '../utils/interface';

interface StickyHeaderProps extends PropsWithChildren, PropsWithStyle {
  animatedHeaderValue: number;
}

export default function StickyHeader({
  children,
}: StickyHeaderProps): React.ReactElement {
  return <View>{children}</View>;
}
