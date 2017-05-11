/**
 * COMMON UI
 * Created by UI Team
 */

var KNBUI = KNBUI || {};
var openMsg_open = "";
var openMsg_close = "";
/**
 * helper
 */

KNBUI.helper = (function($){
    function Stack(){
        this.store = [];
    }

    Stack.prototype.add = function(value){
        this.store.push(value);
    };
    Stack.prototype.get = function(){
        return this.store.pop();
    };

    function compare(a, b){
        return a == b;
    }

    function maxValue(value){
        return Math.max.apply(null, value);
    }

    function toggleText(node, t1, t2){
        var text = node.text();

        if(text.indexOf(t1) > -1) {
            node.text(text.replace(t1, t2));
        }else{
            node.text(text.replace(t2, t1));
        }
    }

    function getTrueKey(data){
        for(key in data){
            if(data[key]) {
                return key;
            }
        }
    }

    return {
        Stack:Stack,
        compare:compare,
        maxValue:maxValue,
        toggleText:toggleText,
        getTrueKey:getTrueKey
    }
}(window.jQuery));

/**
 * dic
 */
KNBUI.dic = {
    siteCode:window.LOCALE ? window.LOCALE : '',
    browser:(function(){
        var agent = navigator.userAgent;

        return KNBUI.helper.getTrueKey({
            'edge':agent.match(/edge/i),
            'chrome':agent.match(/chrome/i),
            'ie11':agent.match(/rv:11.0/i),
            'ie10':agent.match(/msie 10.0/i),
            'ie9':agent.match(/msie 9.0/i),
            'ie8':agent.match(/msie 8.0/i),
            'ie7':agent.match(/msie 7.0/i),
            'firefox':agent.match(/firefox/i),
            'safari':agent.match(/safari/i),
            'opera':agent.match(/opera/i)
        });
    })(),
    os:(function(){
        var agent = navigator.userAgent;

        return KNBUI.helper.getTrueKey({
            'window':agent.match(/windows/i),
            'mac':agent.match(/macintosh/i)
        });
    })()
}

/**
 * common
 */
