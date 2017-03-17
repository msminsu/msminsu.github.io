var $body = null;
var tops = [];

$(document).ready(function() {

	 var sdr = new Slider('.box-movie');// 올레 tv
	 var tabslider = new TabSlider('.tab-slider');// 고객혜택
	 $('.event-slider').bxSlider({
	 	auto: true
	 });

	$body = $("html, body");

	$(".container>div").each(function(index){
		var top = $(this).offset().top;
		tops[index] = top;
	});

	var visual = {
		wrap : $('.ui_visual'),
		list : $('.ui_visual > li'),
		items : $('.ui_visual > li .items'),
		controller : $('.visualWrap .controller'),
		item_speed : 900,
		ease : 'easeOutExpo',
		interv : 5000,
		num : 0,
		pager: $('.pager li')
	}

	var visual_evt = function(){

		visual.list.each(function(){
			$(this).removeClass('current done');
		});
		this_list = visual.list.eq(visual.num);

		this_list.addClass('current');
			visual.pager.removeClass('on');
			visual.pager.eq(visual.num).addClass('on');
		};

	var visual_set = function(){
		visual.list.eq(0).addClass('current');
		visual.pager.eq(0).addClass('on');
		if(visual.list.length > 1){
			visual_controller_html = '';
			visual.list.each(function(index){
				if(index == 0){
					visual_controller_html += '<button type="button" class="active">'+(index+1)+'</button>';
				}else{
					visual_controller_html += '<button type="button">'+(index+1)+'</button>';
				}
			});
			visual.controller.html(visual_controller_html);
		}
		setTimeout(function() {
			visual.list.eq(0).addClass('done');
		}, 2000)
	}
	visual_set();
	$(".btn-prev").on('click',function(){
				clearInterval(visual_interval);
				visual.num--;
				if(visual.num >= visual.list.length){
						visual.num = 0;
				}
				visual_controller_evt();
				visual_auto();
		});

		$(".btn-next").on('click',function(){
				clearInterval(visual_interval);
				visual.num++;
				if(visual.num >= visual.list.length){
						visual.num = 0;
				}
				visual_controller_evt();
				visual_auto();
		});

		$(".btn-stop").on('click',function(){
				clearInterval(visual_interval);
		});

		$(".btn-play").on('click',function(){
				visual_auto();
		});

		$(".pager a").on('click',function(){
				clearInterval(visual_interval);
				$(".pager li").removeClass('on');
				$(this).parent('li').addClass('on');
				visual.num = $(this).parent('li').index();
				visual_controller_evt();
				visual_auto();
		});
	var visual_controller_evt = function(){
		visual_evt();
	}
	var visual_num_evt = function(){
		visual.num++;
		if(visual.num >= visual.list.length){
			visual.num = 0;
		}
		visual_controller_evt();
	}

	// 기존 자동 재생
	var visual_interval;
	var visual_auto = function(){
		visual_interval = setInterval(visual_num_evt, visual.interv);
	};
	visual_auto();

	//gnb
	$('.gnb').mouseenter(function() {
		$('.gnb').addClass('current');
	});
	$('.gnb').mouseleave(function() {
		$('.gnb').removeClass('current');
	});

	//snb
	$('.snb-button button').click(function() {
		$('.snb').toggleClass('active');
	});
});

$(window).scroll(function () {
	var docScrollTop = $(document).scrollTop();
	log(docScrollTop);

	//gnb effect
	if(docScrollTop < 32) {
		$(".gnb").removeClass('active');
	}
	if(docScrollTop > 32) {
		$(".gnb").addClass('active');
	}

	//contents motions
	if(docScrollTop >= 50) {
		$(".contents1 .invisible").addClass('active');
	}
	if (docScrollTop > 990) {
		$(".contents2 .headings.invisible").addClass('active');
		$(".contents2 .contents2-2.invisible").addClass('active');
	}
	if (docScrollTop > 1150) {
		$(".contents2 .contents2-3.invisible").addClass('active');
	}
	if (docScrollTop > 1850) {
		$(".contents3 .invisible").addClass('active');
	}

	//snb
	if ($('.lnb').length) snbXscroll();
});

function log(str){
	$('.log').text(str);
}

function moveScroll(id){
	var index = id;
	var speed = 400;
	
	if(index == top){
		$body.animate({scrollTop:0},speed);
	}else{
		$body.animate({scrollTop:tops[index]},speed,function(){$(window).unbind("scroll")});
	}
}

function snbXscroll () {
	var windowScroll = $(window);
	$('.lnb').css('left', - windowScroll.scrollLeft());
}

function layPop(obj){
	var self = $(obj),
			target = $($(obj).attr('href'));

	target.show();
	target.append("<div class='mask'></div>");
	target.find(".mask").css("opacity","0.7");

	target.find('.layer-close').click(function(e){
		target.find('.mask').remove();
		target.hide();
	});
}

