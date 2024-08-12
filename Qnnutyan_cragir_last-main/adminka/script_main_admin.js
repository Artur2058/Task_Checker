// let theme_title=document.getElementById("theme_title");
// let task_title=document.getElementById("task_title");
// let description=document.getElementById("description");
// let solution=document.getElementById("solution");
// let theme_submit=document.getElementById("theme_submit");
// let task_submit=document.getElementById("task_submit");
// let themeList=document.getElementById("themeList");
// let taskList=document.getElementById("taskList");
// theme_submit.addEventListener("click", f1);
// task_submit.addEventListener("click", f2);
// function f1(){
//   let option=document.createElement("option");
//   option.innerHTML=theme_title.value;
//   themeList.appendChild(option);
// }

// function f2(){
//   let option=document.createElement("option");
//   option.innerHTML=task_title.value;
//   taskList.appendChild(option);
// }


// JavaScript


// document.addEventListener("DOMContentLoaded", () => {
//   const themeForm = document.getElementById("themeForm");
//   const themeList = document.getElementById("themeList");
//   const filterThemeList = document.getElementById("filterThemeList");
//   const taskForm = document.getElementById("taskForm");
//   const taskList = document.getElementById("taskList");
//   const taskDetails = document.getElementById("taskDetails");

//   const themes = [];
//   const tasks = [];

//   const addThemeToList = theme => {
//     const option = document.createElement("option");
//     option.value = theme.id;
//     option.textContent = theme.title;
//     themeList.appendChild(option);
//     filterThemeList.appendChild(option.cloneNode(true));
//   };

//   const addTaskToList = task => {
//     const option = document.createElement("option");
//     option.value = task.id;
//     option.textContent = `${task.title} (Theme: ${task.themeTitle})`;
//     taskList.appendChild(option);
//   };

//   const showTaskDetails = task => {
//     taskDetails.innerHTML = `
//       <h3>${task.title}</h3>
//       <p><strong>Theme:</strong> ${task.themeTitle}</p>
//       <p><strong>Description:</strong> ${task.description}</p>
//       <p><strong>Solution:</strong> ${task.solution}</p>
//     `;
//   };

//   const filterTasksByTheme = themeId => {
//     taskList.innerHTML = '<option value="" disabled selected>Select a Task</option>';
//     const filteredTasks = themeId ? tasks.filter(task => task.themeId == themeId) : tasks;
//     filteredTasks.forEach(addTaskToList);
//   };

//   taskList.addEventListener("change", () => {
//     const selectedTask = tasks.find(task => task.id == taskList.value);
//     if (selectedTask) {
//       showTaskDetails(selectedTask);
//     }
//   });

//   filterThemeList.addEventListener("change", () => {
//     filterTasksByTheme(filterThemeList.value);
//   });

//   themeForm.addEventListener("submit", event => {
//     event.preventDefault();

//     const newTheme = {
//       id: themes.length + 1,
//       title: themeForm.themeTitle.value,
//     };

//     themes.push(newTheme);
//     addThemeToList(newTheme);
//     themeForm.reset();
//   });

//   taskForm.addEventListener("submit", event => {
//     event.preventDefault();

//     const selectedTheme = themes.find(theme => theme.id == themeList.value);
//     if (!selectedTheme) {
//       alert("Please select a valid theme.");
//       return;
//     }

//     const newTask = {
//       id: tasks.length + 1,
//       title: taskForm.taskTitle.value,
//       description: taskForm.taskDescription.value,
//       solution: taskForm.taskSolution.value,
//       themeId: selectedTheme.id,
//       themeTitle: selectedTheme.title,
//     };

//     tasks.push(newTask);
//     addTaskToList(newTask);
//     taskForm.reset();
//   });
// });



// document.addEventListener("DOMContentLoaded", () => {
//   const themeForm = document.getElementById("themeForm");
//   const themeList = document.getElementById("themeList");
//   const filterThemeList = document.getElementById("filterThemeList");
//   const taskForm = document.getElementById("taskForm");
//   const taskList = document.getElementById("taskList");
//   const taskDetails = document.getElementById("taskDetails");

//   const loadThemes = async () => {
//     const response = await fetch('/themes');
//     const themes = await response.json();
//     themeList.innerHTML = '<option value="" disabled selected>Ընտրեք թեման</option>';
//     filterThemeList.innerHTML = '<option value="" disabled selected>Ընտրեք թեման ֆիլտրելու համար</option>';
//     themes.forEach(theme => {
//       addThemeToList(theme);
//     });
//   };