KNBUI.common = function(){
    var detect = {
        setHandle:false,
        isMove:false
    };

    //tooltip
    function tooltip(){
        $(document).on('mouseenter mouseleave focusin focusout', '.btn-ico2-tip, .btn-ico2-error, .tooltip .btn-white-s', function(e){
            if(e.type == 'mouseenter' || e.type == 'focusin') {
                if($(this).hasClass('type2')){
                    $(this).siblings('[class*="tip"]').show();
                    $(this).removeClass('off');
                } else {
                    $(this).find('[class*="tip"]').show();
                }
            } else if(e.type == 'mouseleave' || e.type == 'focusout') {
                if(!$(this).hasClass('type2')){
                    $(this).find('[class*="tip"]').hide();
                }
            }
        });
        $(document).on('click', '.tip-error.type2 > a', function(e){
            $(this).parents('.tip-error.type2').hide();
            $(this).parents('.tooltip').find('.btn-ico2-error.type2').addClass('off');
        });

        $(document).on('mouseenter mouseleave focusin focusout', '.tooltip.tunp', function(e){
            if(e.type == 'mouseenter' || e.type == 'focusin') {
                $(this).find('[class*="tip"]').show();
            }else if(e.type == 'mouseleave' || e.type == 'focusout') {
                $(this).find('[class*="tip"]').hide();
            }
        });

        //툴팁 클릭시 앵커이동 제거
        $(document).on('click.knbui.tooltip', '.btn-ico2-tip, .btn-ico3-tip, .btn-ico2-error, .tooltip .btn-white-s', function(e){
            e.preventDefault();
        });
    }

    //file upload
    function fileBox(){
        $(document).on('change click', '.input-file [type="file"]', function(){
            $(this).siblings('.file-name').val($(this).val());
        });

        $(document).on('focusin focusout', '.input-file [type="file"]', function(e){
            e.type == 'focusin' ? $(this).next().addClass('file-focus') : $(this).next().removeClass('file-focus');
        });
    }

    function accessibilityFocus(){
        $(document).on('keydown', '[data-focus-prev], [data-focus-next]', function(e){
            var next = $(e.target).attr('data-focus-next'),
                prev = $(e.target).attr('data-focus-prev'),
                target = next || prev || false;
            if(!target || e.keyCode != 9) {
                return;
            }
            if((!e.shiftKey && !!next) || (e.shiftKey && !!prev)) {
                setTimeout(function(){
                    $('[data-focus="' + target + '"]').focus();
                }, 1);
            }
        });
    }

    function maxHeight(compare){
        if(!$('[data-compare-height]')) {
            return;
        }

        function setHeight(obj){
            var value = [];

            for(var i = 0; i < obj.length; i++){
                if(obj[i]) {
                    value.push(obj[i].outerHeight());
                }else{
                    value.push(0);
                }
            }

            for(var j = 0; j < value.length; j++){
                if(!obj[j]) {
                    continue;
                }
                obj[j].css({
                    'height':KNBUI.helper.maxValue(value) + 'px'
                });
            }
        }

        $('[data-compare-height]').each(function(){
            var module = $(this),
                compareLength = module.attr('data-compare-height'),
                box = module.find('.box'),
                boxLength = box.size(),
                dataStore = [],
                dataStoreGroup = [],
                start = 0;

            box.css('height', 'auto');

            for(var i = 0; i < Math.ceil(boxLength / compareLength); i++){
                dataStoreGroup.push([]);
            }

            box.each(function(){
                dataStore.push($(this));
            });

            while(dataStore.length > 0){
                for(var j = 0; j < compareLength; j++){
                    dataStoreGroup[start].push(dataStore.shift());
                }
                start = start + 1;
            }

            for(var n = 0; n < dataStoreGroup.length; n++){
                setHeight(dataStoreGroup[n]);
            }
        });
    }

    function switchButton(){
        var switchBtn = '[data-switch]',
            switchBox = '[data-switch-name]';

        if($(switchBox).length == 0) {
            return;
        }

        $(switchBox).hide();
        $(document).on('click.knbui.common.switchButton', switchBtn, function(e){
            e.preventDefault();

            var target = e.target,
                hideTarget = $('[data-switch-name="' + $(target).attr('data-switch') + '"]');

            hideTarget.hide();
            $(e.target.hash).show();
        });

        $('[data-checked="checked"]').each(function(){
            $(this).trigger('click');
        });
    }

    function openMsg() {
        if (LOCALE) {

            if(LOCALE == "kr") {
                openMsg_open = "약관보기";
                openMsg_close = "약관닫기";
            }
            else if(LOCALE == "en") {
                openMsg_open = "View terms";
                openMsg_close = "Close terms";
            }
            else if (LOCALE == "zh") {
                openMsg_open = "查看条约";
                openMsg_close = "条件关闭";
            }
            else if (LOCALE == "km") {
                openMsg_open="មើលលក្ខន្តិក";
                openMsg_close = "លក្ខខណ្ឌបិទ";
            } else if (LOCALE == "vi") {
                openMsg_open="Xem cam kết";
                openMsg_close = "điều kiện Đóng";
            }
        }
    };

    function termToggle(){
        openMsg();//파라미터 정의
        $(document).on('click', '.agree-toggle', function(e){
            e.preventDefault();
            var $target = $(this).parent('li');
            var open = $target.hasClass('open');
            if(open) {

                $target.removeClass('open');
                $(this).text(openMsg_open);
            }else{
                $target.addClass('open');
                $(this).text(openMsg_close);
            }
        });
        $(document).on('click', '.agree-cont .link2', function(e){
            e.preventDefault();
            var $target = $(this).parents('li');
            var open = $target.hasClass('open');
            var $btnTxt = $target.children('.agree-toggle');

            if(open) {
                $target.removeClass('open');
                $btnTxt.text(openMsg_open);
            }else{
                $target.addClass('open');
                $btnTxt.text(openMsg_close);
            }
        });
    }

    function tabSize(selector){
        var node = $(selector);

        var num = node.attr('data-num');

        node.each(function(){
            var $tabLis = $(this).find('li'),
                length = $tabLis.length,
                devideNum = num ? num : length;
            liSize = (100 / devideNum) + '%';

            $tabLis.css({
                width:liSize
            });
        });
    }

    function tabClick(){
        $(document).on('click', '.tab-type02 a, .tab-type01 a', function(e){
            e.preventDefault();
            $(this).closest('li').siblings().removeClass('on');
            $(this).parent().addClass('on');
        });

        $(document).on('click', '.tab-type04 a', function(e){
            e.preventDefault();
            $(this).parent().siblings('li').removeClass('on');
            $(this).parent().addClass('on');
            if(!KNBUI.helper.compare($(this).parent().parent().attr('class'), 'tab-type04')) {
                $('.cur').remove();
                $(this).parent().prepend('<span class="cur">현재</span>');
            }
        });
    }

    function tableToggle(e){
        e.preventDefault();
        $(this).closest('.h3-wrap').next('.toggle').find('table').toggle();
        $(this).closest('.pop-hbox').next('[class*="table-type"]').find('table').toggle();
        $(this).toggleClass('close');
        KNBUI.helper.toggleText($(this).find('span'), '닫기', '열기');

    }

    function guideToggle(e){
        e.preventDefault();
        $(this).parent().toggleClass('close');
        KNBUI.helper.toggleText($(this), '닫기', '열기');
    }

    function setInput(){
        $('input[type="checkbox"], input[type="radio"]').each(function(){
            if($(this).is(':checked')) {
                $(this).attr({
                    'checked':'checked'
                })
            }else{
                $(this).removeAttr('checked');
            }
        });
    }

    function ie8InputHandle(){
        $(document).on('change', 'input[type="checkbox"]', function(){
            if(!$(this).is(':checked')) {
                $(this).removeAttr('checked');
            }else{
                $(this).attr({
                    'checked':'checked'
                });
            }
            $(this).next().hide().show().focus();
        });

        $(document).on('change', 'input[type="radio"]', function(){
            if(!$(this).is(':checked')) {
                $(this).removeAttr('checked');

            }else{
                $('[name=' + $(this).attr('name') + ']').removeAttr('checked');

                $(this).attr({
                    'checked':'checked'
                });

                $('[name=' + $(this).attr('name') + ']').each(function(){
                    $(this).next().hide().show();
                    if($(this).attr("checked")) {
                        $(this).focus();
                    }
                });
            }

        });
    }

    function setHandle(){
        if(detect.setHandle) {
            return;
        }
        $(document).on('click', '.h3-wrap .btn-ico2-tgl , .pop-hbox .btn-ico2-tgl', tableToggle);
        $(document).on('click', '.box-guide .guide-toggle', guideToggle);
        $(document).on('focusin', 'input[type="checkbox"], input[type="radio"]', function(e){
            $(this).next().css('outline', '1px dotted #666');
        });
        $(document).on('focusout', 'input[type="checkbox"], input[type="radio"]', function(){
            $(this).next().css('outline', '0');
        });

        if(KNBUI.dic.browser == 'ie8') {
            ie8InputHandle();
        }

        detect.setHandle = true;
    }

    function tableSummaryCreate(){
        var table = $('table');
        if(!table.length) {
            return;
        }

        table.each(function(){
            var _this = $(this),
                summaryText = '이 표는 ',
                thead = _this.find('thead'),
                tbody = _this.find('tbody'),
                i = 0,
                j = 0;

            if(thead.find('th').length) {
                theadCheck();
            }else if(tbody.find('th').length) {
                tbodyCheck();
            }

            function theadCheck(){
                if(i > 0) {
                    summaryText += (', ' + $.trim(thead.find('th').eq(i).text()));
                }else{
                    summaryText += $.trim(thead.find('th').eq(i).text());
                }

                i += 1;

                if(i < thead.find('th').length) {
                    theadCheck();
                }else{
                    if(tbody.find('th').length) {
                        tbodyCheck();
                    }else{
                        complete();
                    }
                }
            }

            function tbodyCheck(){
                if(j > 0) {
                    summaryText += (', ' + $.trim(tbody.find('th').eq(j).text()));
                }else{
                    summaryText += $.trim(tbody.find('th').eq(j).text());
                }

                j += 1;

                if(j < tbody.find('th').length) {
                    tbodyCheck();
                }else{
                    complete();
                }
            }

            function complete(){
                summaryText += '로(으로) 구성되어 있습니다.';
                _this.attr('summary', summaryText);
            }
        });
    }


    function init(){
        tooltip();
        fileBox();
        accessibilityFocus();
        switchButton();
        maxHeight();
        termToggle();
        tabSize('.tab-type02');
        tabClick();
        setHandle();
        setInput();
        tableSummaryCreate();

        if(KNBUI.selectivizr) {
            setTimeout(function(){
                KNBUI.selectivizr(this);
            }, 1);
        }

        $(document).trigger('KNBUI.refresh.className');
    }

    init();

    return {
        tabSize:tabSize,
        maxHeight:maxHeight,
        init:init,
        tableSummaryCreate:tableSummaryCreate
    }
};

/**
 * header header
 */
