import { PaginationMeta } from '@/types'
import { DocketLabel } from '@/types/docketLabelType'

export const DocketLabelMockData: {
  data: DocketLabel[]
  meta: PaginationMeta
} = {
  data: [
    {
      id: 1,
      title: 'office',
      color: '#000',
      icon: '',
      action: '',
    },

    {
      id: 2,
      title: 'label',
      color: '#ff0000',
      icon: '',
      action: '',
    },
    {
      id: 3,
      title: 'Day-sheet planner',
      color: '#00ff00',
      icon: '',
      action: '',
    },
  ],
  meta: {
    current_page: 1,
    from: 1,
    last_page: 22,
    links: [
      {
        url: null,
        label: 'Previous',
        active: false,
      },
      {
        url: '?items=10&page=1',
        label: '1',
        active: true,
      },
      {
        url: null,
        label: 'Next',
        active: false,
      },
    ],
    path: '',
    per_page: '10',
    to: 10,
    total: 217,
  },
}
