App({
	onLaunch : function(e) {
		//console.log(e)
        var that=this
        wx.getSystemInfo({
            success: function(res) {
                that.globalData.windowWidth=res.windowWidth
                that.globalData.windowHeight=res.windowHeight
            },
        })
	},
	onShow:function(e){
		/*wx.setTabBarBadge({
			index: 1,
			text: '1'
		})*/
		//console.log(e)
		if(e.scene=="1011"){
			console.log("是扫码进去的")
			wx.setStorageSync('scanCode', true)
		}
		else{
			wx.setStorageSync('scanCode', false)
			if(e.scene=="1007" || e.scene=="1008"){
				console.log("是分享进去的")
			}
			else{
				console.log("不是分享进去的")
			}
		}
	},
	globalData:{
		domain:'http://221.122.101.72',
		edition:'',
		//imgPath:'http://work.qujie365.com/staticImg/SmallProgram/pic',
		//imgPath:'http://192.168.0.140:8080/WXApp/myDemo/img',
		imgPath:'../../img',
        localhostDomain:'http://192.168.0.140:8080/WXApp/myDemo/down/',
        windowWidth:0,
        windowHeight:0
	}
})