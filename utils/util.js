const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatHm = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  return [hour, minute].map(formatNumber).join(':')
}

const formatCommaNumber = n =>{
  n = (''+n).split('.')
  let t = n[0]
  let r=[]
  let len = t.length
  for (let x = 0; x < len;x++){
    r.push(t[len - x -1])
    r.push((x+1)%3==0&&x!=len-1?',':'')
    // console.log(r)
  }
  return r.reverse().join('')+(n[1]?('.'+n[1]):'')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatHm: formatHm,
  formatNumber: formatNumber,
  formatCommaNumber: formatCommaNumber
}
