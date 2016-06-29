(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("OpenSeadragon"));
	else if(typeof define === 'function' && define.amd)
		define(["OpenSeadragon"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("OpenSeadragon")) : factory(root["OpenSeadragon"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************************************!*\
  !*** ./src/openseadragon-annotations.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _OpenSeadragon = __webpack_require__(/*! OpenSeadragon */ 1);
	
	var _OpenSeadragon2 = _interopRequireDefault(_OpenSeadragon);
	
	var _holyGrail = __webpack_require__(/*! holy-grail */ 2);
	
	var _holyGrail2 = _interopRequireDefault(_holyGrail);
	
	var _Annotations = __webpack_require__(/*! ./annotations/Annotations */ 3);
	
	var _Annotations2 = _interopRequireDefault(_Annotations);
	
	var _Draw = __webpack_require__(/*! ./state/Draw */ 36);
	
	var _Draw2 = _interopRequireDefault(_Draw);
	
	var _Erase = __webpack_require__(/*! ./state/Erase */ 37);
	
	var _Erase2 = _interopRequireDefault(_Erase);
	
	var _Annotate = __webpack_require__(/*! ./state/Annotate */ 114);
	
	var _Annotate2 = _interopRequireDefault(_Annotate);
	
	var _Measure = __webpack_require__(/*! ./state/Measure */ 108);
	
	var _Measure2 = _interopRequireDefault(_Measure);
	
	var _Move = __webpack_require__(/*! ./state/Move */ 39);
	
	var _Move2 = _interopRequireDefault(_Move);
	
	var _Controls = __webpack_require__(/*! ./controls/Controls */ 40);
	
	var _Controls2 = _interopRequireDefault(_Controls);
	
	var _Overlay = __webpack_require__(/*! ./overlay/Overlay */ 107);
	
	var _Overlay2 = _interopRequireDefault(_Overlay);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _OpenSeadragon2.default.Viewer.prototype.initializeAnnotations = function (options) {
	  var context = new _holyGrail2.default();
	  context.register('annotations', _Annotations2.default, ['controls', 'overlay', 'draw', 'erase', 'measure', 'annotate', 'move']);
	  context.register('draw', _Draw2.default, ['overlay']);
	  context.register('erase', _Erase2.default, ['overlay']);
	  context.register('measure', _Measure2.default, ['overlay']);
	  context.register('annotate', _Annotate2.default, ['overlay']);
	  context.register('move', _Move2.default);
	  context.register('controls', _Controls2.default);
	  context.registerSingleton('overlay', _Overlay2.default);
	
	  this.annotations = this.annotations || context.resolve('annotations');
	  this.annotations.options = options || {
	    pixelsPerMeter: 1,
	    showMeasure: false
	  };
	  this.addHandler('open', function () {
	    this.annotations.initialize.call(this.annotations, this);
	  }.bind(this));
	};

/***/ },
/* 1 */
/*!********************************!*\
  !*** external "OpenSeadragon" ***!
  \********************************/
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/*!*****************************************!*\
  !*** ./~/holy-grail/dist/holy-grail.js ***!
  \*****************************************/
/***/ function(module, exports) {

	///<reference path="../typings/main.d.ts" />
	"use strict";
	var dependencies = Symbol('dependencies');
	var isSingleton = Symbol('isSingleton');
	var Context = (function () {
	    function Context() {
	        this.maps = {};
	        this.instances = {};
	    }
	    Context.prototype.register = function (id, ClassToRegister, dependencyIds) {
	        if (dependencyIds === void 0) { dependencyIds = []; }
	        ClassToRegister[dependencies] = dependencyIds;
	        !!ClassToRegister[isSingleton];
	        if (this.maps[id] !== undefined) {
	            throw new Error(id + ' has alredy been registered');
	        }
	        this.maps[id] = ClassToRegister;
	    };
	    Context.prototype.registerSingleton = function (id, ClassToRegister, dependencyIds) {
	        if (dependencyIds === void 0) { dependencyIds = []; }
	        ClassToRegister[isSingleton] = true;
	        this.register(id, ClassToRegister, dependencyIds);
	    };
	    Context.prototype.resolve = function (id) {
	        var ClassToReturn = this.maps[id];
	        if (ClassToReturn === undefined) {
	            throw new Error(id + ' has not been registered');
	        }
	        if (ClassToReturn[isSingleton]) {
	            if (this.instances[id] === undefined) {
	                this.instances[id] = instantiate(ClassToReturn, id, this);
	            }
	            return this.instances[id];
	        }
	        return instantiate(ClassToReturn, id, this);
	    };
	    return Context;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Context;
	function instantiate(ClassToReturn, id, context) {
	    var resolvedDependencies = ClassToReturn[dependencies].map(function (id) {
	        return context.resolve(id);
	    });
	    return new (ClassToReturn.bind.apply(ClassToReturn, [void 0].concat(resolvedDependencies)))();
	}
	//# sourceMappingURL=holy-grail.js.map

/***/ },
/* 3 */
/*!****************************************!*\
  !*** ./src/annotations/Annotations.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 4);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ 5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _draw_grouphover = __webpack_require__(/*! ../../img/draw_grouphover.png */ 24);
	
	var _draw_grouphover2 = _interopRequireDefault(_draw_grouphover);
	
	var _draw_hover = __webpack_require__(/*! ../../img/draw_hover.png */ 25);
	
	var _draw_hover2 = _interopRequireDefault(_draw_hover);
	
	var _draw_pressed = __webpack_require__(/*! ../../img/draw_pressed.png */ 26);
	
	var _draw_pressed2 = _interopRequireDefault(_draw_pressed);
	
	var _draw_rest = __webpack_require__(/*! ../../img/draw_rest.png */ 27);
	
	var _draw_rest2 = _interopRequireDefault(_draw_rest);
	
	var _move_grouphover = __webpack_require__(/*! ../../img/move_grouphover.png */ 28);
	
	var _move_grouphover2 = _interopRequireDefault(_move_grouphover);
	
	var _move_hover = __webpack_require__(/*! ../../img/move_hover.png */ 29);
	
	var _move_hover2 = _interopRequireDefault(_move_hover);
	
	var _move_pressed = __webpack_require__(/*! ../../img/move_pressed.png */ 30);
	
	var _move_pressed2 = _interopRequireDefault(_move_pressed);
	
	var _move_rest = __webpack_require__(/*! ../../img/move_rest.png */ 31);
	
	var _move_rest2 = _interopRequireDefault(_move_rest);
	
	var _erase_grouphover = __webpack_require__(/*! ../../img/erase_grouphover.png */ 32);
	
	var _erase_grouphover2 = _interopRequireDefault(_erase_grouphover);
	
	var _erase_hover = __webpack_require__(/*! ../../img/erase_hover.png */ 33);
	
	var _erase_hover2 = _interopRequireDefault(_erase_hover);
	
	var _erase_pressed = __webpack_require__(/*! ../../img/erase_pressed.png */ 34);
	
	var _erase_pressed2 = _interopRequireDefault(_erase_pressed);
	
	var _erase_rest = __webpack_require__(/*! ../../img/erase_rest.png */ 35);
	
	var _erase_rest2 = _interopRequireDefault(_erase_rest);
	
	var _measure_grouphover = __webpack_require__(/*! ../../img/measure_grouphover.png */ 109);
	
	var _measure_grouphover2 = _interopRequireDefault(_measure_grouphover);
	
	var _measure_hover = __webpack_require__(/*! ../../img/measure_hover.png */ 110);
	
	var _measure_hover2 = _interopRequireDefault(_measure_hover);
	
	var _measure_pressed = __webpack_require__(/*! ../../img/measure_pressed.png */ 111);
	
	var _measure_pressed2 = _interopRequireDefault(_measure_pressed);
	
	var _measure_rest = __webpack_require__(/*! ../../img/measure_rest.png */ 112);
	
	var _measure_rest2 = _interopRequireDefault(_measure_rest);
	
	var _annotate_grouphover = __webpack_require__(/*! ../../img/annotate_grouphover.png */ 116);
	
	var _annotate_grouphover2 = _interopRequireDefault(_annotate_grouphover);
	
	var _annotate_hover = __webpack_require__(/*! ../../img/annotate_hover.png */ 117);
	
	var _annotate_hover2 = _interopRequireDefault(_annotate_hover);
	
	var _annotate_pressed = __webpack_require__(/*! ../../img/annotate_pressed.png */ 118);
	
	var _annotate_pressed2 = _interopRequireDefault(_annotate_pressed);
	
	var _annotate_rest = __webpack_require__(/*! ../../img/annotate_rest.png */ 119);
	
	var _annotate_rest2 = _interopRequireDefault(_annotate_rest);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Annotations = function () {
	  function Annotations(controls, overlay, draw, erase, measure, annotate, move) {
	    (0, _classCallCheck3.default)(this, Annotations);
	
	    this.measure = measure;
	    this.draw = draw;
	    this.erase = erase;
	    this.annotate = annotate;
	    this.move = move;
	    this.overlay = overlay;
	    this.controls = controls;
	  }
	
	  (0, _createClass3.default)(Annotations, [{
	    key: 'initialize',
	    value: function initialize(viewer) {
	      this.viewer = viewer;
	      this.overlay.initialize(viewer);
	      var controls = [{
	        name: 'move',
	        action: setState.bind(null, this, this.move),
	        srcRest: _move_rest2.default,
	        srcGroup: _move_grouphover2.default,
	        srcHover: _move_hover2.default,
	        srcDown: _move_pressed2.default
	      }, {
	        name: 'draw',
	        action: setState.bind(null, this, this.draw),
	        srcRest: _draw_rest2.default,
	        srcGroup: _draw_grouphover2.default,
	        srcHover: _draw_hover2.default,
	        srcDown: _draw_pressed2.default
	      }, {
	        name: 'erase',
	        action: setState.bind(null, this, this.erase),
	        srcRest: _erase_rest2.default,
	        srcGroup: _erase_grouphover2.default,
	        srcHover: _erase_hover2.default,
	        srcDown: _erase_pressed2.default
	      }, {
	        name: 'annotate',
	        action: setState.bind(null, this, this.annotate),
	        srcRest: _annotate_rest2.default,
	        srcGroup: _annotate_grouphover2.default,
	        srcHover: _annotate_hover2.default,
	        srcDown: _annotate_pressed2.default
	      }];
	      if (this.options.showMeasure) {
	        controls.push({
	          name: 'measure',
	          action: setState.bind(null, this, this.measure),
	          srcRest: _measure_rest2.default,
	          srcGroup: _measure_grouphover2.default,
	          srcHover: _measure_hover2.default,
	          srcDown: _measure_pressed2.default
	        });
	      }
	      this.controls.initialize(viewer, { controls: controls }).activate('move');
	    }
	  }, {
	    key: 'import',
	    value: function _import(data) {
	      this.overlay.import(data);
	    }
	  }, {
	    key: 'export',
	    value: function _export() {
	      return this.overlay.export();
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      return this.overlay.reset();
	    }
	  }]);
	  return Annotations;
	}();
	
	exports.default = Annotations;
	
	
	function setState(annotations, newState) {
	  if (annotations.state) {
	    annotations.state.close();
	  }
	  annotations.state = newState.initialize();
	}

/***/ },
/* 4 */
/*!***************************************************!*\
  !*** ./~/babel-runtime/helpers/classCallCheck.js ***!
  \***************************************************/
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 5 */
/*!************************************************!*\
  !*** ./~/babel-runtime/helpers/createClass.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(/*! ../core-js/object/define-property */ 6);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 6 */
/*!***********************************************************!*\
  !*** ./~/babel-runtime/core-js/object/define-property.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/define-property */ 7), __esModule: true };

