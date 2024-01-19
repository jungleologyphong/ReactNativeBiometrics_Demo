/* eslint-disable no-console */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './Auth.styles';
import {AuthLogic} from './Auth.logic';

import {useAltaIntl} from '~core/helper';

import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

export const Auth: React.FC<any> = props => {
  const {} = props;
  const {translate} = useAltaIntl();
  const {} = AuthLogic();

  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  const fnc_checSensorkAvaiable = async () => {
    const {biometryType} = await rnBiometrics.isSensorAvailable();

    if (biometryType === BiometryTypes.Biometrics) {
      rnBiometrics.isSensorAvailable().then(resultObject => {
        const {available, biometryType} = resultObject;

        if (available && biometryType === BiometryTypes.TouchID) {
          console.log('TouchID is supported');
        } else if (available && biometryType === BiometryTypes.FaceID) {
          console.log('FaceID is supported');
        } else if (available && biometryType === BiometryTypes.Biometrics) {
          console.log('Biometrics is supported');
        } else {
          console.log('Biometrics not supported');
        }
      });
    }
  };

  const fnc_createKeys = () => {
    rnBiometrics.createKeys().then(resultObject => {
      const {publicKey, privateKey} = resultObject;

      console.log('Public key:', publicKey);

      console.log('Private key:', privateKey);
    });
  };

  const fnc_simplePrompt = () => {
    rnBiometrics
      .simplePrompt({
        fallbackPromptMessage: 'Thanks',
        promptMessage: 'Xác nhận vân tay',
        cancelButtonText: 'Hủy',
      })
      .then(resultObject => {
        console.log(resultObject);

        const {success} = resultObject;

        if (success) {
          console.log('successful biometrics provided');
        } else {
          console.log('user cancelled biometric prompt');
        }
      })
      .catch(() => {
        console.log('biometrics failed');
      });
  };

  const fnc_createSignature = () => {
    rnBiometrics.createKeys().then(resultObject => {
      const {publicKey} = resultObject;

      const username = 'nhatphong.dev';

      rnBiometrics
        .createSignature({
          promptMessage: 'Sign in',
          payload: publicKey + username,
        })
        .then(resultObject => {
          const {success, signature} = resultObject;

          if (success) {
            console.log('signature:', signature);

            console.log('successful biometrics provided');
          } else {
            console.log('user cancelled biometric prompt');
          }
        });
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => fnc_checSensorkAvaiable()}
        style={styles.containerTouchable}>
        <Text style={{color: 'black'}}>Check is Sensor</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => fnc_createKeys()}
        style={styles.containerTouchable}>
        <Text style={{color: 'black'}}>Create Keys</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log('Private Key')}
        style={styles.containerTouchable}>
        <Text style={{color: 'black'}}>Private Key</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => fnc_createSignature()}
        style={styles.containerTouchable}>
        <Text style={{color: 'black'}}>Signature</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => fnc_simplePrompt()}
        style={styles.containerTouchable}>
        <Text style={{color: 'black'}}>Simple Prompt</Text>
      </TouchableOpacity>

      <Text style={styles.txt}>{translate('welcome')}</Text>
    </View>
  );
};
