

var mylat,mylon
var tolat,tolon
var type
var luxian=function(that){
	var opt={
		//WebService请求地址，from为起点坐标，to为终点坐标，开发key为必填
		url: 'https://apis.map.qq.com/ws/direction/v1/'+type+'/?from='+mylat+','+mylon+'&to='+tolat+','+tolon+'&key=SPCBZ-OQSCR-R7HWR-WQWPD-KFDEV-6GB67',
	    method: 'GET',
	    dataType: 'json',
	    //请求成功回调
	    success: function(res) {
	    	console.log(res)
	        var ret = res.data
	        that.setData({
	        	luxiandata:res.data.result.routes[0].steps
	        })
	        if (ret.status != 0) return; //服务异常处理
	        var coors = ret.result.routes[0].polyline,
	            pl = [];
	        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
	        var kr = 1000000;
	        for (var i = 2; i < coors.length; i++) {
	            coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
	        }
	        //将解压后的坐标放入点串数组pl中
	        for (var i = 0; i < coors.length; i += 2) {
	            pl.push({ latitude: coors[i], longitude: coors[i + 1] })
	        }
	        //设置polyline属性，将路线显示出来
	        that.setData({
	            polyline: [{
	                points: pl,
	                color: '#17ba57',
	                width: 8,
	                arrowLine:true,
	                borderColor:'#000',
	                borderWidth:2
	            }]
	        })
	    }
	};
	wx.request(opt);
}
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		jttype:1
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var that=this
		tolat=38.989520
		tolon=117.268510
		wx.getLocation({
			type: 'gcj02',  // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
			success: (res) => {
				mylat = res.latitude  // 纬度，浮点数，范围为-90~90，负数表示南纬
				mylon = res.longitude  // 经度，浮点数，范围为-180~180，负数表示西经
				console.log(res)
				that.setData({
					mylat:mylat,
					mylon:mylon
				})
				type='driving'
				luxian(that)
			},
			fail: (res) => {
				
			},
			complete: (res) => {
				
			}
		})
	},
	driving:function(){
		var that=this
		that.setData({
			jttype:1	
		})
		type='driving'
		luxian(that)
	},
	walking:function(){
		var that=this
		that.setData({
			jttype:2	
		})
		type='walking'
		luxian(that)
	},
	bicycling:function(){
		var that=this
		that.setData({
			jttype:3	
		})
		type='bicycling'
		luxian(that)
	},
	transit:function(){
		var that=this
		that.setData({
			jttype:4	
		})
		type='transit'
		luxian(that)
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