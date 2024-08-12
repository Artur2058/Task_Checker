// const express = require('express');
// const bodyParser = require('body-parser');
// const { spawn } = require('child_process');
// const { VM } = require('vm2');
// const fs = require('fs');
// const app = express();
// const port = 3000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

// app.post('/check', async (req, res) => {
//   const { language, expectedResult, solution } = req.body;

//   let logOutput = '';
//   let responded = false;

//   const sendResponse = (success, message, output) => {
//     if (!responded) {
//       responded = true;
//       res.json({ success, message, logOutput: output });
//     }
//   };

//   try {
//     if (language === 'javascript') {
//       const customConsole = {
//         log: (...args) => {
//           logOutput += args.join(' ') + '\n';
//         }
//       };

//       const vm = new VM({
//         timeout: 1000,
//         sandbox: { console: customConsole }
//       });

//       vm.run(solution);

//       const isCorrect = logOutput.trim() === expectedResult.trim();
//       const responseMessage = isCorrect
//         ? 'Լուծումը ճիշտ է!'
//         : `Լուծումը սխալ է. Պետք է ստացվեր: ${expectedResult}, բայց դու ստացել ես: ${logOutput.trim()}`;

//       sendResponse(isCorrect, responseMessage, logOutput);
//     } else if (language === 'python') {
//       const pythonProcess = spawn('python', ['-c', solution]);

//       let result = '';
//       let error = '';

//       pythonProcess.stdout.on('data', (data) => {
//         result += data.toString();
//       });

//       pythonProcess.stderr.on('data', (data) => {
//         error += data.toString();
//       });

//       pythonProcess.on('close', (code) => {
//         if (code === 0) {
//           const isCorrect = result.trim() === expectedResult.trim();
//           const responseMessage = isCorrect
//             ? 'Լուծումը ճիշտ է!'
//             : `Լուծումը սխալ է. Պետք է ստացվեր: ${expectedResult}, բայց դու ստացել ես: ${result.trim()}`;
//           sendResponse(isCorrect, responseMessage, result);
//         } else {
//           console.error('Python կոդի կատարման սխալ.: ', error);
//           sendResponse(false, 'Python կոդի կատարման սխալ.', error);
//         }
//       });
//     } else if (language === 'csharp') {
//       const filePath = 'Program.cs';
//       fs.writeFileSync(filePath, solution);
//       const csharpProcess = spawn('dotnet', ['run', filePath]);

//       let result = '';
//       let error = '';

//       csharpProcess.stdout.on('data', (data) => {
//         result += data.toString();
//       });

//       csharpProcess.stderr.on('data', (data) => {
//         error += data.toString();
//       });

//       csharpProcess.on('close', (code) => {
//         if (code === 0) {
//           const isCorrect = result.trim() === expectedResult.trim();
//           const responseMessage = isCorrect
//             ? 'Լուծումը ճիշտ է!'
//             : `Լուծումը սխալ է. Պետք է ստացվեր: ${expectedResult}, բայց դու ստացել ես: ${result.trim()}`;
//           sendResponse(isCorrect, responseMessage, result);
//         } else {
//           console.error('C# կոդի կատարման սխալ.: ', error);
//           sendResponse(false, 'C# կոդի կատարման սխալ.: ', error);
//         }
//       });
//     } else if (language === 'java') {
//       const javaFilePath = 'Main.java';
//       const fileContent = `public class Main { public static void main(String[] args) { ${solution} } }`;
//       fs.writeFileSync(javaFilePath, fileContent);

//       const javacProcess = spawn('javac', [javaFilePath]);

//       javacProcess.stderr.on('data', (data) => {
//         sendResponse(false, 'Java կոդի կոմպիլյացիայի սխալ.: ' + data.toString(), data.toString());
//       });

//       javacProcess.on('close', (code) => {
//         if (code === 0) {
//           const javaProcess = spawn('java', ['Main']);
          
//           let result = '';
//           let error = '';

//           javaProcess.stdout.on('data', (data) => {
//             result += data.toString();
//           });

//           javaProcess.stderr.on('data', (data) => {
//             error += data.toString();
//           });

//           javaProcess.on('close', (code) => {
//             if (code === 0) {
//               const isCorrect = result.trim() === expectedResult.trim();
//               const responseMessage = isCorrect
//                 ? 'Լուծումը ճիշտ է!'
//                 : `Լուծումը սխալ է. Պետք է ստացվեր: ${expectedResult}, բայց դու ստացել ես: ${result.trim()}`;
//               sendResponse(isCorrect, responseMessage, result);
//             } else {
//               console.error('Java կոդի կատարման սխալ.: ', error);
//               sendResponse(false, 'Java կոդի կատարման սխալ.: ', error);
//             }
//           });
//         }
//          else {
//           javacProcess.stderr.on('data', (data) => {
//             sendResponse(false, 'Java կոդի կոմպիլյացիայի սխալ.: ' + data.toString(), data.toString());
//           });
//         }
//       });
//     } else if (language === 'cpp') {
//       const cppFilePath = 'solution.cpp';
//       const fileContent=`#include <iostream>

