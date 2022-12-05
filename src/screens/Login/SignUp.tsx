import React, {useCallback, useState} from 'react';
import {Animated, Text, View} from 'react-native';
import scss from './style.scss';
import {CheckBox, InputBox, SignButton, UnderlineButton} from './components';
import {ContentWidth} from '../../utils';
import {useBounceAnimation} from '../../hooks/animation';
import {register} from '../../services/mutation';
import useToast from '../../components/common/Toast';

export default function SignUp({
  onShiftToSignIn,
}: {
  onShiftToSignIn: () => void;
}): React.ReactElement {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const [errorInName, setErrorInName] = useState(true);
  const [errorInEmail, setErrorInEmail] = useState(true);
  const [errorInPassword, setErrorInPassword] = useState(true);
  const [errorInProtocol, setErrorInProtocol] = useState(true);

  const toast = useToast();

  const {animate, animationStyle} = useBounceAnimation();

  const onNameInput = useCallback((value: string) => {
    setName(value);
    setErrorInName(false);
  }, []);

  const onEmailInput = useCallback((value: string) => {
    setEmail(value);
    setErrorInEmail(false);
  }, []);

  const onPasswordInput = useCallback((value: string) => {
    setPassword(value);
    setErrorInPassword(false);
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

    if (!name) {
      setErrorInName(true);
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

    register(email, name, password)
      .then(() => {
        toast('Register Success!');
        onShiftToSignIn();
      })
      .catch(errno => {
        switch (errno) {
          case 3:
            setErrorInEmail(true);
            toast('Email has register!');
            break;
        }
      });
  }, [animate, checked, email, name, onShiftToSignIn, password, toast]);
  return (
    <View style={scss.sign_up}>
      <View style={scss.sign_up_input_block}>
        <InputBox
          style={errorInName && animationStyle}
          value={name}
          type={'username'}
          placeholder={'choose your nickname'}
          onInput={onNameInput}
        />
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
          placeholder={'choose your password'}
          onInput={onPasswordInput}
        />
        <Animated.View
          style={[scss.protocol_block, errorInProtocol && animationStyle]}>
          <CheckBox checked={checked} onCheck={onCheck} />
          <Text style={[scss.protocol_text, {width: ContentWidth - 10 - 16}]}>
            I am confirm to our Privacy Policy and Terms of Service.
          </Text>
        </Animated.View>
        <View style={scss.button_group}>
          <SignButton text="Sign Up" onTouch={onSubmit} />
          <UnderlineButton text="Or sign in" onTouch={onShiftToSignIn} />
        </View>
      </View>
    </View>
  );
}
