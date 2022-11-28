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

interface IAvatarProps {
  onTorch?: () => void;
  source: ImageSourcePropType;
  size: number;
  style?: StyleProp<ViewStyle>;
  touchable?: boolean;
}

const styles = StyleSheet.create({
  avatar_shadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
});

console.log(scss.avatar_shadow);
console.log(styles.avatar_shadow);

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
