import { CommonStatesHook } from '@/lib/common'
import React, { Fragment, useEffect, useState } from 'react'
import { MyProfileUpdateApi } from '@/services/profile/myProflie'
import { Company } from '@/types'
import {
  showErrorToast,
  showSucessToast,
  showWarnToast,
} from '@/lib/customToast'
import ProfileInputEntity from './InputEntity'
import axios from 'axios'
import { fetchUser } from '@/redux/action'

interface IFormInput {
  key: string
  value: string | File
}

const ProfileForm: React.FC = ({}) => {
  const { router, dispatch, loading, setLoading } = CommonStatesHook()

  const [profileData, setProfileData] = useState<Company>()

  useEffect(() => {
    const getProfileData = async () => {
      try {
        setProfileData(await MyProfileUpdateApi.get())

        setLoading(false)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          showErrorToast(err.response?.data.message)
        }
      }
    }
    setLoading(true)
    getProfileData()
  }, [setLoading])

  const [profileFieldSettings, setProfileFieldSettings] = useState([
    {
      key: 'first_name',
      inputtype: 'text',
      label: 'First Name',
      placeholder: 'Enter First Name .',
      editable: true,
      section: 'employee',
      apikey: 'first_name',
    },
    {
      key: 'last_name',
      inputtype: 'text',
      label: 'Last Name',
      placeholder: 'Enter Last Name .',
      editable: true,
      section: 'employee',
      apikey: 'last_name',
    },
    {
      key: 'email',
      inputtype: 'email',
      label: 'Email',
      placeholder: 'Enter Email .',
      editable: true,
      section: 'employee',
      apikey: 'email',
    },
    {
      key: 'image',
      inputtype: 'file',
      label: 'Profile Image',
      placeholder: 'Profile Image here .',
      editable: true,
      section: 'employee',
      apikey: 'image',
    },
    {
      key: 'name',
      inputtype: 'text',
      label: 'Company Name',
      placeholder: 'Enter Company Name .',
      editable: true,
      section: 'company',
      apikey: 'name',
    },
    {
      key: 'abn',
      inputtype: 'text',
      label: 'Company ABN ',
      placeholder: 'Enter Company ABN .',
      editable: true,
      section: 'company',
      apikey: 'abn',
    },
    {
      key: 'contact_number',
      inputtype: 'text',
      label: 'Contact Number',
      placeholder: 'Enter Contact Number .',
      editable: true,
      section: 'company',
      apikey: 'contact_number',
    },
    {
      key: 'address',
      inputtype: 'text',
      label: 'Address',
      placeholder: 'Enter Address .',
      editable: true,
      section: 'company',
      apikey: 'address',
    },
    {
      key: 'logo',
      inputtype: 'file',
      label: 'Logo',
      placeholder: 'upload logo .',
      editable: true,
      section: 'company',
      apikey: 'logo',
    },
  ])

  const disabledField = ['email']

  const onFieldFocus = (itemkey: string) => {
    const newData = [...profileFieldSettings]

    profileFieldSettings.forEach((item, idx) => {
      item.key == itemkey
        ? (newData[idx]['editable'] = true)
        : (newData[idx]['editable'] = false)
    })
    setProfileFieldSettings(newData)
  }

  const onFieldFocusExit = () => {
    const newData = [...profileFieldSettings]

    profileFieldSettings.forEach((item, idx) => {
      newData[idx]['editable'] = true
    })
    setProfileFieldSettings(newData)
  }

  const putProfile = async (formdata: IFormInput) => {
    setLoading(true)
    try {
      const formDataType = new FormData()
      for (const key in formdata) {
        formDataType.append(key, formdata[key])
      }

      formDataType.append('_method', 'PUT')

      setProfileData(await MyProfileUpdateApi.update(formDataType))
      setLoading(true)
      dispatch(fetchUser)
      setLoading(false)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        showErrorToast(err.response?.data.message)
      }
    }
  }

  return (
    <Fragment>
      <div className="ml-2 grid grid-cols-1 text-sm">
        {profileFieldSettings
          .filter((filteritem) => filteritem.section === 'employee')
          .map((item, idx) => {
            return (
              <div
                key={idx}
                className={`${
                  ['first_name'].includes(item.key)
                    ? ''
                    : 'mt-2 pt-2  border-t border-gray-200'
                }`}
              >
                <ProfileInputEntity
                  defaultValue={
                    profileData?.user_info
                      ? profileData?.user_info[item.apikey]
                      : ''
                  }
                  itemkey={item.key}
                  inputtype={item.inputtype}
                  label={item.label}
                  placeholder={item.placeholder}
                  editable={item.editable}
                  onFieldSubmit={putProfile}
                  onFocus={onFieldFocus}
                  onExit={onFieldFocusExit}
                  disabled={disabledField.includes(item.key)}
                />
              </div>
            )
          })}
      </div>
      <strong className="block mt-12 mb-4 font-medium text-lg">
        Company Profile
      </strong>
      <div className="grid grid-cols-1 text-sm">
        {profileFieldSettings
          .filter((filteritem) => filteritem.section === 'company')
          .map((item, idx) => {
            return (
              <Fragment key={idx}>
                <div
                  className={` ${
                    ['name'].includes(item.key)
                      ? ' '
                      : 'mt-2 pt-2 border-t border-gray-200'
                  }`}
                  key={idx}
                >
                  <ProfileInputEntity
                    defaultValue={profileData ? profileData[item.apikey] : ''}
                    itemkey={item.key}
                    inputtype={item.inputtype}
                    label={item.label}
                    placeholder={item.placeholder}
                    editable={item.editable}
                    disabled={disabledField.includes(item.key)}
                    onFieldSubmit={putProfile}
                    onFocus={onFieldFocus}
                    onExit={onFieldFocusExit}
                  />
                </div>
              </Fragment>
            )
          })}
      </div>
    </Fragment>
  )
}

export default ProfileForm
