$(document).ready(function () {
<<<<<<< HEAD
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
            return true;
        },
        
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
=======
  //Form Steps
  //Form Init
  var form = $("#vacationSteps");
  form.steps({
    enableCancelButton: false,
    enableFinishButton: false,
    transitionEffect: 3,
    startIndex: 0,
    saveState: true,
//    enableFinishButton: true,
//    showFinishButtonAlways: false,
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
      var type = $( "#vacationType" ).val();
      if (type == 0) {
        return false;
      } else {
        return true;
      }
      var start = $('#vacationStart').val();
      if ($(start).val()) {
        alert('11111');
      } else {
        alert('0000');
      }

    },
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
>>>>>>> origin/master
        vacation.restCredit(),
        vacation.oldCredit,
        vacation.inProgressCredit
    ], {
<<<<<<< HEAD
        type: 'pie',
        height: '150px',
        sliceColors: ['#23c6c8', '#f8ac59', '#1c84c6', '#e8ecff', '#ED5565']
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
            
            vacationStart.val('');
            vacationEnd.val('');
            vacationDuration.val('');

            $('#vacationStart,#vacationEnd').calendarsPicker({
                onSelect: customRange,
                onClose: function() {
                    repStartDate.text(vacationStart.val());
                    repEndDate.text(vacationEnd.val());
                },
                calendar: $.calendars.instance('ummalqura'),
                formatDate: 'dd/mm/yyyy',
                minDate: 0,
                isRTL: true,
                commandsAsDateFormat: true,
                prevText: '< M',
                todayText: 'M y',
                nextText: 'M >',
                localNumbers: true
            }).noWeekends;

            //Initialize the start/end date values
            function customRange(dates) {
                var difff = diffDays(vacationEnd, vacationStart);
                vacationStart.calendarsPicker('option', 'minDate', 1 || null);

                if (this.id == 'vacationStart') {
                    vacationEnd.calendarsPicker('option', 'minDate', dates[0] || null);
                    vacationEnd.val('');
                    vacationDuration.val('');
                } else {
                    
                    if (difff < 5) {
                        sweetAlert({
                            title: "عدد الايام أقل من 5 أيام!",
                            text: "في الاجازة العادية يجب أن تكون مدة الاجازة على الأقل 5 أيام!",
                            type: "error",
                            confirmButtonText: "موافق!"
                        });

                        vacationEnd.val('');
                        vacationDuration.val('عدد الايام أقل من 5 أيام');
                    } else {
                        vacationDuration.val(difff + ' أيام');
                        repDuration.text(difff + ' أيام');
                        vacationStart.calendarsPicker('option', 'maxDate', dates[0] || null);
                    }



                }

            }


        }

        //the second type اجازة اضطرارية
        if (vacationType.val() == 2) {
            vacationStart.prop('disabled', false);
            vacationEnd.prop('disabled', false);

            vacationStart.val('');
            
            vacationEnd.val('');
            vacationDuration.val('');
            
            $('#vacationStart,#vacationEnd').calendarsPicker({
                onSelect: customRange,
                onClose: function() {
                    repStartDate.text(vacationStart.val());
                    repEndDate.text(vacationEnd.val());
                },
                calendar: $.calendars.instance('ummalqura'),
                formatDate: 'dd/mm/yyyy',
                minDate: 1,
                maxDate: +365,
                isRTL: true,
                commandsAsDateFormat: true,
                prevText: '< M',
                todayText: 'M y',
                nextText: 'M >',
                localNumbers: true
            }).noWeekends;
            //Initialize the start/end date values
            function customRange(dates) {
                var difff = diffDays(vacationEnd, vacationStart);
                vacationStart.calendarsPicker('option', 'minDate', 1 || null);
                if (this.id == 'vacationStart') {
                    vacationEnd.calendarsPicker('option', 'minDate', dates[0] || null);
                    vacationEnd.val('');
                    vacationDuration.val('');
                } else {
                    if (difff > 5) {
                        sweetAlert({
                            title: "عدد الايام أكثر من 5 أيام!",
                            text: "في الاجازة الإضطرارية لا يجب أن تتجاوز مدة الاجازة 5 أيام!",
                            type: "error",
                            confirmButtonText: "موافق!"
                        });
                        vacationEnd.val('');
                        vacationDuration.val('عدد الايام أكثر من 5 أيام');
                    } else {
                        vacationDuration.val(difff + ' أيام');
                        repDuration.text(difff + ' أيام');
                        vacationStart.calendarsPicker('option', 'maxDate', dates[0] || null);
                    }
                }
            }
        }
        //if there is no selection
        if (vacationType.val() == 0) {
            vacationStart.prop('disabled', true);
            vacationEnd.prop('disabled', true);
        }

        function diffDays(end, start) {
            var date1 = new Date(start.val());
            var date2 = new Date(end.val());

            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

            return diffDays;
        }

        repType.text(vacationType.find(":selected").text());
=======
    type: 'pie',
    height: '150px',
    sliceColors: ['#23c6c8', '#f8ac59', '#1c84c6', '#e8ecff', '#ED5565']
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
>>>>>>> origin/master

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


      $('#vacationStart,#vacationEnd').calendarsPicker({
        onSelect: customRange,
        calendar: $.calendars.instance('ummalqura'),
        formatDate: 'dd/mm/yyyy',
        isRTL: true,
        commandsAsDateFormat: true,
        prevText: '< M',
        todayText: 'M y',
        nextText: 'M >',
        localNumbers: true
      }).noWeekends;

    }

    //the second type اجازة اضطرارية
    if (vacationType.val() == 2) {}

    //if there is no selection
    if (vacationType.val() == 0) {
      vacationStart.prop('disabled', true);
      vacationEnd.prop('disabled', true);
      initValD = 0;
      minVal = 0;
      maxVal = 0;
    }



    //Initialize the start/end date values
    function customRange(dates) {
      var difff = diffDays(vacationEnd, vacationStart);
      vacationStart.calendarsPicker('option', 'minDate', 1 || null);

      if (this.id == 'vacationStart') {
        vacationEnd.calendarsPicker('option', 'minDate', dates[0] || null);
        vacationEnd.val('');
        vacationDuration.val('');

        //                var calendar = $.calendars.instance('ummalqura'); 
        //                var date = calendar.parseDate('dd/mm/yyyy', $('#vacationStart').val()); 
        var amount = 5;
        var period = 'd';
        var date = vacationStart.add(amount, period);
        console.log(date.val());

      } else {
        vacationStart.calendarsPicker('option', 'maxDate', dates[0] || null);
        vacationDuration.val(difff);
      }

    }

    /*
     **
     **
     **
     **
     **/

    function diffDays(end, start) {
      var date1 = new Date(start.val());
      var date2 = new Date(end.val());

      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

//      console.log(date1);
//      console.log(date2);
//      console.log(timeDiff);
//      console.log(diffDays);

      return diffDays;
    }

    repStartDate.text(vacationStart.val());



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
  //*******End Switch Button for the credit type

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