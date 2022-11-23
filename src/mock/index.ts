import {IllusItemType} from '../components/IllusItem';
import {ImageSourcePropType} from 'react-native';
type DataType = {source: ImageSourcePropType; type: IllusItemType};

export const feedImages: Array<[DataType, DataType?]> = [
  [
    {source: require('../assets/images/1.jpg'), type: IllusItemType.Middle},
    {source: require('../assets/images/9.jpg'), type: IllusItemType.Middle},
  ],
  [
    {source: require('../assets/images/7.jpg'), type: IllusItemType.Small},
    {
      source: require('../assets/images/4.jpg'),
      type: IllusItemType.MiddleLarge,
    },
  ],
  [{source: require('../assets/images/2.jpg'), type: IllusItemType.Large}],
  [
    {
      source: require('../assets/images/11.jpg'),
      type: IllusItemType.MiddleLarge,
    },
    {source: require('../assets/images/8.jpg'), type: IllusItemType.Small},
  ],
  [
    {
      source: require('../assets/images/5.jpg'),
      type: IllusItemType.Large,
    },
  ],
];
