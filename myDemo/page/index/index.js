var utils = require('../../utils/utils');

var app=getApp();
var domain=app.globalData.domain;
Page({
	data:{
		strategyBox:false,//趣抢攻略弹框显示
		gradeBox:false,//成绩弹框显示
		currentNavTab:1,//成绩tab
		animationData: {},
		redPacketBox:false,//红包弹框
		redPacketList:[],//红包数据
		redPacketLength:true,
		hasTodayList:true,
		grade:[],//成绩数据
		hasMoreGrade:true,
		redPacketSceneBox:false,//红包现场弹框显示
		redPacketSceneList:[],//红包现场
		hasMoreRedPacket:true///红包现场更多
	},
	onShow:function(){
		var that=this;
		var contnetHeight=wx.getSystemInfoSync().windowHeight-wx.getSystemInfoSync().windowWidth/750*524
		var strategyBoxHeight=wx.getSystemInfoSync().windowHeight-wx.getSystemInfoSync().windowWidth/750*110
		var redPacketSceneMtop=-(wx.getSystemInfoSync().windowHeight*0.69)/2+'px'
		var redPacketSceneListHeight=wx.getSystemInfoSync().windowHeight*0.69-wx.getSystemInfoSync().windowWidth/750*150
		that.setData({
			contnetHeight:contnetHeight,
			strategyBoxHeight:strategyBoxHeight,
			redPacketSceneMtop:redPacketSceneMtop,
			redPacketSceneListHeight:redPacketSceneListHeight
		})
		loadRedPacket(that)
		loadRedPacketBox(that)
	},
	//击红包事件
	redPacketBoxShow:function(){
		var animation = wx.createAnimation({
			duration: 1000,
	        timingFunction: 'ease',
	    })
		this.animation = animation
		
		this.setData({
			redPacketBox:true,
		})
		setTimeout(function() {
	      animation.scale(1.2,1.2).rotate(45).step()
	      this.setData({
	        animationData:animation.export()
	      })
	    }.bind(this), 100)

	    setTimeout(function(){
	    	animation.scale(1,1).rotate(-45).step()
	    	this.setData({
				redPacketBox:false,
				animationData:animation.export()
			})
	    }.bind(this),2000)
	},
	//点击攻略
	strategyBoxShow:function(e){
		this.setData({
			strategyBox:!(this.data.strategyBox)
		})
	},
	//点击成绩
	gradeBoxShow:function(){
		var that=this
		that.setData({
			gradeBox:!(that.data.gradeBox)
		})	
		loadGrade(that,1)
	},
	switchGradeTab:function(e){
		var that=this
		var currentNavTab=e.currentTarget.dataset.id
		that.setData({
			currentNavTab:currentNavTab,
			grade:[],
			hasMoreGrade:true
		})
		pageGrade=1
		loadGrade(that,currentNavTab)
	},
	gradeListMore:function(){
		var that=this
		loadGrade(that,that.data.currentNavTab)
	},
	gradeListRefresh:function(){
		var that=this
		that.setData({
			grade:[],
			hasMoreGrade:true
		})
		pageGrade=1
		setTimeout(function(){
			loadGrade(that,that.data.currentNavTab)
		}.bind(this),1000)	
	},
	//点击成绩end
	//点击红包现场
	redPacketSceneBoxShow:function(){
		this.setData({
			redPacketSceneBox:!(this.data.redPacketSceneBox)
		})
	},
	redPacketSceneListMore:function(){
		var that=this
		loadRedPacketBox(that)
	},
	redPacketSceneListRefresh:function(){
		var that=this
		that.setData({
			redPacketSceneList:[],
			hasMoreRedPacket:true
		})
		pageRedPacket=1
		setTimeout(function(){
			loadRedPacketBox(that)
		}.bind(this),1000)	
	}
})

//红包加载
var loadRedPacket=function(that){
	wx.request({
		url:domain+':8103/api/Cache/GetFunGrabRPUserInfo',
		data:{
			uid:'4'
		},
		header:{'content-type':'application/json'},
		success:function(res){
			console.log(res.data)
			if(res.data.data.bIsHaveFriend!=0){
				that.setData({
					redPacketLength:true
				})
				var redPacketList = res.data.data.Data
				var redPacketList1=[],redPacketList2=[],redPacketList3=[]
				for(var i=0; i<Math.ceil(redPacketList.length/3);i++){
					redPacketList1[i]=redPacketList[i*3];
				}
				if(redPacketList.length%3==0){
					for(var i=0; i<Math.ceil(redPacketList.length/3);i++){
						redPacketList2[i]=redPacketList[i*3+1];
						redPacketList3[i]=redPacketList[i*3+2];
					}
				}
				else if(redPacketList.length%3==1){
					for(var i=0; i<Math.round(redPacketList.length/3);i++){
						redPacketList2[i]=redPacketList[i*3+1];
						redPacketList3[i]=redPacketList[i*3+2];
					}
				}
				else if(redPacketList.length%3==2){
					for(var i=0; i<Math.ceil(redPacketList.length/3);i++){
						redPacketList2[i]=redPacketList[i*3+1];
					}
					for(var i=0; i<Math.round(redPacketList.length/3)-1;i++){
						redPacketList3[i]=redPacketList[i*3+2];
					}
				}
				if(redPacketList.length<9){
					that.setData({
						redPacketList1:redPacketList2,
						redPacketList2:redPacketList1,
						redPacketList3:redPacketList3
					})
				}
				else{
					that.setData({
						redPacketList1:redPacketList1,
						redPacketList2:redPacketList2,
						redPacketList3:redPacketList3
					})
				}
			}
			else{
				that.setData({
					redPacketLength:false
				})
				allTime=res.data.data.CountDownTimeStamp
				CountDownTimeStamp(that)
				setInterval(function(){
					allTime--
					CountDownTimeStamp(that)
				},1000)
			}
			
		},
		fail:function(){
			console.log("失败")
		}
	})
	
}
//红包加载end

