var utils = require('../../utils/utils.js');
var WxNotificationCenter = require('../../utils/WxNotificationCenter.js');
var app=getApp();

var telVal=''

/*
倒计时
*/
var countdown=60;
var timer=null;
function runbanktime(that){
    that.setData({
        sendCode:'',
        colorGray:false,
        yzmText:'重新发送('+countdown+')'
    })
    timer =setInterval(function(){
        countdown--
        if(countdown==0){
            that.setData({
                yzmText:'重新获取',
                sendCode:'sendCode',
                colorGray:true
            })
            countdown=60
            clearInterval(timer)
            timer=null
        }
        else{
            that.setData({
                yzmText:'重新发送('+utils.formatNumber(countdown)+')'
            })
        }
    }, 1000);
}


Page({

    /**
    * 页面的初始数据
    */
    data: {
        index:0,
        pickerData:["身份证","护照","外国人居住证","港澳居民来往内地身份证","台湾居民来往大陆通行证"],
        yzmText:'获取验证码',
        sendCode:'sendCode',
        toH5:false
    },
    bindPickerChange:function(e){
        this.setData({
            index:e.detail.value
        })
    },

    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
        var that=this
        // WxNotificationCenter.postNotificationName('NotificationName',obj)
        // WxNotificationCenter.addNotification('NotificationName', that.didNotification, that)
        //WxNotificationCenter.addNotification('NotificationName', that.didNotification, that)
    },
    didNotification: function () {
        //更新数据
        this.setData({
              
        })
    },
    /**
    * 生命周期函数--监听页面显示
    */
    onShow: function () {

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
    onShareAppMessage: function (res) {
        if (res.from == "button"){
            console.log(res)
        }
        return{
            title:'自定义标题',
            path:'/page/demo/demo',
            success:function(ress){
                console.log(ress)
            },
            fail:function(ress){
                console.log(ress)
            }
        }
    },
    inputTel:function(e){
        var that=this
        telVal=e.detail.value
        that.setData({
            telVal:utils.formatMobile(telVal),
            isTel:utils.isMobile(telVal),
            colorGray:utils.isMobile(telVal)
        })
    },
    inputYzm:function(e){
        var that=this
        that.setData({
            isYzm:e.detail.value.length==6
        })
    },
    inputPassword:function(e){
        var that=this
        that.setData({
            isPassword:e.detail.value.length>=6
        })
    },
    sendCode:function(){
        var that=this
        that.setData({
            yzmVal:''
        })
        if(utils.isMobile(telVal)){
            runbanktime(that)
        }
        else{
            utils.showTipBox(that,'请输入正确手机号')
        }
    },
    next:function(){
        var that=this
        //console.log("下一步")
        if(that.data.isTel!=true){
            utils.showTipBox(that,'请输入正确手机号')
        }
    }
})
