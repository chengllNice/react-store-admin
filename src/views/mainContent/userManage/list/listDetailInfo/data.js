
export const detailInfoData = [
  {
    id: 'baseInfo',
    title: '基本信息',
    data: [
      {
        id: 'id',
        name: '用户ID',
        value: '',
        type: 'input',
        jpath: 'id',
      },
      {
        id: 'name',
        name: '姓名',
        value: '',
        type: 'input',
        jpath: 'name',
      },
      {
        id: 'password',
        name: '密码',
        value: '',
        type: 'input',
        jpath: 'password',
      },
      {
        id: 'phone',
        name: '手机号',
        value: '',
        type: 'input',
        jpath: 'phone',
      },
      {
        id: 'IDCard',
        name: '身份证号',
        value: '',
        type: 'input',
        jpath: 'IDCard',
      },
      {
        id: 'sex',
        name: '性别',
        value: '',
        type: 'input',
        jpath: 'sex.name',
      },
      {
        id: 'userRole',
        name: '用户角色',
        value: '',
        type: 'input',
        jpath: 'userRole.name',
      },
      {
        id: 'email',
        name: '邮箱',
        value: '',
        type: 'input',
        jpath: 'email',
      },
      {
        id: 'address',
        name: '地址',
        value: '',
        type: 'input',
        jpath: 'address',
      },
      {
        id: 'latlong',
        name: '经纬度',
        value: '',
        type: 'input',
        jpath: 'latlong',
      },
      {
        id: 'storeNum',
        name: '店铺数量',
        value: '',
        type: 'input',
        jpath: 'storeNum',
      },
      {
        id: 'createTime',
        name: '创建时间',
        value: '',
        type: 'input',
        jpath: 'createTime',
      },
      {
        id: 'IDCardPictrue',
        name: '身份证号照片',
        value: [],
        type: 'img',
        jpath: 'IDCardPicture',
      }
    ]
  },
  {
    id: 'storeInfo',
    title: '店铺信息',
    slot: 'storeInfo',
    data: []
  }
];


export const detailTableData = {
  tHead: [
    {
      key: 'id',
      title: '店铺ID',
      dataIndex: 'id',
    },
    {
      key: 'storeName',
      dataIndex: 'storeName',
      title: '店铺名称',
    }
  ],
  tBody: [],
  tPage: {
    total: 0,
    page: 1,
    pageSize: 10
  }
};
