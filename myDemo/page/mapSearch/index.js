var utils = require('../../utils/utils');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
var qqmapsdk = new QQMapWX({
	key: 'SPCBZ-OQSCR-R7HWR-WQWPD-KFDEV-6GB67'
});


var app = getApp();
var inputVal

var mylat, mylon
var page
var pageSize = 20

//

var markersData = []
var markers = []
var markerId
var loadMore = function(that) {
	qqmapsdk.search({
		keyword: inputVal,
		//location:{latitude:mylat,longitude:mylon},
		page_size: pageSize,
		page_index: page,
		success: function(res) {
			console.log(res)
			if (res.count > 0) {
				console.log("有数据")
				if (that.data.showMap) {
					that.setData({
						haveData: false,
						noData: false
					})

				} else {
					that.setData({
						haveData: true,
						noData: false
					})

				}
				var loaddata = res.data
				var pageTotal = Math.ceil(res.count / pageSize)
				if (page == 1) {
					var list = []
				} else {
					var list = that.data.listData
				}
				for (var i = 0; i < loaddata.length; i++) {
					var location = loaddata[i].location
					var juliNum = utils.GetDistance(location.lat, location.lng, mylat, mylon) * 1
					loaddata[i].juli = utils.formatDistance(juliNum)
				}
				var newlist = list.concat(res.data)

				that.setData({
					listData: newlist
				})
				/*

				*/
				/**markers start**/
				markersData = that.data.listData
				markers = []
				for (var i = 0; i < markersData.length; i++) {
					var markname = markersData[i].title;
					var marklat = markersData[i].location.lat;
					var marklon = markersData[i].location.lng
					var info = {
						id: 0,
						iconPath: '../../img/map-marker.png',
						latitude: '',
						longitude: '',
						width: 30,
						height: 30,
					}
					info.id = i
					//info.iconPath='../../img/markers/map-marker'+(i+1)+'.png'
					info.latitude = marklat
					info.longitude = marklon
					markers.push(info)
				}
				that.setData({
					markers: markers
				})
				/**markers end**/

				page++
				if (page <= pageTotal) {
					that.setData({
						hasMore: true,
						hasMore1: false,
					})
				} else {
					if (that.data.listData.length > 3) {
						that.setData({
							hasMore: false,
							hasMore1: true
						})
					} else {
						that.setData({
							hasMore: false,
							hasMore1: false
						})
					}
				}
			} else {
				console.log("没数据")
				that.setData({
					noData: true,
					havaData: false,
					hasMore: false,
					hasMore1: false
				})
			}

		},
		fail: function(res) {
			//console.log(res);
		},
		complete: function(res) {
			//console.log(res);
			wx.stopPullDownRefresh()
		}
	});
}

function showMarkerDetail(that) {
	console.log(markers.length)
	for (var i = 0; i < markersData.length; i++) {
		if (markerId == i) {
			var juliNum = utils.GetDistance(markersData[i].location.lat, markersData[i].location.lng, mylat, mylon) * 1
			that.setData({
				//["markers["+i+"].iconPath"]:'../../img/markers/map-marker-cu'+(i+1)+'.png', 
				["markers[" + i + "].iconPath"]: '../../img/map-marker-cu.png',
				name: markersData[i].title,
				address: markersData[i].address,
				tel: markersData[i].tel,
				currentLon: markersData[i].location.lng,
				currentLat: markersData[i].location.lat,
				category: markersData[i].category,
				juli: utils.formatDistance(juliNum)
			})
		} else {
			that.setData({
				//["markers["+i+"].iconPath"]:'../../img/markers/map-marker'+(i+1)+'.png', 
				["markers[" + i + "].iconPath"]: '../../img/map-marker.png',
			})
		}
	}
	that.setData({
		showModal: true,
	})
}
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		mylat: 39.909210,
		mylon: 116.398773,
		scale: 12,
		showMap: true,
		showModal: false
	},
	onLoad: function(options) {
		var that = this
		var windowHeight = wx.getSystemInfoSync().windowHeight
		that.setData({
			mapHeight: windowHeight,
		})
		wx.getLocation({
			type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
			altitude: false, // 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
			success: (res) => {
				mylat = res.latitude // 纬度，浮点数，范围为-90~90，负数表示南纬
				mylon = res.longitude // 经度，浮点数，范围为-180~180，负数表示西经
				that.setData({
					mylon: mylon,
					mylat: mylat,
					scale: 12
				})
			},
			fail: (res) => {

			},
			complete: (res) => {

			}
		})
	},

	inputTxt: function(e) {
		var that = this
		inputVal = e.detail.value.replace(/\s+/g, "")
		console.log(inputVal)
	},
	/*search:function(){
	var that=this
	qqmapsdk.getSuggestion({
	keyword: inputVal,
	success: function(res) {
	console.log(res);
	that.setData({
	listData:res.data
	})
	},
	fail: function(res) {
	console.log(res);
	},
	complete: function(res) {
	console.log(res);
	}
	});
	},*/
	searchBtnClick: function() {
		var that = this
		page = 1
		markersData = []
		markers = []
		that.setData({
			showModal: false
		})
		loadMore(that)


	},
	onPullDownRefresh: function() {
		var that = this
		page = 1
		loadMore(that)

	},
	onReachBottom: function() {
		var that = this
		loadMore(that)
	},
	dadianhua: function(e) {
		var tel = e.currentTarget.dataset.tel
		var tel1 = tel.split(";")
		wx.makePhoneCall({
			phoneNumber: tel1[0],
		})
	},
	markertap: function(e) {
		var that = this
		//console.log(e.markerId)
		console.log(e)
		markerId = e.markerId
		showMarkerDetail(that)
	},
	seeMore: function() {
		var that = this
		that.setData({
			showMap: false
		})
		loadMore(that)
	},
	markerDetail: function(e) {
		var that = this
		markerId = e.currentTarget.dataset.index
		that.setData({
			showMap: true,
			haveData: false
		})
		showMarkerDetail(that)
	},

	hideModal: function() {
		var that = this
		for (var i = 0; i < markers.length; i++) {
			that.setData({
				["markers[" + i + "].iconPath"]: '../../img/map-marker.png',
			})
		}
		that.setData({
			showModal: false,
		})
	},
	daohang: function(e) {
		var that = this
		var currentAddress = that.data.address
		var currentLon = that.data.currentLon
		var currentLat = that.data.currentLat
		wx.getLocation({
			type: 'gcj02',
			success: function(res) {
				wx.openLocation({
					latitude: Number(currentLat),
					longitude: Number(currentLon),
					address: currentAddress
				})
			}
		})
	}

})