import classNames from "classnames";
import Skeleton from "react-loading-skeleton";
import { Fragment } from "react";
import { PaginationMeta } from "@/components/types/paginationType";
import styles from "../style.module.css";
import Button from "../../Button";

interface PaginationProps {
  paginationData: PaginationMeta | null;
  onPageChange: (pageNumber: string) => void;
  wrapperPage?: string;
}
const Pagination: React.FC<PaginationProps> = ({
  paginationData,
  onPageChange,
  wrapperPage,
}) => {
  return (
    <div
      className={classNames(
        `${wrapperPage + " " + styles["pagination-container"]}`
      )}
    >
      <div className={classNames(`${styles["full-pagination"]}`)}>
        {paginationData ? (
          <Fragment>
            <div className={classNames(`${styles["right"]}`)}>
              <p>
                Showing <span>{paginationData?.from}</span> to{" "}
                <span>{paginationData?.to}</span> of{" "}
                <span>{paginationData?.total}</span> results
              </p>
            </div>

            <div className={classNames(`${styles["left"]}`)}>
              <nav aria-label="Pagination">
                {paginationData?.links.map((item: any, index: any) => {
                  return item.url ? (
                    <Button
                      aria-hidden="true"
                      key={index}
                      className={classNames(
                        `${styles["button"]}`,
                        item.active && `${styles["active"]}`
                      )}
                      loading={false}
                      value={
                        <span aria-hidden="true">
                          {" "}
                          {item.label.replace("&laquo; ", "")}
                        </span>
                      }
                      onClick={() =>
                        onPageChange(item.url?.split("=")[1] as string)
                      }
                    ></Button>
                  ) : item.label == "..." ? (
                    <span key={index}>...</span>
                  ) : (
                    <span key={index}>
                      {item.label.replace("&laquo; ", "")}
                    </span>
                  );
                })}
              </nav>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div>
              <Skeleton width={60} /> <Skeleton width={25} />{" "}
              <Skeleton width={25} /> <Skeleton width={25} />{" "}
              <Skeleton width={60} />{" "}
            </div>
            <div>
              <Skeleton width={80} height={35} />{" "}
              <Skeleton width={35} height={35} />{" "}
              <Skeleton width={35} height={35} />{" "}
              <Skeleton width={35} height={35} />{" "}
              <Skeleton width={35} height={35} />{" "}
              <Skeleton width={35} height={35} />{" "}
              <Skeleton width={35} height={35} />{" "}
              <Skeleton width={35} height={35} />{" "}
              <Skeleton width={35} height={35} />{" "}
              <Skeleton width={35} height={35} />{" "}
              <Skeleton width={35} height={35} />{" "}
              <Skeleton width={35} height={35} />{" "}
              <Skeleton width={80} height={35} />
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Pagination;
