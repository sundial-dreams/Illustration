import {Dimensions} from 'react-native';
import {PaddingHorizontal} from '../styles';
import Keychain from 'react-native-keychain';
import {AuthTokenType} from '../services/types';

export const Layout = Dimensions.get('screen');

export const ContentWidth = Layout.width - 2 * PaddingHorizontal;

export async function saveToken(accessToken, refreshToken, expiresAt) {
  await Keychain.setGenericPassword(
    'token',
    JSON.stringify({
      accessToken,
      refreshToken,
      expiresAt,
    }),
  );
}

export async function loadToken(): Promise<AuthTokenType | null> {
  const credentials = await Keychain.getGenericPassword();
  if (credentials) {
    const token = credentials.password;
    return JSON.parse(token);
  }
  return null;
}
