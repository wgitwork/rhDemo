$(".site_tem").css("background", "#fff");
$(".site_tem:even").css("background", "#eeeeee")


function getUrlParms(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    console.log(reg);
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

var id = getUrlParms("id");
// var id = localStorage.getItem('ide');
console.log(id);

$.ajax({
    type: "POST",
    url: "http://192.168.2.169:8086/WanJiApp/JsonAppPubEquip/JsonAppSiteEquip.do",
    data: {
        site_id: id
    },
    dataType: "json",
    async: false,
    success: function(data) {
        console.log(data);
        if (data.pubEquipRepairs.length == 0) {
            document.querySelector(".had").innerHTML = "";
            alert("此站点暂无数据");

        } else {
            var ht = "";

            for (var i = 0; i < data.pubEquipRepairs.length; i++) {

                function timestampToTime(timestamp) {
                    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                    Y = date.getFullYear() + '-';
                    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                    D = date.getDate() + ' ';
                    h = date.getHours() + ':';
                    m = date.getMinutes() + ':';
                    s = date.getSeconds();
                    return Y + M + D + h + m + s;
                }
                // console.log(timestampToTime(1403058804))
                var a = timestampToTime(data.pubEquipRepairs[i].patrolTime);
                var b = timestampToTime(data.pubEquipRepairs[i].repairTime);
                // console.log(a)
                if (data.pubEquipRepairs[i].runningStatus == 0) {
                    var runningStatus = "正常";
                    ht += " <a class='site_tem site_tm' id=" + data.pubEquipRepairs[i].id + " > <ul><li>" + data.pubEquipRepairs[i].equipName + "</li><li>" + data.pubEquipRepairs[i].patrolCode + "</li><li>" + b + "</li> <li>" + a + "</li><li>" + runningStatus + "</li></ul></a>"

                } else {
                    var runningStatus = "异常";
                    ht += " <a class='site_tem site_tm' id=" + data.pubEquipRepairs[i].id + "> <ul><li>" + data.pubEquipRepairs[i].equipName + "</li><li>" + data.pubEquipRepairs[i].patrolCode + "</li><li>" + b + "</li> <li>" + a + "</li><li>" + runningStatus + "</li></ul></a>"

                }
            };
            $(".had").html(ht);
            // document.querySelector(".had").innerHTML = ht;
            // var pt = document.querySelector(".had");

            // for (var i = 0; i < data.pubEquipRepairs.length; i++) {

            //     pt.children[i].onclick = function() {
            //         localStorage.setItem("id", this.id)
            //         var id = this.id;
            //         window.location.href = "objc://share:" + id;

            //         // href='zdshebeixiangqing.html'
            //     }
            // }
        }

    }
});
// window.onload = function() {
//     ljd = "<a id= " + id + " class='lkj'>添加</a>";
//     $(".ljd").html(ljd);

//     var lk = document.getElementsByClassName("lkj");
//     lk[0].onclick = function() {
//         console.log("llk")
// localStorage.setItem("idj", this.id)
// var id = this.id;
// window.location.href = "objc://share:" + id;

//  href='tjweixiuxinxi.html'
// }
// }
$(".tj").click(function() {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        callKeyBoard.intentDentDate();
    } else if (u.indexOf('iPhone') > -1) {
        window.location.href = "objc://share";
    };
})
$(".site_tem").each(function() {
    $(this).click(function() {
        var ide = $(this).attr("id")
        console.log(ide);
        var u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            sate.getID(id);
        } else if (u.indexOf('iPhone') > -1) {
            window.location.href = "robjc://share:" + ide + "&" + id;
        };
    })
})