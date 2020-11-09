import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

export class RegisterScreen extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    email: '',
  };
  render() {
    return (
      <View>
        <Text>Register Screen Here </Text>
        <TextInput
          placeholder="username"
          onChangeText={(text) => this.setState({username: text})}
        />
      </View>
    );
  }
}

export default RegisterScreen;
