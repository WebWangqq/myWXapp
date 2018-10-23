function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/****  ****/

/*提示弹框*/
var showTipBox = function(that, string) {
    that.setData({
        tipBoxShow: true,
        tipBoxText: string
    })
    setTimeout(function() {
        that.setData({
            tipBoxShow: false,
            tipBoxText: ''
        })
    }, 2000)
}

/**适配**/
var adaptive = function(that) {
    var num
    wx.getSystemInfo({
        success: function(res) {
            //console.log(res.platform)
            if (res.platform == 'ios') {
                num = 1
                if (res.model == 'iPhone X') {
                    that.setData({
                        isIpX: true
                    })
                } else {
                    that.setData({
                        isIpX: false
                    })
                }

            } else {
                num = 2
                that.setData({
                    isIpX: false
                })

            }
        }
    })
    return num
}


/*输入手机号格式化*/
var formatMobile = function(obj) {
    var value = obj.replace(/\s*/g, "");
    var result = [];
    for (var i = 0; i < value.length; i++) {
        if (i == 3 || i == 7) {
            result.push(" " + value.charAt(i));
        } else {
            result.push(value.charAt(i));
        }
    }
    return result.join("");
}
/*校验手机号*/
var isMobile = function(string) {
    var mobile = /^1[3456789]\d{9}$/;
    var flag = mobile.test(string.replace(/\s+/g, ""))
    return flag
}

/*输入银行卡号格式化*/
function formatBankcardNum(obj) {
    var value = obj.replace(/\s*/g, "");
    var result = [];
    for (var i = 0; i < value.length; i++) {
        if (i % 4 == 0 && i != 0) {
            result.push(" " + value.charAt(i));
        } else {
            result.push(value.charAt(i));
        }

    }
    return result.join("");
}
/*校验身份证号*/
var isIdcard = function(string) {
    var idcard = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
    var flag = idcard.test(string.replace(/\s+/g, ""))
    return flag
}

//数字每4位切割组成一个数组
var formatCodeNum = function(obj) {
    var value = obj.replace(/\s*/g, "");
    var result = [];
    var j = 0
    for (var i = 0; i < value.length; i++) {
        if (i % 4 == 0) {
            result.push(value.slice(4 * j, 4 * j + 4));
            j++
        }
    }
    return result
}

//根据2点经纬度生成距离
function GetDistance(lat1, lng1, lat2, lng2) {
    if (null == lat1 || null == lng1 || null == lat2 || null == lng2 || '' == lat1 || '' == lng1 || '' == lat2 || '' == lng2) {
        return 0;
    }
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s.toFixed(1)
};

//格式化距离
function formatDistance(obj) {
    if (Number(obj) < 1) {
        return Number(obj) * 1000 + "m"
    } else {
        return Number(obj).toFixed(2) * 100 / 100 + "km"
    }
}

/* 排序 */
function commpare(property) {
    return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
};

module.exports = {
    formatTime: formatTime,
    formatNumber: formatNumber,
    showTipBox: showTipBox, //弹框
    formatBankcardNum: formatBankcardNum, //身份证号格式化
    isIdcard: isIdcard, //验证身份证号
    formatMobile: formatMobile, //手机号格式化
    isMobile: isMobile, //验证手机号
    adaptive: adaptive, //适配，
    formatCodeNum: formatCodeNum,
    GetDistance: GetDistance,
    formatDistance: formatDistance,
    commpare:commpare
}