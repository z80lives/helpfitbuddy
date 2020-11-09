import React from 'react';
import {Text, View, Button} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';

export default class HomeScreen extends React.Component {
  state = {currentUser: null};

  componentDidMount() {
    if (this.state.currentUser == null) {
      console.log('Not logged in!');
    } else {
      console.log('Logged in');
    }
  }

  userLogout(){
    Actions.login();
  }

  clickRegisterButton = () => {
    console.log('I was clicked');
    //Actions.register();
    Actions.login();
  };

  render() {
    if (this.state.user == null) {
      return (
        <View>
          <TouchableOpacity onPress={this.clickRegisterButton}>
            <Text>Click here to login</Text>
            <Button
              onPress={this.clickRegisterButton}
              title="Register"
              color="#841584"
              accessibilityLabel="Click here to create a new account"
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return <Text>Home Screen</Text>;
    }
  }
}