KNBUI.gnb = function(){
    var api = {};

    function openBank(){
        var intSection = $('#int-section');
        intSection.css("display", "block");
        intSection.animate({'top':'0'});
        intSection.attr({
            'data-focus':'int-section',
            'data-focus-prev':'int-close',
            'tabIndex':'0'
        });
        intSection.focus();
    }

    function closeBank(){
        var intSection = $('#int-section');
        intSection.css("display", "none");
        intSection.animate({'top':'-600px'});
        intSection.removeAttr('data-focus');
        intSection.removeAttr('data-focus-prev');
        intSection.removeAttr('tabIndex');
        $('.open-online-bank').focus();
    }

    function tabLayer(selector, layer){
        $(document).on('click focus keydown', selector, function(e){
            if(e.keyCode == 9 && e.shiftKey) {
                layer.hide();
                return;
            }

            layer.show();

            if(e.type == 'click') {
                e.preventDefault();
            }
        });
    }

    function selectLanguage(){
        $('.select-language').hover(function(){
            $(this).find('>a').addClass('active');
            $(this).find('#language-list').show();
        }, function(){
            $(this).find('>a').removeClass('active');
            $(this).find('#language-list').hide();
        });

        $('#language-list a:last').on('keydown', function(e){
            if(e.keyCode == 9 && !e.shiftKey) {
                setTimeout(function(){
                    $('#language-list').hide();
                }, 1);
            }
        });

        tabLayer('.select-language > a', $('#language-list'));
    }

    function allService(){
        $('.all-service').hover(function(){
            $(this).find('>a').addClass('active');
            $(this).find('#service-list').show();
        }, function(){
            $(this).find('>a').removeClass('active');
            $(this).find('#service-list').hide();
        });

        $('#service-list a:last').on('keydown', function(e){
            if(e.keyCode == 9 && !e.shiftKey) {
                setTimeout(function(){
                    $('#service-list').hide();
                }, 1);
            }
        });

        tabLayer('.all-service >a', $('#service-list'));
    }

    function adviceBanner(container, options){
        if(!container.length) {
            return;
        }
        var detect = {};
        var config = {
            start:0
        };

        $.extend(config, options);

        function init(){
            setup();
            if(config.start == 0) {
                detect.tabBtnListItem.eq(0).addClass('active');
                detect.viewListItem.eq(0).addClass('active');
                return;
            }

            if(detect.max >= config.start) {
                slide(config.start, 0);
            }
        }

        function setup(){
            detect.viewList = container.find('.p-category');
            detect.viewListItem = detect.viewList.find('.p-list');
            detect.tabBtnList = container.find('.p-tab');
            detect.tabBtnListItem = detect.tabBtnList.find('li');
            detect.height = container.find('.p-list').height();
            detect.btnLength = detect.tabBtnListItem.size();
            detect.current = 0;
            detect.min = 0;
            detect.max = detect.btnLength - 1;

            detect.viewListItem.each(function(index){
                $(this).data('idx', index);
            });
            detect.tabBtnListItem.each(function(index){
                $(this).find('a').data('idx', index);
            });
        }

        function up(){
            if(detect.current + 1 > detect.max) {
                return;
            }
            slide(detect.current + 1);
        }

        function down(){
            if(detect.current - 1 < detect.min) {
                return;
            }
            slide(detect.current - 1);
        }

        function direction(num){
            return detect.current > num ? 'up' : 'down';
        }

        function slideEnd(index){
            detect.viewListItem.eq(detect.current).removeClass('active');
            detect.viewListItem.removeAttr('style');
            detect.tabBtnListItem.eq(detect.current).removeClass('active');
            detect.tabBtnListItem.eq(index).addClass('active');
            detect.current = index;
        }

        function slide(index, speed){
            if((index == detect.current) || (index > detect.max)) {
                return;
            }

            if(detect.viewListItem.is(':animated')) {
                return;
            }

            var to = direction(index),
                value;

            speed = speed == 0 ? 0 : 400;

            switch(to){
                case 'down':
                    value = -detect.height;
                    break;

                case 'up':
                    value = detect.height;
                    break;
            }

            detect.viewListItem.eq(index).css({'top':-value}, speed).addClass('active');
            detect.viewListItem.eq(index).animate({'top':0}, speed);
            detect.viewListItem.eq(detect.current).animate({'top':value}, speed, function(){
                slideEnd(index);
            });
        }

        init();

        detect.tabBtnListItem.find('a').on('click.knbui.ibr.adviceBanner', function(e){
            e.preventDefault();
            slide($(this).data('idx'));
        });

        return {
            setup:setup,
            slide:slide,
            up:up,
            down:down
        };
    }

    function openSearch(value){
        var node = $('#global-search-section');
        $('.srch-tab input').eq(value).click();

        node.addClass('open');
        node.focus();

        return node;
    }

    function closeSearch(){
        $('#global-search-section').removeClass('open');
        api.openHistory.focus();
        api.openHistory = null;
    }

    function globalSearch(){
        $(document).on('click keydown', '.button-open-search', function(e){
            if(e.type == 'click') {
                e.preventDefault();
                openSearch();
            }

            if(e.which == 13) {
                setTimeout(function(){
                    e.preventDefault();
                    openSearch().attr('tabIndex', 0).focus();
                }, 100);
            }
            api.openHistory = $(this);
        });

        $(document).on('click', '.global-search-close', function(e){
            e.preventDefault();
            closeSearch();
        });

        $(document).on('click', '.best-srch a', function(){
            $('.input-word').val($(this).text());
        });
    }

    function menu(){
        var wrap = $('.gnb'),
            depth1 = wrap.find('.inner > li'),
            inMenu = wrap.find('.in'),
            gSection = $('.g-section'),
            depth3 = gSection.find('>li>ul>li');

        wrap.find('a').first().on('keydown', function(e){
            if(e.keyCode == 9 && e.shiftKey) {
                setTimeout(function(){
                    depth1.find('>a').removeClass('open');
                    inMenu.hide();
                }, 1);
            }
        });

        wrap.find('a').last().on('keydown', function(e){
            if(e.keyCode == 9 && !e.shiftKey) {
                setTimeout(function(){
                    depth1.find('>a').removeClass('open');
                    inMenu.hide();
                }, 1);
            }
        });

        depth1.find('>a').on('focus', function(){
            depth1.find('>a').removeClass('open');
            $(this).addClass('open');
            inMenu.hide();
            $(this).next().show();
        });

        depth1.hover(function(){
            $(this).find('.in').show();
            $('select').blur();
        }, function(){
            inMenu.hide();
        });

        depth3.each(function(){
            if($(this).find('>ul').size() > 0) {
                $(this).addClass('has-depth');
            }
        });

        $(document).on('click', '.has-depth > a', function(e){
            e.preventDefault();
            $(this).next().toggle();
            $(this).parent().toggleClass('open');
        });
    }

    function skipnavi(){
        $(document).on('click', '#skip-menu a', function(e){
            e.preventDefault();
            $(this.hash).attr('tabIndex', 0).focus();
        });
    }

    $(document).on('click.knbui.ibr.openBank', '#int-section .btn-close', function(e){
        e.preventDefault();
        closeBank();
    });

    $(document).on('click.knbui.ibr.advice', '.advice-product .show-more', function(e){
        e.preventDefault();
        $('.advice-product .show-more').parent().removeClass('active');
        $(this).closest('li').addClass('active');
    });

    $(document).ready(function(){
        adviceBanner($('.advice-product'));
        selectLanguage();
        allService();
        skipnavi();
        globalSearch();
        menu();
    });

    api.openHistory = null;

    return {
        openBank:openBank,
        adviceBanner:adviceBanner,
        openSearch:openSearch,
        closeSearch:closeSearch
    };
};

/**
 * site map
 */
