import { Plant, PaginationMeta } from '@/types'
export const plantManagmentMockData: {
  data: Plant[]
  meta: PaginationMeta
} = {
  data: [
    {
      id: 1,
      company_id: 1,
      name: 'Roshani',
      registration: 'abc',
      image:
        'https://www.recordtimeapp.com.au/backend/files/machine_images/plant1616745243-0.jpg',
      original_plant: 'kkk',
      description: 'gghh',
      make: 'bb',
      model: 'stbhbjring',
      year: 'strjing',
      registration_expire: '2022-07-12',
      purchase_date: '2022-07-12',
      remaining_days: '1 days',
      color: 'string',
      action: 'string',
    },
    {
      id: 1,
      company_id: 1,
      name: 'Roshani',
      registration: 'abc',
      image:
        'https://www.recordtimeapp.com.au/backend/files/machine_images/plant1616745243-0.jpg',
      original_plant: 'kkk',
      description: 'gghh',
      make: 'bb',
      model: 'stbhbjring',
      year: 'strjing',
      registration_expire: '2022-07-12',
      purchase_date: '2022-07-12',
      remaining_days: '2 days',
      color: 'string',
      action: 'string',
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
