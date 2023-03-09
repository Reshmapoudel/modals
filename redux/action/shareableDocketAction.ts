import { PublicDocket } from '@/services/Docket/templateService'
import {
  DocketFieldValue,
  SetDocketSharableAction,
  DocketShareable,
  DocketShareFormElementData,
  docketFormElement,
  DocketFieldsEnum,
  GridFields,
  SET_SHAREABLE_DOCKET,
  SET_SHARABLE_DOCKET_FIELD_VALUE,
  SignatureRaw,
  ManualTimerForm,
  YesNoForm,
  YesNoField,
  yesNoDocketField,
  EditablePdf,
  EditablePdfs,
  RawImages,
  Folder,
  SignatureForm,
  SendDocketEmails,
  User,
  SET_SEND_DOCKET_RT_EMAIL_USERS,
  SET_SEND_DOCKET_RT_EMAIL_USERS_APPROVAL,
  SET_SEND_DOCKET_RT_USERS,
  SET_SEND_DOCKET_RT_USERS_APPROVAL,
  SET_DOCKET_DATA,
  docketSendTypeEnum,
  SET_SEND_DOCKET_TYPE,
  DocketData,
} from '@/types'
import { EmailUserResponse } from '@/types/response-types'
import axios from 'axios'
import { ThunkAction } from 'redux-thunk'
import { Items } from 'xero-node'
import { RootState } from '../store'

export const initializeValueFormField = (
  docketField: docketFormElement | GridFields | yesNoDocketField
): DocketShareFormElementData => {
  return {
    category_id: docketField.docket_field_category_id,
    form_field_id: docketField.id,
    value: '',
  }
}

export const initializeDefaultValue = (
  docketField: docketFormElement | GridFields | yesNoDocketField
): DocketShareFormElementData => {
  return {
    category_id: docketField.docket_field_category_id,
    form_field_id: docketField.id,
    value: '',
  }
}

export const initializeEmailValue = (
  docketField: docketFormElement | GridFields
): DocketShareFormElementData => {
  return {
    category_id: docketField.docket_field_category_id,
    form_field_id: docketField.id,
    email_list_value: {
      email_list: [],
    },
  }
}

export const initializeManualTimerValue = (
  docketField: docketFormElement | GridFields
): DocketShareFormElementData => {
  const docketShareFormElement: DocketShareFormElementData = {
    form_field_id: docketField.id,
    category_id: docketField.docket_field_category_id,
    manual_timer_value: {
      breakDuration: 0,
      explanation: '',
      from: '',
      to: '',
      totalDuration: 0,
    },
  }

  return docketShareFormElement
}

export const initializeSignatureValue = (
  docketField: docketFormElement | GridFields
): DocketShareFormElementData => {
  const docketShareFormElement: DocketShareFormElementData = {
    category_id: docketField.docket_field_category_id,
    form_field_id: docketField.id,
    signature_value: [],
    signature_raw: [],
  }

  return docketShareFormElement
}

export const initializeImageValue = (
  docketField: docketFormElement | GridFields | yesNoDocketField
): DocketShareFormElementData => {
  const imageForm: DocketShareFormElementData = {
    category_id: docketField.docket_field_category_id,
    form_field_id: docketField.id,
    image_value: [],
    raw_image: [],
  }

  return imageForm
}

export const initializeYesNoValue = (
  docketField: docketFormElement
): DocketShareFormElementData => {
  const yesNoValue: DocketShareFormElementData = {
    category_id: docketField.docket_field_category_id,
    form_field_id: docketField.id,
    yes_no_value: {
      selected_id: null,
      selected_type: null,
      explanation: [],
    },
  }
  return yesNoValue
}

export const initializeGridValue = (
  docketField: docketFormElement
): DocketShareFormElementData => {
  const gridValue: DocketShareFormElementData = {
    category_id: docketField.docket_field_category_id,
    form_field_id: docketField.id,
    grid_value: [],
  }
  gridValue.grid_value?.push(initializeGridRowValue(docketField))
  return gridValue
}

