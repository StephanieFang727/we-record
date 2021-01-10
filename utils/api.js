const getStorageData = (key) => {
  return new Promise((resolve, reject)=>{
    wx.getStorage({
      key,
      success: (res) => resolve(res.data),
      fail: (e) => {
        console.log('fail to get storage data',e);
        reject();
      }
    })
  })
}

const setStorageData = (key, data) =>{
  return new Promise((resolve, reject) => {
    wx.setStorage({
      data,
      key,
      success: (res) =>{
        resolve(res.data);
      },
      fail: () => {
        console.log('fail to set storage data',e);
        reject();
      }
    })
  })
}

module.exports = {
  getStorageData,
  setStorageData
}