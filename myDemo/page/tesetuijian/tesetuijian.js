// page/tesetuijian/tesetuijian.js
Page({

    /**
    * 页面的初始数据
    */
    data: {
        showPreviewImgBox:false
    },

    /**
    * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {

    },

    /**
    * 生命周期函数--监听页面显示
    */
    onShow: function () {

    },
    /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
    onPullDownRefresh: function () {

    },

    /**
    * 页面上拉触底事件的处理函数
    */
    onReachBottom: function () {

    },
    previewImg:function(e){
        var that=this
        that.setData({
            showPreviewImgBox:true
        })
    },
    hideimgpreview:function(){
         this.setData({
            showPreviewImgBox: false
        })
    },
    previewBigImg: function (e) {
        var urls = e.currentTarget.dataset.src
        wx.previewImage({
            urls: [urls]
        })
    }
})