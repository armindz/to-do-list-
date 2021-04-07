// Task obj
let Task = function(name, isDone, id) {

    this.id = id;
    this.name = name;
    this.isDone = isDone;

    this.do = function() {
        this.isDone = true;
    };

    this.undo = function() {
        this.isDone = false;
    };


}


let tasks = [];


function fetchInputContent() {

    let textInput = document.getElementById("name").value;
    task = createTask(textInput);
    displayData(task);
};

function generateTaskId() { // generating taskId based on last stored task's id in array

    let id = 0;

    if (tasks.length != 0) {
        id = tasks[tasks.length - 1].id;
        id++;
        console.log(id);
    }

    return id;
};

function createTask(name) {

    let task = new Task(name, 0, generateTaskId());
    addToListOfTasks(task);
    console.log("Adding task : " + task.id);

    return task;
};

function displayData(task) { // inject task name and functions in HTML

    document.getElementById("list").innerHTML += '<h3 class="taskName" property="' + task.id + '">' + task.name + "</h3>";
    document.getElementById("list").innerHTML += '<img class="isDoneBtn" property="' + task.id + '" src="/img/icon/false.png" onclick="markProcess(' + task.id + ');"></img>';
    document.getElementById("list").innerHTML += '<img class="removeBtn" property="' + task.id + '" src="/img/icon/garbageIcon.png" onclick="deleteContent(' + task.id + ');"></img>';

};


function markProcess(idOfTask) {

    let task = getTaskById(idOfTask);

    if (!task.isDone) { // task.isDone == 0
        task.do();
        // find button element based on it's id in property & change img
        document.querySelector('[class="isDoneBtn"][property="' + task.id + '"]').src = "/img/icon/true.png"


    } else {
        task.undo();
        // find button element based on it's id in property & change img
        document.querySelector('[class="isDoneBtn"][property="' + task.id + '"]').src = "/img/icon/false.png";


    }
    // apply changes to list
    updateIsDoneInListOfTasks(task, task.isDone);

};


function getTaskById(taskId) {

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].id === taskId) {
            return tasks[i];
        }

    }
};

function addToListOfTasks(task) {

    tasks.push(task);

};

function fetchListOfTasks() {

    return tasks;
};

function removeFromListOfTasks(task) {

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].id === task.id) {
            tasks.splice(i, 1);
        }
    }
};

function deleteContent(taskId) {

    // delete everything related to specific property until it's null
    while (document.querySelector('[property="' + taskId + '"]') != null) {

        document.querySelector('[property="' + taskId + '"]').remove();
    }

    removeFromListOfTasks(getTaskById(taskId));
};

function updateIsDoneInListOfTasks(task, isDone) {

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].id === task.id) {
            tasks[i].isDone = isDone;
        }
    }

};