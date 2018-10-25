var utils = require('../../utils/utils');
var app=getApp()
var startX,delBtnWidth=55
Page({

    /**
     * 页面的初始数据
     */
    data: {
        messageInfo:[
            {
                text:'1之前一直以为微信小程序按钮点击事件传参是和web端相同，即在事件中写明所传递的参数即可，但是这样尝试过以后发现小程序的控制台报错'
            },
            {
                text:'2之前一直以为微信小程序按钮点击事件传参是和web端相同，即在事件中写明所传递的参数即可，但是这样尝试过以后发现小程序的控制台报错'
            },
            {
                text:'3之前一直以为微信小程序按钮点击事件传参是和web端相同，即在事件中写明所传递的参数即可，但是这样尝试过以后发现小程序的控制台报错'
            }
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    touchS: function (e) {
        // console.log("touchS")
        // console.log(e)
        //判断是否只有一个触摸点
        if (e.touches.length == 1) {
            //记录触摸起始位置的X坐标
            startX=e.touches[0].clientX
        }
    },
    //触摸时触发，手指在屏幕上每移动一次，触发一次
    //
    touchM: function (e) {
        //console.log("touchM:" + e);
        var that = this
        if (e.touches.length == 1) {
            //记录触摸点位置的X坐标
            var moveX = e.touches[0].clientX;
            //计算手指起始点的X坐标与当前触摸点的X坐标的差值
            var disX = startX - moveX;
            //delBtnWidth 为右侧按钮区域的宽度

            var txtStyle = "";
            if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
                txtStyle = "left:0px";
            } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
                txtStyle = "left:-" + disX + "px";
                if (disX >= delBtnWidth) {
                    //控制手指移动距离最大值为删除按钮的宽度
                    txtStyle = "left:-" + delBtnWidth + "px"
                }
            }
            //获取手指触摸的是哪一个item
            //
            var index = e.currentTarget.dataset.index;
            var list = that.data.messageInfo;
            //将拼接好的样式设置到当前item中

            list[index].txtStyle = txtStyle;
            //更新列表的状态
            //
            this.setData({
                messageInfo: list
            })
        }
    },
    touchE: function (e) {
        //console.log("touchE" + e);
        //console.log("touchEnd")
        //console.log(e)
        var that = this
        if (e.changedTouches.length == 1) {
          //手指移动结束后触摸点位置的X坐标
            var endX = e.changedTouches[0].clientX;
            //触摸开始与结束，手指移动的距离
            var disX = startX - endX;

            //如果距离小于删除按钮的1/2，不显示删除按钮
            var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
            //获取手指触摸的是哪一项
            var index = e.currentTarget.dataset.index;
            var list = that.data.messageInfo;
            /*for(var i=0;i<=list.length;i++){
                list[i].txtStyle=''
            }*/
            //
            list[index].txtStyle = txtStyle;
            //更新列表的状态
            that.setData({
                messageInfo: list
            })
        }
    },
    deleteItem:function(e){
        var that=this
        var index = e.currentTarget.dataset.index
        var messageInfo=that.data.messageInfo
        messageInfo.splice(index,1)
        //console.log("删除第几条信息"+index)
        that.setData({
            messageInfo:messageInfo
        })
    },
    
})