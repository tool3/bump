module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(34);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 6:
/***/ (function() {

eval("require")("@actions/core");


/***/ }),

/***/ 34:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const core = __webpack_require__(6);
const exec = __webpack_require__(273);

async function run() {
  try { 
    const user = core.getInput('user');
    const email = core.getInput('email');
    const token = core.getInput('github_token');

    exec.exec('git pull origin master --tags');
    const ver = exec.exec('npm view version .');
    const version = JSON.stringify(ver).version;
    exec.exec('npm version --no-commit-hooks patch --dry-run');
    
    core.setOutput(version);
    core.setOutput(user);
    core.setOutput(email);
    core.setOutput(token);
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()


/***/ }),

/***/ 273:
/***/ (function() {

eval("require")("@actions/exec");


/***/ })

/******/ });