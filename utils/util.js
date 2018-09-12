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
  t = n[0]
  r=[]
  for(let x=t.length-1;x>=0;x--){
    r.push(t[x])
    r.push((x+1)%3==0&&x!=0?',':'')
    console.log(r)
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
  formatNumber: formatNumber
}
