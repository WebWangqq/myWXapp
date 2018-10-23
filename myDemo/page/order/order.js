var utils = require('../../utils/utils');
var app=getApp()
var imgPath=getApp().globalData.imgPath

var maxTime=10
var currentTime=maxTime
var interval


var startX,delBtnWidth=55

var switchVal=false
Page({
	data:{
		imageError:'../../img/imgerrors.png',
		myImgSrc:[
			{
				src:'http://img.orz520.com/t01a52c9a4fe014bc76.jpg'
			},
			{
				src:'http://work.qujie365.com/staticImg/SmallProgram/pic/a_sheyouyiman-beijing@2x.png'
			},
			{
				src:'http://work.qujie365.com/staticImg/SmallProgram/pic/a_sheyouyiman-beijing@2x.png'
			},
			{
				src:'http://work.qujie365.com/staticImg/SmallProgram/pic/a_sheyouyiman-beijing@2x.png'
			}
		],
		imgPath:imgPath,
		headerNavItem:[
			{
				id:'0',
				typeName:'名字1'
			},
			{
				id:'1',
				typeName:'名字2'
			},
			{
				id:'2',
				typeName:'名字3'
			},
            {
                id: '3',
                typeName: '名字4'
            },
            {
                id: '4',
                typeName: '名字5'
            },
            {
                id: '5',
                typeName: '名字6'
            }
		],
		currentNavTab:'0',
		messageInfo:[
			{
				text:'1之前一直以为微信小程序按钮点击事件传参是和web端相同，即在事件中写明所传递的参数即可，但是这样尝试过以后发现小程序的控制台报错'
			},
			{
				text:'2之前一直以为微信小程序按钮点击事件传参是和web端相同，即在事件中写明所传递的参数即可，但是这样尝试过以后发现小程序的控制台报错'
			},
			{
				text:'3之前一直以为微信小程序按钮点击事件传参是和web端相同，即在事件中写明所传递的参数即可，但是这样尝试过以后发现小程序的控制台报错'
			}
		],
		sex:['男','女'],
		resendHidden:false,
		time:currentTime,
		tipBoxText:'',
		userIdcard:'',
		userTel:'',
		yzmText:'发送验证码'
	},
	myImg:function(e){
		var that=this
		var loadedUrl=e.target.id
		var list=that.data.myImgSrc
		for(var i=0;i<list.length;i++){
			list[i].loaded=true
		}
		that.setData({
			myImgSrc:list
		})
		
	},
	switchNavItem:function(e){
		var that=this
		var currentNavTab=e.currentTarget.id
		that.setData({
			currentNavTab:currentNavTab
		})
	},
	onLoad:function(e){
		var that=this
		wx.getUserInfo({
			success:function (res) {
				that.setData({
					userImg:res.userInfo.avatarUrl
				});
			}
        })
    
		
	},
	onShow:function(){
		var that=this
		//
		var date=new Date()
		//社会主义社会
		//console.log(utils.formatTime(date))
		/*that.setData({
			endTime:utils.formatTime('yyyy-MM-dd')
		})*/
		//
		//console.log(that.data.isIpX)
		

		// utils.showTipBox(that,{
		// 	// icon:'',
		// 	// image:'../../img/q_zhifuchenggong@2x.png',
		// 	title:'请输入正确身份证号'
		// })
		/*wx.showToast({
			title: '成功',
			icon: 'success',
			duration: 2000
		})*/
		utils.adaptive(that)
	},
	onPageScroll:function(e){
        //var scrollTop=e.scrollTop
        //console.log(scrollTop)
        //4点半
	},
    onTabItemTap: function (item){
        console.log(item)
    },
	sexSelect:function(e){
		console.log(e.detail.value)
		this.setData({
			index:e.detail.value,
			sexSelected:true
		})
	},
	userBirthdateEvent:function(e){
		this.setData({
			userBirthdate:e.detail.value,
			sexSelected2:true
		})
	},
	userCityEvent:function(e){
		this.setData({
			userCity:e.detail.value,
			sexSelected3:true
		})
	},
	switchChange:function(e){
		switchVal=e.detail.value
	},
	changImg:function(){
		var that=this
		wx.showActionSheet({
			itemList:["从相册中选择","拍照"],
			itemColor:'#ff693e',
			success:function(res){
				if(res.tapIndex==0){
					wx.chooseImage({
						count:1,
						sizeType:['original','compressed'],
						sourceType:['album'],
						success:function(res){
							that.setData({
								userImg:res.tempFilePaths[0]
							})
						}
					})
				}
				else{
					wx.chooseImage({
						count:1,
						sizeType:['original','compressed'],
						sourceType:['camera'],
						success:function(res){
							that.setData({
								userImg:res.tempFilePaths[0]
							})
						}
					})
				}
			}
		})
		console.log(that.data.userImg)
	},
	userIdcardInput:function(e){
		this.setData({
			userIdcard:e.detail.value
		})
		if(this.data.userIdcard.length==18 && this.data.userTel.length==11){
			this.setData({
				okBtn:'okBtn'
			})
		}
		else{
			this.setData({
				okBtn:''
			})
		}
	},
	userTelInput:function(e){
		this.setData({
			userTel:e.detail.value
		})
		if(this.data.userIdcard.length==18 && this.data.userTel.length==11){
			this.setData({
				okBtn:'okBtn'
			})
		}
		else if(utils.isMobile(this.data.userTel)){
			this.setData({
				okTel:true
			})
		}
		else{
			this.setData({
				okBtn:''
			})
		}
	},
	saveData:function(e){
		var that=this
        console.log("switchVal为"+switchVal)
		if(that.data.userIdcard.length==18 && that.data.userTel.length==11){
			if(utils.isIdcard(that.data.userIdcard) && utils.isMobile(that.data.userTel)){
				var orderInfo=e.detail.value
				//console.log(orderInfo)
				//
				wx.setStorage({
					key:'orderInfo',
					data:orderInfo,
					success:function(res){
						wx.navigateTo({
							url:'../info/info?userName='+orderInfo.userName
						})
					}
				})
				wx.setStorage({
					key:'userImg',
					data:that.data.userImg
				})
			}
			else{
				if(!utils.isIdcard(that.data.userIdcard)){
					//utils.showTipBox(that,'请输入正确身份证号')
					utils.showTipBox(that,{
						title:'请输入正确身份证号'
					})
				}

				if(!utils.isMobile(that.data.userTel)){
					utils.showTipBox(that,{
						title:'请输入正确手机号'
					})
					//utils.showTipBox(that,'请输入正确手机号')
				}
			}
		}
		
	},
	yzmEvent:function(){
		var that=this
		if(utils.isMobile(that.data.userTel)){
			that.setData({
				resendHidden:true
			})
			interval=setInterval(function(){
				currentTime--
				if(currentTime<1){
					clearInterval(interval)
					currentTime=maxTime
					that.setData({
						resendHidden:false,
						yzmText:'重新发送'
					})
				}
				that.setData({
					time:utils.formatNumber(currentTime)
				})
			},1000)
		}
		/*
		else{
			utils.showTipBox(that,'请输入正确手机号')
		}
		*/
	},
	//
	//手指刚放到屏幕触发
	touchS: function (e) {
		// console.log("touchS")
		// console.log(e)
		//判断是否只有一个触摸点
		if (e.touches.length == 1) {
			//记录触摸起始位置的X坐标
			startX=e.touches[0].clientX
		}
	},
	//触摸时触发，手指在屏幕上每移动一次，触发一次
	//
	touchM: function (e) {
		//console.log("touchM:" + e);
		var that = this
		if (e.touches.length == 1) {
			//记录触摸点位置的X坐标
			var moveX = e.touches[0].clientX;
			//计算手指起始点的X坐标与当前触摸点的X坐标的差值
			var disX = startX - moveX;
			//delBtnWidth 为右侧按钮区域的宽度

			var txtStyle = "";
			if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
				txtStyle = "left:0px";
			} else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
				txtStyle = "left:-" + disX + "px";
				if (disX >= delBtnWidth) {
					//控制手指移动距离最大值为删除按钮的宽度
					txtStyle = "left:-" + delBtnWidth + "px"
				}
			}
			//获取手指触摸的是哪一个item
			//
			var index = e.currentTarget.dataset.index;
			var list = that.data.messageInfo;
			//将拼接好的样式设置到当前item中

			list[index].txtStyle = txtStyle;
			//更新列表的状态
			//
			this.setData({
				messageInfo: list
			})
		}
	},
	touchE: function (e) {
		//console.log("touchE" + e);
		//console.log("touchEnd")
		//console.log(e)
		var that = this
		if (e.changedTouches.length == 1) {
		  //手指移动结束后触摸点位置的X坐标
			var endX = e.changedTouches[0].clientX;
			//触摸开始与结束，手指移动的距离
			var disX = startX - endX;

			//如果距离小于删除按钮的1/2，不显示删除按钮
			var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
			//获取手指触摸的是哪一项
			var index = e.currentTarget.dataset.index;
			var list = that.data.messageInfo;
			/*for(var i=0;i<=list.length;i++){
				list[i].txtStyle=''
			}*/
			//
			list[index].txtStyle = txtStyle;
			//更新列表的状态
			that.setData({
				messageInfo: list
			})
		}
	},
	deleteItem:function(e){
		var that=this
		var index = e.currentTarget.dataset.index
		var messageInfo=that.data.messageInfo
		messageInfo.splice(index,1)
		//console.log("删除第几条信息"+index)
		that.setData({
			messageInfo:messageInfo
		})
	},
	download:function(){
        var that=this
        var path = 'http://work.qujie365.com/staticImg/SmallProgram/pic/a_sheyouyiman-beijing@2x.png'
        //var path ='http://192.168.0.140:8080/WXApp/myDemo/down/1.xlsx'
        // const downloadTask = wx.downloadFile({
        //     url:path,
        //     success:function(res){
        //         if(res.statusCode===200){
        //             wx.playVoice({
        //                 filePath: res.tempFilePath,
        //             })
        //         }
        //     }
        // })
        // downloadTask.onProgressUpdate((res)=>{
        //     console.log("下载进度"+res.progress)
        // })
        // utils.showTipBox(that, {
        //     icon: '',
        //     image: '../../img/q_zhifuchenggong@2x.png',
        //     title: '请输入正确身份证号'
        // })
		
        wx.downloadFile({
            url:path,
            success:function(res){
                var filePath=res.tempFilePath
                console.log(filePath)
                wx.saveImageToPhotosAlbum({
                    filePath: filePath,
                    success:function(res){
                        utils.showTipBox(that,{
                            title:'下载成功'
                        })
                    }
                })
            }
        })
        //
        // wx.saveImageToPhotosAlbum({
        //     filePath: '../../img/a_sheyouyiman-beijing@2x.png',
        //     success:function(res){
        //         console.log(res)
        //     },
        //     fail: function(res){
        //         console.log(res)
        //     }
        // })
        
	}
})