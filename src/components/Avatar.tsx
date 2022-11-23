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

interface IAvatarProps {
  onTorch: () => void;
  source: ImageSourcePropType;
  size: number;
  style?: StyleProp<ViewStyle>;
}

export default function Avatar({
  source,
  size,
  onTorch,
  style = {},
}: IAvatarProps): React.ReactElement {
  const sizeStyle = {width: size, height: size, borderRadius: size / 2};
  const navigation = useNavigation();
  const handleAvatarTouch = useCallback(() => {
    // @ts-ignore
    navigation.push('Profile', {
      isUser: true,
    });
  }, [navigation]);
  return (
    <DropShadow style={styles.iconShadow}>
      <TouchableWithoutFeedback onPress={handleAvatarTouch}>
        <View style={[styles.avatar, sizeStyle, style]}>
          <Image style={[styles.image]} source={source} />
        </View>
      </TouchableWithoutFeedback>
    </DropShadow>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderStyle: 'solid',
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: 'white',
  },
  iconShadow: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.1,
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
});