export const initializeGridRowValue = (
  docketField
): Array<DocketShareFormElementData> => {
  return docketField.grid_fields.map((gridFields: GridFields) => {
    switch (gridFields.docket_field_category_id) {
      case DocketFieldsEnum.SHORT_TEXT_ELEMENT:
      case DocketFieldsEnum.LONG_TEXT_ELEMENT:
      case DocketFieldsEnum.NUMBER_ELEMENT:
      case DocketFieldsEnum.LOCATION_ELEMENT:
      case DocketFieldsEnum.DATE_ELEMENT:
      case DocketFieldsEnum.TALLEYABLE_VALUE_ELEMENT:
      case DocketFieldsEnum.TIME_ELEMENT:
      case DocketFieldsEnum.BARCODE_SCANNER_ELEMENT:
        return initializeValueFormField(gridFields)
      case DocketFieldsEnum.HEADER_ELEMENT:
      case DocketFieldsEnum.DOCUMENT_ELEMENT:
      case DocketFieldsEnum.ADVANCE_HEADER_ELEMENT:
      case DocketFieldsEnum.TERMS_AND_CONDITION_ELEMENT:
        return initializeDefaultValue(gridFields)
      case DocketFieldsEnum.SIGNATURE_PAD_ELEMENT:
        return initializeSignatureValue(gridFields)
      case DocketFieldsEnum.MANUAL_TIMER_ELEMENT:
        return initializeManualTimerValue(gridFields)
      case DocketFieldsEnum.IMAGE_ELEMENT:
      case DocketFieldsEnum.SKETCHPAD_ELEMENT:
        return initializeImageValue(gridFields)
      case DocketFieldsEnum.FILES_ELEMENT:
        return initializeFileValue(gridFields)
      case DocketFieldsEnum.EMAIL_ELEMENT:
        return initializeEmailValue(gridFields)
      case DocketFieldsEnum.CHECKBOX_ELEMENT:
        return initializeCheckboxValue(gridFields)
      default:
        return initializeDefaultValue(gridFields)
    }
  })
}

export const initializeUnitRateValue = (
  docketField: docketFormElement
): DocketShareFormElementData => {
  const gridValue: DocketShareFormElementData = {
    category_id: docketField.docket_field_category_id,
    form_field_id: docketField.id,
    unit_rate_value: {
      per_unit_rate: null,
      total: null,
      total_unit: null,
    },
  }

  return gridValue
}

export const initializeCheckboxValue = (
  docketField: docketFormElement | GridFields
): DocketShareFormElementData => {
  const checkboxValue: DocketShareFormElementData = {
    category_id: docketField.docket_field_category_id,
    form_field_id: docketField.id,
    value: '',
  }

  return checkboxValue
}

export const initializeEditablePdf = (
  docketField: docketFormElement
): DocketShareFormElementData => {
  const value: EditablePdfs[] = []
  docketField.editable_pdf?.map((item, index) => {
    return value.push({ id: item.id, url: item?.files! })
  })

  const editablePdfValue: DocketShareFormElementData = {
    category_id: docketField.docket_field_category_id,
    form_field_id: docketField.id,
    editable_pdf_value: value,
  }
  return editablePdfValue
}

export const initializeFolderValue = (
  docketField: docketFormElement
): DocketShareFormElementData => {
  const folderValue: DocketShareFormElementData = {
    category_id: docketField.docket_field_category_id,
    form_field_id: docketField.id,
    folder: {
      folders: [],
    },
  }

  return folderValue
}

export const initializeFileValue = (
  docketField: docketFormElement | GridFields
): DocketShareFormElementData => {
  const fileValue: DocketShareFormElementData = {
    category_id: docketField.docket_field_category_id,
    form_field_id: docketField.id,
    filesValue: {
      files: [],
    },
  }

  return fileValue
}

export const updateNormalFieldValue = (
  fieldId: number,
  value: string | boolean | number
): ThunkAction<void, RootState, null, SetDocketSharableAction> => {
  return async (dispatch, getState) => {
    const updateData =
      getState().sharableDocket.docket_data.docket_field_values?.map(
        (items, index) => {
          if (items.form_field_id === fieldId) {
            return { ...items, value: `${value}` }
          } else {
            return items
          }
        }
      )

    const finaldata = {
      docket_field_values: updateData!,
      draft_date: getState().sharableDocket.docket_data.draft_date,
      isValid: getState().sharableDocket.docket_data.isValid,
      isSent: getState().sharableDocket.docket_data.isSent,
      is_email: getState().sharableDocket.docket_data.is_email,
      email_subject: getState().sharableDocket.docket_data.email_subject,
      draft_name: getState().sharableDocket.docket_data.draft_name,
    }
    dispatch({
      type: SET_DOCKET_DATA,
      payload: finaldata,
    })
  }
}

