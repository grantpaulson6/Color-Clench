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

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst Train = __webpack_require__(/*! ./train */ \"./src/train.js\");\nconst TrackTile = __webpack_require__(/*! ./track_tile */ \"./src/track_tile.js\");\n\nclass Game {\n    constructor({difficulty, canvasEl}) {\n        this.difficulty = difficulty;\n        this.objects = [];\n        this.colors = ['slateblue', 'khaki', 'crimson','olive','coral', 'lightpink', 'orchid','lime','darkcyan','aqua'];\n        this.score = 0;\n        this.trainCount = 0;\n\n        this.buildTrack();\n        this.addTrain();\n        this.ctx = this.setupCanvas(canvasEl);\n        window.requestAnimationFrame(() => this.animate(this.ctx));\n    }\n\n\n\n    setupCanvas(canvasEl) {\n        canvasEl.addEventListener('click', e => {\n            const x = event.pageX - canvasEl.offsetLeft;\n            const y = event.pageY - canvasEl.offsetTop;\n\n\n            if (Math.abs(x - this.objects[1].pos[0]) < 10 && Math.abs(y - this.objects[1].pos[1])) {\n                this.objects[1].toggleNextTrack();\n            }\n        });\n\n        canvasEl.width = 600;\n        canvasEl.height = 600;\n        return canvasEl.getContext('2d');\n    }\n\n    animate(ctx) {\n        ctx.clearRect(0, 0, 600, 600);\n        this.objects.forEach(object => {\n            object.draw(ctx);\n        });\n        requestAnimationFrame(() => this.animate(ctx));\n    }\n\n    buildTrack() {\n        let nextTrackTile5 = new TrackTile({ pos: [500, 100], nextTrackTiles: [], color: 'blue' });\n        let nextTrackTile4 = new TrackTile({ pos: [400, 100], nextTrackTiles: [nextTrackTile5] });\n        let nextTrackTile3 = new TrackTile({ pos: [400, 200], nextTrackTiles: [nextTrackTile4] });\n        let nextTrackTile2 = new TrackTile({ pos: [200, 200], nextTrackTiles: [], color: 'green' });\n        let nextTrackTile1 = new TrackTile({ pos: [300, 200], nextTrackTiles: [nextTrackTile2, nextTrackTile3] });\n        let startTrackTile = new TrackTile({ pos: [300, 300], nextTrackTiles: [nextTrackTile1] });\n        let train = new Train({ startTrackTile, color: 'blue' });\n\n        this.objects = [startTrackTile, nextTrackTile1, nextTrackTile2, nextTrackTile3, nextTrackTile4, nextTrackTile5, train];\n    }\n\n    addTrain() {\n        if (this.trainCount < 20) {\n            this.trainCount += 1;\n            window.setTimeout(() => {\n                this.objects.push(new Train({ startTrackTile: this.objects[0], color: this.colors[Math.floor(Math.random() * this.difficulty)]}));\n                this.addTrain();\n            }, 1000 + Math.random() * 2000);\n        }\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    const canvasEl = document.getElementById('game-canvas');\n    new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({canvasEl, difficulty: 4});\n\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/track_tile.js":
/*!***************************!*\
  !*** ./src/track_tile.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass TrackTile {\n    constructor({ pos, nextTrackTiles, color }) {\n        this.pos = pos;\n        this.nextTrackTileIndex = 0;\n        this.nextTrackTiles = nextTrackTiles;\n        this.nextTrackTile = this.nextTrackTiles[0];\n        this.toggleable = nextTrackTiles.length > 1 ? true : false;\n        this.color = color;\n    }\n\n    toggleNextTrack() {\n        this.nextTrackTileIndex = ((this.nextTrackTileIndex + 1) % this.nextTrackTiles.length);\n        this.nextTrackTile = this.nextTrackTiles[this.nextTrackTileIndex];\n    }\n\n    draw(ctx) {\n        if (this.color) {\n            ctx.fillStyle = this.color;\n            ctx.beginPath();\n            ctx.rect(this.pos[0] - 25, this.pos[1] - 25, 50, 50);\n            ctx.fill();\n        } else {\n            this.nextTrackTiles.forEach(nextTile => {\n                ctx.beginPath();\n                ctx.moveTo(this.pos[0], this.pos[1]);\n                ctx.lineTo(nextTile.pos[0], nextTile.pos[1]);\n                ctx.stroke();\n            });\n            if (this.toggleable) {\n                ctx.beginPath();\n                ctx.arc(this.pos[0], this.pos[1], 20, 0, 2 * Math.PI, true);\n                ctx.fillStyle = \"white\";\n                ctx.fill();\n                ctx.moveTo(this.pos[0], this.pos[1]);\n                ctx.lineTo(this.nextTrackTile.pos[0], this.nextTrackTile.pos[1]);\n                ctx.stroke();\n            }\n        }\n\n    }\n}\n\nmodule.exports = TrackTile;\n\n//# sourceURL=webpack:///./src/track_tile.js?");

/***/ }),

/***/ "./src/train.js":
/*!**********************!*\
  !*** ./src/train.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass Train {\n    constructor({ startTrackTile, color }) {\n        this.startTrackTile = startTrackTile;\n        this.endTrackTile = startTrackTile.nextTrackTile;\n        this.color = color;\n        this.pos = [startTrackTile.pos[0], startTrackTile.pos[1]];\n        this.renderCount = 0;\n        this.renderInterval = 120;\n    }\n\n\n    draw(ctx) {\n        if (!this.finished) {\n            ctx.fillStyle = this.color;\n            ctx.beginPath();\n            ctx.arc(this.pos[0], this.pos[1], 20, 0, 2 * Math.PI, true);\n            ctx.fill();\n            this.move();\n        }\n    }\n\n    move() {\n        const deltaX = (this.endTrackTile.pos[0] - this.startTrackTile.pos[0]) / this.renderInterval;\n        const deltaY = (this.endTrackTile.pos[1] - this.startTrackTile.pos[1]) / this.renderInterval;\n        this.pos[0] += deltaX;\n        this.pos[1] += deltaY;\n        this.renderCount += 1;\n        if (this.renderCount === this.renderInterval) {\n            if (this.endTrackTile.color) {\n                this.finished = true;\n                if (this.color === this.endTrackTile.color) {\n                    alert('you reached the correct station');\n                }\n            } else {\n                this.renderCount = 0;\n                this.startTrackTile = this.endTrackTile;\n                this.endTrackTile = this.endTrackTile.nextTrackTile;\n            }\n        }\n    }\n}\n\nmodule.exports = Train;\n\n//# sourceURL=webpack:///./src/train.js?");

/***/ })

/******/ });