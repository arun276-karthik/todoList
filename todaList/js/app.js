let categoryList = [{
        id: '1',
        title: 'My Day',
        icon: "fa fa-sun-o"
    },
    {
        id: '2',
        title: 'Important',
        icon: "fa fa-star-o"
    },
    {
        id: '3',
        title: 'Planned',
        icon: "fa fa-calendar"
    },
    {
        id: '4',
        title: 'Assinged to you',
        icon: "fa fa-user-o"
    }
];
const button = document.getElementById("add-btn");
const input = document.getElementById("add-task");
const taskContainer = document.getElementById("left-block");

categoryList.forEach(listFunction);

function listFunction(item) {
    taskContainer.innerHTML += " <div class='category'> <i class='" +
        item.icon + "'></i><span>" + item.title + "</span></div>";
}


function addTask() {
    //Taking user Input
    const inputValue = input.value;

    //Creating new Element with value
    const newElement = document.createElement('div');
    newElement.innerHTML = "<i class='fa fa-list'></i><span >" + inputValue + "</span>";

    newElement.className = 'taskAddition';

    //Appending to container
    taskContainer.append(newElement);
}

//addNewList();

// function addNewList() {
//     var newElement = document.createElement('div');
//     newElement.innerHTML = "<i class='fa fa-plus'></i><input type='text' class='add-task' placeholder='New list' >" +
//         "<button class='btn'>click</button>";
//     newElement.className = 'newTask';
//     newElement.id = '5';
//     const taskvalue = add-task.value;
//     //console.log(taskvalue);
//     // const leftBlock = document.getElementById("left-block");
//     // leftBlock.append(newElement);
//     document.getElementById("left-block").appendChild(newElement);
// }

function handleEnter(event) {
    if (event.keyCode === 13) addTask();
}

button.addEventListener("click", addTask);
input.addEventListener("keyup", handleEnter);

// const addButton = document.getElementsByClassName("add-button");
// const addNote = document.getElementsByClassName("add-Note");
// const leftBlock = document.getElementById("left-block");

// function addTask() {
//     const addTask = addNote.value;

//     const newElement = document.createElement("div");
//     newElement.innerText = addTask;


//     leftBlock.append(newElement);
// }

// function handleEnter(e) {
//     if (e.keyCode === 13) addTask();
// }

// addButton.addEventListener("click", addTask);
// addNote.addEventListener("keyup", handleEnter);