var wxCharts = require('../../utils/wxcharts.js');
var app=getApp();
var columnChart
Page({

    /**
     * 页面的初始数据
     */
    data: {
        main: {
            title: '总成交量',
            data: [15, 20, 45, 37],
            categories: ['2012', '2013', '2014', '2015']
        },

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that=this
        var windowWidth = app.globalData.windowWidth;
        var windoHeight=windowWidth*50/75
        /*try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
            windoHeight =windowWidth*50/75
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }*/
        columnChart = new wxCharts({
            canvasId: 'columnCanvas',
            type: 'column',
            animation: true,
            categories: that.data.main.categories,

            series: [{
                name: '成交量',
                color:'#6da30f',
                data:  that.data.main.data,
                format: function(val) {
                    return val.toFixed(2) + '万';
                }
            }],
            yAxis: {
                format: function(val) {
                    return val + '万';
                },
                title: 'hello',
                titleFontColor:'#f00',
                min: 0,
                max:50,
                gridColor:'#ccc',
                disabled:false
            },
            xAxis: {
                disableGrid: false,
                type: 'calibration'
            },
            extra: {
                column: {
                    width: 20
                },
                //legendTextColor:'#6da30f'
            },
            width: windowWidth,
            height: windoHeight,
        });
    },
})