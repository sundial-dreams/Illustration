import React, {EffectCallback, useCallback, useEffect} from 'react';
import * as Keychain from 'react-native-keychain';
import {Dispatch} from 'redux';
import {resetToken, updateToken} from '../store/store';

export function useOnMount(callback: EffectCallback) {
  useEffect(callback, []);
}

export function useCheckLoginState(navigation) {
  useEffect(() => {
    Keychain.getGenericPassword()
      .then(credentials => {
        console.log(credentials);
        if (!credentials) {
          navigation.navigate('Login');
        }
      })
      .catch(() => {
        navigation.navigate('Login');
      });
  });
}

export function useLoadJWTToken(dispatch: Dispatch) {
  useOnMount(() => {
    Keychain.getGenericPassword().then(credentials => {
      if (credentials) {
        const token = credentials.password;
        dispatch(updateToken(JSON.parse(token)));
      }
    });
  });
}

export function useLogout(dispatch: Dispatch) {
  return useCallback(() => {
    Keychain.resetGenericPassword().then(() => {
      // @ts-ignore
      dispatch(resetToken());
    });
  }, []);
}
