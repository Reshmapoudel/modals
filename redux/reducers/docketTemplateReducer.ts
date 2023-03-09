import {
  CommonType,
  SET_DISABLE_ELEMENT_DRAGGING,
  SET_SETTING_TAB_STATUS,
} from '@/types'

import {
  YesNoField,
  GridFields,
  yesNoDocketField,
  SET_GRID_ELEMENT,
  gridFieldFormula,
  SET_NORMAL_PREFILLER,
} from '@/types'
import {
  SET_COPY_FORM_ELEMENT,
  DocketTemplateAction,
  docketTemplateState,
  SET_DOCKET_FORM_ELEMENT,
  SET_DOCKET_TEMPLATE,
  SET_FORM_ELEMENT_INDEX,
  SET_LEFT_SIDE_BAR_STATE,
  SET_RIGHT_SIDE_BAR_STATE,
  SET_LOADING_TEMPLATE,
  SET_BOTTOM_SIDE_BAR_STATE,
  SET_UPDATE_ELEMENT_VALUE,
  UPDATE_DOCKET_TEMPLATE,
  RESET_DOCKET,
  SET_ERROR_STATUS,
  SET_IS_SHOW_DELETE_ELEMENT,
  INSERT_FIELD_ITEMS,
  SET_MODAL_STATE,
  SET_YES_NO_DOCKET_FIELDS,
} from '@/types'

const initialState: docketTemplateState = {
  template: null,
  form_elements: [],
  selected_index: undefined,
  copy_form_element: null,
  loading: false,
  success: '',
  error: '',
  is_left_sidebar: true,
  is_right_sidebar: false,
  is_bottom_sidebar: false,
  error_status: false,
  is_show_delete_element: false,
  on_click_modal: false,
  setting_tab_status: CommonType.DOCKET,
  disable_element_dragging: false,
}

