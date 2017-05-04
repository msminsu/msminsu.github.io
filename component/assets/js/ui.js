$(document).ready(function () {
	/*메인페이지 아코디언 테스트 용*/
    $('[class^="acc-"] h3 button').on('click', function () {
        if($(this).parents('section').hasClass('active')){
            $(this).parents('section').removeClass('active');
        }else{
            $(this).parents('section').addClass('active');
        }

    });

	/*전체메뉴 테스트 용*/
    $('.btn-total-close').on('click', function () {
        $('body').removeClass('gnb-open');
        $('nav').removeClass('open');

    });
    $('.btn-total-open').on('click', function () {
        $('body').addClass('gnb-open');
        $('nav').addClass('open');
    });

    //팝업 테스트용  sub2.html 신청하기 버튼
    $("#contents .btn-wrap2 button").on("click",function(){
        $(".layer-wrap").css({"display":"block"});
    });
    $('.layer-wrap .btn-close').on('click',function(){
        $(".layer-wrap").css({"display":"none"});
    });

    //서브페이지 로케이션 테스트용
    $('.sub-depth-wrap button').on('click', function () {
        if($(this).closest('div').hasClass('active')){
            $(this).closest('div').removeClass('active');
        }else{
            $(this).closest('div').addClass('active');
        }

    });

    /*서브페이지 아코디언 컨텐츠 테스트 용*/
    $('.accodion-box>li>button').on('click', function (e) {
        var $this = $(this);
        var current = $this.parent().index();


        if ($this.parent().hasClass('active')) {
            $this.find('span').text('펼치기');
            $this.parent().find('.acc-content').slideUp(function () {
                $('.accodion-box>li').removeClass('active');
            });

        } else {
            $('.accodion-box>li').find('.acc-content').slideUp(
                function () {
                    $('.accodion-box>li').removeClass('active');
                    $('.accodion-box>li button span').text('펼치기');
                }
            );
            $('.accodion-box>li').eq(current).find('.acc-content').slideDown(
                function () {
                    $('.accodion-box>li').eq(current).addClass('active');
                    $('.accodion-box>li').eq(current).find('button span').text('접기');
                }
            );

        }
    });
});