export const updateEmailFieldValue = (
  fieldId: number,
  value: SendDocketEmails[]
): ThunkAction<void, RootState, null, SetDocketSharableAction> => {
  return async (dispatch, getState) => {
    const updateData =
      getState().sharableDocket.docket_data.docket_field_values?.map(
        (items, index) => {
          if (items.form_field_id === fieldId) {
            return {
              ...items,
              email_list_value: { email_list: value },
            }
          } else {
            return items
          }
        }
      )

    const finaldata = {
      docket_field_values: updateData!,
      draft_date: getState().sharableDocket.docket_data.draft_date,
      isValid: getState().sharableDocket.docket_data.isValid,
      isSent: getState().sharableDocket.docket_data.isSent,
      is_email: getState().sharableDocket.docket_data.is_email,
      email_subject: getState().sharableDocket.docket_data.email_subject,
      draft_name: getState().sharableDocket.docket_data.draft_name,
    }
    dispatch({
      type: SET_DOCKET_DATA,
      payload: finaldata,
    })
  }
}
export const updateFolderValue = (
  fieldId: number,
  value: Folder[]
): ThunkAction<void, RootState, null, SetDocketSharableAction> => {
  return async (dispatch, getState) => {
    const updateData =
      getState().sharableDocket.docket_data.docket_field_values?.map(
        (items, index) => {
          if (items.form_field_id === fieldId) {
            return {
              ...items,
              folder: { folders: value },
            }
          } else {
            return items
          }
        }
      )

    const finaldata = {
      docket_field_values: updateData,
      draft_date: getState().sharableDocket.docket_data.draft_date,
      isValid: getState().sharableDocket.docket_data.isValid,
      isSent: getState().sharableDocket.docket_data.isSent,
      is_email: getState().sharableDocket.docket_data.is_email,
      email_subject: getState().sharableDocket.docket_data.email_subject,
      draft_name: getState().sharableDocket.docket_data.draft_name,
    }
    dispatch({
      type: SET_DOCKET_DATA,
      payload: finaldata,
    })
  }
}

export const updateUnitRateFieldValue = (
  fieldId: number,
  value: number,
  field_type: string
): ThunkAction<void, RootState, null, SetDocketSharableAction> => {
  return async (dispatch, getState) => {
    const updateData: DocketShareFormElementData[] | undefined =
      getState().sharableDocket.docket_data.docket_field_values?.map(
        (items, index) => {
          if (items.form_field_id === fieldId) {
            if (field_type === 'PER_UNIT_RATE') {
              return {
                ...items,
                unit_rate_value: {
                  ...items.unit_rate_value,
                  per_unit_rate: value!,
                  total: Number(value!) * items?.unit_rate_value?.total_unit!,
                },
              }
            } else if (field_type === 'TOTAL_UNIT') {
              return {
                ...items,
                unit_rate_value: {
                  ...items.unit_rate_value,
                  total_unit: value!,
                  total:
                    items?.unit_rate_value?.per_unit_rate! * Number(value!),
                },
              }
            } else {
              return items
            }
          } else {
            return items
          }
        }
      )

    const finaldata = {
      docket_field_values: updateData,
      draft_date: getState().sharableDocket.docket_data.draft_date,
      isValid: getState().sharableDocket.docket_data.isValid,
      isSent: getState().sharableDocket.docket_data.isSent,
      is_email: getState().sharableDocket.docket_data.is_email,
      email_subject: getState().sharableDocket.docket_data.email_subject,
      draft_name: getState().sharableDocket.docket_data.draft_name,
    }
    dispatch({
      type: SET_DOCKET_DATA,
      payload: finaldata,
    })
  }
}

export const updateGridFieldValue = (
  fieldId: number,
  value: string | boolean | number,
  gridFieldId: number,
  rowIndex: number
): ThunkAction<void, RootState, null, SetDocketSharableAction> => {
  return async (dispatch, getState) => {
    const updateData =
      getState().sharableDocket.docket_data.docket_field_values?.map(
        (items, index) => {
          if (items.form_field_id === fieldId) {
            items.grid_value?.map((row, index) => {
              if (index === rowIndex) {
                row.map((gridRowData, index) => {
                  if (gridRowData.form_field_id === gridFieldId) {
                    return (gridRowData.value = `${value}`)
                  } else {
                    return row
                  }
                })
              }
            })
            return items
          } else {
            return items
          }
        }
      )
    const finaldata = {
      docket_field_values: updateData!,
      draft_date: getState().sharableDocket.docket_data.draft_date,
      isValid: getState().sharableDocket.docket_data.isValid,
      isSent: getState().sharableDocket.docket_data.isSent,
      is_email: getState().sharableDocket.docket_data.is_email,
      email_subject: getState().sharableDocket.docket_data.email_subject,
      draft_name: getState().sharableDocket.docket_data.draft_name,
    }
    dispatch({
      type: SET_DOCKET_DATA,
      payload: finaldata,
    })
  }
}

