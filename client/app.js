//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    },
    globalData: {
        userInfo: null,
        apiUrl: 'http://192.168.23.223:3000'
    }
})