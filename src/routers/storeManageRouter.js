
import storeManage from '@/views/mainContent/storeManage'
import storeManageEcharts from '@/views/mainContent/storeManage/echarts'
// import storeManageGrade from '@/views/mainContent/storeManage/grade'

import storeManageList from '@/views/mainContent/storeManage/list'
import storeManageListNew from '@/views/mainContent/storeManage/list/listNew'
import storeManageListDetail from '@/views/mainContent/storeManage/list/listDetailInfo'

// import storeManageMemer from '@/views/mainContent/storeManage/member'

export default {
  path: '/storeManage',
  component: storeManage,
  exact: true,
  children: [
    {
      path: '/storeManage/echarts',
      component: storeManageEcharts,
      exact: true,
    },
    {
      path: '/storeManage/list',
      component: storeManageList,
      exact: true,
    },
    {
      path: '/storeManage/list/new',
      component: storeManageListNew,
      exact: true,
    },
    {
      path: '/storeManage/list/detail',
      component: storeManageListDetail,
      exact: true,
    },
    // {
    //   path: '/storeManage/grade',
    //   component: storeManageGrade,
    //   exact: true,
    // },
    // {
    //   path: '/storeManage/member',
    //   component: storeManageMemer,
    //   exact: true,
    // }
  ]
}
