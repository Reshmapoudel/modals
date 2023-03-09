import {
  docketSharabaleEnum,
  DocketShareable,
  SetDocketSharableAction,
  SET_DOCKET_DATA,
  SET_RAW_IMAGES,
  SET_SEND_DOCKET_RT_EMAIL_USERS,
  SET_SEND_DOCKET_RT_EMAIL_USERS_APPROVAL,
  SET_SEND_DOCKET_RT_USERS,
  SET_SEND_DOCKET_RT_USERS_APPROVAL,
  SET_SEND_DOCKET_TYPE,
  SET_SHARABLE_DOCKET_FIELD_VALUE,
  SET_SHAREABLE_DOCKET,
} from '@/types'

const initialState: DocketShareable = {
  send_docket_type: null,
  company: null,
  template: null,
  folders: null,
  id: 0,
  default_sender: null,
  disable: undefined,
  email: undefined,
  link: undefined,
  link_type: docketSharabaleEnum.PUBLIC,
  email_user_receivers: [],
  email_user_approvers: [],
  rt_user_receivers: [],
  rt_user_approvers: [],
  docket_data: {
    docket_field_values: null,
    draft_date: null,
    is_email: false,
    isSent: true,
    isValid: false,
    email_subject: '',
    draft_name: null,
  },
}

const sharableDocketReducer = (
  state = initialState,
  action: SetDocketSharableAction
): DocketShareable => {
  switch (action.type) {
    case SET_SHAREABLE_DOCKET:
      return {
        ...state,
        ...action.payload,
      }
    case SET_SHARABLE_DOCKET_FIELD_VALUE:
      return {
        ...state,
        docket_data: { docket_field_values: action.payload },
      }

    case SET_SEND_DOCKET_RT_EMAIL_USERS:
      return {
        ...state,
        email_user_receivers: action.payload,
      }
    case SET_SEND_DOCKET_RT_EMAIL_USERS_APPROVAL:
      return {
        ...state,
        email_user_approvers: action.payload,
      }
    case SET_DOCKET_DATA:
      return {
        ...state,
        docket_data: action.payload,
      }
    case SET_SEND_DOCKET_RT_USERS:
      return {
        ...state,
        rt_user_receivers: action.payload,
      }
    case SET_SEND_DOCKET_RT_USERS_APPROVAL:
      return {
        ...state,
        rt_user_approvers: action.payload,
      }
    case SET_SEND_DOCKET_TYPE:
      return {
        ...state,
        send_docket_type: action.payload,
      }
    default:
      return state
  }
}

export default sharableDocketReducer
