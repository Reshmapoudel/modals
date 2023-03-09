import {
  ChevronLeft,
  SignalCellularAltRounded,
  NetworkCellOutlined,
  Battery30Rounded,
  Wifi,
} from '@material-ui/icons'
import classNames from 'classnames'
import React, { Fragment, ReactElement } from 'react'
import styles from './iphoneView.module.css'

interface IphoneViewProps {
  screenorientation: 'portrait' | 'landscape'
  title: string
  toolbarType?: 'light' | 'dark'
  actionIcon?: ReactElement
}
const IphoneView: React.FC<IphoneViewProps> = ({
  screenorientation,
  title,
  toolbarType = 'dark',
  actionIcon,
  children,
}) => {
  const currentTime: CallableFunction = () => {
    const today = new Date()
    return today.getHours() + ':' + today.getMinutes()
  }
  return (
    <Fragment>
      <div
        className={
          screenorientation == 'portrait'
            ? styles.orientation_portrait
            : styles.orientation_landscape
        }
      >
        <div className={styles.iphone_mobile}>
          <div className={styles.screen}>
            <div
              className={classNames(
                styles.iphone_header,
                toolbarType == 'dark' ? styles.dark_header : styles.light_header
              )}
            >
              <div className="info_bar flex justify-between items-center">
                <div className="flex-grow-0 text-xs">{currentTime()}</div>
                <div className="flex-grow-0">
                  <SignalCellularAltRounded
                    className="mr-1"
                    style={{ width: 16 }}
                  ></SignalCellularAltRounded>
                  <Wifi style={{ width: 16 }} className="mr-1"></Wifi>
                  <Battery30Rounded
                    style={{ width: 16, rotate: '90deg' }}
                  ></Battery30Rounded>
                </div>
              </div>
              <div className={styles.toolbar}>
                <div className={styles.toolbar_back}>
                  <ChevronLeft></ChevronLeft> Back
                </div>
                <div className={styles.toolbar_title}>
                  <div className={styles.toolbar_title_text}>{title}</div>
                </div>
                <div className="absolute right-4">{actionIcon}</div>
              </div>
            </div>
            <div className={classNames(styles.iphone_scaffold, 'no-scrollbar')}>
              {children}
            </div>
          </div>
          <div className={styles.home_button}></div>
          <div className={styles.inner}></div>
        </div>
      </div>
    </Fragment>
  )
}

export default IphoneView