/***/ },
/* 7 */
/*!************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/fn/object/define-property.js ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.define-property */ 8);
	var $Object = __webpack_require__(/*! ../../modules/_core */ 11).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 8 */
/*!*********************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.object.define-property.js ***!
  \*********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(/*! ./_export */ 9);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 19), 'Object', {defineProperty: __webpack_require__(/*! ./_object-dp */ 15).f});

/***/ },
/* 9 */
/*!**************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_export.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(/*! ./_global */ 10)
	  , core      = __webpack_require__(/*! ./_core */ 11)
	  , ctx       = __webpack_require__(/*! ./_ctx */ 12)
	  , hide      = __webpack_require__(/*! ./_hide */ 14)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 10 */
/*!**************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_global.js ***!
  \**************************************************************/
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 11 */
/*!************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_core.js ***!
  \************************************************************/
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 12 */
/*!***********************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_ctx.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(/*! ./_a-function */ 13);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 13 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_a-function.js ***!
  \******************************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 14 */
/*!************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_hide.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(/*! ./_object-dp */ 15)
	  , createDesc = __webpack_require__(/*! ./_property-desc */ 23);
	module.exports = __webpack_require__(/*! ./_descriptors */ 19) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 15 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-dp.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(/*! ./_an-object */ 16)
	  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 18)
	  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 22)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(/*! ./_descriptors */ 19) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 16 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_an-object.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 17);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 17 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_is-object.js ***!
  \*****************************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 18 */
/*!**********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_ie8-dom-define.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(/*! ./_descriptors */ 19) && !__webpack_require__(/*! ./_fails */ 20)(function(){
	  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 21)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 19 */
/*!*******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_descriptors.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(/*! ./_fails */ 20)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 20 */
/*!*************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_fails.js ***!
  \*************************************************************/
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 21 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_dom-create.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 17)
	  , document = __webpack_require__(/*! ./_global */ 10).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 22 */
