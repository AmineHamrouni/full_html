        $(document).ready(function() {

            var lbldiffDate = $('.diffDate');

            var line = $('.form-group');

            line.hover(
                function() {
                    $(this).siblings('.form-group').css({
                        "opacity": ".5"
                    });
                },
                function() {
                    $(this).siblings('.form-group').css({
                        "opacity": "1"
                    });
                }
            );

            $('select').select2({
                dir: "rtl"
            });

            /*Date Picker*/
            $('.startDate,.endDate').calendarsPicker({
                calendar: $.calendars.instance('ummalqura'),
                formatDate: 'dd/mm/yyyy',
                isRTL: true,
                commandsAsDateFormat: true,
                prevText: '< M',
                todayText: 'M y',
                nextText: 'M >',
                localNumbers: true,
                onSelect: customRange,
                showTrigger: '#calImg'
            });

            function customRange(dates) {
                if (this.class == 'startPicker') {
                    $('.endDate').datepick('option', 'minDate', dates[0] || null);
                } else {
                    $('.startDate').datepick('option', 'maxDate', dates[0] || null);
                    var a = $('.endDate');
                    var b = $('.startDate');

                    a = moment(a.val());
                    b = moment(b.val());
                    var diff = a.diff(b, 'days');
                    lbldiffDate.val(diff);
                    console.log(diff);

                }
            }

            $('[name="description"]').keypress(function(e) {
                var tval = $('.task-description').val(),
                    tlength = tval.length,
                    set = 700,
                    remain = parseInt(set - tlength);
                $('[name="description"]').siblings(".help-block").html('<strong>عدد الحروف المتبقية: </strong>' + remain);
                if (remain <= 0 && e.which !== 0 && e.charCode !== 0) {
                    $('[name="description"]').val((tval).substring(0, tlength - 1))
                }
            })
        });
