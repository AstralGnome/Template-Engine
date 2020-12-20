const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const inquirer = require("inquirer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeList = [];

// fs.writeFileSync("employees.html", render(employees));

//Ask for manager info
function managerInfo() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "manager",
        message: "Manager's name?",
      },
      {
        type: "input",
        name: "manager",
        message: "Manager's ID?",
      },
      {
        type: "input",
        name: "manager",
        message: "Manager's email?",
      },
      {
        type: "input",
        name: "manager",
        message: "Manager's office phone-number?",
      },
    ])
    .then((managerData) => {
      const newManager = new Manager(
        managerData.name,
        managerData.id,
        managerData.email,
        managerData.officeNumber
      );

      employeeList.push(newManager);

      questLoop();
    });
}

//Ask user for next employee type
function questLoop() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "questionLoop",
        choices: ["Engineer", "Intern", "I don't want to add ANY more team members!!!"],
      }
    ])
    .then((response) => {
      //If the selected employee is an engineer
      engineerInfo();
      //Else if the selected employee is an intern
      internInfo();
      //Else
      createHtmlFile();
    });
}

//Ask user for engineer info
function engineerInfo() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "engineer",
        message: "Engineer's name?",
      },
      {
        type: "input",
        name: "engineer",
        message: "Engineer's ID?",
      },
      {
        type: "input",
        name: "engineer",
        message: "Engineer's email?",
      },
      {
        type: "input",
        name: "engineer",
        message: "Engineer's GitHub Username?",
      },
    ])
    .then((engineerData) => {
      const newEngineer = new Engineer(
        engineerData.name,
        engineerData.id,
        engineerData.email,
        engineerData.github
      );

      employeeList.push(newEngineer);
      questLoop();
    });
}

//Ask user for intern info
function internInfo() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "intern",
        message: "Intern's name?",
      },
      {
        type: "input",
        name: "intern",
        message: "Intern's ID?",
      },
      {
        type: "input",
        name: "intern",
        message: "Intern's email?",
      },
      {
        type: "input",
        name: "intern",
        message: "Intern's school of record?",
      },
    ])
    .then((internData) => {
      const newIntern = new Intern(
        internData.name,
        internData.id,
        internData.email,
        internData.school
      );

      employeeList.push(newIntern);
      questLoop();
      
    });
  }
  function createHtmlFile() {
    
    const htmlContent = render(employeeList);

    // Use the FS module to create the output file 
    fs.writeFile(outputPath, htmlContent, (err) =>{
      if (err) throw err
      console.log("Success! This file has been written!");
    });
  }

  managerInfo();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

