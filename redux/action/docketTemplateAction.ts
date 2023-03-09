import { ThunkAction } from 'redux-thunk'
import { RootState } from '@/redux/store'
import {
  SET_COPY_FORM_ELEMENT,
  docketFormElement,
  docketTemplate,
  DocketTemplateAction,
  SET_DOCKET_FORM_ELEMENT,
  SET_DOCKET_TEMPLATE,
  SET_FORM_ELEMENT_INDEX,
  SET_LEFT_SIDE_BAR_STATE,
  SET_RIGHT_SIDE_BAR_STATE,
  SET_LOADING_TEMPLATE,
  SET_BOTTOM_SIDE_BAR_STATE,
  SET_UPDATE_ELEMENT_VALUE,
  updateValue,
  UPDATE_DOCKET_TEMPLATE,
  RESET_DOCKET,
  SET_ERROR_STATUS,
  updateFieldValue,
  SET_IS_SHOW_DELETE_ELEMENT,
  INSERT_FIELD_ITEMS,
  GridFields,
  SET_MODAL_STATE,
  YesNoField,
  SET_YES_NO_DOCKET_FIELDS,
  yesNoDocketField,
  SET_GRID_ELEMENT,
  gridFieldFormula,
  SET_NORMAL_PREFILLER,
  PaginationMeta,
  SET_SETTING_TAB_STATUS,
  settingNavigationProps,
  SET_DISABLE_ELEMENT_DRAGGING,
  DocumentFiles,
  EditablePdf,
  DocketFieldsEnum,
  DocketTemplateList,
} from '@/types'
import { Prefiller } from '@/types/prefillerType'
import { CommonType } from '@/types/common'
import { GridApi } from '@/services/Docket/templateService'
import axios from 'axios'
import { toast } from 'react-toastify'

// Set Docket Template
export const SetDocketTemplate = (
  data: DocketTemplateList,
  onError: () => void
): ThunkAction<void, RootState, null, DocketTemplateAction> => {
  return (dispatch) => {
    // const template: docketTemplate = {
    //   id: data.id,
    //   title: data.title,
    //   invoiceable: data.invoiceable,
    //   docket_approval_type: data.docket_approval_type,
    //   theme_document_id: data.theme_document_id,
    //   xero_timesheet: data.xero_timesheet,
    //   timer_attachement: data.timer_attachement,
    //   is_archive: data.is_archive,
    //   prefix: data.prefix,
    //   hide_prefix: data.hide_prefix,
    //   is_docket_number: data.is_docket_number,
    //   docket_id_label: data.docket_id_label,
    //   default_subject: data.default_subject,
    //   assigned_dockets_count: data.assigned_dockets_count,
    //   company_id: data.company_id,
    //   user_id: data.user_id,
    //   updated_at: data.updated_at,
    //   created_at: data.created_at,
    //   user_info: data.user_info,
    // }
    dispatch({
      type: SET_DOCKET_TEMPLATE,
      payload: data,
    })
  }
}

// Set Docket Form index
export const SetDocketFormElementIndex = (
  value: number | undefined
): ThunkAction<void, RootState, null, DocketTemplateAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_FORM_ELEMENT_INDEX,
      payload: value,
    })
  }
}

// Set Docket Template Form
export const SetDocketFormElement = (
  value: docketFormElement[],
  onError?: () => void
): ThunkAction<void, RootState, null, DocketTemplateAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_DOCKET_FORM_ELEMENT,
      payload: value,
    })
  }
}

export const SetDocketGridFormElement = (
  value: Array<GridFields>,
  id: number,
  fieldId: number,
  order: number
): ThunkAction<void, RootState, null, DocketTemplateAction> => {
  return async (dispatch, getState) => {
    const form: docketFormElement[] =
      getState().docketTemplate.form_elements ?? []

    const newForm: docketFormElement[] = form.map(
      (element: docketFormElement) => {
        if (element.docket_field_category_id == 22 && element.id == id) {
          element.grid_fields = value
        }
        return element
      }
    )
    dispatch(setDocketTemplateLoading(true))
    // try {
    //   const response = await GridApi.updateGridFieldPosition(
    //     getState().docketTemplate.template?.id!,
    //     id,
    //     fieldId,
    //     order + 1
    //   )
    //   dispatch(
    //     UpdateTemplateValue({
    //       key: 'updated_at',
    //       value: response.updated_at,
    //     })
    //   )
    // } catch (err) {
    //   if (axios.isAxiosError(err)) {
    //     toast.error(err.response?.data.message)
    //   }
    // }
    dispatch(setDocketTemplateLoading(false))
    dispatch({
      type: SET_DOCKET_FORM_ELEMENT,
      payload: newForm,
    })
  }
}

// Set Copy FOrm Element
export const SetCopyFormElement = (
  value: docketFormElement,
  onError: () => void
): ThunkAction<void, RootState, null, DocketTemplateAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_COPY_FORM_ELEMENT,
      payload: value,
    })
  }
}

// set Left Bar
export const SetLeftBar = (
  value: boolean
): ThunkAction<void, RootState, null, DocketTemplateAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_LEFT_SIDE_BAR_STATE,
      payload: value,
    })
  }
}

// set Right Bar
export const SetRightBar = (
  value: boolean
): ThunkAction<void, RootState, null, DocketTemplateAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_RIGHT_SIDE_BAR_STATE,
      payload: value,
    })
  }
}

// Set loading
export const setDocketTemplateLoading = (
  value: boolean
): ThunkAction<void, RootState, null, DocketTemplateAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING_TEMPLATE,
      payload: value,
    })
  }
}

