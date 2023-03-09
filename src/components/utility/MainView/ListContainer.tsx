import React, { useEffect, useState } from "react";
import _ from "underscore";
import styles from "./index.module.css";
import Button from "@/components/Widgets/Button";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalStates,
} from "@/components/Widgets/Modal";
import classNames from "classnames";
import SearchTemplate from "./SearchTemplate";
import { useRouter } from "next/router";
import DataTableStatesHook from "@/components/Widgets/DataTable/dataTableStates";
import {
  jobsiteDetails,
  jobsiteRecipientsList,
} from "@/components/types/jobsiteManagerType";
import { CommonStatesHook } from "@/components/lib/common";
import { docketBankqueryParams } from "@/components/types/common";
import { JobsiteListData } from "@/components/__mocks__/JobsiteListData";
import JobSiteCardSkeleton from "@/components/Widgets/Loader/Skeleton/Utilities/Jobsite/jobsiteCardSkeleton";
import Card from "./Card";
import { Pagination } from "@/components/Widgets/DataTable";
import { PaginationMeta } from "@/components/types/paginationType";
import { showSucessToast } from "@/components/lib/customToast";
const ListContainer = () => {
  const [getJobsiteCardList, setJobsiteCardList] = useState<jobsiteDetails[]>(
    []
  );
  const [error, setError] = useState<{ string: [string] } | null>(null);
  const [selectedRecipient, setSelectedRecipient] =
    useState<jobsiteRecipientsList | null>(null);
  const [getActiveLabel] = useState("");
  const {
    currentPage,
    paginations,
    search,
    setCurrentPage,
    setPagination,
    setSearch,
  } = DataTableStatesHook();
  const Routers = useRouter();
  const [items, setItems] = useState(
    !_.isEmpty(Routers?.query?.items) ? Number(Routers.query.items) : 12
  );
  const { modalLoading, setModalLoading, setShowModal, showModal } =
    ModalStates();
  const { loading, setLoading } = CommonStatesHook();
  const AddJobsite = async (value: any) => {
    setModalLoading(true);
    const dataToStore: FormData = new FormData();
    Object.keys(value).map((elementKey) => {
      if (elementKey === "recipients") {
        for (let i = 0; i < value[elementKey].length; i++) {
          dataToStore.append("recipients[]", value[elementKey][i]);
        }
      } else {
        dataToStore.append(elementKey, value[elementKey]);
      }
    });

    try {
      // const response = JobsiteListData[]
      const newJobsite: jobsiteDetails[] = [
        // JobsiteListData.data,
        ...getJobsiteCardList!,
      ];
      const paginationMetaData: PaginationMeta = { ...paginations! };
      paginationMetaData.total = paginationMetaData.total + 1;
      paginationMetaData.to = (paginationMetaData.to as number) + 1;
      setPagination(paginationMetaData);
      setJobsiteCardList(newJobsite);
      showSucessToast("New Jobsite Added");
      setShowModal("");
      setError(null);
    } catch (err) {}
    setModalLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    const jobsiteApi = async () => {
      try {
        const queryParams: docketBankqueryParams = {
          page: currentPage,
          items: items,
          search: search,
          tag: getActiveLabel,
        };
        // const response = await jobsiteManagerApi.get(queryParams);
        // const response =
        setJobsiteCardList(JobsiteListData?.data!);
        setPagination(JobsiteListData.meta);
        setLoading(false);
      } catch (err) {
        console.log("arror");
        // let message;
        // if (axios.isAxiosError(err)) {
        //   message = err.response?.data?.message;
        // }
      }
    };
    jobsiteApi();
  }, [items, currentPage, search, setPagination]);
  console.log(setJobsiteCardList, "jobsitecardlist");
  return (
    <div className={classNames(`${styles["JobSitewrapper"]}`)}>
      <div className={classNames(`${styles["wrapperHeader"]}`)}>
        <div className="float-right">
          <div className="inline-block w-32">
            <Button
              value={"Add New"}
              className="hover:text-white border h-8 border-gray-400 button px-3 py-1.5 mr-1 w-full text-xs hover:bg-rt-base hover:text-white;"
              onClick={() => {
                setShowModal("AddJobsiteModal");
              }}
            />
          </div>
          <div className="inline-block">
            <SearchTemplate
              title={""}
              items={items}
              search={search}
              onSearch={(value) => {
                setSearch(value), setCurrentPage("1");
              }}
              onChangeItem={(item) => {
                setItems(item);
              }}
            />
          </div>
        </div>
      </div>
      <div className={classNames(`${styles["card"]} mb-6`)}>
        {loading ? (
          <JobSiteCardSkeleton />
        ) : (
          getJobsiteCardList?.map((item) => {
            return <Card card={item} key={item.id}></Card>;
          })
        )}
      </div>
      <Pagination
        paginationData={paginations}
        onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
      />
      <Modal
        loading={modalLoading}
        isShown={showModal == "AddJobsiteModal"}
        submit={(value) => {
          AddJobsite(value);
        }}
      >
        <ModalHeader
          title=" New Job Site/Location"
          logo={""}
          hide={(status) => {
            setShowModal(status), setError(null);
          }}
        ></ModalHeader>
        <ModalBody>
          {/* <AddNewJobsite error={error!} selectedRecipient={selectedRecipient} /> */}
        </ModalBody>
        <ModalFooter
          hide={(status) => {
            setShowModal(status), setError(null);
          }}
          submitButtonClass={"bg-green-800 "}
          submitButtonText={"Add New"}
        />
      </Modal>
    </div>
  );
};

export default ListContainer;
