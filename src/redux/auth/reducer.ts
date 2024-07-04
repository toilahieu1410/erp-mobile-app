import { LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT, SIGN_UP, SET_LOGGED_IN } from "../type";
import { REHYDRATE } from "redux-persist";

const initialState = {
  isLoggedIn: false,
  restoring: true,
  error: null,
  isLoading: true,
}

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case REHYDRATE: {
      if(!action.payload || action.payload.auth) {
        return state
      }
      return {...action.payload.auth, isLoading: false}
    }
  }
}

export default authReducer