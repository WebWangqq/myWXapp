var utils = require('../../utils/utils');
var QQMapWX=require('../../utils/qqmap-wx-jssdk.min.js')
var app=getApp();

var qqmapsdk = new QQMapWX({
	key: 'SPCBZ-OQSCR-R7HWR-WQWPD-KFDEV-6GB67'
});

var mylat,mylon
var windowHeight
var markersData
var markers=[]

/*

*/

var inputVal
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		mylat:39.909210,
		mylon:116.398773,
		showModal:false,
		name:'河滨公园',
		address:'天津市滨海新区塘沽街中心路南端',
		markersData:[
			{
				"uploadimageurl": null,
				"url": "tjhp",
				"provinceId": 120000,
				"provinceName": null,
				"dealerCode": "CH1628",
				"lat": "39.160230",
				"lng": "117.365390",
				"tel": "022-84909955",
				"districtName": "东丽区",
				"referred": "天津汇普",
				"isOpen": "1",
				"dealerName": "天津市汇普汽车销售服务有限公司",
				"cityname": null,
				"districtId": 120110,
				"regionalId": 2,
				"regionalName": "二区",
				"macId": null,
				"lever": null,
				"cityid": 120100,
				"email": null,
				"mobile": null,
				"enName": null,
				"zipCode": null,
				"distance": 0.0,
				"address": "天津市东丽区空港汽车园中路1号",
				"verson": 0,
				"id": 1018
			}, {
				"uploadimageurl": "http://img20.auto318.com//company/6471/code2.jpg",
				"url": "tjhrt",
				"provinceId": 120000,
				"provinceName": null,
				"dealerCode": "CH1018",
				"lat": "39.709590",
				"lng": "117.339660",
				"tel": "022-59952929",
				"districtName": "宝坻区",
				"referred": "天津海润通",
				"isOpen": "1",
				"dealerName": "天津市海润通汽车贸易有限公司",
				"cityname": null,
				"districtId": 120115,
				"regionalId": 2,
				"regionalName": "二区",
				"macId": null,
				"lever": null,
				"cityid": 120100,
				"email": null,
				"mobile": null,
				"enName": null,
				"zipCode": null,
				"distance": 0.0,
				"address": "天津市宝坻区机动车交易市场西500米",
				"verson": 0,
				"id": 787
			}, {
				"uploadimageurl": "http://www.mychevy.com.cn/upload/2016-03-14/33739/2016-03-25/1458894083794.jpg",
				"url": "tjsl",
				"provinceId": 120000,
				"provinceName": null,
				"dealerCode": "CH1615",
				"lat": "39.207020",
				"lng": "117.212190",
				"tel": "022-26732673",
				"districtName": "北辰区",
				"referred": "天津四联",
				"isOpen": "1",
				"dealerName": "天津市四联汽车销售服务有限公司",
				"cityname": null,
				"districtId": 120113,
				"regionalId": 2,
				"regionalName": "二区",
				"macId": null,
				"lever": null,
				"cityid": 120100,
				"email": null,
				"mobile": null,
				"enName": null,
				"zipCode": null,
				"distance": 0.0,
				"address": "天津市北辰区普济河东道南侧（原新宜白大道南侧）",
				"verson": 0,
				"id": 16
			}, {
				"uploadimageurl": "http://img20.auto318.com//company/1817/code2.jpg",
				"url": "tjhd",
				"provinceId": 120000,
				"provinceName": null,
				"dealerCode": "CH1622",
				"lat": "38.989520",
				"lng": "117.268510",
				"tel": "022-87199088",
				"districtName": "西青区",
				"referred": "天津泓德",
				"isOpen": "1",
				"dealerName": "天津市泓德汽车贸易有限公司",
				"cityname": null,
				"districtId": 120111,
				"regionalId": 2,
				"regionalName": "二区",
				"macId": null,
				"lever": null,
				"cityid": 120100,
				"email": null,
				"mobile": null,
				"enName": null,
				"zipCode": null,
				"distance": 0.0,
				"address": "天津市西青经济开发区大寺高新技术产业园兴业道8号",
				"verson": 0,
				"id": 14
			}
		]
	}, 
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that = this

		windowHeight=wx.getSystemInfoSync().windowHeight
		//console.log(windowHeight-wx.getSystemInfoSync().windowWidth*18/75)
		that.setData({
			mapHeight:windowHeight,
			//modalMaskHeight:windowHeight*0.3
		})
		qqmapsdk.getCityList({
			success:function(res){
				console.log(res)
			}
		})
		qqmapsdk.getDistrictByCityId({
			id:"130500",
			success:function(res){
				console.log(res)
			}
		})

		wx.getLocation({
			type: 'gcj02',
			success: function(res) {
				console.log("开定位le")
				console.log(res)
				mylat = res.latitude
				mylon = res.longitude
				qqmapsdk.reverseGeocoder({
					location: {
						latitude: mylat,
						longitude: mylon
					},
					success: function(res) {
						console.log(res)
						that.setData({
							myAddress:"当前位置："+res.result.address
						})
					},
					fail: function(res) {
						console.log(res);
					},
					complete: function(res) {
						console.log(res);
					}
				});
				that.setData({
					mylon:mylon,
					mylat:mylat,
					scale:12,
					/*circles:[{
						latitude:mylat,
						longitude:mylon,
						color:'#FF0000DD',
						fillColor:'#7cb5ec88',
						radius:3000,
						strokeWidth:1
					}]*/
					/*polygons:[{
						points:[
							{latitude: 39.165991, longitude: 117.372355},
							{latitude: 39.716323, longitude: 117.346915},
							{latitude: 39.213131, longitude: 117.219071},
							{latitude: 38.997137, longitude: 117.274892}
						],
						strokeWidth:1,
						strokeColor:'#FF0000DD',
						fillColor:'#7cb5ec88',
					}]*/
				})
			},
			fail: function() {
				console.log("未开定位lalla")
				mylat = 0
				mylon = 0
				that.setData({
					myAddress:"您目前未开定位,请开定位"
				})
			}
		})
		markersData=that.data.markersData
		for(var i=0;i<markersData.length;i++){
			var markname=markersData[i].dealerName;
			var marklat=markersData[i].lat;
			var marklon=markersData[i].lng
			var info={
				id: 0,
				iconPath:'../../img/map-marker.png',
				latitude: '',
				longitude: '',
				width: 30,
				height: 30,
				/*callout:{
					content:'',
					padding:10,
					display:"BYCLICK",//BYCLICK,ALWAYS
					textAlign:'center',
					borderRadius:'10',
					bgColor:'#ffffff',
					color:'#ff0000'
				},*/
				
			}
			info.id=i
			info.iconPath='../../img/markers/map-marker'+(i+1)+'.png'
			info.latitude=marklat
			info.longitude=marklon
			//info.callout.content=markname
			markers.push(info)
		}
		console.log(markers)
		that.setData({
			markers:markers
		})
	},
	markertap:function(e){
		var that=this
		//console.log(e.markerId)
		console.log(e)
		var markerId=e.markerId
		for(var i=0;i<markersData.length;i++){
			if(markerId==i){
				var juliNum=utils.GetDistance(markersData[i].lat,markersData[i].lng,mylat,mylon)*1
				that.setData({
					["markers["+i+"].iconPath"]:'../../img/markers/map-marker-cu'+(i+1)+'.png',  
					name:markersData[i].dealerName,
					address:markersData[i].address,
					currentLon:markersData[i].lng,
					currentLat:markersData[i].lat,
					juli:utils.formatDistance(juliNum)
				})
			}
			else{
				that.setData({
					["markers["+i+"].iconPath"]:'../../img/markers/map-marker'+(i+1)+'.png', 
				})
			}
		}
		that.setData({
			showModal:true,
			//mapHeight:windowHeight-wx.getSystemInfoSync().windowWidth*18/75
		})
	},
	hideModal:function(){
		var that=this
		for(var i=0;i<markers.length;i++){
			that.setData({
				["markers["+i+"].iconPath"]:'../../img/markers/map-marker'+(i+1)+'.png', 
			})
		}
		that.setData({
			showModal:false,
			//mapHeight:windowHeight
		})
	},
	daohang:function(e){
		var that=this
		var currentAddress=that.data.address
		var currentLon=that.data.currentLon
		var currentLat=that.data.currentLat
		wx.getLocation({
			type:'gcj02',
			success:function(res){
				wx.openLocation({
					latitude:Number(currentLat),
					longitude:Number(currentLon),
					address:currentAddress
				})
			}
		})
	},
	tomapSearch:function(){
		wx.navigateTo({
			url: '../mapSearch/index'
		})
	}
})
/*

*/
