import MainLayout from "@/components/Layouts/MainLayout";
import BreadCrumbHeader from "@/components/Widgets/BreadCrumbHeader";
import ListContainer from "@/components/utility/MainView/ListContainer";
import React from "react";

class JobSite extends React.Component {
  render() {
    return (
      <MainLayout
        title="Job Site Manager"
        description="RecordTime Job Site Manager page"
      >
        <BreadCrumbHeader title="Job Site Manager"></BreadCrumbHeader>
        <ListContainer />
      </MainLayout>
    );
  }
}
export default JobSite;