var hour,minute ,second,allTime
var CountDownTimeStamp=function(that){
	hour=Math.floor(allTime/3600)
	minute=utils.formatNumber(Math.floor(allTime/60)-hour*60)
	second=utils.formatNumber(allTime-minute*60-hour*3600)
	that.setData({
		hour:hour,
		minute:minute,
		second:second
	})
}


//成绩加载
var pageGrade=1
var	page_size=20
var hasMoreGrade,listDataGrade,arr=[]
var loadGrade=function(that,rptype){
	//wx.showNavigationBarLoading()
	wx.request({
		url:domain+':8102/api/client/FunGrabRedPack/GetAchievementList',
		data:{
			uid:4,
			currentPage:pageGrade,
			pageSize:page_size,
			rptype:rptype
		},
		header:{'content-type':'application/json'},
		success:function(res){	
			/******此处以下判断是否有今日成绩*******/
			/*for(var i=0;i<res.data.data.length;i++){
				if(res.data.data[i].DType==1){
					arr=arr.concat(res.da.data[i])
				}
				if(arr.length==0){
					that.setData({
						hasTodayList:false
					})
				}
				else{
					that.setData({
						hasTodayList:true
					})
					if(res.data.totalCount==0){
						that.setData({
							hasList:false
						})
					}
					else{
						var pageTotal=Math.ceil(res.data.totalCount/page_size);
						listDataGrade=res.data.data
						//console.log(pageTotal)
						if(pageGrade<pageTotal){					
							hasMoreGrade=true
						}
						else{
							hasMoreGrade=false
						}
						listDataGrade=that.data.grade.concat(res.data.data)
						that.setData({
							grade:listDataGrade,
							hasMoreGrade:hasMoreGrade
						})
						pageGrade++
					}
				}
			}*/
			/******此处以上判断是否有今日成绩*******/
			if(res.data.totalCount==0){
				that.setData({
					hasTodayList:false
				})
			}
			else{
				that.setData({
					hasTodayList:true
				})
				var pageTotal=Math.ceil(res.data.totalCount/page_size);
				listDataGrade=res.data.data
				//console.log(pageTotal)
				if(pageGrade<pageTotal){					
					hasMoreGrade=true
				}
				else{
					hasMoreGrade=false
				}
				listDataGrade=that.data.grade.concat(res.data.data)
				that.setData({
					grade:listDataGrade,
					hasMoreGrade:hasMoreGrade
				})
				pageGrade++
			}
		},
		complete:function(){
			//wx.hideNavigationBarLoading()
		}
	})
}
//成绩加载end

//红包现场
var pageRedPacket=1
var	page_sizeRedPacket=12
var hasMoreRedPacket,listDataRedPacket
var loadRedPacketBox=function(that){
	//wx.showNavigationBarLoading()
	wx.request({
		url:domain+':8102/api/Client/shop/getJGGRedBagScene',
		data:{
			uid:4,
			currentPage:pageRedPacket,
			pageSize:page_sizeRedPacket,
			IsFirst:1
		},
		header:{'content-type':'application/json'},
		success:function(res){	
			//console.log(res.data)
			that.setData({
				redPacketNum:res.data.data.headInfo[0].hyCount,
				redPacketMoney:res.data.data.headInfo[0].Balance
			})
			var pageTotal=Math.ceil(res.data.totalCount/page_sizeRedPacket);
			listDataRedPacket=res.data.data.shopList
			if(pageRedPacket<pageTotal){					
				hasMoreRedPacket=true
			}
			else{
				hasMoreRedPacket=false
			}
			listDataRedPacket=that.data.redPacketSceneList.concat(res.data.data.shopList)
			that.setData({
				redPacketSceneList:listDataRedPacket,
				hasMoreRedPacket:hasMoreRedPacket
			})
			pageRedPacket++
		},
		complete:function(){
			//wx.hideNavigationBarLoading()
		}
	})
}