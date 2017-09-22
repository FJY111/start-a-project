function index() {
    this.menuSlide();
    this.bannerSilde();
    this.productShow();
    this.appTab();
    this.tab();
    this.newsTab();
}

index.prototype.menuSlide = function () {
    $(".menu li a").mouseover(function () {
        var i = $(this).parent("li").index();
        $(".menulist>ul>li").hide().eq(i).slideDown();

    });

    $(".menulist>ul>li").mouseleave(function () {
        $(this).hide();
    });

    $(".menulist .dot").click(function () {
        $(this).parent("li").slideUp();
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() > 0) {
            $(".bar").slideUp();
        } else {
            $(".bar").slideDown();
        }
    });
};

index.prototype.bannerSilde = function () {
    var index = 0;
    slide(1349);
    var time = setInterval(function () {
        slide(1349);
    }, 5000);
    $(".slide-buttons li").mouseover(function () {
        var i = $(this).index();
        var length = (i - index) * 1349;
        slide(length);
        index = i;
    });

    $(".banner").hover(function () {
        clearInterval(time);
    }, function () {
        time = setInterval(function () {
            slide(1349);
        }, 5000);
    })

    function slide(length) {
        index += 1;
        $(".banner .slide-list").stop(true, true).animate({
            left: "-=" + length + "px"
        }, 1000, function () {
            var i = $(".banner .slide-list").css("left");
            if (parseInt(i) < -5396) {
                $(".banner .slide-list").css("left", "0px");
                index = 0;
            }
            $(".slide-buttons li").removeClass("active").eq(index).addClass("active");
        });
    }
};

index.prototype.productShow = function () {
    $(".show-contain ul li").hover(function () {
        $(this).find(".show-info").animate({
            top: "0px"
        }, 100);
    }, function () {
        $(this).find(".show-info").animate({
            top: "182px"
        }, 100);
    });
    $(".pre").click(function () {
        var i = parseInt($(".show-contain ul").css("left"));
        if (i >= 0)
            show(-1010);
        else {
            show(i + 202);
        }
    });

    $(".next").click(function () {
        var i = parseInt($(".show-contain ul").css("left"));
        if (i <= -1010)
            show(0);
        else
            show(i - 202);
    });

    var time = setInterval(function () {
        $(".next").trigger("click");
    }, 2000)

    $(".show-contain,.pre,.next").hover(function () {
        clearInterval(time)
    }, function () {
        time = setInterval(function () {
            $(".next").trigger("click");
        }, 2000)
    });

    function show(length) {
        $(".show-contain ul").stop(true, true).animate({
            left: length + "px"
        }, 1000);
    }
};

index.prototype.appTab = function () {
    $(".app-right-title ul li").click(function () {
        var i = $(this).index();
        $(this).siblings().removeClass().end().addClass("apptab");
        $(".app-right-content ul").hide().eq(i).show();
    });
};

index.prototype.tab = function () {
    $(".product-link").hover(function () {
        $(this).find("p").hide();
        $(this).find(".link-text").stop().animate({
            top: "0px"
        }, 500);
    }, function () {
        $(this).find("p").show();
        $(this).find(".link-text").stop().animate({
            top: "100%"
        }, 500);
    })
};

index.prototype.newsTab = function () {
    var img = ["./images/index/i16-1.jpg","./images/index/i16-2.jpg","./images/index/i16-3.jpg","./images/index/i16-4.jpg","./images/index/i16-5.jpg"]
    $(".news-menu ul li").click(function () {
        var i = $(this).index();
        $(this).siblings().removeClass().end().addClass("news-active");
        $(".news-article").children().hide().eq(i).show();
        $(".news-img img").attr("src",img[i]);
    });
};

new index();