export const setSharableDocketDataFormApi = (
  data: DocketShareable
): ThunkAction<void, RootState, null, SetDocketSharableAction> => {
  return async (dispatch, getState) => {
    const docketShareFormElement: Array<DocketShareFormElementData> =
      data?.template?.fields
        ?.filter((items) => items.deleted_at === null)
        .map((docketField: docketFormElement) => {
          switch (docketField.docket_field_category_id) {
            case DocketFieldsEnum.SHORT_TEXT_ELEMENT:
            case DocketFieldsEnum.LONG_TEXT_ELEMENT:
            case DocketFieldsEnum.NUMBER_ELEMENT:
            case DocketFieldsEnum.LOCATION_ELEMENT:
            case DocketFieldsEnum.DATE_ELEMENT:
            case DocketFieldsEnum.TALLEYABLE_VALUE_ELEMENT:
            case DocketFieldsEnum.TIME_ELEMENT:
            case DocketFieldsEnum.BARCODE_SCANNER_ELEMENT:
              return initializeValueFormField(docketField)
            case DocketFieldsEnum.HEADER_ELEMENT:
            case DocketFieldsEnum.DOCUMENT_ELEMENT:
            case DocketFieldsEnum.ADVANCE_HEADER_ELEMENT:
            case DocketFieldsEnum.TERMS_AND_CONDITION_ELEMENT:
              return initializeDefaultValue(docketField)
            case DocketFieldsEnum.SIGNATURE_PAD_ELEMENT:
              return initializeSignatureValue(docketField)
            case DocketFieldsEnum.MANUAL_TIMER_ELEMENT:
              return initializeManualTimerValue(docketField)
            case DocketFieldsEnum.IMAGE_ELEMENT:
            case DocketFieldsEnum.SKETCHPAD_ELEMENT:
              return initializeImageValue(docketField)
            case DocketFieldsEnum.FILES_ELEMENT:
              return initializeFileValue(docketField)
            case DocketFieldsEnum.EMAIL_ELEMENT:
              return initializeEmailValue(docketField)
            case DocketFieldsEnum.YES_NO_ELEMENT:
              return initializeYesNoValue(docketField)
            case DocketFieldsEnum.UNIT_RATE_ELEMENT:
            case DocketFieldsEnum.TALLEYABLE_UNIT_RATE_ELEMENT:
              return initializeUnitRateValue(docketField)
            case DocketFieldsEnum.FOLDER_ELEMENT:
              return initializeFolderValue(docketField)
            case DocketFieldsEnum.GRID_FIELD:
              return initializeGridValue(docketField)
            case DocketFieldsEnum.EDITABLE_PDF_ELEMENT:
              return initializeEditablePdf(docketField)
            case DocketFieldsEnum.CHECKBOX_ELEMENT:
              return initializeCheckboxValue(docketField)
            default:
              return initializeDefaultValue(docketField)
          }
        }) ?? []

    const finaldata = {
      ...data,
      docket_data: {
        docket_field_values: docketShareFormElement,
        draft_date: getState().sharableDocket.docket_data.draft_date,
        isValid: getState().sharableDocket.docket_data.isValid,
        isSent: getState().sharableDocket.docket_data.isSent,
        is_email:
          data.email_user_receivers?.length !== 0 &&
          data.rt_user_receivers === null
            ? true
            : false,
      },
    }
    dispatch({
      type: SET_SHAREABLE_DOCKET,
      payload: finaldata,
    })
  }
}

export const addNewGridRow = (
  fieldId: number,
  gridFields: docketFormElement
): ThunkAction<void, RootState, null, SetDocketSharableAction> => {
  return (dispatch, getState) => {
    const docketFieldValue =
      getState()?.sharableDocket?.docket_data?.docket_field_values?.map(
        (items, index) => {
          if (items.form_field_id === fieldId) {
            items.grid_value?.push(initializeGridRowValue(gridFields))
            return items
          } else {
            return items
          }
        }
      )
    const finaldata = {
      docket_field_values: docketFieldValue,
      draft_date: getState().sharableDocket.docket_data.draft_date,
      isValid: getState().sharableDocket.docket_data.isValid,
      isSent: getState().sharableDocket.docket_data.isSent,
      is_email: getState().sharableDocket.docket_data.is_email,
      email_subject: getState().sharableDocket.docket_data.email_subject,
      draft_name: getState().sharableDocket.docket_data.draft_name,
    }
    dispatch({
      type: SET_DOCKET_DATA,
      payload: finaldata,
    })
  }
}

