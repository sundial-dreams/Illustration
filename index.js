/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import 'react-native-gesture-handler';
import {name as appName} from './app.json';

LogBox.ignoreLogs(['Sending']);
LogBox.ignoreLogs(['Warning']);
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);
AppRegistry.registerComponent(appName, () => App);
