var app=getApp();
Page({
	data:{
		first:true,
		photos:[],
		imgEnough:false,
		activityImg:[
			{
				id:0,
				src:'../../img/activity1.jpg'
			},
			{
				id:1,
				src:'../../img/activity2.jpg'
			},
			{
				id:2,
				src:'../../img/activity3.jpg'
			}

		]
	},
	onShow:function(){
		var that = this
		wx.getUserInfo({
			success:function (res) {
				that.setData({
					userImg:res.userInfo.avatarUrl,
					nickName:res.userInfo.nickName,
				});
			}
		})
		imgLengthF(that)
		imgLength=9-that.data.photos.length
		//console.log(imgLength)
		address(that)//当前位置
	},
	/*chooseImg:function(){
		var that=this
		var photos
		imgLengthF(that)
		wx.showActionSheet({
			itemList:["从相册中选择","拍照"],
			itemColor:'#ff693e',
			success:function(res){
				//console.log(res.tapIndex)
				if(res.tapIndex==0){
					wx.chooseImage({
						count:imgLength,
						sizeType:['original','compressed'],
						sourceType:['album'],
						success:function(res){
							//console.log(res.tempFilePaths)
							photos=that.data.photos.concat(res.tempFilePaths)
							that.setData({
								photos:photos
							})
							imgLengthF(that)	
						}
					})
				}
				else{
					wx.chooseImage({
						count:imgLength,
						sizeType:['original','compressed'],
						sourceType:['camera'],
						success:function(res){
							photos=that.data.photos.concat(res.tempFilePaths)
							that.setData({
								photos:photos,
							})
							imgLengthF(that)
						}
					})
				}
			}
		})
		imgLength=9-that.data.photos.length	
		//console.log(imgLength)
	},*/
	chooseImg:function(){
		var that=this
		var photos
		imgLengthF(that)
		wx.chooseImage({
			count: imgLength, // 默认9
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: function (res) {
				//console.log(res.tempFilePaths)
				photos=that.data.photos.concat(res.tempFilePaths)
				that.setData({
					photos:photos
				})
				imgLengthF(that)
			}
		})
		imgLength=9-that.data.photos.length	
		console.log(imgLength)
	},
	previewImg:function(e){
		var current=e.currentTarget.dataset.src
		console.log(current)
		wx.previewImage({
			current:current,
			urls:this.data.photos
		})
	},
	deleteImg:function(e){
		var that=this
		var index=e.currentTarget.dataset.index
		var photos=this.data.photos
		photos.splice(index,1)
		this.setData({
			photos:photos
		})
		imgLengthF(that)
	},
	onPullDownRefresh:function(){
		//red packet
		/*wx.startPullDownRefresh()
		setTimeout(function(){
			wx.stopPullDownRefresh()
		},1000)*/
		//
	}
})
var imgLength
var imgLengthF=function(that){
	if(that.data.photos.length==9){
		that.setData({
			imgEnough:true
		})
	}
	else{
		that.setData({
			imgEnough:false
		})
	}
}

