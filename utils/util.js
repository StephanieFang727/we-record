const formatTime = date => {
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()
  month = month > 9 ? month : '0' + month;
  day = day > 9 ? day : '0' + day;
  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return [year, month, day].join('-');
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getIndex = ((arr,item)=>{
  for(let i in arr){
    if(arr[i].id == item.id){
      return i;
    };
  };
});
module.exports = {
  formatTime: formatTime,
  getIndex,
}
