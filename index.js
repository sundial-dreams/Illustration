/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import 'react-native-gesture-handler';
import {name as appName} from './app.json';

LogBox.ignoreLogs(['Sending']);
LogBox.ignoreLogs(['Warning']);
AppRegistry.registerComponent(appName, () => App);
