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
    var init = () => {
        // categoryList.forEach(renderCategories);
        renderCategories();
        toggleFunction();
        addCategory();
        $("#left_block").click(function(event) {
            if ("DIV" === event.target.tagName) {
                selectCategory(event);
            }
        });
        taskClick();
    }

    //Variables
    let taskId;
    let categoryId;

    /**
     * This is the category list rendering where select function is called .
     */
    var renderCategories = () => {
        categoryList.forEach(category => {
            $("#left_block").append("<div class='category' id='" + category.id + "'><i class='" + category.icon + "'></i><span>" + category.title + "</span></div>");
        });
    }

    /**
     * This adds the input to the category list in the left container
     * @returns suppose null value is given as input it returns to input
     */
    var addCategory = () => {
        const inputValue = $("#add-category").val();
        if (inputValue === "") return;

        let listData = {
            id: categoryList.length + 1,
            title: inputValue,
            icon: 'fa fa-list'
        };
        categoryList.push(listData);
        $("#left_block").html("");
        renderCategories();
        $("#add-category").val("");
    }

    /**
     * This function is activated when the class name is clicked in the document
     * @param  event 
     */
    var selectCategory = (event) => {
        $("#middle_container").addClass("visible-middle");
        categoryId = event.target.id;
        $("#middle_heading").html("<h3>" + categoryList[categoryId - 1].title + "</h3>");
        renderTask();
        $("#steptasks").html("");
        $("#task_title").html("");
        $("#add_task_input").val("");
    }

    /** 
     * Toggle button in the left container to toggle the category list
     */
    var toggleFunction = () => {
        $("#toggle_button").click(function() {
            $("#left_container").toggleClass("left-container-close");
            $("#toggle_button").toggleClass("fa-flip-horizontal");
        });
    }

    /**
     * Task rendering to display the tasks present in the task list array 
     *
     * @param task 
     */
    var renderTask = () => {
        $("#task_display").html("");
        for (let index = 0; index < taskList.length; index++) {
            if (categoryId === taskList[index].categoryId) {
                $("#task_display").append("<div class='subTaskAddition' id='" + taskList[index].id + "'><i class='" + taskList[index].icon + "'></i><span class='" + taskList[index].strike + "'>" + taskList[index].title + "</span><i class='" + taskList[index].importantIcon + "'></i></div>");
            }
        }
    }

    /**
     * Click event for the task for the category 
     */
    var taskClick = () => {
        $("#task_display").click(function(event) {
            if ("SPAN" === event.target.tagName || "fa fa-circle-thin" === event.target.className ||
                "fa fa-check-circle" === event.target.className) {
                strike(event);
            } else if ("fa fa-star-o" === event.target.className || "fa fa-star" === event.target.className) {
                important(event);
            }
            stepTask(event.target);
        });
    }

    /** 
     * Adding task to the array and rendering the list 
     */
    var addTask = () => {
        const inputValue = $("#add_task_input").val();
        if (inputValue === "") return;

        let taskListData = {
            id: taskList.length.toString(),
            title: inputValue,
            icon: 'fa fa-circle-thin',
            categoryId: categoryId,
            isCompleted: false,
            isImportant: false,
            importantIcon: 'fa fa-star-o',
            strike: 'taskInCompleted'
        };
        taskList.push(taskListData);
        $("#add_task_input").val("");
        renderTask();
    }

    /**
     * To find the index from the id of the task 
     *
     * @param taskList 
     * @param value 
     * @returns 
     */
    var indexfunction = (taskList, value) => {
        for (let index = 0; index < taskList.length; index++) {
            if (taskList[index].id === value) {
                return index;
            }
        }
    }

    /**
     * It is to mark the task as completed by getting the click event 
     *
     * @param  event 
     */
    var strike = (event) => {
        $("#right_container").addClass("visible-right");
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
    var important = (event) => {
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
    var taskComplete = (index) => {
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
    var importantSelect = (index) => {
        if (taskList[index].isImportant === true) {
            taskList[index].importantIcon = "fa fa-star";
        } else {
            taskList[index].importantIcon = "fa fa-star-o";
        }
    }

    /**
     * Rendering step task 
     */
    var renderStepTask = () => {
        for (let index = 0; index < addStepList.length; index++) {
            if (addStepList[index].categoryId === categoryId && addStepList[index].taskId === taskId) {
                $("#steptasks").append("<div class='stepAddition' id='stepAdd'><i class='fa fa-circle-thin'></i><span>" + addStepList[index].title +
                    "</span><i class='fa fa-star-o'></i></div>");
            }
        }
    }

    /**
     * step tasks pushed to the steplist array
     * @returns if null value is entered it returns 
     */
    var addSteps = () => {
        const stepInput = $("#input_task_step").val();
        if (stepInput === "") return;

        let stepData = {
            id: addStepList.length,
            title: stepInput,
            icon: 'fa fa-circle-thin',
            categoryId: categoryId,
            taskId: taskId
        };
        addStepList.push(stepData);
        $("#steptasks").html("");
        renderStepTask();
        $("#input_task_step").val("");
    }

    /**
     * Task title gets append to the step task value 
     * @param  steptask 
     */
    var stepTask = (steptask) => {
        taskId = steptask.parentElement.id;
        $("#task_title").html("<i class='" + taskList[taskId].icon + "'></i><span class='" + taskList[taskId].strike + "'>" + taskList[taskId].title + "</span><i class='" + taskList[taskId].importantIcon + "'></i>");
        $("#steptasks").html("");
        renderStepTask();
    }

    /**
     * This is the enter key event called when the input value is entered then add category is called
     * @param event 
     */
    var handleCategory = (event) => {
        if (event.keyCode === 13) addCategory();
    }

    $("#category-btn").click(addCategory);
    $("#add-category").keyup(handleCategory);

    $("#input_task_step").keyup(handleAdd);

    /**
     * This is the enter key event called when the input value is entered then add step is called
     * @param event 
     */
    function handleAdd(event) {
        if (event.keyCode === 13) addSteps();
    }

    /**
     * This is the enter key event called when the input value is entered then add Task is called
     * @param event 
     */
    var handleTask = (event) => {
        if (event.keyCode === 13) addTask();
    }

    $("#add_task_btn").click(addTask);
    $("#add_task_input").keyup(handleTask);

    init();
})();