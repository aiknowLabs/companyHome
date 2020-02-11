(function($) {
    function init_odometer(el) {
        if ($('.gem-counter-odometer', el).size() == 0)
            return;
        var odometer = $('.gem-counter-odometer', el).get(0);
        var format = $(el).closest('.gem-counter-box').data('number-format');
        format = format ? format : '(ddd).ddd';
        var od = new Odometer({
            el: odometer,
            value: $(odometer).text(),
            format: format
        });
        od.update($(odometer).data('to'));
    }

    window.thegem_init_odometer = init_odometer;

    $('.gem-counter').each(function(index) {
        if ($(this).closest('.gem-counter-box').size() > 0 && $(this).closest('.gem-counter-box').hasClass('lazy-loading') && !window.gemSettings.lasyDisabled) {
            $(this).addClass('lazy-loading-item').data('ll-effect', 'action').data('item-delay', '0').data('ll-action-func', 'thegem_init_odometer');
            $('.gem-icon', this).addClass('lazy-loading-item').data('ll-effect', 'fading').data('item-delay', '0');
            $('.gem-counter-text', this).addClass('lazy-loading-item').data('ll-effect', 'fading').data('item-delay', '0');
            return;
        }
        init_odometer(this);
    });
})(jQuery);
