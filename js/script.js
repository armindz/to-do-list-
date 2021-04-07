// Duty obj
let Duty = function(name, isDone, id) {

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


let duties = [];


function fetchInputContent() {

    let textInput = document.getElementById("name").value;
    duty = createDuty(textInput);
    displayData(duty);
};

function generateDutyId() { // generating dutyId based on last stored duty's id in array

    let id = 0;

    if (duties.length != 0) {
        id = duties[duties.length - 1].id;
        id++;
        console.log(id);
    }

    return id;
};

function createDuty(name) {

    let duty = new Duty(name, 0, generateDutyId());
    addToListOfDuties(duty);
    console.log("Adding duty : " + duty.id);

    return duty;
};

function displayData(duty) { // inject duty name and functions in HTML

    document.getElementById("list").innerHTML += '<h3 class="dutyName" property="' + duty.id + '">' + duty.name + "</h3>";
    document.getElementById("list").innerHTML += '<img class="isDoneBtn" property="' + duty.id + '" src="/img/icon/false.png" onclick="markProcess(' + duty.id + ');"></img>';
    document.getElementById("list").innerHTML += '<img class="removeBtn" property="' + duty.id + '" src="/img/icon/garbageIcon.png" onclick="deleteContent(' + duty.id + ');"></img>';

    if (document.querySelector('[property="' + duty.id + '"]') == duty.id) {

        /*
        while (document.querySelector('[property="' + duty.id + '"]').getAttribute("class") != "isDoneBtn") {

        }*/


    }

    console.log();


};


function markProcess(idOfDuty) {

    let duty = getDutyById(idOfDuty);

    if (!duty.isDone) { // duty.isDone == 0
        duty.do();
        // find button element based on it's id in property & change img
        document.querySelector('[class="isDoneBtn"][property="' + duty.id + '"]').src = "/img/icon/true.png"


    } else {
        duty.undo();
        // find button element based on it's id in property & change img
        document.querySelector('[class="isDoneBtn"][property="' + duty.id + '"]').src = "/img/icon/false.png";


    }
    // apply changes to list
    updateIsDoneInListOfDuties(duty, duty.isDone);

};


function getDutyById(dutyId) {

    for (let i = 0; i < duties.length; i++) {

        if (duties[i].id === dutyId) {
            return duties[i];
        }

    }
};

function addToListOfDuties(duty) {

    duties.push(duty);

};

function fetchListOfDuties() {

    return duties;
};

function removeFromListOfDuties(duty) {

    for (let i = 0; i < duties.length; i++) {

        if (duties[i].id === duty.id) {
            duties.splice(i, 1);
        }
    }
};

function deleteContent(dutyId) {

    // delete everything related to specific property until it's null
    while (document.querySelector('[property="' + dutyId + '"]') != null) {

        document.querySelector('[property="' + dutyId + '"]').remove();
    }

    removeFromListOfDuties(getDutyById(dutyId));
};

function updateIsDoneInListOfDuties(duty, isDone) {

    for (let i = 0; i < duties.length; i++) {

        if (duties[i].id === duty.id) {
            duties[i].isDone = isDone;
        }
    }

};