//Import external configuration file:
const config = require("./custom-config.js");
const fs = require("fs");
const path = require("path");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

const urls = [
  "https://www.ashleybregmanlcsw.com/"
  // "file:///Users/jr3567/lumenBanner/about.html",
  // "file:///Users/jr3567/lumenBanner/municipal.html",
  // "file:///Users/jr3567/lumenBanner/commercial.html",
  // "file:///Users/jr3567/lumenBanner/options.html"
];

const wait = function (val) {
  return new Promise((resolve) => setTimeout(resolve, val));
};

const printResults = function (res, inputURL) {
  // `.lhr` is the Lighthouse Result as a JS object
  if (res.lhr.finalUrl != inputURL) {
    console.log(
      `WARNING: Input URL does not match the final URL. Results may be affected. Change input URL to match final URL: ${res.lhr.finalUrl}`
    );
  }
  console.log("Report is done for", res.lhr.finalUrl);
};

const makeFile = function (res, content, emu, filetype) {
  const currentTime = new Date().toISOString().slice(0, 16);
  let finalURL = res.lhr.finalUrl.split("/");
  let dirName;
  // Do a conditional statement here based on the length of finalURL that makes sure directories don't end up named 'undefined'.
  finalURL.length <= 4
    ? (dirName = `${finalURL[2]}_${emu}`)
    : (dirName = `${finalURL[3]}_${finalURL[4]}_${emu}`);
  fs.mkdirSync(`${dirName}`, { recursive: true }, (error) => {
    if (error) console.error("error creating directory", error);
  });
  let baseDir = path.join(__dirname, `/${dirName}/`);
  fs.writeFile(
    `${baseDir}${finalURL[finalURL.length - 2]}-${currentTime}.${filetype}`,
    content,
    (err) => {
      if (err) throw err;
      console.log("Results Received");
    }
  );
};

const runLH = function (inputURL) {
  //Only grab the first item if there are accidentally more
  inputURL.length > 1 ? (inputURL = inputURL[0]) : null;
  chromeLauncher
    .launch({ chromeFlags: ["--headless"] })
    .then((chrome, err) => {
      if (err) {
        console.error(`Chromelauncher error: ${err}`);
      } else {
        console.log(`The input URL is: ${inputURL}`);
        const options = {
          port: chrome.port,
        };
        lighthouse(inputURL, options, config)
          .then((runnerResult, err) => {
            if (err) {
              console.error(`Runner result error: ${err}`);
            } else {
              // `.report` is the HTML report as a string
              console.log("Creating Report...");
              const reportHtml = runnerResult.report;

              printResults(runnerResult, inputURL);
              makeFile(
                runnerResult,
                reportHtml,
                config.settings.emulatedFormFactor,
                config.settings.output
              );
              wait(500)
                .then((res) => {
                  chrome.kill();
                  console.log("Chrome Dead");
                })
                .catch((error) => {
                  console.error(error);
                });
            }
          })
          .catch((error) => console.error(error));
      }
    })
    .catch((error) => console.error(error));
};

runLH(urls);
