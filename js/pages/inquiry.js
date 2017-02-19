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
//        errorElement: "em",
//        success: function (label) {
//            label.text("ok!").parent().addClass("has-success");
//        },
//        error: function (label) {
//            label.text("dwdwdwdwdw!").parent().addClass("has-error");
//        },
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

//    $(".selector2").validate({
//        success: function (label) {
//            label.text("ok!").parent().addClass("has-success");
//        },
//        error: function (label) {
//            label.text("ok!").parent().addClass("has-error");
//        },
//        rules: {
//            // at least 15€ when bonus material is included
//            pay_what_you_want: {
//                required: true
//                min: {
//                    // min needs a parameter passed to it
//                    param: 15,
//                    depends: function (element) {
//                        return $("#bonus-material").is(":checked");
//                    }
//                }
//            }
//        }
//    });

    //Vacation Credit

    $("#sparkline7").sparkline([52, 12, 44], {
        type: 'pie',
        height: '150px',
        sliceColors: ['#1ab394', '#b3b3b3', '#e4f0fb']
    });

    $(".select2").select2({
        dir: "rtl"
    });

});