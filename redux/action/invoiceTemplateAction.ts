import { InvoiceTemplateTypes } from '@/components/Modules/Invoice/Template/data/InvoiceSettings'
import {
  normalSendInvoice,
  InvoiceTemplate,
  InvoiceTemplateFields,
  updateInvoiceTemplateField,
  updateInvoiceTemplateFieldElementValue,
  updateInvoiceValue,
} from '@/types'
import {
  InvoiceTemplateAction,
  SET_INVOICE_ACTIVE_ELEMENT_INDEX,
  SET_INVOICE_TEMPLATE_DATA,
  SET_INVOICE_TEMPLATE_FORM_ELEMENTS,
  UPDATE_INVOICE_TEMPLATE_FIELD_VALUE,
  SET_INVOICE_TEMPLATE_LEFT_SIDE_BAR,
  SET_INVOICE_TEMPLATE_LOADING,
  SET_IS_SHOW_INVOICE_DELETE_ELEMENT,
  SET_COPY_INVOICE_FORM_ELEMENT,
  SET_ACTIVE_TAB_SECTION,
} from '@/types/redux-types'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store'

export const setInvoiceLoading = (
  value: boolean
): ThunkAction<void, RootState, null, InvoiceTemplateAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_INVOICE_TEMPLATE_LOADING,
      payload: value,
    })
  }
}

export const setInvoiceData = (
  value: InvoiceTemplate
): ThunkAction<void, RootState, null, InvoiceTemplateAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_INVOICE_TEMPLATE_DATA,
      payload: value,
    })
  }
}

export const setIsShowDeleteInvoiceElement = (
  value: boolean
): ThunkAction<void, RootState, null, InvoiceTemplateAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_IS_SHOW_INVOICE_DELETE_ELEMENT,
      payload: value,
    })
  }
}

export const setInvoiceLeftSideBarState = (
  value: boolean
): ThunkAction<void, RootState, null, InvoiceTemplateAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_INVOICE_TEMPLATE_LEFT_SIDE_BAR,
      payload: value,
    })
  }
}

export const setInvoiceTemplateFormElements = (
  value: Array<InvoiceTemplateFields>
): ThunkAction<void, RootState, null, InvoiceTemplateAction> => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_INVOICE_TEMPLATE_FORM_ELEMENTS,
      payload: value,
    })

    const invoice = getState().invoice.invoice
    if (!!invoice) {
      invoice.fields = value
      dispatch({
        type: SET_INVOICE_TEMPLATE_DATA,
        payload: invoice,
      })
    }
  }
}

export const setInvoiceTemplateFieldElementIndex = (
  value: number | null
): ThunkAction<void, RootState, null, InvoiceTemplateAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_INVOICE_ACTIVE_ELEMENT_INDEX,
      payload: value,
    })
  }
}

export const updateInvoiceTemplateFieldElement = (
  value: updateInvoiceTemplateField
): ThunkAction<void, RootState, null, InvoiceTemplateAction> => {
  return (dispatch, getState) => {
    const invoice_form_fields: InvoiceTemplateFields[] =
      getState().invoice.form_elements

    const new_fields = invoice_form_fields.map(
      (invoiceField: InvoiceTemplateFields) => {
        return invoiceField.id === value.field_id
          ? { ...value.invoice_field }
          : invoiceField
      }
    )

    dispatch({
      type: UPDATE_INVOICE_TEMPLATE_FIELD_VALUE,
      payload: [...new_fields],
    })
  }
}

export const setCopyInvoiceFormElement = (
  value: InvoiceTemplateFields
): ThunkAction<void, RootState, null, InvoiceTemplateAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_COPY_INVOICE_FORM_ELEMENT,
      payload: value,
    })
  }
}

export const updateInvoiceTemplateValue = (
  value: updateInvoiceValue
): ThunkAction<void, RootState, null, InvoiceTemplateAction> => {
  return (dispatch, getState) => {
    const invoiceValue: InvoiceTemplate | null = getState().invoice.invoice

    if (!invoiceValue) return

    if (invoiceValue.hasOwnProperty(value.key)) {
      invoiceValue[value.key] = value.value
      dispatch(setInvoiceData(invoiceValue))
    }
  }
}

export const setActiveTabSection = (
  value: InvoiceTemplateTypes
): ThunkAction<void, RootState, null, InvoiceTemplateAction> => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_ACTIVE_TAB_SECTION,
      payload: value,
    })
  }
}

export const updateInvoiceTemplateFieldValue = (
  value: updateInvoiceTemplateFieldElementValue
): ThunkAction<void, RootState, null, InvoiceTemplateAction> => {
  return (dispactch, getState) => {
    const field_elements = getState().invoice.form_elements

    const new_elements = field_elements?.map((elementField) => {
      if (
        elementField.hasOwnProperty(value.key) &&
        elementField.id === value.field_id
      ) {
        elementField[value.key] = value.value
      }
      return elementField
    })

    dispactch({
      type: SET_INVOICE_TEMPLATE_FORM_ELEMENTS,
      payload: new_elements,
    })
  }
}
