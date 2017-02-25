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
      },
      vacationDuration: {
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

  var helpMsg, elVacationType, maxVal, minVal, initValD, elVacationStart;
  
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
    }

    //the second type اجازة اضطرارية
    if (elVacationType == 2) {
      helpMsg = 'عدد الأيام لا يمكن أن يكون أكثر من 5 أيام';
      elvacationDuration.prop("disabled", false);
      elvacationDuration.val("1");
      initValD = 1;
      minVal = 1;
      maxVal = 5;
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

    //Update the vacation chart
    $("input[name='vacationDuration']").change(function () {
      lblNewVacation.html($('#vacationDuration').val());
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

  var clickCheckbox = document.querySelector('.typeSwitch');

  clickCheckbox.addEventListener('change', function () {
    if (clickCheckbox.checked) {
      vacation.sourceCredit = true;
      console.log(vacation.sourceCredit);
    } else {
      vacation.sourceCredit = false;
      console.log(vacation.sourceCredit);
    }
  });

  //*******End Switch Button for the credit type

  $('#vacationStart').calendarsPicker({
    calendar: $.calendars.instance('ummalqura'),
    minDate: 0,
    isRTL: true
  });
  
  
  
  $('#vacationStart').change(function () {
    var vacationStart = $("#vacationStart").val();
    $("#vacationEnd").val(vacationStart);
    console.log(vacationStart);

  });
});