import React, { Fragment, ReactNode } from "react";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import { publicRoutes } from "@/../../src/components/lib/common";
// import Header from '@/components/Modules/Header'
// import Navbar from '@/components/Modules/Navbar'
// import Footer from '@/components/Modules/Footer'
import { motion } from "framer-motion";
// import { MainLayoutVarient } from '@/variants/mainLayout'
import { ToastContainer } from "react-toastify";
import ReactTooltip from "react-tooltip";
import router from "next/router";
// import XeroConnStatus from '../Modules/Profile/xeroConnStatus'
// import Notification from '../Modules/Notification'
import classNames from "classnames";
import Link from "next/link";

type Props = {
  children: ReactNode;
  title: string;
  description: string;
};

if (typeof window !== "undefined") {
  NProgress.configure({
    easing: "linear",
    positionUsing: "",
    trickle: true,
    trickleSpeed: 200,
    showSpinner: false,
    barSelector: '[role="bar"]',
    spinnerSelector: '[role="spinner"]',
    parent: "body",
    template:
      '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
  });

  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });
}

const MainLayout: React.FC<Props> = ({ children, title, description }) => {
  const { pathname } = useRouter();
  const authRoute = publicRoutes.includes(pathname);
  return (
    <div>
      <Head>
        <meta name="description" content={description} />
        <title>RecordTime | {title}</title>
        <meta charSet="utf-8" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        ></link>
      </Head>

      {/* <Header></Header>
      {!authRoute && <Navbar></Navbar>} */}
      {/* <div className="rtcontainer min-h-min mb-4 pt-2">
        <div className={classNames(`rounded-md bg-red-500 mt-36 p-3 text-sm `)}>
          <div className=" pt-3 md:pt-0 ">
            <div className="inline-block mr-4 md:-top-8 ">
              <div className="inline-block pb-1 text-white">
                <span className="block p-1 ">
                  Beta Version. Please note this dashboard contains known bugs
                  and certain sections are not yet active. We appreciate your
                  patience, while we resolve these and value any feedback you
                  may have.{" "}
                  <Link href={"https://www.recordtimeapp.com.au/backend"}>
                    <a className="underline">Click here</a>
                  </Link>{" "}
                  to return to the previous dashboard.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <motion.div
        // variants={MainLayoutVarient}
        // initial="hidden"
        // animate="visible"
        // exit="exit"
        className=" rtcontainer"
      >
        {children}
      </motion.div>
      <ToastContainer />
      {/* <Footer></Footer>
      {pathname.includes("dashboard") ? <XeroConnStatus /> : <Fragment />} */}
    </div>
  );
};

export default MainLayout;
