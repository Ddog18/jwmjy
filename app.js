//app.js
App({

  userinfo: null,
  //微信登录
  onLaunch: function () {
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示', content: '新版本已经准备好，是否重启应用？', success: function (res) {
          if (res.confirm) {                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {    // 新的版本下载失败
      wx.showModal({ title: '更新提示', content: '新版本下载失败', showCancel: false })
    })
  },

  globalData: {
    userInfo: null,
    // url:'http://192.168.0.106:8080'
    url:'http://39.106.9.90:8080/jeesite'
  }

})