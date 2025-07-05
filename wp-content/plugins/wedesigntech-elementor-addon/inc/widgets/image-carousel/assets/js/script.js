(function ($) {
  const WeDesignTech_Widget_Base_Image_Carousel = function ($scope, $) {
    const slider = $scope.find('.wdt-image-carousel-slider');
    
    function activate(e) {
      const items = slider.find('.wdt-img-carousel-item');
      if ($(e.target).hasClass('wdt-image-carousel-btn-next')) {
        slider.append(items.first());
      }
      if ($(e.target).hasClass('wdt-image-carousel-btn-prev')) {
        slider.prepend(items.last());
      }
    }

    $scope.on('click', '.wdt-image-carousel-btn-next, .wdt-image-carousel-btn-prev', activate);
  }

  $(window).on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/wdt-image-carousel.default', WeDesignTech_Widget_Base_Image_Carousel);
  });
})(jQuery);