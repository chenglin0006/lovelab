//常量，比如ajax地址等
var ajaxAddress = {
  eDomain:document.domain.indexOf("dianping")==-1 ? '//e.51ping.com' : '//e.dianping.com',
  mDomain:document.domain.indexOf("dianping")==-1 ? '//m.51ping.com' : '//m.dianping.com',
  pageYZSOrderAjaxAction:'/lovelab/order/pageYZSOrderAjaxAction', //获取初始订单列表
  queryYZSInfoAjaxAction:'/lovelab/order/queryYZSInfoAjaxAction', //一站式信息查询
  queryYZSOrderByKeyWordsAjaxAction:'/lovelab/order/queryYZSOrderByKeyWordsAjaxAction',//根据条件筛选订单
  mainOrderPageAjaxAction:'/lovelab/order/mainOrderPageAjaxAction', //获取主订单详情
  subOrderDetailInfoAjaxAction:'/lovelab/order/subOrderDetailInfoAjaxAction', //获取子订单详情
  signConfirmPicUploadAjaxAction:'/lovelab/order/signConfirmPicUploadAjaxAction', //提交凭证
  logout:'/shopaccount/login/ajaxLogout',  //退出登陆
}
var h5Address = document.domain.indexOf("dianping")==-1 ? '//h5.51ping.com': '//h5.dianping.com';
var gAddress = document.domain.indexOf('dianping')==-1 ? '//g.51ping.com' : '//g.dianping.com';
module.exports={
  ajaxAddress,
  h5Address,
  gAddress,
}