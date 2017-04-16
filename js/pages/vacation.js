$(document).ready(function () {
    $(document).keydown(function (e) {

      if (e.ctrlKey && e.keyCode == 13) {
        alert('Ctrl-Enter pressed');
      }
    });    
    var required = $('.required').val();
    
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
        },
        onStepChanging: function (event, currentIndex, newIndex) {
            var elVacationStart = $('.vacationStart');

            if (!elVacationStart.val()) {
                elVacationStart.closest('.form-group').addClass('has-error');
                elVacationStart.siblings(".help-block").text('يجب إدخال تاريخ');
                return false;
            } else {
                elVacationStart.closest('.form-group').removeClass('has-error');
                return true;
            }
            var eltotalVacation = $('.totalVacation');

            if (!eltotalVacation.val()) {
                elVacationStart.closest('.form-group').addClass('has-error');
                elVacationStart.siblings(".help-block").text('يجب إدخال تاريخ');
                return false;
            } else {
                eltotalVacation.closest('.form-group').removeClass('has-error');
                return true;
            }
        }

    });
    
    /*iCheck*/
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox__square--green',
        radioClass: 'iradio__square--green',
    });
    
    $('.select2').select2({
        dir: "rtl"
    });


    /* Knob */
    var maxOld, maxNew, elOld, elNew, totalVacation, elTotalVacation, elVacationStart, maxTotal, minTotal;
    var repType, repStartDate, repOldCredit, repNewCredit, repTotal, repEmployee;

    elOld = $('.oldCredit');
    elNew = $('.newCredit');
    elVacationStart = $('.vacationStart');

    elTotalVacation = $('.totalVacation');

    totalVacation = 0;

    $("input[type=radio]").on('ifChecked', function (event) {
        elVacationStart.prop('readonly', false);
        
        /*Date Picker*/
        $('.vacationStart').calendarsPicker({
            calendar: $.calendars.instance('ummalqura'),
            formatDate: 'dd/mm/yyyy',
            isRTL: true,
            minDate: 1,
            commandsAsDateFormat: true,
            prevText: '< M',
            todayText: 'M y',
            nextText: 'M >',
            localNumbers: true,
            onhange: function() {
                repStartDate = this.datepick('getDate');
                elNew.attr("readonly", false);
                elOld.attr("readonly", false);
            }
        }).noWeekends;


        if (this.value == '0000') {
            minTotal = 5;
            maxTotal = 50;
            $('.knob').val(0).trigger('change');
        }
        if (this.value == '1111') {
            minTotal = 0;
            maxTotal = 5;
            $('.knob').val(0).trigger('change');
        }
    });
    
    $("[name$='RbTypeVac']").change(function(){
        repType = $("[name$='RbTypeVac']:checked").val();
        $('.repType').text(repType);
    });    
    
    $("[id$='ddlReplaceManager']").change(function(){
        var e = $("[id$='ddlReplaceManager']:selected").val();
    });
    
    $(".select2").change(function(){
        var c = $("[]:checked").val();
        $('.repEmployee').text(repType);
    });

    maxNew = 10;
    maxOld = 100;

    elOld.knob({
        'min': 0,
        'max': maxOld,
        'release': function (v) {
            totalCredit(elNew, v);
            verifyTotal();
            repOldCredit = v;
            $('.repOldCredit').text(repOldCredit);
        }
    });

    elNew.knob({
        'min': 0,
        'max': maxNew,
        'release': function (v) {
            totalCredit(elOld, v);
            verifyTotal();
            repNewCredit = v;
            $('.repNewCredit').text(repNewCredit);
        }
    });

    function totalCredit(val, v) {
        totalVacation = parseInt(val.val()) + v;
        $('.repTotal').text(totalVacation);
        return totalVacation;
    }

    function verifyTotal() {
        if (totalVacation > maxTotal) {
            sweetAlert({
                title: "خطأ",
                text: "لقد تجاوزت الحد المسموح به لهذه السنة!",
                type: "warning",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "رجوع!",
            });
            elTotalVacation.val('');
            elTotalVacation.attr('placeholder', 'إختر الرصيد بدقة');
            $('.knob').val(0).trigger('change');
        } else {
            countTotalVacation();
        }
    }
    
    function countTotalVacation() {
        if (totalVacation == 0) {
            elTotalVacation.val('إختر الرصيد..');
        } else if (totalVacation == 1) {
            elTotalVacation.val('يوم واحد');
        } else if (totalVacation == 2) {
            elTotalVacation.val('يومان');
        } else {
            elTotalVacation.val(totalVacation + ' أيام');
        }
    }

    $(".knob").parent().addClass('flexCenter');
    /* End Knob */


    // Instance the tour
    var tour = new Tour({
        steps: [{

                element: "#step1",
                title: "نوع الإجازة",
                content: "إختر نوع الإجازة عادية/إضطرارية.",
                placement: "top"
                },
            {
                element: "#step2",
                title: "بداية الإجازة",
                content: "إختر تاريخ بداية الإجازة.",
                placement: "top",
                },
            {
                element: "#step3",
                title: "إختر الرصيد",
                content: "إختر الرصيد.",
                placement: "top"
                },
            {
                element: "#step4",
                title: "مجموع أيام الإجازة",
                content: "تثبت من مجموع أيام الإجازة. </br>dedede",
                placement: "top"
                },
            ],
        template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3><div class='popover-content'></div><div class='popover-navigation'><button class='btn btn-default' data-role='prev'>« السابق</button><span data-role='separator'>|</span><button class='btn btn-default' data-role='next'>التالي »</button></div><button class='btn btn-default' data-role='end'>إنهاء</button></div>",
    });

    // Initialize the tour
    tour.init();
    tour.start();

    $('.startTour').click(function () {
        tour.restart();

        // Start the tour
        // 
    })
    
    var line = $('.form-group');

    line.hover(
        function () {
            //        $(this).siblings('.vacationAdmin__line').find('.btn').hide();
            $(this).siblings('.form-group').css({
                "opacity": ".5"
            });

        },
        function () {
            $(this).siblings('.form-group').css({
                "opacity": "1"
            });
        }
    );
    
});