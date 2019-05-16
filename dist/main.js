/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Train = __webpack_require__(/*! ./train */ \"./src/train.js\");\nconst TrackTile = __webpack_require__(/*! ./track_tile */ \"./src/track_tile.js\");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    const canvasEl = document.getElementById('game-canvas');\n    canvasEl.width = 600;\n    canvasEl.height = 600;\n\n\n    const ctx = canvasEl.getContext('2d');\n\n\n    let nextTrackTile3 = new TrackTile({ pos: [400, 200], nextTrackTiles: [] });\n    let nextTrackTile2 = new TrackTile({ pos: [200, 200], nextTrackTiles: [] });\n    let nextTrackTile1 = new TrackTile({ pos: [300, 200], nextTrackTiles: [nextTrackTile2, nextTrackTile3] });\n    let startTrackTile = new TrackTile({ pos: [300, 300], nextTrackTiles: [nextTrackTile1] });\n    let train = new Train({ startTrackTile, color: 'red' });\n\n\n    canvasEl.addEventListener('click', e => {\n        const x = event.pageX - canvasEl.offsetLeft;\n        const y = event.pageY = canvasEl.offsetTop;\n\n        if (Math.abs(x - nextTrackTile1.pos[0]) < 10 && Math.abs(y - nextTrackTile1.pos[1])) {\n            nextTrackTile1.toggleNextTrack();\n        }\n    });\n\n    nextTrackTile1.draw(ctx);\n    const animate = () => {\n        train.draw(ctx);\n        train.move();\n        requestAnimationFrame(animate);\n    };\n\n    window.requestAnimationFrame(animate);\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/track_tile.js":
/*!***************************!*\
  !*** ./src/track_tile.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass TrackTile {\n    constructor({ pos, nextTrackTiles }) {\n        this.pos = pos;\n        this.nextTrackTileIndex = 0;\n        this.nextTrackTiles = nextTrackTiles;\n        this.nextTrackTile = this.nextTrackTiles[0];\n        this.toggleable = nextTrackTiles.length > 1 ? true : false;\n    }\n\n    toggleNextTrack() {\n        this.nextTrackTileIndex = ((this.nextTrackTileIndex + 1) % this.nextTrackTiles.length);\n        this.nextTrackTile = this.nextTrackTiles[this.nextTrackTileIndex];\n    }\n\n    draw(ctx) {\n        ctx.beginPath();\n        ctx.arc(this.pos[0], this.pos[1], 20, 0, 2 * Math.PI, true);\n        ctx.stroke();\n    }\n}\n\nmodule.exports = TrackTile;\n\n//# sourceURL=webpack:///./src/track_tile.js?");

/***/ }),

/***/ "./src/train.js":
/*!**********************!*\
  !*** ./src/train.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass Train {\n    constructor({ startTrackTile, color }) {\n        this.startTrackTile = startTrackTile;\n        this.endTrackTile = startTrackTile.nextTrackTile;\n        this.color = color;\n        this.pos = [startTrackTile.pos[0], startTrackTile.pos[1]];\n    }\n\n\n    draw(ctx) {\n        ctx.fillStyle = this.color;\n        ctx.beginPath();\n        ctx.arc(this.pos[0], this.pos[1], 20, 0, 2 * Math.PI, true);\n        ctx.fill();\n    }\n\n    move() {\n        const deltaX = (this.endTrackTile.pos[0] - this.startTrackTile.pos[0]) / 100;\n        const deltaY = (this.endTrackTile.pos[1] - this.startTrackTile.pos[1]) / 100;\n        this.pos[0] += deltaX;\n        this.pos[1] += deltaY;\n        if (this.pos[0] === this.endTrackTile.pos[0] && this.pos[1] === this.endTrackTile.pos[1]) {\n            this.startTrackTile = this.endTrackTile;\n            this.endTrackTile = this.endTrackTile.nextTrackTile;\n        }\n    }\n}\n\nmodule.exports = Train;\n\n//# sourceURL=webpack:///./src/train.js?");

/***/ })

/******/ });