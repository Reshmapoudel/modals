import {
  initialInvoiceState,
  InvoiceState,
  InvoiceTemplateAction,
  SET_ACTIVE_TAB_SECTION,
  SET_COPY_INVOICE_FORM_ELEMENT,
  SET_INVOICE_ACTIVE_ELEMENT_INDEX,
  SET_INVOICE_TEMPLATE_DATA,
  SET_INVOICE_TEMPLATE_FORM_ELEMENTS,
  SET_INVOICE_TEMPLATE_LEFT_SIDE_BAR,
  SET_INVOICE_TEMPLATE_LOADING,
  SET_IS_SHOW_INVOICE_DELETE_ELEMENT,
  UPDATE_INVOICE_TEMPLATE_FIELD_VALUE,
} from '@/types/redux-types'

const docketTemplateReducer = (
  state = initialInvoiceState,
  action: InvoiceTemplateAction
): InvoiceState => {
  switch (action.type) {
    case SET_INVOICE_TEMPLATE_DATA:
      return {
        ...state,
        invoice: action.payload,
      }
    case SET_INVOICE_TEMPLATE_LOADING:
      return {
        ...state,
        invoice_template_loading: action.payload,
      }
    case SET_IS_SHOW_INVOICE_DELETE_ELEMENT:
      return {
        ...state,
        is_show_delete_element: action.payload,
      }
    case SET_INVOICE_TEMPLATE_LEFT_SIDE_BAR:
      return {
        ...state,
        is_left_sidebar: action.payload,
      }
    case SET_INVOICE_TEMPLATE_FORM_ELEMENTS:
      return {
        ...state,
        form_elements: action.payload,
      }
    case SET_INVOICE_ACTIVE_ELEMENT_INDEX:
      return {
        ...state,
        selected_index: action.payload,
      }
    case UPDATE_INVOICE_TEMPLATE_FIELD_VALUE:
      return {
        ...state,
        form_elements: action.payload,
      }
    case SET_COPY_INVOICE_FORM_ELEMENT:
      return {
        ...state,
        copy_element: action.payload,
      }
    case SET_ACTIVE_TAB_SECTION:
      return {
        ...state,
        active_tab_section: action.payload,
      }
    default:
      return state
  }
}

export default docketTemplateReducer
