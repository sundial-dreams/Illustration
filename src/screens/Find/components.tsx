import React, {PropsWithChildren, useCallback, useState} from 'react';

import {Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ContentWidth} from '../../utils';
import {PropsWithStyle} from '../../utils/interface';
import {useNavigation} from '@react-navigation/native';
import scss from './style.scss';

export function SearchBox({style}: PropsWithStyle): React.ReactElement {
  const [text, setText] = useState('');
  const navigation = useNavigation();

  const onSubmitEditing = useCallback(() => {
    // @ts-ignore
    navigation.push('FindList', {value: text});
  }, [text]);

  return (
    <View
      style={[
        scss.cpm_search_box,
        {width: ContentWidth, height: IconSize},
        style,
      ]}>
      <TextInput
        placeholder={'tag, user'}
        placeholderTextColor={'#b7b7b7'}
        style={[
          scss.search_box_input,
          {width: ContentWidth - IconSize, height: IconSize},
        ]}
        value={text}
        onSubmitEditing={onSubmitEditing}
        onChangeText={t => setText(t)}
      />
      <View
        style={[
          scss.search_box_icon_block,
          {width: IconSize, height: IconSize},
        ]}>
        <Icon name={'magnify'} size={24} color={'black'} />
      </View>
    </View>
  );
}

const IconSize = 36;

export function DeleteButton({
  onTouch,
  children,
  style,
}: {onTouch: () => void} & PropsWithChildren & PropsWithStyle) {
  return (
    <TouchableWithoutFeedback onPress={onTouch}>
      <View style={[scss.cpm_delete_button, style]}>
        <Icon
          suppressHighlighting={true}
          name={'trash-can'}
          size={16}
          color={'#DADADA'}
        />
        <Text style={scss.delete_button_text} suppressHighlighting={true}>
          {children}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