/*!********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-primitive.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(/*! ./_is-object */ 17);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 23 */
/*!*********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_property-desc.js ***!
  \*********************************************************************/
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 24 */
/*!*********************************!*\
  !*** ./img/draw_grouphover.png ***!
  \*********************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozRkRERTMzMkVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozRkRERTMzMUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"

/***/ },
/* 25 */
/*!****************************!*\
  !*** ./img/draw_hover.png ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMUZEMjkyNUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMUZEMjkyNEVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"

/***/ },
/* 26 */
/*!******************************!*\
  !*** ./img/draw_pressed.png ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozRkRERTMzQUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozRkRERTMzOUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"

/***/ },
/* 27 */
/*!***************************!*\
  !*** ./img/draw_rest.png ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowRUI0OEJGRUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowRUI0OEJGREVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"

/***/ },
/* 28 */
/*!*********************************!*\
  !*** ./img/move_grouphover.png ***!
  \*********************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMUZEMjkyOUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMUZEMjkyOEVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"

/***/ },
/* 29 */
/*!****************************!*\
  !*** ./img/move_hover.png ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMUZEMjkyMUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMUZEMjkyMEVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"

/***/ },
/* 30 */
/*!******************************!*\
  !*** ./img/move_pressed.png ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozRkRERTMzNkVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozRkRERTMzNUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"

/***/ },
/* 31 */
/*!***************************!*\
  !*** ./img/move_rest.png ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAYAAADVhWD8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUEwM0FBMUQ5NUNBNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowRUI0OEJGQUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowRUI0OEJGOUVGRDYxMUUzQTExNUI3MjM4QzI2QjRFRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjhBOTkxNUEwRTIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFBMDNBQTFEOTVDQTUiLz4gPC9yZGY6RGVzY3Jp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"

/***/ },
/* 32 */
/*!**********************************!*\
  !*** ./img/erase_grouphover.png ***!
  \**********************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 33 */
/*!*****************************!*\
  !*** ./img/erase_hover.png ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 34 */
/*!*******************************!*\
  !*** ./img/erase_pressed.png ***!
  \*******************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 35 */
/*!****************************!*\
  !*** ./img/erase_rest.png ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 36 */
