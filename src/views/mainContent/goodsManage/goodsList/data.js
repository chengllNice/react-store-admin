

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
      title: '商品名称',
    },
    {
      key: 'storeInfo',
      dataIndex: 'storeInfo.storeName',
      title: '所属店铺',
    },
    {
      key: 'category',
      dataIndex: 'category',
      title: '所属分类',
    },
    {
      key: 'price',
      dataIndex: 'price',
      title: '价格(元)',
    },
    {
      key: 'stockNum',
      dataIndex: 'stockNum',
      title: '库存(件)',
    },
    {
      key: 'tradingTotalNum',
      dataIndex: 'tradingTotalNum',
      title: '总交易数量(件)',
    },
    {
      key: 'tradingMonthNum',
      dataIndex: 'tradingMonthNum',
      title: '月交易数量(件)',
    },
    {
      key: 'tradingDayNum',
      dataIndex: 'tradingDayNum',
      title: '日交易数量(件)',
    },
    {
      key: 'commitGoodRate',
      dataIndex: 'commitGoodRate',
      title: '好评率(%)',
    },
    {
      key: 'createTime',
      dataIndex: 'createTime',
      title: '创建时间',
      filterMultiple: true,
      filterDate: 'range',
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: '上下架',
      fixed: 'right',
      slot: 'status',
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
