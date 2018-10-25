var utils = require('../../utils/utils.js');
var WxNotificationCenter = require('../../utils/WxNotificationCenter.js');
var app = getApp();




Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		swiperCurrent: 0,
		myswiperCurrent1: 0,
		myswiperCurrent2: -1,
		zindex1: 5,
		zindex2: 4,
		mydata: [
			[{
					img: 'http://api.qujie365.com/upload/abbreviationsImg/20180808162034245161.jpg',
					name: '小猪1'
				},
				{
					img: 'http://api.qujie365.com/upload/abbreviationsImg/20180808162157830108.jpg',
					name: '小猪2'
				}
			],
			[{
					img: 'http://api.qujie365.com/upload/abbreviationsImg/20180808111658947961.jpg',
					name: '小猪3'
				},
				{
					img: 'http://api.qujie365.com/upload/abbreviationsImg/20180808111641756730.jpg',
					name: '小猪4'
				}
			],
			[{
					img: 'http://api.qujie365.com/upload/abbreviationsImg/20180808111623300898.jpg',
					name: '小猪5'
				},
				{
					img: 'http://api.qujie365.com/upload/abbreviationsImg/20180808111605953668.jpg',
					name: '小猪6'
				}
			],
			[{
					img: 'http://api.qujie365.com/upload/abbreviationsImg/20180808111658947961.jpg',
					name: '小猪7'
				},
				{
					img: 'http://api.qujie365.com/upload/abbreviationsImg/20180808111641756730.jpg',
					name: '小猪8'
				}
			],
			[{
					img: 'http://api.qujie365.com/upload/abbreviationsImg/20180808111658947961.jpg',
					name: '小猪9'
				},
				{
					img: 'http://api.qujie365.com/upload/abbreviationsImg/20180808111641756730.jpg',
					name: '小猪10'
				}
			],
			[{
					img: 'http://api.qujie365.com/upload/abbreviationsImg/20180808111623300898.jpg',
					name: '小猪11'
				},
				{
					img: 'http://api.qujie365.com/upload/abbreviationsImg/20180808111605953668.jpg',
					name: '小猪12'
				}
			],
		]
	},
	bannerChange: function(e) {
		var that = this
		that.setData({
			swiperCurrent: e.detail.current
		})
	},
	stopTouchMove: function(e) {
		console.log(e)
		return false
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this


		var itemH = wx.getSystemInfoSync().windowWidth * 240 / 750

		var animation1 = wx.createAnimation({
			duration: 500,
			timingFunction: 'ease-out',
		})
		/*that.animation1 = animation1
		that.setData({
			animationData1: animation1.export()
		})*/

		var animation2 = wx.createAnimation({
			duration: 500,
			timingFunction: 'ease-out',
		})
		/*that.animation2 = animation2
		that.setData({
			animationData2: animation2.export()
		})*/

		var len = that.data.mydata.length
		var index1 = 0
		var index2 = 0
		var zindex1 = 5
		var zindex2 = 4

		setInterval(function() {
			if (index1 < len) {
				index1++
				if (index1 == len) {
					zindex1 = 4
					zindex2 = 5

					index2 = 0
				} else {
					index2 = -1
				}

				animation1.translateY(-itemH * index1).step()
				animation2.translateY(-itemH * index2).step()
			} else {
				index2++
				if (index2 == len) {
					index1 = 0
					zindex1 = 5
					zindex2 = 4
					animation1.translateY(0).step()
				} else {

					animation1.translateY(itemH).step()
				}
				animation2.translateY(-itemH * index2).step()
			}
			that.setData({
				zindex1: zindex1,
				zindex2: zindex2,
				animationData1: animation1.export(),
				animationData2: animation2.export(),
				myswiperCurrent1: index1,
				myswiperCurrent2: index2,
			})

		}, 2000)


	}
})