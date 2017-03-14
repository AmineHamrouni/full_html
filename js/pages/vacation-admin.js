$(document).ready(function () {
    //Select2 init
    $(".select2").select2({
        dir: "rtl"
    });

    var line = $('.vacationAdmin__line');

    line.hover(function () {
        $(this).siblings('.vacationAdmin__line').css({
            "opacity": ".5"
        });
    }, function () {
        $(this).siblings('.vacationAdmin__line').css({
            "opacity": "1"
        });
    });

    var refuse = $('.refuse');
    var accept = $('.accept');
    refuse.click(function () {
        sweetAlert({
                title: "هل أنت متأكد من رفض الإجراء?",
                text: "<div class='text-right col-sm-4'><span>أضف سبب الرفض</span></div><div class='text-right col-sm-8'><select class='select2 form-control' style='width: 100%'><option value='1'>سبب أول</option><option value='2'>سبب ثاني</option><option value='3'>سبب ثالث</option><option value='4'>سبب رابع</option></select></div>",
                html: true,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "تأكيد!",
                cancelButtonText: "إلغاء",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function (isConfirm) {
                $(".select2").select2({
                    dir: "rtl"
                });
                if (isConfirm) {
                    swal({
                        title: "تم رفض الإجازة",
                        text: "تم الرفض!",
                        type: "success",
                        confirmButtonText: "رجوع"
                    });
                } else {
                    swal({
                        title: "تم إلغاء الإجراء",
                        text: "تم الإلغاء!",
                        type: "success",
                        confirmButtonText: "رجوع"
                    });

                }
            });
    });

    accept.click(function () {
        swal("تم القبول", "تم قبول الإجازة!", "success");
        swal({
            title: "تم قبول الإجازة",
            text: "تم القبول",
            type: "success",
            confirmButtonText: "رجوع!",
            confirmButtonColor: "#1ab394!"
        });
    });
});