import { ThunkAction } from 'redux-thunk'
import { RootState } from '@/redux/store'
import {
  CommonAction,
  queryParams,
  SET_ClIENTS_DETAILS,
  SET_DOCKET_TEMPLATES,
  SET_DOCUMENTS,
  SET_EMAIL_USERS,
  SET_EMPLOYEE,
  SET_INVOICE_TEMPLATES,
  SET_PlANT,
  SET_RT_USERS,
  SET_SHAREABLE_LINK,
} from '@/types'
import { EmployeeAPI } from '@/services/employeeService'
import axios from 'axios'
import {
  showErrorToast,
  showSucessToast,
  showWarnToast,
} from '@/lib/customToast'
import { DocketTemplate } from '@/services/Docket/templateService'
import { PlantApi } from '@/services/plantService'
import { invoiceService } from '@/services/invoiceService'
import { userService } from '@/services/usersService'
import { clientApi } from '@/services/clientService'
import { DocumentManagerApi } from '@/services/documentManagerService'
import { convertAssocRtUsersToMappedResponse } from '@/lib/common'
import { RTMappedResponse } from '@/types/response-types'

export const setEmployes = (): ThunkAction<
  void,
  RootState,
  null,
  CommonAction
> => {
  return async (dispatch) => {
    try {
      const queryParams: queryParams = {
        page: 1,
      }
      const res = await EmployeeAPI.getEmployees(queryParams)
      dispatch({
        type: SET_EMPLOYEE,
        payload: res.data?.filter((element) => element.user_info),
      })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        showErrorToast(err.response?.data.message)
      }
    }
  }
}

export const setDocketTemplates = (): ThunkAction<
  void,
  RootState,
  null,
  CommonAction
> => {
  return async (dispatch) => {
    try {
      const queryParams: queryParams = {
        page: 1,
      }
      const response = await DocketTemplate.get(queryParams)
      dispatch({
        type: SET_DOCKET_TEMPLATES,
        payload: response.data,
      })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        showErrorToast(err.response?.data.message)
      }
    }
  }
}

export const setPlant = (): ThunkAction<
  void,
  RootState,
  null,
  CommonAction
> => {
  return async (dispatch) => {
    try {
      const queryParams: queryParams = {
        page: 1,
      }
      const response = await PlantApi.get(queryParams)
      console.log('sdsd', response)
      dispatch({
        type: SET_PlANT,
        payload: response.data,
      })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        showErrorToast(err.response?.data.message)
      }
    }
  }
}

export const setInvoiceTemplates = (): ThunkAction<
  void,
  RootState,
  null,
  CommonAction
> => {
  return async (dispatch) => {
    try {
      const queryParams: queryParams = {
        page: 1,
      }
      const response = await invoiceService.getInvoiceTemplates(queryParams)
      dispatch({
        type: SET_INVOICE_TEMPLATES,
        payload: response.data,
      })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        showErrorToast(err.response?.data.message)
      }
    }
  }
}

export const setRTUsers = (): ThunkAction<
  void,
  RootState,
  null,
  CommonAction
> => {
  return async (dispatch) => {
    try {
      const response = await userService.getRTUsers()
      const mappedResponse: Array<RTMappedResponse> =
        convertAssocRtUsersToMappedResponse(response)
      dispatch({
        type: SET_RT_USERS,
        payload: mappedResponse ?? [],
      })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        showErrorToast(err.response?.data.message)
      }
    }
  }
}

export const setEmailUsers = (): ThunkAction<
  void,
  RootState,
  null,
  CommonAction
> => {
  return async (dispatch) => {
    try {
      const response = await userService.getCustomUsers()
      dispatch({
        type: SET_EMAIL_USERS,
        payload: response,
      })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        showErrorToast(err.response?.data.message)
      }
    }
  }
}

export const generateLink = (
  force = false
): ThunkAction<void, RootState, null, CommonAction> => {
  return async (dispatch, getState) => {
    const shareable_link: string | null = getState().common.shareable_link
    if (!shareable_link || force == true) {
      try {
        const response = await DocketTemplate.generateShareableLink()
        dispatch({
          type: SET_SHAREABLE_LINK,
          payload: response.link,
        })
      } catch (err) {
        if (axios.isAxiosError(err)) {
          showErrorToast(err.response?.data.message)
        }
      }
    }
  }
}

export const setClientDetails = (): ThunkAction<
  void,
  RootState,
  null,
  CommonAction
> => {
  return async (dispatch) => {
    try {
      const response = await clientApi.getClientAndOwnCompany()
      dispatch({
        type: SET_ClIENTS_DETAILS,
        payload: response.data,
      })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        showErrorToast(err.response?.data.message)
      }
    }
  }
}
export const documentListPrinciple = (
  force = false
): ThunkAction<void, RootState, null, CommonAction> => {
  return async (dispatch, getState) => {
    let documents = getState().common.documents

    if (force == true) documents = []

    if (documents.length == 0) {
      try {
        const queryParams: queryParams = {
          page: 1,
        }

        const response = await DocumentManagerApi.get(queryParams)
        dispatch({
          type: SET_DOCUMENTS,
          payload: response.data,
        })
      } catch (exception) {}
    }
  }
}
