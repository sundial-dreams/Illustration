import React, {useCallback} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageSourcePropType,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from 'react-native';

import DropShadow from 'react-native-drop-shadow';
import {useNavigation} from '@react-navigation/native';
import scss from './style.scss';

console.log('scss = ', scss.avatar_shadow);

interface IAvatarProps {
  onTorch?: () => void;
  source: ImageSourcePropType;
  size: number;
  style?: StyleProp<ViewStyle>;
  touchable?: boolean;
}

export default function Avatar({
  source,
  size,
  onTorch,
  touchable = true,
  style = {},
}: IAvatarProps): React.ReactElement {
  const sizeStyle = {width: size, height: size, borderRadius: size / 2};
  const navigation = useNavigation();
  const handleAvatarTouch = useCallback(() => {
    onTorch && onTorch!();
    if (typeof (navigation as any).push !== 'undefined') {
      (navigation as any).push('Profile', {
        isUser: true,
      });
      return;
    }
    // @ts-ignore
    navigation.navigate('Profile', {isUser: true});
  }, []);
  const imageElem = (
    <View style={[scss.avatar, sizeStyle, style]}>
      <Image style={[scss.avatar_image]} source={source} />
    </View>
  );

  const elem = touchable ? (
    <TouchableWithoutFeedback onPress={handleAvatarTouch}>
      {imageElem}
    </TouchableWithoutFeedback>
  ) : (
    imageElem
  );

  return <DropShadow style={[scss.avatar_shadow]}>{elem}</DropShadow>;
}
