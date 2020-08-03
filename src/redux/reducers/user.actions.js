import { UserActionTypes } from './user.types';

export const loadUser = data => ({
  type: UserActionTypes.LOAD_USER,
  payload: data
})

export const logout = data => ({
  type: UserActionTypes.LOGOUT,
  payload: data
})

export const routeChange = data => ({
  type: UserActionTypes.ROUTE_CHANGE,
  payload: data
})

export const setBox = data => ({
  type: UserActionTypes.SET_BOX,
  payload: data
})

export const setSignInStatus = data => ({
  type: UserActionTypes.SET_SIGN_IN_STATUS,
  payload: data
})

export const setImageUrl = data => ({
  type: UserActionTypes.SET_IMAGE_URL,
  payload: data
})

export const setCount = count => ({
  type: UserActionTypes.SET_COUNT,
  payload: count
})

export const resetStore = () => ({
  type: UserActionTypes.RESET_STORE
})