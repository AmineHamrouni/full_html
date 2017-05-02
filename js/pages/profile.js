$(document).ready(function () {
    //job history
    var jobHistBtn = $('#job__history__btn');
    var jobHistContent = $('.job__history__content');
    var jobDetailsContent = $('.job__details');
    jobHistBtn.on( "click", function() {
        jobHistContent.toggle("slide", { direction: "right" }, 0);
        jobDetailsContent.toggle("slide", { direction: "left" }, 0);
    });

});

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
    minimalize.click();

    minimalize.click(function () {
        $('.myProfile__perso__img').fadeToggle();
    });

    var chart = c3.generate({
        bindto: '#chart',
        data: {
            columns: [
        ['تأخير', 30, 200, 100, 400, 150, 150, 250],
        ['غياب', 50, 20, 10, 40, 15, 15, 25]
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

    //Crop Function
    var $image = $(".image-crop > img");
    $($image).cropper({
        aspectRatio: 1,
        width: 128,
        preview: ".img-preview",
        done: function (data) {
            // Output the result data for cropping image.
        }
    });
    
    var imageData = $image.cropper('getCroppedCanvas', {width: 128, height: 128}).toDataURL();

    var $inputImage = $("#inputImage");
    if (window.FileReader) {
        $inputImage.change(function () {
            var fileReader = new FileReader(),
                files = this.files,
                file;

            if (!files.length) {
                return;
            }

            file = files[0];

            if (/^image\/\w+$/.test(file.type)) {
                fileReader.readAsDataURL(file);
                fileReader.onload = function () {
                    $inputImage.val("");
                    $image.cropper("reset", true).cropper("replace", this.result);
                };
            } else {
                showMessage("Please choose an image file.");
            }
        });
    } else {
        $inputImage.addClass("hide");
    }

    $("#download").click(function () {
        //$( ".downloaded" ).val($image.cropper("getDataURL"));
        window.open(imageData);
        $( ".downloaded" ).val(imageData);
    });
    

});