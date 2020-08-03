import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  input: '',
  imageUrl: '',
  box: {
    leftCol: "1",
    rightCol: "",
    topRow: "",
    bottomRow: ""
  },
  route: 'signin',
  isSignedIn: true,
  user: {
    id: '',
    name: "",
    email: "",
    entries: 0,
    joined: ''
  }
}
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.LOAD_USER:
      return {
        ...state,
        user: {
          ...action.payload
        }
      }
    case UserActionTypes.LOGOUT:
      return INITIAL_STATE

    case UserActionTypes.ROUTE_CHANGE:
      return {
        ...state,
        route: action.payload
      }

    case UserActionTypes.SET_BOX:
      return {
        ...state,
        box: {
          ...action.payload
        }
      }
    case UserActionTypes.SET_COUNT:
      return {
        ...state,
        user: {
          ...state.user,
          entries: action.payload
        }
      }

    case UserActionTypes.SET_SIGN_IN_STATUS:
      return {
        ...state,
        isSignedIn: action.payload
      }

    case UserActionTypes.SET_IMAGE_URL:
      return {
        ...state,
        imageUrl: action.payload
      }
    case UserActionTypes.RESET_STORE:
      return {
        ...state,
        user: {
          id: '',
          name: "",
          email: "",
          entries: 0,
          joined: ''
        },
        input: '',
        imageUrl: '',
        box: {
          leftCol: "",
          rightCol: "",
          topRow: "",
          bottomRow: ""
        }

      }
    default:
      return state;
  }
}

export default userReducer;
