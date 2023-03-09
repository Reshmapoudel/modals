import classNames from "classnames";
import React, { useEffect, useState } from "react";
import styles from "./view.module.css";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import JobSiteHeaderViewSkeleton from "@/components/Widgets/Loader/Skeleton/Utilities/Jobsite/jobSiteHeaderViewSkeleton";
import { CommonStatesHook } from "@/components/lib/common";
import { jobsiteDetails } from "@/components/types/jobsiteManagerType";
import Button from "@/components/Widgets/Button";
import { useRouter } from "next/router";
import { ModalStates } from "@/components/Widgets/Modal";
import { CloudDownload, Visibility } from "@material-ui/icons";
import OptimizedProfileImageWithFallback from "@/components/Widgets/imageOptimization";
import QRCode from "react-qr-code";
import { JobsiteListData } from "@/components/__mocks__/JobsiteListData";
import dynamic from "next/dynamic";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
const Map = dynamic(() => import("@/components/Widgets/Map/index"), {
  ssr: false,
});

const ViewDetails = () => {
  const position = [51.505, -0.09];
  const [getJobsiteManagerView, setJobsiteManagerView] = useState<
    jobsiteDetails[] | null
  >(null);
  const { loading, setLoading } = CommonStatesHook();
  const router = useRouter();
  const { modalLoading, setModalLoading, setShowModal, showModal } =
    ModalStates();
  useEffect(() => {
    const id = Number(router.query.id);
    const jobsiteViewApi = async () => {
      try {
        const response = JobsiteListData;
        setJobsiteManagerView(JobsiteListData.data);
        setLoading(false);
      } catch (err) {}
    };
    setLoading(true);
    jobsiteViewApi();
  }, [setLoading]);
  return (
    <div className={classNames(`${styles["JobSitewrapper"]}`)}>
      {loading ? (
        <JobSiteHeaderViewSkeleton />
      ) : (
        // <>
        //   {getJobsiteManagerView?.map((i, index) => {
        //     return (
        //       <div className="bg-white p-4" key={index}>
        //         <div className="flex items-start justify-between w-full  flex-col sm:flex-row sm:items-center gap-4;">
        //           <div className="">
        //             <h1 className="text-xl font-normal">{i?.job_site}</h1>
        //             <div className="flex items-center gap-2 text-sm text-gray-500">
        //               <QueryBuilderIcon fontSize="inherit" />
        //               <span>
        //                 {i?.start_time} - {i?.end_time}
        //               </span>
        //             </div>
        //           </div>
        //           <div className="flex items-center gap-4 ">
        //             <Button
        //               type="button"
        //               value="Back"
        //               onClick={() => router.back()}
        //               className={classNames(
        //                 `${styles["whitebtn"]}`,
        //                 `rounded-3xl`
        //               )}
        //             />
        //             <Button
        //               value={"Edit"}
        //               className={classNames(`${styles["greenbtn"]}`)}
        //               onClick={() => {
        //                 setShowModal("EditJobsiteModel");
        //               }}
        //             />
        //           </div>
        //         </div>
        //         <div className="flex gap-4 w-full items-center h-52 pt-4 pb-1">
        //           <div className="overflow-hidden border rounded-md p-2   border-gray-200 h-full ">
        //             {i?.file && (
        //               <OptimizedProfileImageWithFallback
        //                 src={i?.file!}
        //                 alt={"img"}
        //                 width={600}
        //                 height={262}
        //               />
        //             )}
        //           </div>
        //           <div className="overflow-hidden border rounded-md p-2   border-gray-200 h-full w-full">
        //             {/* {i?.latitude !== undefined && (
        //         <Map
        //           lat={Number(i?.latitude) || 0}
        //           lng={Number(i?.longitude) || 0}
        //           useUserSearchLocation={false}
        //         />
        //       )} */}
        //           </div>
        //           <div className="rounded-md border-gray-200 relative  border  bg-white flex flex-col items-end h-full">
        //             <div className=" whitespace-nowrap p-2">
        //               <div className="flex text-sm text-gray-500 ">
        //                 <div>
        //                   <QRCode
        //                     level="M"
        //                     size={140}
        //                     // value={`${process.env.NEXT_PUBLIC_APP_DOMAIN}job-site-manager?lat=${i?.latitude}&long=${i?.longitude}&id=${i?.id}&site_name=${i?.job_site}`}
        //                     value={`https://www.recordtimeapp.com.au/backend/job-site-manager?id=${i?.id}&lat=${i?.latitude}&long=${i?.longitude}`}
        //                   />
        //                 </div>
        //               </div>
        //             </div>

        //             <button
        //               onClick={() => {
        //                 //   downloadQRCode(i!);
        //                 ("");
        //               }}
        //               className=" border-t border-gray-200 block w-full "
        //             >
        //               <CloudDownload
        //                 style={{
        //                   marginLeft: "10px",
        //                   color: "#55b3b9",
        //                 }}
        //               ></CloudDownload>
        //             </button>
        //           </div>
        //         </div>
        //       </div>
        //     );
        //   })}
        // </>
        <div className="bg-white p-4">
          <div className="flex items-start justify-between w-full  flex-col sm:flex-row sm:items-center gap-4;">
            <div className="">
              <h1 className="text-xl font-normal">Name</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <QueryBuilderIcon fontSize="inherit" />
                <span>11:6 - 12 </span>
              </div>
            </div>
            <div className="flex items-center gap-4 ">
              <Button
                type="button"
                value="Back"
                onClick={() => router.back()}
                className={classNames(`${styles["whitebtn"]}`, `rounded-3xl`)}
              />
              <Button
                value={"Edit"}
                className={classNames(`${styles["greenbtn"]}`)}
                onClick={() => {
                  setShowModal("EditJobsiteModel");
                }}
              />
            </div>
          </div>
          <div className="flex gap-4 w-full items-center h-52 pt-4 pb-1">
            <div className="overflow-hidden border rounded-md p-2   border-gray-200 h-full ">
              {/* {getJobsiteManagerView?.file && (
                <OptimizedProfileImageWithFallback
                  src={getJobsiteManagerView?.file!}
                  alt={"img"}
                  width={600}
                  height={262}
                />
              )} */}
              <OptimizedProfileImageWithFallback
                src={""}
                alt={"img"}
                width={600}
                height={262}
              />
            </div>
            <div className="overflow-hidden border rounded-md p-2   border-gray-200 h-full w-full">
              {/* {getJobsiteManagerView?.latitude !== undefined && (
                <Map
                  lat={Number(getJobsiteManagerView?.latitude) || 0}
                  lng={Number(getJobsiteManagerView?.longitude) || 0}
                  useUserSearchLocation={false}
                />
              )} */}
            </div>
            <div className="rounded-md border-gray-200 relative  border  bg-white flex flex-col items-end h-full">
              <div className=" whitespace-nowrap p-2">
                <div className="flex text-sm text-gray-500 ">
                  <div>
                    <QRCode
                      level="M"
                      size={140}
                      value="12545"
                      // value={`${process.env.NEXT_PUBLIC_APP_DOMAIN}job-site-manager?lat=${getJobsiteManagerView?.latitude}&long=${getJobsiteManagerView?.longitude}&id=${getJobsiteManagerView?.id}&site_name=${getJobsiteManagerView?.job_site}`}
                      //   value={`https://www.recordtimeapp.com.au/backend/job-site-manager?id=${getJobsiteManagerView?.id}&lat=${getJobsiteManagerView?.latitude}&long=${getJobsiteManagerView?.longitude}`}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  //   downloadQRCode(getJobsiteManagerView!);
                  ("");
                }}
                className=" border-t border-gray-200 block w-full "
              >
                <CloudDownload
                  style={{
                    marginLeft: "10px",
                    color: "#55b3b9",
                  }}
                ></CloudDownload>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full border h-60 z-10">
        <Map lat={20} lng={0.1} useUserSearchLocation={false} />
      </div>
    </div>
  );
};

export default ViewDetails;
