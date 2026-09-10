var taskInput = document.getElementById('taskInput');
var taskList = document.getElementById('parent');
var taskAdd = document.getElementById('addTask');  
var taskCounter = document.getElementById('taskCounter');
var tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function save (){
    localStorage.setItem('tasks',
        JSON.stringify(tasks));
    
}


function loadTask(){
    for(let savedTask of tasks){
        task(savedTask)
    }

    updateCounter();
}



function task(savedTask){
    let newTask = savedTask || {
        id:Date.now(),
        text:taskInput.value,
        done:false
    };

    let li = document.createElement("li");
    
    li.classList.add('li');
    li.style.paddingLeft = '15px'
    
    
    
    taskList.appendChild(li);

    let wrapper = document.createElement('div');
    wrapper.style.backgroundColor = 'transparent';
    

    li.appendChild(wrapper);



    let toggle = document.createElement('input');
    toggle.type = 'checkbox';
    toggle.checked = newTask.done;


    
    let span = document.createElement('span')
    
    span.textContent = savedTask? savedTask.text:taskInput.value; 
    span.style.outline = 'none';
    span.contentEditable = 'false';

    if(newTask.done){
        span.style.textDecoration = 'line-through';
    }
    
    span.addEventListener('click', function(){
        
        if(span.contentEditable === "false") {
            
            span.contentEditable = 'true';
            span.focus();
        }
        
        else{
            span.contentEditable = 'false'
        }
        
        console.log('trying to edit task')
    })
    
    
    let remove = document.createElement('button')
    remove.textContent = 'delete';
    remove.classList.add('delete');


    wrapper.appendChild(toggle);
    li.appendChild(span);
    li.appendChild(remove);
    
    remove.addEventListener('click', function(){
        li.remove();

        tasks = tasks.filter(function(item){
            return item.id !== newTask.id;
        });

        save();
        updateCounter();
    })

    toggle.addEventListener('click', function(){
        
        
        newTask.done = toggle.checked;   
        
        if(toggle.checked){
            span.style.textDecoration = 'line-through';
        }
        else{
            span.style.textDecoration = 'none';
        } 

        save();
        updateCounter();
        
    });
    
    if(!savedTask){
        tasks.push(newTask);
        save();
    }
    
    
    
    
    
}

function updateCounter(){
    let  doneTask = 0;
    let checkboxes = taskList.querySelectorAll('input[type="checkbox"]');
    for(let checkbox of checkboxes){
        
        if(checkbox.checked === true){
            doneTask = doneTask + 1;
        }
        
    }
    
    let totalTask = taskList.children.length;
    taskCounter.textContent = `Task Done: ${doneTask} of ${totalTask}`;
    

}
taskAdd.addEventListener('click', function(){
    
    if(taskInput.value.trim() === ""){
    alert("No Task Written")

    return;
}
    
    
    task();
    updateCounter();
    taskInput.value = "";
});

loadTask();