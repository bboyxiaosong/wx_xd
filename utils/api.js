const domain = 'https://hzpwechat-test.baihejia.com/'
// const domain = 'https://hzp.baihejia.com/'
// const domain = 'http://10.90.5.144:9000/'

const api = {
  canPublish: domain + 'ProfileController/canPublish', // 是否可发房源或求租
  searchCommunity: domain + 'ProfileController/communities', // 搜索小区
  search: domain + 'Match/search',//搜索关键字
  openCities: domain + 'LocationController/openCities',//选择城市
  generateCode: domain + 'UserController/generateCode', // 发房源时获取验证码
  areas: domain + 'ProfileController/areas', // 获取区域
  businessAreas: domain + 'ProfileController/businessAreas', // 获取商圈
  qcloudCosConfig: domain + 'Application/qcloudCosConfig', // 腾讯云上传图片配置
  getCityByLocation: domain + 'Application/getCityByLocation',//获取城市
  chuzuList: domain + 'chuzu',//有房出租列表
  qiuzuList: domain + 'qiuzu',//无房求租列表
  chuzuDetail: domain + 'HouseController/findById',//有房出租详情
  qiuzuDetail: domain + 'HouseRequestController/findById',//无房求租详情
  personalHomePage: domain + 'UserController/personalHomePage',//个人主页
  likeList: domain + 'UserController/likeList',//喜欢收藏列表
  unlike: domain + 'HouseController/unlike',//取消喜欢收藏出租
  like: domain + 'HouseController/like',//喜欢收藏出租
  unlikeRent: domain + 'HouseRequestController/unlike',//取消喜欢收藏求租
  likeRent: domain + 'HouseRequestController/like',//喜欢收藏求租
  myPublication: domain + 'UserController/myPublication',//我的发布列表
  housePublishOrUpdate: domain + 'HouseController/publishOrUpdate', // 有房发布
  rentPublishOrUpdate: domain + 'HouseRequestController/publishOrUpdate', // 无房发布
  seen: domain + 'ProfileController/seen', // 看过我的
  register: domain + 'UserController/register', // 注册登录
  loginByMobile: domain + 'UserController/loginByMobile', // 手机号登录
  feedback: domain + 'ProfileController/feedback', // 反馈
  bindMobile: domain + 'UserController/bindMobile' ,// 绑定手机号
  logout: domain + 'UserController/logout', // 退出登录
  updateProfile: domain + 'UserController/updateProfile', // 登录后补充用户信息
}

module.exports = api;