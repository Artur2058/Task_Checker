let x=1;
let arrOfTasks=[];
let selectedTaskIndex;
let selectedTheme;
let z=1;
document.addEventListener("DOMContentLoaded", () => {
    const themesList = document.getElementById("themes");
    const taskDescriptionTextArea = document.getElementById("taskDescription");
    const expectedResultTextArea = document.getElementById("expectedResult");
    const choice=document.getElementById("choice");
    const choices=document.getElementById("choices");

    const loadThemes = async () => {
      const response = await fetch('/themes');
      const themes = await response.json();
      themesList.innerHTML = '';
      themes.forEach(theme => {
        const li = document.createElement("li");
        li.textContent = theme.title;
        li.id= theme.title;
        li.addEventListener("click", loadTasks);
        themesList.appendChild(li);
      });
    };
  
    const loadTasks = async (event) => {
      const themeId = event.target.id;
      if (z === 1) {
          selectedTheme = themeId;
          const response = await fetch('/tasks');
          const selectedTask = await response.json();
          arrOfTasks = selectedTask;
          selectedTask.forEach(item => {
              if (item.themeId.trim().toLowerCase() === themeId.trim().toLowerCase()) {
                  const li = document.createElement("li");
                  li.textContent = item.title;
                  li.id = item.title;
                  li.addEventListener("click", loadTaskDetails);
                  event.target.appendChild(li);
              }
          });
          z++;
      } else {
          const selectedElement = document.getElementById(selectedTheme);
          if (selectedTheme === themeId) {
              if (selectedElement) {
                  selectedElement.innerHTML = selectedTheme + '';
              }
              z = 1;
          } else {
              if (selectedElement) {
                  selectedElement.innerHTML = selectedTheme + '';
              }
              const response = await fetch('/tasks');
              const selectedTask = await response.json();
              arrOfTasks = selectedTask;
              selectedTask.forEach(item => {
                  if (item.themeId.trim().toLowerCase() === themeId.trim().toLowerCase()) {
                      const li = document.createElement("li");
                      li.textContent = item.title;
                      li.id = item.title;
                      li.addEventListener("click", loadTaskDetails);
                      event.target.appendChild(li);
                  }
              });
              selectedTheme = themeId;
              z++;
          }
      }
  };
  
  
  
    const loadTaskDetails = async (event) => {
      const response = await fetch('/tasks');
      const selectedTask = await response.json();
      selectedTask.forEach(item => {
        if (item.title.trim() == event.target.id.trim()) {
          for(let i=0; i<arrOfTasks.length; i++){
            if(arrOfTasks[i].title == item.title){
              selectedTaskIndex = i;
            }
          }
            taskDescriptionTextArea.value = item.description;
            expectedResultTextArea.value = item.solution;
            if(item.type==="multiple_choice"){
              choices.innerHTML="";
              expectedResultTextArea.value = item.correctChoice;
              choice.style.display="block";
              const str = item.choices;
              const words = str.split(',');
              console.log(words.slice(0,-1));
    
              for(let i=1; i<words.length-1; i++){
                let input=document.createElement("input");
                input.type="radio";
                input.name="correctAnswer";
                input.value=i;
                const label = document.createElement('label');
                label.appendChild(input);
                label.appendChild(document.createTextNode(i+") "+words[i]));
                choices.appendChild(label);
              }
            }
            else if(item.type==="code"){
              choice.style.display="none";
              choices.innerHTML="";
            }
        }
      });
    };
 
   
    
    loadThemes();
  });
  
    const themesList = document.getElementById("themes");
    const taskDescriptionTextArea = document.getElementById("taskDescription");
    const expectedResultTextArea = document.getElementById("expectedResult");
    const choice=document.getElementById("choice");
    const choices=document.getElementById("choices");

  function nextTask(){
    taskDescriptionTextArea.value = arrOfTasks[selectedTaskIndex+1].description;
    expectedResultTextArea.value = arrOfTasks[selectedTaskIndex+1].solution;
    if(arrOfTasks[selectedTaskIndex+1].type==="multiple_choice"){
      choices.innerHTML="";
      expectedResultTextArea.value = arrOfTasks[selectedTaskIndex+1].correctChoice;
      choice.style.display="block";
      const str = arrOfTasks[selectedTaskIndex+1].choices;
      const words = str.split(',');
      console.log(words.slice(0,-1));

      for(let i=1; i<words.length-1; i++){
        let input=document.createElement("input");
        input.type="radio";
        input.name="correctAnswer";
        input.value=i;
        const label = document.createElement('label');
        label.appendChild(input);
        label.appendChild(document.createTextNode(i+") "+words[i]));
        choices.appendChild(label);
      }
      selectedTaskIndex = selectedTaskIndex+1;
    }
    else if(arrOfTasks[selectedTaskIndex+1].type==="code"){
      choice.style.display="none";
      choices.innerHTML="";
      selectedTaskIndex = selectedTaskIndex+1;
    }
    document.getElementById("result").innerHTML="";
    document.getElementById("logOutput").innerHTML="";
  }

function prevTask(){
    taskDescriptionTextArea.value = arrOfTasks[selectedTaskIndex-1].description;
    expectedResultTextArea.value = arrOfTasks[selectedTaskIndex-1].solution;
    if(arrOfTasks[selectedTaskIndex-1].type==="multiple_choice"){
      choices.innerHTML="";
      expectedResultTextArea.value = arrOfTasks[selectedTaskIndex-1].correctChoice;
      choice.style.display="block";
      const str = arrOfTasks[selectedTaskIndex-1].choices;
      const words = str.split(',');
      console.log(words.slice(0,-1));

      for(let i=1; i<words.length-1; i++){
        let input=document.createElement("input");
        input.type="radio";
        input.name="correctAnswer";
        input.value=i;
        const label = document.createElement('label');
        label.appendChild(input);
        label.appendChild(document.createTextNode(i+") "+words[i]));
        choices.appendChild(label);
      }
      selectedTaskIndex = selectedTaskIndex-1;
    }
    else if(arrOfTasks[selectedTaskIndex-1].type==="code"){
      choice.style.display="none";
      choices.innerHTML="";
      selectedTaskIndex = selectedTaskIndex-1;
    }
    document.getElementById("result").innerHTML="";
    document.getElementById("logOutput").innerHTML="";
}

  function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="correctAnswer"]:checked');
    if (!selectedAnswer) {
      alert('Խնդրում եմ ընտրեք պատասխանը');
      return;
    }
  
    const selectedValue = selectedAnswer.value;
  
    const taskDescription = document.getElementById("taskDescription").value;
    // const expectedResult = document.getElementById("expectedResult").value;
    // const solution = editor.getValue();
    // const language = document.getElementById("language").value;
  
    fetch('/check-answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskDescription,
        selectedValue, 
      }),
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('answerFeedback').innerText = data.message;
    })
    .catch(error => console.error('Սխալ', error));
  }