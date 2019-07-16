

export const tableData = {
  tHead: [
    {
      key: 'id',
      title: 'id',
      dataIndex: 'id',
    },
    {
      key: 'uid',
      title: 'uid',
      dataIndex: 'uid',
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: '角色',
    },
    {
      key: 'createTime',
      dataIndex: 'createTime',
      title: '创建时间',
    },
    {
      key: 'operate',
      dataIndex: 'operate',
      title: '操作',
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


export const authManageRoleListNewData = [
  {
    id: 'baseInfo',
    title: '',
    data: [
      {
        id: 'uid',
        name: 'uid',
        placeholder: '请输入uid',
        type: 'input',
        checkType: 'required',
        newDisabled: false,
        editDisabled: false,
        newShow: true,
        editShow: true,
        value: '',
        options: [],
        expand: {},
        jpath: 'uid'
      },
      {
        id: 'name',
        name: '角色名',
        placeholder: '请输入角色名',
        type: 'input',
        checkType: 'required',
        newDisabled: false,
        editDisabled: false,
        newShow: true,
        editShow: true,
        value: '',
        options: [],
        expand: {},
        jpath: 'name'
      },
    ]
  }
];
