var dtEnquireNowInit = function() {

    var $warp_fragment_refresh = {
        url: wc_cart_fragments_params.wc_ajax_url.toString().replace( '%%endpoint%%', 'get_refreshed_fragments' ),
        type: 'POST',
        success: function( data ) {

            if ( data && data.fragments ) {

                jQuery.each( data.fragments, function( key, value ) {
                    jQuery( key ).replaceWith( value );
                });

                jQuery( document.body ).trigger( 'wc_fragments_refreshed' );
                jQuery( document.body ).trigger( 'added_to_cart' );

            }

        }
    };

    jQuery('#enquiry-bhktype, #enquiry-room, #enquiry-interior-styles').each(function() {
        if (!jQuery(this).data('select2')) {
            jQuery(this).select2({
                placeholder: "Select an option",
                allowClear: true
            });
        }
    });

    //Enquire Popup Script
    jQuery('.quick_enquire_now_button').on('click', function(e) {

        jQuery('#enquiry-bhktype').select2();
        jQuery('#enquiry-room').select2();
        jQuery('#enquiry-interior-styles').select2();

        e.preventDefault();
        jQuery('#wdt-summary-enquiry-form-popup').fadeIn();
    });

    jQuery('#wdt-summary-enquiry-form-close').on('click', function(e) {
        e.preventDefault();
        jQuery('#wdt-summary-enquiry-form-popup').fadeOut();
    });

    jQuery(document).on('click', function(e) {
        if (jQuery(e.target).closest('.wdt-summary-popup-content').length === 0 && jQuery(e.target).is('#wdt-summary-enquiry-form-popup')) {
            jQuery('#wdt-summary-enquiry-form-popup').fadeOut();
        }
    });

    jQuery("#wdt-summary-enquiry-form").on("submit", function(e) {
        e.preventDefault();
        var formData = jQuery(this).serialize();

        jQuery.ajax({
            url: wdtEnquiryNowObjects.ajax_url,
            type: 'POST',
            data: {
                action: 'wdt_send_product_enquiry',
                nonce: wdtEnquiryNowObjects.nonce,
                formData: formData
            },
            success: function(response) {
                if (response.success) {
                    alert(response.data);
                    jQuery("#wdt-summary-enquiry-form-popup").fadeOut();
                    jQuery("#wdt-summary-enquiry-form")[0].reset();
                } else {
                    alert(response.data);
                }
            }
        });
    });

    
};

jQuery.noConflict();
jQuery(document).ready(function($){

    "use strict";

    if ( typeof wdtShopObjects !== 'undefined' ) {
        if(wdtShopObjects.enable_enquire_now_scripts) {
            dtEnquireNowInit();
        }
    }


});


( function( $ ) {
	var wdtShopEnquireNowJs = function($scope, $){
        dtEnquireNowInit();
	};

    $(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/wdt-shop-product-single-summary.default', wdtShopEnquireNowJs);
	});

} )( jQuery );