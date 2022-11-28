import {
  IllusImageDataType,
  IllusImageType,
} from '../components/Lists/IllusItem';
import {ImageSourcePropType} from 'react-native';
import {IllusTagCoverProps, IllusCardTypes} from '../screens/Tags/components';
import {IllustratorListItemProps} from '../screens/Following/components';
import {IllusSizeType, IllustratorCard} from '../screens/Explore/components';

type DataType = {source: ImageSourcePropType; type: IllusImageType};

export const feedImages: Array<Array<IllusImageDataType>> = [
  [
    {source: require('../assets/images/1.jpg'), type: IllusImageType.Middle},
    {source: require('../assets/images/9.jpg'), type: IllusImageType.Middle},
  ],
  [
    {source: require('../assets/images/7.jpg'), type: IllusImageType.Small},
    {
      source: require('../assets/images/4.jpg'),
      type: IllusImageType.MiddleLarge,
    },
  ],
  [{source: require('../assets/images/2.jpg'), type: IllusImageType.Large}],
  [
    {
      source: require('../assets/images/11.jpg'),
      type: IllusImageType.MiddleLarge,
    },
    {source: require('../assets/images/8.jpg'), type: IllusImageType.Small},
  ],
  [
    {
      source: require('../assets/images/5.jpg'),
      type: IllusImageType.Large,
    },
  ],
];

export const tagNames = [
  'Re:0',
  'HuTao',
  'XinHai',
  'Yuri',
  'JK',
  'Ark',
  'Genshin Impact',
  'Honkai 3rd',
];

export const tagItems: Array<
  [IllusTagCoverProps, IllusTagCoverProps?, IllusTagCoverProps?]
> = [
  [
    {
      name: 'Genshin Impact',
      total: 2000,
      type: IllusCardTypes.Large,
      source: require('../assets/images/2.jpg'),
    },
  ],
  [
    {
      name: 'Girl',
      total: 2000,
      type: IllusCardTypes.Small,
      source: require('../assets/images/1.jpg'),
    },
    {
      name: 'Cat Ear',
      total: 3000,
      type: IllusCardTypes.Middle,
      source: require('../assets/images/4.jpg'),
    },
  ],
  [
    {
      name: 'JK',
      total: 400,
      type: IllusCardTypes.Middle,
      source: require('../assets/images/5.jpg'),
    },
    {
      name: 'Honkai 3rd',
      total: 200,
      type: IllusCardTypes.Small,
      source: require('../assets/images/9.jpg'),
    },
  ],
  [
    {
      name: 'HuTao',
      total: 100,
      type: IllusCardTypes.Small,
      source: require('../assets/images/10.jpg'),
    },
    {
      name: 'XinHai',
      total: 220,
      type: IllusCardTypes.Small,
      source: require('../assets/images/8.jpg'),
    },
    {
      name: 'HuTao',
      total: 100,
      type: IllusCardTypes.Small,
      source: require('../assets/images/11.jpg'),
    },
  ],
  [
    {
      name: 'Yuri',
      total: 1000,
      type: IllusCardTypes.Middle,
      source: require('../assets/images/3.jpg'),
    },
    {
      name: 'Ark',
      total: 200,
      type: IllusCardTypes.Small,
      source: require('../assets/images/7.jpg'),
    },
  ],
];

export const followingUser: Array<IllustratorListItemProps> = [
  {
    illustrator: {
      avatar: require('../assets/images/1.jpg'),
    },
    username: 'sundial-dreams',
    star: 20,
    followed: 30,
  },
  {
    illustrator: {
      avatar: require('../assets/images/9.jpg'),
    },
    username: 'daydreams',
    star: 20,
    followed: 30,
  },
  {
    illustrator: {
      avatar: require('../assets/images/11.jpg'),
    },
    username: 'aurora',
    star: 20,
    followed: 30,
  },
  {
    illustrator: {
      avatar: require('../assets/images/8.jpg'),
    },
    username: 'Time',
    star: 20,
    followed: 30,
  },

  {
    illustrator: {
      avatar: require('../assets/images/9.jpg'),
    },
    username: 'It',
    star: 20,
    followed: 30,
  },

  {
    illustrator: {
      avatar: require('../assets/images/9.jpg'),
    },
    username: 'Mack',
    star: 20,
    followed: 30,
  },
  {
    illustrator: {
      avatar: require('../assets/images/avatar/avatar1.jpg'),
    },
    username: 'Halo',
    star: 20,
    followed: 30,
  },
  {
    illustrator: {
      avatar: require('../assets/images/avatar/avatar0.jpg'),
    },
    username: 'Heap',
    star: 20,
    followed: 30,
  },
];

export const illustrators: Array<IllustratorCard> = [
  {
    username: 'sundial-dreams',
    avatar: require('../assets/images/avatar/avatar0.jpg'),
    illustrations: [
      {type: IllusSizeType.Small, source: require('../assets/images/1.jpg')},
      {type: IllusSizeType.Small, source: require('../assets/images/11.jpg')},
      {type: IllusSizeType.Small, source: require('../assets/images/7.jpg')},
      {type: IllusSizeType.Small, source: require('../assets/images/8.jpg')},
    ],
    totalIllustration: 200,
  },
  {
    username: 'daydreams',
    avatar: require('../assets/images/avatar/avatar1.jpg'),
    illustrations: [
      {type: IllusSizeType.Small, source: require('../assets/images/8.jpg')},
      {type: IllusSizeType.Middle, source: require('../assets/images/5.jpg')},
      {type: IllusSizeType.Middle, source: require('../assets/images/10.jpg')},
    ],
    totalIllustration: 300,
  },
  {
    username: 'daydreams',
    avatar: require('../assets/images/avatar/avatar0.jpg'),
    illustrations: [
      {type: IllusSizeType.Middle, source: require('../assets/images/5.jpg')},
      {type: IllusSizeType.Middle, source: require('../assets/images/2.jpg')},
      {type: IllusSizeType.Small, source: require('../assets/images/8.jpg')},
    ],
    totalIllustration: 400,
  },
];
