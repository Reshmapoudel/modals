// // import dayjs from 'dayjs'
// import {
//   MouseEvent,
//   MouseEventHandler,
//   useEffect,
//   useRef,
//   useLayoutEffect,
//   useState,
// } from 'react'
// import relativeTime from 'dayjs/plugin/relativeTime'
// import { useRouter } from 'next/router'
import { useDispatch } from "react-redux";
// import { AxiosError } from 'axios'
// import { Prefiller } from '@/types/prefillerType'
// import { RTMappedResponse, RTUserResponse } from '@/types/response-types'

import { useRouter } from "next/router";
import { useRef, useState } from "react";

// import { advancedFilter, Folder } from '@/types'

// dayjs.extend(relativeTime)

// /* eslint-disable  @typescript-eslint/no-explicit-any */

// export const publicRoutes = ['/login', '/register', '/reset_password']
// export const organizationRoute = [
//   '/dashboard/organization',
//   '/dashboard/organization/list',
// ]

// export const CustomDate = (data: string | undefined) => {
//   return dayjs(data).format('DD-MMM-YYYY') === dayjs().format('DD-MMM-YYYY')
//     ? dayjs(data).fromNow()
//     : dayjs(data).format('DD-MMM-YYYY')
export const publicRoutes = ["/login", "/register", "/reset_password"];
export const CommonStatesHook = () => {
  const checkBoxInputRef = useRef<HTMLInputElement[]>([]);
  const router = useRouter();
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  return { router, loading, setLoading, checkBoxInputRef };
};

// export const MakeDynamicSpace = (number: number) => {
//   let space = ' '
//   for (let k = 1; k < number; k++) {
//     space += '\u00A0\u00A0'
//   }
//   return space
// }

// export function downloadImage(blob, filename) {
//   const link = document.createElement('a')
//   link.href = blob
//   link.download = filename
//   document.body.appendChild(link)
//   link.click()
//   document.body.removeChild(link)
//   setTimeout(() => URL.revokeObjectURL(blob), 5000)
// }

// export function findMaxIndexPrefiller(prefiller: Prefiller[]) {
//   const index = []
//   prefiller?.map((item) => {
//     return childPrefiller(item, index)
//   })
//   return index
// }

// function childPrefiller(prefiller: Prefiller, index) {
//   const nestedComments = (prefiller.prefiller || []).map((prefiller) => {
//     return childPrefiller(prefiller, index)
//   })
//   return index.push(prefiller.index)
// }

// export function includesMultidimensionalArray(data, items) {
//   data.map((item) => {
//     if (item.id !== items.id) {
//       return item
//     }
//   })
// }

// // export const downloadQRCode = (e) => {
// //   console.log(e.target)
// //   // const qrCodeURL = document
// //   //   .getElementById('qrCodeEl')
// //   //   .toDataURL('image/png')
// //   //   .replace('image/png', 'image/octet-stream')
// //   // console.log(qrCodeURL)
// //   // let aEl = document.createElement('a')
// //   // aEl.href = qrCodeURL
// //   // aEl.download = 'QR_Code.png'
// //   // document.body.appendChild(aEl)
// //   // aEl.click()
// //   // document.body.removeChild(aEl)
// // }

// export const flattenNestedObject: CallableFunction = (
//   elementItems,
//   nested_key
// ) => {
//   let arrayItem: Array<any> = []
//   elementItems.forEach((element, key) => {
//     if (element.hasOwnProperty(nested_key) && element[nested_key].length > 0) {
//       arrayItem = [...arrayItem, ...flattenNestedObject(element[nested_key])]
//     } else {
//       const object: any = { ...element }
//       arrayItem.push(object)
//     }
//   })
//   return arrayItem
// }

// export const formatPriceAmount = (price: number) => price?.toFixed(2)

// export function useWindowSize(width: number, height: number) {
//   const [size, setSize] = useState([0, 0])
//   useLayoutEffect(() => {
//     function updateSize() {
//       setSize([width, height])
//     }
//     window.addEventListener('resize', updateSize)
//     updateSize()
//     return () => window.removeEventListener('resize', updateSize)
//   }, [height, width])
//   return size
// }

// // implementation hook of InterSectionObserver
// export function useOnScreen(ref, options) {
//   const [visible, setVisible] = useState<boolean>(false)
//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       setVisible(entry.isIntersecting)
//     }, options)
//     if (ref.current) {
//       observer.observe(ref.current)
//     }
//     return () => {
//       if (ref.current) {
//         observer.unobserve(ref.current)
//       }
//     }
//   }, [ref, options])
//   return [ref, visible]
// }

// // converts base64 image to string
// export const dataURLtoFile: CallableFunction = (
//   dataurl,
//   filename: string
// ): File => {
//   const arr = dataurl.split(','),
//     mime = arr[0].match(/:(.*?);/)[1],
//     bstr = atob(arr[1]),
//     n = bstr.length,
//     u8arr = new Uint8Array(n)

//   let count = n

//   while (count--) {
//     u8arr[count] = bstr.charCodeAt(n)
//   }

//   return new File([u8arr], filename, { type: mime })
// }

