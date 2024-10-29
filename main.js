
// Get elements
const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const todoList = document.getElementById('todo-list');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add new task
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask(taskInput.value.trim());
});

// Add task with Enter key
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTask(taskInput.value.trim());
    }
});

// Add task function
function addTask(task) {
    if (task && task.split(' ').length <= 10) {
        const taskItem = {
            id: Date.now(),
            text: task,
            completed: false,
        };

        const tasks = getTasksFromLocalStorage();
        tasks.push(taskItem);
        saveTasksToLocalStorage(tasks);
        renderTask(taskItem);
        taskInput.value = '';
    } else {
        alert('Task must not be empty and exceed 10 words or 30 characters.');
    }
}

// Render tasks from local storage
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(renderTask);
}

// Render individual task
function renderTask(taskItem) {
    const li = document.createElement('li');
    li.setAttribute('data-id', taskItem.id);

    const taskText = document.createElement('span');
    taskText.classList.add('task-text');
    taskText.textContent = taskItem.text;
    if (taskItem.completed) {
        taskText.classList.add('completed');
    }

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editTask(taskItem.id));

    // Complete button
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');
    completeBtn.textContent = 'Complete';
    completeBtn.addEventListener('click', () => completeTask(taskItem.id));

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(taskItem.id));

    li.appendChild(taskText);
    li.appendChild(editBtn);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
}

// Edit task
function editTask(id) {
    const tasks = getTasksFromLocalStorage();
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
        const newText = prompt('Edit your task:', taskToEdit.text);
        if (newText && newText.trim().split(' ').length <= 10 && newText.trim().length <= 30) {
            taskToEdit.text = newText.trim();
            saveTasksToLocalStorage(tasks);
            location.reload();
        } else {
            alert('Task must not exceed 10 words or 30 characters.');
        }
    }
}

// Complete task
function completeTask(id) {
    const tasks = getTasksFromLocalStorage();
    const taskToComplete = tasks.find(task => task.id === id);
    if (taskToComplete) {
        taskToComplete.completed = !taskToComplete.completed;
        saveTasksToLocalStorage(tasks);
        location.reload();
    }
}

// Delete task
function deleteTask(id) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.id !== id);
    saveTasksToLocalStorage(tasks);
    location.reload();
}

// Get tasks from local storage
function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Save tasks to local storage
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

