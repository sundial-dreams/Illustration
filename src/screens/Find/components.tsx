import React, {PropsWithChildren, useState} from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ContentWidth} from '../../utils';
import {DefaultFontStyle, FlexCenterStyle} from '../../styles';
import {PropsWithStyle} from '../../utils/interface';

export function SearchBox({style}: PropsWithStyle): React.ReactElement {
  const [text, setText] = useState('');
  return (
    <View style={[stylesOfSearchBox.searchBox, style]}>
      <TextInput
        placeholder={'tag, user'}
        placeholderTextColor={'#b7b7b7'}
        style={stylesOfSearchBox.textInput}
        value={text}
        onChangeText={t => setText(t)}
      />
      <View style={stylesOfSearchBox.iconWrapper}>
        <Icon name={'magnify'} size={24} color={'black'} />
      </View>
    </View>
  );
}

const IconSize = 36;

const stylesOfSearchBox = StyleSheet.create({
  searchBox: {
    width: ContentWidth,
    height: IconSize,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EFEFEF',
  },
  textInput: {
    width: ContentWidth - IconSize,
    height: IconSize,
    backgroundColor: '#EFEFEF',
    paddingLeft: 10,
    ...DefaultFontStyle,
    fontSize: 16,
  },
  iconWrapper: {
    width: IconSize,
    height: IconSize,
    ...FlexCenterStyle,
  },
});

export function DeleteButton({
  onTouch,
  children,
  style,
}: {onTouch: () => void} & PropsWithChildren & PropsWithStyle) {
  return (
    <TouchableWithoutFeedback onPress={onTouch}>
      <View style={[stylesOfDeleteButton.deleteButton, style]}>
        <Icon
          suppressHighlighting={true}
          name={'trash-can'}
          size={16}
          color={'#DADADA'}
        />
        <Text style={stylesOfDeleteButton.text} suppressHighlighting={true}>
          {children}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const stylesOfDeleteButton = StyleSheet.create({
  deleteButton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    ...DefaultFontStyle,
    fontSize: 14,
    color: '#DADADA',
    marginLeft: 5,
  },
});
