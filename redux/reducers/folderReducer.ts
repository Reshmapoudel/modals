import {
  FolderAction,
  FolderInitialState,
  SET_FOLDER_LIST,
  SET_OPEN_FOLDER,
  SET_REMOVED_SELECTED_FOLDER,
  SET_REMOVED_SELECTED_FOLDER_ITEMS,
  SET_SELECTED_FOLDER,
  SET_SELECTED_FOLDER_ITEMS,
} from '@/types'

const initialState: FolderInitialState = {
  folder_list: [],
  folder_selected: [],
  open_folder: [],
  selected_folder_items: [],
}
const folderReducer = (
  state = initialState,
  action: FolderAction
): FolderInitialState => {
  switch (action.type) {
    case SET_FOLDER_LIST:
      return {
        ...state,
        folder_list: action.payload,
      }
    case SET_SELECTED_FOLDER:
      return {
        ...state,
        folder_selected: action.payload,
      }

    case SET_REMOVED_SELECTED_FOLDER:
      return {
        ...state,
        folder_selected: [],
      }
    case SET_OPEN_FOLDER:
      return {
        ...state,
        open_folder: action.payload,
      }

    case SET_SELECTED_FOLDER_ITEMS:
      return {
        ...state,
        selected_folder_items: action.payload,
      }

    case SET_REMOVED_SELECTED_FOLDER_ITEMS:
      return {
        ...state,
        selected_folder_items: [],
      }
    default:
      return state
  }
}

export default folderReducer
