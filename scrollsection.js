var scrollSection = {
  // "use strict";
  _container: $('.view'),
  _sections: $('.box'),

  // find direct
  isUp: false,
  lastY: undefined,

  initial: function (config) {
    _this = this;

    _this._container = config.container;
    _this._sections = config.section;

    _this._container.on('scroll', _this._scrollToSection)
    _this._container.on('wheel', function  (e) {
      _this.isUp = e.originalEvent.wheelDelta > 0;
    })
    _this._container.on('touchmove', function  (e) {
      var currentY = e.originalEvent.touches[0].clientY;
      _this.isUp = currentY > _this.lastY;
      _this.lastY = currentY;
    })

    _this._calcSection();
  },

  _scrollTopTargets: {},
  _scrollBottomTargets: {},

  _calcSection: function () {

    _this._sections.each (function () {
      const top = $(this).offset().top | 0;
      _this._scrollTopTargets[$(this).attr('class')] = top;

      const bottom = window.innerHeight > $(this).outerHeight() ? top : top + $(this).outerHeight() - window.innerHeight;
      _this._scrollBottomTargets[$(this).attr('class')] = bottom;
    })

    console.log(_this._scrollTopTargets);
    console.log(_this._scrollBottomTargets);
  },

  //scroll top
  _scrollTopElement: undefined,
  _isScrollTop: false,
  _backTop: function () {
    if (_this._scrollTopElement === undefined) return

    console.log(_this._scrollTopElement, _this._scrollTopTargets[_this._scrollTopElement.attr('class')]);

    _this._container.animate({
      scrollTop: _this._scrollTopTargets[_this._scrollTopElement.attr('class')]
    }, 600);
    setTimeout(function () {
      // _this._container.on('scroll', _this._scrollToSection)
      _this._isScrollTop = false;
    }, 650);
    _this._scrollTopElement = undefined;
  },

  _backBottom: function () {
    if (_this._scrollTopElement === undefined) return

    console.log(_this._scrollTopElement, _this._scrollTopTargets[_this._scrollTopElement.attr('class')]);

    _this._container.animate({
      scrollTop: _this._scrollBottomTargets[_this._scrollTopElement.attr('class')]
    }, 600);
    setTimeout(function () {
      // _this._container.on('scroll', _this._scrollToSection)
      _this._isScrollTop = false;
    }, 650);
    _this._scrollTopElement = undefined;
  },

  // limit test
  _inViewTop: function (element) {
    const rect = element.get(0).getBoundingClientRect();
    const boxBottom = rect.top + rect.height;
    const viewTop1 = 0;
    const viewTop2 = viewTop1 + window.innerHeight * 0.1;
    return boxBottom > viewTop1 && boxBottom < viewTop2; //in view top
  },

  _isBottomLine: function (element) {
    const rect = element.get(0).getBoundingClientRect();
    const boxTop = rect.top;
    const viewBottom1 = window.innerHeight;
    const viewBottom2 = viewBottom1 - window.innerHeight * 0.1;
    return boxTop < viewBottom1 && boxTop > viewBottom2;
  },


  //main
  _scrollToSection: function (e) {

    _this._sections.each(function () {
      _this._scrollTopElement = $(this);
      console.log('_this._scrollTopElement = $(this);', $(this));

      // if (_this.isUp && _this._inViewTop(_this._scrollTopElement)) {
      if (!_this._isScrollTop && _this.isUp && _this._inViewTop(_this._scrollTopElement)) {
        // _this._container.off('scroll', _this._scrollToSection)
        console.log($(this));

        _this._isScrollTop = true;
        // _this._container.one('scroll', _this._backBottom);
        _this._backBottom();
      }
      // else if (!_this.isUp && _this._isBottomLine(_this._scrollTopElement)) {
      else if (!_this._isScrollTop && !_this.isUp && _this._isBottomLine(_this._scrollTopElement)) {
        // _this._container.off('scroll', _this._scrollToSection)
        console.log($(this));

        _this._isScrollTop = true;
        // _this._container.one('scroll', _this._backTop);
        _this._backTop();
      }
    });
  },
}