export const addRawImages = (
  data: RawImages,
  onResponse: (imageCount: number) => void
): ThunkAction<void, RootState, null, SetDocketSharableAction> => {
  return (dispatch, getState) => {
    const docketFieldValue =
      getState()?.sharableDocket?.docket_data?.docket_field_values?.map(
        (item, index) => {
          if (item.form_field_id === data.field_id) {
            if (data.grid_field_id !== undefined) {
              item.grid_value?.map((row, index) => {
                if (index === data.row_number) {
                  row.map((gridRowData, index) => {
                    if (gridRowData.form_field_id === data.grid_field_id) {
                      onResponse(
                        gridRowData.image_value?.length! + data.files?.length!
                      )
                      return (gridRowData.raw_image = data.files)
                    } else {
                      return row
                    }
                  })
                }
              })
              return item
            } else if (data.yes_no_na_field_id !== undefined) {
              if (item.yes_no_value?.selected_id === data.yes_no_na_field_id) {
                if (
                  item.yes_no_value?.explanation?.findIndex(
                    (explanation) =>
                      explanation.form_field_id === data.yes_no_docket_field_id
                  )! < 0
                ) {
                  item?.yes_no_value?.explanation?.push({
                    category_id: 5,
                    form_field_id: data?.yes_no_docket_field_id!,
                    raw_image: data.files,
                    image_value: [],
                  })
                } else {
                  item.yes_no_value?.explanation?.forEach((row, index) => {
                    if (row.form_field_id === data.yes_no_docket_field_id) {
                      onResponse(row.image_value?.length! + data.files?.length!)
                      row.raw_image = data.files
                    }
                  })
                }
              }
              return item
            } else {
              onResponse(item.image_value?.length! + data.files?.length!)
              return {
                ...item,
                raw_image: data.files,
              }
            }
          } else {
            return item
          }
        }
      )

    const finaldata = {
      docket_field_values: docketFieldValue,
      draft_date: getState().sharableDocket.docket_data.draft_date,
      isValid: getState().sharableDocket.docket_data.isValid,
      isSent: getState().sharableDocket.docket_data.isSent,
      is_email: getState().sharableDocket.docket_data.is_email,
      email_subject: getState().sharableDocket.docket_data.email_subject,
      draft_name: getState().sharableDocket.docket_data.draft_name,
    }
    dispatch({
      type: SET_DOCKET_DATA,
      payload: finaldata,
    })
  }
}

export const addRawFiles = (
  data: RawImages,
  onResponse: (imageCount: number) => void
): ThunkAction<void, RootState, null, SetDocketSharableAction> => {
  return (dispatch, getState) => {
    const docketFieldValue =
      getState()?.sharableDocket?.docket_data?.docket_field_values?.map(
        (item, index) => {
          if (item.form_field_id === data.field_id) {
            if (data.grid_field_id !== undefined) {
              item.grid_value?.map((row, index) => {
                if (index === data.row_number) {
                  row.map((gridRowData, index) => {
                    if (gridRowData.form_field_id === data.grid_field_id) {
                      onResponse(
                        gridRowData.filesValue?.files?.length! +
                          data.files?.length!
                      )
                      return (gridRowData.raw_files = data.files)
                    } else {
                      return row
                    }
                  })
                }
              })
              return item
            } else {
              onResponse(item.filesValue?.files?.length! + data.files?.length!)
              return {
                ...item,
                raw_files: data.files,
              }
            }
          } else {
            return item
          }
        }
      )

    const finaldata = {
      docket_field_values: docketFieldValue,
      draft_date: getState().sharableDocket.docket_data.draft_date,
      isValid: getState().sharableDocket.docket_data.isValid,
      isSent: getState().sharableDocket.docket_data.isSent,
      is_email: getState().sharableDocket.docket_data.is_email,
      email_subject: getState().sharableDocket.docket_data.email_subject,
      draft_name: getState().sharableDocket.docket_data.draft_name,
    }
    dispatch({
      type: SET_DOCKET_DATA,
      payload: finaldata,
    })
  }
}

export const addManualTimer = (
  fieldId: number,
  value: ManualTimerForm,
  gridFieldId: number | undefined,
  rowIndex: number | undefined
): ThunkAction<void, RootState, null, SetDocketSharableAction> => {
  return (dispatch, getState) => {
    const docketFieldValue =
      getState()?.sharableDocket?.docket_data?.docket_field_values?.map(
        (item, index) => {
          if (item.form_field_id === fieldId) {
            if (gridFieldId !== undefined) {
              item.grid_value?.map((row, index) => {
                if (index === rowIndex) {
                  row.map((gridRowData, index) => {
                    if (gridRowData.form_field_id === gridFieldId) {
                      return (gridRowData.manual_timer_value = value)
                    } else {
                      return row
                    }
                  })
                }
              })
              return item
            } else {
              return {
                ...item,
                manual_timer_value: value,
              }
            }
          } else {
            return item
          }
        }
      )

    const finaldata = {
      docket_field_values: docketFieldValue,
      draft_date: getState().sharableDocket.docket_data.draft_date,
      isValid: getState().sharableDocket.docket_data.isValid,
      isSent: getState().sharableDocket.docket_data.isSent,
      is_email: getState().sharableDocket.docket_data.is_email,
      email_subject: getState().sharableDocket.docket_data.email_subject,
      draft_name: getState().sharableDocket.docket_data.draft_name,
    }
    dispatch({
      type: SET_DOCKET_DATA,
      payload: finaldata,
    })
  }
}

