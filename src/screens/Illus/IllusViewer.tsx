import React from 'react';

import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';
import {BackButton} from '../../components/common';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlexCenterStyle, PaddingHorizontal} from '../../styles';
import {RouteProp, useRoute} from '@react-navigation/native';
import ImageTransformer from '../../components/common/ImageTransformer';
import {Layout} from '../../utils';
import scss from './style.scss';

type RouteType = RouteProp<{
  params: {source: ImageSourcePropType; width: number; height: number};
}>;

export default function IllusViewer(): React.ReactElement {
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteType>();
  const {source, width, height} = route.params;
  const ratio = Layout.width / width;
  return (
    <View style={scss.image_viewer_screen} pointerEvents={'box-none'}>
      <ImageBackground
        blurRadius={50}
        source={source}
        style={scss.image_blur_background}>
        <ImageTransformer source={source} style={{height: height * ratio}} />
      </ImageBackground>
      <View style={[scss.image_viewer_header_bar, {paddingTop: insets.top}]}>
        <BackButton />
      </View>
    </View>
  );
}
