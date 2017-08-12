function scrollSection (config) {
  "use strict";
  var container = $(config.container);
  var sections = $(config.section);


  var _scrollTopTargets = {};
  var _scrollBottomTargets = {};
  function _initialSection () {
    sections.each (function () {
      const top = $(this).offset().top
      _scrollTopTargets[$(this).attr('class')] = top;

      const bottom = window.innerHeight > $(this).outerHeight() ? top : top + $(this).outerHeight() - window.innerHeight;
      _scrollBottomTargets[$(this).attr('class')] = bottom;
    })
  }

  _initialSection ();

  //scroll top
  var _isScrollTop = false;
  var _scrollTopElement;
  var _backTop = function () {
    if (_scrollTopElement === undefined) return
    container.animate({
      scrollTop: _scrollTopTargets[_scrollTopElement.attr('class')]
    }, 600);
    setTimeout(function () {
      _isScrollTop = false;
    }, 650);
    _scrollTopElement = undefined;
  }

  var _backBottom = function () {
    if (_scrollTopElement === undefined) return
    container.animate({
      scrollTop: _scrollBottomTargets[_scrollTopElement.attr('class')]
    }, 600);
    setTimeout(function () {
      _isScrollTop = false;
    }, 650);
    _scrollTopElement = undefined;
  }

  // limit test
  var _inViewTop = function (element) {
    const rect = element.get(0).getBoundingClientRect();
    const boxBottom = rect.top + rect.height;
    const viewTop1 = 0;
    const viewTop2 = viewTop1 + window.innerHeight * 0.1;
    return boxBottom > viewTop1 && boxBottom < viewTop2; //in view top
  }

  var _isBottomLine = function (element) {
    const rect = element.get(0).getBoundingClientRect();
    const boxTop = rect.top;
    const viewBottom1 = window.innerHeight;
    const viewBottom2 = viewBottom1 - window.innerHeight * 0.1;
    return boxTop < viewBottom1 && boxTop > viewBottom2;
  }


  //main
  var _scrollToSection = function (e) {
    sections.each(function () {
      const boxElement = $(this);

      if (!_isScrollTop && isUp && _inViewTop(boxElement)) {
        $('.box2top').css('color', 'red');
        $('.box2bottom').css('color', 'black');

        _scrollTopElement = $(this);
        _isScrollTop = true;
        container.one('scroll', _backBottom);
      }
      else if (!_isScrollTop && !isUp && _isBottomLine(boxElement)) {
        $('.box2bottom').css('color', 'red');
        $('.box2top').css('color', 'black');

        _scrollTopElement = $(this);
        _isScrollTop = true;
        container.one('scroll', _backTop);
      }
    });
  }

  container.on('scroll', _scrollToSection)

  // find direct
  var isUp = false;
  container.on('wheel', function  (e) {
    isUp = e.originalEvent.wheelDelta > 0;
  })

  var lastY;
  container.on('touchmove', function  (e) {
    var currentY = e.originalEvent.touches[0].clientY;
    isUp = currentY > lastY;
    lastY = currentY;
  })
}

scrollSection({
  container: '.view',
  section: '.box'
})
