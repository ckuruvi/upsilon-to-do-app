$(function(){
  getTasks();
  console.log('inside jquery DOM ready function');
  $('#addtask').on('click', registerTask);  //register task click
  $('#taskList').on('click','.delete',deleteCheck); // delete task click
  $('#taskList').on('click','.complete',completeTask); //complete task click
  $('#taskList').on('click','.yes',deleteTask); //   makes ajax call to delete task
  $('#taskList').on('click','.no',hideDeleteCheck); // calls hideDeleteCheck to hide 'are you sire?yes/no' message

});

// this function hides the 'are you sure?yes/no' message
function hideDeleteCheck(event){
  console.log('inside hideDeleteCheck function');
  event.preventDefault();
  var taskId = $(this).attr('id')
  var temp='#'+taskId+'.deletetask';
  $(temp).hide();
}

// this function displays the 'are you sure?yes/no' message
function deleteCheck(event){
  console.log('inside deleteCheck function');
  event.preventDefault();
  var taskId = $(this).attr('id')
  var temp='#'+taskId+'.deletetask';
  $(temp).show();
}


// this function makes an ajax call to mark task as complete
function completeTask(event){
  // console.log('inside function deleteTask');
  event.preventDefault();
  var taskId = $(this).attr('id')
  $.ajax({
    url:'/task/'+taskId,
    type:'PUT',
    success:getTasks
  });
}

// this function makes an ajax call to delete task from the database
function deleteTask(event){
  event.preventDefault();
  // console.log('inside function deleteTask');
  var taskId = $(this).attr('id')
  console.log(taskId);
  $.ajax({
    url:'/task/'+taskId,
    type:'DELETE',
    success:getTasks
  });
}

//this function makes an ajax call to insert  new task into the database
function registerTask(event){
  // console.log('inside function registerTask');
  event.preventDefault();
  var formData = $(this).closest('form').serialize();
  $.ajax({
    url:'/task',
    type:'POST',
    data:formData,
    success:getTasks
  });
}

// this function makes an  ajax call  to retrieve all tasks from the Database
function getTasks(list){
  // console.log('inside function getTasks',list);
  $.ajax({
    url:'/task',
    type:'GET',
    success:displayTasks
  });
}


// this function displays all tasks retrieved from the ajax call inside getTasks on the DOM .
function displayTasks(tasklist){
  // console.log('inside function displayTasks',tasklist);
  $('#taskList').empty();
  tasklist.forEach(function(obj){
    var $div = $('<div class="row text-center"></div>');
    var $form = $('<form></form>');
    $form.append('<div class="col-md-3"><span>'+obj.task+'</span></div>');
    if(obj.is_complete){
      $form.append('<div class="col-md-2"> <button class="btn-success"><span class="glyphicon glyphicon-ok"></span>Completed</button></div>');
    } else {
      $form.append('<div class="col-md-2"><button id="'+obj.id+'" class="complete btn-info">Complete</button></div>');
    }
    $form.append('<div class="col-md-2"><button id="'+obj.id+'" class="delete btn-info">Delete</button></div>');
    //delete check start
    $form.append('<div id="'+obj.id+'" class="deletetask col-md-1"><span>are you sure?</span></div>');
    $form.append('<div id="'+obj.id+'" class="deletetask col-md-1"><button id="'+obj.id+'" class="yes btn-info">Yes</button></div>');
    $form.append('<div id="'+obj.id+'" class="deletetask col-md-1"><button id="'+obj.id+'" class="no btn-info">No</button></div>');

    //delete check end
    $div.append($form);
    $('#taskList').append($div);
  });

}  // end of displayTasks function
