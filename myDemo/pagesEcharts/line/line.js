import * as echarts from '../ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height) {
    chart = echarts.init(canvas, null, {
        width: width,
        height: height
    });
    canvas.setChart(chart);

    var option = {
        backgroundColor:"#ffffff",
        /*title: {
            text: '测试下面legend的红色区域不应被裁剪',
            left: 'center'
        },*/
        color: ["#37A2DA", "#67E0E3"],
        legend: {
            data: ['A', 'B', 'C'],
            top: 0,
            left: 'center',
            z: 100
        },
        grid: {
            left: 20,
            right: 20,
            bottom: 15,
            top: 40,
            containLabel: true
        },
        tooltip: {
            show: true,
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            // show: false
        },
        yAxis: {
            x: 'center',
            type: 'value',
            splitLine: {
                lineStyle: {
                    type: 'solid',
                    color:'#dcdcdc'
                }
            }
            // show: false
        },
        series: [{
            name: 'A',
            type: 'line',
            smooth: true,
            lineStyle:{
                width:1
            },
            areaStyle:{
                color:"#37A2DA"
            },
            data: [18, 36, 65, 30, 78, 40, 33]
        }, {
            name: 'B',
            type: 'line',
            smooth: true,
            lineStyle:{
                width:1
            },
            areaStyle:{
                color:"#67E0E3"
            },
            data: [12, 50, 51, 35, 70, 30, 20]
        }]
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
        setTimeout(function() {
            // 获取 chart 实例的方式
            console.log(chart)
        }, 2000);
    }
});