//   const loadTasks = async () => {
//     const response = await fetch('/tasks');
//     const tasks = await response.json();
//     taskList.innerHTML = '<option value="" disabled selected>Ընտրեք առաջադրանքը</option>';
//     tasks.forEach(task => {
//       addTaskToList(task);
//     });
//   };

//   const addThemeToList = theme => {
//     const option = document.createElement("option");
//     option.value = theme.id;
//     option.textContent = theme.title;
//     themeList.appendChild(option);
//     filterThemeList.appendChild(option.cloneNode(true));
//   };

//   const addTaskToList = task => {
//     const option = document.createElement("option");
//     option.value = task.id;
//     option.textContent = `${task.title} `;
//     taskList.appendChild(option);
//   };

//   const showTaskDetails = task => {
//     taskDetails.innerHTML = `
//       <h3>${task.title}</h3>
//       <p><strong>Թեմա:</strong> ${task.title}</p>
//       <p><strong>Նկարագրություն:</strong> ${task.description}</p>
//       <p><strong>Լուծում:</strong> ${task.solution}</p>
//     `;
//   };

//   const filterTasksByTheme = async themeId => {
//     const response_for_theme = await fetch('/themes');
//     const themes = await response_for_theme.json();
//     const response_for_task= await fetch('tasks');
//     const tasks = await response_for_task.json();
//     taskList.innerHTML = '<option value="" disabled selected>Ընտրեէ առաջադրանքը</option>';
//     tasks.forEach(item=>{
//       if(item.themeId==filterThemeList.options[filterThemeList.options.selectedIndex].innerHTML){
//         addTaskToList(item);
//       }
//     })
//   };

//   taskList.addEventListener("change", async () => {
//     const response = await fetch('/tasks');
//     const selectedTask = await response.json();
//     selectedTask.forEach(item => {
//       console.log(item.title, taskList.options[taskList.options.selectedIndex].innerHTML);
//       if (item.title.trim().toLowerCase() == taskList.options[taskList.options.selectedIndex].innerHTML.trim().toLowerCase()) {
//         showTaskDetails(item);
//       }
//     });
    
//   });

//   filterThemeList.addEventListener("change", () => {
//     filterTasksByTheme(filterThemeList.value);
//   });

//   themeForm.addEventListener("submit", async event => {
//     event.preventDefault();
//     const title = themeForm.themeTitle.value;
//     const response = await fetch('/themes', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title })
//     });
//     const newTheme = await response.json();
//     addThemeToList(newTheme);
//     themeForm.reset();
//   });

//   taskForm.addEventListener("submit", async event => {
//     event.preventDefault();
//     const title = taskForm.taskTitle.value;
//     const description = taskForm.taskDescription.value;
//     const solution = taskForm.taskSolution.value;
//     const themeId = themeList.options[themeList.options.selectedIndex].innerHTML;

//     const response = await fetch('/tasks', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title, description, solution, themeId })
//     });
//     const newTask = await response.json();
//     addTaskToList(newTask);
//     taskForm.reset();
//   });

//   loadThemes();
//   loadTasks();
// });


