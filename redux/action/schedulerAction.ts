import {
  Employee,
  SchedulerAction,
  Schedulers,
  SET_EMPLOYEE,
  SET_MONTH_INDEX,
  SET_SCHEDULER_LIST,
  SET_SELECTED_DAY,
  SET_SELECT_EVENT,
  SET_SHOW_EVENT_MODAL,
  SET_SHOW_MORE_EVENT,
  SET_SMALL_CALENDAR_MONTH_INDEX,
  SET_VIEW_TYPE,
} from '@/types'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store'
import dayjs from 'dayjs'
import axios from 'axios'
import {
  showErrorToast,
  showSucessToast,
  showWarnToast,
} from '@/lib/customToast'
import { EmployeeAPI } from '@/services/employeeService'
import { getMonth, includesMultidimensionalArray } from '@/lib/common'
import { SchedulerApi } from '@/services/schedulerService'

export const setMonthIndex = (
  value: number
): ThunkAction<void, RootState, null, SchedulerAction> => {
  return async (dispatch, getState) => {
    dispatch({
      type: SET_MONTH_INDEX,
      payload: value,
    })
    const from_date = dayjs(getMonth(value)[0][0]).format('YYYY-MM-DD')
    getMonth

    const to_date = dayjs(
      getMonth(value)[getMonth(value + 1).length - 1][6]
    ).format('YYYY-MM-DD')
    const queryParams = {
      from_date: from_date,
      to_date: to_date,
    }
    try {
      const res = await SchedulerApi.list(queryParams)
      // const data = res.data?.map((item) => {
      //   return includesMultidimensionalArray(
      //     getState().scheduler.schedulers,
      //     item
      //   )
      // })

      // console.log(data)
      // dispatch(setSchedulerList(data!))
      dispatch(setSchedulerList(res.data!))
    } catch (err) {
      if (axios.isAxiosError(err)) {
        showErrorToast(err.response?.data.message)
      }
    }
  }
}

export const setSmallCalendarMonthIndex = (
  value: number
): ThunkAction<void, RootState, null, SchedulerAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_SMALL_CALENDAR_MONTH_INDEX,
      payload: value,
    })
  }
}

export const setDaySelected = (
  value: dayjs.Dayjs
): ThunkAction<void, RootState, null, SchedulerAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_SELECTED_DAY,
      payload: value,
    })
  }
}

export const setEventModal = (
  value: boolean
): ThunkAction<void, RootState, null, SchedulerAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_SHOW_EVENT_MODAL,
      payload: value,
    })
  }
}

export const setSchedulerList = (
  value: Schedulers[]
): ThunkAction<void, RootState, null, SchedulerAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_SCHEDULER_LIST,
      payload: value,
    })
  }
}

export const setSelectEvent = (
  value: Schedulers | null
): ThunkAction<void, RootState, null, SchedulerAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_SELECT_EVENT,
      payload: value,
    })
  }
}

export const setShowMoreEvent = (
  value: boolean
): ThunkAction<void, RootState, null, SchedulerAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_SHOW_MORE_EVENT,
      payload: value,
    })
  }
}

export const setViewType = (
  value: string
): ThunkAction<void, RootState, null, SchedulerAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_VIEW_TYPE,
      payload: value,
    })
  }
}