export const addSignatureImages = (
  data: RawImages,
  onResponse: (imageCount: number) => void
): ThunkAction<void, RootState, null, SetDocketSharableAction> => {
  return (dispatch, getState) => {
    const docketFieldValue =
      getState()?.sharableDocket?.docket_data?.docket_field_values?.map(
        (item, index) => {
          if (item.form_field_id === data.field_id) {
            if (data.grid_field_id !== undefined) {
              item.grid_value?.map((row, index) => {
                if (index === data.row_number) {
                  row.map((gridRowData, index) => {
                    if (gridRowData.form_field_id === data.grid_field_id) {
                      onResponse(
                        gridRowData.signature_value?.length! +
                          data.signatures?.length!
                      )
                      return (gridRowData.signature_raw = data.signatures)
                    } else {
                      return row
                    }
                  })
                }
              })
              return item
            } else {
              onResponse(
                item.signature_value?.length! + data.signatures?.length!
              )
              return {
                ...item,
                signature_raw: data.signatures,
              }
            }
          } else {
            return item
          }
        }
      )

    const finaldata = {
      docket_field_values: docketFieldValue,
      draft_date: getState().sharableDocket.docket_data.draft_date,
      isValid: getState().sharableDocket.docket_data.isValid,
      isSent: getState().sharableDocket.docket_data.isSent,
      is_email: getState().sharableDocket.docket_data.is_email,
      email_subject: getState().sharableDocket.docket_data.email_subject,
      draft_name: getState().sharableDocket.docket_data.draft_name,
    }
    dispatch({
      type: SET_DOCKET_DATA,
      payload: finaldata,
    })
  }
}

export const addYesNoNa = (
  fieldId: number,
  data: YesNoForm,
  yesNoField: YesNoField
): ThunkAction<void, RootState, null, SetDocketSharableAction> => {
  return (dispatch, getState) => {
    const docketFieldValue =
      getState()?.sharableDocket?.docket_data?.docket_field_values?.map(
        (item, index) => {
          if (item.form_field_id === fieldId) {
            if (item?.yes_no_value?.selected_id !== data.selected_id) {
              const updateYesNoExplanation =
                yesNoField?.yes_no_docket_field?.map((item, index) => {
                  switch (item.docket_field_category_id) {
                    case DocketFieldsEnum.SHORT_TEXT_ELEMENT:
                    case DocketFieldsEnum.LONG_TEXT_ELEMENT:
                      return initializeValueFormField(item)
                    case DocketFieldsEnum.IMAGE_ELEMENT:
                      return initializeImageValue(item)
                    default:
                      return initializeDefaultValue(item)
                  }
                })
              const updateData = {
                ...data,
                explanation: updateYesNoExplanation,
              }
              return { ...item, yes_no_value: updateData }
            } else {
              return item
            }
          } else {
            return item
          }
        }
      )

    const finaldata = {
      docket_field_values: docketFieldValue,
      draft_date: getState().sharableDocket.docket_data.draft_date,
      isValid: getState().sharableDocket.docket_data.isValid,
      isSent: getState().sharableDocket.docket_data.isSent,
      is_email: getState().sharableDocket.docket_data.is_email,
      email_subject: getState().sharableDocket.docket_data.email_subject,
      draft_name: getState().sharableDocket.docket_data.draft_name,
    }
    dispatch({
      type: SET_DOCKET_DATA,
      payload: finaldata,
    })
  }
}

