/**
 * 请求头
 */
var header = {
  'content-type': 'application/x-www-form-urlencoded',
  'Authorization': "Bearer " + wx.getStorageSync("token"),
  'os': 'android',
  'version': '1.0.0',
  'token': wx.getStorageSync('token'),
}

/**
 * 供外部post请求调用  
 * @url 请求URL地址
 * @params 请求参数
 * @onSuccess 成功回调
 * @onFailed 失败回调
 * @startMsg 是否开启请求提示 true 开启 false关闭,默认开启
 * @msg 请求时，提示文本
 */
function post(url, params, onSuccess, onFailed, msg = '正在提交', startMsg = true) {
  request(url, params, "POST", onSuccess, onFailed, msg, startMsg);
}

/**
 * 供外部get请求调用
 * @url 请求URL地址
 * @params 请求参数
 * @onSuccess 成功回调
 * @onFailed 失败回调
 * @startMsg 是否开启请求提示 true 开启 false关闭,默认开启
 * @msg 请求时，提示文本
 */
function get(url, params, onSuccess, onFailed, msg = '加载中', startMsg = true) {
  request(url, params, "GET", onSuccess, onFailed, msg, startMsg);
}

/**
 * 提示方法
 * @text 提示内容
 * @time 提示时间
 * @icon 提示图片
 */

function msg(text, time = 1500, icon = 'none') {
  wx.showToast({
    title: text,
    icon: icon,
    duration: time
  });
  return false;
}

/**
 * function: 封装网络请求
 * @url 请求URL地址
 * @params 请求参数
 * @method 请求方式：GET/POST
 * @onSuccess 成功回调
 * @onFailed  失败回调
 * @startMsg 是否开启请求提示 true 开启 false关闭,默认开启
 * @msg 请求时，提示文本
 */

function request(url, params, method, onSuccess, onFailed, msg, startMsg) {
  console.log(msg)
  // 是否有提示信息
  if (startMsg) {
    wx.showLoading({
      title: msg
    })
  }
  wx.request({
    url: 'http://47.107.92.235/ysj/public/index.php/' + url,
    data: dealParams(params),
    method: method,
    header: header,
    success: function (res) {
      if (startMsg) {
        wx.hideLoading();
      }
      if (res.data) {
        /** start 根据需求 接口的返回状态码进行处理 */
        if (res.statusCode == 200) {
          if (res.data.code == -1) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000,
            })
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }, 2000)
            return false;
          }
          onSuccess(res.data); // request success
        } else {
          onFailed(res.data.message); // request failed
        }
        /** end 处理结束*/
      }
    },
    fail: function (error) {
      onFailed(""); // failure for other reasons
    }
  })
}

/**
 * function: 根据需求处理请求参数：添加固定参数配置等
 * @params 请求参数
 */
function dealParams(params) {
  // console.log("请求参数:", params)
  return params;
}


// 1.通过module.exports方式提供给外部调用
module.exports = {
  post: post,
  get: get,
  msg:msg,
}
