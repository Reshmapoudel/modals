import {
  SET_XERO_TOKENS,
  SET_XERO_USER,
  XeroActionType,
  XeroInfo,
  XeroUserDetail,
} from '@/types'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store'

export const setXeroInfoTokens = (
  value: XeroInfo
): ThunkAction<void, RootState, null, XeroActionType> => {
  return (dispatch) => {
    dispatch({
      type: SET_XERO_TOKENS,
      payload: value,
    })
  }
}

export const setXeroUserDetails = (
  value: XeroUserDetail
): ThunkAction<void, RootState, null, XeroActionType> => {
  return (dispatch) => {
    dispatch({
      type: SET_XERO_USER,
      payload: value,
    })
  }
}
