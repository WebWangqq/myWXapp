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
		
	},
	globalData:{

		domain:'',
		edition:'',
		//imgPath:'http://work.qujie365.com/staticImg/SmallProgram/pic',
		//imgPath:'http://192.168.0.140:8080/WXApp/myDemo/img',
        windowWidth:0,
        windowHeight:0
	}
})