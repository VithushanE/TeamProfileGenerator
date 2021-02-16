const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require('util')
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const writeFileAsync = util.promisify(fs.writeFile)
const render = require("./lib/htmlRenderer");

const employees = []


function newMemberType() {
    inquirer.prompt(
        [
            {
                type: "confirm",
                message: "Would you like to add another memeber?",
                name: "anotherMember"
            }
        ]
    )
        .then(val => {
            if (val.anotherMember) { teamMember() }
            else {
                finishTeam()
            }

        })
}

// when all outputs are done, we want the array to be sent here 
async function finishTeam() {
    const rendering = await render(employees)
    await writeFileAsync(outputPath, rendering)

}

function teamMember() {
    inquirer.prompt(
        [
            {
                type: "list",
                message: "what kind of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern"
                ],
                name: "choice"
            }
        ]
    )
        .then(val => {
            if (val.choice === "Engineer") {
                engineerInformation()
            }
            else { internInformation() }

        })
}

// Create functions to get information for manager, 
function managerInformation() {
    inquirer.prompt(
        [
            {
                type: "input",
                message: "Please input your name",
                name: "name"
            },
            {
                type: "input",
                message: "Please enter your employee ID",
                name: "id"

            },
            {
                type: "input",
                message: "Please enter your email address ",
                name: "email"
            },

            {
                type: "input",
                message: "Please enter your office number here",
                name: "office number"

            }

        ]

    )
    .then(val => {
        const manager = new Manager(val.name, val.id, val.email, val.school)
        employees.push(manager)
        newMemberType()
    })
}


function engineerInformation() {
    inquirer.prompt(
        [
            {
                type: "input",
                message: "Please input engineer name",
                name: "name"
            },
            {
                type: "input",
                message: "Please enter your employee ID",
                name: "id"

            },
            {
                type: "input",
                message: "Please enter your email address ",
                name: "email"
            },

            {
                type: "input",
                message: "Please enter your GitHub username here",
                name: "office number"

            }

        ]

    )
        .then(val => {
            const engineer = new Engineer(val.name, val.id, val.email, val.school)
            employees.push(engineer)
            newMemberType()
        })
}

function internInformation() {
    inquirer.prompt(
        [
            {
                type: "input",
                message: "Please input intern name",
                name: "name"
            },
            {
                type: "input",
                message: "Please enter your employee ID",
                name: "id"

            },
            {
                type: "input",
                message: "Please enter your email address ",
                name: "email"
            },

            {
                type: "input",
                message: "Please enter the name of your school here",
                name: "school"

            }

        ]

    )
        .then(val => {
            const intern = new Intern(val.name, val.id, val.email, val.school)
            employees.push(intern)
            newMemberType()
        })

}

async function init(){
try {await managerInformation();}
catch (err){
console.log(err) }
}
init()


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
