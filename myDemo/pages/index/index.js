var utils = require('../../utils/utils.js');
var WxNotificationCenter = require('../../utils/WxNotificationCenter.js');
var app=getApp();

Page({

    /**
    * 页面的初始数据
    */
    data: {
    },
    onLoad:function(){
        var that=this
        //utils.showTipBox(that,'请输入正确手机号')
    },
    todemo:function(){
        wx.navigateTo({
            url: '../demo/demo',
        })
    },
    toForm:function(){
        wx.navigateTo({
            url: '../form/form',
        })
    },
    toListDelete:function(){
        wx.navigateTo({
            url: '../listDelete/listDelete',
        })
    },
    toSearch:function(){
        wx.navigateTo({
            url: '../search/search'
        })
    },
    totabBar:function(){
        wx.navigateTo({
            url: '../tabBar/tabBar'
        })
    },
    totabBar2:function(){
        wx.navigateTo({
            url: '../tabBar2/tabBar2'
        })
    },
    tomap:function(){
        wx.navigateTo({
            url: '../map/map'
        })
    },
    tobar:function(){
        wx.navigateTo({
            url: '../Ebar/bar'
        })
    },
    toline:function(){
        wx.navigateTo({
            url: '../Eline/line'
        })
    },
    topie:function(){
        wx.navigateTo({
            url: '../Epie/pie'
        })
    },
    tochartsbar:function(){
        wx.navigateTo({
            url: '../bar/bar'
        })
    },
    tochartsline:function(){
        wx.navigateTo({
            url: '../line/line'
        })
    },
    tochartspie:function(){
        wx.navigateTo({
            url: '../pie/pie'
        })
    }
})
