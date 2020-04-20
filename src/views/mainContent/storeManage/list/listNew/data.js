

export const storeManageListNewData = [
  {
    id: 'baseInfo',
    title: '基本信息',
    data: [
      {
        id: 'storeName',
        name: '店铺名称',
        placeholder: '请输入店铺名称',
        type: 'input',
        checkType: 'required|maxLength:30',
        newDisabled: false,
        editDisabled: false,
        newShow: true,
        editShow: true,
        value: '',
        options: [],
        expand: {},
        jpath: 'storeName'
      },
      {
        id: 'user',
        name: '所属商家',
        placeholder: '请选择所属商家',
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
        jpath: 'user.id'
      },
      {
        id: 'address',
        name: '店铺地址',
        placeholder: '请输入店铺地址',
        type: 'select',
        checkType: 'required',
        newDisabled: false,
        editDisabled: false,
        newShow: true,
        editShow: true,
        value: '',
        options: [],
        expand: {
          showSearch: true,
          filterOption: false,//不触发options过滤，做手动远程过滤
          defaultActiveFirstOption: false,//默认不选中options第一个，防止不选中失去焦点时的闪现问题
        },
        jpath: 'address'
      },
      {
        id: 'category',
        name: '店铺分类',
        placeholder: '请选择店铺分类',
        type: 'select',
        checkType: 'required',
        newDisabled: false,
        editDisabled: false,
        newShow: true,
        editShow: true,
        value: '',
        options: [],
        expand: {},
        jpath: 'category.id'
      },
      {
        id: 'description',
        name: '店铺描述',
        placeholder: '请输入店铺描述',
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
        id: 'organizationCode',
        name: '组织机构代码',
        placeholder: '请输入组织机构代码',
        type: 'input',
        checkType: 'required',
        newDisabled: false,
        editDisabled: false,
        newShow: true,
        editShow: true,
        value: '',
        options: [],
        expand: {},
        jpath: 'organizationCode'
      },
      {
        id: 'businessLicenseImg',
        name: '上传营业执照',
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
          limit: 1
        },
        jpath: 'businessLicenseImg'
      },
      {
        id: 'avatarImg',
        name: '店铺头像',
        placeholder: '',
        type: 'img',
        checkType: '',
        newDisabled: false,
        editDisabled: false,
        newShow: true,
        editShow: true,
        value: [],
        options: [],
        expand: {
          limit: 1
        },
        jpath: 'avatarImg'
      },
    ]
  }
];
