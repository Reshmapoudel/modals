import {
  SendInvoiceAction,
  SendInvoiceState,
  SET_SEND_INVOICE_VIEW_TYPE,
  CommonType,
} from '@/types'

const initialState: SendInvoiceState = {
  view_type: CommonType.TABLE_VIEW,
}

const sendInvoiceReducer = (
  state = initialState,
  action: SendInvoiceAction
): SendInvoiceState => {
  switch (action.type) {
    case SET_SEND_INVOICE_VIEW_TYPE:
      return {
        ...state,
        view_type: action.payload,
      }
    default:
      return state
  }
}

export default sendInvoiceReducer
