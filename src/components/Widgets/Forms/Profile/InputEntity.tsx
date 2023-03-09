import {
  Check,
  ClearSharp,
  EditOutlined,
  ErrorOutlined,
} from '@material-ui/icons'
import styles from '@/components/Widgets/Input/Input.module.scss'
import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
import Button from '../../Button'
import { FileUpload } from '../../FileUpload'
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalStates,
} from '../../Modal'
import { CommonStatesHook } from '@/lib/common'
import { useFormContext } from 'react-hook-form'
import OptimizedProfileImageWithFallback from '../../imageOptimization'

const EditInputEntityFormModal: React.FC<{ label: string }> = ({ label }) => {
  const {
    register,
    reset,
    formState: { errors, isValid },
    setValue,
  } = useFormContext()
  useEffect(() => {
    reset()
  }, [reset])
  return (
    <Fragment>
      <div className="items-center w-full gap-4 my-6 text-sm md:flex">
        <ErrorOutlined /> {`Do you wish to edit "${label}" ?`}
      </div>
    </Fragment>
  )
}

interface ProfileInputEntityProps {
  inputtype: string
  itemkey: string
  label: string
  placeholder: string
  defaultValue: string
  editable: boolean
  disabled: boolean
  onFieldSubmit(formdata): void
  onFocus(string): void
  onExit(): void
}

const ProfileInputEntity: React.FC<ProfileInputEntityProps> = ({
  inputtype,
  itemkey,
  label,
  placeholder,
  defaultValue,
  editable,
  disabled,
  onFieldSubmit,
  onFocus,
  onExit,
}) => {
  const { router, dispatch, loading, setLoading } = CommonStatesHook()
  const { showModal, setShowModal, modalLoading, setModalLoading } =
    ModalStates()

  const [data, setData] = useState<string>(`${defaultValue}`)
  const [fieldEditable, setFieldEditable] = useState<boolean>(false)

  useEffect(() => {
    setData(`${defaultValue}`)
  }, [defaultValue])

  let returnComponent

  switch (inputtype) {
    // return statement for filetype
    case 'file':
      returnComponent = (
        <div className="mt-2 flex">
          <div className="inline-block w-60 relative h-full">
            <label className="font-medium ">{label}</label>
          </div>
          <div className="inline-block">
            <OptimizedProfileImageWithFallback
              src={data}
              alt="profile image"
              width={80}
              height={80}
              className="rounded-full bg-white"
              // fallBackSrc={'/images/user.png'}
            />

            <div className="w-74 mt-2 ">
              <FileUpload
                label={'FileUpload'}
                updateFilesCb={(files) => {
                  onFieldSubmit({ key: itemkey, value: files[0] })
                }}
                imageUrls={[]}
                viewType="small"
                multiple={false}
                accept=".jpg,.png,.jpeg"
              />
            </div>
          </div>
        </div>
      )
      break

    case 'text':
    case 'number':
    case 'email':
      returnComponent = (
        <Fragment>
          <label className="font-medium inline-block w-60">{label}</label>
          <input
            disabled={!(editable && fieldEditable)}
            className={`inline-block l p-2  text-md marker:border-0  ${styles.rtInput} bg-white truncate `}
            placeholder={placeholder}
            type={inputtype}
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          {disabled ? (
            <></>
          ) : (
            <div className="ml-4 inline-block float-right">
              {fieldEditable && editable ? (
                <>
                  <Button
                    className="m-2"
                    onClick={() => {
                      setShowModal('EditConfirmationModal')
                    }}
                    value={<Check color="primary" />}
                  ></Button>
                  <Button
                    className="m-2"
                    onClick={() => {
                      setFieldEditable(false)
                      setData(`${defaultValue}`)
                      onExit()
                    }}
                    value={<ClearSharp color="error" />}
                  ></Button>
                </>
              ) : (
                <>
                  <Button
                    className="mx-3 mt-2"
                    loading={!editable}
                    onClick={() => {
                      if (editable) {
                        setFieldEditable(true)
                        onFocus(itemkey)
                      }
                    }}
                    value={<EditOutlined />}
                  ></Button>
                </>
              )}
            </div>
          )}

          {/* Modal here */}
          <Modal
            isShown={showModal == 'EditConfirmationModal'}
            loading={modalLoading}
            submit={() => {
              setFieldEditable(false)
              data.trim() != ''
                ? onFieldSubmit({ key: itemkey, value: data })
                : ''
              onExit()
              setShowModal('')
            }}
          >
            <ModalHeader
              title="Edit Field Confirmation"
              hide={(status) => setShowModal(status)}
            ></ModalHeader>
            <ModalBody>
              <EditInputEntityFormModal label={label} />
            </ModalBody>
            <ModalFooter
              cancelButtonClass="red button"
              cancelButtonText="No"
              submitButtonClass="button blue"
              submitButtonText="Yes"
              hide={(status) => {
                setFieldEditable(false)
                setData(defaultValue)
                onExit()
                setShowModal(status)
              }}
            />
          </Modal>
        </Fragment>
      )

      break

    default:
      returnComponent = <Fragment></Fragment>
      break
  }
  return returnComponent
}

export default ProfileInputEntity
