/**
 * ----------------------------
 * @carousel
 * ----------------------------
 **/
var UI = UI || {},
    scope = {
        w : window,
        jQ : jQuery
    };
(function (param) {
    var global = param.w,
        $      = param.jQ;

    UI.Carousel = function (container, options) {

        if (!$(container).length)  return;
        this.$container = $(container);

        if (!(this instanceof  UI.Carousel)) {
            return new UI.Carousel(container, options);
        }

        this.config = $.extend(this.defaults, options || {});
        this.detect = {};
        this._init();
    };
    UI.Carousel.prototype = {
        defaults : {
            start: 0,
            autoPlay: true,
            duration: 1000,
            interval : 3000
        },
        _init : function () {
            this._detectDom();
            this._setupIndicator();
            this._setEvent();
            this._showDefault();
            this._autoRolling();
        },
        _detectDom : function () {

            this.detect.$controller  = this.$container.find('.controller');
            this.detect.$visualItems = this.$container.find('.visual li');
            this.detect.$btnStop     = this.$container.find('.ctrl-stop');
            this.detect.$btnPlay     = this.$container.find('.ctrl-play');
            this.detect.maxItems     = this.detect.$visualItems.length;
            this.detect.$indicator   = null;
            this.detect.current      = 0;
            this.detect.intervalID   = null;

        },
        _setupIndicator : function () {
            var i   = 0,
                len = this.detect.maxItems;
            for (; i < len; i++) {
                this.detect.$controller.append(
                    '<a href="#" class="indicator" data-index="' + i + '" role="button">' + (i+1) + '</a>'
                );
            }

            this.detect.$indicator = this.detect.$controller.find('.indicator');
        },
        _setEvent : function () {
            var self = this;

            $(this.$container).on('click.ui.gallery', '.indicator', $.proxy(this._controller, this));

            this.detect.$btnStop.on('click.ui.stop', function () {
                var $target = $(this);
                self.config.autoPlay = false;
                clearInterval(self.detect.intervalID);
                $target.removeClass('active');
                self.detect.$btnPlay.addClass('active');
            });

            this.detect.$btnPlay.on('click.ui.play', function () {
                var $target = $(this);
                self.config.autoPlay = true;
                self._autoRolling();
                $target.removeClass('active');
                self.detect.$btnStop.addClass('active');
            });

            this.detect.$indicator.hover(
                function () {
                    if (self.config.autoPlay) clearInterval(self.detect.intervalID);
                },
                function () {
                    if (self.config.autoPlay) self._autoRolling();
                }
            );
        },
        _controller : function (e) {
            e.preventDefault();
            var $target = $(e.currentTarget),
                index   = $target.data('index');

            $target.addClass('active');
            $target.siblings().removeClass('active');

            if (this.detect.current == index) return;

            this._hideItem(this.detect.current);
            this._showItem(index);

            this.detect.current = index;
        },
        _showItem : function (index) {
            this.detect.$visualItems.eq(index).fadeIn(this.config.duration);
        },
        _hideItem : function (prevItemIndex) {
            this.detect.$visualItems.eq(prevItemIndex).fadeOut(this.config.duration);
        },
        _showDefault : function () {
            this.detect.$indicator.eq(this.config.start).trigger('click');
        },
        _autoRolling : function () {
            var num, self = this;
            if (this.config.autoPlay) {
                this.detect.intervalID = setInterval(function () {
                    num =  self.detect.current;
                    (num < self.detect.maxItems-1) ? num++ : (num = 0);
                    self.detect.$indicator.eq(num).trigger('click')
                }, this.config.interval)
            }
        },
    };

    $(function () {

        var $visual = $('[data-visual="carousel"]');
        $visual.each(function () {
            new UI.Carousel(this);
        });

    });


})(scope);/**
 * Created by home on 2017-03-27.
 */
