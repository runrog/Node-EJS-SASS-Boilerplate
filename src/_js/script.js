/* global jQuery */
/* eslint no-param-reassign: ["error", { "props": false }] */

(($) => {
  $.fn.myPattern = function myPattern() {
    const $myPattern = $(this);
    const actions = {
      someAction(opts) {
        return opts.a + opts.b;
      },
    };
    $.fn.myPattern.test = actions;
    return this;
  };
})(jQuery);
