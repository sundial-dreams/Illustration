import React, {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useBounceAnimation} from '../../hooks/animation';
import useToast from '../../components/common/Toast';
import {login} from '../../services/mutation';
import {LoginResponseType} from '../../services/types';
import {
  setupAuthInterceptors,
  setupRefreshTokenInterceptor,
} from '../../services';
import {updateToken} from '../../store/store';
import {ContentWidth, saveToken} from '../../utils';
import {Animated, Text, View} from 'react-native';
import scss from './style.scss';
import {CheckBox, InputBox, SignButton, UnderlineButton} from './components';

export default function SignIn({
  onShiftToSignUp,
}: {
  onShiftToSignUp: () => void;
}): React.ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const [errorInProtocol, setErrorInProtocol] = useState(true);
  const [errorInEmail, setErrorInEmail] = useState(true);
  const [errorInPassword, setErrorInPassword] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {animate, animationStyle} = useBounceAnimation();

  const toast = useToast();

  const onEmailInput = useCallback((value: string) => {
    setErrorInEmail(false);
    setEmail(value);
  }, []);

  const onPasswordInput = useCallback((value: string) => {
    setErrorInPassword(false);
    setPassword(value);
  }, []);

  const onCheck = useCallback(() => {
    setChecked(c => {
      setErrorInProtocol(c);
      return !c;
    });
  }, []);

  const onSubmit = useCallback(() => {
    if (!email) {
      setErrorInEmail(true);
      animate();
      return;
    }

    if (!password) {
      setErrorInPassword(true);
      animate();
      return;
    }

    if (!checked) {
      setErrorInProtocol(true);
      animate();
      return;
    }

    // @ts-ignore
    login(email, password)
      .then(async data => {
        const {accessToken, refreshToken, expiresAt} =
          data as LoginResponseType;
        setupAuthInterceptors(accessToken);
        dispatch(updateToken({accessToken, refreshToken, expiresAt}));
        await saveToken(accessToken, refreshToken, expiresAt);
        setupRefreshTokenInterceptor(
          refreshToken,
          // eslint-disable-next-line @typescript-eslint/no-shadow
          async (accessToken, expiresAt) => {
            dispatch(updateToken({accessToken, refreshToken, expiresAt}));
            await saveToken(accessToken, refreshToken, expiresAt);
          },
        );
        navigation.goBack();
      })
      .catch(errno => {
        switch (errno) {
          case 3:
            setErrorInEmail(true);
            toast('User Not Found!');
            break;
          case 4:
            setErrorInPassword(true);
            toast('Password Error!');
            break;
        }
      });
  }, [animate, checked, dispatch, email, navigation, password, toast]);

  return (
    <View style={scss.sign_in}>
      <View style={scss.sign_in_input_block}>
        <InputBox
          style={errorInEmail && animationStyle}
          value={email}
          type={'emailAddress'}
          placeholder={'your.email@address.com'}
          onInput={onEmailInput}
        />
        <InputBox
          style={errorInPassword && animationStyle}
          value={password}
          type={'password'}
          placeholder={'enter your password'}
          onInput={onPasswordInput}
        />
      </View>
      <Animated.View
        style={[scss.protocol_block, errorInProtocol && animationStyle]}>
        <CheckBox checked={checked} onCheck={onCheck} />
        <Text style={[scss.protocol_text, {width: ContentWidth - 10 - 16}]}>
          I am agree to our Privacy Policy and Terms of Service.
        </Text>
      </Animated.View>
      <View style={scss.button_group}>
        <SignButton text="Sign In" onTouch={onSubmit} />
        <UnderlineButton text="Or sign up" onTouch={onShiftToSignUp} />
      </View>
    </View>
  );
}
