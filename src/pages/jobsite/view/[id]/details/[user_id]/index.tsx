import MainLayout from '@/components/Layouts/MainLayout'
import { withAuth } from '@/components/Modules/Auth/route'
import JobSiteMainLayout from '@/components/Modules/JobSite'
import AllTime from '@/components/Modules/JobSite/View/alltime/AllTime'
import JobSiteView from '@/components/Modules/JobSite/View/JobSiteView'
import BreadCrumbHeader from '@/components/Widgets/BreadCrumbHeader'
import React from 'react'

class index extends React.Component {
  render() {
    return (
      <MainLayout
        title="Job Site Manager"
        description="Recordtime Job Site Manager page"
      >
        <BreadCrumbHeader title="Job Site Manager"></BreadCrumbHeader>
        <AllTime />
      </MainLayout>
    )
  }
}
export default withAuth(index)
