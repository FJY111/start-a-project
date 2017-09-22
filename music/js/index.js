var music = {

    init: function () {
        this.$panel = $("#panel");
        this.$audio = $("#music");
        this.audio = $("#music")[0];

        this.$songName = $(".song-name");
        this.$singer = $(".singer");
        this.$singer_pic = $(".singer-pic img");
        this.$play = $(".play i");
        this.$needle = this.$panel.find(".needle");
        this.$disco = this.$panel.find(".disco");

        this.$progress = this.$panel.find(".progress");
        this.$currentTime = this.$panel.find(".current-time");
        this.$allTime = this.$panel.find(".all-time");

        this.progress_all = this.$panel.find(".progress-all")[0];
        this.$progress_current = this.$panel.find(".progress-current");
        this.$progress_dot = this.$panel.find(".progress-dot");

        this.$volume_btn = this.$panel.find(".volume-btn");
        this.volume_all = this.$panel.find(".volume-all")[0];
        this.$volume_current = this.$panel.find(".volume-current");
        this.$volume_dot = this.$panel.find(".volume-dot");

        this.$next = this.$panel.find(".next");
        this.$pre = this.$panel.find(".pre");

        this.$listPanel = this.$panel.find(".play-list-item");
        this.$list = this.$panel.find(".play-list-item ul");
        this.$list_btn = this.$panel.find(".play-list");

        this.isListShow = true;
        this.channels = null;
        this.song = {};
        this.songArr = [];
        this.songIndex = 0;
        this.preIndex = 0;

    },

    bind: function () {
        this.getSong("public_tuijian_spring");
        this.playControl();
        this.progressControl();
        this.volumeControl();
        this.nextMusic();
        this.previousMusic();
        this.listControl();
    },

    getSong: function (channel_id) {
        var _this = this;
        $.get('http://api.jirengu.com/fm/getSong.php', {
                channel: channel_id
            })
            .done(function (song) {
                _this.song = JSON.parse(song).song[0];
                _this.songArr.push(_this.song);
                var $s = $("<li songindex=" + _this.songIndex + ">" + _this.song.title + "</li>");
                _this.$list.append($s);
                $s.addClass("select").siblings("li").removeClass("select");
                _this.preIndex = _this.songIndex;
                _this.songIndex++;
                _this.songReset();
            });
    },

    songReset: function () {
        var _this = this;
        _this.$audio.attr("src", _this.song.url);
        _this.$songName.text(_this.song.title);
        _this.$singer.text(_this.song.artist);
        _this.$singer_pic.attr("src", _this.song.picture);

    },

    playControl: function () {
        var _this = this;

        _this.$play.click(function () {
            if (_this.audio.paused)
                _this.audio.play();
            else
                _this.audio.pause();
        });

        _this.$audio.on("play", function () {
            _this.$play.removeClass("icon-bofang").addClass("icon-zanting");
            _this.$needle.addClass("needle-play");
            _this.$disco.addClass("active");
        });

        _this.$audio.on("pause", function () {
            _this.$play.removeClass("icon-zanting").addClass("icon-bofang");
            _this.$needle.removeClass("needle-play");
            _this.$disco.removeClass("active");
            clearInterval(_this.timer);
        });

        _this.$audio.on("dataunvailable", function () {
            _this.$play.removeClass("icon-zanting").addClass("icon-bofang");
            _this.$needle.removeClass("needle-play");
            _this.$disco.removeClass("active");
            clearInterval(_this.timer);
        });

    },

    progressControl: function () {
        var _this = this;

        this.$audio.on("playing", function () {
            updateProgress();
            _this.timer = setInterval(updateProgress, 1000);
        });

        var updateProgress = function () {
            var currentTime = _this.audio.currentTime;
            var allTime = _this.audio.duration;
            var seconds = Math.floor(allTime % 60);
            seconds = seconds < 10 ? "0" + seconds : seconds;
            var _allTime = Math.floor(allTime / 60) + ":" + seconds;
            var second = Math.floor(currentTime % 60);
            second = second < 10 ? "0" + second : second;
            var _currentTime = Math.floor(currentTime / 60) + ":" + second;
            _this.$currentTime.text(_currentTime);
            _this.$allTime.text(_allTime);

            var wide = currentTime / allTime * 100;

            _this.$progress_current.css("width", wide + "%");
            _this.$progress_dot.css("left", wide + "%");

        };

        _this.progress_all.onclick = function (e) {
            _this.audio.currentTime = e.offsetX / 208 * _this.audio.duration;
            updateProgress();
        };
    },

    volumeControl: function () {
        var _this = this;
        this.volume_all.onclick = function (e) {
            _this.audio.volume = e.offsetX / 106;
            _this.$volume_current.css("width", e.offsetX + "px");
            _this.$volume_dot.css("left", e.offsetX + "px");
        };
        this.$volume_btn.on("click", function () {
            _this.audio.volume = 0;
            _this.$volume_current.css("width", 0 + "px");
            _this.$volume_dot.css("left", 0 + "px");
        });
    },

    nextMusic: function () {
        var _this = this;
        this.$next.click(function () {
            _this.getSong("public_tuijian_spring");
        });
    },

    previousMusic: function () {
        var _this = this;

        this.$pre.click(function () {
            if (_this.preIndex != 0)
                _this.song = _this.songArr[--_this.preIndex];
            _this.$list.find("li").eq(_this.preIndex).addClass("select")
                .siblings("li").removeClass("select");
            _this.songReset();
        });
    },

    listControl: function () {
        var _this = this;

        this.$list_btn.click(function () {
            if (_this.isListShow) {
                $(this).find("i").css("color", "red");
                _this.$listPanel.show();
                _this.isListShow = false;
            } else {
                $(this).find("i").css("color", "");
                _this.$listPanel.hide();
                _this.isListShow = true;
            }
        });

        this.$list.on("click", "li", function () {
            var i = $(this).attr("songIndex");
            _this.song = _this.songArr[i];
            _this.preIndex = i;
            _this.songReset();
            $(this).addClass("select").siblings("li").removeClass("select");
        });
    },

    lyricControl: function () {

    }

};


var panel = {
    init: function () {
        this.$panel = $("#panel");
        this.$header = $("header");
    },

    bind: function () {
        this.drag();
    },

    drag: function () {
        this.$panel.draggabilly({
            handle: "header"
        });
    },


};

music.init();
music.bind();
panel.init();
panel.bind();