// set Right Bar
export const SetBottomBar = (
  value: boolean
): ThunkAction<void, RootState, null, DocketTemplateAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_BOTTOM_SIDE_BAR_STATE,
      payload: value,
    })
  }
}

//update value
export const UpdateElementValue = (
  value: updateFieldValue
): ThunkAction<void, RootState, null, DocketTemplateAction> => {
  return async (dispatch) => {
    dispatch({
      type: SET_UPDATE_ELEMENT_VALUE,
      payload: value,
    })
  }
}

//insert field Items
export const InsertFieldItems = (
  field_id: number,
  table_types: string,
  value: GridFields[] | YesNoField[]
): ThunkAction<void, RootState, null, DocketTemplateAction> => {
  return async (dispatch) => {
    dispatch({
      type: INSERT_FIELD_ITEMS,
      table_types: table_types,
      field_id: field_id,
      payload: value,
    })
  }
}

export const UpdateTemplateValue = (
  value: updateValue
): ThunkAction<void, RootState, null, DocketTemplateAction> => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_DOCKET_TEMPLATE,
      payload: value,
    })
  }
}

export const resetDocket = (): ThunkAction<
  void,
  RootState,
  null,
  DocketTemplateAction
> => {
  return (dispatch) => {
    dispatch({
      type: RESET_DOCKET,
    })
  }
}

export const SetErrorStatus = (
  value: boolean
): ThunkAction<void, RootState, null, DocketTemplateAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_ERROR_STATUS,
      payload: value,
    })
  }
}

export const SetIsShowDeleteElement = (
  value: boolean
): ThunkAction<void, RootState, null, DocketTemplateAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_IS_SHOW_DELETE_ELEMENT,
      payload: value,
    })
  }
}

// set Right Bar
export const SetModalStatus = (
  value: boolean
): ThunkAction<void, RootState, null, DocketTemplateAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_MODAL_STATE,
      payload: value,
    })
  }
}

// set yesNoDocketField
export const SetYesNoDocketField = (
  field_id: number,
  yes_no_filed: number,
  yes_no_filed_type: string,
  payload: yesNoDocketField[] | yesNoDocketField
): ThunkAction<void, RootState, null, DocketTemplateAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_YES_NO_DOCKET_FIELDS,
      field_id: field_id,
      yes_no_filed: yes_no_filed,
      yes_no_filed_type: yes_no_filed_type,
      payload: payload,
    })
  }
}

// SET GRIDFIELD
export const SetGridElement = (
  field_id: number,
  grid_id: number,
  field_type: string,
  value: number | string | boolean | gridFieldFormula[] | null
): ThunkAction<void, RootState, null, DocketTemplateAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_GRID_ELEMENT,
      field_type: field_type,
      field_id: field_id,
      grid_id: grid_id,
      payload: value,
    })
  }
}

// SET NORMAL PREFILLER

export const SetNormalPrefiller = (
  field_id: number,
  grid_id: number | undefined,
  value: { data: Prefiller[]; meta: PaginationMeta | null }
): ThunkAction<void, RootState, null, DocketTemplateAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_NORMAL_PREFILLER,
      grid_id: grid_id,
      field_id: field_id,
      payload: value,
    })
  }
}

export const SetSettingTabStatus = (
  value: CommonType.DOCKET | CommonType.APPROVAL | CommonType.RECIPIENTS
): ThunkAction<void, RootState, null, DocketTemplateAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_SETTING_TAB_STATUS,
      payload: value,
    })
  }
}

// Set Docket Form index
export const setDisableDocketElementDragging = (
  value: boolean
): ThunkAction<void, RootState, null, DocketTemplateAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_DISABLE_ELEMENT_DRAGGING,
      payload: value,
    })
  }
}

// add document to documents fields inside document field
export const addDocumentFilesField = (
  value: DocumentFiles,
  fieldId: number
): ThunkAction<void, RootState, null, DocketTemplateAction> => {
  return (dispatch, getState) => {
    const fields = getState().docketTemplate.form_elements.map(
      (element: docketFormElement) => {
        if (element.id == fieldId) {
          element.documents?.push(value)
        }
        return element
      }
    )

    dispatch(SetDocketFormElement(fields))
  }
}

// remove document from documents fields inside document field
export const removeDocumentFilesField = (
  fieldId: number,
  id: number
): ThunkAction<void, RootState, null, DocketTemplateAction> => {
  return (dispatch, getState) => {
    const fields = getState().docketTemplate.form_elements.map(
      (element: docketFormElement) => {
        if (element.id == fieldId) {
          element.documents = element.documents?.filter(
            (document: DocumentFiles) => document.id !== id
          )
        }
        return element
      }
    )

    dispatch(SetDocketFormElement(fields))
  }
}

// add file from EditablePdf
export const addFileToEditablePDf = (fieldId: number, pdf: EditablePdf) => {
  return (dispatch, getState) => {
    const fields = getState().docketTemplate.form_elements.map(
      (element: docketFormElement) => {
        if (element.id == fieldId && DocketFieldsEnum.EDITABLE_PDF_ELEMENT) {
          element.editable_pdf?.push(pdf)
        }
        return element
      }
    )

    dispatch(SetDocketFormElement(fields))
  }
}
// remove file from EditablePdf
export const removeFileFromEditablePdf = (fieldId: number, id) => {
  return (dispatch, getState) => {
    const fields = getState().docketTemplate.form_elements.map(
      (element: docketFormElement) => {
        if (element.id == fieldId && DocketFieldsEnum.EDITABLE_PDF_ELEMENT) {
          element.editable_pdf = element.editable_pdf?.filter(
            (pdf) => pdf.id !== id
          )
        }
        return element
      }
    )

    dispatch(SetDocketFormElement(fields))
  }
}
