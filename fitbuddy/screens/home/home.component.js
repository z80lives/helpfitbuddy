import React from 'react';
import {Text, View, Button} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Actions, ActionConst} from 'react-native-router-flux';
import {connect} from "react-redux";


class HomeScreen extends React.Component {
    state = {currentUser: null};

    redirectAuthentication = () => {
	if (!this.props.isAuthenticated) {
	    console.log('Not logged in!');
	    Actions.login({"type": ActionConst.RESET});
	}
    }

    componentDidMount() {
      this.redirectAuthentication();
  }
    componentDidUpdate(){
	this.redirectAuthentication();
    }

  userLogout = ()=>{
      this.props.logoutAction();
      //Actions.login();
  }

  clickRegisterButton = () => {
    console.log('I was clicked');
    //Actions.register();
    Actions.login();
  };

  render() {
    if (!this.props.isAuthenticated) {
      return (
        <View>
            <Text>User not logged in. Redirecting to login screen, please wait.</Text>
        </View>
      );
    } else {
	return <View>
		   <Text>Home Screen</Text>
		   <Button onPress={this.userLogout} title="Logout"/>
	       </View>
		   ;
    }
  }
}


const mapStateToProps = ({authReducer}) => ({
    isAuthenticated: authReducer.isAuthenticated
});

const logoutAction = (user) => ({
    type: "LOGOUT",
    payload: {}
});

export default connect(mapStateToProps, {logoutAction})(HomeScreen);