KNBUI.siteMap = function(){
    var map = $('.contents-map');

    if(!map.length) {
        return
    }

    var positionValue = {};

    function resize(){
        var screenHeight = $(window).height();
        var headerHeight = $('#header').height();
        var footerHeight = $('#footer').height();
        var tapHeight = $('.tab-type01').outerHeight();
        var tapMargin = parseInt($('.tab-type01').css('margin-bottom'));
        var mapMargin = parseInt(map.css('margin-bottom'));
        var heightValue = screenHeight - headerHeight - footerHeight - tapHeight - tapMargin - mapMargin;
        var minHeight = 574;
        map.height(heightValue < minHeight ? minHeight : heightValue);
    }

    resize();

    $('.colm-wrap').each(function(idx){
        $(this).data('topValue', $(this).position().top);
        positionValue[idx] = -1 * $(this).position().top;
    });

    $(".site-cont .menu-left a").each(function(idx){
        $(this).data('index', idx);
    });

    positionValue[0] = 0;

    $(window).on('resize', resize);

    function active(node){
        node.parent().siblings().removeClass('on');
        node.parent().addClass('on');
    }

    function checkPosition(value){
        var index;

        if(value < positionValue[0]) {
            index = 0;
        }
        if(value < positionValue[1]) {
            index = 1;
        }
        if(value < positionValue[2]) {
            index = 2;
        }
        if(value < positionValue[3]) {
            index = 3;
        }
        if(value < positionValue[4]) {
            index = 4;
        }
        if(value < positionValue[5]) {
            index = 5;
        }
        if(value < positionValue[6]) {
            index = 6;
        }
        if(value < positionValue[7]) {
            index = 7;
        }
        if(value < positionValue[8]) {
            index = 8;
        }
        if(value < positionValue[9]) {
            index = 9;
        }
        if(value < positionValue[10]) {
            index = 10;
        }
        if(value < positionValue[11]) {
            index = 11;
        }
        if(value < positionValue[12]) {
            index = 12;
        }
        if(value < positionValue[13]) {
            index = 13;
        }
        if(value < positionValue[14]) {
            index = 14;
        }
        if(value < positionValue[15]) {
            index = 15;
        }
        if(value < positionValue[16]) {
            index = 16;
        }
        if(value < positionValue[17]) {
            index = 17;
        }
        if(value < positionValue[18]) {
            index = 18;
        }
        if(value < positionValue[19]) {
            index = 19;
        }
        if(value < positionValue[20]) {
            index = 20;
        }

        return $('.menu-left li a').eq(index);
    }

    $(document).on('click', '.site-cont .menu-left a', function(e){
        e.preventDefault();
        if($(this).data('index') > 0) {
            map.mCustomScrollbar('scrollTo', -$(this.hash).data('topValue') - 25);
        }else{
            map.mCustomScrollbar('scrollTo', 0);
        }
    });

    map.mCustomScrollbar({
        theme:'dark',
        mouseWheelPixels:250,
        callbacks:{
            whileScrolling:function(){
                active(checkPosition(parseInt($('#mCSB_1_container').css('top'))));
            },
            onScroll:function(){

            },
            onTotalScroll:function(){
                active($('.menu-left li a').last());
            }
        }
    });
};

/**
 * myBanking
 */
KNBUI.myBanking = function(){
    function openSetting(){
        $('.qk_select').addClass('close');
        return $('#qk-setting').addClass('open');
    }

    function closeSetting(){
        $('.qk_select').removeClass('close');
        $('#qk-setting').removeClass('open');
        $('.setting-button').focus();
    }

    $(document).on('click keydown', '.setting-button', function(e){
        if(e.type == 'click') {
            e.preventDefault();
            openSetting();
        }

        if(e.which == 13) {
            e.preventDefault();
            openSetting().attr('tabIndex', 0).focus();
        }
    });

    $(document).on('click', '.qk-setting-close', function(e){
        e.preventDefault();
        closeSetting();
    });

    $(document).on('click', '.open-bar', function(e){
        e.preventDefault();
        KNBUI.helper.toggleText($(this).find('span'), '닫기', '열기');

        $(this).toggleClass('opened');
        $('.qk_select .menu').toggle();
    });

    var tooltip = $('.my-grd-e').find('.tooltip');
    var width = tooltip.find('[data-tooltip]').width();

    if(width >= 320) {
        tooltip.addClass('on');
    }

    return {
        closeSetting:closeSetting
    };
};

/**
 * footer
 */
KNBUI.footer = function(){
    var familySite = $('.family-site');

    $(document).on('click', function(e){
        if(!$(e.target).parent().parent().is('.family-site')) {
            familySite.removeClass('on');
        }

    });

    $(document).on('click', '.family-site .tit', function(e){
        e.preventDefault();
        familySite.toggleClass('on');
    });

    $(document).on('click', '.family-site .list li a', function(e){
        e.preventDefault();
        familySite.find('.tit').focus();
        familySite.toggleClass('on');
    });

    $(document).on('keydown', '.family-site .list li:last-child a', function(e){
        if(!e.shiftKey) {
            e.preventDefault();
            familySite.find('.tit').focus();
            familySite.toggleClass('on');
        }
    })
};

/**
 * monthSelToggle
 */
KNBUI.monthSelToggle = function(){
    var triggerWrap = $('.slt-day-w');

    triggerWrap.each(function(){
        var trigger = $(this).children('.btn-calendar'),
            target = $(this).find('.slt-day');

        trigger.on({
            click:function(){
                if(target.is(':hidden')) {
                    trigger.addClass('active');
                    target.show();
                }else{
                    trigger.removeClass('active');
                    target.hide();
                }

                return false;
            }
        });

        target.find('.btn-white-s').on({
            click:function(){
                target.hide();
                trigger.removeClass('active');

                return false;
            }
        });
    });
};


/**
 * 하단퀵바
 */
KNBUI.quickMenu = function(){

    var quick_HT = $('.menu_area').find('ul').outerHeight();
    var isVisible = true;

    //메인페이지일경우 위치를 별도로 맞추기위함
    if($('#main').length > 0){
        $('.menu_area').css('top','114px');
    }
    //팝업창일경우 빠른메뉴 제거
    if (opener){
        if($('#pop-wrap').length > 0){
            $('#pop-wrap').find('.quick_area').remove();
        }
    }

    $(document).on('click', '#btn_quickmore', function(e){

        e.preventDefault();

        if(!$(this).hasClass('on')){
            var li_HT = $('.menu_area').find('ul li:first-child').outerHeight();
            $(this).find('span').text('메뉴 간략하게 보기');
            $('.menu_area').find('ul').animate({'height':li_HT});
            $(this).addClass('on');
            isVisible = false;

        } else {
            $(this).find('span').text('메뉴 더보기');
            $('.menu_area').find('ul').animate({'height': quick_HT});
            $(this).removeClass('on');
            isVisible = true;
        }
    });

    $(document).on('keydown', '.menu_area ul > li:first-child a', function(e){
        if (isVisible == false){
            if(!e.shiftKey) {
                e.preventDefault();
                $('#btn_quickmore').focus();
            }
        }
    });

    $(document).on('keydown', '#btn_quickmore', function(e){
        if (isVisible == false){
            if(e.keyCode == 9 && e.shiftKey) {
                e.preventDefault();
                $('.menu_area').find('ul > li:first-child a').focus();
            }
        }
    });
}



/**
 * 인트로
 */
