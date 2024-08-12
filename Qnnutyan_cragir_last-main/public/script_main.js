
//  let editor = CodeMirror.fromTextArea(document.getElementById("solution"), {
//       lineNumbers: true,
//       mode: "javascript",
//       theme: "monokai"
//     });

//     function changeLanguage() {
//       const language = document.getElementById("language").value;
//       let mode;
//       switch(language) {
//         case "javascript":
//           mode = "javascript";
//           break;
//         case "python":
//           mode = "python";
//           break;
//         case "csharp":
//           mode = "text/x-csharp";
//           break;
//         case "java":
//           mode = "text/x-java";
//           break;
//         case "cpp":
//           mode = "text/x-c++src";
//           break;
//         default:
//           mode = "javascript";
//       }
//       editor.setOption("mode", mode);
//     }

//     function submitSolution() {
//       const language = document.getElementById("language").value;
//       const task = document.getElementById("task").value;
//       const expectedResult = document.getElementById("expectedResult").value;
//       const solution = editor.getValue();
      
//       fetch('/check', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ language, expectedResult, solution })
//       })
//       .then(response => response.json())
//       .then(data => {
//         document.getElementById('result').innerText = data.message;
//         document.getElementById('logOutput').innerText = data.logOutput;
//       })
//       .catch(error => console.error('Error:', error));
//     }


document.addEventListener("DOMContentLoaded", function() {
  const editor = CodeMirror.fromTextArea(document.getElementById("solution"), {
    lineNumbers: true,
    mode: "javascript",
    theme: "monokai",
    extraKeys: {
      "Ctrl-Space": "autocomplete",
      "Ctrl-/": "toggleComment",
      "Alt-F": "findPersistent"
    },
    hintOptions: {completeSingle: false}
  });

  function changeLanguage() {
    const language = document.getElementById("language").value;
    let mode;
    let template = "";

    switch(language) {
      case "javascript":
        mode = "javascript";
        template = "// Write your JavaScript code here\n";
        break;
      case "python":
        mode = "python";
        template = "# Write your Python code here\n";
        break;
      case "csharp":
        mode = "text/x-csharp";
        template = "using System;\n\nclass Program {\n    static void Main() {\n        // Write your C# code here\n    }\n}\n";
        break;
      case "java":
        mode = "text/x-java";
        template = "public class Main {\n    public static void main(String[] args) {\n        // Write your Java code here\n    }\n}\n";
        break;
      case "cpp":
        mode = "text/x-c++src";
        template = "#include <iostream>\n\nint main() {\n    // Write your C++ code here\n    return 0;\n}\n";
        break;
      default:
        mode = "javascript";
        template = "// Write your code here\n";
    }
    
    editor.setOption("mode", mode);
    editor.setValue(template);
  }

  document.getElementById("language").addEventListener("change", changeLanguage);

  editor.on("inputRead", function(cm, change) {
    if (!cm.state.completionActive && change.origin !== "setValue") {
      CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
    }
  });

  function submitSolution() {
    const language = document.getElementById("language").value;
    const task = document.getElementById("taskDescription").value;
    const expectedResult = document.getElementById("expectedResult").value;
    const solution = editor.getValue();
    const choice=document.getElementById("choice");

    fetch('/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ language, task, expectedResult, solution })
    })
    .then(response => response.json())
    .then(data => {
      if(choice.style.display==="none"){
        document.getElementById('result').innerText = data.message;
        document.getElementById('logOutput').innerText = data.logOutput;
      }
      else if(choice.style.display==="block"){
        document.getElementById('logOutput').innerText = data.logOutput;
      }
     
    })
    .catch(error => console.error('Error:', error));
  }

  window.submitSolution = submitSolution;

  changeLanguage();
});
