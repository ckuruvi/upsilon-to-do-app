$(function(){
getTasks();
console.log('inside jquery DOM ready function');
$('#addtask').on('click', registerTask);
$('#taskList').on('click','.delete',deleteTask);
$('#taskList').on('click','.complete',completeTask);

});


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

function displayTasks(tasklist){
  // <div class="table-row">
  //     <div class="table-head">Table Header</div>
  //     <div class="table-head">Table Header</div>
  //     <div class="table-head">Table Header</div>
  //   </div>
  console.log('inside function displayTasks',tasklist);
  $('#taskList').empty();
  tasklist.forEach(function(obj){
    var $div = $('<div class="table-row"></div>');
    var $form = $('<form></form>');
    $form.append('<div class="table-cell"><span>'+obj.task+'</span></div>');
    if(obj.is_complete){
      $form.append('<div class="table-cell"><button id="'+obj.id+'" class="completedTask">Task Completed</button></div>');
    } else {
    $form.append('<div class="table-cell"><button id="'+obj.id+'" class="complete">Complete</button></div>');
    }
    $form.append('<div class="table-cell"><button id="'+obj.id+'" class="delete">Delete</button></div>');
    $div.append($form);
 $('#taskList').append($div);

  });

}
