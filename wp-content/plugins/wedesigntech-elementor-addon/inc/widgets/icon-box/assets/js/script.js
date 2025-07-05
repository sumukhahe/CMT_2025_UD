(function ($) {
  const wdtIconBoxWidgetHandler = function($scope) {
    const instance = new wdtIconBoxWidgetHandlerInit($scope);
    if($scope.find('.wdt-icon-box-holder').data('settings')) {
      const settings = $scope.find('.wdt-icon-box-holder').data('settings');
      if(settings['enable_hover_class']) {
        instance.hover_active_class();
      }
    }
  };
  const wdtIconBoxWidgetHandlerInit = function($scope) {
    const $self = this;
    $self.hover_active_class = function(){
        var icon_box_wdt_column = $scope.find('.wdt-icon-box-holder .wdt-column-wrapper .wdt-column');
        console.log(icon_box_wdt_column);
        $scope.find('.wdt-icon-box-holder .wdt-column-wrapper .wdt-column:first-child').addClass('wdt-active');
        icon_box_wdt_column.mouseover( function() {
          if( !($(this).hasClass('wdt-active')) ) {
            $scope.find('.wdt-icon-box-holder .wdt-column-wrapper .wdt-column').removeClass('wdt-active');
            $(this).addClass('wdt-active');
          }
        } );
    };
  };

  $(window).on('elementor/frontend/init', function () {
		elementorFrontend.hooks.addAction('frontend/element_ready/wdt-icon-box.default', wdtIconBoxWidgetHandler);
  });

})(jQuery);
