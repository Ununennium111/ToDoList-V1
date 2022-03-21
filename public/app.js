const taskFormDOM = document.getElementById('task-form');
const taskInputDOM = document.getElementById('task-input');
const formAlertDivDOM = document.getElementById('form-alert-div');

const tasksDivDOM = document.getElementById('tasks-div');
const loadingPDOM = document.getElementById('loading-p');

const showTasks = async () => {
    loadingPDOM.style.visibility = 'visible';

    try {
        const { data: { tasks } } = await axios.get('/api/v1/tasks');

        if(tasks.length < 1){
            tasksDivDOM.innerHTML = '<h3 class="empty-list">No tasks in your list</h3>';
            loadingPDOM.style.visibility = 'hidden';
            return;
        }

        const allTasks = tasks.map((task) => {
            const {_id:taskID, task:taskName} = task;
            return `<div class="single-task"><h4>Task: ${taskName}</h4><h4>Id: ${taskID}</h4><button class="delete-btn" data-id="${taskID}"><i class="fa-solid fa-trash-can"></i></button></i></div>`;
        }).join('');

        tasksDivDOM.innerHTML = allTasks;
    } catch (error) {
        tasksDivDOM.innerHTML = '<h3 class="empty-list">There was an error, please try later...</h3>'
    }   
    loadingPDOM.style.visibility = 'hidden';
}

showTasks();

tasksDivDOM.addEventListener('click', async (e) => {
   const el = e.target;
   
   if(el.parentElement.classList.contains('delete-btn')){
    loadingPDOM.style.visibility = 'visible';
    const id = el.parentElement.dataset.id;

    try {
        await axios.delete(`/api/v1/tasks/${id}`);
        showTasks();
    } catch (error) {
        console.log(error);
    }
   }

   loadingPDOM.style.visibility = 'hidden';
});

taskFormDOM.addEventListener('submit', async(e) => {
    e.preventDefault();
    const task = taskInputDOM.value;

    try {
        await axios.post('/api/v1/tasks', {task});
        showTasks();
        taskInputDOM.value = '';
        formAlertDivDOM.style.display = 'block';
        formAlertDivDOM.textContent = 'Task successfully added';
        formAlertDivDOM.classList.add('text-succes');
    } catch (error) {
        formAlertDivDOM.style.display = 'block';
        formAlertDivDOM.innerHTML = `Error, please try again`;
    }

    setTimeout(() => {
        formAlertDivDOM.style.display = 'none';
        formAlertDivDOM.classList.remove('text-success');
    }, 3000);
})