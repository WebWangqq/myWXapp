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
		appid: 'wx7dff9ebddae39af8',
    	secret: '3e9e9cff960f1b9bbe7f6eb88b2b95a4',
		domain:'http://221.122.101.72',
		edition:'',
		//imgPath:'http://work.qujie365.com/staticImg/SmallProgram/pic',
		//imgPath:'http://192.168.0.140:8080/WXApp/myDemo/img',
        windowWidth:0,
        windowHeight:0
	}
})