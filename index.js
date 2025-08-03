const search = document.getElementById('search-box')
const searchIcon = document.getElementById('search-icon')
const addIcon = document.getElementById('add-icon')
const addNewContainer = document.getElementById('new-task')
let isshow = true
const addTask = document.getElementById('add-task') 
const newTaskTimeline = document.getElementById('new-task-due-date')
const newTaskIcon = document.getElementById('addNewTask-icon')
const tasks = document.querySelector(".tasks")
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
newTaskTimeline.value = formattedDateTime


let taskList = JSON.parse(localStorage.getItem("tasks")) || []

renderTasks()
addIcon.addEventListener("click", function() {

    if (isshow) {
        addNewContainer.style.display = 'none'
        isshow = false
    }else {
        addNewContainer.style.display ='grid'
        isshow = true
    }
})




newTaskIcon.addEventListener("click", function() {

    const title = addTask.value.trim()
    const timeline = newTaskTimeline.value 
    if (title === "")
        return

    
    newTaskTimeline.value = formattedDateTime

    // render(title, timeline)
    

    addTask.value = ""
    // console.log( title)
    // console.log('time',timeline)

    const newTask = {title, timeline}
    taskList.push(newTask)
    localStorage.setItem("tasks", JSON.stringify(taskList))

     renderTasks()
    
})


function renderTasks() {
    tasks.innerHTML = ""
    taskList.forEach(function(task, index){
        tasks.innerHTML += `<div class="task-detail">
                    <p>${task.title}</p>

                     </div>
                     <div class="due-date" >
                    <p>${task.timeline}</p>
                    <i class="ri-delete-bin-line delete-btn" data-index="${index}"></i>
                   
                </div>`
                

    }) 
    const deleteButtons = document.querySelectorAll(".delete-btn")
    for(let i = 0; i < deleteButtons.length; i++){
        deleteButtons[i].addEventListener("click", function() {
            let index = this.getAttribute("data-index")
            taskList.splice(index, 1)
            localStorage.setItem("tasks", JSON.stringify(taskList))
            renderTasks()
        })
    }
}