function layPop2(obj) {
	var self = $(obj),
		target = $($(obj).attr('href'));

		self.stop().animate({
			opacity: 0
		}, 500);
		$('.d-days').stop().animate({
			opacity: 0
		}, 300);
		$('.contents8').animate({
			height:600
		}, 50, function() {
			target.delay(200).fadeIn();
		});

		target.find('.layer-close').click(function(e){
			$('.contents8').animate({
				height:221
			}, 10);
			self.stop().animate({
			opacity: 1
			}, 500);
			$('.d-days').stop().animate({
			opacity: 1
			}, 300);
			target.hide();
		});
}

function layPop3(obj){
	var self = $(obj),
			target = $($(obj).attr('href'));

	target.show();
	$('.snb').addClass('active');

	target.find('.layer-close').click(function(e){
		target.hide();
	});
}

function loginPop1(obj) {
	var self = $(obj),
		target = $($(obj).attr('href'));

		$('.snb-login li:nth-child(2)').removeClass('active');
		$('.snb-login li:nth-child(1)').addClass('active');
		$('.snb-login-layer2').fadeOut();
		target.show();
		$('.snb-login-layer1').stop().animate({
			opacity: 1,
			marginLeft: "+=94px"
		}, 300);
}

function loginPop2(obj) {
	var self = $(obj),
		target = $($(obj).attr('href'));

		$('.snb-login li:nth-child(1)').removeClass('active');
		$('.snb-login li:nth-child(2)').addClass('active');

		target.show();
		$('.snb-login-layer2').stop().animate({
			opacity: 1,
			marginLeft: "+=94px"
		}, 300);

	$('.snb-login-layer2 .layer-close').click(function(){
		$('.snb-login-layer2').stop().animate({
			opacity: 0,
			marginLeft: "-=94px"
		}, 300, function() {
			$('.snb-login-layer2').hide();
		});
		$('.snb-login li:nth-child(2)').removeClass('active');
	});
}

