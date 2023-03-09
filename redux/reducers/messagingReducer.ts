import { ChatMessage } from '@/types'
import {
  MessagingAction,
  MessagingState,
  messagingState,
  SET_CHAT_MESSAGES_META,
  SET_CHAT_ROOM_LOADING,
  SET_CHAT_ROOM_META,
  SET_MESSAGES_LOADING,
  SET_MESSAGING_ROOM_LIST,
  SET_SELECTED_CHAT_ROOM_MESSAGES,
  SET_SELECTED_MESSAGING_ROOM,
} from '@/types/redux-types'

export const messaginReducer = (
  state = messagingState,
  action: MessagingAction
): MessagingState => {
  switch (action.type) {
    case SET_SELECTED_MESSAGING_ROOM:
      return { ...state, selected_room: action.payload }
    case SET_MESSAGING_ROOM_LIST:
      return {
        ...state,
        room_list: action.payload,
      }
    case SET_SELECTED_CHAT_ROOM_MESSAGES:
      return { ...state, messages: action.payload }
    case SET_CHAT_ROOM_LOADING:
      return { ...state, loading_chat_rooms: action.payload }
    case SET_MESSAGES_LOADING:
      return { ...state, loading_messages: action.payload }
    case SET_CHAT_ROOM_META:
      return { ...state, chat_room_pagination: action.payload }
    case SET_CHAT_MESSAGES_META:
      return { ...state, chat_messages_pagination: action.payload }
    default:
      return state
  }
}
