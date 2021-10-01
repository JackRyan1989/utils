// Simple a b testing for lighthouse metrics to compare website performance across versions.

// Load relevant json files
// Parse json
// Create object for test A
// Create object for test B
// Get json fields
// Put relevant fields in test A and test B objects
// Calculate differences between A and B

const { fs, readdirSync, statSync } = require("fs");
const path = require("path");
const inquirer = require("inquirer");

// Grab dirs
const baseDir = path.join(__dirname);
const getDirs = (baseDir) => {
  return readdirSync(baseDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
};
// dirs will be used by Inquirer to make a list for users to select from
let dirs = getDirs(baseDir);
// Grab sub files -- call this when the user has selected the directory they want to use
const getFiles = (dir) => {
  let parentDir = path.join(__dirname, dir);
  return readdirSync(parentDir).filter(
    (file) => path.extname(file).toLowerCase() === ".json"
  );
};

// Construct Inquirer prompts
const directories = [
  {
    type: "list",
    message: "Select the directory of the website you would like to work on.",
    choices: dirs,
    name: "directory",
  },
];

// Somewhere to put the files we want:
let filesArr = [];

const reindAndPush = function (sel, files) {
  let ind = [...files].indexOf(sel.file);
  ind > -1 ? files.splice(ind, 1) : files;
  filesArr.push(sel.file);
};

// Run the command line questions
inquirer
  .prompt(directories)
  .then(function (selection) {
    let files = getFiles(selection.directory);
    const fileList = [
      {
        type: "list",
        message: "Select the two files you would like to compare:",
        choices: files,
        name: "file",
      },
    ];
    inquirer
      .prompt(fileList)
      .then(function (selected) {
        reindAndPush(selected, files);
        inquirer
          .prompt(fileList)
          .then(function (selected) {
            reindAndPush(selected, files);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  })
  .catch((err) => console.error(err));

  // Ok so now the files we want are in the filesArr array. What do we do now? 
  // They're JSON, so we can parse them and treat them like objects. We can grab the values from the keys we are interested in.
  // Next step: Parse the json, and see what we have.
