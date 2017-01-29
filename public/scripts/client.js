$(function(){
getTasks();
console.log('inside jquery DOM ready function');
$('#addtask').on('click', registerTask);
$('#taskList').on('click','.delete',deleteCheck);
$('#taskList').on('click','.complete',completeTask);
$('#taskList').on('click','.yes',deleteTask);
$('#taskList').on('click','.no',hideDeleteCheck);

});


function hideDeleteCheck(event){
  console.log('inside hideDeleteCheck function');
  event.preventDefault();
   var taskId = $(this).attr('id')
   var temp='#'+taskId+'.deletetask';
  $(temp).hide();
}

function deleteCheck(event){
  console.log('inside deleteCheck function');
  event.preventDefault();
   var taskId = $(this).attr('id')
   var temp='#'+taskId+'.deletetask';
  $(temp).show();
}


function completeTask(event){
  event.preventDefault();
  console.log('inside function deleteTask');
  var taskId = $(this).attr('id')
  console.log(taskId);
  $.ajax({
    url:'/task/'+taskId,
    type:'PUT',
    success:getTasks
  });
}

function deleteTask(event){
  event.preventDefault();
  console.log('inside function deleteTask');
  var taskId = $(this).attr('id')
  console.log(taskId);
  $.ajax({
    url:'/task/'+taskId,
    type:'DELETE',
    success:getTasks
  });
}


function registerTask(event){
  event.preventDefault();
  console.log('inside function registerTask');
  var formData = $(this).closest('form').serialize();
  console.log(formData);

  $.ajax({
    url:'/task',
    type:'POST',
    data:formData,
    success:getTasks
  });
}

function getTasks(list){
  console.log('inside function getTasks',list);

  $.ajax({
    url:'/task',
    type:'GET',
    success:displayTasks
  });
}

// function displayTasks(tasklist){
//   console.log('inside function displayTasks',tasklist);
//   $('#taskList').empty();
//   tasklist.forEach(function(obj){
//     var $div = $('<div class="table-row"></div>');
//     var $form = $('<form></form>');
//     $form.append('<div class="table-cell"><span>'+obj.task+'</span></div>');
//     if(obj.is_complete){
//       $form.append('<div class="table-cell"><button id="'+obj.id+'" class="completedTask btn-success">Task Completed</button></div>');
//     } else {
//     $form.append('<div class="table-cell"><button id="'+obj.id+'" class="complete btn-info">Complete</button></div>');
//     }
//     $form.append('<div class="table-cell"><button id="'+obj.id+'" class="delete btn-info">Delete</button></div>');
//     $div.append($form);
//  $('#taskList').append($div);
//
//   });
//
// }

function displayTasks(tasklist){
  console.log('inside function displayTasks',tasklist);
  $('#taskList').empty();
  tasklist.forEach(function(obj){
    var $div = $('<div class="row "></div>');
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

}
