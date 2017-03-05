$(document).ready(function () {
    //Form Init
    var form = $("#vacationSteps");
    form.steps();
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

    //Vacation Labels
    var lblRestCredit = document.getElementById("lblRestCredit");
    var lblAnnualCredit = document.getElementById("lblAnnualCredit");
    var lblProgressVacation = document.getElementById("lblProgressVacation");

    lblAnnualCredit.innerHTML = vacation.totalCredit;
    lblRestCredit.innerHTML = vacation.restCredit();
    lblProgressVacation.innerHTML = vacation.inProgressCredit;

    //TouchSpin number of days
    var elvacationDuration = $("input[name='vacationDuration']"),
        lblNewVacation;
    // Init the TouchSpin element = disabled
    elvacationDuration.prop("disabled", true);

    //Init the TouchSpin element
    elvacationDuration.TouchSpin({
        verticalbuttons: true,
        initval: 0,
        min: 0,
        max: 0,
        step: 1,
        decimals: 0,
        boostat: 5,
        maxboostedstep: 10,
        postfix: 'يوم'
    });

    lblNewVacation = $('#lblNewVacation');
    lblNewVacation.html($('#vacationDuration').val());

    // on hanging vacationType:
    //// 1 - change the max/min number of days
    /// 2 - change the help message
    //// 3 - update the labels containg the value of the vacation parametre
    /// 4 - update vacation chart

    var helpMsg, elVacationType, maxVal, minVal, initValD, elVacationStart, labelMsg;

    elVacationStart = $('#vacationStart');

    $("#vacationType").change(function () {

        //Get the value of the vacation type
        elVacationType = $("#vacationType").val();

        //the first type اجازة عادية
        if (elVacationType == 1) {
            helpMsg = 'عدد الأيام لا يمكن أن يكون أقل من 5 أيام';
            elvacationDuration.prop("disabled", false);
            initValD = 5;
            minVal = 5;
            maxVal = vacation.restCredit();
            labelMsg = 'اجازة عادية';
        }

        //the second type اجازة اضطرارية
        if (elVacationType == 2) {
            helpMsg = 'عدد الأيام لا يمكن أن يكون أكثر من 5 أيام';
            elvacationDuration.prop("disabled", false);
            elvacationDuration.val("1");
            initValD = 1;
            minVal = 1;
            maxVal = 5;
            labelMsg = 'اجازة اضطرارية';
        }

        //if there is no selection
        if (elVacationType == 0) {
            helpMsg = 'نرجو إختيار نوع الإجازة';
            elvacationDuration.prop("disabled", true);
            initValD = 0;
            minVal = 0;
            maxVal = 0;
        }

        //Update the touchspin
        elvacationDuration.trigger("touchspin.updatesettings", {
            max: maxVal,
            min: minVal,
            initval: initValD
        });

        //Update the label containing the new vacation
        lblNewVacation.html($('#vacationDuration').val());

        //Update the value of 'newCredit' in 'vacation'
        vacation.newCredit = $('#vacationDuration').val();

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

        /////Get values
        repType.text(labelMsg);

        //Update the vacation chart
        $("input[name='vacationDuration']").change(function () {
            lblNewVacation.html($('#vacationDuration').val());
            lblRestCredit =
                vacation.newCredit = $('#vacationDuration').val();

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

    //    var clickCheckbox = document.querySelector('.typeSwitch');
    //
    //    clickCheckbox.addEventListener('change', function () {
    //        if (clickCheckbox.checked) {
    //            vacation.sourceCredit = true;
    //            console.log(vacation.sourceCredit);
    //        } else {
    //            vacation.sourceCredit = false;
    //            console.log(vacation.sourceCredit);
    //        }
    //    });

    //*******End Switch Button for the credit type

    $('#vacationStart').calendarsPicker({
        calendar: $.calendars.instance('ummalqura'),
        minDate: 0,
        yearRange: '1',
        isRTL: true
    });

    $('#vacationStart').change(function () {
        var vacationStart = $("#vacationStart").val();
        $("#vacationEnd").val(vacationStart);
        console.log(vacationStart);
    });


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