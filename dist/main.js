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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _train__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./train */ \"./src/train.js\");\n/* harmony import */ var _track_tile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./track_tile */ \"./src/track_tile.js\");\n\n\n\nclass Game {\n    constructor({canvasEl, liveScoring}) {\n        this.liveScoring = liveScoring;\n        this.width = canvasEl.width;\n        this.height = canvasEl.height;\n        this.lastTrainColor = null;\n        this.colors = ['slateblue', 'khaki', 'crimson', 'olive', 'coral', 'lightpink', 'orchid', 'lime', 'darkcyan', 'aqua'];\n        this.scores = [];\n        this.intersections = [];\n        this.ctx = this.setupCanvas(canvasEl);\n        this.trains = [];\n        this.rootNode = {draw: ()=>{}};\n        this.animateRef = window.requestAnimationFrame(() => this.animate(this.ctx));\n    }\n    \n    start({size, speed, frequency, quantity, difficulty}) {\n        const fullScreenAdjust = this.width >= 700 ? 2 : 0;\n        this.col_x = Math.floor((size - 3) / 2 ) + 4 + fullScreenAdjust;\n        if (this.width === 900) {\n            this.unit_length = 100;\n        } else {\n            this.unit_length = Math.floor(this.width/this.col_x);\n        }\n        this.row_y = Math.floor(this.height / this.unit_length);\n        this.offsetX = (this.width - this.col_x*this.unit_length)/2 + this.unit_length/2;\n        this.offsetY = (this.height - this.row_y*this.unit_length)/2 + this.unit_length/2;\n        this.branchCount = 0;\n        this.stationCount = 0;\n        this.difficulty = difficulty;\n        this.requiredStations = size;\n        this.speed = speed;\n        this.frequency = frequency;\n        this.numTrains = quantity;\n        this.trackNodes = {};\n        this.intersections = [];\n        this.trains = [];\n        this.score = 0;\n        this.wrong = 0;\n        this.remaining = quantity;\n        this.liveScoring[0].innerHTML = 0;\n        this.liveScoring[1].innerHTML = 0;\n        this.liveScoring[2].innerHTML = quantity;\n        this.buildTrack();\n        this.addTrain();\n    }\n\n    stop() {\n        if (this.animateRef) {\n            window.cancelAnimationFrame(this.animateRef);\n        }\n        if (this.trainRef) {\n            window.clearTimeout(this.trainRef);\n        }\n    }\n\n    setupCanvas(canvasEl) {\n        canvasEl.addEventListener('click', e => {\n            const x = event.pageX - canvasEl.offsetLeft;\n            const y = event.pageY - canvasEl.offsetTop;\n\n            // this.toggleIntersection(this.rootNode, x, y);\n            this.intersections.forEach(intersection => {\n                if (Math.sqrt((x - intersection.pos[0]) ** 2 + (y - intersection.pos[1]) ** 2) <= 20) {\n                    intersection.toggleNextTrack();\n                }\n            });\n        });\n\n        return canvasEl.getContext('2d');\n    }\n\n\n    animate(ctx) {\n        ctx.clearRect(0, 0, this.width, this.height);\n        // this.objects.forEach(object => {\n        //     object.draw(ctx);\n        // });\n\n        this.rootNode.draw(ctx, 'root');\n        this.trains.forEach(train => {\n            train.draw(ctx);\n        });\n        requestAnimationFrame(() => this.animate(ctx));\n    }\n\n    buildTrack() {\n\n        //if root node: start branch count, randomly select initial location, and ensure only one child\n        this.branchCount += 1;\n        const pos = [Math.floor(Math.random() * this.col_x)* this.unit_length + this.offsetX,\n            Math.floor(Math.random() * this.row_y) * this.unit_length + this.offsetY];\n        this.rootNode = new _track_tile__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ pos: pos, nextTrackTiles: [] });\n        this.trackNodes[pos] = this.rootNode;\n\n        let validNodes = this.allValidNodes(pos);\n        let nextNodePos = this.randomValidNode(validNodes);\n        let nextChildNode = new _track_tile__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ pos: nextNodePos, nextTrackTiles: []});\n        this.trackNodes[nextNodePos] = nextNodePos;\n        this.rootNode.addNextTile(nextChildNode);\n\n        \n        const nodeQueue = [nextChildNode];\n        let nextNode;\n        let nextNode2;\n        let nextNodePos2;\n        let currentNode;\n        let nodeChildrenProbabilty;\n        let i = 0;\n        while (nodeQueue.length > 0) {\n\n            currentNode = nodeQueue[0];\n            nodeChildrenProbabilty = Math.floor(Math.random() * 4);\n            validNodes = this.allValidNodes(currentNode.pos);\n            nextNodePos = this.randomValidNode(validNodes);\n\n            // split and add a branch, adding two to queue\n            if (this.branchCount < this.requiredStations && (nodeChildrenProbabilty === 2 || nodeChildrenProbabilty === 3) && validNodes.length > 1 && i > 2) {\n                this.branchCount += 1;\n                nextNode = new _track_tile__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ pos: nextNodePos, nextTrackTiles: [] });\n                this.trackNodes[nextNodePos] = true;\n                \n                nextNodePos2 = this.randomValidNode(this.allValidNodes(currentNode.pos));\n                this.trackNodes[nextNodePos2] = true;\n                nextNode2 = new _track_tile__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ pos: nextNodePos2, nextTrackTiles: [] });\n                \n                currentNode.addNextTile(nextNode);\n                currentNode.addNextTile(nextNode2);\n                this.intersections.push(currentNode);\n                nodeQueue.push(nextNode);\n                nodeQueue.push(nextNode2);\n            }\n            \n            // make a station, end that branch\n            else if ((nodeChildrenProbabilty === 1 || nodeChildrenProbabilty === 2) && (this.branchCount - this.stationCount > 1) && validNodes.length > 0 && i > 2) {\n                this.stationCount += 1;\n                this.trackNodes[nextNodePos] = true;\n                nextNode = new _track_tile__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ pos: nextNodePos, nextTrackTiles: [], color: this.colors[this.stationCount - 1] });\n                currentNode.addNextTile(nextNode);\n            } \n\n            else {\n                // if more than 1 remaing station, just add one child, aka just plain track, add one to queue\n                if (validNodes.length > 0 && this.requiredStations - this.stationCount > 1) {\n                    nextNode = new _track_tile__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ pos: nextNodePos, nextTrackTiles: [] });\n                    this.trackNodes[nextNodePos] = true;\n                    currentNode.addNextTile(nextNode);\n                    nodeQueue.push(nextNode);\n                    i++;\n                // if one remaing station, 1 in 2 shot of turning into station, else continue with one child\n                } else if (this.stationCount < this.requiredStations) {\n                    if (validNodes.length > 0 && Math.floor(Math.random() * 2) === 0) {\n                        nextNode = new _track_tile__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ pos: nextNodePos, nextTrackTiles: [] });\n                        this.trackNodes[nextNodePos] = true;\n                        currentNode.addNextTile(nextNode);\n                        nodeQueue.push(nextNode);\n                    } else {\n                        this.stationCount += 1;\n                        currentNode.color = this.colors[this.stationCount - 1];\n                    }\n                }\n            }\n            nodeQueue.shift();\n        }\n\n        // if track isn't of desired number of stations, retry\n        if (this.stationCount != this.requiredStations) {\n            this.branchCount = 0;\n            this.stationCount = 0;\n            this.trackNodes = {};\n            this.buildTrack();\n        }\n    }\n\n    randomValidNode(validNodes) {\n        if (validNodes.length > 0) {\n            let randIdx = Math.floor(Math.random() * validNodes.length);\n            return validNodes[randIdx];\n        }\n        return validNodes;\n    }\n\n    allValidNodes(pos) {\n        let validNodes = [];\n        [[pos[0] + this.unit_length, pos[1]], [pos[0] - this.unit_length, pos[1]], [pos[0], pos[1] + this.unit_length], [pos[0], pos[1] - this.unit_length]].forEach(pos => {\n            if (this.validNode(pos)) {\n                validNodes.push(pos);\n            }\n        });\n        return validNodes;\n    }\n\n    validNode(pos) {\n        return (!this.trackNodes[pos] && pos[0] > 0 && pos[0] < this.width && pos[1] > 0 && pos[1] < this.height);\n    }\n\n    scored(bool) {\n        if (bool) {\n            this.score++;\n            this.liveScoring[0].innerHTML = this.score;\n            if (this.remaining <= 0) this.allTrainsFinished();\n        } else {\n            this.wrong++;\n            this.liveScoring[1].innerHTML = this.wrong;\n            if (this.remaining <= 0) this.allTrainsFinished();\n        }\n    }\n\n    addTrain() {\n        if (this.trains.length < this.numTrains) {\n            this.remaining--;\n            this.liveScoring[2].innerHTML = this.remaining;\n            this.trainRef = window.setTimeout(() => {\n                this.trains.push(new _train__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({ startTrackTile: this.rootNode, \n                    speed: this.speed, color: this.nextTrainColor(), \n                    scored: this.scored.bind(this) }));\n                this.addTrain();\n            }, this.frequency *1000 / 2 + Math.random() * this.frequency * 1000 );\n        } \n        // else {\n        //     if (this.allTrainsFinished()) {\n        //         let score = this.scoreCalc();\n        //         this.scores.push(score);\n        //         this.populateScores();\n        //     } else {\n        //         this.trainRef = window.setTimeout(() => {\n        //             this.addTrain();\n        //         }, 1000);\n        //     }\n        // }\n    }\n\n    // no back to back repeating colors\n    nextTrainColor() {\n        let color = this.colors[Math.floor(Math.random() * this.requiredStations)];\n        if (color === this.lastTrainColor) {\n            return this.nextTrainColor();\n        }\n        this.lastTrainColor = color;\n        return color;\n    }\n\n    allTrainsFinished() {\n        let score = this.scoreCalc();\n        this.scores.push(score);\n        this.populateScores();\n    }\n\n    scoreCalc() {\n        // let score = 0;\n        // this.trains.forEach( train => {\n        //     if (train.scored) {\n        //         score += 1;\n        //     }\n        // });\n        // const difficulty = this.difficulty();\n        return {correct: this.score, \n            missed: this.wrong, \n            overall: +((this.difficulty * this.score / this.numTrains).toFixed(2))};\n    }\n\n    // difficulty() {\n    //     const size = (this.requiredStations - 3 ) * 3 / 7;\n    //     const speed = (180 - this.speed) * 2.5 / 160;\n    //     const frequency = (6 -this.frequency) * 2.5 / 5;\n    //     const quantity = (this.numTrains - 5)* 2 / 45;\n    //     const difficulty = size + speed + frequency + quantity;\n    //     return difficulty;\n    // }\n\n    populateScores() {\n        const scores = document.getElementById('score-list');\n        const newScore = document.createElement('tr');\n        const lastScore = this.scores[this.scores.length - 1];\n        Object.values(lastScore).forEach(value => {\n            let entry = document.createElement('td')\n            entry.innerHTML = value;\n            newScore.appendChild(entry);\n        });\n        scores.appendChild(newScore);\n        this.sortList();\n    }\n\n    sortList() {\n        const matches = document.getElementById(\"score-list\");\n        Array.from(matches.getElementsByTagName(\"tr\"))\n            .slice(1)\n            .sort((a, b) => Number(b.lastChild.textContent) - Number(a.lastChild.textContent))\n            .forEach(row => matches.appendChild(row));\n    }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nwindow.addEventListener('load', () => {\n    let canvasEl = document.getElementById('game-canvas');\n    if (innerWidth < 700) {\n        canvasEl.width = innerWidth;\n        canvasEl.height = innerHeight*0.7;\n    } else {\n        canvasEl.width = innerWidth - 300;\n        canvasEl.height = innerHeight;\n    }\n    let vh = window.innerHeight * 0.01;\n    document.documentElement.style.setProperty(\"--vh\", `${vh}px`);\n\n    let score = document.getElementById('livescore');\n    let missed = document.getElementById('missedscore');\n    let remaining = document.getElementById('remainingscore');\n    let liveScoring = [score, missed, remaining];\n\n    let game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({canvasEl, liveScoring});\n    document.getElementById('start').addEventListener('click', () => {\n        game.stop();\n        const size = document.getElementById('difficultySize').value;\n        let speed = document.getElementById('difficultySpeed').value;\n        speed = parseInt(speed) + 2*(80-parseInt(speed)+20);\n        let frequency = document.getElementById('difficultyFrequency').value;\n        frequency = Number(frequency) + 2 * (2.5 - Number(frequency) + 1);\n        const quantity = document.getElementById('difficultyQuantity').value;\n        const difficulty = document.getElementById('totalDifficulty').innerHTML;\n\n        game.start({size, speed, frequency, quantity,difficulty});\n        \n    });\n\n    let sliders = document.getElementsByClassName('slider');\n\n    Array.from(sliders).forEach( el => {\n\n        el.addEventListener('change',() => {\n    // document.getElementById('difficultySize').oninput = () => {\n        // e.preventDefault();\n        let size = document.getElementById('difficultySize').value;\n        size = (size-2)*3/8;\n        let speed = document.getElementById('difficultySpeed').value;\n        speed = (speed-10)*(2.5)/170;\n        let frequency = document.getElementById('difficultyFrequency').value;\n        frequency = (frequency)*2.5/6;\n        let quantity = document.getElementById('difficultyQuantity').value;\n        quantity = (quantity-4)*2/46;\n        let difficulty = document.getElementById('totalDifficulty');\n        difficulty.value = (size + speed + frequency + quantity).toFixed(2);\n        });\n    });\n    let div1 = document.getElementById('container1');\n    let div2 = document.getElementById('container2');\n    let div3 = document.getElementById('container3');\n    let h1 = document.getElementById('header1');\n    let h2 = document.getElementById('header2');\n    let h3 = document.getElementById('header3');\n    let icon = document.getElementById('icon');\n    let icon2 = document.getElementById('icon2');\n    let icon3 = document.getElementById('icon3');\n    let howto = document.getElementById('howto');\n    let setting = document.getElementById('settingshower');\n    let scores = document.getElementById('scores');\n    \n    let open1 = false;\n    let open2 = false;\n    let open3 = false;\n    [h1,div1].forEach(el=>{\n        el.addEventListener('click', function () {\n            if (open1) {\n                icon.className = 'fa fa-arrow-down';\n                howto.className = \"\";\n            } else {\n                icon.className = 'fa fa-arrow-down open';\n                howto.className = \"open\";\n            }\n            open1 = !open1;\n        });\n    });\n    \n    [h2, div2].forEach(el => {\n        el.addEventListener('click', function () {\n            if (open2) {\n                icon2.className = 'fa fa-arrow-down';\n                setting.className = \"\";\n            } else {\n                icon2.className = 'fa fa-arrow-down open';\n                setting.className = \"open\";\n            }\n            open2 = !open2;\n        });\n    });\n    \n    [h3, div3].forEach(el => {\n        el.addEventListener('click', function () {\n            if (open3) {\n                icon3.className = 'fa fa-arrow-down';\n                scores.className = \"\";\n            } else {\n                icon3.className = 'fa fa-arrow-down open';\n                scores.className = \"open\";\n            }\n            open3 = !open3;\n        });\n    });\n});\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/track_tile.js":
/*!***************************!*\
  !*** ./src/track_tile.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass TrackTile {\n    constructor({ pos, nextTrackTiles, color }) {\n        this.pos = pos;\n        this.nextTrackTileIndex = 0;\n        this.nextTrackTiles = nextTrackTiles;\n        this.nextTrackTile = this.nextTrackTiles[0];\n        this.toggleable = nextTrackTiles.length > 1 ? true : false;\n        this.color = color;\n    }\n\n    toggleNextTrack() {\n        this.nextTrackTileIndex = ((this.nextTrackTileIndex + 1) % this.nextTrackTiles.length);\n        this.nextTrackTile = this.nextTrackTiles[this.nextTrackTileIndex];\n    }\n\n    addNextTile(trackTile) {\n        this.nextTrackTiles.push(trackTile);\n        this.nextTrackTile = this.nextTrackTiles[0];\n        if (this.nextTrackTiles.length > 1) {\n            this.toggleable = true;\n        }\n    }\n\n    draw(ctx, parentPos) {\n        if (this.color) {\n            ctx.fillStyle = this.color;\n            ctx.beginPath();\n            ctx.rect(this.pos[0] - 25, this.pos[1] - 25, 50, 50);\n            ctx.fill();\n        } else {\n            this.nextTrackTiles.forEach(nextTile => {\n                ctx.beginPath();\n                ctx.moveTo(this.pos[0], this.pos[1]);\n                ctx.lineTo(nextTile.pos[0], nextTile.pos[1]);\n                ctx.stroke();\n            });\n            if (this.toggleable) {\n                ctx.beginPath();\n                ctx.arc(this.pos[0], this.pos[1], 20, 0, 2 * Math.PI, true);\n                ctx.fillStyle = \"lightgray\";\n                // ctx.strokeStyle = \"lightgray\";\n                // ctx.stroke();\n                ctx.fill();\n                ctx.beginPath();\n                ctx.strokeStyle = \"black\";\n                ctx.moveTo(this.pos[0], this.pos[1]);\n                let nextPosDelta = this.connect(this.pos, this.nextTrackTile.pos);\n                ctx.lineTo(this.pos[0] + nextPosDelta[0], this.pos[1] + nextPosDelta[1]);\n\n                ctx.moveTo(this.pos[0], this.pos[1]);\n                let nextPosDelta2 = this.connect(this.pos, parentPos);\n                ctx.lineTo(this.pos[0] + nextPosDelta2[0], this.pos[1] + nextPosDelta2[1]);\n                ctx.stroke();\n            }\n        }\n\n        if (parentPos === \"root\") {\n            ctx.fillStyle = \"black\";\n            ctx.beginPath();\n            ctx.rect(this.pos[0] - 25, this.pos[1] - 25, 50, 50);\n            ctx.fill();\n            ctx.beginPath();\n            ctx.fillStyle = \"white\";\n            ctx.arc(this.pos[0], this.pos[1], 20, 0, 2 * Math.PI, true);\n            ctx.fillStyle = \"white\";\n            ctx.fill();\n        } \n\n        this.nextTrackTiles.forEach( tile => {\n            tile.draw(ctx, this.pos);\n        });\n    }\n\n    connect(pos1, pos2) {\n        return [(pos2[0] - pos1[0]) * 20 / (Math.abs((pos2[0] - pos1[0])) ? Math.abs((pos2[0] - pos1[0])) : 1),\n            (pos2[1] - pos1[1]) * 20 / (Math.abs((pos2[1] - pos1[1])) ? Math.abs((pos2[1] - pos1[1])) : 1)];\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TrackTile);\n\n//# sourceURL=webpack:///./src/track_tile.js?");

/***/ }),

