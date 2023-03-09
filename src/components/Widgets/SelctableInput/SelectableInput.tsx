import { motion } from 'framer-motion'
import {
  Add,
  ArrowDownward,
  ArrowDropDown,
  ArrowDropUp,
  Close,
  Search,
} from '@material-ui/icons'
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import _ from 'underscore'
import styles from './SelectableInvoice.module.css'
import { buttonHoverChildVarient, slideAnimVarient } from '@/variants/common'
import { ClickAwayListener } from '@material-ui/core'
import classNames from 'classnames'
import { flattenNestedObject, stringGenerator } from '@/lib/common'
import Image from 'next/image'
import OptimizedProfileImageWithFallback from '../imageOptimization'

/* eslint-disable  @typescript-eslint/no-explicit-any */
interface SelectableInputProps {
  items: Array<any>
  inputplaceholder?: string
  placeholder?: string
  multiple?: boolean
  value?: any
  itemValue?: string
  itemLabel?: string
  disabled?: boolean
  showOptionGroup?: boolean
  closeOnSelect?: boolean
  groupList?: string
  dismissableGroup?: boolean
  groupLabel?: string
  setValue: (str: any) => void
  isImage?: boolean
  valueKey?: string
  imageKey?: string
  className?: string
}

const SelectableInput: React.FC<SelectableInputProps> = ({
  items,
  inputplaceholder = 'Type to search',
  placeholder = 'Select a option',
  multiple = false,
  dismissableGroup = false,
  disabled = false,
  groupList = 'children',
  itemValue = 'value',
  itemLabel = 'label',
  closeOnSelect = false,
  value,
  groupLabel = 'label',
  setValue,
  isImage = false,
  valueKey = null,
  imageKey = 'image',
  className,
}) => {
  // state that operates if the option dropdown is shown or not
  const [opened, setOpened] = useState<boolean>(false)

  // has single dimension array for all options items
  const [itemsArray, setItemArray] = useState([])

  // sate for observing typed text in search input
  const [searchInput, setSearchInput] = useState<string>('')

  // // state for handling selected value for single selection option
  // const [singleValue, setSingleValue] = useState<
  //   string | number | undefined | null
  // >(null)

  // // state for handling selected values for multiple selection option
  // const [multipleValue, setMultipleValue] = useState<
  //   Array<string | number | undefined>
  // >([])

  // start of refs
  const optionRelativeDiv = useRef<HTMLDivElement | null>(null)
  const optionShowDiv = useRef<HTMLDivElement | null>(null)

  // function to filter items for searched text
  const filtered_items: CallableFunction = () =>
    items?.filter((selectable_item: any) => {
      return selectable_item[itemLabel]
        ?.toString()
        ?.toLowerCase()
        ?.includes(searchInput)
    })

  // useEffect(() => {
  //   if (multiple) {
  //     if (valueKey !== null) {
  //       const valueArray =
  //         value?.map((valueElement) => valueElement[valueKey]) ?? []
  //       setMultipleValue(valueArray)
  //     } else {
  //       if (Array.isArray(value)) {
  //         setMultipleValue(value)
  //       } else {
  //         if (!!value) setMultipleValue([value])
  //       }
  //     }
  //   } else {
  //     if (!Array.isArray(value)) {
  //       setSingleValue(value)
  //     } else {
  //       setSingleValue(null)
  //     }
  //   }
  // }, [multiple, value, valueKey])

  // useEffect(() => {
  //   if (multiple && !Array.isArray(value)) setValue([])

  //   if (!multiple && Array.isArray(value)) setValue(null)
  // }, [multiple])

  // converts multi dimenions nested options to sinlge items array
  useEffect(() => {
    if (!!items) {
      retrieveSingleLevelItems()
    }
  }, [items])

  // // sets single value to parent component
  // useEffect(() => {
  //   if (!disabled && value != singleValue && !multiple) setValue(singleValue)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [singleValue])

  // // sets multiple value to parent component
  // useEffect(() => {
  //   if (!disabled && !_.isEqual(value, multipleValue) && multiple)
  //     setValue(multipleValue)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [multipleValue])

  // useEffect(() => {
  //   if (!!opened) {
  //     const bounds = optionRelativeDiv.current?.getBoundingClientRect()
  //     if (!!optionShowDiv) {
  //       console.log(bounds)
  //       const optionDropdownElement = optionShowDiv.current as HTMLElement
  //       const optionDropdownElementBounds =
  //         optionDropdownElement.getBoundingClientRect()

  //       const dropdownHeight = optionDropdownElementBounds.height

  //       const screenHeight = window.innerHeight

  //       console.log('this is bounds', (bounds?.top ?? 0) + dropdownHeight)
  //       console.log('this is screen height', screenHeight)
  //       if ((bounds?.top ?? 0) + dropdownHeight < screenHeight) {
  //         console.log('this is for lesser condition')
  //         optionDropdownElement.style.top = `${bounds?.top}px` ?? '0px'
  //       } else {
  //         console.log('this is for greater condition')
  //         optionDropdownElement.style.bottom = `${bounds?.top}px` ?? '0px'
  //       }

  //       // if()

  //       optionDropdownElement.style.width = `${bounds?.width}px` ?? '0px'
  //       optionDropdownElement.style.top = `${bounds?.y}px` ?? '0px'
  //       optionDropdownElement.style.left = `${bounds?.x}px` ?? '0px'
  //     }
  //   }
  // }, [opened])

  // converts nested object to single dimension array
  const retrieveSingleLevelItems = useCallback(() => {
    const singleLevelItemArray = flattenNestedObject(items, groupList)

    setItemArray(singleLevelItemArray)
  }, [groupList, items])

  // handles selection of item
  const handleSelect: CallableFunction = (
    itemValue: string | number | undefined
  ) => {
    if (disabled) return null

    if (multiple) {
      let new_array: Array<string | number | undefined> = value ?? []
      if (value?.find((value) => itemValue === value)) {
        new_array = value?.filter((value) => itemValue !== value)
      } else {
        new_array.push(itemValue)
      }
      setValue([...new_array])

      if (closeOnSelect) {
        setOpened(false)
      }
    } else {
      setValue(itemValue)

      setOpened(false)
    }
  }

  // removes selected item for multiple option
  const removeItem: CallableFunction = (
    itemValue: string | number | undefined
  ) => {
    if (disabled) return null
    let new_array: Array<string | number | undefined> = value
    if (value?.find((value) => itemValue === value)) {
      new_array = value?.filter((value) => itemValue !== value)
    } else {
      new_array.push(itemValue)
    }

    setValue([...new_array])
  }

  // chekcs if the item is elected or not
  const isItemSelected = (item) => {
    let flag = false
    if (multiple) {
      flag = !!value?.find((itemValue) => itemValue === item)
    } else {
      flag = value == item
    }

    return flag
  }

  // gets label of an item
  const getItemLabelValue: CallableFunction = (elementValue) => {
    return (
      itemsArray.find(
        (itemElement) => itemElement[itemValue] === elementValue
      )?.[itemLabel] ?? 'N/A'
    )
    // return getRecursiveItemValue(elementValue, items)
  }

  const getRecursiveItemValue: CallableFunction = (
    selectedItemValue,
    selectable_array
  ) => {
    const elementItem = selectable_array.find(
      (element) => element[itemValue] == selectedItemValue
    )

    if (!!elementItem) {
      return elementItem[itemLabel]
    }

    let labelValue
    selectable_array.forEach((selectable_array_item) => {
      if (selectable_array_item[itemValue] == selectedItemValue) {
        labelValue = selectable_array_item[itemLabel]
      } else {
        if (selectable_array_item[groupList]?.length > 0) {
          labelValue = getRecursiveItemValue(
            selectedItemValue,
            selectable_array_item[groupList]
          )

          if (!!labelValue) return
        }
      }
    })
    if (!!labelValue) return labelValue
    else return null
  }

  // React function to render selected items for both multile or single selection
  const showSelectableItem: CallableFunction = () => {
    if (multiple) {
      return (
        <div className={styles.elementChipContainer}>
          {value?.length > 0 &&
            value?.map((elementValue, index: number) => {
              return (
                <div
                  className={styles.element_chip}
                  key={`selectable_chip_${elementValue}_${index}`}
                >
                  <div className={styles.element_chip_text}>
                    {getItemLabelValue(elementValue)}
                  </div>
                  <div className={styles.close_item}>
                    <Close
                      onClick={(event) => {
                        removeItem(elementValue), event.stopPropagation()
                      }}
                      width={1}
                      height={1}
                      style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        marginLeft: '10px',
                        color: '#666666',
                        borderRadius: '100%',
                        background: 'white',
                      }}
                    ></Close>
                  </div>
                </div>
              )
            })}
          {value?.length <= 0 && (
            <div className="font-normal text-gray-700">{placeholder}</div>
          )}
        </div>
      )
    } else {
      if (!!value) {
        return <div>{getItemLabelValue(value)}</div>
      } else {
        return <div className="font-normal text-gray-700">{placeholder}</div>
      }
    }
  }

  return (
    <ClickAwayListener onClickAway={(value) => setOpened(false)}>
      <div className={className}>
        <div
          className={classNames(
            'selectable_show_section flex',
            disabled ? styles.selectable_show_section_disabled : ' '
          )}
          onClick={(event) => {
            !disabled ? setOpened(!opened) : false
          }}
        >
          <div className={styles.selectable_show_box}>
            <div className="flex-grow overflow-hidden">
              {showSelectableItem()}
            </div>
            <div className={`${styles.selectable_show_arrow}`}>
              {!opened && <ArrowDropDown />}
              {opened && <ArrowDropUp />}
            </div>
          </div>
        </div>
        <div className={classNames(`relative`)} ref={optionRelativeDiv}>
          <motion.div
            ref={optionShowDiv}
            className={styles.selectable_input_container}
            animate={opened ? 'visible' : 'hidden'}
            variants={slideAnimVarient}
          >
            <Fragment>
              <div className={styles.input_container}>
                <div className={styles.input_container_prefix_icon}>
                  <Search />
                </div>
                <input
                  type="text"
                  className={styles.input_box}
                  placeholder={inputplaceholder}
                  value={searchInput}
                  onChange={(value) => setSearchInput(value.target.value)}
                />
                <motion.div
                  className={styles.input_container_sufix_icon}
                  animate={searchInput === '' ? 'hidden' : 'visible'}
                  variants={buttonHoverChildVarient}
                  onClick={(value) => setSearchInput('')}
                >
                  <Close />
                </motion.div>
              </div>
              <div className={styles.selectable_dropdown}>
                <div>
                  {items.filter(
                    (selectable_item: any) =>
                      selectable_item[itemLabel]
                        ?.toString()
                        ?.toLowerCase()
                        ?.includes(searchInput) ||
                      selectable_item[groupList]?.length > 0
                  ).length > 0 && (
                    <ListItemsAsChildren
                      items={items}
                      itemLabel={itemLabel}
                      dismissableGroup={dismissableGroup}
                      itemValue={itemValue}
                      counter={1}
                      handleSelect={handleSelect}
                      groupList={groupList}
                      groupLabel={groupLabel}
                      isItemSelected={isItemSelected}
                      searchInput={searchInput}
                      isImage={isImage}
                      imageKey={imageKey}
                    />
                  )}
                  {itemsArray.filter((selectable_item: any) =>
                    selectable_item[itemLabel]
                      ?.toString()
                      ?.toLowerCase()
                      ?.includes(searchInput)
                  ).length === 0 && (
                    <div
                      className={styles.selctable_item}
                    >{`No Items Found`}</div>
                  )}
                </div>
              </div>
            </Fragment>
          </motion.div>
        </div>
      </div>
    </ClickAwayListener>
  )
}

