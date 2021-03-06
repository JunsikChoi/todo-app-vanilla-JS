window.addEventListener("load", function () {
    const localStorageName = "tasks"

    const form = document.querySelector(".todo-form");
    const input = document.querySelector(".form-input");
    const taskList = document.querySelector('.task-list');

    // Initialize
    taskList.scroll({
        behavior: 'smooth',
    })
    input.focus();
    data = getLocalStorage();
    keys = Object.keys(data)

    if (keys.length != 0) {
        keys.forEach(function (key) {
            taskList.appendChild(createTask(data[key], key));
        })
    }

    // Add Task
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        var inputText = input.value;

        if (inputText.length == 0) {
            alert("Type Something")
        } else {
            var li = document.createElement('li');
            var taskTitle = document.createElement('h3');
            var taskText = document.createTextNode(inputText);
            var taskRemoveBtn = genBTN();
            var id = new Date().getTime().toString();

            taskList.appendChild(createTask(inputText, id));
            updateLocalStorage(id, inputText)
            input.value = ""; // initialize input form
        }
    })

    function createTask(input, id) {

        var inputText = input

        var li = document.createElement('li');
        var taskTitle = document.createElement('h3');
        var taskText = document.createTextNode(inputText);
        var taskRemoveBtn = genBTN();

        li.setAttribute("class", "task-list__item");
        li.setAttribute("id", id);
        taskTitle.setAttribute("class", "task-list__item__title");
        li.appendChild(taskTitle);
        li.appendChild(taskRemoveBtn);
        taskTitle.appendChild(taskText);
        return li;
    }

    // Button Control
    function removeTask(e) {
        const btn = e.target;
        const ul = btn.parentNode.parentNode.parentNode;
        const li = btn.parentNode.parentNode;
        removeItemFromLocalStorage(li.id);
        ul.removeChild(li);
    }

    function updateTask(e) {
        const li = e.target.parentNode.parentNode;
        const id = li.id;
        const updateForm = document.createElement('form');
        const updateInput = document.createElement('input');
        const updateConfirmBtn = document.createElement('input');
        const updateCancelBtn = document.createElement('input');

        updateInput.type = "text";
        updateInput.placeholder = "Type Here to Edit :)"
        updateConfirmBtn.type = "submit";
        updateConfirmBtn.value = "Enter";
        updateCancelBtn.type = "button";
        updateCancelBtn.value = "Cancel";

        updateForm.setAttribute("class", "task-list__item__update-form");
        updateInput.setAttribute("class", "input task-list__item__update-form__input");
        updateConfirmBtn.setAttribute("class", "btn task-list__item__update-form__confirm-btn");
        updateCancelBtn.setAttribute("class", "btn task-list__item__update-form__cancel-btn");

        updateForm.appendChild(updateInput);
        updateForm.appendChild(updateConfirmBtn);
        updateForm.appendChild(updateCancelBtn);


        updateForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const inputText = updateInput.value;
            if (inputText.length == 0) {
                alert("Type Something!");
            } else {
                updateLocalStorage(id, inputText);
                updateForm.parentNode.replaceChild(createTask(inputText, id), updateForm);
            }
        });

        updateCancelBtn.addEventListener('click', function (e) {
            data = getLocalStorage();
            updateForm.parentNode.replaceChild(createTask(data[id], id), updateForm);
        });

        li.parentNode.replaceChild(updateForm, li);
        updateInput.focus();
    }

    function genBTN() {
        var btnContainer = document.createElement('div');
        var updateBtn = document.createElement('i');
        var removeBtn = document.createElement('i');

        btnContainer.setAttribute("class", "task-list__item__container")
        updateBtn.setAttribute("class", "task-list__item__btn task-list__item__btn__update fas fa-edit")
        removeBtn.setAttribute("class", "task-list__item__btn task-list__item__btn__remove fas fa-trash-alt")
        updateBtn.addEventListener("click", updateTask)
        removeBtn.addEventListener("click", removeTask)
        btnContainer.appendChild(updateBtn);
        btnContainer.appendChild(removeBtn);

        return btnContainer
    }

    // Storage
    function getLocalStorage() {
        return localStorage.getItem(localStorageName) ? JSON.parse(localStorage.getItem(localStorageName)) : {};
    }

    function updateLocalStorage(key, value) {
        data = getLocalStorage()
        data[key] = value
        localStorage.setItem(localStorageName, JSON.stringify(data))
    }

    function removeItemFromLocalStorage(key) {
        data = JSON.parse(localStorage.getItem(localStorageName));
        delete data[key];
        localStorage.setItem(localStorageName, JSON.stringify(data));
    }

})

