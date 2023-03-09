import { FC, Fragment, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import {
  LocationOnSharp,
  MapTwoTone,
  MessageTwoTone,
  Pause,
  TimerSharp,
} from '@material-ui/icons'
import Button from '@/components/Widgets/Button'

import Image from 'next/dist/client/image'
import styles from 'components/Modules/Timer/index.module.css'
import classNames from 'classnames'
import Skeleton from 'react-loading-skeleton'

const Map = dynamic(() => import('@/components/Widgets/Map'), { ssr: false })

const ViewTimerSkeletonComponent: FC = () => {
  return (
    <div className="bg-white ">
      <h1 className="px-6 pt-6 text-lg font-bold text-rt-dark"> Timer Info</h1>
      <div className="h-1 mx-6 mt-2 bg-gray-200"></div>
      <div className="px-6 ">
        <div className="pt-4 ">
          <Skeleton height={150} width={150}></Skeleton>
          <br />
          <div className="pt-4 text-sm">
            <Skeleton height={15} width={150}></Skeleton>
            <br />
            <Skeleton height={15} width={100}></Skeleton>
            <br />
            <Skeleton height={15} width={200}></Skeleton>
            <h1>
              <b>
                <Skeleton height={15} width={30}></Skeleton>
              </b>

              <Skeleton height={15} width={100} className="ml-2"></Skeleton>
              <br />
            </h1>
          </div>
        </div>
        <div className="pt-4 ">
          <div className="flex flex-wrap content-center float-right pr-6 ">
            <Skeleton height={200} width={200} circle={true}></Skeleton>
          </div>
          <div className="flex-auto text-sm">
            <div className="pt-4">
              <h1 className="font-bold">
                {' '}
                <Skeleton height={15} width={120}></Skeleton>
              </h1>
              <a href="#">
                <Skeleton height={15} width={150}></Skeleton>{' '}
                <Skeleton height={15} width={150}></Skeleton>
              </a>
            </div>
            <div className="pt-4">
              <h1 className="font-bold">
                {' '}
                <Skeleton height={15} width={100}></Skeleton>
              </h1>
              <h1>
                {' '}
                <Skeleton height={15} width={60}></Skeleton>
              </h1>
            </div>
          </div>
          <div className="pt-4">
            <h1 className="text-sm font-bold ">
              {' '}
              <Skeleton height={15} width={120}></Skeleton>
            </h1>
            <div className="text-sm ">
              <h1
                className={classNames(
                  ` pr-1 text-sm inline-block ${styles['comma']}`
                )}
              >
                <Skeleton height={15} width={150}></Skeleton>
                <Skeleton height={15} width={150} className="ml-2"></Skeleton>
              </h1>
            </div>
            <div>
              <h1
                className={classNames(
                  ` pr-1 text-sm inline-block ${styles['comma']}`
                )}
              >
                <Skeleton height={15} width={150}></Skeleton>
              </h1>
            </div>
          </div>
        </div>

        <div className="pt-4 text-sm">
          <h1 className="font-bold">
            {' '}
            <Skeleton height={20} width={100}></Skeleton>
          </h1>
          <div className="w-full mt-2 " id="content">
            <Skeleton height={300}></Skeleton>
          </div>
        </div>

        <div className="py-6 pl-4 text-sm ">
          <div className="mb-4">
            {' '}
            <Skeleton height={20} width={150}></Skeleton>
          </div>

          <div className={classNames(`  ${styles['timeline']}`)}>
            <div className={classNames(` ${styles['timeline-item']}`)}>
              <div
                className={classNames(
                  ` rounded-full   flex items-center justify-center ${styles['icon']}`
                )}
              >
                <Skeleton height={53} width={53} circle={true}></Skeleton>
              </div>
              <div className="w-full rounded-xl">
                <Skeleton height={120} className="mb-2 ml-2"></Skeleton>
                <div className="clear-both"></div>
              </div>
            </div>
            <div className={classNames(` ${styles['timeline-item']}`)}>
              <div
                className={classNames(
                  ` rounded-full   flex items-center justify-center ${styles['icon']}`
                )}
              >
                <Skeleton height={53} width={53} circle={true}></Skeleton>
              </div>
              <div className="w-full rounded-xl">
                <Skeleton height={120} className="mb-2 ml-2"></Skeleton>
                <div className="clear-both"></div>
              </div>
            </div>
            <div className={classNames(` ${styles['timeline-item']}`)}>
              <div
                className={classNames(
                  ` rounded-full   flex items-center justify-center ${styles['icon']}`
                )}
              >
                <Skeleton height={53} width={53} circle={true}></Skeleton>
              </div>
              <div className="w-full rounded-xl">
                <Skeleton height={120} className="mb-2 ml-2"></Skeleton>
                <div className="clear-both"></div>
              </div>
            </div>
            <div className={classNames(` ${styles['timeline-item']}`)}>
              <div
                className={classNames(
                  ` rounded-full   flex items-center justify-center ${styles['icon']}`
                )}
              >
                <Skeleton height={53} width={53} circle={true}></Skeleton>
              </div>
              <div className="w-full rounded-xl">
                <Skeleton height={120} className="mb-2 ml-2"></Skeleton>
                <div className="clear-both"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ViewTimerSkeletonComponent