/*!***************************!*\
  !*** ./src/state/Draw.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 4);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ 5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _OpenSeadragon = __webpack_require__(/*! OpenSeadragon */ 1);
	
	var _OpenSeadragon2 = _interopRequireDefault(_OpenSeadragon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Draw = function () {
	  function Draw(overlay) {
	    (0, _classCallCheck3.default)(this, Draw);
	
	    this.overlay = overlay;
	  }
	
	  (0, _createClass3.default)(Draw, [{
	    key: "initialize",
	    value: function initialize() {
	      $("svg").css("cursor", "auto");
	      this._mouseTracker = function (e) {
	        var offsetX = e.clientX - this.rect.left,
	            offsetY = e.clientY - this.rect.top;
	        console.log("mousetracker rect" + this.rect.left + "," + this.rect.top + " offset:" + offsetX + "," + offsetY);
	        this.x = offsetX;
	        this.y = offsetY;
	      }.bind(this);
	      this._onMouseDown = function (e) {
	        this.rect = this.overlay.svg.getBoundingClientRect();
	        var offsetX = e.clientX - this.rect.left,
	            offsetY = e.clientY - this.rect.top;
	        this.handleMouseDown(offsetX, offsetY);
	        e.stopPropagation();
	      }.bind(this);
	      this._onMouseUp = function () {
	        this.handleMouseUp();
	      }.bind(this);
	      this.overlay.addHandler('mousedown', this._onMouseDown);
	      window.addEventListener('mouseup', this._onMouseUp, false);
	      return this;
	    }
	  }, {
	    key: "close",
	    value: function close() {
	      this.overlay.removeHandler('mousedown', this._onMouseDown);
	      window.removeEventListener('mouseup', this._onMouseUp, false);
	    }
	  }, {
	    key: "handleMouseDown",
	    value: function handleMouseDown(x, y) {
	      if (!this._interval) {
	        this.x = x;
	        this.y = y;
	        this.overlay.startPath(this.x, this.y);
	        this.overlay.el.addEventListener('mousemove', this._mouseTracker, false);
	        this._interval = window.setInterval(function () {
	          this.overlay.updatePath(this.x, this.y);
	        }.bind(this), 25);
	      }
	      return this;
	    }
	  }, {
	    key: "handleMouseUp",
	    value: function handleMouseUp() {
	      this.overlay.el.removeEventListener('mousemove', this._mouseTracker);
	      this._interval = clearInterval(this._interval);
	      return this;
	    }
	  }]);
	  return Draw;
	}();
	
	exports.default = Draw;

/***/ },
/* 37 */
/*!****************************!*\
  !*** ./src/state/Erase.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 4);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ 5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _OpenSeadragon = __webpack_require__(/*! OpenSeadragon */ 1);
	
	var _OpenSeadragon2 = _interopRequireDefault(_OpenSeadragon);
	
	var _erase_cursor = __webpack_require__(/*! ../../img/erase_cursor.png */ 38);
	
	var _erase_cursor2 = _interopRequireDefault(_erase_cursor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Erase = function () {
	  function Erase(overlay) {
	    (0, _classCallCheck3.default)(this, Erase);
	
	    this.overlay = overlay;
	  }
	
	  (0, _createClass3.default)(Erase, [{
	    key: 'erase',
	    value: function erase(x, y) {
	      var clientx = x / this.overlay.svg.clientWidth * 100,
	          clienty = y / this.overlay.svg.clientHeight * 100;
	      console.log("erase at " + x + "," + y);
	      var paths = $(this.overlay.svg).find("path");
	      var toremove = [];
	      var overlay = this.overlay;
	      paths.each(function (i, el) {
	        var $el = $(el);
	        var points = $el.attr("d").split(" ");
	        for (var j = 0; j < points.length - 2; j += 4) {
	          var erasedist = 2 / viewer.viewport.getZoom();
	          var point1x = points[j].substr(1),
	              point1y = points[j + 1];
	          var point2x = points[j + 2].substr(1),
	              point2y = points[j + 3];
	          //check if the click occured close to the line connecting the two points
	          var distto1 = overlay.distance(point1x, point1y, clientx, clienty);
	          var distto2 = overlay.distance(point2x, point2y, clientx, clienty);
	          var dist1to2 = overlay.distance(point2x, point2y, point1x, point1y);
	          if (distto1 + distto2 < dist1to2 + 2 * erasedist) {
	            //console.log("connection erasing at " + clientx + ", " + clienty);
	            toremove.push(el);
	            break;
	          }
	        }
	      });
	      $(toremove).each(function (i, el) {
	        $(el).remove();
	      });
	      //DEBUG - show erasure circle
	      // var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	      // var radius = 1 / viewer.viewport.getZoom();
	      // dot.setAttribute('cx', clientx-radius/2);
	      // dot.setAttribute('stroke', 'black');
	      // dot.setAttribute('r', radius);
	      // dot.setAttribute('cy', clienty - radius / 2);
	      // this.overlay.svg.appendChild(dot)
	      // DEBUG - color lines to be deleted
	      //$(toremove).each(function (i, el) { el.setAttribute("stroke", "green"); });
	    }
	  }, {
	    key: 'initialize',
	    value: function initialize() {
	      console.log("erase");
	      $("svg").css("cursor", 'url(' + _erase_cursor2.default + ') 13 9, auto');
	      this._mouseTracker = function (e) {
	        var offsetX = e.clientX - this.rect.left,
	            offsetY = e.clientY - this.rect.top;
	        //console.log("mousetracker rect"+this.rect.left+","+this.rect.top+" offset:"+offsetX+","+offsetY);
	        this.x = offsetX;
	        this.y = offsetY;
	      }.bind(this);
	      this._onMouseDown = function (e) {
	        this.rect = this.overlay.svg.getBoundingClientRect();
	        var offsetX = e.clientX - this.rect.left,
	            offsetY = e.clientY - this.rect.top;
	        this.handleMouseDown(offsetX, offsetY);
	        e.stopPropagation();
	      }.bind(this);
	      this._onMouseUp = function () {
	        this.handleMouseUp();
	      }.bind(this);
	      this.overlay.addHandler('mousedown', this._onMouseDown);
	      window.addEventListener('mouseup', this._onMouseUp, false);
	      return this;
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      this.overlay.removeHandler('mousedown', this._onMouseDown);
	      window.removeEventListener('mouseup', this._onMouseUp, false);
	    }
	  }, {
	    key: 'handleMouseDown',
	    value: function handleMouseDown(x, y) {
	      if (!this._interval) {
	        this.x = x;
	        this.y = y;
	        this.erase(x, y);
	        this.overlay.el.addEventListener('mousemove', this._mouseTracker, false);
	        this._interval = window.setInterval(function () {
	          this.erase(this.x, this.y);
	        }.bind(this), 25);
	      }
	      return this;
	    }
	  }, {
	    key: 'handleMouseUp',
	    value: function handleMouseUp() {
	      this.overlay.el.removeEventListener('mousemove', this._mouseTracker);
	      this._interval = clearInterval(this._interval);
	      return this;
	    }
	  }]);
	  return Erase;
	}();
	
	exports.default = Erase;

/***/ },
/* 38 */
/*!******************************!*\
  !*** ./img/erase_cursor.png ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAASCAYAAABFGc6jAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwQAADsEBuJFr7QAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTFH80I3AAABKUlEQVRIS2MgFkREhP8HUlnoGCpOMcAwmAhMEsBmAKmYIMDQxMTElA3CLCwscBqbOiwYJ8CmGIxnV8X8Ty8p+h9aOBFrXOHBGACbIjCenuv1v7Bn3f/vP37+v7R3zn//rE6KLMOmIGtiks3/grbV/3/+/AnHZ7dM+++Z1k2KZXCATRKMo2zM/k/fcR3FIhDuS/T57x5fQbJl2CTgONrc+P+MPTfhlqzrzP1vbGwMxvbhhcRaBgbYJFBwbpD7/8lbL/5f2YGwBIYdIkuJsQwMsEnAMSg5c3Nz5Wa72WFYAsNpFbWELIMDbJIYuMjHCcOSwnl7ibYEBLApoBbGANgUZaH7ABvGpg+KcQJsisnFBAE2TaRikgA2AwhhykB4eBjWeIgIJ6biY2AAAK45DLZF3tHUAAAAAElFTkSuQmCC"

/***/ },
/* 39 */
/*!***************************!*\
  !*** ./src/state/Move.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 4);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ 5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Move = function () {
	  function Move() {
	    (0, _classCallCheck3.default)(this, Move);
	  }
	
	  (0, _createClass3.default)(Move, [{
	    key: "initialize",
	    value: function initialize() {
	      $("svg").css("cursor", "auto");
	      return this;
	    }
	  }, {
	    key: "close",
	    value: function close() {}
	  }, {
	    key: "handleMouseDown",
	    value: function handleMouseDown() {
	      return this;
	    }
	  }, {
	    key: "handleMouseUp",
	    value: function handleMouseUp() {
	      return this;
	    }
	  }]);
	  return Move;
	}();
	
	exports.default = Move;

/***/ },
/* 40 */
/*!**********************************!*\
  !*** ./src/controls/Controls.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 41);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 4);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ 5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 52);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 99);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _OpenSeadragon = __webpack_require__(/*! OpenSeadragon */ 1);
	
	var _OpenSeadragon2 = _interopRequireDefault(_OpenSeadragon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Controls = function (_OpenSeadragon$EventS) {
	  (0, _inherits3.default)(Controls, _OpenSeadragon$EventS);
	
	  function Controls() {
	    (0, _classCallCheck3.default)(this, Controls);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Controls).call(this));
	
	    _this.list = {};
	    return _this;
	  }
	
	  (0, _createClass3.default)(Controls, [{
	    key: 'initialize',
	    value: function initialize(viewer, options) {
	      var options = options || {};
	      this.viewer = viewer;
	      viewer.addHandler('zoom', function (e) {
	        var width = 0.5;
	        var paths = document.getElementsByTagName('path');
	        for (var i = 0; i < paths.length; i++) {
	          paths[i].setAttribute("stroke-width", width / e.zoom);
	        }
	      });
	      if (options.controls) {
	        options.controls.forEach(this.add.bind(this));
	      }
	      return this;
	    }
	  }, {
	    key: 'add',
	    value: function add(options) {
	      this.set(options).addHandler('click', options.action);
	      this.get(options.name).addHandler('click', function () {
	        for (var button in this.list) {
	          this.list[button].imgDown.style.visibility = button === options.name ? 'visible' : 'hidden';
	        }
	      }.bind(this));
	      this.viewer.addControl(this.get(options.name).element, {
	        anchor: _OpenSeadragon2.default.ControlAnchor.BOTTOM_LEFT
	      });
	      return this;
	    }
	  }, {
	    key: 'activate',
	    value: function activate(name) {
	      this.list[name].imgDown.style.visibility = 'visible';
	      return this;
	    }
	  }, {
	    key: 'set',
	    value: function set(options) {
	      this.list[options.name] = new _OpenSeadragon2.default.Button({
	        tooltip: options.name[0].toUpperCase() + options.name.substr(1),
	        srcRest: options.srcRest,
	        srcGroup: options.srcGroup,
	        srcHover: options.srcHover,
	        srcDown: options.srcDown,
	        onClick: this.raiseEvent.bind(this, 'click', name)
	      });
	      return this.list[options.name];
	    }
	  }, {
	    key: 'get',
	    value: function get(name) {
	      return this.list[name];
	    }
	  }, {
	    key: 'all',
	    value: function all() {
	      var controls = [];
	      for (var name in this.list) {
	        controls.push(this.list[name]);
	      }
	      return controls;
	    }
	  }]);
	  return Controls;
	}(_OpenSeadragon2.default.EventSource);
	
	exports.default = Controls;

/***/ },
/* 41 */
/*!************************************************************!*\
  !*** ./~/babel-runtime/core-js/object/get-prototype-of.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/get-prototype-of */ 42), __esModule: true };

/***/ },
/* 42 */
/*!*************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/fn/object/get-prototype-of.js ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.get-prototype-of */ 43);
	module.exports = __webpack_require__(/*! ../../modules/_core */ 11).Object.getPrototypeOf;

