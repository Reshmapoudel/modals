import MainLayout from "@/components/Layouts/MainLayout";

import BreadCrumbHeader from "@/components/Widgets/BreadCrumbHeader";
import ViewDetails from "@/components/utility/MainView/View/ViewDetails";
import React from "react";

class index extends React.Component {
  render() {
    return (
      <MainLayout
        title="Job Site Manager"
        description="recordtime Job Site Manager page"
      >
        <BreadCrumbHeader title="Job Site Manager"></BreadCrumbHeader>
        <ViewDetails />
      </MainLayout>
    );
  }
}
export default index;
