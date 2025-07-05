jQuery.noConflict();

jQuery(document).ready(function($){
    "use strict";

    // Product Listing Isotope
        $('.products-apply-isotope').each(function() {
            if(!$(this).hasClass('swiper-wrapper')) {
                $(this).isotope({itemSelector : '.wdt-col', transformsEnabled:false });
            }
        });

    // On window resize
        $(window).on('resize', function() {
            // Product Listing Isotope
            $('.products-apply-isotope').each(function() {
                if(!$(this).hasClass('swiper-wrapper')) {
                    $(this).isotope({itemSelector : '.wdt-col', transformsEnabled:false });
                }
            });
        });

    setTimeout( function() {
        if($('.products-apply-isotope').length) {
            window.dispatchEvent(new Event('resize'));
        }
    }, 900 );

    $('a.woocommerce-review-link').on('click', function( e ) {
        $( '.reviews_tab a' ).click();
        $('html, body').animate({
            scrollTop: $("#tab-reviews").offset().top - 100
        }, 1000);
        e.preventDefault();
    });

    $('#primary .products .product').each( function () {
        if($(this).hasClass('first')) {
            $(this).removeClass('first');
        }
        if($(this).hasClass('last')) {
            $(this).removeClass('last');
        }
    });

        // Product Offers Top Fix
        $('.product-offers').each(function() {
             if($(this).prev('.product-labels').length) {
                if($(this).parents('.products').hasClass('product-label-ribbon') || $(this).parents('.products').hasClass('product-label-angular')) {
                    var $height =$(this).prev('.product-labels').width() + 10;
                } else {
                    var $height =$(this).prev('.product-labels').height() + 10;
                }
                $(this).css({
                    'top': $height
                });
            }
        });

        // Product Custom Type Top Fix
        $('.product-custom-type').each(function() {
            if($(this).parents('.product').find('.featured-tag').length > 0) {
                var $height = $(this).parents('.product').find('.featured-tag').height();
                $(this).css({
                    'top': $height+20
                });
            }
        });

        
});

//Product Listing Page 
jQuery.noConflict();
jQuery(document).ready(function($){

    //Enquiry Form Popup
    $(".wdt-enquiry-btn").on("click", function() {
        $("#wdt-enquiry-form-popup").css('display', 'block');
        $("html").css('overflow', 'hidden');
    });
    
    $("#wdt-enquiry-form-close").on("click", function() {
        $("#wdt-enquiry-form-popup").css('display', 'none');
        $("html").css('overflow', 'visible');
    });

    var isSubmitting = false;

    $("#wdt-enquiry-form").off("submit").on("submit", function(e) {
        e.preventDefault();

        if (isSubmitting) return;
        isSubmitting = true;

        var formData = $(this).serialize();
        $.ajax({
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
                    $("#wdt-enquiry-form-popup").css('display', 'none');
                    $("#wdt-enquiry-form")[0].reset();
                } else {
                    alert(response.data);
                }
            },
            complete: function() {
                isSubmitting = false;
            }
        });
    });
});


//Script to Redirection of product detail page
document.addEventListener('DOMContentLoaded', function () {
    var product_detail = document.querySelectorAll('.wdt-productdetail-btn');
    product_detail.forEach(function(button) {
        button.addEventListener('click', function() {
            var productUrl = button.getAttribute('data-product-url');
            window.location.href = productUrl;
        });
    });
});


//script for Button Element Enquire Now Popup
jQuery.noConflict();
jQuery(document).ready(function($){
    
    $('#button-enquiry-bhktype, #button-enquiry-room, #button-enquiry-interior-styles').select2({
        placeholder: "Select an option",
        allowClear: true
    });

    $('.quick_enquire_now_button').on('click', function(e) {
        e.preventDefault();
        $('#wdt-summary-button-enquiry-form-popup').fadeIn();

        $('#button-enquiry-bhktype, #button-enquiry-room, #button-enquiry-interior-styles').select2();
    });

    $('#wdt-summary-button-enquiry-form-close').on('click', function(e) {
        e.preventDefault();
        $('#wdt-summary-button-enquiry-form-popup').fadeOut();
    });

    $(document).on('click', function(e) {
        if ($(e.target).closest('.wdt-summary-button-popup-content').length === 0 && $(e.target).is('#wdt-summary-button-enquiry-form-popup')) {
            $('#wdt-summary-button-enquiry-form-popup').fadeOut();
        }
    });

    $("#wdt-summary-button-enquiry-form").on("submit", function(e) {
        e.preventDefault();

        var name = $('#button-enquiry-name').val();
        var email = $('#button-enquiry-email').val();
        var phone = $('#button-enquiry-phone').val();
        var bhktype = $('#button-enquiry-bhktype').val();
        var room = $('#button-enquiry-room').val();
        var interior_styles = $('#button-enquiry-interior-styles').val();
        var description = $('#button-enquiry-description').val();

        var formData = {
            action: 'wdt_send_product_enquiry',
            nonce: wdtEnquiryNowObjects.nonce,
            enquiry_name: name,
            enquiry_email: email,
            enquiry_phone: phone,
            enquiry_bhktype: bhktype,
            enquiry_room: room,
            enquiry_interior_styles: interior_styles,
            enquiry_description: description
        };

        $.ajax({
            url: wdtEnquiryNowObjects.ajax_url,
            type: 'POST',
            data: formData,
            success: function(response) {
                if (response.success) {
                    alert(response.data);
                    $("#wdt-summary-button-enquiry-form-popup").fadeOut();
                    $("#wdt-summary-button-enquiry-form")[0].reset();
                } else {
                    alert(response.data);
                }
            }
        });
    });
});
