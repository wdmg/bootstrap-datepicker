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
            $('#datepicker').datepicker();
        });
    </script>