import {Dimensions} from 'react-native';
import {PaddingHorizontal} from '../styles';

export const Layout = Dimensions.get('screen');

export const ContentWidth = Layout.width - 2 * PaddingHorizontal;

export const ScreenNames = ['Home', 'Tags'];
