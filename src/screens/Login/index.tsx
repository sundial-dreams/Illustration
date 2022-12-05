import React, {useState} from 'react';

import {Text, View} from 'react-native';

import scss from './style.scss';
import {GoBackButton} from './components';
import {ToastProvider} from '../../components/common/Toast';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function Login(): React.ReactElement {
  const [signUp, setSignUp] = useState(false);
  const elem = signUp ? (
    <SignUp onShiftToSignIn={() => setSignUp(false)} />
  ) : (
    <SignIn onShiftToSignUp={() => setSignUp(true)} />
  );

  const title = signUp ? 'Sign up for' : 'Sign into';

  return (
    <ToastProvider>
      <View style={scss.login_screen}>
        <GoBackButton style={scss.go_back_button} />
        <View style={scss.title}>
          <Text style={scss.title_text}>{title}</Text>
          <Text style={scss.title_text}>Illust</Text>
        </View>
        {elem}
      </View>
    </ToastProvider>
  );
}
