import React, { Fragment, ReactElement } from "react";
import Link from "next/link";
import classNames from "classnames";

export interface tabBarHeaderProps {
  name: string;
  link: string;
  isShow?: boolean;
  active?: boolean;
  type: string;
}

interface tabBarProps {
  childern?: ReactElement;
  tabBarHeader: Array<tabBarHeaderProps>;
  className?: string;
  selectStatus?: string;
  isPage?: boolean;
  onClickTabBar: (status: string) => void;
}

const TabBar: React.FC<tabBarProps> = ({
  children,
  tabBarHeader,
  className,
  selectStatus,
  isPage,
  onClickTabBar,
}) => {
  return (
    <div
      className={classNames(
        `flex items-center overflow-x-auto ${
          className ? className : "bg-white"
        }`
      )}
    >
      <div className="flex-auto">
        <ul className="flex ">
          {tabBarHeader.map((items, i) => {
            return isPage ? (
              <Link href={items.link} key={i} legacyBehavior>
                <a>
                  <li
                    className={classNames(
                      `px-4 py-4 text-base font-semibold hover:text-rt-base  focus:outline-none cursor-pointer`,
                      {
                        "border-b-4 border-rt-base text-rt-base ": items.active,
                      }
                    )}
                  >
                    {items.name}
                  </li>
                </a>
              </Link>
            ) : (
              <button
                key={i}
                type="button"
                onClick={() => onClickTabBar(items.type)}
              >
                <li
                  className={classNames(
                    `px-4 py-4 text-base font-medium hover:text-rt-base focus:outline-none cursor-pointer`,
                    {
                      "border-b-4 border-rt-base  ":
                        items.type === selectStatus,
                    }
                  )}
                >
                  {items.name}
                </li>
              </button>
            );
          })}
        </ul>
      </div>
      <div className="flex-initial px-4 ">
        <Fragment>{children}</Fragment>
      </div>
    </div>
  );
};

export default TabBar;
