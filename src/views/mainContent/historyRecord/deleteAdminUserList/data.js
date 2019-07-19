
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
    },
    {
      key: 'deleteReason',
      dataIndex: 'deleteReason',
      title: '删除原因',
      width: 100,
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: '邮箱',
    },
    {
      key: 'phone',
      dataIndex: 'phone',
      title: '联系电话',
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
      key: 'deleteTime',
      dataIndex: 'deleteTime',
      title: '删除时间',
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
