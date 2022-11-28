import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {PaddingHorizontal} from '../../styles';
import {BackButton} from '../../components/common';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ContentWidth} from '../../utils';
import {RouteProp, useRoute} from '@react-navigation/native';
import FlatListTabView from '../../components/Lists/FlatListTabView';
import scss from './style.scss';

function HeaderBar(): React.ReactElement {
  const inset = useSafeAreaInsets();
  const route = useRoute<RouteProp<{params: {value: string}}>>();
  const value = route.params.value;

  return (
    <View style={[scss.header_bar, {paddingTop: inset.top}]}>
      <BackButton />
      <TextInput
        value={'Tag: ' + value}
        style={[scss.search_input, {width: ContentWidth - PaddingHorizontal}]}
      />
    </View>
  );
}

const tabItems = ['Newest', 'Popular', 'Oldest'];

const NullView = () => <View style={{height: 10, backgroundColor: 'white'}} />;

export default function FindList(): React.ReactElement {
  return (
    <View style={scss.find_list_screen}>
      <HeaderBar />
      <FlatListTabView
        frozeTop={10}
        renderHeader={NullView}
        tabItems={tabItems}
      />
    </View>
  );
}