KNBUI.intro = function(){
    function menu(){
        var boxMenu = $("[class*='main-menu-']");
        var firstActive = boxMenu.find('li').eq(0).find('span');
        var isHover = false;

        boxMenu.find('li').each(function(index){
            $(this).delay(index * 100).fadeIn();
        });

        setTimeout(function(){
            firstActive.addClass('active');
        }, 1200);

        boxMenu.find('li').hover(function(){
            firstActive.removeClass('active');
            isHover = true;
        }, function(){
            isHover = false;

            setTimeout(function(){
                if(!isHover) {
                    firstActive.addClass('active');
                }
            }, 10)
        });
    }

    function banner(){
        var bannerItem = $('.main-banner-item');
        bannerItem.before('<div class="banner-controller"></div>');

        var controller = $('.banner-box .banner-controller');
        for(var i = 0, max = bannerItem.find('li').length; i < max; i++){
            controller.append('<a href="#main-banner-item-' + i + '">' + (i + 1) + '번 이벤트 배너 보기</a>');
        }
        controller.find('a').each(function(idx){
            $(this).data('index', idx);
        });

        $(document).on('click', '.banner-controller a', function(e){
            e.preventDefault();
            if($(this).hasClass('on')) {
                return;
            }

            $(this).siblings().removeClass('on');
            $(this).addClass('on');
            bannerItem.find('li.on').removeClass('on').fadeOut();
            bannerItem.find('li').eq($(this).data('index')).addClass('on').fadeIn();
        });

        bannerItem.find('li').eq(0).show();
        controller.find('a').eq(0).trigger('click');
    }

    function detail(){
        var securityDetails = $('.security-details');

        $(document).on('click keydown', '.main-security .view-btn', function(e){
            if(/13/.test(e.which) || /click/.test(e.type)) {
                e.preventDefault();

                if(!$(this).data('opened')) {
                    securityDetails.addClass('open');
                    $(this).data('opened', true);
                    $(this).addClass('active');
                }else{
                    securityDetails.removeClass('open');
                    $(this).data('opened', false);
                    $(this).removeClass('active');
                }

                KNBUI.helper.toggleText($(this), '열기', '닫기');
            }
        });
    }

    function visual(){
        var mainVisual = $('.main-visual'),
            itemList = mainVisual.find('.main-visual-item li'),
            controller = $('.visual-controller'),
            pause = mainVisual.find('.button-pause'),
            current = 0,
            min = 0,
            max = itemList.length,
            start,
            queue = false;

        for(var i = 0; i < max; i++){
            $('.button-pause').before('<a class="button-dot" href="#main-banner-item-' + i + '"><span>' + (i + 1) + '번 메인비주얼 보기</span></a>');
        }

        var dot = mainVisual.find('.button-dot');

        dot.each(function(idx){
            $(this).data('index', idx);
        });

        function next(){
            itemList.eq(current).fadeOut();
            if(current + 1 == max) {
                current = 0;
            }else{
                current = current + 1;
            }
            itemList.eq(current).fadeIn();
            dot.removeClass('on');
            dot.eq(current).addClass('on');
        }

        function prev(){
            itemList.eq(current).fadeOut();
            if(current == min) {
                current = max - 1;
            }else{
                current = current - 1;
            }
            itemList.eq(current).fadeIn();
            dot.removeClass('on');
            dot.eq(current).addClass('on');
        }

        function goTo(index){
            itemList.eq(current).fadeOut();
            itemList.eq(index).fadeIn();

            current = index;

            dot.removeClass('on');
            dot.eq(current).addClass('on');
        }

        function play(){
            start = true;
            return setInterval(next, 4000);
        }

        function stop(){
            clearInterval(queue);
            start = false;
        }

        queue = play();

        itemList.eq(0).show();
        itemList.eq(0).show();
        dot.eq(0).addClass('on');

        $(document).on('click', '.main-visual .button-prev', function(e){
            e.preventDefault();
            prev();
        });

        $(document).on('click', '.main-visual .button-next', function(e){
            e.preventDefault();
            next();
        });

        $(document).on('click', '.main-visual .button-dot', function(e){
            e.preventDefault();
            goTo($(this).data('index'));
        });

        $(document).on('click', '.button-pause', function(e){
            e.preventDefault();
            $(this).toggleClass('play');
            KNBUI.helper.toggleText($(this).find('span'), '정지', '재생');
            if(start) {
                stop();
            }else{
                queue = play();
            }
        });

        $(document).on('mouseenter ', '.main-visual .visual-controller', function(){
            if(start) {
                clearInterval(queue);
            }
        });

        $(document).on('mouseleave', '.main-visual .visual-controller', function(){
            if(start) {
                stop();
                queue = play();
            }
        });
    }

    function info(){
        var button = $('.info-box > li > a[class*="tit-"]');
        var moreButton = $('.info-box > li ').find('.more-btn');
        var list = [];

        button.each(function(index){
            list.push($(this).next());
            $(this).attr({
                'aria-expanded':false,
                'role':'button',
                'aria-controls':'infoBox-' + index
            });
            $(this).next().attr({
                'id':'infoBox-' + index,
                'aria-hidden':false
            });
        });

        $(document).on('click.info-box', '.info-box > li > a[class*="tit-"]', function(e){
            e.preventDefault();

            button.removeClass('active');
            button.attr({
                'aria-expanded':false
            });
            $(list).each(function(){
                $(this).attr({
                    'aria-hidden':false
                });
            });
            $(this).addClass('active');
            $(this).attr({
                'aria-expanded':true
            });
            $(this).next().attr({
                'aria-hidden':true
            });
            moreButton.hide();
            $(this).parent().find('.more-btn').show();
        });

        $('.info-box > li').eq(0).find('>a').trigger('click.info-box');
    }

    visual();
    menu();
    banner();
    detail();
    info();
};

/**
 * 결제선 관리
 * ECBBKM363CHGV20M
 */
KNBUI.bkm = function(){
    var groupReport = $('.group-report');

    if(!groupReport.length) {
        return;
    }

    var titleHeight = groupReport.find('.lf').children('h3').height();
    var rightHeight = groupReport.find('.rf').height();
    var leftPaddingTop = parseInt(groupReport.find('.lf').children('.scrl-y').css('padding-top'));
    var leftPaddingBottom = parseInt(groupReport.find('.lf').children('.scrl-y').css('padding-bottom'));

    groupReport.find('.lf').children('.scrl-y').height(rightHeight - titleHeight - leftPaddingTop - leftPaddingBottom);
};

/**
 * 빠른이체
 */
KNBUI.peb = function(){
    $(document).on('click', '.list-view .acc-view', function(e){
        e.preventDefault();
        var $target = $('.list-view > div');
        var $btnTxt =  $('.list-view .acc-view span');
        var open = $target.hasClass('open');
        // var $btnTxt = $target.children('a');
        if(open) {
            $target.removeClass('open');
            $btnTxt.text('선택계좌목록 펼치기');
            // $btnTxt.text('이체추가목록열기');
        }else{
            $target.addClass('open');
            $btnTxt.text('선택계좌목록 닫기');
            // $btnTxt.text('이체추가목록닫기');
        }
    });

    $(document).on('click', '.list-quick-account li .add', function(e){
        e.preventDefault();
        var $target = $(this).siblings('span');
        $target.addClass('bx-checked');
        $(this).html('이체추가<span class="hidden">선택됨</span>');
    });

    $(document).on('click', '.list-quick-account li > span', function(){
        $(this).removeClass('bx-checked');
        $(this).siblings('.add').html('이체추가');
    });
};

