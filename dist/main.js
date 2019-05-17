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
eval("__webpack_require__.r(__webpack_exports__);\nconst Train = __webpack_require__(/*! ./train */ \"./src/train.js\");\nconst TrackTile = __webpack_require__(/*! ./track_tile */ \"./src/track_tile.js\");\n\nclass Game {\n    constructor({difficulty, canvasEl}) {\n        this.difficulty = difficulty;\n        this.colors = ['slateblue', 'khaki', 'crimson', 'olive', 'coral', 'lightpink', 'orchid', 'lime', 'darkcyan', 'aqua'];\n        this.score = 0;\n\n        this.trainCount = 0;\n        this.branchCount = 0;\n        this.stationCount = 0;\n        this.requiredStations = difficulty;\n        this.trackNodes = {};\n\n        //use station count for train colors\n        this.trains = [];\n        this.intersections = [];\n        this.buildTrack();\n        this.addTrain();\n        this.ctx = this.setupCanvas(canvasEl);\n        window.requestAnimationFrame(() => this.animate(this.ctx));\n        // this.animate(this.ctx);\n    }\n\n\n\n    setupCanvas(canvasEl) {\n        canvasEl.addEventListener('click', e => {\n            const x = event.pageX - canvasEl.offsetLeft;\n            const y = event.pageY - canvasEl.offsetTop;\n\n            // this.toggleIntersection(this.rootNode, x, y);\n            this.intersections.forEach(intersection => {\n                if (Math.abs(x - intersection.pos[0]) < 10 && Math.abs(y - intersection.pos[1] < 10)) {\n                    console.log('it worked');\n                    intersection.toggleNextTrack();\n                }\n            });\n        });\n\n        canvasEl.width = 900;\n        canvasEl.height = 700;\n        return canvasEl.getContext('2d');\n    }\n\n    // toggleIntersection(node,x,y) {\n    //     if (Math.abs(x - node.pos[0]) < 10 && Math.abs(y - node.pos[1] < 10)) {\n    //         console.log('it worked');\n    //         node.toggleNextTrack();\n    //     }\n\n    //     this.intersections.forEach( intersection => {\n\n    //     })\n    //     node.nextTrackTiles.forEach( trackTile => {\n    //         this.toggleIntersection(trackTile, x, y);\n    //     });\n    // }\n\n    animate(ctx) {\n        ctx.clearRect(0, 0, 900, 700);\n        // this.objects.forEach(object => {\n        //     object.draw(ctx);\n        // });\n        this.rootNode.draw(ctx);\n        this.trains.forEach(train => {\n            train.draw(ctx);\n        });\n        requestAnimationFrame(() => this.animate(ctx));\n    }\n\n    buildTrack() {\n\n        //if root node: start branch count, randomly select initial location, and ensure only one child\n        this.branchCount += 1;\n        const pos = [Math.floor(Math.random() * 9) * 100 + 50, Math.floor(Math.random() * 7) * 100 + 50];\n        this.rootNode = new TrackTile({ pos: pos, nextTrackTiles: [] });\n        this.trackNodes[pos] = this.rootNode;\n\n\n        let validNodes = this.allValidNodes(pos);\n        let nextNodePos = this.randomValidNode(validNodes);\n        let nextChildNode = new TrackTile({ pos: nextNodePos, nextTrackTiles: []});\n        this.trackNodes[nextNodePos] = nextNodePos;\n        this.rootNode.addNextTile(nextChildNode);\n\n        const nodeQueue = [nextChildNode];\n        let nextNode;\n        let nextNode2;\n        let nextNodePos2;\n        let currentNode;\n        let nodeChildrenProbabilty;\n        let i = 0;\n\n        while (nodeQueue.length > 0) {\n\n            currentNode = nodeQueue[0];\n            nodeChildrenProbabilty = Math.floor(Math.random() * 3);\n            validNodes = this.allValidNodes(currentNode.pos);\n            nextNodePos = this.randomValidNode(validNodes);\n\n            // make a station, end that branch\n            if (nodeChildrenProbabilty === 2 && (this.branchCount - this.stationCount > 1) && validNodes.length > 0 && i > 3) {\n                this.stationCount += 1;\n                this.trackNodes[nextNodePos] = true;\n                nextNode = new TrackTile({ pos: nextNodePos, nextTrackTiles: [], color: this.colors[this.stationCount - 1] });\n                currentNode.addNextTile(nextNode);\n            } \n            // split and add a branch, adding two to queue\n            else if (this.branchCount < this.requiredStations && (nodeChildrenProbabilty === 2 || nodeChildrenProbabilty === 1) && validNodes.length > 1 && i > 3) {\n                this.branchCount += 1;\n                nextNode = new TrackTile({ pos: nextNodePos, nextTrackTiles: [] });\n                this.trackNodes[nextNodePos] = true;\n\n                nextNodePos2 = this.randomValidNode(this.allValidNodes(currentNode.pos));\n                this.trackNodes[nextNodePos2] = true;\n                nextNode2 = new TrackTile({ pos: nextNodePos2, nextTrackTiles: [] });\n\n                currentNode.addNextTile(nextNode);\n                currentNode.addNextTile(nextNode2);\n                this.intersections.push(currentNode);\n                nodeQueue.push(nextNode);\n                nodeQueue.push(nextNode2);\n            }\n\n            else {\n                // if more than 1 remaing station, just add one child, aka just plain track, add one to queue\n                if (validNodes.length > 0 && this.requiredStations - this.stationCount > 1) {\n                    nextNode = new TrackTile({ pos: nextNodePos, nextTrackTiles: [] });\n                    this.trackNodes[nextNodePos] = true;\n                    currentNode.addNextTile(nextNode);\n                    nodeQueue.push(nextNode);\n                    i++;\n                // if one remaing station, 1 in 2 shot of turning into station, else continue with one child\n                } else if (this.stationCount < this.requiredStations) {\n                    if (validNodes.length > 0 && Math.floor(Math.random() * 2) === 0) {\n                        nextNode = new TrackTile({ pos: nextNodePos, nextTrackTiles: [] });\n                        this.trackNodes[nextNodePos] = true;\n                        currentNode.addNextTile(nextNode);\n                        nodeQueue.push(nextNode);\n                    } else {\n                        this.stationCount += 1;\n                        currentNode.color = this.colors[this.stationCount - 1];\n                    }\n                }\n            }\n            nodeQueue.shift();\n        }\n\n        // if track isn't of desired number of stations, retry\n        if (this.stationCount != this.requiredStations) {\n            this.trainCount = 0;\n            this.branchCount = 0;\n            this.stationCount = 0;\n            this.trackNodes = {};\n            this.buildTrack();\n        }\n    }\n\n    randomValidNode(validNodes) {\n        if (validNodes.length > 0) {\n            let randIdx = Math.floor(Math.random() * validNodes.length);\n            return validNodes[randIdx];\n        }\n        return validNodes;\n    }\n\n    allValidNodes(pos) {\n        let validNodes = [];\n        [[pos[0] + 100, pos[1]], [pos[0] - 100, pos[1]], [pos[0], pos[1] + 100], [pos[0], pos[1] - 100]].forEach(pos => {\n            if (this.validNode(pos)) {\n                validNodes.push(pos);\n            }\n        });\n        return validNodes;\n    }\n\n    validNode(pos) {\n        return (!this.trackNodes[pos] && pos[0] > 0 && pos[0] < 900 && pos[1] > 0 && pos[1] < 700);\n    }\n\n    addTrain() {\n        if (this.trainCount < 20) {\n            this.trainCount += 1;\n            window.setTimeout(() => {\n                this.trains.push(new Train({ startTrackTile: this.rootNode, color: this.colors[Math.floor(Math.random() * this.difficulty)] }));\n                this.addTrain();\n            }, 2000 + Math.random() * 4000);\n        }\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    const canvasEl = document.getElementById('game-canvas');\n    new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({ canvasEl, difficulty: 5});\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/track_tile.js":
/*!***************************!*\
  !*** ./src/track_tile.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass TrackTile {\n    constructor({ pos, nextTrackTiles, color }) {\n        this.pos = pos;\n        this.nextTrackTileIndex = 0;\n        this.nextTrackTiles = nextTrackTiles;\n        this.nextTrackTile = this.nextTrackTiles[0];\n        this.toggleable = nextTrackTiles.length > 1 ? true : false;\n        this.color = color;\n    }\n\n    toggleNextTrack() {\n        this.nextTrackTileIndex = ((this.nextTrackTileIndex + 1) % this.nextTrackTiles.length);\n        this.nextTrackTile = this.nextTrackTiles[this.nextTrackTileIndex];\n    }\n\n    addNextTile(trackTile) {\n        this.nextTrackTiles.push(trackTile);\n        this.nextTrackTile = this.nextTrackTiles[0];\n        if (this.nextTrackTiles.length > 1) {\n            this.toggleable = true;\n        }\n    }\n\n    draw(ctx) {\n        if (this.color) {\n            ctx.fillStyle = this.color;\n            ctx.beginPath();\n            ctx.rect(this.pos[0] - 25, this.pos[1] - 25, 50, 50);\n            ctx.fill();\n        } else {\n            this.nextTrackTiles.forEach(nextTile => {\n                ctx.beginPath();\n                ctx.moveTo(this.pos[0], this.pos[1]);\n                ctx.lineTo(nextTile.pos[0], nextTile.pos[1]);\n                ctx.stroke();\n            });\n            if (this.toggleable) {\n                ctx.beginPath();\n                ctx.arc(this.pos[0], this.pos[1], 20, 0, 2 * Math.PI, true);\n                ctx.fillStyle = \"white\";\n                ctx.fill();\n                ctx.moveTo(this.pos[0], this.pos[1]);\n                ctx.lineTo(this.nextTrackTile.pos[0], this.nextTrackTile.pos[1]);\n                ctx.stroke();\n            }\n        }\n\n        this.nextTrackTiles.forEach( tile => {\n            tile.draw(ctx);\n        });\n    }\n}\n\nmodule.exports = TrackTile;\n\n//# sourceURL=webpack:///./src/track_tile.js?");

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