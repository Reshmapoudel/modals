// import { Employee } from './employeeType'
// import { Plant } from './plantType'
// import { ClientCompany, DocketTemplateList } from './templateType'
// import {
//   InvoiceTemplate,
//   normalSendInvoice,
//   sendEmailInvoice,
// } from '@/types/invoiceType'
// import {
//   EmailUserResponse,
//   RTMappedResponse,
//   RTUserResponse,
// } from './response-types'
// import { normalSendDocket, sendEmailDocket } from './sentDocketType'
// import { ReactNode } from 'react'
// import { DocumentManager } from './documentManagerType'
// import { DocketShareFormElementData } from './docketType'
// import { User } from './userType'
// import { DocketData, docketSendTypeEnum } from './sharableDocketType'

// export const SET_EMPLOYEE = 'SET_EMPLOYEE'
// export const SET_DOCKET_TEMPLATES = 'SET_DOCKET_TEMPLATES'
// export const SET_PlANT = 'SET_PlANT'
// export const SET_RT_USERS = 'SET_RT_USERS'
// export const SET_EMAIL_USERS = 'SET_EMAIL_USERS'
// export const SET_INVOICE_TEMPLATES = 'SET_INVOICE_TEMPLATES'
// export const SET_DOCUMENTS = 'SET_DOCUMENTS'
// export const SET_SHAREABLE_LINK = 'SET_SHAREABLE_LINK'
// export const SET_ClIENTS_DETAILS = 'SET_ClIENTS_DETAILS'

export interface timeStamps {
  created_at: string | null | undefined;
  updated_at: string | null | undefined;
}

// export interface ApiErrors<T> {
//   error?: T
// }

// export interface sendItemDetails {
//   folder_item_id?: number
//   item_type:
//     | CommonType.DOCKET
//     | CommonType.INVOICE
//     | CommonType.EMAIL_DOCKET
//     | CommonType.EMAIL_INVOICE
//   docket: normalSendDocket | null
//   email_docket: sendEmailDocket | null
//   invoice: normalSendInvoice | null
//   email_invoice: sendEmailInvoice | null
// }

// export enum CommonType {
//   DOCKET = 'DOCKET',
//   INVOICE = 'INVOICE',
//   EMAIL_DOCKET = 'EMAIL_DOCKET',
//   EMAIL_INVOICE = 'EMAIL_INVOICE',
//   APPROVAL = 'APPROVAL',
//   RECIPIENTS = 'RECIPIENTS',
//   TABLE_VIEW = 'TABLE_VIEW',
//   FOLDER_VIEW = 'FOLDER_VIEW',
//   INSIDE = 'INSIDE',
//   OUTSIDE = 'OUTSIDE',
// }
// export interface docketBankqueryParams extends queryParams {
//   tag?: string
// }
// export interface attendenceViewParams extends queryParams {
//   date?: string
// }
// export interface queryParams {
//   page: string | number
//   items?: number
//   search?: string
//   type?: string
// }

// export interface Params {
//   company_id: string[]
// }

// export interface SendDocketValidationError {
//   id: number
//   message: string
// }

// export interface SendDocketBody {
//   send_docket_type: docketSendTypeEnum
//   docket_data: DocketData
//   email_user_approvers: EmailUserResponse[] | []
//   email_user_receivers: EmailUserResponse[] | []
//   rt_user_approvers: User[] | []
//   rt_user_receivers: User[] | []
//   template: DocketTemplateList
//   shareable?: { is_shareable: boolean; id: number }
// }

// export interface moveFolderItems {
//   id: number
//   type:
//     | CommonType.DOCKET
//     | CommonType.EMAIL_DOCKET
//     | CommonType.INVOICE
//     | CommonType.EMAIL_INVOICE
// }

// export interface CommonState {
//   employes: Employee[] | null
//   docket_templates: DocketTemplateList[] | null
//   plant: Plant[] | null
//   invoice_templates: InvoiceTemplate[] | null
//   rt_users: Array<RTMappedResponse> | null
//   email_users: Array<EmailUserResponse>
//   shareable_link: string | null
//   clients_organization_list: ClientCompany[]
//   documents: DocumentManager[]
// }
// export interface subMenuTypes {
//   name: string
//   type: string
//   icon: ReactNode
//   action_type: string
//   text_color: string
//   modal_name: string
//   is_multiple: boolean
// }

// interface SetEmployee {
//   type: typeof SET_EMPLOYEE
//   payload: Employee[] | null
// }

// interface SetDocuments {
//   type: typeof SET_DOCUMENTS
//   payload: DocumentManager[]
// }

// interface SetDocketsTemplate {
//   type: typeof SET_DOCKET_TEMPLATES
//   payload: DocketTemplateList[] | null
// }

// interface SetInvoicesTemplate {
//   type: typeof SET_INVOICE_TEMPLATES
//   payload: InvoiceTemplate[] | null
// }

// interface SetPlant {
//   type: typeof SET_PlANT
//   payload: Plant[] | null
// }

// interface SetRTUsers {
//   type: typeof SET_RT_USERS
//   payload: Array<RTMappedResponse>
// }

// interface SetEmailUsers {
//   type: typeof SET_EMAIL_USERS
//   payload: Array<EmailUserResponse>
// }

// interface SetShareableLink {
//   type: typeof SET_SHAREABLE_LINK
//   payload: string
// }
// interface SetClientDetails {
//   type: typeof SET_ClIENTS_DETAILS
//   payload: ClientCompany[]
// }

// export type CommonAction =
//   | SetEmployee
//   | SetPlant
//   | SetDocketsTemplate
//   | SetInvoicesTemplate
//   | SetRTUsers
//   | SetEmailUsers
//   | SetShareableLink
//   | SetClientDetails
//   | SetDocuments
