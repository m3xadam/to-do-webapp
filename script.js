var taskInput = document.getElementById('taskInput');
var taskList = document.getElementById('parent');
var taskAdd = document.getElementById('addTask');  
var taskCounter = document.getElementById('taskCounter');



function task(){
    let li = document.createElement("li");
    
    li.classList.add('li');
    li.style.paddingLeft = '15px'
    
    
    
    taskList.appendChild(li);

    let wrapper = document.createElement('div');
    wrapper.style.backgroundColor = 'transparent';
    

    li.appendChild(wrapper);



    let toggle = document.createElement('input');
    toggle.type = 'checkbox';


    
    let span = document.createElement('span')
    
    span.textContent = taskInput.value; 
    span.style.outline = 'none';
    span.contentEditable = 'false';
    
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

        updateCounter();
    })

    toggle.addEventListener('click', function(){
        
        doneTask = 0;
        
        
        
        
        if(toggle.checked === true){
            span.style.textDecoration = 'line-through';
        }
        else{
            span.style.textDecoration = 'none';
        }
        
        
        
     
        
        
        updateCounter();
       
    })
    
    
    
    
    
    
    
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
    
    
    
    task();
    updateCounter();
    taskInput.value = "";
});

