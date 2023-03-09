import { Lables, PaginationMeta } from '@/types'

export const InvoiceLabelsMockTemplate: {
  data: Lables[]
  meta: PaginationMeta
} = {
  data: [
    {
      id: 1,
      title: 'Running',
      color: '#F4330A',
      icon: '/running_icon',
    },
    {
      id: 2,
      title: 'Marked',
      color: '#aabbcc',
    },
    {
      id: 3,
      title: 'Folded',
      color: '#000000',
    },
    {
      id: 4,
      title: 'some random title',
      color: '#1ff564',
    },
    {
      id: 5,
      title: 'Marked',
      color: '#62b11',
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
        url: '?items=10&page=2',
        label: '2',
        active: false,
      },
      {
        url: '?items=10&page=3',
        label: '3',
        active: false,
      },
      {
        url: '?items=10&page=4',
        label: '4',
        active: false,
      },
      {
        url: '?items=10&page=5',
        label: '5',
        active: false,
      },
      {
        url: '?items=10&page=6',
        label: '6',
        active: false,
      },
      {
        url: '?items=10&page=7',
        label: '7',
        active: false,
      },
      {
        url: '?items=10&page=8',
        label: '8',
        active: false,
      },
      {
        url: '?items=10&page=9',
        label: '9',
        active: false,
      },
      {
        url: '?items=10&page=10',
        label: '10',
        active: false,
      },
      {
        url: null,
        label: '...',
        active: false,
      },
      {
        url: '?items=10&page=21',
        label: '21',
        active: false,
      },
      {
        url: '?items=10&page=22',
        label: '22',
        active: false,
      },
      {
        url: '?items=10&page=2',
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
