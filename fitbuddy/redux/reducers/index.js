import {ActionConst} from 'react-native-router-flux';
import {combineReducers, createStore} from 'redux';

const sceneReducer = (state = {}, {type, scene}) => {
  switch (type) {
    case ActionConst.FOCUS:
      return {...state, scene};
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: '',
};

const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case "LOGIN":
      return {...state, user: payload.user, isAuthenticated: true};
    default:
      return state;
  }
};

export default combineReducers({sceneReducer, authReducer});
