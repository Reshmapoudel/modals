import {
  AuthAction,
  AuthState,
  SET_USER,
  SET_LOADING,
  SIGN_OUT,
  SET_ERROR,
  NEED_VERIFICATION,
  SET_SUCCESS,
  SET_COMPANY_AUTHENTICATION,
  SET_VALIDATION_ERROR,
  SET_XERO_USER,
} from '@/types'

const initialState: AuthState = {
  user: null,
  authenticated: false,
  company_authentication: false,
  loading: false,
  error: null,
  validation_error: null,
  need_verification: false,
  success: '',
}

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      }
    case SET_COMPANY_AUTHENTICATION:
      return {
        ...state,
        company_authentication: true,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case SIGN_OUT:
      return {
        ...state,
        user: null,
        authenticated: false,
        loading: false,
        company_authentication: false,
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        validation_error: null,
      }
    case SET_VALIDATION_ERROR:
      return {
        ...state,
        validation_error: action.payload,
        error: null,
      }
    case NEED_VERIFICATION:
      return {
        ...state,
        need_verification: true,
      }
    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
      }
    default:
      return state
  }
}

export default authReducer
