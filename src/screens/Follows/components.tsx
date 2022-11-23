import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {ContentWidth} from '../../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Avatar from '../../components/Avatar';
import {DefaultFontStyle} from '../../styles';
import {PropsWithStyle} from '../../utils/interface';
const image1 = require('../../assets/images/avatar/avatar0.jpg');
const image2 = require('../../assets/images/avatar/avatar1.jpg');

export function ExploreIllustratorCard({
  style,
  onTouch,
}: {onTouch?: () => void} & PropsWithStyle): React.ReactElement {
  return (
    <TouchableWithoutFeedback onPress={onTouch}>
      <View style={[stylesOfExplore.explore, style]}>
        <Icon
          suppressHighlighting={true}
          name={'account-group'}
          size={24}
          color={'#c7c7c7'}
        />
        <Text style={stylesOfExplore.text} suppressHighlighting={true}>
          Explore Illustrator
        </Text>
        <View style={stylesOfExplore.avatarsWrapper}>
          <Avatar
            style={stylesOfExplore.avatar1}
            onTorch={() => {}}
            source={image1}
            size={40}
          />
          <Avatar
            style={stylesOfExplore.avatar2}
            onTorch={() => {}}
            source={image2}
            size={40}
          />
          <Avatar
            style={stylesOfExplore.avatar3}
            onTorch={() => {}}
            source={image1}
            size={40}
          />
        </View>
        <Icon
          suppressHighlighting={true}
          name={'chevron-right'}
          size={24}
          color={'#c7c7c7'}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const stylesOfExplore = StyleSheet.create({
  explore: {
    width: ContentWidth,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    ...DefaultFontStyle,
    fontSize: 16,
    color: '#C7C7C7',
    fontWeight: 'bold',
  },
  avatarsWrapper: {
    width: 80,
    height: 40,
    position: 'relative',
  },
  avatar1: {
    position: 'absolute',
    left: 0,
  },
  avatar2: {
    position: 'absolute',
    left: 20,
  },
  avatar3: {
    position: 'absolute',
    left: 40,
  },
});
