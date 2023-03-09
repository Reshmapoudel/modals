import { toast } from 'react-toastify'

let lastMessage = ''
let lastMessageTime = 0

export const showErrorToast = (message: string) => {
  if (lastMessage !== message) {
    toast.error(message)
  } else {
    if (Date.now() - lastMessageTime > 5000) {
      toast.error(message)
    }
  }
  lastMessage = message
  lastMessageTime = Date.now()
}

export const showWarnToast = (message: string) => {
  toast.warning(message)
}

export const showSucessToast = (message: string) => {
  toast.success(message)
}

export const showInfoToast = (message: string) => {
  toast.info(message)
}
