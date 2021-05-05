(() => {
    let categoryList = [{
            id: "1",
            title: 'My Day',
            icon: "fa fa-sun-o"
        },
        {
            id: "2",
            title: 'Important',
            icon: "fa fa-star-o"
        },
        {
            id: "3",
            title: 'Planned',
            icon: "fa fa-calendar"
        },
        {
            id: "4",
            title: 'Assinged to you',
            icon: "fa fa-user-o"
        }
    ];

    let taskList = [];

    //variables 
    const button = document.getElementById("add-btn");
    const input = document.getElementById("add-task");
    const leftBlock = document.getElementById("left-block");
    const rightHeading = document.getElementById("right-heading");
    const toggleButton = document.getElementById("toggle-button");
    const subTask = document.getElementById("sub-task");
    const subTaskBtn = document.getElementById("add-task-btn");
    const subTaskBlock = document.getElementById("sub-task-block");
    const leftContainer = document.getElementById("left-container");

    let categoryId;

    //CategoryList objects
    categoryList.forEach(listFunction);

    function listFunction(category) {

        const newElement = document.createElement('div');
        newElement.innerHTML += " <i class='" + category.icon + "'></i><span>" + category.title + "</span>";
        newElement.setAttribute("class", "category");
        //newElement.setAttribute("id", "categoryIId");
        newElement.setAttribute("id", category.id);
        leftBlock.append(newElement);
        document.querySelectorAll(".category").forEach(categorySelect => {
            categorySelect.addEventListener("click", function(evt) {
                categoryId = evt.target.id;
                for (let i = 0; i < categoryList.length; i++) {
                    if (categoryList[i].id == categoryId) {
                        rightHeading.innerHTML = "<h3>" + categoryList[i].title + "</h3>";
                    }
                }
            });
        });
    }

    // let categoryId = document.querySelectorAll(".category").forEach(categorySelect => {
    //     categorySelect.addEventListener("click", function(evt) {
    //         console.log(evt.target.id);
    //         console.log(categorySelect);
    //     });
    // });

    //console.log(categoryId);
    //alert(categoryId);

    //Toggle function in left side
    toggleButton.addEventListener("click", function() {
        if (leftContainer.style.width === "25%") {
            leftContainer.style.width = "3%"
        } else {
            leftContainer.style.width = "25%"
        }
        //this.classList.toggle("left-container-class");
    });

    //Task to render into the category List
    function addTask() {
        const inputValue = input.value;
        if (inputValue == "") return;

        let listData = {
            id: Math.round(Math.random() * 10000000).toString(),
            title: inputValue,
            icon: 'fa fa-list'
        }
        categoryList.push(listData);
        leftBlock.innerHTML = "";
        categoryList.forEach(listFunction);
        input.value = "";
    }

    function handleEnter(event) {
        if (event.keyCode === 13) addTask();
    }

    button.addEventListener("click", addTask);
    input.addEventListener("keyup", handleEnter);

    // Adding right Side Task 
    function addSubTask() {
        const inputValue = subTask.value;
        if (inputValue == "") return;

        let taskListData = {
            id: Math.round(Math.random() * 1000000).toString(),
            title: inputValue,
            icon: 'fa fa-list',
            categoryId: categoryId
        }

        taskList.push(taskListData);

        const newElement = document.createElement('div');
        newElement.innerHTML = "<i class='fa fa-circle-thin'></i><span >" + inputValue + "</span>";

        newElement.setAttribute("class", "subTaskAddition");
        newElement.setAttribute("id", "subTaskAdd");
        newElement.addEventListener("click", taskClick);
        subTaskBlock.append(newElement);

        document.querySelectorAll(".category").forEach(categorySelect => {
            categorySelect.addEventListener("click", function(evt) {
                categoryId = evt.target.id;
                subTaskBlock.innerHTML = "";
                for (let i = 0; i < taskList.length; i++) {
                    if (categoryId === taskList[i].categoryId) {
                        const newElement = document.createElement('div');
                        newElement.innerHTML = "<i class='fa fa-circle-thin'></i><span >" + taskList[i].title + "</span>";

                        newElement.setAttribute("class", "subTaskAddition");
                        newElement.setAttribute("id", "subTaskAdd");
                        newElement.addEventListener("click", taskClick);
                        subTaskBlock.append(newElement);
                    }
                }
            });
        });

        subTask.value = "";
    }

    function handleEnterkey(event) {
        if (event.keyCode === 13) addSubTask();
    }

    // function iconChange(x) {
    //     x.classList.toggle("fa-check-circle-o")
    // }

    subTaskBtn.addEventListener("click", addSubTask);
    subTask.addEventListener("keyup", handleEnterkey);

    //document.getElementById("subTaskAdd").addEventListener("click", taskClick);

    function taskClick() {
        this.classList.toggle("taskCompleted");
    }

    // function backGroundLines() {
    //     var elem = document.createElement("div");
    //     elem.setAttribute("class", "backgroundLines");
    //     document.body.appendChild(elem);
    // }

    init();
})();