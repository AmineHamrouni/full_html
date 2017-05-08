/**
 * Created by hamrouni on 08/05/17.
 */
$(document).ready(function() {
    // Select tool
    $('select').select2({
        dir: "rtl"
    });

    // Instruction Slider
    $('.instructions').slick({
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'ease'
    });

    var start_mn, start_hr, start_time, end_mn, end_hr, end_time, lblDuration, duration, submitBtn,loginTime, loginTimeMn, loginTimeHr;

    loginTime = $(".loginTime").text();
    loginTimeHr = loginTime.slice(0, 2);
    loginTimeMn = loginTime.slice(3, 5);

    var listMn = [];
    var listHr = [];

    start_mn = $(".start-mn");
    start_hr = $(".start-hr");
    end_hr = $(".end-hr");
    end_mn = $(".end-mn");

    lblDuration = $(".duration");
    submitBtn = $(".submit");

    // make the select start equal to the login time
    for (var i = loginTimeMn; i < 60; i++) {
        listMn.push({ id: i, text: i });
    }

    for (var i = loginTimeHr; i < 15; i++) {
        listHr.push({ id: i, text: i });
    }

    // Load Data to the time selector
    start_mn.select2({
        data: listMn,
        dir: "rtl"
    });

    start_hr.select2({
        data: listHr,
        dir: "rtl"
    });

    end_mn.select2({
        data: listMn,
        dir: "rtl"
    });

    end_hr.select2({
        data: listHr,
        dir: "rtl"
    });

    //Calculate the duration on select change
    $( "select" ).change(function() {
        start_time = parseInt(start_mn.val()) + parseInt(start_hr.val()) * 60;
        end_time = parseInt(end_mn.val()) + parseInt(end_hr.val()) * 60;
        duration = end_time - start_time;

        if ( duration <= 0 ) {
            lblDuration.val("اختر توقيت مناسب");
            submitBtn.attr("disabled", true);
            submitBtn.text("تثبت من المعطيات");
        } else {
            lblDuration.val(duration + ' دق ' );
            submitBtn.attr("disabled", false);
            submitBtn.text("تأكيد إنسحاب بـ " + duration + " دقيقة");
        }

    });

});