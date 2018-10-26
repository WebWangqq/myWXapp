var utils = require('../../utils/utils.js');


var locked=true
var page=0
var pageSize=20
var loadMore=function(that){
	if(locked==true){
		locked=false
		wx.request({
			url: demon + banbenid + '/Client/Groupon/getUnStartFreeProduct',
			data: {
				currentPage:page,
				pageSize:pageSize
			},
			header: {
				'content-type': 'application/json'
			},
			success: function (res) {
				console.log(res.data)
				if (res.data.success == "True") {
					if (res.data.totalCount > 0) {
						that.setData({
							haveData:true,
							noData:false
						})
						var loaddata=res.data.data
						var pageTotal = Math.ceil(res.data.totalCount / pageSize)
						if (page == 1) {
							var list = []
						}
						else {
							var list = that.data.listData
						}
						for(var i=0;i<loaddata.length;i++){
							
						}
						var newlist = list.concat(res.data.data)
						that.setData({
							listData: newlist
						})
						page++
						if (page <= pageTotal) {
							that.setData({
							  hasMore: true,
							  hasMore1: false,
							})
						}
						else {
							if (that.data.listData.length>3){
							  that.setData({
								hasMore: false,
								hasMore1: true
							  })
							}else{
							  that.setData({
								hasMore: false,
								hasMore1: false
							  })
							}
						}
					}
					else{
						that.setData({
							noData:true,
							havaData:false,
							hasMore:false,
							hasMore1:false
						})
					}
					
				}
			},
			fail: function () {
				locked=true
				wx.stopPullDownRefresh()
				wx.hideLoading()
			},
			complete: function () {
				locked=true
				wx.stopPullDownRefresh()
				wx.hideLoading()
			}
		})
	}
}

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		code:"123456789012",
		shopImg:[
			"http://api.qujie365.com/upload/a_banner_yi.png",
			"http://api.qujie365.com/upload/20180814161731297872.jpg",
		],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that=this
		that.setData({
			code:utils.formatCodeNum(that.data.code)
		})
	},
	previewImg:function(e){
		var that=this
		var index=e.currentTarget.dataset.index
		var ImgPath=that.data.shopImg
		wx.previewImage({
			current: ImgPath[index], 
			urls: ImgPath,
		})
	}
})