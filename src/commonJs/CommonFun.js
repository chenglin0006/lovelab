import fetchjsonp from 'fetch-jsonp'

var androidLoginStatus =false; //判断安卓环境下是否打开了登录的弹窗

function androidLogin(){
  let currentUrl = location.href;
  if(!androidLoginStatus){
      androidLoginStatus=true;
  }
}

function deepClone(obj) {
    var str, newobj = obj.constructor === Array ? [] : {};
      if(typeof obj !== 'object'){
          return;
      } else if(window.JSON){
          str = JSON.stringify(obj), //序列化对象
          newobj = JSON.parse(str); //还原
      } else {
          for(var i in obj){
             newobj[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]; 
         }
     }
     return newobj;
}

function getDomain(){
    var mDomain = document.domain.indexOf("dianping.com")==-1 ? '//e.51ping.com' : '//e.dianping.com';
    return mDomain;
}

function Ajax(url, callback){
    var eDomain = document.domain.indexOf("51ping.com")==-1? 'https://e.dianping.com':'https://e.51ping.com';
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = false
	if (/iphone|ipad|ipod/.test(ua)) {		
	} else if (/android/.test(ua)) {
        isAndroid = true	
    }
    var current_url = location.href
    fetchjsonp(url).then(res=>res.json()).then(data=>{
        if (data.code == 600) {
            if (isAndroid) {
                androidLogin();
            } else {
                location.href = eDomain+'?redir='+current_url;
            }
        } else {
            callback(data)
        }
    }).catch(err=>{
        callback({
            code: 500,
            string: '网络错误，请稍后重试'
        })
    })
}

function getGDomain(){
    var gDomain = document.domain.indexOf("51ping.com")==-1? '//g.dianping.com':'//g.51ping.com';
    return gDomain;
}

function getEDomain(){
    var eDomain = document.domain.indexOf("51ping.com")==-1? 'https://e.dianping.com'+'?redir='+location.href:'https://e.51ping.com'+'?redir='+location.href;
    return eDomain;
}

function getUaIsApp(){
    window.TITANS_WEB_VIEW_URI = 'wedlunara://web';
    var ua = navigator.userAgent;
    var isLLApp = false;
    if(ua.indexOf('com.dianping.wedlunara')==-1){
      isLLApp = false;
    } else {
      isLLApp = true;
    }
    return isLLApp;
}

module.exports = {
    deepClone:deepClone,
    getDomain:getDomain,
    Ajax: Ajax,
    getGDomain:getGDomain,
    getEDomain:getEDomain,
    getUaIsApp:getUaIsApp,
    androidLogin:androidLogin
};