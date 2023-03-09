import { ThunkAction } from 'redux-thunk'
import { RootState } from '@/redux/store'
import {
  queryParams,
  SET_FOLDER_LIST,
  FolderAction,
  SET_SELECTED_FOLDER,
  selectedFolder,
  SET_REMOVED_SELECTED_FOLDER,
  SET_OPEN_FOLDER,
  Folder,
  FolderType,
  sendItemDetails,
  PaginationMeta,
  SET_SELECTED_FOLDER_ITEMS,
  SET_REMOVED_SELECTED_FOLDER_ITEMS,
} from '@/types'
import { FolderAPI } from '@/services/folderService'
import axios from 'axios'
import {
  showErrorToast,
  showSucessToast,
  showWarnToast,
} from '@/lib/customToast'
import { MouseEvent } from 'react'

export const setFoldersList = (): ThunkAction<
  void,
  RootState,
  null,
  FolderAction
> => {
  return async (dispatch) => {
    try {
      const response = await FolderAPI.get()
      dispatch({
        type: SET_FOLDER_LIST,
        payload: response.data,
      })
      // onResponse(response.data)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        showErrorToast(err.response?.data.message)
      }
    }
  }
}

export const setSelectedFolder = (
  data: selectedFolder
): ThunkAction<void, RootState, null, FolderAction> => {
  return async (dispatch, getState) => {
    dispatch(setRemovedSelectedFolderItems())
    let datas: number[] = []
    if (data.selection_type === FolderType.MULTIPLE_SELECTION) {
      // const index = getState().folder.folder_selected.indexOf(data.value)
      // if (index !== -1) {
      //   getState().folder.folder_selected.splice(index, 1)
      //   datas = getState().folder.folder_selected
      // } else {
      datas = [...getState().folder.folder_selected, data.value as number]
      // }
    } else {
      // const index = getState().folder.folder_selected.indexOf(data.value)
      // if (index !== -1) {
      //   datas = []
      // } else {
      datas = [data.value as number]
      // }
    }

    dispatch({
      type: SET_SELECTED_FOLDER,
      payload: datas,
    })
  }
}

export const setRemovedSelectedFolder = (): ThunkAction<
  void,
  RootState,
  null,
  FolderAction
> => {
  return async (dispatch) => {
    dispatch({
      type: SET_REMOVED_SELECTED_FOLDER,
    })
  }
}

export const setOpenFolder = (
  data: Folder
  // onResponse: (data: sendItemDetails[], meta: PaginationMeta) => void
): ThunkAction<void, RootState, null, FolderAction> => {
  return async (dispatch, getState) => {
    const updateData = [...getState().folder.open_folder, data]
    dispatch({
      type: SET_OPEN_FOLDER,
      payload: updateData,
    })
    dispatch(setRemovedSelectedFolder())

    // try {
    //   const queryParams: queryParams = {
    //     page: 1,
    //   }
    //   const response = await FolderAPI.itemView(queryParams, data.id)
    //   onResponse(response.data.data, response.data.meta)
    // } catch (err) {
    //   if (axios.isAxiosError(err)) {
    //     showErrorToast(err.response?.data.message)
    //   }
    // }
  }
}

export const setRemoveFolder = (
  data: Folder[]
): ThunkAction<void, RootState, null, FolderAction> => {
  return async (dispatch) => {
    dispatch({
      type: SET_OPEN_FOLDER,
      payload: data,
    })
  }
}

export const setFolders = (
  data: Folder[]
): ThunkAction<void, RootState, null, FolderAction> => {
  return async (dispatch) => {
    dispatch({
      type: SET_FOLDER_LIST,
      payload: data,
    })
  }
}

export const setSelectedFolderItems = (
  data: selectedFolder
): ThunkAction<void, RootState, null, FolderAction> => {
  return async (dispatch, getState) => {
    dispatch(setRemovedSelectedFolder())
    let datas: string[] = []
    if (data.selection_type === FolderType.MULTIPLE_SELECTION) {
      datas = [...getState().folder.selected_folder_items, data.value as string]
    } else {
      datas = [data.value as string]
    }

    dispatch({
      type: SET_SELECTED_FOLDER_ITEMS,
      payload: datas,
    })
  }
}

export const setRemovedSelectedFolderItems = (): ThunkAction<
  void,
  RootState,
  null,
  FolderAction
> => {
  return async (dispatch) => {
    dispatch({
      type: SET_REMOVED_SELECTED_FOLDER_ITEMS,
    })
  }
}
