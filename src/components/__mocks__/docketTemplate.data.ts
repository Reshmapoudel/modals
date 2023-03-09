import { DocketTemplateList, PaginationMeta, Type } from '@/types'

export const DocketTemplateMockData: {
  data: DocketTemplateList[]
  meta: PaginationMeta
} = {
  data: [
    // {
    //   id: 2656,
    //   docket_folder_assign: 'string',
    //   title: 'demo templates data',
    //   invoiceable: true,
    //   docket_approval_type: 'DEFAULT_APPROVAL',
    //   timer_attachement: 'NO',
    //   xero_timesheet: 'NO',
    //   user_id: 18,
    //   is_archive: false,
    //   prefix: 'Doc',
    //   hide_prefix: false,
    //   is_docket_number: false,
    //   docket_id_label: 'Docket ID',
    //   default_subject: 'You`ve Got a Docket',
    //   company_id: 1,
    //   created_at: '2021-12-20T07:12:53.000000Z',
    //   updated_at: '2021-12-21T04:29:39.000000Z',
    //   assigned_dockets_count: 0,
    //   user_info: {
    //     id: 18,
    //     first_name: 'Dileep',
    //     last_name: 'K. Chaudhary',
    //     email: 'mail@dileep.com.np',
    //     image:
    //       'http://127.0.0.1:8000/files/profile/0c539cbf-40c7-48d4-8f4e-74dec742835a1623134767-0.jpg',
    //     receive_docket_copy: 0,
    //   },
    //   folder: 'Not assigned yet.',
    // },
    // {
    //   id: 2655,
    //   docket_folder_assign: 'string',
    //   title: 'sdsdffw',
    //   invoiceable: true,
    //   docket_approval_type: 'DEFAULT_APPROVAL',
    //   timer_attachement: 'NO',
    //   xero_timesheet: 'NO',
    //   user_id: 18,
    //   is_archive: false,
    //   prefix: 'Doc',
    //   hide_prefix: false,
    //   is_docket_number: false,
    //   docket_id_label: 'Docket ID',
    //   default_subject: 'You`ve Got a Docket',
    //   company_id: 1,
    //   created_at: '2021-11-29T05:45:34.000000Z',
    //   updated_at: '2021-12-17T08:14:43.000000Z',
    //   assigned_dockets_count: 0,
    //   user_info: {
    //     id: 18,
    //     first_name: 'Dileep',
    //     last_name: 'K. Chaudhary',
    //     email: 'mail@dileep.com.np',
    //     image:
    //       'http://127.0.0.1:8000/files/profile/0c539cbf-40c7-48d4-8f4e-74dec742835a1623134767-0.jpg',
    //     receive_docket_copy: 0,
    //   },
    //   folder: 'Not assigned yet.',
    // },
    // {
    //   id: 2654,
    //   title: 'test 122222',
    //   docket_folder_assign: 'string',
    //   invoiceable: true,
    //   docket_approval_type: 'DEFAULT_APPROVAL',
    //   timer_attachement: 'NO',
    //   xero_timesheet: 'NO',
    //   user_id: 18,
    //   is_archive: false,
    //   prefix: 'Doc',
    //   hide_prefix: false,
    //   is_docket_number: false,
    //   docket_id_label: 'Docket ID',
    //   default_subject: 'You`ve Got a Docket',
    //   company_id: 1,
    //   created_at: '2021-11-29T04:13:21.000000Z',
    //   updated_at: '2021-11-29T05:52:32.000000Z',
    //   assigned_dockets_count: 0,
    //   user_info: {
    //     id: 18,
    //     first_name: 'Dileep',
    //     last_name: 'K. Chaudhary',
    //     email: 'mail@dileep.com.np',
    //     image:
    //       'http://127.0.0.1:8000/files/profile/0c539cbf-40c7-48d4-8f4e-74dec742835a1623134767-0.jpg',
    //     receive_docket_copy: 0,
    //   },
    //   folder: 'Not assigned yet.',
    // },
    // {
    //   id: 2653,
    //   docket_folder_assign: 'string',
    //   title: 'sds',
    //   invoiceable: true,
    //   docket_approval_type: 'DEFAULT_APPROVAL',
    //   timer_attachement: 'NO',
    //   xero_timesheet: 'NO',
    //   user_id: 18,
    //   is_archive: false,
    //   prefix: 'Doc',
    //   hide_prefix: false,
    //   is_docket_number: false,
    //   docket_id_label: 'Docket ID',
    //   default_subject: 'You`ve Got a Docket',
    //   company_id: 1,
    //   created_at: '2021-11-28T17:44:14.000000Z',
    //   updated_at: '2021-11-28T17:44:14.000000Z',
    //   assigned_dockets_count: 0,
    //   user_info: {
    //     id: 18,
    //     first_name: 'Dileep',
    //     last_name: 'K. Chaudhary',
    //     email: 'mail@dileep.com.np',
    //     image:
    //       'http://127.0.0.1:8000/files/profile/0c539cbf-40c7-48d4-8f4e-74dec742835a1623134767-0.jpg',
    //     receive_docket_copy: 0,
    //   },
    //   folder: 'Not assigned yet.',
    // },
    // {
    //   id: 2652,
    //   title: 'ddsf',
    //   docket_folder_assign: 'string',
    //   invoiceable: true,
    //   docket_approval_type: 'DEFAULT_APPROVAL',
    //   timer_attachement: 'NO',
    //   xero_timesheet: 'NO',
    //   user_id: 18,
    //   is_archive: false,
    //   prefix: 'Doc',
    //   hide_prefix: false,
    //   is_docket_number: false,
    //   docket_id_label: 'Docket ID',
    //   default_subject: 'You`ve Got a Docket',
    //   company_id: 1,
    //   created_at: '2021-11-28T17:43:31.000000Z',
    //   updated_at: '2021-11-28T17:43:32.000000Z',
    //   assigned_dockets_count: 0,
    //   user_info: {
    //     id: 18,
    //     first_name: 'Dileep',
    //     last_name: 'K. Chaudhary',
    //     email: 'mail@dileep.com.np',
    //     image:
    //       'http://127.0.0.1:8000/files/profile/0c539cbf-40c7-48d4-8f4e-74dec742835a1623134767-0.jpg',
    //     receive_docket_copy: 0,
    //   },
    //   folder: 'Not assigned yet.',
    // },
    // {
    //   id: 2651,
    //   title: 'sdfsdf',
    //   docket_folder_assign: 'string',
    //   invoiceable: true,
    //   docket_approval_type: 'DEFAULT_APPROVAL',
    //   timer_attachement: 'NO',
    //   xero_timesheet: 'NO',
    //   user_id: 18,
    //   is_archive: false,
    //   prefix: 'Doc',
    //   hide_prefix: false,
    //   is_docket_number: false,
    //   docket_id_label: 'Docket ID',
    //   default_subject: 'You`ve Got a Docket',
    //   company_id: 1,
    //   created_at: '2021-11-27T17:02:37.000000Z',
    //   updated_at: '2021-11-28T09:56:27.000000Z',
    //   assigned_dockets_count: 0,
    //   user_info: {
    //     id: 18,
    //     first_name: 'Dileep',
    //     last_name: 'K. Chaudhary',
    //     email: 'mail@dileep.com.np',
    //     image:
    //       'http://127.0.0.1:8000/files/profile/0c539cbf-40c7-48d4-8f4e-74dec742835a1623134767-0.jpg',
    //     receive_docket_copy: 0,
    //   },
    //   folder: 'Not assigned yet.',
    // },
    // {
    //   id: 2650,
    //   title: 'assfsdf',
    //   docket_folder_assign: 'string',
    //   invoiceable: true,
    //   docket_approval_type: 'DEFAULT_APPROVAL',
    //   timer_attachement: 'NO',
    //   xero_timesheet: 'NO',
    //   user_id: 18,
    //   is_archive: false,
    //   prefix: 'Doc',
    //   hide_prefix: false,
    //   is_docket_number: false,
    //   docket_id_label: 'Docket ID',
    //   default_subject: 'You`ve Got a Docket',
    //   company_id: 1,
    //   created_at: '2021-11-27T17:01:28.000000Z',
    //   updated_at: '2021-11-27T17:01:28.000000Z',
    //   assigned_dockets_count: 0,
    //   user_info: {
    //     id: 18,
    //     first_name: 'Dileep',
    //     last_name: 'K. Chaudhary',
    //     email: 'mail@dileep.com.np',
    //     image:
    //       'http://127.0.0.1:8000/files/profile/0c539cbf-40c7-48d4-8f4e-74dec742835a1623134767-0.jpg',
    //     receive_docket_copy: 0,
    //   },
    //   folder: 'Not assigned yet.',
    // },
    // {
    //   id: 2649,
    //   title: 'test create docket',
    //   docket_folder_assign: 'string',
    //   invoiceable: true,
    //   docket_approval_type: 'DEFAULT_APPROVAL',
    //   timer_attachement: 'NO',
    //   xero_timesheet: 'NO',
    //   user_id: 18,
    //   is_archive: false,
    //   prefix: 'Doc',
    //   hide_prefix: false,
    //   is_docket_number: false,
    //   docket_id_label: 'Docket ID',
    //   default_subject: 'You`ve Got a Docket',
    //   company_id: 1,
    //   created_at: '2021-11-27T16:14:08.000000Z',
    //   updated_at: '2021-11-27T16:48:11.000000Z',
    //   assigned_dockets_count: 0,
    //   user_info: {
    //     id: 18,
    //     first_name: 'Dileep',
    //     last_name: 'K. Chaudhary',
    //     email: 'mail@dileep.com.np',
    //     image:
    //       'http://127.0.0.1:8000/files/profile/0c539cbf-40c7-48d4-8f4e-74dec742835a1623134767-0.jpg',
    //     receive_docket_copy: 0,
    //   },
    //   folder: 'Not assigned yet.',
    // },
    // {
    //   id: 2648,
    //   title: '',
    //   docket_folder_assign: 'string',
    //   invoiceable: true,
    //   docket_approval_type: 'DEFAULT_APPROVAL',
    //   timer_attachement: 'NO',
    //   xero_timesheet: 'NO',
    //   user_id: 18,
    //   is_archive: false,
    //   prefix: 'Doc',
    //   hide_prefix: false,
    //   is_docket_number: false,
    //   docket_id_label: 'Docket ID',
    //   default_subject: 'You`ve Got a Docket',
    //   company_id: 1,
    //   created_at: '2021-11-22T13:42:30.000000Z',
    //   updated_at: '2021-11-22T13:42:30.000000Z',
    //   assigned_dockets_count: 0,
    //   user_info: {
    //     id: 18,
    //     first_name: 'Dileep',
    //     last_name: 'K. Chaudhary',
    //     email: 'mail@dileep.com.np',
    //     image:
    //       'http://127.0.0.1:8000/files/profile/0c539cbf-40c7-48d4-8f4e-74dec742835a1623134767-0.jpg',
    //     receive_docket_copy: 0,
    //   },
    //   folder: 'Not assigned yet.',
    // },
    // {
    //   id: 2647,
    //   title: '',
    //   docket_folder_assign: 'string',
    //   invoiceable: true,
    //   docket_approval_type: 'DEFAULT_APPROVAL',
    //   timer_attachement: 'NO',
    //   xero_timesheet: 'NO',
    //   user_id: 18,
    //   is_archive: false,
    //   prefix: 'Doc',
    //   hide_prefix: false,
    //   is_docket_number: false,
    //   docket_id_label: 'Docket ID',
    //   default_subject: 'You`ve Got a Docket',
    //   company_id: 1,
    //   created_at: '2021-11-22T13:34:45.000000Z',
    //   updated_at: '2021-11-22T13:34:45.000000Z',
    //   assigned_dockets_count: 0,
    //   user_info: {
    //     id: 18,
    //     first_name: 'Dileep',
    //     last_name: 'K. Chaudhary',
    //     email: 'mail@dileep.com.np',
    //     image:
    //       'http://127.0.0.1:8000/files/profile/0c539cbf-40c7-48d4-8f4e-74dec742835a1623134767-0.jpg',
    //     receive_docket_copy: 0,
    //   },
    //   folder: 'Not assigned yet.',
    // },
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
