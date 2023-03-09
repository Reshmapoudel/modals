import {
  SendDocketAction,
  CommonType,
  SET_SEND_DOCKET_VIEW_TYPE,
  SendInvoiceAction,
  SET_SEND_INVOICE_VIEW_TYPE,
} from '@/types'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store'

export const setSendInvoiceViewType = (
  value: CommonType.TABLE_VIEW | CommonType.FOLDER_VIEW
): ThunkAction<void, RootState, null, SendInvoiceAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_SEND_INVOICE_VIEW_TYPE,
      payload: value,
    })
  }
}

// export const setSendDocketItems = (

// ): ThunkAction<
//   void,
//   RootState,
//   null,
//   SendInvoiceAction
// > => {
//   return (dispatch) => {
//     dispatch({
//       type: SET_SEND_INVOICE_VIEW_TYPE,
//       payload: value,
//     })
//   }
// }
