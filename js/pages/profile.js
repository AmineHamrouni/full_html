$(document).ready(function () {
    var statsPerso = $('#statsPerso');
    var allInputs = statsPerso.find('.editable');
    var editBtn = $('#editBtn');
    var minimalize = $('.navbar-minimalize');
    var saveBtn = $('#saveBtn').hide();

    editBtn.click(function () {
        allInputs.attr("disabled", false);
        saveBtn.toggle();
        editBtn.toggle();
    });

    saveBtn.click(function () {
        allInputs.attr("disabled", true);
        saveBtn.toggle();
        editBtn.toggle();
    });

    // Minimalize menu
    $('.navbar-minimalize').click();

    minimalize.click(function () {
      $('.myProfile__perso__img').fadeToggle();
    });

    var chart = c3.generate({
        bindto: '#chart',
        data: {
            columns: [
        ['تأخير', 30, 200, 100, 400, 150, 150, 250],
        ['غياب', 50, 20, 10, 40, 15,15, 25]
      ],
            axes: {
                data2: 'y2'
            },
            types: {
                data2: 'bar' // ADD
            }
        },
        axis: {
            y: {
                label: {
                    text: 'Y Label',
                    position: 'outer-middle'
                }
            },
            y2: {
                show: true,
                label: {
                    text: 'دقائق',
                    position: 'outer-middle'
                }
            }
        }
    });
    
    //Hover Form Group    
    var line = $('.form-group');

    line.hover(function () {
        $(this).siblings('.form-group').css({
            "opacity": ".5"
        });
        
    }, 
               function () {
//        $(this).siblings('.vacationAdmin__line').find('.btn').show();
        $(this).siblings('.form-group').css({
            "opacity": "1"
        });
    });

});