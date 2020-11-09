import React from 'react';
import {Text, View} from 'react-native';

import LoginScreen from './screens/login/login.component';
import RegisterScreen from './screens/register/Register.component';

import {Router, Stack, Scene} from 'react-native-router-flux';
import HomeScreen from './screens/home/home.component';

import {connect, Provider} from 'react-redux';
import store from './redux/store';

const ConnectedRouter = connect()(Router);

const App = () => (
  <Provider store={store}>
    <ConnectedRouter>
      <Stack key="root">
        <Scene
          component={LoginScreen}
          hideNavBar={true}
          initial={true}
          key="login"
          title="Login"
        />
        <Scene
          key="home"
          component={HomeScreen}
          title="Home"
          hideNavBar={true}
        />
        <Scene key="register" component={RegisterScreen} title="Register" />
      </Stack>
    </ConnectedRouter>
  </Provider>
);

export default App;
