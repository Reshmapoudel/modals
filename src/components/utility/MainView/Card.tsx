import Image from "next/image";
import React, { FC, Fragment } from "react";
import cardImg from "../../../public/images/cardImg.jpg";
import jobtitle from "../../../public/images/jobtitle.jpeg";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { jobsiteDetails } from "@/components/types/jobsiteManagerType";
// import { CustomDate } from '@/lib/common'
import Link from "next/link";
import OptimizedProfileImageWithFallback from "@/components/Widgets/imageOptimization";

export type cardProps = {
  card: jobsiteDetails;
};
const Card: FC<cardProps> = ({ card }) => {
  return (
    <Fragment>
      <Link
        // href={`/dashboard/utilities/jobsite/view/${card.id}`}
        href={`/jobsite/view/${card.id}`}
        legacyBehavior
      >
        <a className="border border-gray-200 rounded-md overflow-hidden transition-all hover:shadow-md hover:transition-all">
          {card?.file && (
            <OptimizedProfileImageWithFallback
              src={card?.file!}
              alt={"img"}
              width={"500"}
              height={250}
            />
          )}
          <div className="pt-2 pb-4 pl-4 pr-4">
            <h1 className="font-medium text-base text-left mb-1">
              {card.job_site}
            </h1>
            <div className="flex items-center text-gray-500 gap-1 text-sm">
              <QueryBuilderIcon fontSize="inherit" />

              <span>{card?.start_time}</span>
              <span>-</span>
              <span>{card?.end_time}</span>
            </div>
          </div>
        </a>
      </Link>
    </Fragment>
  );
};

export default Card;
