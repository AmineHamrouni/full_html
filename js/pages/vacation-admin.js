$(document).ready(function () {

    var line = $('.vacationAdmin__line'),
        refuseMsg = $('.refuse__msg').hide(),
        refuse = $('.refuse'),
        confirmRefuse = $('.confirmRefuse'),
        closeConfirmRefuse = $('.closeConfirmRefuse'),
        accept = $('.accept');

    line.hover(function () {
//        $(this).siblings('.vacationAdmin__line').find('.btn').hide();
        $(this).siblings('.vacationAdmin__line').css({
            "opacity": ".5",
        });
                
    }, function () {
//        $(this).siblings('.vacationAdmin__line').find('.btn').show();
        $(this).siblings('.vacationAdmin__line').css({
            "opacity": "1",
        });
        
    });

    refuse.click(function () {
        $(this).parents('.vacationAdmin__line').children('.refuse__msg').fadeToggle("slow", "linear");
        confirmRefuse.click(function () {
            swal({
                title: "تم رفض الإجازة",
                text: "تم الرفض!",
                type: "success",
                confirmButtonText: "رجوع"
            });
        });
    });
    
    accept.click(function () {
        refuseMsg.fadeOut(200);
        // swal("تم القبول", "تم قبول الإجازة!", "success");
        swal({
            title: "تم قبول الإجازة",
            text: "تم القبول",
            type: "success",
            confirmButtonText: "رجوع!",
            confirmButtonColor: "#1ab394!"
        });
    });
    
    closeConfirmRefuse.click(function () {
        refuseMsg.fadeOut(200);
    });
    
});