/**
 * accessibility
 */
KNBUI.a11y = function(){
    //인터넷영업점
    $('.open-online-bank').append('<span class="hidden">레이어 열기</span>');

    //언어선택, 전체서비스
    $('[href="#language-list"], [href="#service-list"]').attr({
        'aria-haspopup':'true'
    });
    $('#language-list, #service-list').attr({
        'aria-label':'submenu'
    })

    // tab
    $('[data-tab]').each(function(){
        $(this).attr({'role':'tablist'});
        $(this).find('li').attr({'role':'presentation'});
    });
    $('[data-tab]').find('a').each(function(){
        $(this).attr({
            'role':'tab',
            'aria-controls':this.hash.substr(1)
        });

        $(this.hash).attr({
            'role':'tabpannel',
            'aria-hidden':'true'
        });

    });

    //box guide
    $('.box-guide').each(function(){
        if($(this).find('.guide-toggle').length) {
            $(this).find('.guide-toggle').prepend($(this).find('.guide-toggle').prev('strong').text() + ' ');
        }
    });

    if($('.btn-ico2-tgl').length) {
        $('.btn-ico2-tgl').each(function(){
            $(this).find('span').prepend($(this).parent().parent().prev().text() + ' ');
        });
    }

};

/**
 * make class
 */
KNBUI.makeclass = function(){
    if($('.list-year').length) {
        $('.list-year li').each(function(index){
            if((+index + 1) % 2 == 1) {
                $(this).addClass('odd');
            }else{
                $(this).addClass('even');
            }
        });
    }

    if($('.table-layer').length) {
        $('.table-layer tr').each(function(index){
            if((+index + 1) % 2 == 1) {
                $(this).addClass('odd');
            }else{
                $(this).addClass('even');
            }
        });
    }

    if($('.zcode-list-h').length) {
        $('.zcode-list-h li').each(function(index){
            if((+index + 1) % 2 !== 1) {
                $(this).addClass('even');
            }
        });
    }

    if(KNBUI.dic.browser == 'ie8' && $('table').length) {
        $('[class^="table-"] td:last-child[rowspan]').addClass('last');
        $('[class^="table-"] th:last-child[rowspan]').addClass('last');
    }

    if($('.tab-type03').length) {
        $('.tab-type03').each(function(){
            var wrapWidth = $(this).outerWidth();
            var innerWidth = 0;
            $(this).find('li').each(function(){
                innerWidth = innerWidth + $(this).outerWidth();
            });
            if(wrapWidth < innerWidth) {
                $(this).addClass('layoutFix');
            }
        });
    }

    if($('.tab-type01').length) {
        $('.tab-type01').each(function(){
            var wrapWidth = $(this).outerWidth();
            var innerWidth = 0;
            $(this).find('li').each(function(){
                innerWidth = innerWidth + $(this).outerWidth();
            });
            if(wrapWidth < innerWidth) {
                $(this).addClass('layoutFix');
            }
        });
    }

    if($('.tab-type04').length) {
        $('.tab-type04').each(function(){
            var wrapWidth = $(this).outerWidth();
            var innerWidth = 0;
            $(this).find('>li').each(function(){
                innerWidth = innerWidth + $(this).outerWidth();
            });

            if(wrapWidth < innerWidth) {
                $(this).addClass('layoutFix');
            }
        });
    }

    if($('[class^="pop-msg-"]').length) {
        $('[class^="pop-msg-"]').each(function(){
            if($(this).children().last().is('p.code2')) {
                $(this).children().last().addClass('last');
            }
        });
    }

    if($('.site-cont [class^="contents-map"]').length) {
        $('[class^="contents-map"]').each(function(){
            if($(this).children().last().is('.colm-wrap')) {
                $(this).children().last().addClass('last');
            }
        });
    }
};


/**
 * document ready init
 */
$(document).ready(function(){
    $('html').addClass(KNBUI.dic.browser).addClass(KNBUI.dic.siteCode).addClass(KNBUI.dic.os);

    KNBUI.common = KNBUI.common();
    KNBUI.gnb = KNBUI.gnb();
    KNBUI.footer();
    KNBUI.myBanking();
    KNBUI.siteMap();
    KNBUI.intro();
    KNBUI.bkm();
    KNBUI.peb();
    KNBUI.makeclass();
    KNBUI.quickMenu(); //좌측퀵메뉴

    $(document).on('click', '.tab-type01 a', function(e){
        e.preventDefault();
        KNBUI.common.maxHeight();
    });

    $('#skip-menu').show();
    KNBUI.a11y();
});

/**
 * custom event
 */
$(document)
    .on('KNBUI.refresh.className', function(){
        KNBUI.makeclass();
    })
    .on('KNBUI.refresh.checkbox', function(){
        if(KNBUI.dic.browser == 'ie8') {
            $('input[type="checkbox"]').each(function(){
                if($(this).is(':checked')) {
                    $(this).attr('checked', 'checked');
                }else{
                    $(this).removeAttr('checked');
                }
                $(this).next().hide().show();
            });
        }
    })
    .on('KNBUI.refresh.radio', function(){
        if(KNBUI.dic.browser == 'ie8') {
            $('input[type="radio"]').each(function(){
                if($(this).is(':checked')) {
                    $(this).attr('checked', 'checked');
                }else{
                    $(this).removeAttr('checked');
                }
                $(this).next().hide().show();
            });
        }
    });

/**
 * @ TAB MENU PLUGIN
 */
(function(global, $){
    // 탭 플러그인 네임
    var pluginName = 'knbTab';

    // 초기 TabUI 객체 생성자
    function TabUI($selector, dataValue, options){
        this.$selector = $selector;
        this.dataValue = dataValue;
        this.config = $.extend({}, this.defaults, options || {});
        this.detect = {
            $doc:$(document),
            targetClass:this.$selector.attr('class'),
            anchor:'a',
            tabLis:this.$selector.children('li'),
            targetCont:$('[' + this.config.targetCont + '="' + this.dataValue + '"]')
        };
        this.init(this.detect);

    }

    TabUI.prototype = {
        'defaults':{
            targetCont:'data-tabCont',
            tabActive:'on',
            fade:false,
            fadeSpeed:400,
            visibleCont:1
        },
        'init':function(detect){
            this.setEvent(detect);
            this.visibleTrigger(detect);
        },
        'setEvent':function(detect){
            var _self = this;
            detect.$doc.on('click.knb.tab', '.' + detect.targetClass + ' ' + detect.anchor, function(){
                var $this = $(this),
                    idx = $this.closest('li').index();
                _self.radioClass($this);
                _self.config.fade ? _self.fadeEffect(idx) : _self.defaultEffect(idx);

                return false;
            })
        },
        'radioClass':function($this){
            var $targetClass = $this.closest('li'), //탭제목 li
                isActived = $targetClass.siblings('li.' + this.config.tabActive);

            if(!!isActived) {
                isActived.removeClass(this.config.tabActive);
                isActived.find('a').attr({'aria-selected':'false'});
            }
            $targetClass.find('a').attr({'aria-selected':'true'});
            $targetClass.addClass(this.config.tabActive);
        },
        'checkIndex':function(idx){
            this.isShow = this.detect.targetCont.children().eq(idx);
            // alert(this.isShow.html());
            this.isShow.siblings().attr({'aria-hidden':'true'});
            this.isShow.attr({'aria-hidden':'false'});

        },
        'defaultEffect':function(idx){
            this.checkIndex(idx);
            this.isShow
                .show()
                .siblings()
                .hide();

        },

        'fadeEffect':function(idx){
            this.checkIndex(idx);
            this.isShow
                .stop()
                .fadeTo(this.config.fadeSpeed, 1)
                .siblings()
                .stop()
                .fadeTo(this.config.fadeSpeed, 0)
        },
        'visibleTrigger':function(detect){
            detect.tabLis
                .eq(this.config.visibleCont - 1)
                .children()
                .trigger('click');

        }
    };

    $.fn[pluginName] = $.fn[pluginName] || function(options){
            var $this = this;
            return $.each($this, function(idx, el){
                var $element = $this.eq(idx);
                if(!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new TabUI($element, $element.data('tab'), options))
                }
                return $element;
            })
        };

}(window, window.jQuery));