function loginPop3(obj) {
	var self = $(obj),
		target = $($(obj).attr('href'));

		$('.snb-login li:nth-child(1)').removeClass('active');
		$('.snb-login li:nth-child(2)').addClass('active');

		$('.snb-login-layer1').stop().animate({
			opacity: 0,
			marginLeft: "-=94px"
		}, 300, function() {
			$('.snb-login-layer1').hide();
		});

		target.show();
		$('.snb-login-layer2').stop().animate({
			opacity: 1,
			marginLeft: "+=94px"
		}, 300);

	$('.snb-login-layer2 .layer-close').click(function(){
		$('.snb-login-layer2').stop().animate({
			opacity: 0,
			marginLeft: "-=94px"
		}, 300, function() {
			$('.snb-login-layer2').hide();
		});
		$('.snb-login li:nth-child(2)').removeClass('active');
	});
}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    올레 tv
 function isDoubleClicked(element) {
        //if already clicked return TRUE to indicate this click is not allowed
        if (element.data("isclicked")) return true;

        //mark as clicked for 1 second
        element.data("isclicked", true);
        setTimeout(function () {
            element.removeData("isclicked");
        }, 1000);

        //return FALSE to indicate this click was allowed
        return false;
    }


    function Slider(selector) {
        this.$slider = null;
        this.$next = null;
        this.$prev = null;
        this.$sliderItem = null;
        this.$textItem = null;
        this.intervalID = null;
        this.currentNum = 0;
        this.pos = [

            [608, 816, 1017, 1218, 1419, 1620, -201, 0, 201, 402],
            [816, 1017, 1218, 1419, 1620, -201, 0, 201, 402, 608],
            [1017, 1218, 1419, 1620, -201, 0, 201, 402, 608, 816],
            [1218, 1419, 1620, -201, 0, 201, 402, 608, 816, 1017],
            [1419, 1620, -201, 0, 201, 402, 608, 816, 1017, 1218],
            [1620, -201, 0, 201, 402, 608, 816, 1017, 1218, 1419],
            [-201, 0, 201, 402, 608, 816, 1017, 1218, 1419, 1620],
            [0, 201, 402, 608, 816, 1017, 1218, 1419, 1620, -201],
            [201, 402, 608, 816, 1017, 1218, 1419, 1620, -201, 0],
            [402, 608, 816, 1017, 1218, 1419, 1620, -201, 0, 201]
        ];

        this.init(selector);
        this.initEvent();
        this.autoPlay();
    }

    Slider.prototype.init = function (selector) {
        var that = this;
        this.$slider = $(selector);
        this.$sliderItem = this.$slider.find('.tv-slider>li');
        this.$textItem = this.$slider.find('.box-text>li');
        this.$prev = this.$slider.find('.btn-prev');
        this.$next = this.$slider.find('.btn-next');

        this.$sliderItem.each(function (index) {
            $(this).css({left: that.pos[that.currentNum][index]});
        });

    };

    Slider.prototype.initEvent = function () {
        this.$prev.on('click.prev', $.proxy(this.prevMv, this));
        this.$next.on('click.next', $.proxy(this.nextMv, this));
    };

    Slider.prototype.prevMv = function () {
        if (isDoubleClicked($(this))) return;
        clearInterval(this.intervalID);
        this.currentNum++;
        if (this.currentNum >= 10) {
            this.currentNum = 0;
        }
        this.moveSlide('prev');
        this.autoPlay();
    };

    Slider.prototype.nextMv = function () {
        if (isDoubleClicked($(this))) return;
        clearInterval(this.intervalID);
        this.moveSlide('next');
        this.autoPlay();
    };

    Slider.prototype.autoPlay = function () {

        this.intervalID = setInterval($.proxy(this.moveSlide, this), 2000, 'next');
    };

    Slider.prototype.textMv = function () {

        var textArr = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1];
        this.$textItem.eq(textArr[this.currentNum]).delay(5000).addClass('active');
    };

    Slider.prototype.moveSlide = function (direction) {
        var that = this;
        if (direction == 'next') {
            this.currentNum--;
            if (this.currentNum < 0) {
                this.currentNum = 9;
            }
        }
        this.$sliderItem.each(function (index) {

            that.$textItem.eq(index).removeClass('active');

            $(this).removeClass('active');
            that.$textItem.remove('active');
            if (direction == 'next') {
                if (that.pos[that.currentNum][index] != 1620) {
                    $(this).stop().animate({left: that.pos[that.currentNum][index]}, 500, function () {
                        if (that.pos[that.currentNum][index] == 608) {
                            $(this).addClass('active');
                        }
                        that.textMv();
                    });
                } else {
                    $(this).css({left: that.pos[that.currentNum][index]});
                }
            } else {
                if (that.pos[that.currentNum][index] != -201) {

                    $(this).stop().animate({left: that.pos[that.currentNum][index]}, 500, function () {
                        if (that.pos[that.currentNum][index] == 608) {
                            $(this).addClass('active');
                        }
                        that.textMv();
                    });
                } else {
                    $(this).css({left: that.pos[that.currentNum][index]});
                }
            }
        });
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  고객혜택
    function TabSlider(selector) {
        this.$tabSlider = null;
        this.$tabBar = null;
        this.$tabCons = null;
        this.$next = null;
        this.$prev = null;
        this.intervalID = null;
        this.currentNum = 0;

        this.init(selector);

        this.initEvent();
        this.autoPlay();
    }

    TabSlider.prototype.init = function (selector) {

        this.$tabSlider = $(selector);
        this.$tabBar = this.$tabSlider.find('.tab-menu');
        this.$tabMenuItems = this.$tabBar.find('li');
        this.$tabCons = this.$tabSlider.find('.tab-con>li');
        this.$prev = this.$tabSlider.find('.btn-tab-prev');
        this.$next = this.$tabSlider.find('.btn-tab-next');
        this.$prev.css({opacity:.5});
        this.$next.css({opacity:1});

    };

    TabSlider.prototype.initEvent = function () {
        this.$prev.on('click.prev', $.proxy(this.prevMv, this));
        this.$next.on('click.next', $.proxy(this.nextMv, this));
        this.$tabMenuItems.on('click.tabnav',$.proxy(this.tabSelect, this))
    };

    TabSlider.prototype.tabSelect = function(e){
        clearInterval(this.intervalID);
        this.currentNum = $(e.currentTarget).index();
        this.tabView();
        this.autoPlay();
    };

    TabSlider.prototype.tabView = function(){

        this.$tabMenuItems.removeClass('active');
        this.$tabCons.removeClass('active');
        this.$tabMenuItems.eq( this.currentNum).addClass('active');
        this.$tabCons.eq( this.currentNum).addClass('active');
    };


    TabSlider.prototype.prevMv = function () {
        if (isDoubleClicked($(this))) return;
        this.$tabBar.animate({left: 0 }, 500);
        this.$prev.css({opacity:.5});
        this.$next.css({opacity:1});
    };

    TabSlider.prototype.nextMv = function () {
        if (isDoubleClicked($(this))) return;
        this.$tabBar.animate({left: -180 }, 500);
        this.$prev.css({opacity:1});
        this.$next.css({opacity:.5});
    };

    TabSlider.prototype.autoPlay = function () {

        this.intervalID = setInterval($.proxy(this.moveTab, this), 4000);
    };


    TabSlider.prototype.moveTab = function () {

        if(this.currentNum>=this.$tabCons.length-1){
            this.currentNum = 0;
            this.prevMv();
        }else{
            this.currentNum++;
            if(this.currentNum ==5){
                this.nextMv();
            }
        }

        this.tabView();
    };