/***/ },
/* 43 */
/*!**********************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.object.get-prototype-of.js ***!
  \**********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(/*! ./_to-object */ 44)
	  , $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 46);
	
	__webpack_require__(/*! ./_object-sap */ 51)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 44 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-object.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(/*! ./_defined */ 45);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 45 */
/*!***************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_defined.js ***!
  \***************************************************************/
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 46 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-gpo.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(/*! ./_has */ 47)
	  , toObject    = __webpack_require__(/*! ./_to-object */ 44)
	  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 48)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 47 */
/*!***********************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_has.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 48 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_shared-key.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(/*! ./_shared */ 49)('keys')
	  , uid    = __webpack_require__(/*! ./_uid */ 50);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 49 */
/*!**************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_shared.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(/*! ./_global */ 10)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 50 */
/*!***********************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_uid.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 51 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-sap.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(/*! ./_export */ 9)
	  , core    = __webpack_require__(/*! ./_core */ 11)
	  , fails   = __webpack_require__(/*! ./_fails */ 20);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 52 */
/*!**************************************************************!*\
  !*** ./~/babel-runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof2 = __webpack_require__(/*! ../helpers/typeof */ 53);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 53 */
/*!*******************************************!*\
  !*** ./~/babel-runtime/helpers/typeof.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(/*! ../core-js/symbol/iterator */ 54);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(/*! ../core-js/symbol */ 83);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 54 */
/*!****************************************************!*\
  !*** ./~/babel-runtime/core-js/symbol/iterator.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol/iterator */ 55), __esModule: true };

/***/ },
/* 55 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/fn/symbol/iterator.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.string.iterator */ 56);
	__webpack_require__(/*! ../../modules/web.dom.iterable */ 78);
	module.exports = __webpack_require__(/*! ../../modules/_wks-ext */ 82).f('iterator');

/***/ },
/* 56 */
/*!**************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.string.iterator.js ***!
  \**************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(/*! ./_string-at */ 57)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(/*! ./_iter-define */ 59)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 57 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_string-at.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(/*! ./_to-integer */ 58)
	  , defined   = __webpack_require__(/*! ./_defined */ 45);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 58 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-integer.js ***!
  \******************************************************************/
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 59 */
/*!*******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_iter-define.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(/*! ./_library */ 60)
	  , $export        = __webpack_require__(/*! ./_export */ 9)
	  , redefine       = __webpack_require__(/*! ./_redefine */ 61)
	  , hide           = __webpack_require__(/*! ./_hide */ 14)
	  , has            = __webpack_require__(/*! ./_has */ 47)
	  , Iterators      = __webpack_require__(/*! ./_iterators */ 62)
	  , $iterCreate    = __webpack_require__(/*! ./_iter-create */ 63)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 76)
	  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 46)
	  , ITERATOR       = __webpack_require__(/*! ./_wks */ 77)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 60 */
/*!***************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_library.js ***!
  \***************************************************************/
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 61 */
/*!****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_redefine.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./_hide */ 14);

/***/ },
/* 62 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_iterators.js ***!
  \*****************************************************************/
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 63 */
/*!*******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_iter-create.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(/*! ./_object-create */ 64)
	  , descriptor     = __webpack_require__(/*! ./_property-desc */ 23)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 76)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(/*! ./_hide */ 14)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 77)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 64 */
/*!*********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-create.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(/*! ./_an-object */ 16)
	  , dPs         = __webpack_require__(/*! ./_object-dps */ 65)
	  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 74)
	  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 48)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(/*! ./_dom-create */ 21)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(/*! ./_html */ 75).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 65 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-dps.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(/*! ./_object-dp */ 15)
	  , anObject = __webpack_require__(/*! ./_an-object */ 16)
	  , getKeys  = __webpack_require__(/*! ./_object-keys */ 66);
	
	module.exports = __webpack_require__(/*! ./_descriptors */ 19) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 66 */
/*!*******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-keys.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(/*! ./_object-keys-internal */ 67)
	  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 74);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 67 */
/*!****************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-keys-internal.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(/*! ./_has */ 47)
	  , toIObject    = __webpack_require__(/*! ./_to-iobject */ 68)
	  , arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 71)(false)
	  , IE_PROTO     = __webpack_require__(/*! ./_shared-key */ 48)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 68 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-iobject.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(/*! ./_iobject */ 69)
	  , defined = __webpack_require__(/*! ./_defined */ 45);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 69 */
/*!***************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_iobject.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(/*! ./_cof */ 70);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 70 */
/*!***********************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_cof.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 71 */
/*!**********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_array-includes.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(/*! ./_to-iobject */ 68)
	  , toLength  = __webpack_require__(/*! ./_to-length */ 72)
	  , toIndex   = __webpack_require__(/*! ./_to-index */ 73);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 72 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-length.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(/*! ./_to-integer */ 58)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 73 */
/*!****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-index.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(/*! ./_to-integer */ 58)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 74 */
/*!*********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_enum-bug-keys.js ***!
  \*********************************************************************/
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 75 */
/*!************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_html.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./_global */ 10).document && document.documentElement;

/***/ },
/* 76 */
/*!*************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_set-to-string-tag.js ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(/*! ./_object-dp */ 15).f
	  , has = __webpack_require__(/*! ./_has */ 47)
	  , TAG = __webpack_require__(/*! ./_wks */ 77)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 77 */
/*!***********************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_wks.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(/*! ./_shared */ 49)('wks')
	  , uid        = __webpack_require__(/*! ./_uid */ 50)
	  , Symbol     = __webpack_require__(/*! ./_global */ 10).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 78 */
/*!***********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/web.dom.iterable.js ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./es6.array.iterator */ 79);
	var global        = __webpack_require__(/*! ./_global */ 10)
	  , hide          = __webpack_require__(/*! ./_hide */ 14)
	  , Iterators     = __webpack_require__(/*! ./_iterators */ 62)
	  , TO_STRING_TAG = __webpack_require__(/*! ./_wks */ 77)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 79 */
/*!*************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.array.iterator.js ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 80)
	  , step             = __webpack_require__(/*! ./_iter-step */ 81)
	  , Iterators        = __webpack_require__(/*! ./_iterators */ 62)
	  , toIObject        = __webpack_require__(/*! ./_to-iobject */ 68);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(/*! ./_iter-define */ 59)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 80 */
/*!**************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_add-to-unscopables.js ***!
  \**************************************************************************/
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 81 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_iter-step.js ***!
  \*****************************************************************/
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 82 */
/*!***************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_wks-ext.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(/*! ./_wks */ 77);

/***/ },
/* 83 */
/*!*******************************************!*\
  !*** ./~/babel-runtime/core-js/symbol.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol */ 84), __esModule: true };

/***/ },
/* 84 */
/*!**************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/fn/symbol/index.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.symbol */ 85);
	__webpack_require__(/*! ../../modules/es6.object.to-string */ 96);
	__webpack_require__(/*! ../../modules/es7.symbol.async-iterator */ 97);
	__webpack_require__(/*! ../../modules/es7.symbol.observable */ 98);
	module.exports = __webpack_require__(/*! ../../modules/_core */ 11).Symbol;

