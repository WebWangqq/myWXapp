var utils = require('../../utils/utils.js');
var WxNotificationCenter = require('../../utils/WxNotificationCenter.js');
var app=getApp();

Page({

    /**
    * 页面的初始数据
    */
    data: {
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
            url: '/pagesEcharts/bar/bar'
        })
    },
    toline:function(){
        wx.navigateTo({
            url: '/pagesEcharts/line/line'
        })
    },
    topie:function(){
        wx.navigateTo({
            url: '/pagesEcharts/pie/pie'
        })
    },
})
