import { PaginationMeta } from '@/types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import _ from 'underscore'

const DataTableStatesHook = () => {
  const Routers = useRouter()
  const [items, setItems] = useState(
    !_.isEmpty(Routers?.query?.items) ? Number(Routers.query.items) : 10
  )
  const [currentPage, setCurrentPage] = useState(
    !_.isEmpty(Routers?.query?.page) ? String(Routers.query.page) : '1'
  )
  const [search, setSearch] = useState(
    !_.isEmpty(Routers?.query?.search) ? String(Routers.query.search) : ''
  )
  const [paginations, setPagination] = useState<PaginationMeta | null>(null)
  return {
    items,
    setItems,
    currentPage,
    setCurrentPage,
    search,
    setSearch,
    paginations,
    setPagination,
  }
}

export default DataTableStatesHook
