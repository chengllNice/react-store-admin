
import userManage from '@/views/mainContent/userManage'
import userManageEcharts from '@/views/mainContent/userManage/echarts'
import userManageGrade from '@/views/mainContent/userManage/grade'

import userManageList from '@/views/mainContent/userManage/list'
import userManageListNew from '@/views/mainContent/userManage/list/listNew'
import userManageListDetail from '@/views/mainContent/userManage/list/listDetailInfo'

import userManageAdminList from '@/views/mainContent/userManage/adminList'
import userManageAdminListNew from '@/views/mainContent/userManage/adminList/listNew'
import userManageAdminListDetail from '@/views/mainContent/userManage/adminList/listDetailInfo'

import userManageMemer from '@/views/mainContent/userManage/member'

export default {
  path: '/userManage',
  component: userManage,
  exact: true,
  children: [
    {
      path: '/userManage/echarts',
      component: userManageEcharts,
      exact: true,
    },
    {
      path: '/userManage/list',
      component: userManageList,
      exact: true,
    },
    {
      path: '/userManage/list/new',
      component: userManageListNew,
      exact: true,
    },
    {
      path: '/userManage/list/detail',
      component: userManageListDetail,
      exact: true,
    },
    {
      path: '/userManage/admin',
      component: userManageAdminList,
      exact: true,
    },
    {
      path: '/userManage/admin/new',
      component: userManageAdminListNew,
      exact: true,
    },
    {
      path: '/userManage/admin/detail',
      component: userManageAdminListDetail,
      exact: true,
    },
    {
      path: '/userManage/grade',
      component: userManageGrade,
      exact: true,
    },
    {
      path: '/userManage/member',
      component: userManageMemer,
      exact: true,
    }
  ]
}
