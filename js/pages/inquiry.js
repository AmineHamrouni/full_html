$(document).ready(function () {
    //Form Steps
    //Form Init
    var form = $("#vacationSteps");
    form.steps({
        enableCancelButton: false,
        enableFinishButton: false,
        transitionEffect: 3,
        labels: {
            cancel: "إلغاء",
            current: "المرحلة الحالية:",
            pagination: "Pagination",
            finish: "إنهاء",
            next: "التالي",
            previous: "السابق",
            loading: "تحميل ..."
        }
    });
    //Report
    /////Variabes
    var repType, repStartDate, repEndDate, repDuration, repCause, repEmployee;

    /////Assign to spans
    repType = $('#repType');
    repStartDate = $('#repStartDate');
    repEndDate = $('#repEndDate');
    repDuration = $('#repDuration');
    repCause = $('#repCause');
    repEmployee = $('#repEmployee');

    //Select2 init
    $(".select2").select2({
        dir: "rtl"
    });

    //Vacation Object
    var vacation = {
        totalCredit: 90,
        inProgressCredit: 12,
        oldCredit: 15,
        newCredit: 0,
        restCredit: function () {
            return this.totalCredit - this.oldCredit - this.newCredit - this.inProgressCredit;
        },
        sourceCredit: 0
    };

    //Init Vacation Credit Chart
    var vacationChart = $("#vacationChart");

    vacationChart.sparkline([
        vacation.newCredit,
        vacation.restCredit(),
        vacation.oldCredit,
        vacation.inProgressCredit
    ], {
        type: 'pie',
        height: '150px',
        sliceColors: ['#23c6c8', '#e8ecff', '#f8ac59', '#1c84c6', '#ED5565']
    });

    // on hanging vacationType:
    //// 1 - change the max/min number of days
    /// 2 - change the help message
    //// 3 - update the labels containg the value of the vacation parametre
    /// 4 - update vacation chart

    var helpMsg, elVacationType, maxVal, minVal, initValD, labelMsg;

    var vacationStart = $("#vacationStart");
    var vacationEnd = $("#vacationEnd");
    var vacationDuration = $("#vacationDuration");
    var vacationType = $("#vacationType");

    var lblAnnualCredit = $("#lblAnnualCredit");
    var lblRestCredit = $("#lblRestCredit");
    var lblProgressVacation = $("#lblProgressVacation");
    var lblNewVacation = $("#lblNewVacation");

    lblAnnualCredit.text(vacation.totalCredit);
    lblRestCredit.text(vacation.restCredit());
    lblProgressVacation.text(vacation.inProgressCredit);
    lblNewVacation.text(vacation.newCredit);

    //On Vacation Type change
    vacationType.change(function () {

        //the first type اجازة عادية
        if (vacationType.val() == 1) {
            vacationStart.prop('disabled', false);
            vacationEnd.prop('disabled', false);
            $('#vacationStart, #vacationEnd')
                .calendarsPicker({
                    onSelect: customRange,
                    calendar: $.calendars.instance('ummalqura'),
                    minDate: 0,
                    isRTL: true,
                    commandsAsDateFormat: true,
                    prevText: '< M',
                    todayText: 'M y',
                    nextText: 'M >',
                    localNumbers: true
                }).noWeekends;

            $('#vacationEnd').calendarsPicker({
                onClose: function () {
                    var a = moment(vacationEnd.val());
                    var b = moment(vacationStart.val());
                    var d = a.diff(b, 'days') + 1;
                    vacationDuration.val(d || "أدخل الفترة المناسبة");
                }
            });
            
            var calendar = $.calendars.instance('ummalqura'); 
            var date = calendar.parseDate('mm/dd/yyyy', $('#vacationStart').val()); 
//            var amount = parseInt(1, 10); 
//            var period = 'd'; 
            date.add(10, d);
            $('#vacationEnd').val(calendar.formatDate('mm/dd/yyyy', date)); 


            //Initialize the start/end date values
            function customRange(dates) {
                if (this.id == 'vacationStart') {
                    vacationEnd.calendarsPicker('option', 'minDate', dates[0] || null);
                } else {
                    vacationStart.calendarsPicker('option', 'maxDate', dates[0] || null);
                }
            }
            initValD = 5;
            minVal = 5;
            maxVal = vacation.restCredit();
            labelMsg = 'اجازة عادية';
        }

        //the second type اجازة اضطرارية
        if (vacationType.val() == 2) {
            vacationStart.prop('disabled', false);
            vacationEnd.prop('disabled', false);
            $('#vacationStart, #vacationEnd').calendarsPicker();

            vacationDuration.val("1");
            initValD = 1;
            minVal = 1;
            maxVal = 5;
        }

        //if there is no selection
        if (vacationType.val() == 0) {
            vacationStart.prop('disabled', true);
            vacationEnd.prop('disabled', true);
            initValD = 0;
            minVal = 0;
            maxVal = 0;
        }


        //Init the calendar Picker on Umm Al Qura calendar
        $('#vacationStart, #vacationEnd')
            .calendarsPicker({
                onSelect: customRange,
                calendar: $.calendars.instance('ummalqura'),
                minDate: 0,
                isRTL: true,
                commandsAsDateFormat: true,
                prevText: '< M',
                todayText: 'M y',
                nextText: 'M >',
                localNumbers: true,
                onClose: function () {
                    var a = moment(vacationEnd.val());
                    var b = moment(vacationStart.val()).add(5, 'days');
                    var d = a.diff(b, 'days') + 1;
                    console.log(d);
                    //                    vacationDuration.val(d);
                }
            }).noWeekends;

        //Initialize the start/end date values
        function customRange(dates) {
            if (this.id == 'vacationStart') {
                vacationEnd.calendarsPicker('option', 'minDate', dates[0] || null);
            } else {
                vacationStart.calendarsPicker('option', 'maxDate', dates[0] || null);
            }
        }

        repStartDate.text(vacationStart.val());


        //Update the label containing the new vacation
        lblNewVacation.html(vacationDuration.val());

        //Update the value of 'newCredit' in 'vacation'
        vacation.newCredit = vacationDuration.val();

        //Init Vacation Credit Chart
        vacationChart.sparkline([
            vacation.newCredit,
            vacation.restCredit(),
            vacation.oldCredit,
            vacation.inProgressCredit
        ], {
            type: 'pie',
            height: '150px',
            sliceColors: ['#23c6c8', '#e8ecff', '#f8ac59', '#1c84c6', '#ED5565']
        });

        //Update the vacation chart
        vacationDuration.change(function () {
            lblNewVacation.html(vacationDuration.val());
            lblRestCredit =
                vacation.newCredit = vacationDuration.val();

            //Init Vacation Credit Chart
            $("#vacationChart").sparkline([
                vacation.newCredit,
                vacation.restCredit(),
                vacation.oldCredit,
                vacation.inProgressCredit
            ], {
                type: 'pie',
                height: '150px',
                sliceColors: ['#23c6c8', '#e8ecff', '#f8ac59', '#1c84c6', '#ED5565']
            });

        });



    });
    //End of // On Vacation Type change

    /*\
    ***
    ***
    ***
    \*/

    //*****Switch Button for the credit type
    var typeSwitch = document.querySelector('.typeSwitch');

    var switchery_3 = new Switchery(typeSwitch, {
        color: 'rgb(27, 175, 153)',
        secondaryColor: 'rgb(27, 175, 153)',
        jackColor: '#fcf45e',
        jackSecondaryColor: '#c8ff77',
        size: 'small'
    });
    //*******End Switch Button for the credit type

    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox__square--green',
        radioClass: 'iradio__square--green'
    });

    $(".i-checks__label").click(function () {
        $('.checked').parent().addClass('i-checks__label--active');
        $('.iradio__square--green').not('.checked').parent().removeClass('i-checks__label--active');
    });

    $('.iradio__square--green').click(function () {
        this.parent().addClass('i-checks__label--active');
    });

    //Print Report

    $('#printBtn').click(function () {
        $("#printReport").print({
            globalStyles: true,
            mediaPrint: false,
            stylesheet: null,
            noPrintSelector: ".no-print",
            iframe: true,
            append: null,
            prepend: null,
            manuallyCopyFormValues: true,
            deferred: $.Deferred(),
            timeout: 750,
            title: null,
            doctype: '<!doctype html>'
        });
    });

    $('#printInProgressBtn').click(function () {
        $("#printInProgress").print({
            globalStyles: true,
            mediaPrint: false,
            stylesheet: null,
            noPrintSelector: ".no-print",
            iframe: true,
            append: null,
            prepend: null,
            manuallyCopyFormValues: true,
            deferred: $.Deferred(),
            timeout: 750,
            title: null,
            doctype: '<!doctype html>'
        });
    });

});