/***/ },
/* 85 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.symbol.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(/*! ./_global */ 10)
	  , has            = __webpack_require__(/*! ./_has */ 47)
	  , DESCRIPTORS    = __webpack_require__(/*! ./_descriptors */ 19)
	  , $export        = __webpack_require__(/*! ./_export */ 9)
	  , redefine       = __webpack_require__(/*! ./_redefine */ 61)
	  , META           = __webpack_require__(/*! ./_meta */ 86).KEY
	  , $fails         = __webpack_require__(/*! ./_fails */ 20)
	  , shared         = __webpack_require__(/*! ./_shared */ 49)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 76)
	  , uid            = __webpack_require__(/*! ./_uid */ 50)
	  , wks            = __webpack_require__(/*! ./_wks */ 77)
	  , wksExt         = __webpack_require__(/*! ./_wks-ext */ 82)
	  , wksDefine      = __webpack_require__(/*! ./_wks-define */ 87)
	  , keyOf          = __webpack_require__(/*! ./_keyof */ 88)
	  , enumKeys       = __webpack_require__(/*! ./_enum-keys */ 89)
	  , isArray        = __webpack_require__(/*! ./_is-array */ 92)
	  , anObject       = __webpack_require__(/*! ./_an-object */ 16)
	  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 68)
	  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 22)
	  , createDesc     = __webpack_require__(/*! ./_property-desc */ 23)
	  , _create        = __webpack_require__(/*! ./_object-create */ 64)
	  , gOPNExt        = __webpack_require__(/*! ./_object-gopn-ext */ 93)
	  , $GOPD          = __webpack_require__(/*! ./_object-gopd */ 95)
	  , $DP            = __webpack_require__(/*! ./_object-dp */ 15)
	  , $keys          = __webpack_require__(/*! ./_object-keys */ 66)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(/*! ./_object-gopn */ 94).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(/*! ./_object-pie */ 91).f  = $propertyIsEnumerable;
	  __webpack_require__(/*! ./_object-gops */ 90).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(/*! ./_library */ 60)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ 14)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 86 */
/*!************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_meta.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(/*! ./_uid */ 50)('meta')
	  , isObject = __webpack_require__(/*! ./_is-object */ 17)
	  , has      = __webpack_require__(/*! ./_has */ 47)
	  , setDesc  = __webpack_require__(/*! ./_object-dp */ 15).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(/*! ./_fails */ 20)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 87 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_wks-define.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(/*! ./_global */ 10)
	  , core           = __webpack_require__(/*! ./_core */ 11)
	  , LIBRARY        = __webpack_require__(/*! ./_library */ 60)
	  , wksExt         = __webpack_require__(/*! ./_wks-ext */ 82)
	  , defineProperty = __webpack_require__(/*! ./_object-dp */ 15).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 88 */
/*!*************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_keyof.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(/*! ./_object-keys */ 66)
	  , toIObject = __webpack_require__(/*! ./_to-iobject */ 68);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 89 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_enum-keys.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(/*! ./_object-keys */ 66)
	  , gOPS    = __webpack_require__(/*! ./_object-gops */ 90)
	  , pIE     = __webpack_require__(/*! ./_object-pie */ 91);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 90 */
/*!*******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-gops.js ***!
  \*******************************************************************/
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 91 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-pie.js ***!
  \******************************************************************/
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 92 */
/*!****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_is-array.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(/*! ./_cof */ 70);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 93 */
/*!***********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-gopn-ext.js ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(/*! ./_to-iobject */ 68)
	  , gOPN      = __webpack_require__(/*! ./_object-gopn */ 94).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 94 */
/*!*******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-gopn.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(/*! ./_object-keys-internal */ 67)
	  , hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ 74).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 95 */
/*!*******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-gopd.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(/*! ./_object-pie */ 91)
	  , createDesc     = __webpack_require__(/*! ./_property-desc */ 23)
	  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 68)
	  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 22)
	  , has            = __webpack_require__(/*! ./_has */ 47)
	  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 18)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(/*! ./_descriptors */ 19) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 96 */
/*!***************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.object.to-string.js ***!
  \***************************************************************************/
/***/ function(module, exports) {



/***/ },
/* 97 */
/*!********************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es7.symbol.async-iterator.js ***!
  \********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./_wks-define */ 87)('asyncIterator');

/***/ },
/* 98 */
/*!****************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es7.symbol.observable.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./_wks-define */ 87)('observable');

/***/ },
/* 99 */
/*!*********************************************!*\
  !*** ./~/babel-runtime/helpers/inherits.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _setPrototypeOf = __webpack_require__(/*! ../core-js/object/set-prototype-of */ 100);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(/*! ../core-js/object/create */ 104);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(/*! ../helpers/typeof */ 53);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }
	
	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 100 */
/*!************************************************************!*\
  !*** ./~/babel-runtime/core-js/object/set-prototype-of.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/set-prototype-of */ 101), __esModule: true };

/***/ },
/* 101 */
/*!*************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/fn/object/set-prototype-of.js ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.set-prototype-of */ 102);
	module.exports = __webpack_require__(/*! ../../modules/_core */ 11).Object.setPrototypeOf;

/***/ },
/* 102 */
/*!**********************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.object.set-prototype-of.js ***!
  \**********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(/*! ./_export */ 9);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(/*! ./_set-proto */ 103).set});

/***/ },
/* 103 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_set-proto.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(/*! ./_is-object */ 17)
	  , anObject = __webpack_require__(/*! ./_an-object */ 16);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(/*! ./_ctx */ 12)(Function.call, __webpack_require__(/*! ./_object-gopd */ 95).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 104 */
/*!**************************************************!*\
  !*** ./~/babel-runtime/core-js/object/create.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/create */ 105), __esModule: true };

/***/ },
/* 105 */
/*!***************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/fn/object/create.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.create */ 106);
	var $Object = __webpack_require__(/*! ../../modules/_core */ 11).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 106 */
/*!************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.object.create.js ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(/*! ./_export */ 9)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(/*! ./_object-create */ 64)});

