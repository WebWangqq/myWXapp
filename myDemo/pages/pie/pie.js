var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var pieChart = null;
Page({
    data: {},
    touchHandler: function(e) {
        console.log(pieChart)
        console.log(pieChart.getCurrentDataIndex(e));
    },
    onLoad: function(e) {
        var windowWidth = 320;
        var windoHeight = 320
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
            windoHeight = windowWidth * 50 / 75
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }

        pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'ring',
            series: [{
                name: '成交量1',
                data: 15,
                /*format: function(name) {
                return name
                },*/
                color: '#1170ce'
            }, {
                name: '成交量2',
                data: 35,
                /*format: function(name) {
                return name
                },*/
                color: '#6da30f'
            }, {
                name: '成交量3',
                data: 78,
                /*format: function(name) {
                return name
                },*/
                color: '#f59210'
            }],
            width: windowWidth,
            height: windoHeight,
            dataLabel: true,
        });
    }
});