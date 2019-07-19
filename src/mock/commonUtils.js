
import _ from 'lodash'
import {
  getObjectValue
} from "../utils";

/**
 * 根据某个key模糊匹配数组或对象中的值
 * @param data 源数据
 * @param key  数据或对象中的键值
 * @param value 匹配的字符串
 * @returns {Array}
 */
export const filterKeyByValue = (data, key, value) => {
  let filterData = [];
  if(typeof value !== 'object'){
    value = value.toLowerCase();
  }
  if(data instanceof Array){
    filterData = data.filter(item=>{
      let _value = getObjectValue(item, key);
      if(_.isArray(value)){
        return value.includes(_value)
      }
      return _value.toString().toLowerCase().includes(value);
    });
  }else if(data instanceof Object){

  }
  return filterData;
};

/**
 * 根据某个key模糊匹配数组或对象中的值
 * @param data 源数据
 * @param filterObj  过滤条件是一个对象
 * @param filterType 过滤类型  并且and  或者or
 * @param type 等于eq 包含in 默认为in
 * @returns {Array}
 */
export const filterByObj = (data, filterObj, filterType, type) => {
  let filterData = [];
  if(!_.isObject(filterObj)){
    return filterData
  }
  if(data instanceof Array){
    filterData = data.filter(item=>{
      let arr = Object.keys(filterObj).map(key=>{
        let _value = getObjectValue(item, key);
        if(type === 'eq'){
          if(_.isArray(filterObj[key])){
            return filterObj[key].includes(_value.toString())
          }
          return _value.toString().toLowerCase() === filterObj[key].toString().toLowerCase()
        }
        if(_.isArray(filterObj[key])){
          return filterObj[key].includes(_value.toString())
        }
        return _value.toString().toLowerCase().includes(filterObj[key].toString().toLowerCase())
      });
      if(filterType === 'or'){
        return arr.includes(true);
      }
      else if(filterType === 'and'){
        return !arr.includes(false);
      }
      return false
    });
  }
  return filterData;
};

/**
 * 根据某个key匹配在value范围内的值
 * @param data
 * @param key
 * @param value  范围内时value是数组第一个元素为开始第二个元素的结束 其他为单个值(单值时才关注type，否则忽略type)
 * @param type 过滤的方式  两个值范围内'range' 小于'left' 大于'right'
 */
export const filterKeyByValueRange = (data, key, value, type) => {
  let filterData = [];
  let startValue = value;
  let endValue = '';
  if(_.isArray(value) || type === 'range'){
    startValue = value[0];
    endValue = value[1];
  }
  if(data instanceof Array){
    filterData = data.filter((item, index) => {
      if(endValue){
        return item[key] <= endValue && item[key] >= startValue
      }
      if(type === 'left'){
        return item[key] <= startValue;
      }
      if(type === 'right'){
        return item[key] >= startValue;
      }
      return false
    });
  }
  return filterData;
};


/**
 * 根据指定项key删除数据中的元素
 * @param data
 * @param key
 * @param value
 * @returns {Array}
 */
export const deleteDataByKeys = (data, key, value) => {
  let deleteData = [];
  if(data instanceof Array){
    let isArray = _.isArray(value);
    // let isString = _.isString(value);
    if(isArray){
      value.forEach(valueItem=>{
        let index = data.findIndex(item=>{
          return item[key].toString() === valueItem.toString()
        });
        deleteData.push(data.splice(index, 1))
      });
    }else{
      let index = data.findIndex(item=>{
        return item[key].toString() === value.toString()
      });
      deleteData.push(data.splice(index, 1))
    }
  }
  return deleteData;
};

/**
 * 删除对象属性值为空的属性
 * @param obj
 * @returns {*}
 */
export const deleteObjKeyNull = (obj) => {
  if(!_.isObject(obj)){
    return obj;
  }
  Object.keys(obj).forEach(key=>{
    if(typeof obj[key] === 'number' && !obj[key].toString()){
      delete obj[key]
    }else if(typeof obj[key] === 'string' && !obj[key]){
      delete obj[key]
    }
  });
  return obj;
};


/**
 * 随机一个指定范围内的经纬度
 * @param longArr
 * @param latArr
 * @returns {number[]}
 */
export const randomLongLat = (longArr, latArr) => {
  let longStart = longArr[0];
  let longEnd = longArr[1];
  let latStart = latArr[0];
  let latEnd = latArr[1];

  let long = (Math.random() * (longEnd - longStart) + longStart).toFixed(10);
  let lat = (Math.random() * (latEnd - latStart) + latStart).toFixed(10);

  return [lat, long];
};