/***/ "./src/train.js":
/*!**********************!*\
  !*** ./src/train.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Train {\n    constructor({ startTrackTile, color, speed, scored, missed }) {\n        this.startTrackTile = startTrackTile;\n        this.endTrackTile = startTrackTile.nextTrackTile;\n        this.color = color;\n        this.pos = [startTrackTile.pos[0], startTrackTile.pos[1]];\n        this.renderCount = 0;\n        this.renderInterval = speed;\n        this.scoredF = scored;\n        this.missed = missed;\n    }\n\n\n    draw(ctx) {\n        if (!this.finished) {\n            ctx.fillStyle = this.color;\n            ctx.beginPath();\n            ctx.arc(this.pos[0], this.pos[1], 20, 0, 2 * Math.PI, true);\n            ctx.fill();\n            this.move();\n        }\n    }\n\n    move() {\n        const deltaX = (this.endTrackTile.pos[0] - this.startTrackTile.pos[0]) / this.renderInterval;\n        const deltaY = (this.endTrackTile.pos[1] - this.startTrackTile.pos[1]) / this.renderInterval;\n        this.pos[0] += deltaX;\n        this.pos[1] += deltaY;\n        this.renderCount += 1;\n        if (this.renderCount >= this.renderInterval) {\n            if (this.endTrackTile.color) {\n                this.finished = true;\n                if (this.color === this.endTrackTile.color) {\n                    this.scored = true;\n                    this.scoredF(true);\n                } else {\n                    this.scoredF(false);\n                }\n            } else {\n                this.renderCount = 0;\n                this.startTrackTile = this.endTrackTile;\n                this.endTrackTile = this.endTrackTile.nextTrackTile;\n            }\n        }\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Train);\n\n//# sourceURL=webpack:///./src/train.js?");

/***/ })

/******/ });