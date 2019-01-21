+function($) {

   "use strict";

   var _createClass = (function() {
      function defineProperties(target, props) {
         for (var key in props) {
            var prop = props[key];
            prop.configurable = true;
            if (prop.value) prop.writable = true;
         }
         Object.defineProperties(target, props);
      };
      return function(Constructor, protoProps, staticProps) {
         if (protoProps) defineProperties(Constructor.prototype, protoProps);
         if (staticProps) defineProperties(Constructor, staticProps);
         return Constructor;
      };
   })();

   var _classCallCheck = function(instance, Constructor) {
      if (!(instance instanceof Constructor)) {

         throw new TypeError("Cannot call a class as a function");

      }
   };

   var DatePicker = (function($) {

      var className = "datepicker";
      var _jQueryNoConflict = $.fn[className];

      // Public options and methods
      var defaults = {
         debug: true,
         format: 'mm/dd/yyyy',
         className: 'datepicker',
         input: '.form-control'
      };

      var DatePicker = (function() {

         function DatePicker($element, config) {

            var _this = this;
            _classCallCheck(_this, DatePicker);

            // Prepare class name to remove dots (.) from selector
            config.className = config.className.replace(/\./g, '');

            // Merge default and custom options
            _this._config = $.extend({}, defaults, config);

            // Configure variables
            _this._$element = $element instanceof jQuery ? $element : $($element);
            _this._$input = _this._config.input instanceof jQuery ? _this._config.input : $(_this._config.input);

            if(_this._config.debug)
               console.log(_this._$input);

            if(_this._$element)
               _this._$element.addClass(_this._config.className);

         };

         _createClass(DatePicker, {
            element: {
               value: function element() {
                  var _this = this;
                  return _this._$element;
               }
            }
            /*
            someFunction: {
               value: function someFunction() {

                  console.log('Call `someFunction` method');

               }
            }
            */
         }, {
            Default: {
               get: function() {
                  return defaults;
               }
            },
            _jQueryInterface: {
               value: function _jQueryInterface(config) {
                  var _this = this;
                  config = config || {};
                  return _this.each(function() {
                     var $this = $(_this);
                     var _config = $.extend({}, DatePicker.Default, $this.data(), typeof config === "object" && config);
                     new DatePicker(_this, _config);
                  });
               }
            }
         });

         return DatePicker;

      })();

      $.fn[className] = DatePicker._jQueryInterface;
      $.fn[className].Constructor = DatePicker;
      $.fn[className].noConflict = function() {
         $.fn[className] = _jQueryNoConflict;
         return DatePicker._jQueryInterface;
      };

      return DatePicker;

   })(jQuery);
}(jQuery);