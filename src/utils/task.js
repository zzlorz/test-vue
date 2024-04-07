import moment from 'moment'
const taskClassify = (data, type) => {
  let getData = taskDefault(data)
  if (type === 'complete' || type === 'orderlist') {
    return getData
  }
  if (type === 'labellist') {
    let ordernamelist = []
    for (let i = 0; i < getData.length; i++) {
      ordernamelist.push(getData[i].ordername)
    }
    let namelist = uniq(ordernamelist)
    for (let j = 0; j < namelist.length; j++) {
      for (let i = 0; i < getData.length; i++) {
        if (getData[i].ordername === namelist[j].value) {
          namelist[j].list.push(getData[i])
        }
      }
    }
    let result = []
    for (let i = 0; i < namelist.length; i++) {
      for (let j = 0; j < namelist[i].list.length; j++) {
        result.push(namelist[i].list[j])
      }
    }
    return result
  } else {
    let newnewData = JSON.parse(JSON.stringify(getData))
    let today = [{name: '今天', istitle: true}],
        oldday = [{name: '已过期', istitle: true}],
        future = [{name: '以后', istitle: true}],
        futureweek = [{name: '接下来7天', istitle: true}],
        futuretomorrow = [{name: '明天', istitle: true}],
        nodata = [{name: '无日期', istitle: true}]
    for (let i = 0; i < newnewData.length; i++) {
      if (newnewData[i].plantime > moment().add(7, 'days').format('YYYY-MM-DD') && newnewData[i].plantime !== '' && newnewData[i].plantime !== null) {
        future.push(newnewData[i])
      } else if (newnewData[i].plantime > moment().add(1, 'days').format('YYYY-MM-DD') && newnewData[i].plantime <= moment().add(7, 'days').format('YYYY-MM-DD') && newnewData[i].plantime !== '' && newnewData[i].plantime !== null) {
        futureweek.push(newnewData[i])
      } else if (newnewData[i].plantime === moment().add(1, 'days').format('YYYY-MM-DD') && newnewData[i].plantime !== '' && newnewData[i].plantime !== null) {
        futuretomorrow.push(newnewData[i])
      } else if (newnewData[i].plantime === moment().format('YYYY-MM-DD') && newnewData[i].plantime !== '' && newnewData[i].plantime !== null) {
        today.push(newnewData[i])
      } else if (newnewData[i].plantime < moment().format('YYYY-MM-DD') && newnewData[i].plantime !== '' && newnewData[i].plantime !== null) {
        oldday.push(newnewData[i])
      } else if ((newnewData[i].plantime === null || newnewData[i].plantime === '')) {
        nodata.push(newnewData[i])
      }
    }
    if (today.length <= 1) today = []
    if (oldday.length <= 1) oldday = []
    if (future.length <= 1) future = []
    if (futureweek.length <= 1) futureweek = []
    if (futuretomorrow.length <= 1) futuretomorrow = []
    if (nodata.length <= 1) nodata = []
    oldday = oldday.concat(today, futuretomorrow, futureweek, future, nodata)
    return oldday
  }
}
const taskDefault = (data) => {
  let timeArr = []
  let defaultData = JSON.parse(JSON.stringify(data))
  for (let i = 0; i < defaultData.length; i++) {
    if (defaultData[i].istitle) {
      // timeArr.push(defaultData[i])
      continue
    } else {
      timeArr.push(defaultData[i])
    }
  }
  return timeArr
}
let uniq = (array) => {
  let temp = [], newTemp= []
  //一个新的临时数组
  for (let i = 0; i < array.length; i++) {
    if (temp.indexOf(array[i]) === -1) {
      temp.push(array[i])
      if (array[i] === 'undefined' || array[i] === '' || array[i] === null) {
        newTemp.push({value: array[i], list: [{istitle: true, name: '收集箱'}]})
      } else {
        newTemp.push({value: array[i], list: [{istitle: true, name: array[i]}]})
      }
    }
  }
  return newTemp
}
export default taskClassify