
window.addEventListener('load',() => {

    arr = JSON.parse(localStorage.getItem('taskpad')) || [];
    
    const addtask = document.querySelector('#taskform');
    addtask.addEventListener('submit', e=> {
    e.preventDefault();
    
    const data = {
    task: e.target.elements.taskbar.value,
    priority: e.target.elements.status.value,
    done: false,
    timestamp: new Date() //Get time info from the Data Contructor
    }

    arr.push(data)
    localStorage.setItem('taskpad', JSON.stringify(arr));

    e.target.reset();
    showtasklist();
    })

    showtasklist();

})



function showtasklist (){

    const taskBox = document.querySelector("#tasknote");
    taskBox.innerHTML = '';


   arr.forEach(data => {

        // Create all Elements we need
        const taskitems = document.createElement('div');
        const label = document.createElement('label');
        const input = document.createElement('input');
        const priority = document.createElement('div');
        const icon = document.createElement('span');
        const taskcontent = document.createElement('div');
        const taskbuttons = document.createElement('div');
        const editbtn = document.createElement('button');
        const deletebtn = document.createElement('button');
        

        //Define Input Type as Checkbox
        input.type = 'checkbox';
        input.checked = data.done;
        

        //Select icon type based on value
        icon.classList.add('icon');

        if (data.priority == 'personal') {
            icon.classList.add('user');
        }
        else{
            icon.classList.add('briefcase');
        }
    

        // Add Classes to the Elements
        input.classList.add('checkbox');
        taskitems.classList.add('taskitems');
        taskcontent.classList.add('taskcontent');
        taskbuttons.classList.add('taskbuttons');
        editbtn.classList.add('edit');
        deletebtn.classList.add('delete');

        // Push content inside element
        taskcontent.innerHTML = `<textarea readonly>${data.task}</textarea>`;
        editbtn.innerHTML = 'Edit';
        deletebtn.innerHTML = 'Delete';
    
        // Append Child elements to Parent
        //Checkbox
        taskitems.appendChild(label);
        label.appendChild(input);

        //Icons
        taskitems.appendChild(priority);
        priority.appendChild(icon);

        //Content 
        taskitems.appendChild(taskcontent);
        
        //Edit & Delete Buttons
        taskitems.appendChild(taskbuttons);
        taskbuttons.appendChild(editbtn);
        taskbuttons.appendChild(deletebtn);
        
        //Parent(taskBox) >> Children(taskitems)
        taskBox.appendChild(taskitems);



        //Checkbox: Done - Linethrough Logic
        if (data.done) {
            taskitems.classList.add('done');
        }

        input.addEventListener('click', e=> {
            data.done = e.target.checked;
            localStorage.setItem('taskpad', JSON.stringify(arr));

            if (data.done) {
                taskitems.classList.add('done');
            } else{
                taskitems.classList.remove('done');
            }
            showtasklist();
        })
    


        //Edit Button Logic
        editbtn.addEventListener('click', e =>{
            const textarea = taskcontent.querySelector('textarea');
            textarea.removeAttribute('readonly');
            textarea.focus();
            editbtn.innerText= "Save";
            textarea.addEventListener('blur', e=> {
                textarea.setAttribute('readonly', true);
                data.task = e.target.value;
                localStorage.setItem('taskpad', JSON.stringify(arr));
                showtasklist();
            })
        })


        //Delete Button logic
        deletebtn.addEventListener('click', e=> {
            arr = arr.filter(t=> t != data);
            localStorage.setItem('taskpad', JSON.stringify(arr));
            showtasklist();
        })
    })

}

