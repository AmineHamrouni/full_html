$(document).ready(function() {
    var statsPerso = $('#statsPerso');
    var allInputs = statsPerso.find('.editable');
    var editBtn = $('#editBtn');
    var saveBtn = $('#saveBtn').hide();
        
    editBtn.click(function(){
      allInputs.attr("disabled", false);
      saveBtn.toggle();
      editBtn.toggle();
    });

    saveBtn.click(function(){
      allInputs.attr("disabled", true);
      saveBtn.toggle();
      editBtn.toggle();
    });

});