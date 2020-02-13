import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import styles from './styles';

export default class FBLoginButton extends Component {
  onToggleLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          alert('Login cancelled')
        } else {
          alert('Login success with permissions: ' + result.grantedPermissions.toString())
          console.log(result)
        }
      },
      function (error) {
        alert('Login fail with error: ' + error)
      }
    )
  }
  render() {
    return (
      <View style={styles.fbWrapper}>
        <Button
          onPress={this.onToggleLogin}
          title="Login with Facebook"
          style={styles.fbBtn}
        />
      </View>
    );
  }
};

module.exports = FBLoginButton;