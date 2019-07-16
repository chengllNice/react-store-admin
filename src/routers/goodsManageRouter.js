
import goodsManage from '@/views/mainContent/goodsManage'

import goodsManageList from '@/views/mainContent/goodsManage/goodsList'
import goodsManageListNew from '@/views/mainContent/goodsManage/goodsList/listNew'
import goodsManageListDetail from '@/views/mainContent/goodsManage/goodsList/listDetailInfo'


export default {
  path: '/goodsManage',
  component: goodsManage,
  exact: true,
  children: [
    // {
    //   path: '/storeManage/echarts',
    //   component: storeManageEcharts,
    //   exact: true,
    // },
    {
      path: '/goodsManage/list',
      component: goodsManageList,
      exact: true,
    },
    {
      path: '/goodsManage/list/new',
      component: goodsManageListNew,
      exact: true,
    },
    {
      path: '/goodsManage/list/detail',
      component: goodsManageListDetail,
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
