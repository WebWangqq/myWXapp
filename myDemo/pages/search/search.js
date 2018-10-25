var app = getApp()
var WxNotificationCenter = require('../../utils/WxNotificationCenter.js');

var uid = null

var clickLock = true
var searchHeight
var typeLeftLen
var typeRightItemArr = []
var typeRightData = []

var loadtuijian = function(that) {
    wx.request({
        url: demon + banbenid + '/Client/Groupon/getGrouponIndexTuiJianShopType',
        data: {},
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
            console.log(res.data)
            if (res.data.success == "True") {
                that.setData({
                    tuijianData: res.data.data
                })
            }
        }
    })
}
var loadShopType = function(that) {
    wx.request({
        url: demon + banbenid + '/Client/Groupon/getSearchShopTypeList',
        data: {},
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
            console.log(res.data)
            if (res.data.success == "True") {
                typeLeftLen = res.data.data.length
                that.setData({
                    shoptypeData: res.data.data
                }, function() {
                    for (var i = 0; i < typeLeftLen + 1; i++) {
                        wx.createSelectorQuery().select('#typeRight' + i).boundingClientRect(function(rect) {
                            typeRightItemArr.push(rect.top - searchHeight)
                        }).exec()
                    }
                })
            }
        }
    })
}


Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftIndex: 0,
        typeLeftScollTop: 0,
        tuijianData: [
            {
                "ShopType": 1,
                "ShopTypeID": 22,
                "SmallShopTypeID": 0,
                "ShopTypeName": "休闲娱乐",
                "TypeImg": ""
            }, {
                "ShopType": 1,
                "ShopTypeID": 23,
                "SmallShopTypeID": 0,
                "ShopTypeName": "运动健身",
                "TypeImg": ""
            }, {
                "ShopType": 1,
                "ShopTypeID": 24,
                "SmallShopTypeID": 0,
                "ShopTypeName": "生活健康",
                "TypeImg": ""
            }, {
                "ShopType": 2,
                "ShopTypeID": 21,
                "SmallShopTypeID": 135,
                "ShopTypeName": "面包甜点",
                "TypeImg": ""
            }, {
                "ShopType": 2,
                "ShopTypeID": 21,
                "SmallShopTypeID": 136,
                "ShopTypeName": "茶饮",
                "TypeImg": ""
            }, {
                "ShopType": 2,
                "ShopTypeID": 21,
                "SmallShopTypeID": 137,
                "ShopTypeName": "中国地方菜",
                "TypeImg": ""
            }, {
                "ShopType": 2,
                "ShopTypeID": 21,
                "SmallShopTypeID": 138,
                "ShopTypeName": "火锅",
                "TypeImg": ""
            }, {
                "ShopType": 1,
                "ShopTypeID": 21,
                "SmallShopTypeID": 0,
                "ShopTypeName": "美食",
                "TypeImg": ""
            }, {
                "ShopType": 2,
                "ShopTypeID": 21,
                "SmallShopTypeID": 139,
                "ShopTypeName": "异国料理",
                "TypeImg": ""
            }
        ],
        shoptypeData: [
            {
                "ShopTypeID": 21,
                "Typename": "美食",
                "StereoBuildingBig": "",
                "SmallShopTypeList": [{
                    "SmallShopTypeID": 134,
                    "TypeImg": "",
                    "TypeName": "小吃快餐",
                    "BigShopTypeID": 21
                }, {
                    "SmallShopTypeID": 135,
                    "TypeImg": "",
                    "TypeName": "面包甜点",
                    "BigShopTypeID": 21
                }, {
                    "SmallShopTypeID": 136,
                    "TypeImg": "",
                    "TypeName": "茶饮",
                    "BigShopTypeID": 21
                }, {
                    "SmallShopTypeID": 137,
                    "TypeImg": "",
                    "TypeName": "中国地方菜",
                    "BigShopTypeID": 21
                }, {
                    "SmallShopTypeID": 138,
                    "TypeImg": "",
                    "TypeName": "火锅",
                    "BigShopTypeID": 21
                }, {
                    "SmallShopTypeID": 139,
                    "TypeImg": "",
                    "TypeName": "异国料理",
                    "BigShopTypeID": 21
                }, {
                    "SmallShopTypeID": 140,
                    "TypeImg": "",
                    "TypeName": "零食特产",
                    "BigShopTypeID": 21
                }, {
                    "SmallShopTypeID": 141,
                    "TypeImg": "",
                    "TypeName": "烧烤/烤肉",
                    "BigShopTypeID": 21
                }, {
                    "SmallShopTypeID": 142,
                    "TypeImg": "",
                    "TypeName": "香锅",
                    "BigShopTypeID": 21
                }, {
                    "SmallShopTypeID": 143,
                    "TypeImg": "",
                    "TypeName": "生鲜水果",
                    "BigShopTypeID": 21
                }, {
                    "SmallShopTypeID": 144,
                    "TypeImg": "",
                    "TypeName": "自助餐",
                    "BigShopTypeID": 21
                }, {
                    "SmallShopTypeID": 145,
                    "TypeImg": "",
                    "TypeName": "其他美食",
                    "BigShopTypeID": 21
                }, {
                    "SmallShopTypeID": 154,
                    "TypeImg": "",
                    "TypeName": "其他美食",
                    "BigShopTypeID": 21
                }]
            }, {
                "ShopTypeID": 22,
                "Typename": "休闲娱乐",
                "StereoBuildingBig": "",
                "SmallShopTypeList": [{
                    "SmallShopTypeID": 146,
                    "TypeImg": "",
                    "TypeName": "KTV",
                    "BigShopTypeID": 22
                }, {
                    "SmallShopTypeID": 147,
                    "TypeImg": "",
                    "TypeName": "游戏玩乐",
                    "BigShopTypeID": 22
                }, {
                    "SmallShopTypeID": 148,
                    "TypeImg": "",
                    "TypeName": "足疗按摩",
                    "BigShopTypeID": 22
                }, {
                    "SmallShopTypeID": 149,
                    "TypeImg": "",
                    "TypeName": "洗浴/汗蒸",
                    "BigShopTypeID": 22
                }, {
                    "SmallShopTypeID": 150,
                    "TypeImg": "",
                    "TypeName": "亲子玩乐",
                    "BigShopTypeID": 22
                }, {
                    "SmallShopTypeID": 151,
                    "TypeImg": "",
                    "TypeName": "酒吧",
                    "BigShopTypeID": 22
                }, {
                    "SmallShopTypeID": 152,
                    "TypeImg": "",
                    "TypeName": "茶馆相声",
                    "BigShopTypeID": 22
                }, {
                    "SmallShopTypeID": 153,
                    "TypeImg": "",
                    "TypeName": "私人影院",
                    "BigShopTypeID": 22
                }]
            }, {
                "ShopTypeID": 23,
                "Typename": "运动健身",
                "StereoBuildingBig": "",
                "SmallShopTypeList": [{
                    "SmallShopTypeID": 155,
                    "TypeImg": "",
                    "TypeName": "健身中心",
                    "BigShopTypeID": 23
                }, {
                    "SmallShopTypeID": 156,
                    "TypeImg": "",
                    "TypeName": "球类场馆",
                    "BigShopTypeID": 23
                }, {
                    "SmallShopTypeID": 157,
                    "TypeImg": "",
                    "TypeName": "游泳馆",
                    "BigShopTypeID": 23
                }, {
                    "SmallShopTypeID": 158,
                    "TypeImg": "",
                    "TypeName": "舞蹈",
                    "BigShopTypeID": 23
                }, {
                    "SmallShopTypeID": 159,
                    "TypeImg": "",
                    "TypeName": "溜冰场",
                    "BigShopTypeID": 23
                }, {
                    "SmallShopTypeID": 160,
                    "TypeImg": "",
                    "TypeName": "滑雪场",
                    "BigShopTypeID": 23
                }, {
                    "SmallShopTypeID": 161,
                    "TypeImg": "",
                    "TypeName": "射箭馆",
                    "BigShopTypeID": 23
                }, {
                    "SmallShopTypeID": 162,
                    "TypeImg": "",
                    "TypeName": "跆拳道馆",
                    "BigShopTypeID": 23
                }]
            }, {
                "ShopTypeID": 24,
                "Typename": "生活健康",
                "StereoBuildingBig": "",
                "SmallShopTypeList": [{
                    "SmallShopTypeID": 163,
                    "TypeImg": "",
                    "TypeName": "家政保洁",
                    "BigShopTypeID": 24
                }, {
                    "SmallShopTypeID": 164,
                    "TypeImg": "",
                    "TypeName": "洗衣护理",
                    "BigShopTypeID": 24
                }, {
                    "SmallShopTypeID": 165,
                    "TypeImg": "",
                    "TypeName": "鲜花",
                    "BigShopTypeID": 24
                }, {
                    "SmallShopTypeID": 166,
                    "TypeImg": "",
                    "TypeName": "体检",
                    "BigShopTypeID": 24
                }, {
                    "SmallShopTypeID": 167,
                    "TypeImg": "",
                    "TypeName": "齿科",
                    "BigShopTypeID": 24
                }, {
                    "SmallShopTypeID": 168,
                    "TypeImg": "",
                    "TypeName": "宠物服务",
                    "BigShopTypeID": 24
                }, {
                    "SmallShopTypeID": 169,
                    "TypeImg": "",
                    "TypeName": "汽车服务",
                    "BigShopTypeID": 24
                }]
            }, {
                "ShopTypeID": 25,
                "Typename": "丽人",
                "StereoBuildingBig": "",
                "SmallShopTypeList": [{
                    "SmallShopTypeID": 170,
                    "TypeImg": "",
                    "TypeName": "美发",
                    "BigShopTypeID": 25
                }, {
                    "SmallShopTypeID": 171,
                    "TypeImg": "",
                    "TypeName": "美容/SPA",
                    "BigShopTypeID": 25
                }, {
                    "SmallShopTypeID": 172,
                    "TypeImg": "",
                    "TypeName": "美甲/美睫",
                    "BigShopTypeID": 25
                }, {
                    "SmallShopTypeID": 173,
                    "TypeImg": "",
                    "TypeName": "祛痘脱毛",
                    "BigShopTypeID": 25
                }, {
                    "SmallShopTypeID": 174,
                    "TypeImg": "",
                    "TypeName": "纤瘦美体",
                    "BigShopTypeID": 25
                }, {
                    "SmallShopTypeID": 175,
                    "TypeImg": "",
                    "TypeName": "纹身",
                    "BigShopTypeID": 25
                }, {
                    "SmallShopTypeID": 176,
                    "TypeImg": "",
                    "TypeName": "彩妆造型",
                    "BigShopTypeID": 25
                }]
            }, {
                "ShopTypeID": 26,
                "Typename": "教育培训",
                "StereoBuildingBig": "",
                "SmallShopTypeList": [{
                    "SmallShopTypeID": 177,
                    "TypeImg": "",
                    "TypeName": "舞蹈培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 178,
                    "TypeImg": "",
                    "TypeName": "语言培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 179,
                    "TypeImg": "",
                    "TypeName": "音乐培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 180,
                    "TypeImg": "",
                    "TypeName": "美术培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 181,
                    "TypeImg": "",
                    "TypeName": "驾校培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 182,
                    "TypeImg": "",
                    "TypeName": "职业技能",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 183,
                    "TypeImg": "",
                    "TypeName": "升学辅导",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 184,
                    "TypeImg": "",
                    "TypeName": "兴趣生活",
                    "BigShopTypeID": 26
                }]
            }, {
                "ShopTypeID": 27,
                "Typename": "周边游",
                "StereoBuildingBig": "",
                "SmallShopTypeList": [{
                    "SmallShopTypeID": 177,
                    "TypeImg": "",
                    "TypeName": "舞蹈培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 178,
                    "TypeImg": "",
                    "TypeName": "语言培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 179,
                    "TypeImg": "",
                    "TypeName": "音乐培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 180,
                    "TypeImg": "",
                    "TypeName": "美术培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 181,
                    "TypeImg": "",
                    "TypeName": "驾校培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 182,
                    "TypeImg": "",
                    "TypeName": "职业技能",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 183,
                    "TypeImg": "",
                    "TypeName": "升学辅导",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 184,
                    "TypeImg": "",
                    "TypeName": "兴趣生活",
                    "BigShopTypeID": 26
                }]
            }, {
                "ShopTypeID": 28,
                "Typename": "电影演出",
                "StereoBuildingBig": "",
                "SmallShopTypeList": [{
                    "SmallShopTypeID": 177,
                    "TypeImg": "",
                    "TypeName": "舞蹈培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 178,
                    "TypeImg": "",
                    "TypeName": "语言培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 179,
                    "TypeImg": "",
                    "TypeName": "音乐培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 180,
                    "TypeImg": "",
                    "TypeName": "美术培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 181,
                    "TypeImg": "",
                    "TypeName": "驾校培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 182,
                    "TypeImg": "",
                    "TypeName": "职业技能",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 183,
                    "TypeImg": "",
                    "TypeName": "升学辅导",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 184,
                    "TypeImg": "",
                    "TypeName": "兴趣生活",
                    "BigShopTypeID": 26
                }]
            }, {
                "ShopTypeID": 29,
                "Typename": "购物",
                "StereoBuildingBig": "",
                "SmallShopTypeList": [{
                    "SmallShopTypeID": 177,
                    "TypeImg": "",
                    "TypeName": "舞蹈培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 178,
                    "TypeImg": "",
                    "TypeName": "语言培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 179,
                    "TypeImg": "",
                    "TypeName": "音乐培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 180,
                    "TypeImg": "",
                    "TypeName": "美术培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 181,
                    "TypeImg": "",
                    "TypeName": "驾校培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 182,
                    "TypeImg": "",
                    "TypeName": "职业技能",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 183,
                    "TypeImg": "",
                    "TypeName": "升学辅导",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 184,
                    "TypeImg": "",
                    "TypeName": "兴趣生活",
                    "BigShopTypeID": 26
                }]
            }, {
                "ShopTypeID": 30,
                "Typename": "宠物",
                "StereoBuildingBig": "",
                "SmallShopTypeList": [{
                    "SmallShopTypeID": 177,
                    "TypeImg": "",
                    "TypeName": "舞蹈培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 178,
                    "TypeImg": "",
                    "TypeName": "语言培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 179,
                    "TypeImg": "",
                    "TypeName": "音乐培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 180,
                    "TypeImg": "",
                    "TypeName": "美术培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 181,
                    "TypeImg": "",
                    "TypeName": "驾校培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 182,
                    "TypeImg": "",
                    "TypeName": "职业技能",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 183,
                    "TypeImg": "",
                    "TypeName": "升学辅导",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 184,
                    "TypeImg": "",
                    "TypeName": "兴趣生活",
                    "BigShopTypeID": 26
                }]
            }, {
                "ShopTypeID": 31,
                "Typename": "亲子",
                "StereoBuildingBig": "",
                "SmallShopTypeList": [{
                    "SmallShopTypeID": 177,
                    "TypeImg": "",
                    "TypeName": "舞蹈培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 178,
                    "TypeImg": "",
                    "TypeName": "语言培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 179,
                    "TypeImg": "",
                    "TypeName": "音乐培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 180,
                    "TypeImg": "",
                    "TypeName": "美术培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 181,
                    "TypeImg": "",
                    "TypeName": "驾校培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 182,
                    "TypeImg": "",
                    "TypeName": "职业技能",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 183,
                    "TypeImg": "",
                    "TypeName": "升学辅导",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 184,
                    "TypeImg": "",
                    "TypeName": "兴趣生活",
                    "BigShopTypeID": 26
                }]
            }, {
                "ShopTypeID": 32,
                "Typename": "家装",
                "StereoBuildingBig": "",
                "SmallShopTypeList": [{
                    "SmallShopTypeID": 177,
                    "TypeImg": "",
                    "TypeName": "舞蹈培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 178,
                    "TypeImg": "",
                    "TypeName": "语言培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 179,
                    "TypeImg": "",
                    "TypeName": "音乐培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 180,
                    "TypeImg": "",
                    "TypeName": "美术培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 181,
                    "TypeImg": "",
                    "TypeName": "驾校培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 182,
                    "TypeImg": "",
                    "TypeName": "职业技能",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 183,
                    "TypeImg": "",
                    "TypeName": "升学辅导",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 184,
                    "TypeImg": "",
                    "TypeName": "兴趣生活",
                    "BigShopTypeID": 26
                }]
            }, {
                "ShopTypeID": 33,
                "Typename": "健康",
                "StereoBuildingBig": "",
                "SmallShopTypeList": [{
                    "SmallShopTypeID": 177,
                    "TypeImg": "",
                    "TypeName": "舞蹈培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 178,
                    "TypeImg": "",
                    "TypeName": "语言培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 179,
                    "TypeImg": "",
                    "TypeName": "音乐培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 180,
                    "TypeImg": "",
                    "TypeName": "美术培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 181,
                    "TypeImg": "",
                    "TypeName": "驾校培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 182,
                    "TypeImg": "",
                    "TypeName": "职业技能",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 183,
                    "TypeImg": "",
                    "TypeName": "升学辅导",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 184,
                    "TypeImg": "",
                    "TypeName": "兴趣生活",
                    "BigShopTypeID": 26
                }]
            }, {
                "ShopTypeID": 34,
                "Typename": "结婚",
                "StereoBuildingBig": "",
                "SmallShopTypeList": [{
                    "SmallShopTypeID": 177,
                    "TypeImg": "",
                    "TypeName": "舞蹈培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 178,
                    "TypeImg": "",
                    "TypeName": "语言培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 179,
                    "TypeImg": "",
                    "TypeName": "音乐培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 180,
                    "TypeImg": "",
                    "TypeName": "美术培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 181,
                    "TypeImg": "",
                    "TypeName": "驾校培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 182,
                    "TypeImg": "",
                    "TypeName": "职业技能",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 183,
                    "TypeImg": "",
                    "TypeName": "升学辅导",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 184,
                    "TypeImg": "",
                    "TypeName": "兴趣生活",
                    "BigShopTypeID": 26
                }]
            }, {
                "ShopTypeID": 35,
                "Typename": "爱车",
                "StereoBuildingBig": "",
                "SmallShopTypeList": [{
                    "SmallShopTypeID": 177,
                    "TypeImg": "",
                    "TypeName": "舞蹈培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 178,
                    "TypeImg": "",
                    "TypeName": "语言培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 179,
                    "TypeImg": "",
                    "TypeName": "音乐培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 180,
                    "TypeImg": "",
                    "TypeName": "美术培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 181,
                    "TypeImg": "",
                    "TypeName": "驾校培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 182,
                    "TypeImg": "",
                    "TypeName": "职业技能",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 183,
                    "TypeImg": "",
                    "TypeName": "升学辅导",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 184,
                    "TypeImg": "",
                    "TypeName": "兴趣生活",
                    "BigShopTypeID": 26
                }]
            }, {
                "ShopTypeID": 36,
                "Typename": "生活服务",
                "StereoBuildingBig": "",
                "SmallShopTypeList": [{
                    "SmallShopTypeID": 177,
                    "TypeImg": "",
                    "TypeName": "舞蹈培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 178,
                    "TypeImg": "",
                    "TypeName": "语言培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 179,
                    "TypeImg": "",
                    "TypeName": "音乐培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 180,
                    "TypeImg": "",
                    "TypeName": "美术培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 181,
                    "TypeImg": "",
                    "TypeName": "驾校培训",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 182,
                    "TypeImg": "",
                    "TypeName": "职业技能",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 183,
                    "TypeImg": "",
                    "TypeName": "升学辅导",
                    "BigShopTypeID": 26
                }, {
                    "SmallShopTypeID": 184,
                    "TypeImg": "",
                    "TypeName": "兴趣生活",
                    "BigShopTypeID": 26
                }]
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        searchHeight = (wx.getSystemInfoSync().windowWidth) * 114 / 750
        that.setData({
            scrollHeight: wx.getSystemInfoSync().windowHeight - searchHeight
        })
        // loadtuijian(that)
        // loadShopType(that)
        typeLeftLen = that.data.shoptypeData.length + 1
        for (var i = 0; i < typeLeftLen; i++) {
            wx.createSelectorQuery().select('#typeRight' + i).boundingClientRect(function(rect) {
                typeRightItemArr.push(rect.top - searchHeight)
            }).exec()
        }


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
        var that = this
        clickLock = true
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

    },
    typeLeftNav: function(e) {
        var that = this
        var index = e.currentTarget.dataset.index
        that.setData({
            leftIndex: index,
            toView: index
        })

    },
    typeRightSroll: function(e) {

        var that = this
        var srollTop = e.detail.scrollTop
        var index = 0
        for (var i = 0; i < typeRightItemArr.length; i++) {
            if (srollTop >= 0 && srollTop < typeRightItemArr[0]) {
                index = 0
            }
            if (typeRightItemArr[i] < srollTop && typeRightItemArr[i + 1] >= srollTop) {
                index = i
            }
        }
        that.setData({
            leftIndex: index
        }, function() {
            wx.createSelectorQuery().select('#typeLeft' + index).boundingClientRect(function(rect) {
                var rectTop = rect.top
                if (rectTop != (that.data.scrollHeight) / 2) {
                    var itemH = ((wx.getSystemInfoSync().windowWidth) * 88 / 750) * (index - 5) > 0 ? ((wx.getSystemInfoSync().windowWidth) * 88 / 750) * (index - 5) : 0
                    that.setData({
                        typeLeftScollTop: itemH
                    })
                }
            }).exec()
        })

    },
    toerjihangye: function(e) {
        if (clickLock == true) {
            clickLock = false
            var that = this
            var index = e.currentTarget.dataset.index
            //var shoptypeid=e.currentTarget.dataset.shoptypeid
            var typename = e.currentTarget.dataset.typename
            wx.navigateTo({
                url: '/pages/tabBar2/tabBar2?index=' + index + '&typename=' + typename,
            })
        }
    },
    toerjilist: function(e) {
        if (clickLock == true) {
            clickLock = false
            var that = this
            var shoptypeid = e.currentTarget.dataset.shoptypeid
            var smallshoptypeid = e.currentTarget.dataset.smallshoptypeid
            var typename = e.currentTarget.dataset.typename
            wx.navigateTo({
                url: '/pages/erjilist/erjilist?shoptypeid=' + shoptypeid + '&smallshoptypeid=' + smallshoptypeid + '&typename=' + typename,
            })
        }
    },
    toSearch: function() {
        if (clickLock == true) {
            clickLock = false
            wx.navigateTo({
                url: '/pages/sousuoList/index'
            })
        }
    }

})