module.exports = {
  extends: "lighthouse:default",
  settings: {
    emulatedFormFactor: "desktop",
    output: ["json"],
    maxWaitForFcp: 15 * 1000,
    maxWaitForLoad: 35 * 1000,
  },
};
