// Simple a b testing for lighthouse metrics to compare website performance across versions.

const { readdirSync, readFileSync, writeFile } = require("fs");
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
let dirPath = "";
// And output from those files:
let obj1 = null;
let obj2 = null;
let finalObj = {};

const reindAndPush = function (sel, files) {
  let ind = [...files].indexOf(sel.file);
  ind > -1 ? files.splice(ind, 1) : files;
  filesArr.push(sel.file);
};

const dataFromArray = function (arr) {
  for (const file of arr) {
      try {
        let filePath = path.join(dirPath, file);
        const data = readFileSync(filePath, 'utf8');
        const dataJSON = JSON.parse(data);
          if (obj1 === null) {
              obj1 = dataJSON.audits.metrics.details.items[0]; 
          } else {
              obj2 = dataJSON.audits.metrics.details.items[0];
          }
      } catch (err) {
        console.error(err)
      }
    }
}

const mutateObjs = function(objOne, objTwo) {
  for (const [key, val] of Object.entries(objOne)) {
    if (key === "observedTimeOrigin") {
      break
    }
    finalObj[key] = [];
    finalObj[key].push(val);
  }
  for (const [key, val] of Object.entries(objTwo)) {
    if (key === "observedTimeOrigin") {
      break
    }
    finalObj[key].push(val);
  }
}

// Write the output to file:
const writeOut = function(data) {
  const filename = filesArr[0].slice(0, -5).concat("comp.csv");
  writeFile(filename, extractAsCSV(data), err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Success! Saved as ${filename}.`);
    }
  })
}

const extractAsCSV = function (data) {
  const header = [`Metrics:, ${filesArr[0].slice(0, -5)}, ${filesArr[1].slice(0, -5)}`];
  const rows = Object.entries(data).map(datum => `${datum[0]}:, ${datum[1]}`);
  return header.concat(rows).join('\n');
}

// Run the command line questions
inquirer
  .prompt(directories)
  .then(function (selection) {
    dirPath = path.join(__dirname, selection.directory);
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
            dataFromArray(filesArr);
            mutateObjs(obj1, obj2);
            writeOut(finalObj);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  })
  .catch((err) => console.error(err));
