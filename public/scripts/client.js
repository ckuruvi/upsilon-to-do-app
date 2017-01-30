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
  $(temp).slideUp();
}

// this function displays the 'are you sure?yes/no' message
function deleteCheck(event){
  console.log('inside deleteCheck function');
  event.preventDefault();
  var taskId = $(this).attr('id')
  var temp='#'+taskId+'.deletetask';
  $(temp).slideDown();
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
  $('#taskList').empty();

  tasklist.forEach(function(obj){
    var $tr=$('<tr></tr>');
    $tr.append('<td class="col-md-3"><span>'+obj.task+'</span></td>')
    if(obj.is_complete){
      $tr.append('<td class="col-md-2"> <button class=" btn btn-success btn-xs disabled"><span class="glyphicon glyphicon-ok"></span>Completed</button></div>');
    } else{
      $tr.append('<td class="col-md-2"><button id="'+obj.id+'" class="complete btn btn-xs btn-info">Complete</button></td>');
    }


    var $td=$('<td class="col-md-2"><button id="'+obj.id+'" class="delete btn btn-xs btn-info">Delete</button></td>');
    var $div=$('<div id="'+obj.id+'" class="deletetask" >'+
    '<span>are you sure?</span>'+
    '<button id="'+obj.id+'" class="yes btn btn-xs btn-info">Yes</button>'+
    '<span>&nbsp&nbsp</span>'+
    '<button id="'+obj.id+'" class="no btn btn-xs btn-info">No</button>'+
    '</div>');
    $td.append($div);
    $tr.append($td);
    $('#taskList').append($tr);
  });
}
