import {} from '@/types'
import {
  SendDocketAction,
  SendDocketState,
  CommonType,
  SET_SEND_DOCKET_VIEW_TYPE,
} from '@/types'

const initialState: SendDocketState = {
  view_type: CommonType.TABLE_VIEW,
}

const sentDocketReducer = (
  state = initialState,
  action: SendDocketAction
): SendDocketState => {
  switch (action.type) {
    case SET_SEND_DOCKET_VIEW_TYPE:
      return {
        ...state,
        view_type: action.payload,
      }

    default:
      return state
  }
}

export default sentDocketReducer
