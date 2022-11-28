import React from 'react';

import {RouteProp, useRoute} from '@react-navigation/native';
import UserProfile from './User';
import IllustratorProfile from './Illustrator';

export default function Profile(): React.ReactElement {
  const route =
    useRoute<RouteProp<{params: {isUser: boolean; userId: number}}>>();
  const {isUser} = route.params;

  return isUser ? <UserProfile /> : <IllustratorProfile />;
}
