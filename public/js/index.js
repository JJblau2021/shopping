$(function () {
    // 动态添加楼层
    var arr = [];
    var flag = true;
    $(".floor .w").each(function (i, ele) {
        // console.log(ele);
        arr[i] = {};
        arr[i].a = $("<a></a>");
        var floorName = $(ele).find("h3").html();
        arr[i].a.html(floorName);
        arr[i].li = $("<li></li>");
        arr[i].li.addClass("caidan").append(arr[i].a);

        arr[i].li.click(function () {
            // console.log(1);
            flag = false;
            $(this).addClass("checked").siblings().removeClass("checked");
            $("body, html").stop().animate({
                scrollTop: $(".floor .w").eq(i).offset().top
            }, function () {
                flag = true;
            });
        });




        $(".floors").append(arr[i].li);
    })
    // 电梯工具随页面滚动显示隐藏
    function floorsFc() {
        var recomTop = $(".recom").offset().top;
        // console.log($(document).scrollTop());
        if ($(document).scrollTop() >= recomTop) {
            $(".floors").stop().fadeIn(200);
            if (flag) {
                $(".floors .caidan").eq(0).addClass("checked");
            }
            $(".goback").stop().fadeIn(200);
        } else {
            $(".floors").stop().fadeOut(200);
            $(".goback").stop().fadeOut(200);
        }
        if (flag) {
            $(".floor .w").each(function (i, ele) {
                if ($(document).scrollTop() >= $(".floor .w").eq(i).offset().top) {
                    $(".floors .caidan").eq(i).addClass("checked");
                    $(".floors .caidan").eq(i).siblings().removeClass("checked");
                }
            })
        }

    }
    floorsFc();
    $(window).scroll(function () {
        floorsFc();

    });

    // 返回顶部按钮
    $(".goback").click(function () {
        $("body, html").stop().animate({
            scrollTop: 0
        })
    })

    // 轮播图
    var flagLeft = true;
    var imgs = $(".Focus .bigImg li");
    var img1Copy = imgs[0].cloneNode(true);
    // console.log(img);
    $(".Focus .bigImg").append(img1Copy);
    var imgBox = $(".Focus .bigImg");
    var imgsNew = $(".Focus .bigImg li");
    // console.log(imgs);
    imgs.each(function (i, ele) {
        var li = $("<li></li>");
        li.click(function () {
            imgBox.stop().animate({
                left: -721 * i

            });
            $(".Focus .circleList li").each(function (i, ele) {
                ele.style.backgroundColor = "#fff";
                ele.style.opacity = 1;
            });
            li[0].style.backgroundColor = "red";
            // console.log(ele);
        })
        $(".Focus .circleList").append(li);
    })
    $(".Focus .right").click(function () {
        if (flagLeft) {
            flagLeft = false;
            var leftValue = imgBox[0].offsetLeft;
            var leftMax = imgs.length * -721;
            if (leftValue == leftMax) {
                imgBox[0].style.left = 0;
                leftValue = 0;
                // console.log($(".Focus .bigImg")[0]);
            }
            // console.log(leftValue + ", " + leftMax);

            imgBox.stop().animate({
                left: leftValue - 721
            }, function () {
                getCircle();
                flagLeft = true;
            });
        }
    });
    $(".Focus").mouseenter(function () {
        $(".left, .right, .circleList").show();
    }).mouseleave(function () {
        $(".left, .right, .circleList").hide();
    })

    $(".Focus .left").click(function () {
        if (flagLeft) {
            flagLeft = false;
            var leftValue = imgBox[0].offsetLeft;
            var leftMax = imgs.length * -721;
            if (leftValue == 0) {
                imgBox[0].style.left = imgs.length * -721 + "px";
                leftValue = imgs.length * -721;
                console.log(imgBox[0])
            }
            // console.log(leftValue + ", " + leftMax);

            imgBox.animate({
                left: leftValue + 721
            }, function () {
                getCircle();
                flagLeft = true;
            });
        }
    });
    getCircle();
    function getCircle() {
        $(".Focus .bigImg li").each(function (i, ele) {
            var index = i % imgs.length;
            if (imgBox[0].offsetLeft <= -721 * i) {
                $(".Focus .circleList li").each(function (i, ele) {
                    ele.style.backgroundColor = "#fff";
                    ele.style.opacity = 1;
                });
                // console.log(index);
                $(".Focus .circleList li")[index].style.backgroundColor = "red";
            }
        })
    }
})


