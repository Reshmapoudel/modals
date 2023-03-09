import {
  SendDocketAction,
  CommonType,
  SET_SEND_DOCKET_VIEW_TYPE,
} from '@/types'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store'

export const setSentDocketViewType = (
  value: CommonType.TABLE_VIEW | CommonType.FOLDER_VIEW
): ThunkAction<void, RootState, null, SendDocketAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_SEND_DOCKET_VIEW_TYPE,
      payload: value,
    })
  }
}
