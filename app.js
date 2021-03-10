import * as dataFile from "./data.js"


const hours = dataFile.hours;
const days = dataFile.days;
let activities = dataFile.activities;
const program = dataFile.data;


const body = document.querySelector("body");

// Create a new container
const divBody = document.createElement('div');
divBody.classList.add("container");
body.appendChild(divBody);
//Navbar
const navBar = document.createElement('div');
//Bootstrap class
navBar.classList.add("nav")
//Navbar elemens
const navHead = document.createElement('h3');
navHead.innerText = 'Weekly Program'
navHead.classList.add("navHead")

navBar.appendChild(navHead)
divBody.appendChild(navBar)

//Bootstrap row
const divRow = document.createElement('div');
divRow.classList.add('row')
//Activity List
const acListCol = document.createElement('div')
acListCol.classList.add('col-2')
const activityList = document.createElement('ul');
activityList.classList.add("list-group")
activityList.id = "activityList";
const ulHeader = document.createElement("h3");
ulHeader.innerText = "Activities"
ulHeader.style = "text-align: center;"
const newActivityButton = document.createElement("button");
newActivityButton.type = "button";
newActivityButton.classList.add("btn", "btn-success");
newActivityButton.addEventListener('click', newActivity)
newActivityButton.innerText = "+New Activity"

divRow.appendChild(acListCol);
acListCol.appendChild(activityList);
activityList.appendChild(ulHeader);
ulHeader.appendChild(newActivityButton);
divBody.appendChild(divRow);

//Table
const colDiv = document.createElement('div');
colDiv.classList.add("col-10");
const tableProgram = document.createElement("table");
tableProgram.classList.add("table");
const tableHead = document.createElement("thead")
const theadRow = document.createElement("tr");
const hoursHead = document.createElement("th");
hoursHead.scope = "col"
hoursHead.innerText = "Hours";
const tableCol = document.createElement("tbody");

colDiv.appendChild(tableProgram);
tableProgram.appendChild(tableHead);
tableProgram.appendChild(tableCol);
tableHead.appendChild(theadRow);
theadRow.appendChild(hoursHead)
divRow.appendChild(colDiv)

//Information Paragraph
const informationDiv = document.createElement('div');
const informationParagraph = document.createElement('p')
const informationText = document.createElement('h5');
informationText.innerText = "Please drag and drop an activity ===>"
informationText.classList.add("infoText")
informationDiv.appendChild(informationParagraph)
informationParagraph.appendChild(informationText);

//Functions
function newActivity() {
    var activity = prompt("Please enter activity name");
    if (activity) {
        addNewActivity(activity)
    }
}

function addNewActivity(activity) {
    activities.push({ _id: activities.length + 1, name: activity })
    reloadActivities();
}

function createHours() {

    for (let i = 0; i < hours.length; i++) {
        let tr = document.createElement("tr");


        let td = document.createElement("td");
        td.innerHTML = hours[i].hour + "-" + (i === hours.length - 1 ? "00.00" : hours[i + 1].hour);

        tableCol.appendChild(tr)
        tr.appendChild(td)
        Object.keys(program).map((key, index) => {
            // console.log(getActivity(key, hours[i]))
            var td2 = document.createElement("td");
            td2.innerHTML = getActivity(key, hours[i].hour)
            // td2.addEventListener("dblclick", dbClick)
            td2.day = program[key].day;
            td2.dayid = program[key]._id;
            td2.ondrop = drop.bind(null, td2);
            td2.ondragover = allowDrop.bind(td2);
            td2.hour = hours[i].hour;
            tr.appendChild(td2)
        })

    }
}

function createDays() {
    for (let index = 0; index < days.length; index++) {
        let th = document.createElement("th")
        th.innerHTML = days[index].dayName;
        theadRow.appendChild(th)
    }
}

function reloadActivities() {

    // let element = document.getElementById("activities");
    // while (element.firstChild) {
    //     element.removeChild(element.firstChild);
    // } 

    console.log(activityList.children)
    let acList = [];
    Object.keys(activityList.children).map((key, index) => {
        acList.push(activityList.children[key].activityName)
    })
    activities.map(activity => {
        if (acList.includes(activity.name) === false) {

            let li = document.createElement('li')
            let btn = document.createElement('button')
            btn.classList.add("btn", "btn-danger", "right")
            btn.innerHTML = "Sil"
            li.innerText = activity.name;
            li.activityName = activity.name;
            li.id = activity._id;
            btn.addEventListener("click", clckDelete.bind(null, li.id))
            li.style.cursor = "pointer";
            li.classList.add("list-group-item");
            li.classList.add("activities");
            // li.addEventListener("click", selectActivity.bind(null, li))
            // li.addEventListener("dblclick", deleteActivity.bind(null, li.id))
            li.draggable = true;
            li.ondragstart = drag.bind(li);
            activityList.appendChild(li)
            activityList.appendChild(informationDiv)
            li.appendChild(btn)
        }

    })
}
function getActivity(day, hour) {
    let activity = program[day].activities.find(ac => ac.hour === hour)
        ? program[day].activities.find(ac => ac.hour === hour).activityName
        : "---";
    return activity;
}


createHours();
createDays();
reloadActivities();

function allowDrop(e) {
    e.preventDefault();
}

function drag(e) {
    e.dataTransfer.setData("text", e.target.activityName)
}

function drop(day, e) {
    e.preventDefault();
    var txt = e.dataTransfer.getData("text")
    e.target.innerText = txt;
}

function clckDelete(id) {
    if (confirm('Are you sure you want to delete?')) {
        deleteActivity(id);
    } else {
        console.log('Canceled');
    }
}

function deleteActivity(id) {

    console.log(id)
    activities = activities.filter(a => a._id != id)
    console.log(activities)
    let item = document.getElementById(id);
    activityList.removeChild(item)

}
