import {
  XeroInfo,
  XeroUser,
  XeroTypeState,
  XeroActionType,
  SET_XERO_TOKENS,
  SET_XERO_USER,
} from '@/types'

const initialState: XeroTypeState = {
  xero_user: null,
  xero_info: null,
}

const XeroStateReducer = (
  state = initialState,
  action: XeroActionType
): XeroTypeState => {
  switch (action.type) {
    case SET_XERO_TOKENS:
      return {
        ...state,
        xero_info: action.payload,
      }

    case SET_XERO_USER:
      return {
        ...state,
        xero_user: action.payload,
      }
    default:
      return state
  }
}

export default XeroStateReducer
