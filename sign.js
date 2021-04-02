const cookieName = '网易新闻'
const cookieKey = 'chavy_cookie_neteasenews'
const bodyKey = 'chavy_body_neteasenews'
const chavy = init()
const cookieVal = JSON.parse(chavy.getdata(cookieKey))
const bodyVal = chavy.getdata(bodyKey)
const cookieName = '海底捞'
const signurlKey = 'signurl_hdl'
const signheaderKey = 'signheader_hdl'
const signbodyKey = 'signbody_hdl'
const hdl = init()

sign()
let isGetCookie = typeof $request !== 'undefined'

if (isGetCookie) {
   getcookie()
} else {
   sign()
}

function getcookie() {
  if ($request && $request.method == 'POST') {
      const signurlVal = $request.url
      const signheaderVal = JSON.stringify($request.headers)
      const signbodyVal = $request.body

      if (signurlVal) hdl.setdata(signurlVal, signurlKey)
      if (signheaderVal) hdl.setdata(signheaderVal, signheaderKey)
      if (signbodyVal) hdl.setdata(signbodyVal, signbodyKey)
       hdl.msg(cookieName, `获取Cookie: 成功, 请禁用该脚本`, ``)
   }
   hdl.done()
}

function sign() {
  if (bodyVal) {
    let url = { url: `https://attendanceserviceapi.pactera.com:8099/LanXin/zh-cn/GPS/AttendanceCheckIn`, headers: cookieVal }
    url.body = bodyVal
    chavy.post(url, (error, response, data) => {
      chavy.log(`${cookieName}, data: ${data}`)
      let result = JSON.parse(data)
     console.log(result)
      /*const title = `${cookieName}`
      let subTitle = ``
      let detail = ``
      if (result.code == 200) {
        subTitle = '签到结果: 成功'
        detail = `连签: +${result.data.serialDays}, 金币: ${result.data.awardGoldCoin}, 说明: ${result.msg}`
      } else if (result.code == 700) {
        subTitle = '签到结果: 成功 (重复签到)'
        detail = `说明: ${result.msg}`
      } else {
        subTitle = '签到结果: 失败'
        detail = `编码: ${result.code}, 说明: ${result.msg}`
      }
      chavy.msg(title, subTitle, detail)*/
    })
  } else {
  const signurlVal = hdl.getdata(signurlKey)
  const signheaderVal = hdl.getdata(signheaderKey)
  const signbodyVal = hdl.getdata(signbodyKey)
  const url = { url: signurlVal, headers: JSON.parse(signheaderVal), body: signbodyVal }
  hdl.post(url, (error, response, data) => {
    hdl.log(`${cookieName}, data: ${data}`)
    const title = `${cookieName}`
    let subTitle = `签到结果: 失败`
    let detail = `说明: body参数为空`
    if (isQuanX()) detail += `, QuanX用户请手动抓包 body 参数!`
    chavy.msg(title, subTitle, detail)
  }

  chavy.done()
    let subTitle = ''
    let detail = ''
    const result = JSON.parse(data)
    /*if (result.success == true && result.signInfoVO.todaySigned == true) {
      subTitle = `签到结果: 成功`
      detail = `签到奖励: ${result.customInfo.foodNum}火柴, 连签: ${result.signInfoVO.continueDay}天`
    } else if (result.success == false && result.signInfoVO.todaySigned == true) {
      subTitle = `签到结果: 成功 (重复签到)`
      detail = `连签: ${result.signInfoVO.continueDay}天`
    } else {
      subTitle = `签到结果: 失败`
      detail = `说明: ${result.message}, 请重新获取`
    }*/
    hdl.msg(title, subTitle, detail)
    hdl.done()
  })
}

function init() {
@@ -79,8 +90,17 @@ function init() {
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  put = (url, cb) => {
    if (isSurge()) {
      $httpClient.put(url, cb)
    }
    if (isQuanX()) {
      url.method = 'PUT'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, put, done }
}
