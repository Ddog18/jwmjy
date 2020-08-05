// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.url,
    video: null,
    openid: ''
  },

  //调起支付
  pay: function(){
    var that = this
    // 获取ip
    var ip = null
    var total_fee = 0
    if (that.data.video.cuxiao==0){
      total_fee = that.data.video.jiage
    }else{
      total_fee = that.data.video.cuxiaojiage
    }
    wx.request({
      url: 'http://ip-api.com/json',
      success: function (e) {
        console.log(e.data);
        ip= e.data
      }
    })
    //调起支付
    wx.request({
      url: url +'/f/jdx/',
      data: { "total_fee": total_fee, "openid": openid, "ip": ip },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(data) {
        console.log("微信支付" + data.data)
        if (data.data == null) {
          wx.showModal({
            title: '错误',
            content: '未选择充值金额',
          })
        } else {
          //返回参数吊起微信支付
          wx.requestPayment({
            'timeStamp': data.data.timeStamp,
            'nonceStr': data.data.nonceStr,
            'package': data.data.package,
            'signType': 'MD5',
            'paySign': data.data.paySign,
            'success': function (res) {

            },
            'fail': function (res) {
            }
          })
        }

      },
      fail() {
        console.log("失败")
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var that = this
    // 获取openid
    var openid = wx.getStorageSync('openid');
    // 查询视频
    wx.request({
      url: that.data.url + '/f/jdx/shipinbofang',
      data: { "id": id },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(data) {
        console.log(data.data)
        if (data.data.code == 1) {
          if (data.data.shipin.dengji == 1) {
            data.data.shipin.dengji = '入门'
          } else if (data.data.shipin.dengji == 2) {
            data.data.shipin.dengji = '中级'
          } else if (data.data.shipin.dengji == 3) {
            data.data.shipin.dengji = '高级'
          }
          that.setData({
            video: data.data.shipin,
          })
        }
      },
      fail(e) {
        wx.showModal({
          title: '错误',
          content: '连接服务器失败请稍后重试',
        })
      },
    })

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