import {actionType} from "./actionType.js";

export const loginAction = (user) => ({
  type: 'LOGIN',
  payload: {
    user: user,
  },
});

export default {
    loginAction
};
