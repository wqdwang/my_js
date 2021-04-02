const cookieName = '网易新闻'
const cookieKey = 'chavy_cookie_neteasenews'
const bodyKey = 'chavy_body_neteasenews'
const chavy = init()
const cookieVal = JSON.parse(chavy.getdata(cookieKey))
const bodyVal = chavy.getdata(bodyKey)

sign()

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
    const title = `${cookieName}`
    let subTitle = `签到结果: 失败`
    let detail = `说明: body参数为空`
    if (isQuanX()) detail += `, QuanX用户请手动抓包 body 参数!`
    chavy.msg(title, subTitle, detail)
  }

  chavy.done()
}

function init() {
	@@ -79,8 +90,17 @@ function init() {
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
