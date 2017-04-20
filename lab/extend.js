/*
(function($){
    $.fn.removeAni = function(){
        this.each(function(index){
            var $target = $(this);
            $target.delay(index*1000).animate({
                height:0
            },5000, function(){
                $target.remove();
            });
        });
        return this;
    }
})(jQuery);*/

(function ($) {
    $.defaultOptions = {
        duration: 500,
        easing: "easeInQuint",
        delayTime : 1000
    }

    $.fn.removeAni = function(duration,easing,delayTime){
        duration = duration || $.defaultOptions.duration;
        easing = easing || $.defaultOptions.easing;
        delayTime = delayTime || $.defaultOptions.delayTime;

        this.each(function(index){
            var $target = $(this);
            $target.delay(index*delayTime).animate({
                height:0
            },duration,easing,function(){
               $target.remove();
            });
        });
        return this;
    }
})(jQuery);
