document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.innerHTML = `
                <span class="todo-text">${todo}</span>
                <div class="todo-actions">
                    <button class="edit-btn" onclick="editTodo(${index})">✏️</button>
                    <button class="delete-btn" onclick="deleteTodo(${index})">🗑️</button>
                </div>
            `;
            todoList.appendChild(li);
        });
        saveTodos();
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const todoText = input.value.trim();
        if (todoText) {
            todos.push(todoText);
            input.value = '';
            renderTodos();
        }
    });

    window.editTodo = (index) => {
        const newTodo = prompt('Edit your todo:', todos[index]);
        if (newTodo !== null) {
            todos[index] = newTodo.trim();
            renderTodos();
        }
    };

    window.deleteTodo = (index) => {
        if (confirm('Are you sure you want to delete this todo?')) {
            todos.splice(index, 1);
            renderTodos();
        }
    };

    renderTodos();
});