var utils = require('../../utils/utils');
var app=getApp();

var windowWidth
var imgTotal,swiperCurrent
var setImgNum=6
var removeLeft=156
Page({
	data:{
		speciality:[
			{
				imgsrcSamll:'http://192.168.1.233:1799/upload/abbreviationsImg/20180426161425019919.jpg',
				imgsrc:'http://192.168.1.233:1799/upload/20180426161425019919.jpg',
				name:"锅包肉1",
				price:"123元",
				liyou:"好吃，特好吃",
				biaoqian:"店长推荐"
			}
			,
			{
				imgsrcSamll:'http://192.168.1.233:1799/upload/abbreviationsImg/20180426161426440274.jpg',
				imgsrc:'http://192.168.1.233:1799/upload/20180426161426440274.jpg',
				name:"锅包肉2",
				price:"123元",
				liyou:"好吃，特好吃",
				biaoqian:"店长推荐"
			},
			{
				imgsrcSamll:'http://192.168.1.233:1799/upload/abbreviationsImg/20180426161427108755.jpg',
				imgsrc:'http://192.168.1.233:1799/upload/20180426161427108755.jpg',
				name:"锅包肉3",
				price:"123元",
				liyou:"好吃，特好吃",
				biaoqian:"桌桌必点"
			},
			{
				imgsrcSamll:'http://192.168.1.233:1799/upload/abbreviationsImg/20180426161427782275.jpg',
				imgsrc:'http://192.168.1.233:1799/upload/20180426161427782275.jpg',
				name:"锅包肉4",
				price:"123元",
				liyou:"好吃，特好吃",
				biaoqian:""
			},
			{
				imgsrcSamll:'http://192.168.1.233:1799/upload/abbreviationsImg/20180426161426440274.jpg',
				imgsrc:'http://192.168.1.233:1799/upload/20180426161426440274.jpg',
				name:"锅包肉5",
				price:"123元",
				liyou:"好吃，特好吃",
				biaoqian:""
			},
			{
				imgsrcSamll:'http://192.168.1.233:1799/upload/abbreviationsImg/20180426161427108755.jpg',
				imgsrc:'http://192.168.1.233:1799/upload/20180426161427108755.jpg',
				name:"锅包肉3",
				price:"123元",
				liyou:"好吃，特好吃",
				biaoqian:"桌桌必点"
			},
			{
				imgsrcSamll:'http://192.168.1.233:1799/upload/abbreviationsImg/20180421152827759910.jpg',
				imgsrc:'http://192.168.1.233:1799/upload/20180421152827759910.jpg',
				name:"锅包肉3",
				price:"123元",
				liyou:"好吃，特好吃",
				biaoqian:"桌桌必点"
			}
		],
		shopTel:"1517653223",
		showPreviewImgBox:false
		
	},
	onLoad : function(e) {
		//console.log(e)
        var that=this
        wx.getSystemInfo({
            success: function(res) {
                windowWidth=res.windowWidth
            },
        })
		wx.getSetting({
			success: function(res){
				if (res.authSetting['scope.userInfo']) {
					console.log("已经授权")
					that.setData({
						noAttention:false
					})
				}
				else{
					console.log("没有授权")
					that.setData({
						noAttention:true
					})
				}
			}
		})
	},
    bindGetUserInfo:function(e){
    	var that=this
    	if(e.detail.userInfo!=undefined && e.detail.userInfo!=''){
    		that.setData({
    			noAttention:false
    		})
    		
    	}
    	else{
    		utils.showTipBox(that,{
                title:'需要授权才能继续使用服务'
            })
    	}
    },
	onShow:function(){
		var that=this
		wx.setNavigationBarColor({
            frontColor: '#000000',
            backgroundColor: '#ffffff'
        })
		wx.setNavigationBarTitle({
            title: '趣街商家'
        })
        var specialityBig=that.data.speciality
        for(var i=0;i<specialityBig.length;i++){
        	specialityBig[i].loadComplete=false
        }
		that.setData({
			specialityBig:specialityBig
		})

		imgTotal=that.data.specialityBig.length
		var specialitySamll=that.data.speciality
		var specialitylist = []
		if(specialitySamll.length==8){
			for(var i=0;i<specialitySamll.length;i++){
				if(i<7){
					specialitySamll[i].specialityTap="previewSpecialImg"
				}
				else{
					specialitySamll[i].specialityTap="toTesetuijian"
				}
			}
			that.setData({
				specialitySamll:specialitySamll
			})
		}
		else{
			for(var j=0;j<specialitySamll.length;j++){
				specialitySamll[j].specialityTap="previewSpecialImg"
				
			}
			for(var i=specialitySamll.length;i<8;i++){
				if(i!=7){
					var html={imgsrcSamll:'../image/shop/a_zanwutuijian@2x.png',biaoqian:'',specialityTap:''}
				}
				else{
					var html={imgsrcSamll:'../image/shop/a_zanwutuijian@2x.png',biaoqian:'',specialityTap:'toTesetuijian'}
				}
				specialitylist.push(html)
			}
			that.setData({
				specialitySamll:specialitySamll.concat(specialitylist)
			})

		}
	},
    onShareAppMessage: function (res) {
        var that=this
        return {
            title: '文字内容',
            path: '/page/index',
            imageUrl: '../../img/imgerrors.png',
            success: function (res) {
                console.log("转发成功")
                that.setData({
                    shared:true,
                    openShare:''
                })
                
            },
            fail: function (res) {
                console.log("转发失败")
            }
        }
    },
	callUp:function(e){
		var shoptel=e.currentTarget.dataset.shopTel
		wx.makePhoneCall({
	    	phoneNumber: '13434343'
	    })
	},
	previewSpecialImg:function(e){
		var that=this
		var current=e.currentTarget.dataset.index
		if (current == setImgNum) {
            swiperCurrent = setImgNum
        }
		that.setData({
			showPreviewImgBox:true,
			current:current
		})
		wx.setNavigationBarTitle({
            title: (current+1)+'/'+imgTotal
        })
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#000'
        })
	},
	bigImgLoad:function(e){
		var that=this
		//console.log(that.data.specialityBig)
		var imgLoad=that.data.specialityBig
		for(var i=0;i<imgLoad.length;i++){
			imgLoad[i].loadComplete=true
		}
		that.setData({
			specialityBig:imgLoad
		})

	},
	hideimgpreview:function(){
		this.setData({
            showPreviewImgBox: false
        })
		wx.setNavigationBarColor({
            frontColor: '#000000',
            backgroundColor: '#ffffff'
        })
		wx.setNavigationBarTitle({
            title: '趣街商家'
        })
	},
	previewBigImg: function (e) {
		var that=this
		var current=e.currentTarget.dataset.src
		/*var urls = []
		for(var i=0;i<that.data.specialityBig.length;i++){
			urls.push(that.data.specialityBig[i].imgsrc)
		}
        console.log(current)*/
        wx.previewImage({
        	//current:current,
            urls: [current]
        })
    },
    toTesetuijian:function(){
    	wx.navigateTo({
            url: '../tesetuijian/tesetuijian'
        })
    },
    swiperChange:function(e){
    	swiperCurrent = e.detail.current
        console.log(swiperCurrent)
        wx.setNavigationBarTitle({
            title: (swiperCurrent+1)+'/'+imgTotal
        })
    },
    touchM: function (e) {
        if (swiperCurrent == setImgNum) {
            var that = this
            wx.createSelectorQuery().selectAll('#item'+setImgNum).boundingClientRect(function(rects){
                rects.forEach(function(rect){
                    var moveLeft=(-rect.left)*750/windowWidth    // 节点的左边界坐标
                    //console.log(moveLeft)
                    var moreStyle =moveLeft>0? "right:" + (-removeLeft+moveLeft) + "rpx;":"right:-"+removeLeft+"rpx"
                    var moreText=moveLeft>=removeLeft?"释放更多":"查看更多"
                    that.setData({
                        moreStyle: moreStyle,
                        moreText: moreText
                    })
                })
            }).exec()
        }
    },
    touchE: function (e) {
        if (swiperCurrent == setImgNum) {
            var that = this
            wx.createSelectorQuery().selectAll('#item'+setImgNum).boundingClientRect(function(rects){
                rects.forEach(function(rect){
                    var moveLeft=(-rect.left)*750/windowWidth    // 节点的左边界坐标
                    if(moveLeft>=removeLeft){
                        wx.navigateTo({
                            url: '../tesetuijian/tesetuijian'
                        })

                        that.setData({
                            showPreviewImgBox:false
                        })
                    }
                    var moreStyle = "right:-"+removeLeft+"rpx;";
                    that.setData({
                        moreStyle: moreStyle,
                        moreText: "查看更多"
                    })
                })
            }).exec()   
        }
    }
})
