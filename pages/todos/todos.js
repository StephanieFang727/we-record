// pages/todos.js
import api from '../../utils/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: '1',
    isFormShow: false,
    date: '2021-01-10',
    listData: [], // 列表源数据
    curList:[], // 当前展示列表
    calendarData: {} // 日历源数据
  },
  // 获取最新列表
  getList: function(){
    let curList = [];
    const { listData: data } = this.data;
    const { status } = this.data;
    switch(status){
      case '1':
        curList = data;
        break;
      case '2':
        curList = data.filter(item=>!item.completed);
        break;
      case '3':
        curList = data.filter(item=>item.completed);
        break;
    }
      return curList;
  },
  // 切换tab处理函数
  switchStatus: function(e){
    let { status } = e.currentTarget.dataset;
    this.setData({
      status: status
    })
    this.setData({
      curList: this.getList(),
    })
  },
  // 点击item处理函数
  todoHandler: function(e) {
    const { id } = e.currentTarget.dataset;
    const {curList: list } = this.data;
    let item = list.filter(item=>item.id === id)[0];
    item.completed = !item.completed;
    // this.setData({
    //   curList: this.getList(),
    // })
    this.setListData(this.data.listData);
    this.initCurList();
  },
  // 添加任务函数
  addHandler: function(e) {
    this.setData({
      isFormShow: true,
    })
  },
  // 关闭弹窗函数
  hideFormHandler: function(e) {
    this.setData({
      isFormShow: false,
    })
  },
  // 提交表单函数
  formSubmit: function(e) {
    let newItem = {id:new Date().getTime(), completed: false, ...e.detail.value};
    let listData = [...this.data.listData,newItem];
    this.setListData(listData);
    // this.setData({
    //   listData,
    // })
    this.initCurList();
    this.setData({
      isFormShow: false,
      value: '',
    })
  },
 // 重置表单
  formReset: function(e) {

  },
  bindDateChange: async function(e) {
    this.setData({
      date: e.detail.value
    })
    await this.initCurList();
  },
   // 获取todolist数据
  getListData: async function() {
     const {date} = this.data;
     let calendarData = {};
     try {
       calendarData = await api.getStorageData('cal');
     } catch(e) {
       console.log(e),
       calendarData = {};
     }
     this.setData({
       calendarData,
       listData: calendarData[date] || [],
     })
  },
  // 存储todolist数据
  setListData: async function(listData) {
    const {date} = this.data;
    let temp = this.data.calendarData;
    temp[date] = listData;
    try{
      await api.setStorageData('cal',temp);
    } catch(e) {
      console.log(e)
    }
    this.setData({
      calendarData: temp
    })
  },
  initCurList: async function () {
    await this.getListData();
    this.setData({
      curList: this.getList(),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.initCurList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})