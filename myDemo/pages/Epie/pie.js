import * as echarts from '../../ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height) {
	chart = echarts.init(canvas, null, {
		width: width,
		height: height
	});
	canvas.setChart(chart);

	var option = {
		backgroundColor: "#ffffff",
		color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
		tooltip: {
			trigger: 'item',
			formatter: "{a}\n{b} : {c} ({d}%)"
		},
		/*legend: {
	        orient: 'vertical',
	        left:'left',
	        itemGap:10,
	        itemWidth:10,
	        itemHeight:10,
	        data:['北京','武汉','杭州','广州','上海']
	    },*/
		grid:{
			left: 0,
			right: 0,
			bottom: 0,
			top: 0,
			containLabel:true
		},
		series: [{
			label: {
				normal: {
					fontSize: 14
				}
			},
			type: 'pie',
			name: '访问来源',
			legendHoverLink:false,
			hoverAnimation:false, 
			center: ['50%', '50%'],
			radius: ['20%', '60%'],
			
			data: [{
				value: 55,
				name: '北京'
			}, {
				value: 20,
				name: '武汉'
			}, {
				value: 10,
				name: '杭州'
			}, {
				value: 20,
				name: '广州'
			}, {
				value: 38,
				name: '上海'
			}],
			label:{
				normal:{
					show:true,
					position:'outside',
					formatter:'{b}:{c}',
					fontSize:'14',
					align:'left',
					verticalAlign:'top'
				}
			},
			labelLine:{
				normal:{
					show:true,
					length:10,
					length2:20
				}
			},
			itemStyle: {
				
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 2, 2, 0.3)'
				}
			}
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