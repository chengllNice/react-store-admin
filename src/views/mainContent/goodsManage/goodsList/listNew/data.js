

export const goodsManageListNewData = [
  {
    id: 'baseInfo',
    title: '基本信息',
    data: [
      {
        id: 'name',
        name: '商品名称',
        placeholder: '请输入商品名称',
        type: 'input',
        checkType: 'required|maxLength:30',
        newDisabled: false,
        editDisabled: false,
        newShow: true,
        editShow: true,
        value: '',
        options: [],
        expand: {},
        jpath: 'name'
      },
      {
        id: 'storeInfo',
        name: '所属商铺',
        placeholder: '请选择所属商铺',
        type: 'select',
        checkType: 'required',
        newDisabled: false,
        editDisabled: false,
        newShow: true,
        editShow: true,
        value: '',
        options: [],
        expand: {
          showSearch: true,//可以搜索
          filterOption: false,//不触发options过滤，做手动远程过滤
          defaultActiveFirstOption: false,//默认不选中options第一个，防止不选中失去焦点时的闪现问题
        },
        jpath: 'storeInfo.id'
      },
      {
        id: 'price',
        name: '商品价格',
        placeholder: '请输入商品价格',
        type: 'number',
        checkType: 'required',
        newDisabled: false,
        editDisabled: false,
        newShow: true,
        editShow: true,
        value: '',
        options: [],
        expand: {},
        jpath: 'price'
      },
      {
        id: 'description',
        name: '商品描述',
        placeholder: '请输入商品描述',
        type: 'textarea',
        checkType: 'required',
        newDisabled: false,
        editDisabled: false,
        newShow: true,
        editShow: true,
        value: '',
        options: [],
        expand: {
          autoSize: {minRows: 3, maxRows: 6}
        },
        jpath: 'description'
      },
      {
        id: 'stockNum',
        name: '库存量',
        placeholder: '请输入库存量',
        type: 'number',
        checkType: 'required',
        newDisabled: false,
        editDisabled: false,
        newShow: true,
        editShow: true,
        value: '',
        options: [],
        expand: {},
        jpath: 'stockNum'
      },
      {
        id: 'imgs',
        name: '商品图片',
        placeholder: '',
        type: 'img',
        checkType: 'required',
        newDisabled: false,
        editDisabled: false,
        newShow: true,
        editShow: true,
        value: [],
        options: [],
        expand: {
          limit: 5
        },
        jpath: 'imgs'
      }
    ]
  }
];