/**
 * @ FAQ UI (Accordion Menu)
 */
(function(global, $){
    if(!$.widget) return;
    $.widget('ui.knbFaq', {
        options:{
            className:'on',
            slideSpeed:400,
            showing:false
        },
        _create:function(){
            this.$el = this.element;
            this.config = this.options;
            this.detect = {
                $dt:this.$el.find('dt'),
                $dd:this.$el.find('dd')
            };
            this._onInit(this.detect);
        },
        _onInit:function(detect){
            this._setEvent(detect);
        },
        _setEvent:function(detect){
            var _self = this;
            detect.$dt.on('click', 'a', function(e){
                e.preventDefault();
                var $target = $(this);
                _self._radioClass($target);
                !_self.config.showing ? _self._isSlide() : _self._isShow();
            });
        },
        _radioClass:function($target){
            this.$targetClass = $target.closest('dt');
            this.$showTarget = this.$targetClass.next();
            if(this.$showTarget.is(':visible')) {
                this.$targetClass.removeClass(this.config.className);
            }else{
                this.$targetClass.addClass(this.config.className);
            }
            var $isActived = this.$targetClass.siblings('dt.' + this.config.className);
            if(!!$isActived) {
                $isActived.removeClass(this.config.className);
            }
        },
        _isShow:function(){
            this.$showElement = this.$targetClass.next('dd');
            if(this.$showElement.css('display') == 'none') {
                this._panelHide(this.detect);
                this.$showElement.show();
            }else{
                this._panelHide(this.detect);
            }
        },
        _panelHide:function(detect){
            detect.$dd.hide();
        },
        _isSlide:function(){
            this.$showElement = this.$targetClass.next('dd');
            if(this.$showElement.css('display') == 'none') {
                this._panelUp(this.detect);
                this.$showElement.slideDown();
            }else{
                this._panelUp(this.detect);
            }
        },
        _panelUp:function(detect){
            detect.$dd.slideUp(this.config.slideSpeed);
        }
    })

}(window, window.jQuery));

/**
 * @ Layer PopUp UI
 */
(function(global, $){
    // 레이어팝업 플러그인 네임
    var pluginName = 'layerPopup';

    // Init LayerPopup 객체 생성자
    function LayerPopup($selector, options){
        this.$selector = $selector;
        this.config = $.extend({}, this.defaults, options || {});

        this.detect = {
            $doc:$(document),
            $win:$(window),
            body:$('body')
        };

        this._init(this.detect);
    }

    LayerPopup.prototype = {
        'defaults':{
            btnClass:'layer-popup',
            modalClose:'btnp-close',
            fade:false,
            fadeSpeed:400,
            dimmed:true,
            dimOpacity:.3,
            escKey:false,
            clickDimmed:false
        },
        '_init':function(detect){
            this._setEvent(detect);
        },
        '_setEvent':function(detect){
            var _self = this;
            if(detect.$doc.data('layerEvent')) return;
            detect.$doc.data('layerEvent', true);

            detect.$doc.on('click.knb.layer.open', '.' + this.config.btnClass, function(e){
                _self.$target = $(e.target);
                _self.href = _self.$target.attr('href');
                _self.$modalContent = $(_self.href);
                _self._setProp(_self.$modalContent, detect);
                _self._lockScroll(_self.detect);
                _self._checkESC(_self.detect);
                _self._clickDimmed();
                return false;
            })
        },
        '_setProp':function($modalContent, detect){
            this.modalWidth = $modalContent.outerWidth();
            this.modalHeight = $modalContent.outerHeight();
            this.winWidth = detect.$win.width();
            this.winHeight = detect.$win.height();
            this.widthHalf = (this.modalWidth / 2);
            this.heightHalf = (this.modalHeight / 2);
            this.modalClose = $modalContent.find('.' + this.config.modalClose);

            if(this.config.dimmed) this._setDim();

            if(this.modalHeight < this.winHeight) {
                this.$modalContent
                    .css({
                        marginTop:-this.heightHalf,
                        marginLeft:-this.widthHalf
                    })
            }else{
                this.$modalContent
                    .css({
                        top:50,
                        marginLeft:-this.widthHalf
                    })
            }
            this.config.fade ? this._modalFadeIn() : this._modalShow();
            this._modalClose(this.modalClose);
        },
        '_modalShow':function(){

            this.$modalContent.show();
            this._dimShow();
            this._focusIn();
        },
        '_modalHide':function(){
            this.$modalContent.hide();
            this._dimHide();
        },
        '_modalFadeIn':function(){
            this.$modalContent.fadeIn(this.config.fadeSpeed);
            this._dimFadeIn();
            this._focusIn();
        },
        '_modalFadeOut':function(){
            this.$modalContent.fadeOut(this.config.fadeSpeed);
            this._dimFadeOut();
        },
        '_modalClose':function(modalClose){
            var _self = this;
            modalClose.on('click.knb.layer.close', function(e){
                _self._unlockScroll(_self.detect);
                _self.config.fade ? _self._modalFadeOut() : _self._modalHide();
                if(_self.config.dimmed) _self.$dimLayer.remove();
                _self._focusOut();
                return false;
            })

        },
        '_focusIn':function(){
            this.$modalContent
                .attr('tabindex', 0)
                .focus();
        },
        '_focusOut':function(){
            this.$target
                .attr('tabindex', 0)
                .focus();
            this.$modalContent.attr('tabindex', -1)
        },
        '_setDim':function(){
            if(this.config.dimmed) {
                this.detect.body
                    .append('<div class="dim-layer"></div>');
                this.$dimLayer = $('.dim-layer');
                this.dimLayerConfig = 'display:none;position: fixed; left:0;right:0; top: 0; bottom:0; z-index: 9999;background:#000;';
                this.$dimLayer
                    .fadeIn()
                    .css(this.dimLayerConfig)
                    .css({opacity:this.config.dimOpacity});
            }
        },
        '_dimFadeIn':function(){
            if(this.config.dimmed) this.$dimLayer.fadeIn();
        },
        '_dimFadeOut':function(){
            if(this.config.dimmed) this.$dimLayer.fadeOut();
        },
        '_dimShow':function(){
            if(this.config.dimmed) this.$dimLayer.show();
        },
        '_dimHide':function(){
            if(this.config.dimmed) this.$dimLayer.hide();
        },
        '_lockScroll':function(detect){
            detect.body.addClass('layer-scroll');
        },
        '_unlockScroll':function(detect){
            detect.body.removeClass('layer-scroll');
        },
        '_checkESC':function(detect){
            var _self = this;
            if(this.config.escKey) {
                detect.$doc.keydown(function(e){
                    if(e.which == 27) {
                        _self.$modalContent.hide();
                        _self.$dimLayer.remove();
                        _self._focusOut();
                    }
                });
            }
        },
        '_clickDimmed':function(){
            var _self = this;
            if(this.config.clickDimmed) {
                this.$dimLayer.on('click.knb.layer.dimmed', function(e){
                    _self.$modalContent.hide();
                    _self.$dimLayer.remove();
                    _self._focusOut();
                    return false;
                })
            }
        }
    };

    $.fn[pluginName] = $.fn[pluginName] || function(options){
            var $this = this;
            return $.each($this, function(idx, el){
                var $element = $this.eq(idx);
                if(!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new LayerPopup($element, options));
                }
                return $element;
            })
        };

}(window, window.jQuery));

