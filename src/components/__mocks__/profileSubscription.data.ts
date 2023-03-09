export interface SubscriptionType {
  abn: string
  status: string
  since: string
  expiry_date: string
  max_user: number
  max_devices: number
  plan_details: string
}

export const fakeSubscriptionData: SubscriptionType = {
  abn: '07348923743498',
  status: 'Active',
  since: '10-May-2017',
  expiry_date: '06-Sep-2023',
  max_devices: 5,
  max_user: 5,
  plan_details: 'Record Time Subscription',
}