/***/ },
/* 107 */
/*!********************************!*\
  !*** ./src/overlay/Overlay.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 41);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 4);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ 5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 52);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 99);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _OpenSeadragon = __webpack_require__(/*! OpenSeadragon */ 1);
	
	var _OpenSeadragon2 = _interopRequireDefault(_OpenSeadragon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Overlay = function (_OpenSeadragon$EventS) {
	  (0, _inherits3.default)(Overlay, _OpenSeadragon$EventS);
	
	  function Overlay() {
	    (0, _classCallCheck3.default)(this, Overlay);
	    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Overlay).apply(this, arguments));
	  }
	
	  (0, _createClass3.default)(Overlay, [{
	    key: 'initialize',
	    value: function initialize(viewer) {
	      this.el = createOverlay();
	      this.svg = appendSVG(this.el);
	      this.el.addEventListener('mousedown', this.raiseEvent.bind(this, 'mousedown'), false);
	      this.el.addEventListener('mouseup', this.raiseEvent.bind(this, 'mouseup'), false);
	      viewer.addOverlay(this.el, createOpenSeadragonRect(viewer));
	    }
	  }, {
	    key: 'export',
	    value: function _export() {
	      var serializer = new XMLSerializer();
	      var data = serializer.serializeToString(this.svg);
	      return data;
	    }
	  }, {
	    key: 'import',
	    value: function _import(data) {
	      this.el.innerHTML = data;
	      this.svg = this.el.firstChild;
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.el.innerHTML = '';
	      this.svg = appendSVG(this.el);
	    }
	  }, {
	    key: 'startPath',
	    value: function startPath(x, y) {
	      var path = createPath(x / this.el.clientWidth * 100, y / this.el.clientHeight * 100);
	      this.svg.appendChild(path);
	    }
	  }, {
	    key: 'updatePath',
	    value: function updatePath(x, y) {
	      var x = x / this.el.clientWidth * 100;
	      var y = y / this.el.clientHeight * 100;
	      var path = this.svg.lastChild;
	      path.setAttribute('d', path.getAttribute('d') + ' L' + x + ' ' + y);
	    }
	  }, {
	    key: 'updatePathsEnd',
	    value: function updatePathsEnd(path, x, y) {
	      var coords = path.getAttribute('d').split(' ');
	      var x = x / this.el.clientWidth * 100;
	      var y = y / this.el.clientHeight * 100;
	      path.setAttribute('d', coords[0] + ' ' + coords[1] + ' L' + x + ' ' + y);
	    }
	  }, {
	    key: 'addLabel',
	    value: function addLabel(x, y, text) {
	      var x = x / this.el.clientWidth * 100;
	      var y = y / this.el.clientHeight * 100;
	      this.svg.appendChild(createLabel(x, y, text));
	    }
	  }, {
	    key: 'addPlaceholder',
	    value: function addPlaceholder(x, y) {
	      var x = x / this.el.clientWidth * 100;
	      var y = y / this.el.clientHeight * 100;
	      return createPlaceholder(x, y, this.svg);
	    }
	  }, {
	    key: 'distance',
	    value: function distance(x1, y1, x2, y2) {
	      return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	    }
	  }]);
	  return Overlay;
	}(_OpenSeadragon2.default.EventSource);
	
	exports.default = Overlay;
	
	
	function createOverlay() {
	  var div = document.createElement('div');
	  div.className = 'overlay';
	  return div;
	}
	
	function appendSVG(el) {
	  var svg = createSVG();
	  el.appendChild(svg);
	  return svg;
	}
	
	function createPath(x, y) {
	  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	  path.setAttribute('fill', 'none');
	  path.setAttribute('stroke', 'red');
	  path.setAttribute('stroke-width', 0.5 / viewer.viewport.getZoom());
	  path.setAttribute('stroke-linejoin', 'round');
	  path.setAttribute('stroke-linecap', 'round');
	  path.setAttribute('d', 'M' + x + ' ' + y);
	  return path;
	}
	
	function createSVG() {
	  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	  svg.setAttribute('version', '1.1');
	  svg.setAttribute('width', '100%');
	  svg.setAttribute('height', '100%');
	  svg.setAttribute('preserveAspectRatio', 'none');
	  svg.setAttribute('viewBox', '0 0 100 100');
	  svg.style.cursor = 'default';
	  return svg;
	}
	
	function createLabel(x, y, text) {
	  var label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	  label.textContent = text;
	  label.setAttribute('x', x * viewer.viewport.getZoom());
	  label.setAttribute('y', y * viewer.viewport.getZoom());
	  label.setAttribute('font-size', 3);
	  label.setAttribute('font-family', 'monospace');
	  label.setAttribute('transform', 'scale(' + 1 / viewer.viewport.getZoom() + ')');
	  return label;
	}
	
	function createOpenSeadragonRect(viewer) {
	  var width = viewer.viewport.homeBounds.width;
	  var height = viewer.viewport.homeBounds.height;
	  return new _OpenSeadragon2.default.Rect(0, 0, width, height);
	}
	
	function createPlaceholder(x, y, svg) {
	  var r = 2;
	  x = x * viewer.viewport.getZoom();
	  y = y * viewer.viewport.getZoom();
	  var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	  circle.setAttribute('cx', x);
	  circle.setAttribute('cy', y);
	  circle.setAttribute('r', r);
	  circle.setAttribute('stroke', 'white');
	  circle.setAttribute('fill', 'none');
	  circle.setAttribute('stroke-width', 0.1 / viewer.viewport.getZoom());
	  circle.setAttribute('opacity', '0.8');
	  circle.setAttribute('transform', 'scale(' + 1 / viewer.viewport.getZoom() + ')');
	  svg.appendChild(circle);
	  circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	  circle.setAttribute('cx', x);
	  circle.setAttribute('cy', y);
	  circle.setAttribute('r', r * 0.9);
	  circle.setAttribute('stroke', 'blue');
	  circle.setAttribute('fill', 'rgb(0,0,255)');
	  circle.setAttribute('stroke-width', 0.1 / viewer.viewport.getZoom());
	  circle.setAttribute('opacity', '0.2');
	  circle.setAttribute('transform', 'scale(' + 1 / viewer.viewport.getZoom() + ')');
	  svg.appendChild(circle);
	  $(circle).on('mouseenter', function () {
	    this.setAttribute('opacity', "1");
	  });
	  $(circle).on('mouseleave', function () {
	    this.setAttribute('opacity', "0.2");
	  });
	  x = x * 3;y = y * 3; //to counter scale
	  x = x - 2;y = y - 4; //to shift it in the center
	  var iletter = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	  iletter.setAttribute('stroke', 'white');
	  iletter.setAttribute('d', 'M3 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-1.5 2.5c-.83 0-1.5.67-1.5 1.5h1c0-.28.22-.5.5-.5s.5.22.5.5-1 1.64-1 2.5c0 .86.67 1.5 1.5 1.5s1.5-.67 1.5-1.5h-1c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-.36 1-1.84 1-2.5 0-.81-.67-1.5-1.5-1.5z');
	  iletter.setAttribute('opacity', '0.7');
	  iletter.setAttribute('transform', 'scale(' + 1 / 3 / viewer.viewport.getZoom() + ') translate(' + x + ',' + y + ')');
	  svg.appendChild(iletter);
	  return circle;
	}

