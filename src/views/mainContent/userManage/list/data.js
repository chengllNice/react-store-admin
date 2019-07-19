

export const tableData = {
  tHead: [
    {
      key: 'id',
      title: 'id',
      dataIndex: 'id',
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: '姓名',
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
      key: 'password',
      dataIndex: 'password',
      title: '密码',
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: '邮箱',
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: '住址',
    },
    {
      key: 'phone',
      dataIndex: 'phone',
      title: '联系电话',
    },
    {
      key: 'IDCard',
      dataIndex: 'IDCard',
      title: '身份证号码',
    },
    {
      key: 'userRole',
      dataIndex: 'userRole.name',
      title: '角色',
      filterMultiple: false,
      filters: []
    },
    {
      key: 'createTime',
      dataIndex: 'createTime',
      title: '创建时间',
      filterMultiple: true,
      filterDate: 'range',
    },
    {
      key: 'isActive',
      dataIndex: 'isActive',
      title: '激活停用',
      fixed: 'right',
      slot: 'isActive',
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
