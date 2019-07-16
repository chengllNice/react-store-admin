
import authManage from '@/views/mainContent/authManage'

import authManageRole from '@/views/mainContent/authManage/roleList'

export default {
  path: '/authManage',
  component: authManage,
  exact: true,
  children: [
    {
      path: '/authManage/role',
      component: authManageRole,
      exact: true,
    },
  ]
}
