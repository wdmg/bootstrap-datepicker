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
         format: 'YYYY-MM-DD HH:mm:ss', // string, default format of date/time
         className: '.datepicker', // string, class name of input group
         input: '.form-control', // string, selector or jQuery object of input
         toggle: '.input-group-btn > button', // string, selector of datepicker popover toggle
         template: '<div class="popover popover-datepicker" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>', // string, popover template
         daysStrings: [ // array, days of week, starting on Monday
            {
               'short': 'Mon',
               'full': 'Monday'
            },
            {
               'short': 'Tue',
               'full': 'Tuesday'
            },
            {
               'short': 'Wed',
               'full': 'Wednesday'
            },
            {
               'short': 'Thu',
               'full': 'Thursday'
            },
            {
               'short': 'Fri',
               'full': 'Friday'
            },
            {
               'short': 'Sat',
               'full': 'Saturday'
            },
            {
               'short': 'Sun',
               'full': 'Sunday'
            }
         ],
         monthsStrings: [ // array, months, starting on January
            {
               'short': 'Jan',
               'full': 'January'
            },
            {
               'short': 'Feb',
               'full': 'February'
            },
            {
               'short': 'Mar',
               'full': 'March'
            },
            {
               'short': 'Apr',
               'full': 'April'
            },
            {
               'short': 'May',
               'full': 'May'
            },
            {
               'short': 'Jun',
               'full': 'June'
            },
            {
               'short': 'Jul',
               'full': 'July'
            },
            {
               'short': 'Aug',
               'full': 'August'
            },
            {
               'short': 'Sep',
               'full': 'September'
            },
            {
               'short': 'Oct',
               'full': 'October'
            },
            {
               'short': 'Nov',
               'full': 'November'
            },
            {
               'short': 'Dec',
               'full': 'December'
            }
         ],
         debug: false, // boolean, flag if need debug in console log
         onShow: function onShow() { }, // The function that is called when the datepicker popover is ready to be displayed
         onShown: function onShown() { }, // The function that is called when the datepicker popover is displayed
         onHide: function onHide() { }, // The function that is called when datepicker popover to prepare for hiding
         onHidden: function onHidden() { }, // The function that is called when the datepicker popover is hidden
         onGetPrev: function onGetPrev() { }, // The function that is called when you select the previous month or year
         onGetNext: function onGetNext() { }, // The function that is called when you select the next month or year
         onSetValue: function onSetValue() { } // The function that is called when the date is selected. Sets new date value to input
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
            _this._$input = _this._config.input instanceof jQuery ? _this._config.input : _this._$element.find(_this._config.input);
            _this._$popover = _this._config.toggle instanceof jQuery ? _this._config.toggle : _this._$element.find(_this._config.toggle);

             _this._inputId = _this._$input.attr('id');
             if (!_this._inputId) {
                 _this._inputId = 'datepicker-input-' + (String.fromCharCode(Math.floor(Math.random() * 11)) + Math.floor(Math.random() * 1000000)).trim();
                 _this._$input.attr('id', _this._inputId);
             }

             // Set datetime format
            if (typeof (_this._config.format) == 'string')
               _this._dateFormat = _this._config.format.charAt(0).toUpperCase();
            else
               _this._dateFormat = 'M';



            // Add base datepicker class to .input-group
            if(_this._$element)
               _this._$element.addClass(_this._config.className);

            // Datepicker content variables
            _this._header = null;
            _this._html = null;

            // Configure date and time variables
            _this.currentYear = null;
            _this.currentMonth = null;
            _this.currentDay = null;
            _this.currentHour = null;
            _this.currentMinute = null;
            _this.currentSecond = null;

            // Set the datepicker current date
            if(_this._$input) {
               var inputDate = new Date(_this._$input.val().replace(' ', 'T'));
               _this.showCurrent(inputDate.getUTCFullYear(), inputDate.getUTCMonth(), inputDate.getUTCDate(), inputDate.getUTCHours(), inputDate.getUTCMinutes(), inputDate.getUTCSeconds());
            } else {
               _this.showCurrent();
            }

            // Init popover component
            _this._$popover.popover({
               placement: 'auto',
               html: true,
               template: _this._config.template,
               title: function() {
                  return _this._header;
               },
               content: function() {
                  return _this._html;
               },
            }).click(function(event) {
               event.preventDefault();
            });

            // Call a public methods
            _this._$popover.on('show.bs.popover', function() {

               if(_this._config.debug)
                  console.log('Call `onShow` method', _this);

               return _this._config.onShow.call(_this);

            }).on('shown.bs.popover', function() {

               if(_this._config.debug)
                  console.log('Call `onShown` method', _this);

               return _this._config.onShown.call(_this);

            }).on('hide.bs.popover', function() {

               if(_this._config.debug)
                  console.log('Call `onHide` method', _this);

               return _this._config.onHide.call(_this);

            }).on('hidden.bs.popover', function() {

               if(_this._config.debug)
                  console.log('Call `onHidden` method', _this);

               return _this._config.onHidden.call(_this);

            });

            // Registered event listeners
            _this._$element.on("click", 'a[data-set]', function (event) {
               event.preventDefault();
               var newDate = $(event.currentTarget).data('set');

               if(_this.currentHour && _this.currentMinute && _this.currentSecond)
                   newDate += 'T' + _this.zeroFormatting(_this.currentHour) + ':' + _this.zeroFormatting(_this.currentMinute) + ':' + _this.zeroFormatting(_this.currentSecond);

               _this.setDate(newDate);
               //_this.setTime();
               return _this._config.onSetValue.call(_this);
            });

            _this._$element.on("click", 'a[data-rel="prev-year"]', function (event) {
               event.preventDefault();
               _this.getPrevYear();
               return _this._config.onGetPrev.call(_this);
            });

            _this._$element.on("click", 'a[data-rel="next-year"]', function (event) {
               event.preventDefault();
               _this.getNextYear();
               return _this._config.onGetNext.call(_this);
            });

            _this._$element.on("click", 'a[data-rel="prev-month"]', function (event) {
               event.preventDefault();
               _this.getPrevMonth();
               return _this._config.onGetPrev.call(_this);
            });

            _this._$element.on("click", 'a[data-rel="next-month"]', function (event) {
               event.preventDefault();
               _this.getNextMonth();
               return _this._config.onGetNext.call(_this);
            });




             _this._$element.on("change", '#time-hours', function (event) {
                 var $input = $(event.currentTarget);
                 var value = parseInt($input.val());
                 $input.val(_this.zeroFormatting(value));
                 _this.currentHour = value;
                 _this.setTime();
             });
             _this._$element.on("change", '#time-minutes', function (event) {
                 var $input = $(event.currentTarget);
                 var value = parseInt($input.val());
                 $input.val(_this.zeroFormatting(value));
                 _this.currentMinute = value;
                 _this.setTime();
             });
             _this._$element.on("change", '#time-seconds', function (event) {
                 var $input = $(event.currentTarget);
                 var value = parseInt($input.val());
                 $input.val(_this.zeroFormatting(value));
                 _this.currentSecond = value;
                 _this.setTime();
             });


             _this._$element.on("click", '[data-action="set-hours-up"]', function (event) {

                 var $input = $($(event.currentTarget).data('rel'));
                 var value = parseInt($input.val()) + 1;

                 if(value >= 24)
                     value = 0;

                 $input.val(_this.zeroFormatting(value));
                 _this.currentHour = value;
                 _this.setTime();
             });
             _this._$element.on("click", '[data-action="set-minutes-up"]', function (event) {

                 var $input = $($(event.currentTarget).data('rel'));
                 var value = parseInt($input.val()) + 1;

                 if(value >= 60)
                     value = 0;

                 $input.val(_this.zeroFormatting(value));
                 _this.currentMinute = value;
                 _this.setTime();
             });
             _this._$element.on("click", '[data-action="set-seconds-up"]', function (event) {

                 var $input = $($(event.currentTarget).data('rel'));
                 var value = parseInt($input.val()) + 1;

                 if(value >= 60)
                     value = 0;

                 $input.val(_this.zeroFormatting(value));
                 _this.currentSecond = value;
                 _this.setTime();
             });


             _this._$element.on("click", '[data-action="set-hours-down"]', function (event) {

                 var $input = $($(event.currentTarget).data('rel'));
                 var value = parseInt($input.val()) - 1;

                 if(value < 0)
                     value = 23;

                 $input.val(_this.zeroFormatting(value));
                 _this.currentHour = value;
                 _this.setTime();
             });
             _this._$element.on("click", '[data-action="set-minutes-down"]', function (event) {

                 var $input = $($(event.currentTarget).data('rel'));
                 var value = parseInt($input.val()) - 1;

                 if(value < 0)
                     value = 59;

                 $input.val(_this.zeroFormatting(value));
                 _this.currentMinute = value;
                 _this.setTime();
             });
             _this._$element.on("click", '[data-action="set-seconds-down"]', function (event) {

                 var $input = $($(event.currentTarget).data('rel'));
                 var value = parseInt($input.val()) - 1;

                 if(value < 0)
                     value = 59;

                 $input.val(_this.zeroFormatting(value));
                 _this.currentSecond = value;
                 _this.setTime();
             });




         }

         _createClass(DatePicker, {
            element: {
               value: function element() {
                  var _this = this;
                  return _this._$element;
               }
            },
            zeroFormatting: {
               value: function zeroFormatting(string) {
                  return string.toString().replace(/\b(\d{1})\b/g, '0$1').replace(/-/g, '')
               }
            },
            update: {
               value: function update() {
                  var _this = this;
                  var popoverId = _this._$popover.attr('aria-describedby');
                  var $popover = $('#'+popoverId);
                  $popover.find('.popover-title').html(_this._header);
                  $popover.find('.popover-content').html(_this._html);
               }
            },
            showCurrent: {
               value: function showCurrent(year, month, day, hour, minute, second) {

                   if (this._config.debug)
                       console.log('Call `showCurrent` method', this);

                   this._isdatetime = true;
                   this._isdate = true;
                   this._istime = true;

                   // Vars
                   var header, html;

                   // Get the current datetime
                   this.currentDate = new Date();

                   if (year) // Set the current year
                       this.currentYear = parseInt(year);
                   else
                       this.currentYear = this.currentDate.getUTCFullYear();

                   if (month) // Set the current month
                       this.currentMonth = parseInt(month);
                   else
                       this.currentMonth = this.currentDate.getUTCMonth();

                   if (day) // Set the day
                       this.currentDay = parseInt(day);
                   else
                       this.currentDay = this.currentDate.getUTCDate();

                   if (hour) // Set the hour
                       this.currentHour = parseInt(hour);
                   else
                       this.currentHour = this.currentDate.getUTCHours();

                   if (minute) // Set the minute
                       this.currentMinute = parseInt(minute);
                   else
                       this.currentMinute = this.currentDate.getUTCMinutes();

                   if (second) // Set the second
                       this.currentSecond = parseInt(second);
                   else
                       this.currentSecond = this.currentDate.getUTCSeconds();

                   var prevYearLink = '<a href="#" data-rel="prev-year" class="btn btn-small pull-left">&lt;&lt;</a>';
                   var nextYearLink = '<a href="#" data-rel="next-year" class="btn btn-small pull-right">&gt;&gt;</a>';
                   var prevMonthLink = '<a href="#" data-rel="prev-month" class="btn btn-small pull-left">&lt;</a>';
                   var nextMonthLink = '<a href="#" data-rel="next-month" class="btn btn-small pull-right">&gt;</a>';

                   // Write selected month and year
                   header = prevYearLink + prevMonthLink + this._config.monthsStrings[this.currentMonth]['short'] + ' – ' + this.currentYear + nextYearLink + nextMonthLink;

                   // Start rendering table of calendar
                   if(this._isdatetime || this._isdate) {

                       html = '<table class="table table-condensed table-calendar">';

                       // Generate the days of the week
                       html += '<thead>';
                       html += '<tr>';

                       for (var i = 0; i <= 6; i++) {
                           html += '<th class="header header-days text-center">' + this._config.daysStrings[i]['short'] + '</th>';
                       }

                       html += '</tr>';
                       html += '</thead>';

                       html += '<tbody>';

                       // First day of the current month
                       var firstDayOfCurrentMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();

                       // Last day of the current month
                       var lastDayOfCurrentMonth = new Date(this.currentYear, (this.currentMonth + 1), 0).getDate();

                       // Last day of the previous month
                       var lastDayOfLastMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();

                       // If current month is January last month is - December, in past year
                       if (this.currentMonth == 0)
                           var lastDayOfLastMonth = new Date((this.currentYear - 1), 12, 0).getDate();

                       // Next day of the current month
                       var nextDay = this._dateFormat == 'M' ? 1 : firstDayOfCurrentMonth == 0 ? -5 : 2;
                       var dayMonth = nextDay;

                       // Prev day of the current month
                       var pastDay;

                       // Generate the table of calendar
                       for (var currentDay, week = 0, rows = 0; rows < 6; rows++) {

                           html += '<tr>';

                           for (var cols = 0; cols <= 6; cols++) {
                               currentDay = week + dayMonth - firstDayOfCurrentMonth;
                               if (currentDay < 1) {
                                   // Dates from prev month
                                   pastDay = lastDayOfLastMonth - firstDayOfCurrentMonth + nextDay++;
                                   html += '<td class="prev-month-day"><a href="#" class="btn btn-link btn-small disabled text-muted">' + pastDay + '</a></td>';
                               } else if (currentDay > lastDayOfCurrentMonth) {
                                   // Dates from next month
                                   html += '<td class="next-month-day"><a href="#" class="btn btn-link btn-small disabled text-muted">' + (nextDay++) + '</a></td>';
                               } else {


                                   var currentDateYear = this.currentYear.toString();
                                   var currentDateMonth = (this.currentMonth + 1).toString().replace(/\b(\d{1})\b/g, '0$1').replace(/-/g, '');
                                   var currentDateDay = currentDay.toString().replace(/\b(\d{1})\b/g, '0$1').replace(/-/g, '');

                                   // Current month dates
                                   if (this.currentDay == currentDay)
                                       html += '<td class="current-month-day"><a href="#" data-set="' + currentDateYear + '-' + currentDateMonth + '-' + currentDateDay + '" class="btn btn-primary btn-small">' + currentDay + '</a></td>';
                                   else
                                       html += '<td class="current-month-day"><a href="#" data-set="' + currentDateYear + '-' + currentDateMonth + '-' + currentDateDay + '" class="btn btn-link btn-small">' + currentDay + '</a></td>';

                                   nextDay = 1;
                               }

                               if (week % 7 == 6 && currentDay >= lastDayOfCurrentMonth)
                                   rows = 6;

                               week++;
                           }

                           html += '</tr>';
                       }

                       html += '</tbody>';
                       html += '</table>';
                   }

                   // Start rendering table of time setter
                   if(this._isdatetime || this._istime) {

                       /*
                       if(this._istime)
                           header = 'Select time';
                       */

                       html += '<table>';
                       html += '<tbody>';

                       html += '<tr>';
                       html += '<td><a href="#" class="btn btn-small btn-block" data-action="set-hours-up" data-rel="#time-hours"><span class="glyphicon glyphicon-chevron-up"></span></a></td>';
                       html += '<td>&nbsp;</td>';
                       html += '<td><a href="#" class="btn btn-small btn-block" data-action="set-minutes-up" data-rel="#time-minutes"><span class="glyphicon glyphicon-chevron-up"></span></a></td>';
                       html += '<td>&nbsp;</td>';
                       html += '<td><a href="#" class="btn btn-small btn-block" data-action="set-seconds-up" data-rel="#time-seconds"><span class="glyphicon glyphicon-chevron-up"></span></a></td>';
                       html += '</tr>';

                       html += '<tr>';
                       html += '<td><input type="text" id="time-hours" class="form-control" maxlength="2" value="' + this.zeroFormatting(parseInt(this.currentHour)) + '" /></td>';
                       html += '<td>&nbsp;:&nbsp;</td>';
                       html += '<td><input type="text" id="time-minutes" class="form-control" maxlength="2" value="' + this.zeroFormatting(parseInt(this.currentMinute)) + '" /></td>';
                       html += '<td>&nbsp;:&nbsp;</td>';
                       html += '<td><input type="text" id="time-seconds" class="form-control" maxlength="2" value="' + this.zeroFormatting(parseInt(this.currentSecond)) + '" /></td>';
                       html += '</tr>';

                       html += '<tr>';
                       html += '<td><a href="#" class="btn btn-small btn-block" data-action="set-hours-down" data-rel="#time-hours"><span class="glyphicon glyphicon-chevron-down"></span></a></td>';
                       html += '<td>&nbsp;</td>';
                       html += '<td><a href="#" class="btn btn-small btn-block" data-action="set-minutes-down" data-rel="#time-minutes"><span class="glyphicon glyphicon-chevron-down"></span></a></td>';
                       html += '<td>&nbsp;</td>';
                       html += '<td><a href="#" class="btn btn-small btn-block" data-action="set-seconds-down" data-rel="#time-seconds"><span class="glyphicon glyphicon-chevron-down"></span></a></td>';
                       html += '</tr>';

                       html += '</tbody>';
                       html += '</table>';
                   }

                   this._header = header;
                   this._html = html;

                   return this.update();

               }
            },
            getPrevYear: {
               value: function getPrevYear() {

                  if(this._config.debug)
                     console.log('Call `getPrevYear` method', this);

                  this.currentYear = this.currentYear - 1;
                  this.showCurrent(this.currentYear, this.currentMonth);
               }
            },
            getNextYear: {
               value: function getNextYear() {

                  if(this._config.debug)
                     console.log('Call `getNextYear` method', this);

                  this.currentYear = this.currentYear + 1;
                  this.showCurrent(this.currentYear, this.currentMonth);
               }
            },
            getPrevMonth: {
               value: function getPrevMonth() {

                  if(this._config.debug)
                     console.log('Call `getPrevMonth` method', this);

                  if (this.currentMonth == 0) {
                     this.currentMonth = 11;
                     this.currentYear = this.currentYear - 1;
                  } else {
                     this.currentMonth = this.currentMonth - 1;
                  }

                  this.showCurrent(this.currentYear, this.currentMonth);
               }
            },
            getNextMonth: {
               value: function getNextMonth() {

                  if(this._config.debug)
                     console.log('Call `getNextMonth` method', this);

                  if (this.currentMonth == 11) {
                     this.currentMonth = 0;
                     this.currentYear = this.currentYear + 1;
                  } else {
                     this.currentMonth = this.currentMonth + 1;
                  }

                  this.showCurrent(this.currentYear, this.currentMonth);
               }
            },
            setDate: {
               value: function setDate(newDate) {

                   console.log(newDate);

                  if(this._config.debug)
                     console.log('Call `setDate` method', this);

                  var $input = $(this._$element).find('#' + this._inputId);
                  var newInputDate = new Date(newDate);
                  var value = this.zeroFormatting(newInputDate.getUTCFullYear()) + '-' + this.zeroFormatting((newInputDate.getUTCMonth() + 1)) + '-' + this.zeroFormatting(newInputDate.getUTCDate()) + ' ' + this.zeroFormatting(newInputDate.getUTCHours()) + ':' + this.zeroFormatting(newInputDate.getUTCMinutes()) + ':' + this.zeroFormatting(newInputDate.getUTCSeconds());
                  $input.val(value);
               }
            }, setTime: {
                 value: function setTime() {
                     var newDate = this.zeroFormatting(this.currentYear) + '-' + this.zeroFormatting(parseInt(this.currentMonth) + 1) + '-' + this.zeroFormatting(this.currentDay);

                     if(this.currentHour && this.currentMinute && this.currentSecond)
                         newDate += 'T' + this.zeroFormatting(this.currentHour) + ':' + this.zeroFormatting(this.currentMinute) + ':' + this.zeroFormatting(this.currentSecond);

                     this.setDate(newDate);
                 }
            }
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