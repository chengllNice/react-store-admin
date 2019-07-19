

export const userManageListNewData = [
  {
    id: 'baseInfo',
    title: '基本信息',
    data: [
      {
        id: 'name',
        name: '姓名',
        placeholder: '请输入姓名',
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
      {
        id: 'password',
        name: '密码',
        placeholder: '请输入用户密码',
        type: 'input',
        checkType: 'required',
        newDisabled: false,
        editDisabled: false,
        newShow: true,
        editShow: true,
        value: '',
        options: [],
        expand: {},
        jpath: 'password'
      },
      {
        id: 'sex',
        name: '性别',
        placeholder: '',
        type: 'radio',
        checkType: 'required',
        newDisabled: false,
        editDisabled: false,
        newShow: true,
        editShow: true,
        value: '1',
        options: [
          {
            value: '1',
            name: '男'
          },
          {
            value: '0',
            name: '女'
          }
        ],
        expand: {},
        jpath: 'sex.id'
      },
      {
        id: 'userRole',
        name: '用户角色',
        placeholder: '请选择用户角色',
        type: 'select',
        checkType: 'required',
        newDisabled: true,
        editDisabled: true,
        newShow: true,
        editShow: true,
        value: '',
        options: [],
        expand: {},
        jpath: 'userRole.id'
      },
      {
        id: 'address',
        name: '详细住址',
        placeholder: '请输入详细住址',
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
        id: 'IDCard',
        name: '身份证号',
        placeholder: '请输入身份证号',
        type: 'input',
        checkType: 'required|card',
        newDisabled: false,
        editDisabled: false,
        newShow: true,
        editShow: true,
        value: '',
        options: [],
        expand: {},
        jpath: 'IDCard'
      },
      {
        id: 'phone',
        name: '手机号码',
        placeholder: '请输入手机号码',
        type: 'number',
        checkType: 'required|phone',
        newDisabled: false,
        editDisabled: false,
        newShow: true,
        editShow: true,
        value: '',
        options: [],
        expand: {},
        jpath: 'phone'
      },
      {
        id: 'email',
        name: '邮箱',
        placeholder: '请输入邮箱',
        type: 'input',
        checkType: 'required|email',
        newDisabled: false,
        editDisabled: false,
        newShow: true,
        editShow: true,
        value: '',
        options: [],
        expand: {},
        jpath: 'email'
      },
      // {
      //   id: 'storeCategory',
      //   name: '店铺类型',
      //   placeholder: '请选择店铺类型',
      //   type: 'select',
      //   checkType: 'required',
      //   newDisabled: false,
      //   editDisabled: false,
      //   newShow: true,
      //   editShow: true,
      //   value: '',
      //   options: [],
      //   expand: {},
      //   jpath: 'storeCategory'
      // },
      {
        id: 'IDCardPicture',
        name: '上传身份证照片',
        placeholder: '请上传身份证照片',
        type: 'img',
        checkType: 'required|minLength:2',
        newDisabled: false,
        editDisabled: false,
        newShow: true,
        editShow: true,
        value: [],
        options: [],
        expand: {
          limit: 2
        },
        jpath: 'IDCardPicture'
      },
    ]
  }
];
