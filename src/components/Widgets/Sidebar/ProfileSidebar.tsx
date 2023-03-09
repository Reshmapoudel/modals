import {
  ArrowLeft,
  ArrowRightTwoTone,
  Close,
  ListOutlined,
} from "@material-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Button from "../Button";

interface ProfileSliderProps {
  toggleToSideBar(): void;
}
const ProfileSidebar: React.FC<ProfileSliderProps> = ({ toggleToSideBar }) => {
  const router = useRouter();

  const [navSettings, setNavSettings] = useState([
    {
      name: "My Subscription",
      link: "/dashboard/company/profile/subscription",
      active: false,
    },
    {
      name: "My Profile",
      link: "/dashboard/company/profile",
      active: false,
    },
    {
      name: "Docket Settings",
      link: "/dashboard/company/profile/docketSetting",
      active: false,
    },
    {
      name: "Invoice Setting",
      link: "/dashboard/company/profile/invoiceSetting",
      active: false,
    },
    // {
    //   name: 'Billing History',
    //   link: '/dashboard/company/profile/billingHistory',
    //   active: false,
    // },
    // {
    //   name: 'Xero Setting',
    //   link: '/dashboard/company/profile/xeroSetting',
    //   active: false,
    // },
    {
      name: "Date Setting",
      link: "/dashboard/company/profile/dateSettings",
      active: false,
    },
    {
      name: "Change Password",
      link: "/dashboard/company/profile/changePassword",
      active: false,
    },
  ]);

  const selectNavLink = () => {
    setNavSettings([
      ...navSettings.map((setting, idx) => {
        return { ...setting, active: setting.link == router.pathname };
      }),
    ]);
  };

  useEffect(() => {
    selectNavLink();
  }, []);

  const getSidebarContent = () => {
    return (
      <Fragment>
        <ul className="text-gray-600 ">
          {navSettings.map((setting, idx) => {
            return (
              <li
                key={idx}
                className={
                  setting.active
                    ? "bg-gray-100 border rounded-md "
                    : " " +
                      " bg-white border border-white rounded-md my-1 hover:bg-gray-100 hover:border hover:rounded-md"
                }
              >
                <Link href={setting.link} legacyBehavior>
                  <a className="grid grid-cols-6 py-2 pl-4 text-sm ">
                    <div className="inline-block col-start-1 col-end-5 mt-0.5">
                      {setting.name}
                    </div>
                    <ArrowRightTwoTone
                      className="object-right col-start-6 ml-3"
                      color={setting.active ? "primary" : "disabled"}
                    />
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  };
  return (
    <Fragment>
      <div className="block md:hidden ">
        <div className="z-20 w-full px-2 pb-2 overflow-hidden bg-white border-b-2 border-r-2 border-gray-100 rounded-sm">
          <div className={`relative pb-4 block ml-4 mt-2`}>
            <Button
              className="p-0.5 bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow "
              onClick={() => toggleToSideBar()}
              value={<ArrowLeft />}
            />
          </div>
          <div className="">{getSidebarContent()}</div>
        </div>
      </div>
      <div className="hidden pr-4 w-30 md:w-60 lg:w-80 sm:hidden md:block">
        {getSidebarContent()}
      </div>
    </Fragment>
  );
};

export default ProfileSidebar;
