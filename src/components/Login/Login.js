import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import TextField from '../common/TextField';
import ErrorView from '../common/ErrorView';
import styles from './styles';

import ShadowStyles from 'helpers/ShadowStyles';
import TextStyles from 'helpers/TextStyles';
import getUser from 'selectors/UserSelectors';
import errorsSelector from 'selectors/ErrorSelectors';
import { isLoadingSelector } from 'selectors/StatusSelectors';
import strings from 'localization';
import { login } from 'actions/UserActions';

import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

function Login(props) {
  let [email, setEmail] = useState('');
  let [name, setName] = useState('');

  const user = useSelector(state => getUser(state));
  
  const dispatch = useDispatch();
 
  const loginUser =  useCallback((email, name) => dispatch(login(email, name), [email, name, dispatch]));

  const getAccessToken = () => {
    AccessToken.getCurrentAccessToken().then(data => {
      getUserInfo()
    });
  }
  
  const updateState = (email, name) => {
    setName(name);
    setEmail(email);
  }
  
  const getResponseInfoCb = (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      const {email, name} = result
      updateState(email, name)
    }
  }
  
  const getUserInfo = () => {
    const processRequest = new GraphRequest(
      '/me',
      {
        parameters: {
          fields: {
            string: 'id,name,email'
          }
        }
      },
      getResponseInfoCb
    );
    new GraphRequestManager().addRequest(processRequest).start();
  }

  const onToggleLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          alert('Login cancelled')
        } else {
          // alert('Login success with permissions: ' + result.grantedPermissions.toString())
          getAccessToken()
        }
      },
      function (error) {
        alert('Login fail with error: ' + error)
      }
    )
  }

  useEffect(() => {
    if (user !== null) {
      props.navigation.navigate('App');
    }
    if (email !== '' && name !== '') {
      loginUser(email, name)
    }
  });

  return (
    <View style={styles.container}>
      <View style={[styles.formContainer, ShadowStyles.shadow]}>
        <Text style={TextStyles.fieldTitle}>
          {strings.email}
        </Text>
        <TextField
          placeholder={strings.email}
          value={email}
        />
        <Text style={TextStyles.fieldTitle}>
          {strings.name}
        </Text>
        <TextField
          placeholder={strings.name}
          value={name}
        />
        <View style={styles.fbWrapper}>
          <Button
            onPress={onToggleLogin}
            title="Login with Facebook"
            style={styles.fbBtn}
          />
        </View>
      </View>
    </View>
  );
}

Login.navigationOptions = {
  header: null,
};

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Login;