export const yesNoNaNormalFieldValue = (
  fieldId: number,
  value: string,
  yes_no_field_id: number,
  yes_no_docket_field_id: number,
  category_id: number
): ThunkAction<void, RootState, null, SetDocketSharableAction> => {
  return (dispatch, getState) => {
    const docketFieldValue =
      getState()?.sharableDocket?.docket_data?.docket_field_values?.map(
        (item, index) => {
          if (item.form_field_id === fieldId) {
            if (item.yes_no_value?.selected_id === yes_no_field_id) {
              if (
                item.yes_no_value?.explanation?.findIndex(
                  (explanation) =>
                    explanation.form_field_id === yes_no_docket_field_id
                )! < 0
              ) {
                item?.yes_no_value?.explanation?.push({
                  category_id: category_id,
                  form_field_id: yes_no_docket_field_id!,
                  value: value,
                })
              } else {
                item.yes_no_value?.explanation?.forEach((row, index) => {
                  if (row.form_field_id === yes_no_docket_field_id) {
                    row.value = value
                  }
                })
              }
            }
            return item
          } else {
            return item
          }
        }
      )
    const finaldata = {
      docket_field_values: docketFieldValue,
      draft_date: getState().sharableDocket.docket_data.draft_date,
      isValid: getState().sharableDocket.docket_data.isValid,
      isSent: getState().sharableDocket.docket_data.isSent,
      is_email: getState().sharableDocket.docket_data.is_email,
      email_subject: getState().sharableDocket.docket_data.email_subject,
      draft_name: getState().sharableDocket.docket_data.draft_name,
    }
    dispatch({
      type: SET_DOCKET_DATA,
      payload: finaldata,
    })
  }
}

export interface imageResponse {
  [key: number]: string[] | imageResponse | imageResponse[]
}

const filterFormResponse = (
  imageResponseData: imageResponse[],
  field_id: number
) => {
  let status: imageResponse[] = []
  Object.keys(imageResponseData as imageResponse).forEach((items, i, data) => {
    if (field_id === Number(items)) {
      return (status = imageResponseData[items])
    }
  })
  return status
}

export const replaceImageFileToUrl = (
  imageResponseData: imageResponse[],
  onSuccess: (finaldata: DocketData) => void
): ThunkAction<void, RootState, null, SetDocketSharableAction> => {
  return (dispatch, getState) => {
    const docketFieldValue =
      getState()?.sharableDocket?.docket_data?.docket_field_values?.map(
        (form_field, index) => {
          if (
            filterFormResponse(imageResponseData, form_field.form_field_id)
              .length !== 0
          ) {
            const filterDocketFiled = filterFormResponse(
              imageResponseData,
              form_field.form_field_id
            ) as string[]

            if (form_field.category_id === 5 || form_field.category_id === 14) {
              const imageUpdate =
                form_field?.image_value?.concat(filterDocketFiled)
              return {
                ...form_field,
                image_value: imageUpdate,
                raw_image: [],
              }
            } else if (form_field.category_id === 32) {
              const imageUpdate =
                form_field?.filesValue?.files?.concat(filterDocketFiled)
              return {
                ...form_field,
                filesValue: { files: imageUpdate! },
                raw_files: [],
              }
            } else if (form_field.category_id === 9) {
              const signatureImage: SignatureForm[] = []
              form_field?.signature_raw?.map((signature, i) =>
                signatureImage.push({
                  name: signature.name,
                  image: filterDocketFiled[i],
                })
              )
              const imageUpdate =
                form_field?.signature_value?.concat(signatureImage)

              return {
                ...form_field,
                signature_value: imageUpdate,
                signature_raw: [],
              }
            } else if (form_field.category_id === 22) {
              const gridValues = form_field?.grid_value?.map((items, index) => {
                if (filterFormResponse(filterDocketFiled, index)) {
                  return items.map((gridValue, i) => {
                    if (
                      filterFormResponse(
                        filterFormResponse(filterDocketFiled, index)!,
                        gridValue.form_field_id
                      ).length !== 0
                    ) {
                      if (
                        gridValue.category_id === 5 ||
                        gridValue.category_id === 14
                      ) {
                        const imageUpdate = gridValue?.image_value?.concat(
                          filterFormResponse(
                            filterFormResponse(filterDocketFiled, index),
                            gridValue.form_field_id
                          ) as string[]
                        )
                        return {
                          ...gridValue,
                          image_value: imageUpdate,
                          raw_image: [],
                        }
                      } else if (gridValue.category_id === 9) {
                        const signatureImage: SignatureForm[] = []
                        gridValue?.signature_raw?.map((signature, i) =>
                          signatureImage.push({
                            name: signature.name,
                            image: (
                              filterFormResponse(
                                filterFormResponse(filterDocketFiled, index)!,
                                gridValue.form_field_id
                              ) as string[]
                            )[i],
                          })
                        )
                        const imageUpdate =
                          gridValue?.signature_value?.concat(signatureImage)

                        return {
                          ...gridValue,
                          signature_value: imageUpdate,
                          signature_raw: [],
                        }
                      }
                      return gridValue
                    }
                    return gridValue
                  })
                }
                return items
              })
              return {
                ...form_field,
                grid_value: gridValues,
              }
            } else if (form_field.category_id === 18) {
              const filterYesNoSelectedId = filterFormResponse(
                filterDocketFiled,
                form_field.yes_no_value?.selected_id!
              )

              if (filterYesNoSelectedId.length !== 0) {
                const updateExplanation =
                  form_field.yes_no_value?.explanation?.map(
                    (explanations, i) => {
                      if (
                        filterFormResponse(
                          filterYesNoSelectedId,
                          explanations.form_field_id
                        ).length !== 0
                      ) {
                        if (explanations.category_id === 5) {
                          const imageUpdate = explanations?.image_value?.concat(
                            filterFormResponse(
                              filterYesNoSelectedId,
                              explanations.form_field_id
                            ) as string[]
                          )
                          return {
                            ...explanations,
                            image_value: imageUpdate,
                            raw_image: [],
                          }
                        }
                      }

                      return explanations
                    }
                  )
                return {
                  ...form_field,
                  yes_no_value: {
                    explanation: updateExplanation,
                    selected_id: form_field.yes_no_value?.selected_id,
                    selected_type: form_field.yes_no_value?.selected_type,
                  },
                }
              }
              return form_field
            }
          }
          return form_field
        }
      )

    const finaldata = {
      docket_field_values: docketFieldValue,
      draft_date: getState().sharableDocket.docket_data.draft_date,
      isValid: getState().sharableDocket.docket_data.isValid,
      isSent: getState().sharableDocket.docket_data.isSent,
      is_email: getState().sharableDocket.docket_data.is_email,
      email_subject: getState().sharableDocket.docket_data.email_subject,
      draft_name: getState().sharableDocket.docket_data.draft_name,
    }
    dispatch({
      type: SET_DOCKET_DATA,
      payload: finaldata,
    })
    onSuccess(finaldata)
  }
}

