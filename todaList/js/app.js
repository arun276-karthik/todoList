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
    let addStepList = [];

    /**
     * init function to call render function at starting
     */
    function init() {
        categoryList.forEach(renderCategories);
        toggleFunction();
        addCategory();
        leftBlock.addEventListener("click", function(event) {
            if ("DIV" == event.target.tagName) {
                selectCategory(event);
            }
        });
        taskClick();
    }

    //variables 
    const categoryAddBtn = document.getElementById("category-btn");
    const categoryInput = document.getElementById("add-category");
    const leftBlock = document.getElementById("left_block");
    const rightHeading = document.getElementById("middle_heading");
    const toggleButton = document.getElementById("toggle_button");
    const taskInput = document.getElementById("add_task_input");
    const taskBtn = document.getElementById("add_task_btn");
    const taskDisplay = document.getElementById("task_display");
    const leftContainer = document.getElementById("left_container");
    const inputStepTask = document.getElementById("input_task_step");
    const addStep = document.getElementById("task_title");
    const stepTasks = document.getElementById("steptasks");
    const rightSideContainer = document.getElementById("right_container");
    const middleContainer = document.getElementById("middle_container");
    let taskId;
    let categoryId;
    let isOpen = false;

    /**
     * This is the category list rendering where select function is called .
     * @param category 
     */
    function renderCategories(category) {
        const newElement = document.createElement('div');
        newElement.innerHTML += " <i class='" + category.icon + "'></i><span>" + category.title + "</span>";
        newElement.setAttribute("class", "category");
        newElement.setAttribute("id", category.id);
        leftBlock.append(newElement);
    }

    /**
     * This adds the input to the category list in the left container
     * @returns suppose null value is given as input it returns to input
     */
    function addCategory() {
        const inputValue = categoryInput.value;
        if (inputValue == "") return;

        let listData = {
            id: categoryList.length + 1,
            title: inputValue,
            icon: 'fa fa-list'
        };
        categoryList.push(listData);
        leftBlock.innerHTML = "";
        categoryList.forEach(renderCategories);
        // renderCategories(category);
        categoryInput.value = "";
    }

    /**
     * This function is activated when the class name is clicked in the document
     * @param  event 
     */
    function selectCategory(event) {
        middleContainer.classList.add("visible-middle");
        categoryId = event.target.id;
        console.log(event.target);
        rightHeading.innerHTML = "<h3>" + categoryList[categoryId - 1].title + "</h3>";
        renderTask();
        stepTasks.innerHTML = "";
        addStep.innerHTML = "";
        taskInput.value = "";
        // taskClick();
    }

    /** 
     * Toggle button in the left container to toggle the category list
     */
    function toggleFunction() {
        toggleButton.addEventListener("click", function() {
            if (isOpen == true) {
                leftContainer.className = "left-container";
            } else {
                leftContainer.classList.add("left-container-close");
            }
            isOpen = !(isOpen);
            toggleButton.classList.toggle("fa-flip-horizontal");
        });
    }

    /**
     * Task rendering to display the tasks present in the task list array 
     *
     * @param task 
     */
    function renderTask() {
        taskDisplay.innerHTML = "";
        for (let index = 0; index < taskList.length; index++) {
            if (categoryId === taskList[index].categoryId) {
                const newElement = document.createElement('div');
                newElement.innerHTML = "<i class='" + taskList[index].icon + "'></i><span class='" + taskList[index].strike + "'>" + taskList[index].title + "</span><i class='" + taskList[index].importantIcon + "'></i>";
                newElement.setAttribute("class", "subTaskAddition");
                newElement.setAttribute("id", taskList[index].id);
                taskDisplay.append(newElement);
            }
        }
    }

    /**
     * Click event for the task for the category 
     */
    function taskClick() {
        taskDisplay.addEventListener("click", function(event) {
            if ("SPAN" == event.target.tagName || "fa fa-circle-thin" == event.target.className ||
                "fa fa-check-circle" == event.target.className) {
                strike(event);
            } else if ("fa fa-star-o" == event.target.className || "fa fa-star" == event.target.className) {
                important(event);
            }
            stepTask(event.target);
        });
    }

    /** 
     * Adding task to the array and rendering the list 
     */
    function addTask() {
        const inputValue = taskInput.value;
        if (inputValue == "") return;

        let taskListData = {
            id: taskList.length,
            title: inputValue,
            icon: 'fa fa-circle-thin',
            categoryId: categoryId,
            isCompleted: false,
            isImportant: false,
            importantIcon: 'fa fa-star-o',
            strike: 'taskInCompleted'
        };
        taskList.push(taskListData);
        taskInput.value = "";
        taskList.forEach(renderTask);
    }

    /**
     * To find the index from the id of the task 
     *
     * @param taskList 
     * @param value 
     * @returns 
     */
    function indexfunction(taskList, value) {
        for (let index = 0; index < taskList.length; index++) {
            if (taskList[index].id == value) {
                return index;
            }
        }
    }

    /**
     * It is to mark the task as completed by getting the click event 
     *
     * @param  event 
     */
    function strike(event) {
        rightSideContainer.classList.add("visible-right");
        const index = indexfunction(taskList, event.target.parentElement.id);
        if (taskList[index].isCompleted === false) {
            taskList[index].isCompleted = true;
        } else {
            taskList[index].isCompleted = false;
        }
        taskComplete(index);
        taskId = event.target.parentElement.id;
        renderTask();
    }

    /**
     * To change the important and completed using the event 
     * @param  event 
     */
    function important(event) {
        const index = indexfunction(taskList, event.target.parentElement.id);
        if (taskList[index].isImportant === false) {
            taskList[index].isImportant = true;
        } else {
            taskList[index].isImportant = false;
        }
        importantSelect(index);
        renderTask();
    }

    /**
     * To mark the task as complete 
     * @param index 
     */
    function taskComplete(index) {
        if (taskList[index].isCompleted === true) {
            taskList[index].strike = "taskCompleted";
            taskList[index].icon = "fa fa-check-circle";
        } else {
            taskList[index].strike = "taskInComplete";
            taskList[index].icon = "fa fa-circle-thin";
        }
    }

    /**
     * To check and uncheck the important 
     * @param index 
     */
    function importantSelect(index) {
        if (taskList[index].isImportant === true) {
            taskList[index].importantIcon = "fa fa-star";
        } else {
            taskList[index].importantIcon = "fa fa-star-o";
        }
    }

    /**
     * Rendering step task 
     */
    function renderStepTask() {
        for (let index = 0; index < addStepList.length; index++) {
            if (addStepList[index].categoryId === categoryId && addStepList[index].taskId === taskId) {
                const newElement = document.createElement('div');
                newElement.innerHTML = "<i class='fa fa-circle-thin'></i><span>" + addStepList[index].title +
                    "</span><i class='fa fa-star-o'></i>";
                newElement.setAttribute("class", "stepAddition");
                newElement.setAttribute("id", "stepAdd");
                stepTasks.append(newElement);
            }
        }
    }

    /**
     * step tasks pushed to the steplist array
     * @returns if null value is entered it returns 
     */
    function addstep() {
        const stepInput = inputStepTask.value;
        if (stepInput == "") return;

        let stepData = {
            id: addStepList.length,
            title: stepInput,
            icon: 'fa fa-circle-thin',
            categoryId: categoryId,
            taskId: taskId
        };
        addStepList.push(stepData);
        stepTasks.innerHTML = "";
        renderStepTask();
        inputStepTask.value = "";
    }

    /**
     * Task title gets append to the step task value 
     * @param  steptask 
     */
    function stepTask(steptask) {
        taskId = steptask.parentElement.id;
        addStep.innerHTML = "<i class='" + taskList[taskId].icon + "'></i><span class='" + taskList[taskId].strike + "'>" + taskList[taskId].title + "</span><i class='" + taskList[taskId].importantIcon + "'></i>";
        stepTasks.innerHTML = "";
        renderStepTask();
    }

    /**
     * This is the enter key event called when the input value is entered then add category is called
     * @param event 
     */
    function handleCategory(event) {
        if (event.keyCode === 13) addCategory();
    }

    categoryAddBtn.addEventListener("click", addCategory);
    categoryInput.addEventListener("keyup", handleCategory);

    inputStepTask.addEventListener("keyup", handleAdd);

    /**
     * This is the enter key event called when the input value is entered then add step is called
     * @param event 
     */
    function handleAdd(event) {
        if (event.keyCode === 13) addstep();
    }

    /**
     * This is the enter key event called when the input value is entered then add Task is called
     * @param event 
     */
    function handleTask(event) {
        if (event.keyCode === 13) addTask();
    }

    taskBtn.addEventListener("click", addTask());
    taskInput.addEventListener("keyup", handleTask);

    init();
})();