const docketTemplateReducer = (
  state = initialState,
  action: DocketTemplateAction
): docketTemplateState => {
  switch (action.type) {
    case SET_DOCKET_TEMPLATE:
      return {
        ...state,
        template: action.payload,
      }
    case SET_FORM_ELEMENT_INDEX:
      return {
        ...state,
        selected_index: action.payload,
      }
    case SET_DOCKET_FORM_ELEMENT:
      return {
        ...state,
        form_elements: action.payload,
      }
    case SET_COPY_FORM_ELEMENT:
      return {
        ...state,
        copy_form_element: action.payload,
      }
    case SET_LEFT_SIDE_BAR_STATE:
      return {
        ...state,
        is_left_sidebar: action.payload,
      }
    case SET_SETTING_TAB_STATUS:
      return {
        ...state,
        setting_tab_status: action.payload,
      }
    case SET_RIGHT_SIDE_BAR_STATE:
      return {
        ...state,
        is_right_sidebar: action.payload,
      }
    case SET_BOTTOM_SIDE_BAR_STATE:
      return {
        ...state,
        is_bottom_sidebar: action.payload,
      }
    case SET_DISABLE_ELEMENT_DRAGGING:
      return {
        ...state,
        disable_element_dragging: action.payload,
      }
    case SET_UPDATE_ELEMENT_VALUE:
      return {
        ...state,
        form_elements: state.form_elements.map((formElement, index) => {
          if (formElement.id === Number(action.payload.field_id)) {
            if (action.payload.table_type !== undefined) {
              if (action.payload.table_type === 'yes_no_field') {
                formElement.yes_no_field.map((yesNoField, i) => {
                  if (action.payload.type === 'ALL') {
                    yesNoField[action.payload.key!] = action.payload.value
                  } else if (yesNoField.type === action.payload.type) {
                    yesNoField[action.payload.key!] = action.payload.value
                  }
                })
              } else if (action.payload.table_type === 'manual_timer') {
                formElement.manual_timer.map((manualTimer, i) => {
                  if (manualTimer.type === action.payload.type) {
                    manualTimer[action.payload.key!] = action.payload.value
                  }
                })
              } else if (action.payload.table_type === 'grid_fields') {
                formElement.grid_fields.map((gridFields, i) => {
                  if (gridFields.id === Number(action.payload.grid_field_id)) {
                    gridFields[action.payload.key!] = action.payload.value
                  }
                })
              } else if (action.payload.table_type === 'manual_timer_break') {
                formElement.manual_timer_break.map((manualTimerBreak, i) => {
                  if (manualTimerBreak.type === action.payload.type) {
                    manualTimerBreak[action.payload.key!] = action.payload.value
                  }
                })
              } else if (action.payload.table_type === 'tally_unit_rate') {
                formElement.tally_unit_rate.map((tallyUnitRate, i) => {
                  if (tallyUnitRate.type === action.payload.type) {
                    tallyUnitRate[action.payload.key!] = action.payload.value
                  }
                })
              } else if (action.payload.table_type === 'unit_rate') {
                formElement.unit_rate.map((unitRate, i) => {
                  if (unitRate.type === action.payload.type) {
                    unitRate[action.payload.key!] = action.payload.value
                  }
                })
              } else if (action.payload.table_type === 'docket_field_numbers') {
                formElement[action?.payload?.table_type!][action.payload.key!] =
                  action.payload.value
              } else if (
                action.payload.table_type === 'docket_preview' ||
                action.payload.table_type === 'invoice_amount' ||
                action.payload.table_type === 'docket_date_time'
              ) {
                formElement[action.payload.key!] = action.payload.value
              } else {
                formElement[action.payload.table_type!][action.payload.key!] =
                  action.payload.value
              }
            } else {
              formElement[action.payload.key!] = action.payload.value
            }
          }
          return formElement
        }),
      }
    case UPDATE_DOCKET_TEMPLATE:
      state.template &&
        (state.template[action.payload.key!] = action.payload.value)
      return {
        ...state,
      }
    case SET_LOADING_TEMPLATE:
      return {
        ...state,
        loading: action.payload,
      }
    case SET_ERROR_STATUS:
      return {
        ...state,
        error_status: action.payload,
      }
    case SET_IS_SHOW_DELETE_ELEMENT:
      return {
        ...state,
        is_show_delete_element: action.payload,
      }
    case INSERT_FIELD_ITEMS:
      return {
        ...state,
        form_elements: state.form_elements.map((formElement, index) => {
          if (formElement.id === Number(action.field_id)) {
            if (action.table_types === 'grid_fields') {
              formElement.grid_fields = formElement.grid_fields.concat(
                action.payload as GridFields[]
              )
            } else if (action.table_types === 'yes_no_field') {
              formElement.yes_no_field = action.payload as YesNoField[]
            }
          }
          return formElement
        }),
      }
    case SET_MODAL_STATE:
      return {
        ...state,
        on_click_modal: action.payload,
      }
    case SET_YES_NO_DOCKET_FIELDS:
      return {
        ...state,
        form_elements: state.form_elements.map((formElement, index) => {
          if (action.field_id === formElement.id) {
            formElement.yes_no_field.map((yesnofield, i) => {
              if (yesnofield.id === action.yes_no_filed) {
                if (action.yes_no_filed_type === 'Explanation') {
                  yesnofield.yes_no_docket_field =
                    action.payload as yesNoDocketField[]
                } else if (action.yes_no_filed_type === 'AddItems') {
                  yesnofield.yes_no_docket_field =
                    yesnofield.yes_no_docket_field.concat(
                      action.payload as yesNoDocketField
                    )
                } else if (action.yes_no_filed_type === 'RemoveItem') {
                  const data = action.payload as yesNoDocketField
                  yesnofield.yes_no_docket_field.map((yes_no_docket_fields) => {
                    if (yes_no_docket_fields.id === data.id) {
                      yes_no_docket_fields['deleted_at'] = data.deleted_at
                    }
                  })
                } else if (action.yes_no_filed_type === 'Reorder') {
                  yesnofield.yes_no_docket_field =
                    action.payload as yesNoDocketField[]
                } else if (action.yes_no_filed_type === 'InlineEditingLabel') {
                  const data = action.payload as yesNoDocketField
                  yesnofield.yes_no_docket_field.map((yes_no_docket_fields) => {
                    if (yes_no_docket_fields.id === data.id) {
                      yes_no_docket_fields['label'] = data.label
                    }
                  })
                } else if (
                  action.yes_no_filed_type === 'ErrorInlineEditingLabel'
                ) {
                  const data = action.payload as yesNoDocketField
                  yesnofield.yes_no_docket_field.map((yes_no_docket_fields) => {
                    if (yes_no_docket_fields.id === data.id) {
                      yes_no_docket_fields['label'] = ' '
                    }
                  })
                }
              }
            })
          }
          return formElement
        }),
      }

    case SET_GRID_ELEMENT:
      return {
        ...state,
        form_elements: state.form_elements.map((formElement, index) => {
          if (formElement.id === Number(action.field_id)) {
            formElement.grid_fields.map((gridfield, i) => {
              if (gridfield.id === Number(action.grid_id)) {
                if (action.field_type === 'grid_field_formula') {
                  gridfield![action.field_type] =
                    action.payload as gridFieldFormula[]
                } else {
                  gridfield![action.field_type] = action.payload
                }
              }
            })
          }
          return formElement
        }),
      }
    case SET_NORMAL_PREFILLER:
      return {
        ...state,
        form_elements: state.form_elements.map((formElement, index) => {
          if (formElement.id === Number(action.field_id)) {
            if (action.grid_id === undefined) {
              formElement!['prefiller'] = {
                data: action.payload.data,
                meta: action.payload.meta!,
              }
            } else {
              formElement.grid_fields.map((gridfield, i) => {
                if (gridfield.id === Number(action.grid_id)) {
                  gridfield!['prefiller'] = action.payload
                }
              })
            }
          }
          return formElement
        }),
      }
    case RESET_DOCKET:
      return initialState
    default:
      return state
  }
}

export default docketTemplateReducer
