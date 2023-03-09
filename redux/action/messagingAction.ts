import { ChatMessage, MessagingRoom, PaginationMeta, User } from '@/types'
import {
  MessagingAction,
  SET_CHAT_MESSAGES_META,
  SET_CHAT_ROOM_LOADING,
  SET_CHAT_ROOM_META,
  SET_MESSAGES_LOADING,
  SET_MESSAGING_ROOM_LIST,
  SET_SELECTED_CHAT_ROOM_MESSAGES,
  SET_SELECTED_MESSAGING_ROOM,
} from '@/types/redux-types'
import { messagingRooms } from '@/__mocks__/messaging.data'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store'

export const setMessagingRoomList = (
  value: Array<MessagingRoom>
): ThunkAction<void, RootState, null, MessagingAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_MESSAGING_ROOM_LIST,
      payload: value,
    })
  }
}

export const setSelectedMessagingRoom = (
  value: MessagingRoom
): ThunkAction<void, RootState, null, MessagingAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_SELECTED_MESSAGING_ROOM,
      payload: value,
    })
  }
}

export const setSelectedChatRoomMessages = (
  value: Array<ChatMessage>
): ThunkAction<void, RootState, null, MessagingAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_SELECTED_CHAT_ROOM_MESSAGES,
      payload: value,
    })
  }
}

export const setChatRoomLoading = (
  value: boolean
): ThunkAction<void, RootState, null, MessagingAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_CHAT_ROOM_LOADING,
      payload: value,
    })
  }
}

export const setChatRoomMessageLoading = (
  value: boolean
): ThunkAction<void, RootState, null, MessagingAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_MESSAGES_LOADING,
      payload: value,
    })
  }
}

export const setChatRoomMeta = (
  value: PaginationMeta
): ThunkAction<void, RootState, null, MessagingAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_CHAT_ROOM_META,
      payload: value,
    })
  }
}

export const appendChatMessage = (
  value: ChatMessage
): ThunkAction<void, RootState, null, MessagingAction> => {
  return (dispatch, getState) => {
    const messages: Array<ChatMessage> = getState().chat.messages

    if (value.seen.length > 0) {
      messages.forEach((message_element: ChatMessage) => {
        message_element.seen = message_element.seen.filter(
          (seen_user: User) => {
            return !value.seen.find(
              (seen_data: User) => seen_data.id == seen_user.id
            )
          }
        )
      })
    }

    dispatch({
      type: SET_SELECTED_CHAT_ROOM_MESSAGES,
      payload: [value, ...messages],
    })
  }
}

export const appendChatMessages = (
  value: Array<ChatMessage>
): ThunkAction<void, RootState, null, MessagingAction> => {
  return (dispatch, getState) => {
    const messages: Array<ChatMessage> = getState().chat.messages

    dispatch({
      type: SET_SELECTED_CHAT_ROOM_MESSAGES,
      payload: [...messages, ...value],
    })
  }
}

export const appendMessagingRoom = (
  value: MessagingRoom
): ThunkAction<void, RootState, null, MessagingAction> => {
  return (dispatch, getState) => {
    const room_list: Array<MessagingRoom> = getState().chat.room_list

    const new_rooms: Array<MessagingRoom> = [
      value,
      ...room_list.filter((room: MessagingRoom) => room.id != value.id),
    ]

    dispatch({
      type: SET_MESSAGING_ROOM_LIST,
      payload: new_rooms,
    })
  }
}

export const appendMessagingRooms = (
  value: Array<MessagingRoom>
): ThunkAction<void, RootState, null, MessagingAction> => {
  return (dispatch, getState) => {
    const room_list: Array<MessagingRoom> = getState().chat.room_list

    const new_rooms: Array<MessagingRoom> = [...room_list, ...value]

    dispatch({
      type: SET_MESSAGING_ROOM_LIST,
      payload: new_rooms,
    })
  }
}

export const addMemberToGroup = (value: {
  members: Array<User>
  room_id: number
}): ThunkAction<void, RootState, null, MessagingAction> => {
  return (dispatch, getState) => {
    const selected_room = getState().chat.selected_room
    const rooms = [...getState().chat.room_list]

    const room = rooms.find((room_data) => room_data.id == value.room_id)
    if (!!room) {
      const new_members = [...value.members]
      room.member = new_members
      if (room.id == selected_room?.id) {
        dispatch(setSelectedMessagingRoom(room))
      }
      const new_rooms = rooms.map((room_data: MessagingRoom) =>
        room_data.id == room.id ? room : room_data
      )
      dispatch(setMessagingRoomList(new_rooms))
    }
  }
}
export const setMessagesMeta = (
  meta: PaginationMeta
): ThunkAction<void, RootState, null, MessagingAction> => {
  return (dispatch) => {
    dispatch({
      type: SET_CHAT_MESSAGES_META,
      payload: meta,
    })
  }
}
