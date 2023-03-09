import {
  SchedulerAction,
  SchedulerState,
  SET_MONTH_INDEX,
  SET_SCHEDULER_LIST,
  SET_SELECTED_DAY,
  SET_SELECT_EVENT,
  SET_SHOW_EVENT_MODAL,
  SET_SHOW_MORE_EVENT,
  SET_SMALL_CALENDAR_MONTH_INDEX,
} from '@/types/schedulerType'
import dayjs from 'dayjs'
import { SET_VIEW_TYPE } from '../../types/schedulerType'

const initialState: SchedulerState = {
  month_index: dayjs().month(),
  small_calendar: dayjs().month(),
  day_selected: dayjs(),
  show_event_modal: false,
  schedulers: [],
  select_event: null,
  show_more_event: false,
  view_type: 'MONTH',
}
const schedulerReducer = (
  state = initialState,
  action: SchedulerAction
): SchedulerState => {
  switch (action.type) {
    case SET_MONTH_INDEX:
      return {
        ...state,
        month_index: action.payload,
      }
    case SET_SMALL_CALENDAR_MONTH_INDEX:
      return {
        ...state,
        month_index: action.payload,
      }
    case SET_SELECTED_DAY:
      return {
        ...state,
        day_selected: action.payload,
      }
    case SET_SHOW_EVENT_MODAL:
      return {
        ...state,
        show_event_modal: action.payload,
      }
    case SET_SCHEDULER_LIST:
      return {
        ...state,
        schedulers: action.payload,
      }
    case SET_SELECT_EVENT:
      return {
        ...state,
        select_event: action.payload,
      }
    case SET_SHOW_MORE_EVENT:
      return {
        ...state,
        show_more_event: action.payload,
      }
    case SET_VIEW_TYPE:
      return {
        ...state,
        view_type: action.payload,
      }
    default:
      return state
  }
}

export default schedulerReducer