//       int main() {
//           ${solution}
//           return 0;
//       }`;
//       fs.writeFileSync(cppFilePath, fileContent);
//       const cppProcess = spawn('g++', ['-o', 'solution', 'solution.cpp']);
    
//       let result = '';
//       let error = '';
    
//       cppProcess.stderr.on('data', (data) => {
//         error += data.toString();
//       });
    
//       cppProcess.on('close', (code) => {
//         if (code === 0) {
//           const cppRunProcess = spawn('./solution');
    
//           cppRunProcess.stdout.on('data', (data) => {
//             result += data.toString();
//           });
    
//           cppRunProcess.stderr.on('data', (data) => {
//             error += data.toString();
//           });
    
//           cppRunProcess.on('close', (code) => {
//             if (code === 0) {
//               const isCorrect = result.trim() === expectedResult.trim();
//               const responseMessage = isCorrect
//               ? 'Լուծումը ճիշտ է!'
//               : `Լուծումը սխալ է. Պետք է ստացվեր: ${expectedResult}, բայց դու ստացել ես: ${result.trim()}`;
//               sendResponse(isCorrect, responseMessage, result);
//             } else {
//               console.error('C++ կոդի կատարման սխալ.: ', error);
//               sendResponse(false, 'C++ կոդի կատարման սխալ.: ', error);
//             }
//           });
//         } else {
//           console.error('C++ կոդի կատարման սխալ.: ', error);
//               sendResponse(false, 'C++ կոդի կատարման սխալ.: ', error);
//         }
//       });
//     }
//     else {
//       sendResponse(false, "Չկա նման լեզու: ", "");
//     }
//   } catch (error) {
//     console.error("Սխալ:", error);
//     sendResponse(false, "Սխալ: " + error.message, "");
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });




const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const { VM } = require('vm2');
const fs = require('fs');
const Sequelize =require("sequelize");
const app = express();
const port = 3000;
const db_for_theme=require("./db_for_theme");
const db_for_task=require("./db_for_task");
const theme=db_for_theme.theme;
const task=db_for_task.task;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("adminka"));

