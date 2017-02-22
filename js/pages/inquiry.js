$(document).ready(function () {
    //Form Init
    $("#form").steps({
        bodyTag: "fieldset",
        errorLabelContainer: "#messageBox",
        /* Labels */
        labels: {
            cancel: "إلغاء",
            current: "المرحلة الحالية:",
            pagination: "Pagination",
            finish: "إنهاء",
            next: "التالي",
            previous: "السابق",
            loading: "تحميل ..."
        },
        onStepChanging: function (event, currentIndex, newIndex) {
            // Always allow going backward even if the current step contains invalid fields!
            if (currentIndex > newIndex) {
                return true;
            }

            // Forbid suppressing "Warning" step if the user is to young
            if (newIndex === 3 && Number($("#age").val()) < 18) {
                return false;
            }

            var form = $(this);

            // Clean up if user went backward before
            if (currentIndex < newIndex) {
                // To remove error styles
                $(".body:eq(" + newIndex + ") label.error", form).remove();
                $(".body:eq(" + newIndex + ") .error", form).removeClass("error");
            }

            // Disable validation on fields that are disabled or hidden.
            form.validate().settings.ignore = ":disabled,:hidden";

            // Start validation; Prevent going forward if false
            return form.valid();
        },
        onStepChanged: function (event, currentIndex, priorIndex) {
            // Suppress (skip) "Warning" step if the user is old enough.
            if (currentIndex === 2 && Number($("#age").val()) >= 18) {
                $(this).steps("next");
            }

            // Suppress (skip) "Warning" step if the user is old enough and wants to the previous step.
            if (currentIndex === 2 && priorIndex === 3) {
                $(this).steps("previous");
            }
        },
        onFinishing: function (event, currentIndex) {
            var form = $(this);

            // Disable validation on fields that are disabled.
            // At this point it's recommended to do an overall check (mean ignoring only disabled fields)
            form.validate().settings.ignore = ":disabled";

            // Start validation; Prevent form submission if false
            return form.valid();
        },
        onFinished: function (event, currentIndex) {
            var form = $(this);

            // Submit form input
            form.submit();
        }
    }).validate({
        rules: {
            confirm: {
                equalTo: "#password"
            },
            vacationType: {
                required: true
            },
            vacationStart: {
                date: true,
                required: true
            },
            vacationEnd: {
                date: true,
                required: true
            }
        },
        messages: {
            vacationType: {
                required: 'أدخل نوع الإجازة!'
            },
            vacationStart: {
                date: 'أدخل تاريخ مناسب',
                required: 'هذا الحقل ضروري'
            },
            vacationEnd: {
                date: 'أدخل تاريخ مناسب',
                required: 'هذا الحقل ضروري'
            }
        }
    });

    //Select2 init
    $(".select2").select2({
        dir: "rtl"
    });

    //Vacation Object
    var vacation = {
        totalCredit: 120,
        inProgressCredit: 10,
        oldCredit: 20,
        newCredit: 0,
        restCredit: function () {
            return this.totalCredit - this.oldCredit - this.newCredit - this.inProgressCredit;
        },
        type: 0,
        startDate: 0,
        endDate: 0
    };

    var elVacationStart = document.getElementById("vacationStart");
    var elVacationEnd = document.getElementById("vacationEnd");

    vacation.startDate = elVacationStart.value;
    vacation.endDate = elVacationEnd.value;

    //Init Vacation Credit Chart
    $("#vacationChart").sparkline([vacation.restCredit(), vacation.oldCredit, vacation.inProgressCredit, vacation.newCredit], {
        type: 'pie',
        height: '150px',
        sliceColors: ['#e8ecff', '#23c6c8', '#1c84c6', '#f8ac59', '#ED5565']
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

    elvacationDuration.prop("disabled", true);

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
    // 1 - change the max/min number of days
    // 2 - change the help message

    var helpMsg, elVacationType, maxVal, minVal, initValD;

    $("#vacationType").change(function () {

        elVacationType = $("#vacationType").val();

        if (elVacationType == 1) {
            helpMsg = 'عدد الأيام لا يمكن أن يكون أقل من 5 أيام';
            elvacationDuration.prop("disabled", false);
            initValD = 5;
            minVal = 5;
            maxVal = 36;
        }

        if (elVacationType == 2) {
            helpMsg = 'عدد الأيام لا يمكن أن يكون أكثر من 5 أيام';
            elvacationDuration.prop("disabled", false);
            initValD = 1;
            minVal = 1;
            maxVal = 5;
        }

        if (elVacationType == 0) {
            helpMsg = 'نرجو إختيار نوع الإجازة';
            $("input[name='vacationDuration']").show().prop("disabled", true);
            initValD = 0;
            minVal = 0;
            maxVal = 0;
        }

        elvacationDuration.trigger("touchspin.updatesettings", {
            max: maxVal,
            min: minVal,
            initval: initValD
        });

        lblNewVacation.html($('#vacationDuration').val());
        vacation.newCredit = $('#vacationDuration').val();
        
        //Init Vacation Credit Chart
        $("#vacationChart").sparkline([vacation.restCredit(), vacation.oldCredit, vacation.inProgressCredit, vacation.newCredit], {
            type: 'pie',
            height: '150px',
            sliceColors: ['#e8ecff', '#23c6c8', '#1c84c6', '#f8ac59', '#ED5565']
        });

        $("input[name='vacationDuration']").change(function () {
            lblNewVacation.html($('#vacationDuration').val());
            vacation.newCredit = $('#vacationDuration').val();
            console.log(vacation.newCredit);
            //Init Vacation Credit Chart
            $("#vacationChart").sparkline([vacation.restCredit(), vacation.oldCredit, vacation.inProgressCredit, vacation.newCredit], {
                type: 'pie',
                height: '150px',
                sliceColors: ['#e8ecff', '#23c6c8', '#1c84c6', '#f8ac59', '#ED5565']
            });

        });



    });


});