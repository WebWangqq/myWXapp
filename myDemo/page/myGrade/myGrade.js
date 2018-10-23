var utils = require('../../utils/utils');
var app=getApp();
var domain=app.globalData.domain;

//成绩加载
var locked=true
var pageGrade=0
var	page_size=20
var hasMoreGrade,noMoreGrade,listDataGrade,arr=[]
var loadGrade=function(that,rptype){
	//wx.showNavigationBarLoading()
	if(locked){
		locked=false
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
				console.log(res.data)
				//wx.showNavigationBarLoading()
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
					if(pageGrade>=pageTotal){					
						hasMoreGrade=false
						noMoreGrade=true
					}
					else{
						hasMoreGrade=true
						noMoreGrade=false
					}
					if(pageGrade>1){
						listDataGrade=that.data.grade.concat(res.data.data)
					}
					
					that.setData({
						grade:listDataGrade,
						hasMoreGrade:hasMoreGrade,
						noMoreGrade:noMoreGrade
					})
					pageGrade++
				}
			},
			complete:function(){
				locked=true
				setTimeout(function(){
					wx.hideNavigationBarLoading()
				},500)
				
			}
		})
	}
	
}
//成绩加载end

Page({
	data:{
		currentNavTab:1,
		grade:[],
		hasMoreGrade:true,
		name:'15176585721'
	},
	onShow:function(){
		var that=this
		pageGrade=1
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
	onReachBottom:function(){
		var that=this
		loadGrade(that,that.data.currentNavTab)
	},
	onPullDownRefresh:function(){
		wx.stopPullDownRefresh()
		wx.showNavigationBarLoading()
		var that=this
		that.setData({
			grade:[],
			hasMoreGrade:true,
			noMoreGrade:false
		})
		pageGrade=1
		loadGrade(that,that.data.currentNavTab)
		console.log()
		setTimeout(function(){
			//wx.stopPullDownRefresh()
			wx.hideNavigationBarLoading()
		}.bind(this),1000)
	},
	shopDetail:function(e){
		var name=e.currentTarget.dataset.name
		//console.log(name)
		//你可以申请
		wx.setStorage({
          key: 'shopName',
          data: name
        })
        wx.navigateTo({
            url:'../shopDetail/shopDetail'
        })
    }
})

