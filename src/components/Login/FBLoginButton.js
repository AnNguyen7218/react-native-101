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
          this.getAccessToken()
        }
      },
      function (error) {
        alert('Login fail with error: ' + error)
      }
    )
  }

  getAccessToken = () => {
    AccessToken.getCurrentAccessToken().then(data => {
      console.log(data.accessToken.toString());
      this.getUserInfo()
    });
  }

  getUserInfo = () => {
    const processRequest = new GraphRequest(
      '/me?fields=name,picture.type(large)',
      null,
      this.getResponseInfo
    );
    new GraphRequestManager().addRequest(processRequest).start();
  }

  getResponseInfo = (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      console.log(result);
    }
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