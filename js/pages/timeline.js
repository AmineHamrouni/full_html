/**
 * Created by hamrouni on 11/05/17.
 */
$(document).ready(function(){

    $('#leftVersion').click(function(event) {
        event.preventDefault()
        $('#vertical__timeline').toggleClass('center-orientation');
    });

    $('select').select2({
        "dir": "rtl"
    });

    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox__square--green',
        radioClass: 'iradio__square--green'
    });

    $('.accept_btn').click(function(){
        swal({
            title: "تم القبول!",
            text: "تم قبول الطلب بنجاح!",
            type: "success",
            confirmButtonText: "خروج"
        });
    });

    $('.refuse_btn').click(function(){
        swal({
            title: "تم الرفض!",
            text: "تم رفض الطلب بنجاح!",
            type: "success",
            confirmButtonText: "خروج"
        });
    });

});