import Mock from 'mockjs'
import * as commonData from '../commonData'
import storeManage from '../storeManage/schema'
const Random = Mock.Random;

/*商品列表数据*/
const goodsList = {
  'list|30-100':[
    {
      'id|+1': 1,//商品id
      'storeInfo|1': storeManage.storeList,//店铺id
      'category': 1,//所属分类
      'name': '@cword',//名称
      'description': '@ctitle',//描述
      'price|10-100': 1,//价格
      'originPrice': function () {
        return this.price - Random.integer(0, 8)
      },//原来的价格
      'stockNum|100-1000': 0,//数量库存
      'tradingTotalNum|1000-100000': 0,//总交易数量
      'tradingMonthNum|100-500': 0,//月交易数量
      'tradingDayNum|0-100': 0,//日交易数量
      'imgs': commonData.data.images.goodsImg,//图片列表id
      'avatarImg': function () {
        return this.imgs[0]
      },//展示图片
      'commitIds': [],//评价id列表
      'commitGoodRate|0-100': 0,//好评率
      'specification': 1,//规格参数对应的id
      'packList': 0,//包装清单
      'couponIds': [],//优惠券列表id
      'status': '@boolean',//上架（true）下架(false)
      'createTime': '@datetime',//创建时间
    }
  ]
};


export default {
  goodsList: Mock.mock(goodsList).list
}



