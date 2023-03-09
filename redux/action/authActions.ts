import { ThunkAction } from 'redux-thunk'
import Cookies from 'js-cookie'
import Router from 'next/router'
import {
  showErrorToast,
  showSucessToast,
  showWarnToast,
} from '@/lib/customToast'
import {
  AuthAction,
  SET_USER,
  User,
  SET_LOADING,
  SIGN_OUT,
  SignInData,
  SET_ERROR,
  NEED_VERIFICATION,
  SET_SUCCESS,
  SET_COMPANY_AUTHENTICATION,
  validationError,
  SET_VALIDATION_ERROR,
  error,
  XeroUser,
  SET_XERO_USER,
  Company,
  UPDATE_USER_COMPANY,
} from '@/types'
import axios from 'axios'
import { RootState } from '@/redux/store'
import { AuthApi } from '@/services/authService'
import {
  setClientDetails,
  setDocketTemplates,
  setEmailUsers,
  setEmployes,
  setInvoiceTemplates,
  setRTUsers,
} from './common'
import { setPlant } from '@/redux/action'
import { setFoldersList } from './folderAction'

// Set loading
export const setLoading = (
  value: boolean
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING,
      payload: value,
    })
  }
}

// Log in
export const signIn = (
  data: SignInData,
  onError: () => void
): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const res = await AuthApi.signIn(data)
      if (res) {
        const userData: User = {
          id: res.data.id,
          email: res.data.email,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          image: res.data.image,
          company_info: res.data.company_info,
        }
        Cookies.set(
          '_token',
          `${res.data.token?.token_type} ${res.data.token?.access_token}`
        )
        dispatch({
          type: SET_USER,
          payload: userData,
        })
        Router.push('/dashboard/organization')
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status == 422) {
          onError()
          dispatch(setValidationError(err.response?.data.errors))
        } else {
          onError()
          dispatch(setError(err.response?.data))
          showErrorToast(err.response?.data.message)
        }
      }
    }
  }
}

// Log out
export const signout = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    try {
      await AuthApi.logout()
      dispatch(setLoading(true))
      dispatch({
        type: SIGN_OUT,
      })
      Cookies.remove('_token')
      window.location.reload()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(setLoading(false))
        showErrorToast(err.response?.data.message)
        if (err.response?.status == 401) {
          dispatch(signout())
        }
      }
    }
  }
}

// Set error
export const setError = (
  msg: error | null
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_ERROR,
      payload: msg,
    })
  }
}

// Set error
export const setValidationError = (
  msg: validationError
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_VALIDATION_ERROR,
      payload: msg,
    })
  }
}

// Set need verification
export const setNeedVerification = (): ThunkAction<
  void,
  RootState,
  null,
  AuthAction
> => {
  return (dispatch) => {
    dispatch({
      type: NEED_VERIFICATION,
    })
  }
}

// Set success
export const setSuccess = (
  msg: string
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_SUCCESS,
      payload: msg,
    })
  }
}

export const updateUserCompany = (
  company_info: Company
): ThunkAction<void, RootState, null, AuthAction> => {
  return (dispatch, getState) => {
    const userData: User = {
      email: getState().auth.user?.email!,
      first_name: getState().auth.user?.first_name!,
      last_name: getState().auth.user?.last_name!,
      image: getState().auth.user?.image!,
      id: getState().auth.user?.id!,
      company_info: company_info,
    }
    dispatch({
      type: SET_USER,
      payload: userData,
    })
  }
}

export const fetchUser = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const res = await AuthApi.getAUser()
      const userData: User = {
        id: res.data.id,
        email: res.data.email,
        first_name: res.data.first_name,
        last_name: res.data.last_name,
        image: res.data.image,
        company_info: res.data.company_info,
      }

      // collecting xero user information
      const xero_user = res.data.xero_info

      dispatch({
        type: SET_USER,
        payload: userData,
      })

      dispatch(setcompanyAuthentication())
      dispatch(setLoading(false))
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status == 404) {
          const userData: User = {
            id: err.response.data.data.id,
            email: err.response.data.data.email,
            first_name: err.response.data.data.first_name,
            last_name: err.response.data.data.last_name,
            image: err.response.data.data.image,
            company_info: null,
          }
          dispatch({
            type: SET_USER,
            payload: userData,
          })
          dispatch(setError(err.response.data))
          dispatch(setLoading(false))
        } else if (err.response?.status === 429) {
          dispatch(setError(err.response.data))
        } else {
          dispatch({
            type: SIGN_OUT,
          })
          dispatch(setError(err.response?.data))
          dispatch(setLoading(false))
        }
      }
    }
  }
}

// Set need company Authenticated
export const setcompanyAuthentication = (): ThunkAction<
  void,
  RootState,
  null,
  AuthAction
> => {
  return (dispatch) => {
    dispatch({
      type: SET_COMPANY_AUTHENTICATION,
    })
    dispatch(setEmployes())
    dispatch(setDocketTemplates())
    dispatch(setPlant())
    dispatch(setInvoiceTemplates())
    dispatch(setRTUsers())
    dispatch(setEmailUsers())
    dispatch(setFoldersList())
    dispatch(setClientDetails())
  }
}