/**
 * @ Table List Layer UI
 * @ 계좌번호 및 버튼클릭 레이어 모두 포함
 */
(function(global, $){
    var $doc = null;
    $(function(){
        $doc = $(document);
        listLayer();
    });

    function listLayer(){
        var accList = '.accLayer',
            btnList = '.btnLayer',
            zIndex = 100;

        function addEvent(evt, selector, fn){
            $doc.on(evt, selector, fn)
        }

        function setLayer(selector){
            addEvent('click', selector, isLayer);
        }

        function isLayer(e){
            var $this = $(this),
                $dir = $this.closest('.dir'),
                targetClass = $this.attr('class'),
                $winWid = $(window).width(),
                $winWidHalf = $winWid / 2,
                btnWid = $this.outerWidth(),
                btnHei = $this.outerHeight(),
                offLeft = $this.offset().left,
                setLeft = $this.position().left,
                $listCont = $(getHash(e.target)),
                $btnClose = $listCont.find('.listClose'),
                $listContWid = $listCont.outerWidth(),
                layerPosition;

            if(targetClass.indexOf('btnLayer') > -1) {
                if($winWidHalf <= offLeft) {
                    layerPosition = {
                        top:btnHei,
                        left:-($listContWid - btnWid),
                        zIndex:++zIndex
                    };
                }else{
                    layerPosition = {
                        top:btnHei,
                        left:setLeft,
                        zIndex:++zIndex
                    };
                }
                classOn($dir);

            }else{
                layerPosition = {
                    top:btnHei + 7,
                    left:setLeft
                };
            }

            $('.dir-jump').hide();
            $('.acc-jump').hide();

            $listCont
                .css(layerPosition)
                .show();

            focusIn($listCont);
            closeFn($btnClose, $listCont, $this, $dir);

            return false;
        }

        function closeFn(selector, $listCont, $this, $dir){
            selector.on('click', function(e){
                e.preventDefault();
                layerClose($listCont, $this);
                if($this.attr('class').indexOf('btnLayer') > -1) classOff($dir);
            });
        }

        function layerClose(target, $this){
            target.hide();
            focusOut($this, target);
        }

        function classOn(dir){
            $('.dir').removeClass('open');
            dir.addClass('open');
        }

        function classOff(dir){
            dir.removeClass('open');
        }

        function getHash(target){
            return target.hash;
        }

        function focusIn(focusInTarget){
            focusInTarget
                .attr('tabindex', 0)
                .focus();
        }

        function focusOut(focusOutTarget, $listCont){
            $listCont.attr('tabindex', -1);
            focusOutTarget.focus();
        }

        setLayer(accList);
        setLayer(btnList);
    }

}(window, window.jQuery));

/**
 * @ line-map
 */
(function($){
    'use strict';
    var selector = '[data-toggle="dropmenu"]',
        $subLastList;

    $(function(){
        $subLastList = $('.sub-nav li').last();
        var $parent = detectParent($subLastList);
        if($parent.is('.dropdown-menu')) {
            $subLastList.addClass('lnb-last');
        }
    });

    function keydownCheck(e){
        if(e.which != 9) {
            return;
        }

        if(e.shiftKey) {
            return;
        }

        checkMenus();
    }

    function detectParent($this){
        var selector = $this.attr('data-target');

        if(!selector) {
            selector = $this.attr('href');
            selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '');
        }

        var $parent = selector && $(selector);

        return $parent && $parent.length ? $parent : $this.parent();
    }

    function checkMenus(e){
        $(selector).each(function(){
            var $this = $(this);
            var $parent = detectParent($this);
            var relatedTarget = {relatedTarget:this};

            if(!$parent.hasClass('open')) {
                return;
            }

            if(e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return;

            $parent.trigger(e = $.Event('hide.dropmenu', relatedTarget));

            if(e.isDefaultPrevented()) {
                return;
            }

            $this.attr('aria-expanded', 'false');
            $parent.removeClass('open').trigger($.Event('hidden.dropmenu', relatedTarget));
        })
    }

    function toggle(e){
        var $this = $(this);
        var $parent = detectParent($this);
        var isActive = $parent.hasClass('open');

        checkMenus();

        if(!isActive) {

            var relatedTarget = {relatedTarget:this};
            $parent.trigger(e = $.Event('show.dropmenu', relatedTarget));

            if(e.isDefaultPrevented()) return;

            $this
                .trigger('focus')
                .attr('aria-expanded', 'true');

            $parent
                .toggleClass('open')
                .trigger($.Event('shown.dropmenu', relatedTarget));
        }

        return false;
    }

    function dropKeydown(e){
        if(!/(38|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;

        var $this = $(this);

        e.preventDefault();
        e.stopPropagation();

        var $parent = detectParent($this);
        var isActive = $parent.hasClass('open');

        if(!isActive && e.which != 27 || isActive && e.which == 27) {
            if(e.which == 27) $parent.find(selector).trigger('focus');
            return $this.trigger('click')
        }

        var desc = ' li a';
        var $items = $parent.find('.dropdown-menu' + desc);

        if(!$items.length) return;

        var index = $items.index(e.target);

        if(!~index) index = 0;

        $items.eq(index).trigger('focus')
    }

    $(document)
        .on('click.dropmenu.ck', checkMenus)
        .on('click.dropmenu.ck', selector, toggle)
        .on('keydown.dropmenu.key', selector, dropKeydown)
        .on('keydown.dropmenu.key', '.dropdown-menu', dropKeydown)
        .on('keydown.dropmenu.out', '.lnb-last', keydownCheck)
        .on('focusin.dropmenu.focusing', selector, checkMenus)
}(jQuery));
