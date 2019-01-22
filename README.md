# Bootstrap DatePicker
Date and time picker plugin for Bootstrap framework

# Installation

    $ npm install bootstrap-datepicker-plugin
    $ bower install bootstrap-datepicker-plugin
    $ yarn add bootstrap-datepicker-plugin
    $ composer require bootstrap-datepicker-plugin

# Usage example

For example use the input-group:

    <div class="form-group">
        <label class="control-label">Datetime:</label>
        <div id="datepicker" class="input-group">
            <input type="text" class="form-control" name="some-datetime" value="2019-01-21 22:06:54">
            <span class="input-group-btn">
                <button type="button" class="btn btn-default">
                    <span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                </button>
            </span>
        </div>
    </div>

... and init from script:

    <script type="text/javascript">
        $(document).ready(function () {
            $('#datepicker').datepicker({
                format: 'mm/dd/yyyy'
            });
        });
    </script>

# Options

| Name          | Type     | Default         | Description                         |
| ------------- |:--------:| --------------- | ----------------------------------- |
| format        | string   | 'mm/dd/yyyy'    | Default format of date/time.        |
| className     | string   | '.datepicker'   | Class name of input group.          |
| input         | string   | '.form-control' | Selector or jQuery object of input. |
| toggle        | string   | '.input-group-btn > button' | Selector of datepicker popover toggle. |
| template      | string   | `<div class="popover popover-datepicker" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>` |
| daysStrings   | array    | [{'short': 'Mon', 'full': 'Monday'}, ...] | Days of week, starting on Monday. |
| monthsStrings | array    | [{'short': 'Jan', 'full': 'January'}, ...] | Months, starting on January. |
| debug         | boolean  | `false`         | Flag if need debug in console log. |


# Methods

| Name          | Type     | Description                         |
| ------------- |:--------:| ----------------------------------- |
| onShow        | function | The function that is called when the datepicker popover is ready to be displayed. |
| onShown       | function | The function that is called when the datepicker popover is displayed. |
| onHide        | function | The function that is called when datepicker popover to prepare for hiding. |
| onHidden      | function | The function that is called when the datepicker popover is hidden. |
| onGetPrev     | function | The function that is called when you select the previous month or year. |
| onGetNext     | function | The function that is called when you select the next month or year. |
| onSetValue    | function | The function that is called when the date is selected. Sets new date value to input. |