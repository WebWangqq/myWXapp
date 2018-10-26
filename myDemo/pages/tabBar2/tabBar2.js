var utils = require('../../utils/utils.js');
var WxNotificationCenter = require('../../utils/WxNotificationCenter.js');
var app=getApp();
var leftW

var tabIndx=0
var swheights=[]

function tabCon(that){
	var typename
	that.setData({
		tabIndx: tabIndx,
		swheight:swheights[tabIndx]
	}, function() {
		if(tabIndx==0){
			typename='热门'
		}
		else{
			for(var i=0;i<that.data.shoptypeData.length;i++){
				if(tabIndx==i+1){
					typename=that.data.shoptypeData[i].Typename
				}
			}
		}
		wx.setNavigationBarTitle({
			title: typename
		})
		wx.createSelectorQuery().select('#tabIndx' + tabIndx).boundingClientRect(function(rect) {
			var left = rect.left
			var datascrollLeft = that.data.scrollLeftdata > 0 ? that.data.scrollLeftdata : 0
			that.setData({
				scrollLeftdata: datascrollLeft + left - leftW
			})
		}).exec()
	})
}
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tabIndx: 0,
		scrollLeftdata: 0,
		imgUrls: [
			'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
			'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
			'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
		],
		autoplay: false,
		shoptypeData: [
			{
				"ShopTypeID": 21,
				"Typename": "美食",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 134,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "小吃快餐",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 135,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "面包甜点",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 136,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "茶饮",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 137,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "中国地方菜",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 138,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "火锅",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 139,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "异国料理",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 140,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "零食特产",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 141,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "烧烤/烤肉",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 142,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "香锅",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 143,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "生鲜水果",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 144,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "自助餐",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 145,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "其他美食",
					"BigShopTypeID": 21
				}, {
					"SmallShopTypeID": 154,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "其他美食",
					"BigShopTypeID": 21
				}]
			}, {
				"ShopTypeID": 22,
				"Typename": "休闲娱乐",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 146,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "KTV",
					"BigShopTypeID": 22
				}, {
					"SmallShopTypeID": 147,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "游戏玩乐",
					"BigShopTypeID": 22
				}, {
					"SmallShopTypeID": 148,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "足疗按摩",
					"BigShopTypeID": 22
				}, {
					"SmallShopTypeID": 149,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "洗浴/汗蒸",
					"BigShopTypeID": 22
				}, {
					"SmallShopTypeID": 150,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "亲子玩乐",
					"BigShopTypeID": 22
				}, {
					"SmallShopTypeID": 151,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "酒吧",
					"BigShopTypeID": 22
				}, {
					"SmallShopTypeID": 152,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "茶馆相声",
					"BigShopTypeID": 22
				}, {
					"SmallShopTypeID": 153,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "私人影院",
					"BigShopTypeID": 22
				}]
			}, {
				"ShopTypeID": 23,
				"Typename": "运动健身",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 155,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "健身中心",
					"BigShopTypeID": 23
				}, {
					"SmallShopTypeID": 156,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "球类场馆",
					"BigShopTypeID": 23
				}, {
					"SmallShopTypeID": 157,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "游泳馆",
					"BigShopTypeID": 23
				}, {
					"SmallShopTypeID": 158,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "舞蹈",
					"BigShopTypeID": 23
				}, {
					"SmallShopTypeID": 159,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "溜冰场",
					"BigShopTypeID": 23
				}, {
					"SmallShopTypeID": 160,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "滑雪场",
					"BigShopTypeID": 23
				}, {
					"SmallShopTypeID": 161,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "射箭馆",
					"BigShopTypeID": 23
				}, {
					"SmallShopTypeID": 162,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "跆拳道馆",
					"BigShopTypeID": 23
				}]
			}, {
				"ShopTypeID": 24,
				"Typename": "生活健康",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 163,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "家政保洁",
					"BigShopTypeID": 24
				}, {
					"SmallShopTypeID": 164,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "洗衣护理",
					"BigShopTypeID": 24
				}, {
					"SmallShopTypeID": 165,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "鲜花",
					"BigShopTypeID": 24
				}, {
					"SmallShopTypeID": 166,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "体检",
					"BigShopTypeID": 24
				}, {
					"SmallShopTypeID": 167,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "齿科",
					"BigShopTypeID": 24
				}, {
					"SmallShopTypeID": 168,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "宠物服务",
					"BigShopTypeID": 24
				}, {
					"SmallShopTypeID": 169,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "汽车服务",
					"BigShopTypeID": 24
				}]
			}, {
				"ShopTypeID": 25,
				"Typename": "丽人",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 170,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "美发",
					"BigShopTypeID": 25
				}, {
					"SmallShopTypeID": 171,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "美容/SPA",
					"BigShopTypeID": 25
				}, {
					"SmallShopTypeID": 172,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "美甲/美睫",
					"BigShopTypeID": 25
				}, {
					"SmallShopTypeID": 173,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "祛痘脱毛",
					"BigShopTypeID": 25
				}, {
					"SmallShopTypeID": 174,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "纤瘦美体",
					"BigShopTypeID": 25
				}, {
					"SmallShopTypeID": 175,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "纹身",
					"BigShopTypeID": 25
				}, {
					"SmallShopTypeID": 176,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "彩妆造型",
					"BigShopTypeID": 25
				}]
			}, {
				"ShopTypeID": 26,
				"Typename": "教育培训",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 177,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "舞蹈培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 178,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "语言培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 179,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "音乐培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 180,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "美术培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 181,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "驾校培训",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 182,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "职业技能",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 183,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "升学辅导",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 184,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "兴趣生活",
					"BigShopTypeID": 26
				}]
			}, {
				"ShopTypeID": 27,
				"Typename": "周边游",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 177,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "周边游1",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 178,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "周边游2",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 179,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "周边游3",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 180,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "周边游4",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 181,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "周边游5",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 182,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "周边游6",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 183,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "周边游7",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 184,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "周边游8",
					"BigShopTypeID": 26
				}]
			}, {
				"ShopTypeID": 28,
				"Typename": "电影演出",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 177,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "电影演出1",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 178,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "电影演出2",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 179,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "电影演出3",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 180,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "电影演出4",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 181,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "电影演出5",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 182,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "电影演出6",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 183,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "电影演出7",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 184,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "电影演出8",
					"BigShopTypeID": 26
				}]
			}, {
				"ShopTypeID": 29,
				"Typename": "购物",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 177,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "购物1",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 178,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "购物2",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 179,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "购物3",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 180,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "购物4",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 181,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "购物5",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 182,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "购物6",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 183,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "购物7",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 184,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "购物8",
					"BigShopTypeID": 26
				}]
			}, {
				"ShopTypeID": 30,
				"Typename": "宠物",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 177,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "宠物1",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 178,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "宠物2",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 179,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "宠物3",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 180,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "宠物4",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 181,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "宠物5",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 182,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "宠物6",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 183,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "宠物7",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 184,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "宠物8",
					"BigShopTypeID": 26
				}]
			}, {
				"ShopTypeID": 31,
				"Typename": "亲子",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 177,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "亲子1",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 178,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "亲子2",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 179,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "亲子3",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 180,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "亲子4",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 181,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "亲子5",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 182,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "亲子6",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 183,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "亲子7",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 184,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "亲子8",
					"BigShopTypeID": 26
				}]
			}, {
				"ShopTypeID": 32,
				"Typename": "家装",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 177,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "家装1",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 178,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "家装2",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 179,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "家装3",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 180,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "家装4",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 181,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "家装5",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 182,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "家装6",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 183,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "家装7",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 184,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "家装8",
					"BigShopTypeID": 26
				}]
			}, {
				"ShopTypeID": 33,
				"Typename": "健康",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 177,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "健康1",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 178,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "健康2",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 179,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "健康3",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 180,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "健康4",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 181,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "健康5",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 182,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "健康6",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 183,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "健康7",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 184,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "健康8",
					"BigShopTypeID": 26
				}]
			}, {
				"ShopTypeID": 34,
				"Typename": "结婚",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 177,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "结婚1",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 178,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "结婚2",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 179,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "结婚3",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 180,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "结婚4",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 181,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "结婚5",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 182,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "结婚6",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 183,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "结婚7",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 184,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "结婚8",
					"BigShopTypeID": 26
				}]
			}, {
				"ShopTypeID": 35,
				"Typename": "爱车",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 177,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "爱车1",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 178,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "爱车2",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 179,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "爱车3",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 180,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "爱车4",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 181,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "爱车5",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 182,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "爱车6",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 183,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "爱车7",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 184,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "爱车8",
					"BigShopTypeID": 26
				}]
			}, {
				"ShopTypeID": 36,
				"Typename": "生活服务",
				"StereoBuildingBig": "",
				"SmallShopTypeList": [{
					"SmallShopTypeID": 177,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "生活服务1",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 178,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "生活服务2",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 179,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "生活服务3",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 180,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "生活服务4",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 181,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "生活服务5",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 182,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "生活服务6",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 183,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "生活服务7",
					"BigShopTypeID": 26
				}, {
					"SmallShopTypeID": 184,
					"TypeImg": "http://api.qujie365.com/upload/a_banner_yi.png",
					"TypeName": "生活服务8",
					"BigShopTypeID": 26
				}]
			}
		],
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this
		leftW = (wx.getSystemInfoSync().windowWidth) * 0.6
		if (options.index) {
			tabIndx = Number(options.index) + 1
			var typename = options.typename
			that.setData({
				tabIndx: tabIndx
			})
			wx.setNavigationBarTitle({
				title: typename
			})
			wx.createSelectorQuery().select('#tabIndx' + tabIndx).boundingClientRect(function(rect) {
				var left = rect.left
				that.setData({
					scrollLeftdata: that.data.scrollLeftdata + left - leftW
				})
			}).exec()
		}
	
		for(var i=0;i<that.data.shoptypeData.length+1;i++){
			if(i==tabIndx){
				wx.createSelectorQuery().select('#itemCon' + i).boundingClientRect(function(rect) {
					var height = rect.height
					that.setData({
						swheight:height
					})
				}).exec()
			}
			wx.createSelectorQuery().select('#itemCon' + i).boundingClientRect(function(rect) {
				var height = rect.height
				swheights.push(height)
				
			}).exec()

		}
	},
	bannerChange:function(e){
	    var that = this
	    tabIndx= e.detail.current
	    tabCon(that)
	},
	tabBarClick: function(e) {
		var that = this
		tabIndx = e.currentTarget.dataset.index
		tabCon(that)
	},
	tabBarScroll: function(e) {
		var that = this
		var scrollleft = e.detail.scrollLeft
		that.setData({
			scrollLeftdata: scrollleft
		})
	},
	onShow:function(){
		var that=this
		that.setData({
			autoplay:true
		})
	},
	onHide: function () {
	    var that=this
	    that.setData({
			autoplay:false
	    })
	  },
})