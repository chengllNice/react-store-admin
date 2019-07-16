
const validateStatus = {
  error: 'error',
  success: 'success',
  warning: 'warning',
  validating: 'validating',
};

const baseInfo = {
  required: '必填项',
  email: '邮箱格式不正确',
  card: '身份证号码格式不正确',
  phone: '手机号码格式不正确',
  maxLength: '最大长度',
  minLength: '最小长度',
};

const baseReg = {
  email: /^([A-Za-z0-9_\-.])+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]{2,8})+$/,
  card: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/,
  phone: /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/,
};

const baseData = {
  validate: true,
  info: '',
  validateStatus: ''
};

/*必填项*/
const required = (value) => {
  if(!value || (value instanceof Array && !value.length)){
    return { ...baseData, validateStatus: validateStatus.error, validate: false, info: baseInfo.required}
  }
  return { ...baseData, validateStatus: '', validate: true, info: ''};
};

/*邮箱验证*/
const email = (value) => {
  if(!baseReg.email.test(value)){
    return { ...baseData, validateStatus: validateStatus.error, validate: false, info: baseInfo.email}
  }
  return { ...baseData, validateStatus: '', validate: true, info: ''};
};

/*身份证号验证*/
const card = (value) => {
  if(!baseReg.card.test(value)){
    return { ...baseData, validateStatus: validateStatus.error, validate: false, info: baseInfo.card}
  }
  return { ...baseData, validateStatus: '', validate: true, info: ''};
};

/*手机号码验证*/
const phone = (value) => {
  if(!baseReg.phone.test(value)){
    return { ...baseData, validateStatus: validateStatus.error, validate: false, info: baseInfo.phone}
  }
  return { ...baseData, validateStatus: '', validate: true, info: ''};
};

/*字符最大长度验证*/
const maxLength = (value, checkArg) => {
  if(value.length > Number(checkArg)){
    return { ...baseData, validateStatus: validateStatus.error, validate: false, info: `${baseInfo.maxLength}${checkArg}`}
  }
  return { ...baseData, validateStatus: '', validate: true, info: ''};
};

/*字符最小长度验证*/
const minLength = (value, checkArg) => {
  if(value.length < Number(checkArg)){
    return { ...baseData, validateStatus: validateStatus.error, validate: false, info: `${baseInfo.minLength}${checkArg}`}
  }
  return { ...baseData, validateStatus: '', validate: true, info: ''};
};

export default {
  required,
  email,
  card,
  phone,
  maxLength,
  minLength,
};
