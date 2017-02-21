$(document).ready(function () {

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

    //Vacation Credit Chart

    //Select2 init
    $(".select2").select2({
        dir: "rtl"
    });

    function progressBar(total, actual) {

        var reste, widthBar;

        reste = total - actual;
        widthBar = reste / widthBar * 100;

        return widthBar;
    }

    var vacation = {
        oldCredit: 120,
        newCredit: 45,
        annualCredit: 36,
        totalCredit: function () {
            return this.oldCredit + this.newCredit;
        },
        type: 0,
        startDate: 0,
        endDate: 0
    };
    
    var elVacationStart = document.getElementById("vacationStart");
    
    vacatione.startDate = elVacationStart.value;

    //Vacation Credit Chart
    $("#vacationChart").sparkline([vacation.oldCredit, vacation.newCredit], {
        type: 'pie',
        height: '150px',
        sliceColors: ['#23c6c8', '#1c84c6', '#e4f0fb']
    });

    //Vacation Credit Chart Labels
    var lblNewCredit = document.getElementById("lblNewCredit");
    var lblOldCredit = document.getElementById("lblOldCredit");
    
    lblOldCredit.innerHTML = vacation.oldCredit;
    lblNewCredit.innerHTML = vacation.newCredit;
    
    //TouchSpin number of days
    $("input[name='demo_vertical2']").TouchSpin({
        initval: 5,
        min: 5,
        max: 36,
        step: 1,
        decimals: 0,
        boostat: 5,
        maxboostedstep: 10,
        postfix: 'يوم'
    });
    
    //report
    var elReport = document.getElementById("report");
    
    elReport.innerHTML = "<p>" + vacation.
    
});