app.post('/check', async (req, res) => {
  const { language, expectedResult, solution } = req.body;

  let logOutput = '';
  let responded = false;

  const sendResponse = (success, message, output) => {
    if (!responded) {
      responded = true;
      res.json({ success, message, logOutput: output });
    }
  };

  try {
    if (language === 'javascript') {
      const customConsole = {
        log: (...args) => {
          logOutput += args.join(' ') + '\n';
        }
      };

      const vm = new VM({
        timeout: 1000,
        sandbox: { console: customConsole }
      });

      vm.run(solution);

      const isCorrect = logOutput.trim() === expectedResult.trim();
      const responseMessage = isCorrect
        ? 'Լուծումը ճիշտ է!'
        : `Լուծումը սխալ է. Պետք է ստացվեր: ${expectedResult}, բայց դու ստացել ես: ${logOutput.trim()}`;

      sendResponse(isCorrect, responseMessage, logOutput);
    } else if (language === 'python') {
      const pythonProcess = spawn('python', ['-c', solution]);

      let result = '';
      let error = '';

      pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        error += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          const isCorrect = result.trim() === expectedResult.trim();
          const responseMessage = isCorrect
            ? 'Լուծումը ճիշտ է!'
            : `Լուծումը սխալ է. Պետք է ստացվեր: ${expectedResult}, բայց դու ստացել ես: ${result.trim()}`;
          sendResponse(isCorrect, responseMessage, result);
        } else {
          console.error('Python կոդի կատարման սխալ.: ', error);
          sendResponse(false, 'Python կոդի կատարման սխալ.', error);
        }
      });
    } else if (language === 'csharp') {
      const filePath = 'Program.cs';
      fs.writeFileSync(filePath, solution);
      const csharpProcess = spawn('dotnet', ['run', filePath]);

      let result = '';
      let error = '';

      csharpProcess.stdout.on('data', (data) => {
        result += data.toString();
      });

      csharpProcess.stderr.on('data', (data) => {
        error += data.toString();
      });

      csharpProcess.on('close', (code) => {
        if (code === 0) {
          const isCorrect = result.trim() === expectedResult.trim();
          const responseMessage = isCorrect
            ? 'Լուծումը ճիշտ է!'
            : `Լուծումը սխալ է. Պետք է ստացվեր: ${expectedResult}, բայց դու ստացել ես: ${result.trim()}`;
          sendResponse(isCorrect, responseMessage, result);
        } else {
          console.error('C# կոդի կատարման սխալ.: ', error);
          sendResponse(false, 'C# կոդի կատարման սխալ.: ', error);
        }
      });
    } else if (language === 'java') {
      const javaFilePath = 'Main.java';
      const fileContent =solution;
      fs.writeFileSync(javaFilePath, fileContent);

      const javacProcess = spawn('javac', [javaFilePath]);

      javacProcess.stderr.on('data', (data) => {
        sendResponse(false, 'Java կոդի կոմպիլյացիայի սխալ.: ' + data.toString(), data.toString());
      });

      javacProcess.on('close', (code) => {
        if (code === 0) {
          const javaProcess = spawn('java', ['Main']);
          
          let result = '';
          let error = '';

          javaProcess.stdout.on('data', (data) => {
            result += data.toString();
          });

          javaProcess.stderr.on('data', (data) => {
            error += data.toString();
          });

          javaProcess.on('close', (code) => {
            if (code === 0) {
              const isCorrect = result.trim() === expectedResult.trim();
              const responseMessage = isCorrect
                ? 'Լուծումը ճիշտ է!'
                : `Լուծումը սխալ է. Պետք է ստացվեր: ${expectedResult}, բայց դու ստացել ես: ${result.trim()}`;
              sendResponse(isCorrect, responseMessage, result);
            } else {
              console.error('Java կոդի կատարման սխալ.: ', error);
              sendResponse(false, 'Java կոդի կատարման սխալ.: ', error);
            }
          });
        }
         else {
          javacProcess.stderr.on('data', (data) => {
            sendResponse(false, 'Java կոդի կոմպիլյացիայի սխալ.: ' + data.toString(), data.toString());
          });
        }
      });
    } else if (language === 'cpp') {
      const cppFilePath = 'solution.cpp';
      const fileContent=solution;
      fs.writeFileSync(cppFilePath, fileContent);
      const cppProcess = spawn('g++', ['-o', 'solution', 'solution.cpp']);
    
      let result = '';
      let error = '';
    
      cppProcess.stderr.on('data', (data) => {
        error += data.toString();
      });
    
      cppProcess.on('close', (code) => {
        if (code === 0) {
          const cppRunProcess = spawn('./solution');
    
          cppRunProcess.stdout.on('data', (data) => {
            result += data.toString();
          });
    
          cppRunProcess.stderr.on('data', (data) => {
            error += data.toString();
          });
    
          cppRunProcess.on('close', (code) => {
            if (code === 0) {
              const isCorrect = result.trim() === expectedResult.trim();
              const responseMessage = isCorrect
              ? 'Լուծումը ճիշտ է!'
              : `Լուծումը սխալ է. Պետք է ստացվեր: ${expectedResult}, բայց դու ստացել ես: ${result.trim()}`;
              sendResponse(isCorrect, responseMessage, result);
            } else {
              console.error('C++ կոդի կատարման սխալ.: ', error);
              sendResponse(false, 'C++ կոդի կատարման սխալ.: ', error);
            }
          });
        } else {
          console.error('C++ կոդի կատարման սխալ.: ', error);
              sendResponse(false, 'C++ կոդի կատարման սխալ.: ', error);
        }
      });
    }
    else {
      sendResponse(false, "Չկա նման լեզու: ", "");
    }
  } catch (error) {
    console.error("Սխալ:", error);
    sendResponse(false, "Սխալ: " + error.message, "");
  }
});


app.get("/themes", async (req, res)=>{
  const themes = await theme.findAll();
  res.json(themes);
})

app.post('/themes', async (req, res) => {
  const { title } = req.body;
  const newTheme = await theme.create({ title });
  res.json(newTheme);
});

app.get('/tasks', async (req, res) => {
  const tasks = await task.findAll();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const { title, description, solution, themeId, choices, correctChoice, type } = req.body;
  const newTask = await task.create({ themeId, title, description, solution, type, choices, correctChoice});
  res.json(newTask);
});


app.post('/check-answer', async (req, res) => {
  const {taskDescription, selectedValue} = req.body;
  let isCorrect = false;
  const tasks = await task.findAll();
    
  tasks.forEach(task => {
    if (task.description.trim().toLowerCase() === taskDescription.trim().toLowerCase() && task.correctChoice.trim().toLowerCase() === selectedValue.trim().toLowerCase()) {
      isCorrect = true;
      console.log(task.correctChoice)
    }
  });
  try {
    

    const message = isCorrect ? 'Պատասխանը ճիշտ է' : 'Պատասխանը սխալ է';
    const logOutput = `Ընտրված պատասխան: ${selectedValue}`;
    res.json({ message, logOutput });
  } catch (error) {
    console.error('Սխալ:', error);
    res.status(500).json({ message: 'Սխալ' });
  }


  // const tasks=await task.findAll();

  // tasks.forEach(task=>{
  //   // task.forEach(element=>{
  //   //   console.log(task.description)
  //   // })
  //   console.log(task.description)
  // })
});


// app.get('/theme/:themeId', async (req, res) => {
//   const tasks = await task.findAll({ where: { themeId: req.params.themeId }});
//   res.json(tasks);
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
