import { combineReducers } from 'redux'
import authReducer from './authReducer'
import docketTemplateReducer from './docketTemplateReducer'
import invoiceTemplateReducer from './invoiceTemplateReducer'
import schedulerReducer from './schedulerReducer'
import commonReducer from './commonReducer'
import { messaginReducer } from './messagingReducer'
import folderReducer from './folderReducer'
import sentDocketReducer from './sentDocketReducer'
import sendInvoiceReducer from './sendInvoiceReducer'
import sharableDocketReducer from './sharableDocketReducer'
import XeroStateReducer from './xeroReducer'

const RootReducer = combineReducers({
  auth: authReducer,
  docketTemplate: docketTemplateReducer,
  invoice: invoiceTemplateReducer,
  scheduler: schedulerReducer,
  common: commonReducer,
  chat: messaginReducer,
  folder: folderReducer,
  sentDocket: sentDocketReducer,
  sendInvoice: sendInvoiceReducer,
  sharableDocket: sharableDocketReducer,
  xero: XeroStateReducer,
})

export default RootReducer
