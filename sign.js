sign()

function sign() {
  let url = {
    url: `https://attendanceserviceapi.pactera.com:8099/LanXin/zh-cn/GPS/AttendanceCheckIn`,
    headers: {
      Cookie: 'AttendanceLoginInfo={"EmployeeNo":"P0153164","Token":"v9WwvB99E2f4YNO72QYc3zXpBkE="}; __RequestVerificationToken_L0xhblhpbg2=W48yGUzrd9GziYkuOaERQC3_bC_ZIMNWJ3YkGZxUWdr-fX-pr-NR3l19j1BdpDi8Jbd4nGh4NGv1sMmUVGezup-4oJIoTcH_kFK0LIlLNalIYXcd0h2Qw2l1o3P8qRoh_Imvv0Cbau6GVd39seUrdA2; App_Token=46f0246d-d8d7-4525-8aa4-40f007032e7b; User_Token=7d817d64-9c47-40ca-ad77-85ab1b2501e0; currentuser=P0153164'
    }
  }
  url.headers['Origin'] = 'https://attendanceserviceapi.pactera.com:8099'
  url.headers['Referer'] = 'https://attendanceserviceapi.pactera.com:8099/LanXin/zh-cn/GPS/Index'
  url.headers['Accept'] = 'application/json, text/javascript, */*; q=0.01'
  url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 es360messenger/7.22.30-796 clientType/phone'

  chavy.get(url, (error, response, data) => {
    let result = JSON.parse(data)
    let title = `tiny`
    // 签到成功
    if (result && result.IsCheckInSuccess == 1) {
      let subTitle = `签到结果: 成功`
      let detail = `说明: ${result.data.Message}`
      chavy.msg(title, subTitle, detail)
    }
    // 签到失败
    else {
      let subTitle = `签到结果: 失败`
      let detail = `说明: ${result.Message}`
      chavy.msg(title, subTitle, detail)
    }
    chavy.log(`tiny, data: ${data}`)
    chavy.done()
  })
}
function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
