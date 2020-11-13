import React, {Component} from 'react';
import {Alert, AsyncStorage, Button, TextInput, View, Text} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import {connect} from 'react-redux';

//import {loginAction} from "redux/actions/index";

class LoginScreen extends Component {
  state = {
    username: null,
    password: null,
    isLoading: null,
  };

  constructor() {
      super();
      this.state = {
        username: '',
        password: '',
      };
  }

    redirectAuthentication = () => {
	if (this.props.isAuthenticated) {
	    Actions.home({"type": ActionConst.RESET});
	}
    }
    
  componentDidUpdate() {
      this.redirectAuthentication();
  }

    componentDidMount(){
	this.redirectAuthentication(); 
    }
    
  saveItem = async (item, selectedValue) => {
    console.log('Saving item', item);
    /*
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error' + error.message);
    }*/
  };

  userSignup() {
    //console.log("SaveItem", this.saveItem);
    //this.saveItem('id_token', '1234567');
    Alert.alert('Login Success', 'Click the button to continue');
    //Actions.home();
  }

  userLogin = () => {
    //console.log("Login in");
    //console.log("SaveItem", this.saveItem);
    console.log(this.state);
    console.log("props", this.props);
    this.props.loginAction(this.state.username);
    this.saveItem('id_token', '1234567');
    this.setState({isAuthenticated: true});
    //Actions.home();
  };

  render() {
    if (!this.props.isAuthenticated) {
      return (
        <View>
          <TextInput
            editable={true}
            onChangeText={(username) => this.setState({username: username})}
            placeholder="username"
            returnKeyType="next"
            value={this.state.username}
          />
          <TextInput
            editable={true}
            onChangeText={(password) => this.setState({password: password})}
            placeholder="Password"
            returnKeyType="next"
            secureTextEntry={true}
            value={this.state.password}
          />
          <Button
            style={{marginBottom: '1em'}}
            onPress={this.userSignup}
            title="Sign Up"
          />
          <Button onPress={this.userLogin} title="Login" />
        </View>
      );
    } else {
	return <View><Text>Already logged in. Please wait.</Text></View>;
    }
  }
}

const mapStateToProps = ({authReducer}) => ({
  isAuthenticated: authReducer.isAuthenticated,
  isLoading: authReducer.isLoading,
});


const loginAction = (user) => ({
  type: 'LOGIN',
  payload: {
    user: user,
  },
});


//const mapDispatchToProps
//export default LoginScreen;
export default connect(mapStateToProps, {loginAction})(LoginScreen);
