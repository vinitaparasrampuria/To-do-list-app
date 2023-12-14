// app.js
const apiGatewayUrl = 'https://483mld4nph.execute-api.us-east-1.amazonaws.com/TodoStage';

// Function to generate a random string
function generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value;
    const taskIdgen  = generateRandomId(10);

    if (taskText) {
        const params = {
            method: 'POST',
            body: JSON.stringify({ taskName: taskText , taskId: taskIdgen}),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        fetch(`${apiGatewayUrl}`, params)
            .then(response => response.json())
            .then(data => {
                console.log('Task added:', data);
                taskInput.value = '';
                getTasks();
            })
            .catch(error => console.error('Error adding task:', error));
    }
}

function getTasks() {
    fetch(`${apiGatewayUrl}`)
        .then(response => response.json())
        .then(data => {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';

            data.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.taskName;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = () => deleteTask(task.id);

                li.appendChild(deleteButton);

                taskList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

function deleteTask(taskId) {
    const params = {
        method: 'DELETE',
    };

    fetch(`${apiGatewayUrl}/tasks/${taskId}`, params)
        .then(response => {
            if (response.ok) {
                console.log('Task deleted:', taskId);
                getTasks();
            } else {
                console.error('Error deleting task:', response.statusText);
            }
        })
        .catch(error => console.error('Error deleting task:', error));
}

document.addEventListener('DOMContentLoaded', getTasks);
