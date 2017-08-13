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
  _inViewOuterTop: function (element) {
    const rect = element.get(0).getBoundingClientRect();
    const boxTop = rect.top;
    const viewTop1 = 0 - 2 - window.innerHeight * 0.1;
    const viewTop2 = 0 - 2;
    console.log('inViewOuterTop', boxTop, viewTop1, viewTop2);
    return boxTop > viewTop1 && boxTop < viewTop2;
  },
  _inViewInnerTop: function (element) {
    const rect = element.get(0).getBoundingClientRect();
    const boxBottom = rect.top + rect.height;
    const viewTop1 = 0 + 2;
    const viewTop2 = 0 + 2 + window.innerHeight * 0.1;
    console.log('inViewInnerTop', boxBottom, viewTop1, viewTop2);
    return boxBottom > viewTop1 && boxBottom < viewTop2;
  },

  _isViewInnerBottom: function (element) {
    const rect = element.get(0).getBoundingClientRect();
    const boxTop = rect.top;
    const viewBottom1 = window.innerHeight - 2 - window.innerHeight * 0.1;
    const viewBottom2 = window.innerHeight - 2;
    console.log('isViewInnerBottom', boxTop > viewBottom1 && boxTop < viewBottom2);
    return boxTop > viewBottom1 && boxTop < viewBottom2;
  },
  _isViewOuterBottom: function (element) {
    const rect = element.get(0).getBoundingClientRect();
    const boxBottom = rect.top + rect.height;
    const viewBottom1 = window.innerHeight + 2;
    const viewBottom2 = window.innerHeight + 2 + window.innerHeight * 0.1;
    console.log('isViewOuterBottom', boxBottom > viewBottom1 && boxBottom < viewBottom2);
    return boxBottom > viewBottom1 && boxBottom < viewBottom2;
  },


  //main
  _scrollToSection: function (e) {

    _this._sections.each(function () {
      if (_this._isScrollTop) return;
      console.log('currElement: ', $(this));

      // if (_this.isUp && _this._inViewInnerTop($(this)) ) {
      if (_this.isUp && _this._inViewInnerTop($(this)) ||
         !_this.isUp && _this._isViewOuterBottom($(this)) ) {
        _this._scrollTopElement = $(this);
        _this._isScrollTop = true;
        _this._backBottom();
      }
      // else if (!_this.isUp && _this._isViewInnerBottom($(this)) ) {
      else if (!_this.isUp && _this._isViewInnerBottom($(this)) ||
                _this.isUp && _this._inViewOuterTop($(this)) ) {
        _this._scrollTopElement = $(this);
        _this._isScrollTop = true;
        _this._backTop();
      }
    });
  },
}
