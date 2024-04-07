// Function to add a task
function addtask(task, id) {
    var ul = document.getElementById('ultask');
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(task));

    // Create a new button element
    var deleteButton = document.createElement('button');
    deleteButton.appendChild(document.createTextNode('X'));

    // Add 'click' event listener to the delete button
    deleteButton.addEventListener('click', function() {
        ul.removeChild(li);
        // Remove the task from localStorage as well
        var tasks = JSON.parse(localStorage.getItem('tasks'));
        delete tasks[id];
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    // Append the delete button to the task
    li.appendChild(deleteButton);

    // Append the task to the list
    ul.appendChild(li);
}

// Function to load tasks from localStorage
function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    for (var id in tasks) {
        addtask(tasks[id], id);
    }
}

// Load tasks when the page loads
window.onload = loadTasks;

// Event listener for the submit button
document.getElementById('get').addEventListener('click', function() {
    var task = document.getElementById('inp').value;
    if (task !== '' && task !== ' ') {
        // Generate a unique id for the task
        var id = new Date().getTime().toString();
        // Save the task to localStorage
        var tasks = JSON.parse(localStorage.getItem('tasks')) || {};
        tasks[id] = task;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        // Add the task to the list
        addtask(task, id);
        // Clear the input field
        document.getElementById('inp').value = '';
    }
});