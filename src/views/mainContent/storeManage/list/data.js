

export const tableData = {
  tHead: [
    {
      key: 'id',
      title: 'id',
      dataIndex: 'id',
    },
    {
      key: 'storeName',
      dataIndex: 'storeName',
      title: '店铺名称',
      /*filterMultiple: true,
      filters: [
        {
          value: '1',
          text: '用户类型1'
        },
        {
          value: '2',
          text: '用户类型2'
        },
        {
          value: '3',
          text: '用户类型3'
        }
      ]*/
    },
    {
      key: 'storeAge',
      dataIndex: 'storeAge',
      title: '店铺年限(天)',
    },
    {
      key: 'name',
      dataIndex: 'user.name',
      title: '所属用户',
    },
    {
      key: 'role',
      dataIndex: 'user.userRole.name',
      title: '用户角色',
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: '地址',
    },
    {
      key: 'category',
      dataIndex: 'category.name',
      title: '店铺分类',
      filterMultiple: false,
    },
    {
      key: 'focusNum',
      dataIndex: 'focusNum',
      title: '关注量',
    },
    {
      key: 'creditGrade',
      dataIndex: 'creditGrade.name',
      title: '信誉等级',
    },
    {
      key: 'createTime',
      dataIndex: 'createTime',
      title: '创建时间',
      filterMultiple: true,
      filterDate: 'range',
    },
    {
      key: 'operate',
      dataIndex: 'operate',
      title: '操作',
      fixed: 'right',
      width: 100,
      slot: 'operate',
    },
  ],
  tBody: [],
  tPage: {
    total: 0,
    page: 1,
    pageSize: 10
  }
};
