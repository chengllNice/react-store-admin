
import historyRecord from '@/views/mainContent/historyRecord'

import historyRecordDeleteUserList from '@/views/mainContent/historyRecord/deleteUserList'
import historyRecordDeleteAdminUserList from '@/views/mainContent/historyRecord/deleteAdminUserList'

export default {
  path: '/historyRecord',
  component: historyRecord,
  exact: true,
  children: [
    {
      path: '/historyRecord/deleteUser',
      component: historyRecordDeleteUserList,
      exact: true,
    },
    {
      path: '/historyRecord/deleteAdminUser',
      component: historyRecordDeleteAdminUserList,
      exact: true,
    },
  ]
}