/***/ },
/* 108 */
/*!******************************!*\
  !*** ./src/state/Measure.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 4);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ 5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _OpenSeadragon = __webpack_require__(/*! OpenSeadragon */ 1);
	
	var _OpenSeadragon2 = _interopRequireDefault(_OpenSeadragon);
	
	var _measure_cursor = __webpack_require__(/*! ../../img/measure_cursor.png */ 113);
	
	var _measure_cursor2 = _interopRequireDefault(_measure_cursor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Measure = function () {
	  function Measure(overlay) {
	    (0, _classCallCheck3.default)(this, Measure);
	
	    this.overlay = overlay;
	  }
	
	  (0, _createClass3.default)(Measure, [{
	    key: 'initialize',
	    value: function initialize() {
	      $("svg").css("cursor", 'url(' + _measure_cursor2.default + ') 7 9, auto');
	      this._mouseTracker = function (e) {
	        var offsetX = e.clientX - this.rect.left,
	            offsetY = e.clientY - this.rect.top;
	        this.x = offsetX;
	        this.y = offsetY;
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	      }.bind(this);
	      this._onMouseDown = function (e) {
	        this.rect = this.overlay.svg.getBoundingClientRect();
	        var offsetX = e.clientX - this.rect.left,
	            offsetY = e.clientY - this.rect.top;
	        this.handleMouseDown(offsetX, offsetY);
	        e.stopPropagation();
	      }.bind(this);
	      this._onMouseUp = function () {
	        this.handleMouseUp();
	      }.bind(this);
	      this.overlay.addHandler('mousedown', this._onMouseDown);
	      window.addEventListener('mouseup', this._onMouseUp, false);
	      return this;
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      this.overlay.removeHandler('mousedown', this._onMouseDown);
	      window.removeEventListener('mouseup', this._onMouseUp, false);
	    }
	  }, {
	    key: 'handleMouseDown',
	    value: function handleMouseDown(x, y) {
	      if (!this._interval) {
	        this.startX = x;
	        this.startY = y;
	        this.x = x;
	        this.y = y;
	        this.overlay.startPath(this.x, this.y);
	        this.path = this.overlay.svg.lastChild;
	        this.overlay.addLabel(this.x, this.y, "0");
	        this.label = this.overlay.svg.lastChild;
	
	        this.path.setAttribute('stroke', 'black');
	        this.overlay.el.addEventListener('mousemove', this._mouseTracker, false);
	        this._interval = window.setInterval(function () {
	          this.overlay.updatePathsEnd(this.path, this.x, this.y);
	          var dst = this.overlay.distance(this.x, this.y, this.startX, this.startY);
	          dst = dst / getCurrentPPM();
	          this.label.textContent = prettyPrintDistance(dst);
	        }.bind(this), 25);
	      }
	      return this;
	    }
	  }, {
	    key: 'handleMouseUp',
	    value: function handleMouseUp() {
	      this.overlay.el.removeEventListener('mousemove', this._mouseTracker);
	      this._interval = clearInterval(this._interval);
	      this.path.remove();
	      this.label.remove();
	      return this;
	    }
	  }]);
	  return Measure;
	}();
	
	exports.default = Measure;
	
	
	function prettyPrintDistance(dst) {
	  //distance in meters
	  if (dst >= 1000) {
	    return (dst / 1000).toFixed(2) + 'km';
	  } else if (dst >= 1) {
	    return dst.toFixed(2) + 'm';
	  } else if (dst >= 0.001) {
	    return (dst * 1000).toFixed(2) + 'mm';
	  } else if (dst >= 0.000001) {
	    return (dst * 1000 * 1000).toFixed(2) + 'um';
	  } else return (dst * 1000 * 1000 * 1000).toFixed(2) + 'nm';
	}
	
	// from scalebar plugin
	function getCurrentPPM() {
	  var tiledImage = viewer.world.getItemAt(0);
	  var ratio = tiledImage._scaleSpring.current.value * tiledImage.viewport._containerInnerSize.x / tiledImage.source.dimensions.x;
	  var zoom = ratio * viewer.viewport.getZoom(true);
	  return zoom * viewer.annotations.options.pixelsPerMeter;
	}

/***/ },
/* 109 */
/*!************************************!*\
  !*** ./img/measure_grouphover.png ***!
  \************************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 110 */
/*!*******************************!*\
  !*** ./img/measure_hover.png ***!
  \*******************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 111 */
/*!*********************************!*\
  !*** ./img/measure_pressed.png ***!
  \*********************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 112 */
/*!******************************!*\
  !*** ./img/measure_rest.png ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 113 */
/*!********************************!*\
  !*** ./img/measure_cursor.png ***!
  \********************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAATCAYAAACHrr18AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAALdJREFUSEvF0D0KwkAUBOCUljmCpUewtLLyAFZWOUku4XEsrUTEwtIDiHiEzTwwMNkdJEQcH3yQmWV/SJVS+gtZOsjSQZYOsnSQZQ+zh5laG+PT/qJgmDvMKQ8OGpEH+1lRMMwBVpRvsKCcPyxfP8Kyz6woGCa/+KvMioJhnnB6HxAecKUc6xfKLzhTjj8w6eI6NpIGNpRb2FGO7zXlLdTybFU6yNJBlg6ydJClgywdZOkgy99LVQeDJPhuLBKgbAAAAABJRU5ErkJggg=="

/***/ },
/* 114 */
/*!*******************************!*\
  !*** ./src/state/Annotate.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 4);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ 5);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _OpenSeadragon = __webpack_require__(/*! OpenSeadragon */ 1);
	
	var _OpenSeadragon2 = _interopRequireDefault(_OpenSeadragon);
	
	var _annotation_placeholder = __webpack_require__(/*! ../../img/annotation_placeholder.png */ 115);
	
	var _annotation_placeholder2 = _interopRequireDefault(_annotation_placeholder);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Annotate = function () {
	  function Annotate(overlay) {
	    (0, _classCallCheck3.default)(this, Annotate);
	
	    this.overlay = overlay;
	  }
	
	  (0, _createClass3.default)(Annotate, [{
	    key: 'initialize',
	    value: function initialize() {
	      $("svg").css("cursor", 'auto');
	      this._onMouseDown = function (e) {
	        this.rect = this.overlay.svg.getBoundingClientRect();
	        var offsetX = e.clientX - this.rect.left,
	            offsetY = e.clientY - this.rect.top;
	        this.handleMouseDown(offsetX, offsetY);
	        e.stopPropagation();
	      }.bind(this);
	      this.overlay.addHandler('mousedown', this._onMouseDown);
	      return this;
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      this.overlay.removeHandler('mousedown', this._onMouseDown);
	    }
	  }, {
	    key: 'handleMouseDown',
	    value: function handleMouseDown(x, y) {
	      if (!this._interval) {
	        this.overlay.addPlaceholder(x, y);
	      }
	      return this;
	    }
	  }]);
	  return Annotate;
	}();
	
	exports.default = Annotate;

/***/ },
/* 115 */
/*!****************************************!*\
  !*** ./img/annotation_placeholder.png ***!
  \****************************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 116 */
/*!*************************************!*\
  !*** ./img/annotate_grouphover.png ***!
  \*************************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 117 */
/*!********************************!*\
  !*** ./img/annotate_hover.png ***!
  \********************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 118 */
/*!**********************************!*\
  !*** ./img/annotate_pressed.png ***!
  \**********************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 119 */
/*!*******************************!*\
  !*** ./img/annotate_rest.png ***!
  \*******************************/
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ }
/******/ ])
});
;
//# sourceMappingURL=openseadragon-annotations.js.map