document.addEventListener("DOMContentLoaded", () => {
  const themeForm = document.getElementById("themeForm");
  const themeList = document.getElementById("themeList");
  const filterThemeList = document.getElementById("filterThemeList");
  const taskForm = document.getElementById("taskForm");
  const taskList = document.getElementById("taskList");
  const taskDetails = document.getElementById("taskDetails");
  const taskTypeSelect = document.getElementById("taskType");
  const taskSolutionContainer = document.getElementById("taskSolutionContainer");
  const multipleChoiceContainer = document.getElementById("multipleChoiceContainer");
  const addChoiceButton = document.getElementById("addChoice");
  const choicesContainer = document.getElementById("choices");
  const correctChoiceSelect = document.getElementById("correctChoice");

  taskTypeSelect.addEventListener("change", () => {
    if (taskTypeSelect.value === "multiple_choice") {
      taskSolutionContainer.style.display = "none";
      multipleChoiceContainer.style.display = "block";
    } else {
      taskSolutionContainer.style.display = "block";
      multipleChoiceContainer.style.display = "none";
    }
  });

  addChoiceButton.addEventListener("click", () => {
    const choiceCount = choicesContainer.children.length + 1;
    const newChoice = document.createElement("input");
    newChoice.type = "text";
    newChoice.className = "choice";
    newChoice.placeholder = `Ընտրանք ${choiceCount}`;
    choicesContainer.appendChild(newChoice);

    const newOption = document.createElement("option");
    newOption.value = choiceCount;
    newOption.textContent = `Ընտրանք ${choiceCount}`;
    correctChoiceSelect.appendChild(newOption);
  });

  const loadThemes = async () => {
    const response = await fetch('/themes');
    const themes = await response.json();
    themeList.innerHTML = '<option value="" disabled selected>Ընտրեք թեման</option>';
    filterThemeList.innerHTML = '<option value="" disabled selected>Ընտրեք թեման ֆիլտրելու համար</option>';
    themes.forEach(theme => {
      addThemeToList(theme);
    });
  };

  const loadTasks = async () => {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    taskList.innerHTML = '<option value="" disabled selected>Ընտրեք առաջադրանքը</option>';
    tasks.forEach(task => {
      addTaskToList(task);
    });
  };

  const addThemeToList = theme => {
    const option = document.createElement("option");
    option.value = theme.id;
    option.textContent = theme.title;
    themeList.appendChild(option);
    filterThemeList.appendChild(option.cloneNode(true));
  };

  const addTaskToList = task => {
    const option = document.createElement("option");
    option.value = task.id;
    option.textContent = `${task.title} `;
    taskList.appendChild(option);
  };

  const showTaskDetails = task => {
    taskDetails.innerHTML = `
      <h3>${task.title}</h3>
      <p><strong>Թեմա:</strong> ${task.title}</p>
      <p><strong>Նկարագրություն:</strong> ${task.description}</p>
      <p><strong>Լուծում:</strong> ${task.solution}</p>
    `;
  };

  const filterTasksByTheme = async themeId => {
    const response_for_theme = await fetch('/themes');
    const themes = await response_for_theme.json();
    const response_for_task = await fetch('tasks');
    const tasks = await response_for_task.json();
    taskList.innerHTML = '<option value="" disabled selected>Ընտրեք առաջադրանքը</option>';
    tasks.forEach(item => {
      if (item.themeId == filterThemeList.options[filterThemeList.selectedIndex].innerHTML) {
        addTaskToList(item);
      }
    });
  };

  taskList.addEventListener("change", async () => {
    const response = await fetch('/tasks');
    const selectedTask = await response.json();
    selectedTask.forEach(item => {
      console.log(item.title, taskList.options[taskList.selectedIndex].innerHTML);
      if (item.title.trim().toLowerCase() == taskList.options[taskList.selectedIndex].innerHTML.trim().toLowerCase()) {
        showTaskDetails(item);
      }
    });

  });

  filterThemeList.addEventListener("change", () => {
    filterTasksByTheme(filterThemeList.value);
  });

  themeForm.addEventListener("submit", async event => {
    event.preventDefault();
    const title = themeForm.themeTitle.value;
    const response = await fetch('/themes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    const newTheme = await response.json();
    addThemeToList(newTheme);
    themeForm.reset();
  });

  taskForm.addEventListener("submit", async event => {
    event.preventDefault();
    const title = taskForm.taskTitle.value;
    const description = taskForm.taskDescription.value;
    const themeId = themeList.options[themeList.selectedIndex].innerHTML;

    let solution = null;
    let choices = null;
    let correctChoice = null;

    if (taskTypeSelect.value === 'code') {
      solution = taskForm.taskSolution.value;
    } else if (taskTypeSelect.value === 'multiple_choice') {
      // choices = Array.from(choicesContainer.querySelectorAll(".choice")).map(input => input.value);
      for(let i=0; i<document.getElementsByClassName("choice").length; i++){
        if(choices==null){
          choices=(document.getElementsByClassName("choice")[i].value)+",";
        }
        choices+=(document.getElementsByClassName("choice")[i].value)+",";
      }
      correctChoice = correctChoiceSelect.value;
    }

    const response = await fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, solution, themeId, choices, correctChoice, type: taskTypeSelect.value })
    });
    const newTask = await response.json();
    addTaskToList(newTask);
    taskForm.reset();
  });

  loadThemes();
  loadTasks();
});