interface ListItemsAsChildrenProps {
  items: Array<any>
  itemLabel: string
  searchInput: string
  groupList: string
  dismissableGroup: boolean
  groupLabel: string
  itemValue: any
  isItemSelected: (value: any) => boolean
  handleSelect: CallableFunction
  counter: number
  isImage: boolean
  imageKey: string
}
// function to render option either in nested or single form
const ListItemsAsChildren: React.FC<ListItemsAsChildrenProps> = ({
  items,
  itemLabel,
  searchInput,
  groupList,
  dismissableGroup,
  groupLabel,
  itemValue,
  isItemSelected,
  handleSelect,
  counter = 1,
  isImage,
  imageKey,
}) => {
  const [opened, setOpened] = useState(true)
  return (
    <Fragment>
      {items
        .filter(
          (selectable_item: any) =>
            selectable_item[itemLabel]
              ?.toString()
              ?.toLowerCase()
              ?.includes(searchInput) || selectable_item[groupList]?.length > 0
        )
        .map((selectable_item, index) => {
          if (
            !!selectable_item[groupList] &&
            selectable_item[groupList].length > 0
          ) {
            return (
              <div
                className="group"
                key={`nestedselectabel_${index}_${
                  selectable_item['id'] ?? stringGenerator(24)
                }`}
              >
                <div className={styles.group_item}>
                  <div
                    className={`${styles.group_item_group_label_name} pl-${
                      counter * 2
                    }`}
                  >
                    {selectable_item[groupLabel]}
                  </div>
                  {dismissableGroup && (
                    <div className="" onClick={(value) => setOpened(!opened)}>
                      {opened && (
                        <Close
                          style={{
                            height: 14,
                          }}
                        />
                      )}
                      {!opened && (
                        <Add
                          style={{
                            height: 14,
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
                <div>
                  {opened && (
                    <ListItemsAsChildren
                      items={selectable_item[groupList]}
                      itemLabel={itemLabel}
                      groupLabel={groupLabel}
                      itemValue={itemValue}
                      handleSelect={handleSelect}
                      groupList={groupList}
                      dismissableGroup={dismissableGroup}
                      counter={counter + 1}
                      isItemSelected={isItemSelected}
                      searchInput={searchInput}
                      isImage={isImage}
                      imageKey={imageKey}
                    />
                  )}
                </div>
              </div>
            )
          }
          return (
            <div
              key={`selectable_chip__${index}`}
              className={`flex items-center  ${styles.selctable_item} pl-[${
                counter * 4
              }px] ${
                isItemSelected(selectable_item[itemValue])
                  ? styles.selected
                  : ''
              }`}
              style={{
                paddingLeft: `${counter * 12}px`,
                paddingRight: `${counter * 10}px`,
              }}
              onClick={(value) => handleSelect(selectable_item[itemValue])}
            >
              <span
                className={classNames(
                  `flex items-center flex-auto text-base font-normal `,
                  isItemSelected(selectable_item[itemValue]) && 'text-white'
                )}
              >
                {`${selectable_item[itemLabel]}`}
              </span>
              {isImage && selectable_item[`${imageKey}`] && (
                <OptimizedProfileImageWithFallback
                  src={selectable_item[`${imageKey}`]}
                  fallBackSrc={'/images/user.png'}
                  width={32}
                  height={32}
                  alt="Profile Image"
                  className={'w-8 h-8 rounded-full'}
                />
              )}
            </div>
          )
        })}
    </Fragment>
  )
}

export default SelectableInput
