var utils = require('../../utils/utils');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
var app = getApp();

var qqmapsdk = new QQMapWX({
	key: 'SPCBZ-OQSCR-R7HWR-WQWPD-KFDEV-6GB67'
});


Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that=this
		qqmapsdk.getCityList({
			success:function(res){
				console.log(res.result[0])
				that.setData({
					cityData:res.result[0]
				})
			}
		})
	},
	toDetail:function(e){
		var that=this
		var id=e.currentTarget.dataset.id
		console.log(id)
		wx.navigateTo({
			url: '../mapCityDetail/mapCityDetail?id='+id
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})