export const updateRTEmailUser = (
  data: EmailUserResponse[]
): ThunkAction<void, RootState, null, SetDocketSharableAction> => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_SEND_DOCKET_RT_EMAIL_USERS,
      payload: data!,
    })
  }
}

export const updateRTEmailApprovalUser = (
  data: EmailUserResponse[]
): ThunkAction<void, RootState, null, SetDocketSharableAction> => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_SEND_DOCKET_RT_EMAIL_USERS_APPROVAL,
      payload: data!,
    })
  }
}

export const updateRTUser = (
  data: User[]
): ThunkAction<void, RootState, null, SetDocketSharableAction> => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_SEND_DOCKET_RT_USERS,
      payload: data!,
    })
  }
}

export const updateRTApprovalUser = (
  data: User[]
): ThunkAction<void, RootState, null, SetDocketSharableAction> => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_SEND_DOCKET_RT_USERS_APPROVAL,
      payload: data!,
    })
  }
}

export const updateIsEmailStatus = (
  data: boolean
): ThunkAction<void, RootState, null, SetDocketSharableAction> => {
  return (dispatch, getState) => {
    const finaldata = {
      docket_field_values:
        getState().sharableDocket.docket_data.docket_field_values,
      draft_date: getState().sharableDocket.docket_data.draft_date,
      isValid: getState().sharableDocket.docket_data.isValid,
      isSent: getState().sharableDocket.docket_data.isSent,
      is_email: data,
      email_subject: getState().sharableDocket.docket_data.email_subject,
      draft_name: getState().sharableDocket.docket_data.draft_name,
    }
    dispatch({
      type: SET_DOCKET_DATA,
      payload: finaldata,
    })
  }
}

export const setSendDocketType = (
  value: docketSendTypeEnum
): ThunkAction<void, RootState, null, SetDocketSharableAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_SEND_DOCKET_TYPE,
      payload: value,
    })
  }
}

export const removeGridRow = (
  fieldId: number,
  rowIndex: number
): ThunkAction<void, RootState, null, SetDocketSharableAction> => {
  return async (dispatch, getState) => {
    const updateData =
      getState().sharableDocket.docket_data.docket_field_values?.map(
        (items, index) => {
          if (items.form_field_id === fieldId) {
            items?.grid_value?.splice(rowIndex, 1)
            return { ...items, grid_value: items.grid_value }
          } else {
            return items
          }
        }
      )
    const finaldata = {
      docket_field_values: updateData!,
      draft_date: getState().sharableDocket.docket_data.draft_date,
      isValid: getState().sharableDocket.docket_data.isValid,
      isSent: getState().sharableDocket.docket_data.isSent,
      is_email: getState().sharableDocket.docket_data.is_email,
      email_subject: getState().sharableDocket.docket_data.email_subject,
      draft_name: getState().sharableDocket.docket_data.draft_name,
    }
    dispatch({
      type: SET_DOCKET_DATA,
      payload: finaldata,
    })
  }
}
