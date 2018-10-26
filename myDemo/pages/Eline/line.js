import * as echarts from '../../ec-canvas/echarts';

let chart = null;
let legendData=[]
let seriesVal=[]
let colorsVal=[]

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
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        color: ["#f8e399", "#31c27c"],
        legend: {
            data: legendData,
            top: 10,
            left: 'center',
            z: 100
        },
        grid: {
            left: 20,
            right: 20,
            bottom: 40,
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
            name:'日期',
            nameLocation:'center',
            nameTextStyle:{
                color:'#f00',
                fontSize:'14',
                lineHeight:56,
                padding:[20,10,10,10]
            },
        },
        yAxis: {
            x: 'center',
            type: 'value',
            name:'销量(套)',
            nameLocation:'center',
            nameTextStyle:{
                color:'#f00',
                fontSize:'14',
            },
            nameGap:40,
            splitLine: {
                lineStyle: {
                    type: 'solid',
                    color:'#dcdcdc'
                }
            }
            // show: false
        },
        series: seriesVal
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
        myData:[
            {
                name:'意向',
                color:'#f8e399',
                data:[1320, 1132, 601, 234, 120, 90, 20]
            },
            {
                name:'预购',
                color:'#31c27c',
                data:[30, 182, 434, 791, 390, 30, 10]
            },
            {
                name:'成交',
                color:'#ff0000',
                data:[10, 12, 21, 54, 260, 830, 710]
            }
        ],
        ec: {
            onInit: initChart
        }
    },
    onLoad:function(){
        var that=this
        var myData=that.data.myData
        for(var i=0;i<myData.length;i++){
            var aa={
                name: myData[i].name,
                type: 'line',
                smooth: true,
                hoverAnimation:true,
                //symbol:'none',
                itemStyle:{
                    normal:{
                        color:myData[i].color
                    }
                },
                lineStyle:{
                    color:myData[i].color,
                    width:1
                },
                //areaStyle 区域填充样式
                areaStyle:{
                    color:myData[i].color
                },
                data: myData[i].data,
                /*markPoint:{
                    symbol:'circle'
                }*/
            }
            seriesVal.push(aa)
            legendData.push(myData[i].name)
        }
    }
});