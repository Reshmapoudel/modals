import {
  CommonAction,
  CommonState,
  SET_ClIENTS_DETAILS,
  SET_DOCKET_TEMPLATES,
  SET_EMAIL_USERS,
  SET_EMPLOYEE,
  SET_INVOICE_TEMPLATES,
  SET_PlANT,
  DocumentManager,
  SET_RT_USERS,
  SET_SHAREABLE_LINK,
  SET_DOCUMENTS,
} from '@/types'
import { PlaylistAddOutlined } from '@material-ui/icons'

const initialState: CommonState = {
  employes: [],
  plant: [],
  docket_templates: [],
  rt_users: null,
  email_users: [],
  invoice_templates: [],
  shareable_link: null,
  clients_organization_list: [],
  documents: [],
}
const commonReducer = (
  state = initialState,
  action: CommonAction
): CommonState => {
  switch (action.type) {
    case SET_EMPLOYEE:
      return {
        ...state,
        employes: action.payload,
      }
    case SET_DOCKET_TEMPLATES:
      return {
        ...state,
        docket_templates: action.payload,
      }
    case SET_PlANT:
      return {
        ...state,
        plant: action.payload,
      }
    case SET_INVOICE_TEMPLATES:
      return {
        ...state,
        invoice_templates: action.payload,
      }
    case SET_RT_USERS:
      return {
        ...state,
        rt_users: action.payload,
      }
    case SET_EMAIL_USERS:
      return {
        ...state,
        email_users: action.payload,
      }
    case SET_SHAREABLE_LINK:
      return {
        ...state,
        shareable_link: action.payload,
      }
    case SET_ClIENTS_DETAILS:
      return {
        ...state,
        clients_organization_list: action.payload,
      }
    case SET_DOCUMENTS:
      return {
        ...state,
        documents: action.payload,
      }
    default:
      return state
  }
}

export default commonReducer
