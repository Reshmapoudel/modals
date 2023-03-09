import { Folder, FolderType } from '@/types'
import {
  FolderOpen,
  Reply,
  Folder as FolderIcon,
  ArrowForwardIos,
} from '@material-ui/icons'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useFormContext } from 'react-hook-form'
import Button from '../Button'

interface PopupFolderViewProps {
  folder_list: Folder[]
  type: FolderType.MULTIPLE_SELECTION | FolderType.SINGLE_SELECTION
  getFolderId: (id: number | number[]) => void
  defaultValue?: number[]
}
const PopupFolderView = ({
  folder_list,
  type,
  getFolderId,
  defaultValue,
}: PopupFolderViewProps) => {
  const [getFolderList, setFolderList] = useState<Folder[]>([])
  const [getSelectedFolder, setSelectedFolder] = useState<number[]>([])
  const [getOpenFolder, setOpenFolder] = useState<Folder[]>([])

  useEffect(() => {
    if (type === FolderType.SINGLE_SELECTION) {
      getFolderId(getSelectedFolder[0])
    } else {
      getFolderId(getSelectedFolder)
    }
  }, [getFolderId, getSelectedFolder, type])

  const hierarchyData = useCallback(
    (getFolder: Folder[], openFolderLastIndex: Folder) => {
      getFolder!.forEach((item, key) => {
        if (item.id === openFolderLastIndex.id) {
          setFolderList(item.children!)
        } else {
          hierarchyData(item.children!, openFolderLastIndex)
        }
      })
    },
    []
  )

  useEffect(() => {
    const openFolderLastIndex = getOpenFolder[getOpenFolder.length - 1]
    if (openFolderLastIndex !== undefined) {
      hierarchyData(folder_list, openFolderLastIndex!)
    } else {
      setFolderList(folder_list)
    }
  }, [folder_list, getOpenFolder, hierarchyData])

  const selectionFolderHandel = (
    item: Folder,
    selection_type: FolderType.MULTIPLE_SELECTION | FolderType.SINGLE_SELECTION
  ) => {
    if (!getSelectedFolder.includes(item.id)) {
      let datas: number[] = []
      if (selection_type === FolderType.MULTIPLE_SELECTION) {
        datas = [...getSelectedFolder, item.id]
      } else {
        datas = [item.id]
      }
      setSelectedFolder(datas)
    }
  }

  const handelOnClickMenu = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    item: Folder
  ) => {
    const isMultipleSelection =
      event.metaKey || event.ctrlKey
        ? type === FolderType.MULTIPLE_SELECTION
          ? FolderType.MULTIPLE_SELECTION
          : FolderType.SINGLE_SELECTION
        : FolderType.SINGLE_SELECTION
    selectionFolderHandel(item, isMultipleSelection)
  }

  const onDoubleClickHandel = (item: Folder) => {
    const updateData = [...getOpenFolder, item]
    setOpenFolder(updateData)
    setSelectedFolder([])
  }

  const backHandel = () => {
    const updateArray = getOpenFolder.slice(0, -1)
    setOpenFolder(updateArray)
    setSelectedFolder([])
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center w-full gap-4">
        <Button
          value={<Reply />}
          type="button"
          className="disabled:cursor-not-allowed disabled:text-gray-400"
          loading={getOpenFolder.length === 0 ? true : false}
          onClick={() => backHandel()}
        />
        <div className="flex items-center gap-2">
          <FolderOpen className=" text-rt-yellow" fontSize="large" />
          <div className="flex gap-1 text-stone-500">
            <span>Root</span>
            {getOpenFolder.map((item, index) => {
              return (
                <Fragment key={index}>
                  {index === 0 && <span>/</span>}
                  <span>{item.name} </span>
                  {index < getOpenFolder.length - 1 && <span>/</span>}
                </Fragment>
              )
            })}
          </div>
        </div>
      </div>
      <div className="overflow-y-auto h-96">
        <ul className="flex flex-col flex-wrap w-full ">
          {getFolderList.map((item, index) => {
            return (
              <div
                key={index}
                className={classNames(
                  `flex p-2 border-b cursor-pointer hover:bg-blue-300 hover:text-white`,
                  getSelectedFolder?.includes(item.id) && 'bg-gray-200 '
                )}
              >
                <li
                  className={classNames(`  flex-auto`)}
                  onClick={(event) => handelOnClickMenu(event, item)}
                  onDoubleClick={() => {
                    item?.children!.length !== 0 && onDoubleClickHandel(item)
                  }}
                >
                  <div className="flex items-center w-full gap-2 text-2xl">
                    <FolderIcon
                      className={classNames('text-rt-yellow')}
                      fontSize="inherit"
                    />
                    <h1
                      className={classNames(
                        'text-base w-full   truncate break-words'
                      )}
                    >
                      {item.name}
                    </h1>
                  </div>
                </li>
                {item?.children!.length !== 0 && (
                  <Button
                    type="button"
                    value={
                      <ArrowForwardIos
                        className="text-gray-400"
                        fontSize="small"
                      />
                    }
                    className="flex-initial"
                    onClick={() => {
                      onDoubleClickHandel(item)
                    }}
                  ></Button>
                )}
              </div>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default PopupFolderView
