var utils = require('../../utils/utils.js');
var WxNotificationCenter = require('../../utils/WxNotificationCenter.js');
var app=getApp();
var leftW

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


var load=function(that){
	wx.request({
		url: '',
		data: {
			
		},
		header: {
			'Content-Type': 'application/json'
		},
		success: (res) => {
			// 
			// 
			// 
		}, 	
		fail: (res) => {
			// 
		},
		complete: (res) => {
			// zenmekeyizhemeteng
			// 怎么可以这么疼啊
		}
	})
}


Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tabIndx: 0,
		scrollLeftdata: 0,
		swiperCurrent:0,
		myswiperCurrent:0,
		myswiperCurrent1:0,
		myswiperCurrent2:-1,
		
		shoptypeData: [
			{
				"ShopTypeID": 21,
				"Typename": "美食",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 134,
					"TypeImg": "",
					"TypeName": "小吃快餐",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 135,
					"TypeImg": "",
					"TypeName": "面包甜点",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 136,
					"TypeImg": "",
					"TypeName": "茶饮",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 137,
					"TypeImg": "",
					"TypeName": "中国地方菜",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 138,
					"TypeImg": "",
					"TypeName": "火锅",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 139,
					"TypeImg": "",
					"TypeName": "异国料理",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 140,
					"TypeImg": "",
					"TypeName": "零食特产",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 141,
					"TypeImg": "",
					"TypeName": "烧烤/烤肉",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 142,
					"TypeImg": "",
					"TypeName": "香锅",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 143,
					"TypeImg": "",
					"TypeName": "生鲜水果",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 144,
					"TypeImg": "",
					"TypeName": "自助餐",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 145,
					"TypeImg": "",
					"TypeName": "其他美食",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 154,
					"TypeImg": "",
					"TypeName": "其他美食",
					"BigShopTypeID": 21
				}]
			}, {
				"ShopTypeID": 22,
				"Typename": "休闲娱乐",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 146,
					"TypeImg": "",
					"TypeName": "KTV",
					"BigShopTypeID": 22
				}, {
					"SmallShopTypeID": 147,
					"TypeImg": "",
					"TypeName": "游戏玩乐",
					"BigShopTypeID": 22
				}, {
					"SmallShopTypeID": 148,
					"TypeImg": "",
					"TypeName": "足疗按摩",
					"BigShopTypeID": 22
				}, {
					"SmallShopTypeID": 149,
					"TypeImg": "",
					"TypeName": "洗浴/汗蒸",
					"BigShopTypeID": 22
				}, {
					"SmallShopTypeID": 150,
					"TypeImg": "",
					"TypeName": "亲子玩乐",
					"BigShopTypeID": 22
				}, {
					"SmallShopTypeID": 151,
					"TypeImg": "",
					"TypeName": "酒吧",
					"BigShopTypeID": 22
				}, {
					"SmallShopTypeID": 152,
					"TypeImg": "",
					"TypeName": "茶馆相声",
					"BigShopTypeID": 22
				}, {
					"SmallShopTypeID": 153,
					"TypeImg": "",
					"TypeName": "私人影院",
					"BigShopTypeID": 22
				}]
			}, {
				"ShopTypeID": 23,
				"Typename": "运动健身",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 155,
					"TypeImg": "",
					"TypeName": "健身中心",
					"BigShopTypeID": 23
				}, {
					"SmallShopTypeID": 156,
					"TypeImg": "",
					"TypeName": "球类场馆",
					"BigShopTypeID": 23
				}, {
					"SmallShopTypeID": 157,
					"TypeImg": "",
					"TypeName": "游泳馆",
					"BigShopTypeID": 23
				}, {
					"SmallShopTypeID": 158,
					"TypeImg": "",
					"TypeName": "舞蹈",
					"BigShopTypeID": 23
				}, {
					"SmallShopTypeID": 159,
					"TypeImg": "",
					"TypeName": "溜冰场",
					"BigShopTypeID": 23
				}, {
					"SmallShopTypeID": 160,
					"TypeImg": "",
					"TypeName": "滑雪场",
					"BigShopTypeID": 23
				}, {
					"SmallShopTypeID": 161,
					"TypeImg": "",
					"TypeName": "射箭馆",
					"BigShopTypeID": 23
				}, {
					"SmallShopTypeID": 162,
					"TypeImg": "",
					"TypeName": "跆拳道馆",
					"BigShopTypeID": 23
				}]
			}, {
				"ShopTypeID": 24,
				"Typename": "生活健康",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 163,
					"TypeImg": "",
					"TypeName": "家政保洁",
					"BigShopTypeID": 24
				}, {
					"SmallShopTypeID": 164,
					"TypeImg": "",
					"TypeName": "洗衣护理",
					"BigShopTypeID": 24
				}, {
					"SmallShopTypeID": 165,
					"TypeImg": "",
					"TypeName": "鲜花",
					"BigShopTypeID": 24
				}, {
					"SmallShopTypeID": 166,
					"TypeImg": "",
					"TypeName": "体检",
					"BigShopTypeID": 24
				}, {
					"SmallShopTypeID": 167,
					"TypeImg": "",
					"TypeName": "齿科",
					"BigShopTypeID": 24
				}, {
					"SmallShopTypeID": 168,
					"TypeImg": "",
					"TypeName": "宠物服务",
					"BigShopTypeID": 24
				}, {
					"SmallShopTypeID": 169,
					"TypeImg": "",
					"TypeName": "汽车服务",
					"BigShopTypeID": 24
				}]
			}, {
				"ShopTypeID": 25,
				"Typename": "丽人",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 170,
					"TypeImg": "",
					"TypeName": "美发",
					"BigShopTypeID": 25
				}, {
					"SmallShopTypeID": 171,
					"TypeImg": "",
					"TypeName": "美容/SPA",
					"BigShopTypeID": 25
				}, {
					"SmallShopTypeID": 172,
					"TypeImg": "",
					"TypeName": "美甲/美睫",
					"BigShopTypeID": 25
				}, {
					"SmallShopTypeID": 173,
					"TypeImg": "",
					"TypeName": "祛痘脱毛",
					"BigShopTypeID": 25
				}, {
					"SmallShopTypeID": 174,
					"TypeImg": "",
					"TypeName": "纤瘦美体",
					"BigShopTypeID": 25
				}, {
					"SmallShopTypeID": 175,
					"TypeImg": "",
					"TypeName": "纹身",
					"BigShopTypeID": 25
				}, {
					"SmallShopTypeID": 176,
					"TypeImg": "",
					"TypeName": "彩妆造型",
					"BigShopTypeID": 25
				}]
			}, {
				"ShopTypeID": 26,
				"Typename": "教育培训",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 177,
					"TypeImg": "",
					"TypeName": "舞蹈培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 178,
					"TypeImg": "",
					"TypeName": "语言培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 179,
					"TypeImg": "",
					"TypeName": "音乐培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 180,
					"TypeImg": "",
					"TypeName": "美术培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 181,
					"TypeImg": "",
					"TypeName": "驾校培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 182,
					"TypeImg": "",
					"TypeName": "职业技能",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 183,
					"TypeImg": "",
					"TypeName": "升学辅导",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 184,
					"TypeImg": "",
					"TypeName": "兴趣生活",
					"BigShopTypeID": 26
				}]
			}, {
				"ShopTypeID": 27,
				"Typename": "周边游",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 177,
					"TypeImg": "",
					"TypeName": "舞蹈培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 178,
					"TypeImg": "",
					"TypeName": "语言培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 179,
					"TypeImg": "",
					"TypeName": "音乐培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 180,
					"TypeImg": "",
					"TypeName": "美术培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 181,
					"TypeImg": "",
					"TypeName": "驾校培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 182,
					"TypeImg": "",
					"TypeName": "职业技能",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 183,
					"TypeImg": "",
					"TypeName": "升学辅导",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 184,
					"TypeImg": "",
					"TypeName": "兴趣生活",
					"BigShopTypeID": 26
				}]
			}, {
				"ShopTypeID": 28,
				"Typename": "电影演出",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 177,
					"TypeImg": "",
					"TypeName": "舞蹈培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 178,
					"TypeImg": "",
					"TypeName": "语言培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 179,
					"TypeImg": "",
					"TypeName": "音乐培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 180,
					"TypeImg": "",
					"TypeName": "美术培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 181,
					"TypeImg": "",
					"TypeName": "驾校培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 182,
					"TypeImg": "",
					"TypeName": "职业技能",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 183,
					"TypeImg": "",
					"TypeName": "升学辅导",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 184,
					"TypeImg": "",
					"TypeName": "兴趣生活",
					"BigShopTypeID": 26
				}]
			}, {
				"ShopTypeID": 29,
				"Typename": "购物",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 177,
					"TypeImg": "",
					"TypeName": "舞蹈培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 178,
					"TypeImg": "",
					"TypeName": "语言培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 179,
					"TypeImg": "",
					"TypeName": "音乐培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 180,
					"TypeImg": "",
					"TypeName": "美术培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 181,
					"TypeImg": "",
					"TypeName": "驾校培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 182,
					"TypeImg": "",
					"TypeName": "职业技能",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 183,
					"TypeImg": "",
					"TypeName": "升学辅导",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 184,
					"TypeImg": "",
					"TypeName": "兴趣生活",
					"BigShopTypeID": 26
				}]
			}, {
				"ShopTypeID": 30,
				"Typename": "宠物",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 177,
					"TypeImg": "",
					"TypeName": "舞蹈培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 178,
					"TypeImg": "",
					"TypeName": "语言培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 179,
					"TypeImg": "",
					"TypeName": "音乐培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 180,
					"TypeImg": "",
					"TypeName": "美术培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 181,
					"TypeImg": "",
					"TypeName": "驾校培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 182,
					"TypeImg": "",
					"TypeName": "职业技能",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 183,
					"TypeImg": "",
					"TypeName": "升学辅导",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 184,
					"TypeImg": "",
					"TypeName": "兴趣生活",
					"BigShopTypeID": 26
				}]
			}, {
				"ShopTypeID": 31,
				"Typename": "亲子",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 177,
					"TypeImg": "",
					"TypeName": "舞蹈培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 178,
					"TypeImg": "",
					"TypeName": "语言培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 179,
					"TypeImg": "",
					"TypeName": "音乐培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 180,
					"TypeImg": "",
					"TypeName": "美术培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 181,
					"TypeImg": "",
					"TypeName": "驾校培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 182,
					"TypeImg": "",
					"TypeName": "职业技能",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 183,
					"TypeImg": "",
					"TypeName": "升学辅导",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 184,
					"TypeImg": "",
					"TypeName": "兴趣生活",
					"BigShopTypeID": 26
				}]
			}, {
				"ShopTypeID": 32,
				"Typename": "家装",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 177,
					"TypeImg": "",
					"TypeName": "舞蹈培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 178,
					"TypeImg": "",
					"TypeName": "语言培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 179,
					"TypeImg": "",
					"TypeName": "音乐培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 180,
					"TypeImg": "",
					"TypeName": "美术培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 181,
					"TypeImg": "",
					"TypeName": "驾校培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 182,
					"TypeImg": "",
					"TypeName": "职业技能",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 183,
					"TypeImg": "",
					"TypeName": "升学辅导",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 184,
					"TypeImg": "",
					"TypeName": "兴趣生活",
					"BigShopTypeID": 26
				}]
			}, {
				"ShopTypeID": 33,
				"Typename": "健康",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 177,
					"TypeImg": "",
					"TypeName": "舞蹈培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 178,
					"TypeImg": "",
					"TypeName": "语言培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 179,
					"TypeImg": "",
					"TypeName": "音乐培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 180,
					"TypeImg": "",
					"TypeName": "美术培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 181,
					"TypeImg": "",
					"TypeName": "驾校培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 182,
					"TypeImg": "",
					"TypeName": "职业技能",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 183,
					"TypeImg": "",
					"TypeName": "升学辅导",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 184,
					"TypeImg": "",
					"TypeName": "兴趣生活",
					"BigShopTypeID": 26
				}]
			}, {
				"ShopTypeID": 34,
				"Typename": "结婚",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 177,
					"TypeImg": "",
					"TypeName": "舞蹈培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 178,
					"TypeImg": "",
					"TypeName": "语言培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 179,
					"TypeImg": "",
					"TypeName": "音乐培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 180,
					"TypeImg": "",
					"TypeName": "美术培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 181,
					"TypeImg": "",
					"TypeName": "驾校培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 182,
					"TypeImg": "",
					"TypeName": "职业技能",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 183,
					"TypeImg": "",
					"TypeName": "升学辅导",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 184,
					"TypeImg": "",
					"TypeName": "兴趣生活",
					"BigShopTypeID": 26
				}]
			}, {
				"ShopTypeID": 35,
				"Typename": "爱车",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 177,
					"TypeImg": "",
					"TypeName": "舞蹈培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 178,
					"TypeImg": "",
					"TypeName": "语言培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 179,
					"TypeImg": "",
					"TypeName": "音乐培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 180,
					"TypeImg": "",
					"TypeName": "美术培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 181,
					"TypeImg": "",
					"TypeName": "驾校培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 182,
					"TypeImg": "",
					"TypeName": "职业技能",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 183,
					"TypeImg": "",
					"TypeName": "升学辅导",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 184,
					"TypeImg": "",
					"TypeName": "兴趣生活",
					"BigShopTypeID": 26
				}]
			}, {
				"ShopTypeID": 36,
				"Typename": "生活服务",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 177,
					"TypeImg": "",
					"TypeName": "舞蹈培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 178,
					"TypeImg": "",
					"TypeName": "语言培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 179,
					"TypeImg": "",
					"TypeName": "音乐培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 180,
					"TypeImg": "",
					"TypeName": "美术培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 181,
					"TypeImg": "",
					"TypeName": "驾校培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 182,
					"TypeImg": "",
					"TypeName": "职业技能",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 183,
					"TypeImg": "",
					"TypeName": "升学辅导",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 184,
					"TypeImg": "",
					"TypeName": "兴趣生活",
					"BigShopTypeID": 26
				}]
			}
		],
		code:"123456789012",
		shopImg:[
			"http://api.qujie365.com/upload/a_banner_yi.png",
			"http://api.qujie365.com/upload/a_banner_yi.png",
		],
		animationData:{}
	},
	bannerChange:function(e){
		var that = this
		that.setData({
			swiperCurrent: e.detail.current
		})
	},
	stopTouchMove:function(e){
		console.log(e)
		//return false
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this
		leftW = (wx.getSystemInfoSync().windowWidth) * 0.6
		if (options.index) {
			var index = Number(options.index) + 1
			var typename = options.typename
			that.setData({
				tabIndx: index
			})
			wx.setNavigationBarTitle({
				title: typename
			})
			wx.createSelectorQuery().select('#tabIndx' + index).boundingClientRect(function(rect) {
				var left = rect.left
				that.setData({
					scrollLeftdata: that.data.scrollLeftdata + left - leftW
				})
			}).exec()
		}
		that.setData({
			code:utils.formatCodeNum(that.data.code)
		})
		console.log(utils.formatMobile("123456789012"))
		var i=0
		
		
		
		
		
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

	},
	tabBarClick: function(e) {
		var that = this
		var index = e.currentTarget.dataset.index
		var typename = e.currentTarget.dataset.typename
		that.setData({
			tabIndx: index
		}, function() {
			wx.setNavigationBarTitle({
				title: typename
			})
			wx.createSelectorQuery().select('#tabIndx' + index).boundingClientRect(function(rect) {
				var left = rect.left
				var datascrollLeft = that.data.scrollLeftdata > 0 ? that.data.scrollLeftdata : 0
				that.setData({
					scrollLeftdata: datascrollLeft + left - leftW
				})
			}).exec()
		})
	},
	tabBarScroll: function(e) {
		var that = this
		var scrollleft = e.detail.scrollLeft
		that.setData({
			scrollLeftdata: scrollleft
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