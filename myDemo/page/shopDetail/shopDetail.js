var startX
var swiperCurrent, imgNum = 2
var load = function(that) {
    var shopInfo = that.data.shopInfoData
    for (var i = 0; i < shopInfo.length; i++) {
        var imgs = shopInfo[i].ImgPath
        var imgs2 = imgs.split(',')
        var imageList = []
        var list
        if (imgs2.length == 1) {
            list = { path: imgs }
            imageList.push(list)
        } else {
            for (var j = 0; j < imgs2.length; j++) {
                list = { path: imgs2[j] }
                imageList.push(list)
            }
        }
        shopInfo[i].images = imageList
    }

    that.setData({
        shopInfo: shopInfo
    })
}
var windowWidth = getApp().globalData.windowWidth
var imgTotal = 3
Page({
    data: {
        shopInfoData: [
            /*{   
            id:'0',
            ImgPath:'http://img.taopic.com/uploads/allimg/120727/201995-120HG1030762.jpg'
            },*/
            {
                id: '1',
                ImgPath: 'http://api.qujie365.com/upload/20171118135026677284.jpg,http://work.qujie365.com/staticImg/SmallProgram/pic/a_shouyebeijing@2x.png,http://api.qujie365.com/upload/20171118135026677284.jpg'
            }
            // ,
            // {
            //     id: '2',
            //     ImgPath: 'http://img.taopic.com/uploads/allimg/120727/201995-120HG1030762.jpg,http://work.qujie365.com/staticImg/SmallProgram/pic/a_shouyebeijing@2x.png,http://img.taopic.com/uploads/allimg/120727/201995-120HG1030762.jpg,http://api.qujie365.com/upload/20171118135026677284.jpg'
            // }
        ],
        showPreviewImgBox: false,
        openShare: "share",
        moreText: "查看更多",
        shared: false
    },
    onShareAppMessage: function(res) {
        var that = this
        if (res.form === "button") {
            console.log(res.target)
        }
        return {
            title: '文字内容',
            path: '/page/index',
            imageUrl: '../../img/imgerrors.png',
            success: function(res) {
                console.log("转发成功")
                that.setData({
                    shared: true,
                    openShare: ''
                })

            },
            fail: function(res) {
                console.log("转发失败")

            }
        }
    },
    onShow: function() {
        var that = this
        wx.getStorage({
            key: 'shopName',
            success: function(res) {
                that.setData({
                    shopName: res.data
                })
                wx.setNavigationBarTitle({
                    title: res.data.APPName
                })
                wx.getImageInfo({
                    src: 'http://work.qujie365.com/staticImg/SmallProgram/pic/a_shouyebeijing@2x.png',
                    success: function(res) {
                        //console.log(res)
                    }
                })
            }
        })
        load(that)
    },
    shareF: function() {
        wx.showShareMenu({
            withShareTicket: true
        })
    },
    previewImg: function(e) {
        //console.log(e)
        var that = this
        var current = e.currentTarget.dataset.imgindex
        var index = e.currentTarget.dataset.index
        var list = that.data.shopInfo
        var imgslist = list[index].ImgPath.split(',')

        if (current == imgNum) {
            swiperCurrent = imgNum
        }
        if (imgslist.length == 1) {
            current = 0
            wx.setNavigationBarTitle({
                title: '1/1'
            })
        } else {
            wx.setNavigationBarTitle({
                title: (current + 1) + '/' + imgTotal
            })
        }
        that.setData({
            showPreviewImgBox: true,
            imgsUrl: imgslist,
            current: current
        })
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#000'
        })

    },
    hideimgpreview: function() {
        this.setData({
            showPreviewImgBox: false
        })
    },
    previewImg2: function(e) {
        var urls = e.currentTarget.dataset.src
        wx.previewImage({
            urls: [urls]
        })
    },
    swiperChange: function(e) {
        swiperCurrent = e.detail.current
        //console.log(swiperCurrent)
        wx.setNavigationBarTitle({
            title: (swiperCurrent + 1) + '/' + imgTotal
        })
    },
    touchM: function(e) {
        if (swiperCurrent == imgNum) {
            var that = this
            wx.createSelectorQuery().selectAll('#item2').boundingClientRect(function(rects) {
                rects.forEach(function(rect) {
                    var moveLeft = (-rect.left) * 750 / windowWidth // 节点的左边界坐标
                    console.log(moveLeft)
                    var moreStyle = moveLeft > 0 ? "right:" + (-140 + moveLeft) + "rpx;" : "right:-140rpx"
                    var moreText = moveLeft >= 140 ? "释放更多" : "查看更多"
                    that.setData({
                        moreStyle: moreStyle,
                        moreText: moreText
                    })
                })
            }).exec()
        }
    },
    touchE: function(e) {
        if (swiperCurrent == imgNum) {
            var that = this
            wx.createSelectorQuery().selectAll('#item2').boundingClientRect(function(rects) {
                rects.forEach(function(rect) {
                    var moveLeft = (-rect.left) * 750 / windowWidth // 节点的左边界坐标
                    if (moveLeft >= 140) {
                        wx.navigateTo({
                            url: '../myGrade/myGrade'
                        })
                        that.setData({
                            showPreviewImgBox: false
                        })
                    }
                    var moreStyle = "right:-140rpx;";
                    that.setData({
                        moreStyle: moreStyle,
                        moreText: "查看更多",

                    })
                })
            }).exec()
        }
    }
})