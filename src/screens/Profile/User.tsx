import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import {
  DefaultBackgroundColor,
  DefaultFontStyle,
  FlexCenterStyle,
  PaddingHorizontal,
} from '../../styles';
import Avatar from '../../components/common/Avatar';
import {DataDetailCard} from './components';
import {PropsWithOnTouch, PropsWithStyle} from '../../utils/interface';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BackButton} from '../../components/common';
import {ContentWidth} from '../../utils';
import FlatListTabView from '../../components/Lists/FlatListTabView';
import DropShadow from 'react-native-drop-shadow';
import scss from './style.scss';

const image2 = require('../../assets/images/avatar/avatar1.jpg');

const source = require('../../assets/images/5.jpg');

const details = [
  {title: 'Following', value: '100'},
  {title: 'Like', value: '200'},
  {
    title: 'Saved',
    value: '300',
  },
];

function EditProfileButton({
  style,
  onTouch,
}: PropsWithStyle & PropsWithOnTouch): React.ReactElement {
  return (
    <TouchableWithoutFeedback onPress={onTouch}>
      <View style={[[scss.edit_profile_button, {width: ContentWidth}], style]}>
        <Text style={scss.edit_profile_button_text}>Edit Profile</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

function ProfileContainer(): React.ReactElement {
  return (
    <View style={scss.profile_container}>
      <DropShadow style={scss.content_shadow}>
        <View style={scss.profile_content}>
          <Avatar source={image2} size={80} style={scss.user_avatar} />
          <View style={scss.user_detail}>
            <Text style={scss.username}>sundial dreams</Text>
            <Text style={scss.description}>hello world</Text>
          </View>
          <DataDetailCard style={scss.data_detail_card} details={details} />
          <View style={scss.edit_profile_button_block}>
            <EditProfileButton />
          </View>
        </View>
      </DropShadow>
    </View>
  );
}

const tabItems = ['Trace', 'Liked', 'Saved'];

export default function UserProfile(): React.ReactElement {
  const insets = useSafeAreaInsets();
  return (
    <View style={scss.user_profile_screen}>
      <View style={scss.user_cover_block}>
        <ImageBackground style={scss.user_cover} source={source} />
      </View>
      <View style={[scss.header_bar, {paddingTop: insets.top}]}>
        <BackButton />
      </View>
      <FlatListTabView renderHeader={ProfileContainer} tabItems={tabItems} />
    </View>
  );
}