// // export const dataURLtoFile: CallableFunction = (
// //   dataurl: string,
// //   fileName: string
// // ): File => {
// //   const trimmedString = dataurl.replace('data:image/png;base64', '')
// //   const imageContent = atob(trimmedString)
// //   const buffer = new ArrayBuffer(imageContent.length)
// //   const view = new Uint8Array(buffer)

// //   for (let n = 0; n < imageContent.length; n++) {
// //     view[n] = imageContent.charCodeAt(n)
// //   }
// //   const type = 'image/png'
// //   const blob = new Blob([buffer], { type })
// //   return new File([blob], fileName, {
// //     lastModified: new Date().getTime(),
// //     type,
// //   })
// // }

// // generaters
// export const stringGenerator: CallableFunction = (length: number): string => {
//   let result = ''
//   const characters =
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//   const charactersLength = characters.length
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength))
//   }
//   return result
// }

// export const convertBase64toBlob: CallableFunction = (
//   b64Data: string,
//   contentType: string,
//   sliceSize: number
// ): Blob => {
//   contentType = contentType || ''
//   sliceSize = sliceSize || 512

//   const byteCharacters = atob(b64Data)
//   const byteArrays: Array<Uint8Array> = []

//   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//     const slice = byteCharacters.slice(offset, offset + sliceSize)

//     const byteNumbers = new Array(slice.length)
//     for (let i = 0; i < slice.length; i++) {
//       byteNumbers[i] = slice.charCodeAt(i)
//     }

//     const byteArray = new Uint8Array(byteNumbers)

//     byteArrays.push(byteArray)
//   }

//   const blob = new Blob(byteArrays, { type: contentType })
//   return blob
// }

// export function getMonth(month = dayjs().month()) {
//   month = Math.floor(month)
//   const year = dayjs().year()
//   const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day()
//   let currentMonthCount = 0 - firstDayOfTheMonth
//   const daysMatrix = new Array(6).fill([]).map(() => {
//     return new Array(7).fill(null).map(() => {
//       currentMonthCount++
//       return dayjs(new Date(year, month, currentMonthCount))
//     })
//   })
//   return daysMatrix
// }

// export function getWeek(month: dayjs.Dayjs[][], selectedDay: dayjs.Dayjs) {
//   const week = month
//     .map((item, index) => {
//       if (
//         item.filter(
//           (row) => row.format('DD-MM-YY') === selectedDay.format('DD-MM-YY')
//         ).length === 1
//       ) {
//         return item
//       }
//     })
//     .filter((filterWeek) => filterWeek !== undefined)[0]
//   return week
// }

// export const promiseDelay = (delayInMs) => {
//   return new Promise((resolve) => setTimeout(resolve, delayInMs))
// }

// export const convertAssocRtUsersToMappedResponse = (
//   assocUsers: RTUserResponse
// ): Array<RTMappedResponse> => {
//   let mapped_response: Array<RTMappedResponse> = Object.keys(assocUsers).map(
//     (objectKey: string) => {
//       const rtMapped: RTMappedResponse = {
//         company_name: objectKey,
//         users: assocUsers[objectKey],
//       }
//       return rtMapped
//     }
//   )

//   if (typeof mapped_response == undefined) mapped_response = []

//   return mapped_response
// }

// export const formatAdvanceFilterQuery = (query: advancedFilter) => {
//   const advanceQuery = { ...query }
//   Object.keys(advanceQuery).forEach((key) => {
//     if (!advanceQuery[key] && !Array.isArray(advanceQuery))
//       delete advanceQuery[key]
//     else if (Array.isArray(advanceQuery) && advanceQuery.length <= 0)
//       delete advanceQuery[key]
//     if (key == 'docket_field')
//       advanceQuery[key] = advanceQuery[key]?.filter(
//         (field) => field.value.toString() != ''
//       )
//   })

//   return query
// }

// export const getFormattedStringForNestedFolder = (
//   folder_id: number,
//   folder_array: Folder[],
//   folder_name = ''
// ): string | null => {
//   let folderName: string | null = null
//   for (let i = 0; i < folder_array.length; i++) {
//     const folder = folder_array[i]
//     if (folder.id == folder_id) {
//       folderName = folder.name

//       break
//     }

//     if (folder?.children!.length > 0) {
//       folderName = getFormattedStringForNestedFolder(
//         folder_id,
//         folder?.children!,
//         folder.name
//       )

//       if (folderName) {
//         break
//       }
//     }
//   }
//   if (folderName) return `${folder_name} \\ ${folderName}`
//   return folderName
// }

// export const getFolderNestedArray = (
//   folder_id: number,
//   folder_array: Folder[],
//   ancestors: Folder[] = []
// ) => {
//   for (const folder of folder_array) {
//     if (folder.id === folder_id) {
//       return ancestors?.concat({
//         id: folder.id,
//         name: folder.name,
//         root_id: folder.root_id,
//       })
//     }
//     const found = getFolderNestedArray(
//       folder_id,
//       folder?.children!,
//       ancestors?.concat({
//         id: folder.id,
//         name: folder.name,
//         root_id: folder.root_id,
//       })
//     )
//     if (found) {
//       return found
//     }
//   }
//   return undefined
// }

// export const onRedirectCallback = (appState) => {
//   console.log(appState)
//   // Router.replace(appState?.returnTo || '/')
// }
