/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

LogBox.ignoreLogs(['Sending']);
LogBox.ignoreLogs(['Warning']);
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
AppRegistry.registerComponent(appName, () => App);
