import * as echarts from '../../ec-canvas/echarts';

var app=getApp();

var chart = null;

function initChart(canvas, width, height) {
    chart = echarts.init(canvas, null, {
        width: width,
        height: height
    });
    canvas.setChart(chart);

    var option = {
        backgroundColor:'#ffffff',
        /*title: {
            text: '某楼盘销售情况',
            subtext: '纯属虚构',
        },*/
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'//line,shadow,cross
            }
        },
        legend: {
            data: ['系列1', '系列2', '系列3']
        },
        grid:{
            left: 20,
            right: 20,
            bottom: 20,
            top: 40,
            containLabel:true
        },
        xAxis: {
            data: ['1月', '2月', '3月', '4月', '5月', '6月'],
            type: 'category',
            axisLabel:{
                align:'center'
            },
            axisLine:{
                lineStyle:{
                    color:'#333'
                }
            },
        },
        yAxis: {
            type:'value',
            //name: '人数',
            min: 0,
            max: 120,
            interval: 20,
            axisLabel: {
                formatter: '{value} 人'
            },
            axisLine:{
                lineStyle:{
                    color:'#333'
                }
            },
            splitLine: {
                show: true,
                lineStyle:{
                    color:'#ccc'
                }
            }
        },
        animationDurationUpdate: 1200,
        series: [{
            name:'系列1',
            type: 'bar',
            label:{
                normal:{
                    show:false,
                    position:'top',
                    formatter:'{c}'
                }
            },
            itemStyle:{
                normal:{
                    //color:'#1170ce'
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#1170ce'}
                        ]
                    )
                }
            },
            barWidth: 10,
            data: [100, 30, 50, 60,40,80]
        }, {
            name:'系列2',
            type: 'bar',
            barWidth: 10,
            label:{
                normal:{
                    show:false,
                    position:'top',
                    formatter:'{c}'
                }
            },
            itemStyle:{
                normal:{
                    color:'#6da30f'
                }
            },
            data: [45, 60, 13, 25,30,50,55]
        }, {
            name:'系列3',
            type: 'bar',
            barWidth: 10,
            label:{
                normal:{
                    show:false,
                    position:'top',
                    formatter:'{c}'
                }
            },
            itemStyle:{
                normal:{
                    color:'#f59210'
                }
            },
            data: [10, 30, 33, 21,40,20]
        }],
        //color:['#1170ce','#6da30f','#f59210']
    };

    chart.setOption(option);
    return chart;
}

Page({
    onShareAppMessage: function(res) {
        return {
            title: 'ECharts 可以在微信小程序中使用啦！',
            path: '/pages/index/index',
            success: function() {},
            fail: function() {}
        }
    },
    data: {
        ec: {
            onInit: initChart
        }
    },

    onReady() {
        var that=this
        console.log(app.globalData.windowWidth)
    }
});