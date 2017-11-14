(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["backend"] = factory();
	else
		root["backend"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/api";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _Auth = __webpack_require__(18);Object.defineProperty(exports, 'Auth', { enumerable: true, get: function get() {return _interopRequireDefault(_Auth).default;} });var _Rating = __webpack_require__(8);Object.defineProperty(exports, 'Rating', { enumerable: true, get: function get() {return _interopRequireDefault(_Rating).
    default;} });var _Solution = __webpack_require__(25);Object.defineProperty(exports, 'Solution', { enumerable: true, get: function get() {return _interopRequireDefault(_Solution).
    default;} });var _Topic = __webpack_require__(9);Object.defineProperty(exports, 'Topic', { enumerable: true, get: function get() {return _interopRequireDefault(_Topic).
    default;} });var _User = __webpack_require__(28);Object.defineProperty(exports, 'User', { enumerable: true, get: function get() {return _interopRequireDefault(_User).
    default;} });function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _mongoose = __webpack_require__(0);var _mongoose2 = _interopRequireDefault(_mongoose);
var _environment = __webpack_require__(6);
var _plugins = __webpack_require__(4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.plugin(_plugins.codeHighPlugin);
var db = _mongoose2.default.createConnection(_environment.mongoUri);exports.default =

db;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}function _extendableBuiltin(cls) {function ExtendableBuiltin() {var instance = Reflect.construct(cls, Array.from(arguments));Object.setPrototypeOf(instance, Object.getPrototypeOf(this));return instance;}ExtendableBuiltin.prototype = Object.create(cls.prototype, { constructor: { value: cls, enumerable: false, writable: true, configurable: true } });if (Object.setPrototypeOf) {Object.setPrototypeOf(ExtendableBuiltin, cls);} else {ExtendableBuiltin.__proto__ = cls;}return ExtendableBuiltin;}var CodeHighError = function (_extendableBuiltin2) {_inherits(CodeHighError, _extendableBuiltin2);function CodeHighError() {_classCallCheck(this, CodeHighError);return _possibleConstructorReturn(this, (CodeHighError.__proto__ || Object.getPrototypeOf(CodeHighError)).apply(this, arguments));}return CodeHighError;}(_extendableBuiltin(Error));var


NotFoundError = function (_CodeHighError) {_inherits(NotFoundError, _CodeHighError);function NotFoundError() {_classCallCheck(this, NotFoundError);return _possibleConstructorReturn(this, (NotFoundError.__proto__ || Object.getPrototypeOf(NotFoundError)).apply(this, arguments));}return NotFoundError;}(CodeHighError);var


PermissionError = function (_CodeHighError2) {_inherits(PermissionError, _CodeHighError2);function PermissionError() {_classCallCheck(this, PermissionError);return _possibleConstructorReturn(this, (PermissionError.__proto__ || Object.getPrototypeOf(PermissionError)).apply(this, arguments));}return PermissionError;}(CodeHighError);var


AuthorizationError = function (_CodeHighError3) {_inherits(AuthorizationError, _CodeHighError3);function AuthorizationError() {_classCallCheck(this, AuthorizationError);return _possibleConstructorReturn(this, (AuthorizationError.__proto__ || Object.getPrototypeOf(AuthorizationError)).apply(this, arguments));}return AuthorizationError;}(CodeHighError);exports.



CodeHighError = CodeHighError;exports.
NotFoundError = NotFoundError;exports.
PermissionError = PermissionError;exports.
AuthorizationError = AuthorizationError;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _authorPlugin = __webpack_require__(22);Object.defineProperty(exports, 'authorPlugin', { enumerable: true, get: function get() {return _interopRequireDefault(_authorPlugin).default;} });var _codeHighPlugin = __webpack_require__(23);Object.defineProperty(exports, 'codeHighPlugin', { enumerable: true, get: function get() {return _interopRequireDefault(_codeHighPlugin).
    default;} });function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {const path = __webpack_require__(20);
const fs = __webpack_require__(21);

const {
  NODE_ENV = 'production',

  HTTP_PORT = '8080',
  HTTPS_PORT = '8443',
  PROXY_PORT = '3000',

  CREDENTIALS_ENABLED = '0',
  CREDENTIALS_PATH,
  CREDENTIALS_CA,
  CREDENTIALS_KEY,
  CREDENTIALS_CERT,

  MONGO_URI = 'mongodb://localhost/code_high',
  JWT_SECRET = 'JWT_SECRET_KEY_GOES_HERE',

  WEBHOOK_ENABLED = '0',
  WEBHOOK_SECRET,
} = process.env;

const isEnabled = v => v === '1';

const __PROD__ = NODE_ENV === 'production';
const __DEV__ = !__PROD__;

const httpPort = parseInt(HTTP_PORT);
const httpsPort = parseInt(HTTPS_PORT);
const proxyPort = parseInt(PROXY_PORT);

const read = (file) => fs.readFileSync(path.resolve(CREDENTIALS_PATH, file));
const credentials = isEnabled(CREDENTIALS_ENABLED) && {
  ca: read(CREDENTIALS_CA),
  key: read(CREDENTIALS_KEY),
  cert: read(CREDENTIALS_CERT),
};

const mongoUri = MONGO_URI;
const jwtSecret = JWT_SECRET;

const webhook = isEnabled(WEBHOOK_ENABLED) && {
  secret: WEBHOOK_SECRET,
};

const builtPath = path.resolve(__dirname, 'built');
const frontendBuiltPath = path.resolve(builtPath, 'frontend');
const backendBuiltPath = path.resolve(builtPath, 'backend');
const srcPath = path.resolve(__dirname, 'src');
const frontendSrcPath = path.resolve(srcPath, 'frontend');
const backendSrcPath = path.resolve(srcPath, 'backend');
const publicPath = path.resolve(__dirname, 'public');

const endpoint = '/api';

module.exports = {
  __PROD__,
  __DEV__,
  httpPort,
  httpsPort,
  proxyPort,
  credentials,
  mongoUri,
  jwtSecret,
  webhook,
  builtPath,
  frontendBuiltPath,
  backendBuiltPath,
  srcPath,
  frontendSrcPath,
  backendSrcPath,
  publicPath,
  endpoint,
};
/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.now = exports.isMongooseObject = exports.replaceMe = undefined;var _error = __webpack_require__(3);

var replaceMe = function replaceMe(req, res, next) {
  if (req.params.object_id === 'me') {var
    author = req.author;
    if (!author.isUser()) return next(new _error.AuthorizationError());
    req.params.object_id = author._id;
  }
  next();
};

var isMongooseObject = function isMongooseObject(object) {return object && object.constructor.name === 'model';};

var now = function now() {
  return new Date();
};exports.


replaceMe = replaceMe;exports.
isMongooseObject = isMongooseObject;exports.
now = now;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _mongoose = __webpack_require__(0);var _mongoose2 = _interopRequireDefault(_mongoose);
var _db = __webpack_require__(2);var _db2 = _interopRequireDefault(_db);
var _plugins = __webpack_require__(4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

Schema = _mongoose2.default.Schema;var
ObjectId = Schema.Types.ObjectId;

var modelName = 'Rating';
var ratingSchema = new Schema({
  solution: { type: ObjectId, ref: 'Solution', required: true },
  stars: { type: Number, required: true, min: 1, max: 5, validate: Number.isInteger },
  author: { type: ObjectId, ref: 'User' } });

ratingSchema.index({ solution: 1, author: 1 });

ratingSchema.plugin(_plugins.authorPlugin, {
  authorField: true,
  set: {
    none: true },

  get: {
    guest: true },

  remove: {
    none: true } });



var Rating = _db2.default.model(modelName, ratingSchema);exports.default =
Rating;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _mongoose = __webpack_require__(0);var _mongoose2 = _interopRequireDefault(_mongoose);
var _db = __webpack_require__(2);var _db2 = _interopRequireDefault(_db);
var _plugins = __webpack_require__(4);
var _nested = __webpack_require__(26);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

Schema = _mongoose2.default.Schema;var
ObjectId = Schema.Types.ObjectId;

var modelName = 'Topic';
var topicSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  time: { type: Number, required: true, min: 1, validate: Number.isInteger },
  testcases: { type: [_nested.Testcase], default: [] },
  top_solutions: [{ type: ObjectId, ref: 'Solution', required: true }],
  author: { type: ObjectId, ref: 'User' } });


topicSchema.plugin(_plugins.authorPlugin, {
  authorField: true,
  set: {
    none: ['top_solutions'] },

  insert: {
    user: true },

  modify: {
    owner: true },

  get: {
    guest: true },

  remove: {
    owner: true } });



var Topic = _db2.default.model(modelName, topicSchema);exports.default =
Topic;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _express = __webpack_require__(5);var _express2 = _interopRequireDefault(_express);
var _error = __webpack_require__(3);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var create = function create(Model, singular, plural) {var paramReplacer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (req, res, next) {return next();};
  var router = _express2.default.Router();

  var allObjects = function allObjects(req, res, next) {var _req$options =
    req.options,where = _req$options.where,sort = _req$options.sort,skip = _req$options.skip,limit = _req$options.limit,populate = _req$options.populate;
    Model.find(where(Model)).sort(sort).skip(skip).limit(limit).populate(populate).
    then(function (objects) {return res.return(_defineProperty({}, plural, objects));}).
    catch(next);
  };

  var getObject = function getObject(req, res, next) {var
    object_id = req.params.object_id;
    Model.findById(object_id).populate(req.options.populate).
    then(function (object) {
      if (!object) throw new _error.NotFoundError();
      return res.return(_defineProperty({}, singular, object));
    }).
    catch(next);
  };

  var addObject = function addObject(req, res, next) {var
    body = req.body;
    Model.create(body).
    then(function (object) {return object.setAuthor(req.author).save();}).
    then(function (object) {return res.return(_defineProperty({}, singular, object));}).
    catch(next);
  };

  var updateObject = function updateObject(req, res, next) {var
    object_id = req.params.object_id;var
    body = req.body;
    Model.get(object_id).
    then(function (object) {return object.setAuthor(req.author).set(body).save();}).
    then(function (object) {return res.return(_defineProperty({}, singular, object));}).
    catch(next);
  };

  var deleteObject = function deleteObject(req, res, next) {var
    object_id = req.params.object_id;
    Model.get(object_id).
    then(function (object) {return object.setAuthor(req.author).remove();}).
    then(function (object) {return res.return(_defineProperty({}, singular, object));}).
    catch(next);
  };

  router.route('/').
  get(allObjects).
  post(addObject);

  router.route('/:object_id').
  all(paramReplacer).
  get(getObject).
  put(updateObject).
  delete(deleteObject);

  return router;
};exports.default =

create;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var Emitter = function () {
  function Emitter(io, room) {_classCallCheck(this, Emitter);
    this.io = io;
    this.room = room;
  }_createClass(Emitter, [{ key: "emit", value: function emit()

    {var _io$to;
      (_io$to = this.io.to(this.room)).emit.apply(_io$to, arguments);
    } }]);return Emitter;}();exports.default =


Emitter;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _express = __webpack_require__(5);var _express2 = _interopRequireDefault(_express);
var _morgan = __webpack_require__(13);var _morgan2 = _interopRequireDefault(_morgan);
var _http = __webpack_require__(14);var _http2 = _interopRequireDefault(_http);
var _cookieParser = __webpack_require__(15);var _cookieParser2 = _interopRequireDefault(_cookieParser);
var _bodyParser = __webpack_require__(16);var _bodyParser2 = _interopRequireDefault(_bodyParser);
var _controllers = __webpack_require__(17);var _controllers2 = _interopRequireDefault(_controllers);
var _db = __webpack_require__(2);var _db2 = _interopRequireDefault(_db);
var _socket = __webpack_require__(32);var _socket2 = _interopRequireDefault(_socket);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var app = (0, _express2.default)();
var httpServer = _http2.default.Server(app);
(0, _socket2.default)(httpServer);
_db2.default.on('error', console.error);
_db2.default.once('open', function () {
  app.use((0, _morgan2.default)('tiny'));
  app.use((0, _cookieParser2.default)());
  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_controllers2.default);
});exports.default =

httpServer;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _express = __webpack_require__(5);var _express2 = _interopRequireDefault(_express);
var _models = __webpack_require__(1);
var _util = __webpack_require__(7);
var _error = __webpack_require__(3);
var _CodeHighRouter = __webpack_require__(10);var _CodeHighRouter2 = _interopRequireDefault(_CodeHighRouter);
var _auth = __webpack_require__(29);var _auth2 = _interopRequireDefault(_auth);
var _solution = __webpack_require__(31);var _solution2 = _interopRequireDefault(_solution);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectWithoutProperties(obj, keys) {var target = {};for (var i in obj) {if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];}return target;}

var router = new _express2.default.Router();

var processWhere = function processWhere(Model, where) {
  var definition = Model.schema.obj;
  var query = {};
  var keys = Object.keys(where);var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
    for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var key = _step.value;
      if (!definition[key]) continue;
      var property = definition[key];
      var value = where[key];
      switch (property.type) {
        case String:
          if (property.enum) {
            query[key] = value;
          } else {
            query[key] = new RegExp(value, 'i');
          }
          break;
        default:
          query[key] = value;}

    }} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}
  return query;
};

var processPopulate = function processPopulate(populate) {
  var fields = populate ? populate.split(',') : [];
  return fields.map(function (field) {
    var query = {};
    var cursor = query;
    var tokens = field.split('.');var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
      for (var _iterator2 = tokens[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var token = _step2.value;
        cursor = cursor.populate = { path: token };
      }} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}
    return query.populate;
  });
};

var getRequestOptions = function getRequestOptions(req) {var _req$query =






  req.query,_req$query$sort = _req$query.sort,sort = _req$query$sort === undefined ? null : _req$query$sort,_req$query$skip = _req$query.skip,skip = _req$query$skip === undefined ? null : _req$query$skip,_req$query$limit = _req$query.limit,limit = _req$query$limit === undefined ? null : _req$query$limit,_req$query$populate = _req$query.populate,populate = _req$query$populate === undefined ? null : _req$query$populate,_where = _objectWithoutProperties(_req$query, ['sort', 'skip', 'limit', 'populate']);
  return {
    sort: sort,
    skip: skip,
    limit: limit,
    populate: processPopulate(populate),
    where: function where(Object) {return processWhere(Object, _where);} };

};

router.use(function (req, res, next) {
  req.options = getRequestOptions(req);

  res.return = function (obj) {
    var flat = {};
    var keys = Object.keys(obj);var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {
      for (var _iterator3 = keys[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var key = _step3.value;
        var value = obj[key];
        if ((0, _util.isMongooseObject)(value)) {
          flat[key] = value.toJSON({ req: req });
        } else if (Array.isArray(value) && (0, _util.isMongooseObject)(value[0])) {
          flat[key] = value.map(function (elem) {return elem.toJSON({ req: req });});
        } else {
          flat[key] = value;
        }
      }} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}
    res.json(flat);
  };var

  token = req.cookies.token;
  if (token) {
    _models.Auth.verify(token).
    catch(function () {
      res.cookie('token', '');
      throw new _error.AuthorizationError();
    }).
    then(function (auth) {return _models.Auth.populate(auth, 'user');}).
    then(function (auth) {return auth.refresh();}).
    then(function (auth) {
      req.author = auth.user;
      next();
    }).
    catch(next);
  } else {
    req.author = new _models.User();
    next();
  }
});
router.use('/auth', _auth2.default);
router.use('/rating', (0, _CodeHighRouter2.default)(_models.Rating, 'rating', 'ratings'));
router.use('/solution', _solution2.default);
router.use('/topic', (0, _CodeHighRouter2.default)(_models.Topic, 'topic', 'topics'));
router.use('/user', (0, _CodeHighRouter2.default)(_models.User, 'user', 'users', _util.replaceMe));
router.use(function (req, res, next) {return next(new _error.NotFoundError());});
router.use(function (err, req, res, next) {
  var statusMap = [
  [_error.AuthorizationError, 401],
  [_error.PermissionError, 403],
  [_error.NotFoundError, 404],
  [Error, 500]];var _statusMap$find =

  statusMap.find(function (_ref) {var _ref2 = _slicedToArray(_ref, 1),Error = _ref2[0];return err instanceof Error;}),_statusMap$find2 = _slicedToArray(_statusMap$find, 2),status = _statusMap$find2[1];
  res.status(status);
  res.json({
    status: status,
    err: err });

  console.error(err);
});exports.default =

router;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _mongoose = __webpack_require__(0);var _mongoose2 = _interopRequireDefault(_mongoose);
var _jsonwebtoken = __webpack_require__(19);var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _db = __webpack_require__(2);var _db2 = _interopRequireDefault(_db);
var _environment = __webpack_require__(6);
var _config = __webpack_require__(24);
var _error = __webpack_require__(3);
var _util = __webpack_require__(7);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

Schema = _mongoose2.default.Schema;var
ObjectId = Schema.Types.ObjectId;

var authSchema = new Schema({
  user: { type: ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true } });


var getExpiresAt = function getExpiresAt() {
  var date = (0, _util.now)();
  date.setDate(date.getDate() + 1);
  return date;
};

authSchema.statics.sign = function (user) {
  return new Promise(function (resolve, reject) {
    _jsonwebtoken2.default.sign({
      user_id: user._id }, _environment.jwtSecret, _config.jwtSignOptions,
    function (err, token) {
      if (err) return reject(err);
      var expiresAt = getExpiresAt();
      resolve(new Auth({
        user: user._id,
        token: token,
        expiresAt: expiresAt }));

    });
  });
};

authSchema.statics.verify = function (token) {
  return Auth.findOne({ token: token }).
  then(function (auth) {
    if (!auth) throw new _error.AuthorizationError();
    return auth.verify();
  });
};

authSchema.methods.verify = function () {
  var auth = this;
  return new Promise(function (resolve, reject) {
    if (auth.expiresAt < (0, _util.now)()) return reject(true);
    _jsonwebtoken2.default.verify(auth.token, _environment.jwtSecret, function (err, decoded) {
      if (err) return reject(err);
      if (!auth.user.equals(decoded.user_id)) return reject(true);
      resolve(auth);
    });
  });
};

authSchema.methods.refresh = function () {
  this.expiresAt = getExpiresAt();
  return this.save();
};

var Auth = _db2.default.model('Auth', authSchema);exports.default =
Auth;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _mongoose = __webpack_require__(0);var _mongoose2 = _interopRequireDefault(_mongoose);
var _error = __webpack_require__(3);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}var

Schema = _mongoose2.default.Schema;var
ObjectId = Schema.Types.ObjectId;

var merge = function merge() {for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}
  var permissions = {};var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
    for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var arg = _step.value;
      var keys = Object.keys(arg || {});var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
        for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var key = _step2.value;
          if (permissions[key] === true) continue;
          if (arg[key] === true) permissions[key] = true;else
          {var _permissions$key;
            if (!permissions[key]) permissions[key] = [];
            (_permissions$key = permissions[key]).push.apply(_permissions$key, _toConsumableArray(arg[key]));
          }
        }} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}
    }} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}
  return permissions;
};

var getMatch = function getMatch() {var permissions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return [
  [permissions.none, function (author) {return false;}],
  [permissions.user, function (author) {return author.isUser();}],
  [permissions.owner, function (author, doc) {return author.isOwner(doc);}],
  [permissions.self, function (author, doc) {return author.isSelf(doc);}],
  [permissions.guest, function (author) {return true;}]];

};

var check = function check(match, author, doc, process) {var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {
    for (var _iterator3 = match[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var _step3$value = _slicedToArray(_step3.value, 2),fields = _step3$value[0],func = _step3$value[1];
      if (fields === undefined) continue;
      var permitted = func(author, doc);
      if (!permitted) {
        if (fields === true) throw new _error.PermissionError();
        if (process) {
          fields.forEach(process);
        }
      }
    }} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}
};

var processSet = function processSet(schema, options) {
  var insertMatch = getMatch(merge(options.set, options.insert));
  var modifyMatch = getMatch(merge(options.set, options.modify));
  schema.pre('save', function (next) {
    var doc = this;
    if (doc._author === true) return next();
    if (options.authorField) {
      if (doc.isModified('author')) return next(new _error.PermissionError());
      doc.author = doc._author;
    }
    try {
      check(doc.isNew ? insertMatch : modifyMatch, doc.author, doc, function (field) {
        if (doc.isModified(field)) throw new _error.PermissionError();
      });
      next();
    } catch (err) {
      next(err);
    }
  });
};

var processGet = function processGet(schema, options) {
  var match = getMatch(options.get);
  var _toJSON = schema.options.toJSON;
  schema.options.toJSON = {
    transform: function transform(doc, ret, options) {
      if (_toJSON && _toJSON.transform) {
        ret = _toJSON.transform(doc, ret, options);
      }
      check(match, options.req.author, doc, function (field) {
        delete ret[field];
      });
      return ret;
    } };

};

var processRemove = function processRemove(schema, options) {
  var match = getMatch(options.remove);
  schema.pre('remove', function (next) {
    var doc = this;
    try {
      check(match, doc.author, doc);
      next();
    } catch (err) {
      next(err);
    }
  });
};

var authorPlugin = function authorPlugin(schema, options) {
  options = _extends({
    authorField: false,
    set: {},
    insert: {},
    modify: {},
    get: {},
    remove: {} },
  options);


  schema.methods.setAuthor = function (author) {
    this._author = author;
    return this;
  };

  schema.methods.force = function () {
    this._author = true;
    return this;
  };

  processSet(schema, options);
  processGet(schema, options);
  processRemove(schema, options);
};exports.default =

authorPlugin;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _error = __webpack_require__(3);

var codeHighPlugin = function codeHighPlugin(schema, options) {
  schema.statics.create = function (body) {
    var Model = this;
    return new Promise(function (resolve, reject) {return resolve(new Model(body));});
  };

  schema.statics.get = function (doc_id) {
    var Model = this;
    return Model.findById(doc_id).
    then(function (doc) {
      if (!doc) throw new _error.NotFoundError();
      return doc;
    });
  };

  var _toJSON = schema.options.toJSON;
  schema.options.toJSON = {
    transform: function transform(doc, ret, options) {
      if (_toJSON && _toJSON.transform) {
        ret = _toJSON.transform(doc, ret, options);
      }
      delete ret.__v;
      return ret;
    } };

};exports.default =

codeHighPlugin;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var jwtSignOptions = {
  expiresIn: '30d' };exports.



jwtSignOptions = jwtSignOptions;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _mongoose = __webpack_require__(0);var _mongoose2 = _interopRequireDefault(_mongoose);
var _db = __webpack_require__(2);var _db2 = _interopRequireDefault(_db);
var _plugins = __webpack_require__(4);
var _Topic = __webpack_require__(9);var _Topic2 = _interopRequireDefault(_Topic);
var _Rating = __webpack_require__(8);var _Rating2 = _interopRequireDefault(_Rating);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

Schema = _mongoose2.default.Schema;var
ObjectId = Schema.Types.ObjectId;

var modelName = 'Solution';
var solutionSchema = new Schema({
  topic: { type: ObjectId, ref: 'Topic', required: true },
  time: { type: Number, required: true },
  code: { type: String, required: true },
  average_stars: { type: Number },
  author: { type: ObjectId, ref: 'User' } });


solutionSchema.plugin(_plugins.authorPlugin, {
  authorField: true,
  insert: {
    user: true },

  modify: {
    none: true },

  get: {
    guest: true },

  remove: {
    none: true } });



solutionSchema.methods.rate = function (stars, author) {
  var solution = this;var
  topic = solution.topic;
  var query = { solution: solution, author: author };
  var body = { solution: solution, stars: stars, author: author };
  return _Rating2.default.findOneAndUpdate(query, body, { upsert: true }).
  then(function () {return _Rating2.default.aggregate([{
      $match: { solution: new _mongoose2.default.Types.ObjectId(solution._id) } },
    {
      $group: { _id: null, average_stars: { $avg: '$stars' } } }]);}).

  then(function (_ref) {var _ref2 = _slicedToArray(_ref, 1),average_stars = _ref2[0].average_stars;
    solution.average_stars = average_stars;
    return solution.force().save();
  }).
  then(function () {return Solution.find({ topic: topic }).sort({ average_stars: -1 }).limit(5);}).
  then(function (top_solutions) {return _Topic2.default.findByIdAndUpdate(topic, { $set: { top_solutions: top_solutions } });}).
  then(function () {return solution;});
};

var Solution = _db2.default.model(modelName, solutionSchema);exports.default =
Solution;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _Testcase = __webpack_require__(27);Object.defineProperty(exports, 'Testcase', { enumerable: true, get: function get() {return _interopRequireDefault(_Testcase).default;} });function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _mongoose = __webpack_require__(0);var _mongoose2 = _interopRequireDefault(_mongoose);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

Schema = _mongoose2.default.Schema;

var testcaseSchema = new Schema({
  eval: { type: String, required: true },
  public: { type: Boolean, required: true } });


testcaseSchema.options.toJSON = {
  transform: function transform(doc, ret, options) {
    delete ret._id;
    return ret;
  } };exports.default =


testcaseSchema;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _mongoose = __webpack_require__(0);var _mongoose2 = _interopRequireDefault(_mongoose);
var _db = __webpack_require__(2);var _db2 = _interopRequireDefault(_db);
var _plugins = __webpack_require__(4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

Schema = _mongoose2.default.Schema;

var modelName = 'User';
var userSchema = new Schema({
  fb_user_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  first_name: { type: String, required: true } });


userSchema.plugin(_plugins.authorPlugin, {
  insert: {
    guest: true },

  modify: {
    none: ['fb_user_id'],
    self: true },

  get: {
    guest: true },

  remove: {
    self: true } });



userSchema.methods.isUser = function () {
  return !this.isNew;
};

userSchema.methods.isOwner = function (doc) {
  return this._id.equals(doc.author._id);
};

userSchema.methods.isSelf = function (doc) {
  return this._id.equals(doc._id);
};

var User = _db2.default.model(modelName, userSchema);exports.default =
User;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _express = __webpack_require__(5);var _express2 = _interopRequireDefault(_express);
var _fb = __webpack_require__(30);var _fb2 = _interopRequireDefault(_fb);
var _models = __webpack_require__(1);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var router = _express2.default.Router();

var createAuth = function createAuth(req, res, next) {var
  fb_access_token = req.body.fb_access_token;
  _fb2.default.setAccessToken(fb_access_token);
  _fb2.default.options({ Promise: Promise });
  _fb2.default.api('me?fields=first_name,name').
  then(function (response) {var
    name = response.name,first_name = response.first_name,fb_user_id = response.id;
    return _models.User.findOne({ fb_user_id: fb_user_id }).
    then(function (user) {
      if (user) return _models.Auth.sign(user);else
      {
        return new _models.User({
          fb_user_id: fb_user_id,
          name: name,
          first_name: first_name }).
        save().
        then(_models.Auth.sign);
      }
    });
  }).
  then(function (auth) {return auth.save();}).
  then(function (auth) {
    res.cookie('token', auth.token);
    res.return({ auth: auth });
  }).
  catch(next);
};

var destroyAuth = function destroyAuth(req, res, next) {var
  token = req.cookies.token;
  _models.Auth.findOne({ token: token }).
  then(function (auth) {
    if (!auth) return auth;
    return auth.remove();
  }).
  then(function (auth) {
    res.cookie('token', '');
    res.return({ auth: auth });
  }).
  catch(next);
};

router.route('/').
post(createAuth).
delete(destroyAuth);exports.default =

router;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("fb");

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _CodeHighRouter = __webpack_require__(10);var _CodeHighRouter2 = _interopRequireDefault(_CodeHighRouter);
var _models = __webpack_require__(1);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var router = (0, _CodeHighRouter2.default)(_models.Solution, 'solution', 'solutions');

var rateSolution = function rateSolution(req, res, next) {var
  solution_id = req.params.solution_id;var
  stars = req.body.stars;
  _models.Solution.get(solution_id).
  then(function (solution) {return solution.rate(stars, req.author);}).
  then(function (solution) {return res.return({ solution: solution });}).
  catch(next);
};

router.route('/:solution_id/rate').
post(rateSolution);exports.default =

router;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _socket = __webpack_require__(33);var _socket2 = _interopRequireDefault(_socket);
var _models = __webpack_require__(1);
var _Game = __webpack_require__(34);var _Game2 = _interopRequireDefault(_Game);
var _Player = __webpack_require__(36);var _Player2 = _interopRequireDefault(_Player);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var connectSocket = function connectSocket(httpServer) {
  var io = (0, _socket2.default)(httpServer, { path: '/socket' });
  var games = [];
  io.on('connection', function (socket) {
    socket.on('AUTH', function (data) {var
      token = data.token;
      _models.Auth.verify(token).
      then(function (auth) {return _models.Auth.populate(auth, 'user');}).
      then(function (auth) {return auth.refresh();}).
      then(function (auth) {
        var author = auth.user.toJSON({ req: {} });
        var game = games.find(function (game) {return !game.finished_at && game.findPlayer(author, function (player) {return !player.isDone();});});
        if (!game) game = games.find(function (game) {return !game.started_at;});
        if (!game) {
          game = new _Game2.default(io, function () {
            var index = games.indexOf(undefined);
            if (~index) games.splice(index, 1);
          });
          games.push(game);
        }
        socket.join(game.room);

        var player = game.findPlayer(author);
        if (player) {
          player.connect();
        } else {
          player = new _Player2.default(io, game, author);
          game.addPlayer(player);
        }

        listenOnPlayer(player);
      }).
      catch(function (err) {
        console.error(err);
        socket.disconnect();
      });
    });

    var listenOnPlayer = function listenOnPlayer(player) {
      socket.on('disconnect', function () {
        player.disconnect();
      });
      socket.on('START_TYPING', function () {
        player.startTyping();
      });
      socket.on('STOP_TYPING', function () {
        player.stopTyping();
      });
      socket.on('SUBMIT', function (code) {
        player.submit(code);
      });
      socket.on('GIVE_UP', function () {
        player.giveUp();
      });
      socket.on('RATE', function (data) {var
        solution_id = data.solution_id,stars = data.stars;
        player.rate(solution_id, stars);
      });
    };
  });
};exports.default =

connectSocket;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _Emitter2 = __webpack_require__(11);var _Emitter3 = _interopRequireDefault(_Emitter2);
var _randomstring = __webpack_require__(35);var _randomstring2 = _interopRequireDefault(_randomstring);
var _models = __webpack_require__(1);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

var COUNTDOWN = 10;
var MIN_PLAYERS = 2;
var MAX_PLAYERS = 8;
var INTERVAL = 100;var

Game = function (_Emitter) {_inherits(Game, _Emitter);
  function Game(io, onRemove) {_classCallCheck(this, Game);var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this,
    io, _randomstring2.default.generate()));

    _this.countdown_at = null;
    _this.started_at = null;
    _this.updated_at = null;
    _this.finished_at = null;
    _this.players = [];
    _this.topic = null;

    var timer = setInterval(function () {
      var now = new Date();
      if (_this.topic) {
        if (_this.started_at && now - _this.started_at >= _this.topic.time * 1000) {
          _this.finish();
        }
        if (_this.finished_at && now - _this.finished_at >= _this.topic.time * _this.players.length * 1000) {
          clearInterval(timer);
          _this.remove();
          onRemove();
        }
      } else {
        if (_this.countdown_at && now - _this.countdown_at >= COUNTDOWN * 1000) {
          _this.start();
        }
      }
    }, INTERVAL);return _this;
  }_createClass(Game, [{ key: 'findPlayer', value: function findPlayer(

    author) {var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {return true;};
      return this.players.find(function (player) {return author.fb_user_id === player.user.fb_user_id && filter(player);});
    } }, { key: 'addPlayer', value: function addPlayer(

    player) {
      this.players.push(player);
      this.updatePlayers();
    } }, { key: 'removePlayer', value: function removePlayer(

    player) {
      var index = this.players.indexOf(player);
      if (~index) {
        this.players.splice(index, 1);
        this.updatePlayers();
      }
    } }, { key: 'isEveryoneDone', value: function isEveryoneDone()

    {
      return this.players.every(function (player) {return player.isDone();});
    } }, { key: 'isPlaying', value: function isPlaying()

    {
      return this.started_at && !this.finished_at;
    } }, { key: 'updatePlayers', value: function updatePlayers()

    {
      if (this.players.length >= MAX_PLAYERS) return this.start();
      this.countdown_at = this.players.length >= MIN_PLAYERS ? new Date() : null;
      this.update();
    } }, { key: 'start', value: function start()

    {var _this2 = this;
      if (!this.started_at) {
        this.started_at = new Date();
        _models.Topic.count().
        then(function (count) {
          var random = Math.floor(Math.random() * count);
          return _models.Topic.findOne().skip(random);
        }).
        then(function (topic) {
          _this2.topic = topic.toJSON({ req: {} });
          _this2.update();
        }).
        catch(console.error);
      }
    } }, { key: 'update', value: function update()

    {
      this.updated_at = new Date();
      this.emit('GAME_UPDATED', this);
    } }, { key: 'finish', value: function finish()

    {
      if (this.isPlaying()) {
        this.finished_at = new Date();
        this.update();
      }
    } }, { key: 'remove', value: function remove()

    {
      this.emit('GAME_REMOVED');
    } }, { key: 'toJSON', value: function toJSON()

    {var

      countdown_at =





      this.countdown_at,started_at = this.started_at,updated_at = this.updated_at,finished_at = this.finished_at,players = this.players,topic = this.topic;
      return {
        countdown_at: countdown_at,
        started_at: started_at,
        updated_at: updated_at,
        finished_at: finished_at,
        players: players,
        topic: topic };

    } }]);return Game;}(_Emitter3.default);exports.default =


Game;

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("randomstring");

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _Emitter2 = __webpack_require__(11);var _Emitter3 = _interopRequireDefault(_Emitter2);
var _models = __webpack_require__(1);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var

Player = function (_Emitter) {_inherits(Player, _Emitter);
  function Player(io, game, author) {_classCallCheck(this, Player);var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this,
    io, game.room));
    _this.game = game;
    _this.connected = 1;

    _this.user = author;
    _this.submitted_at = null;
    _this.given_up_at = null;
    _this.typing = false;
    _this.solution = null;
    _this.ratings = {};
    _this.average_stars = null;return _this;
  }_createClass(Player, [{ key: 'connect', value: function connect()

    {
      this.connected++;
      this.game.update();
    } }, { key: 'disconnect', value: function disconnect()

    {
      if (--this.connected < 1) {
        if (!this.game.started_at) {
          this.game.removePlayer(this);
        } else if (this.game.isPlaying()) {
          this.giveUp();
        }
      }
    } }, { key: 'startTyping', value: function startTyping()

    {
      this.typing = true;
      this.update();
    } }, { key: 'stopTyping', value: function stopTyping()

    {
      this.typing = false;
      this.update();
    } }, { key: 'submit', value: function submit(

    code) {var _this2 = this;
      if (!this.isDone()) {
        this.submitted_at = new Date();
        new _models.Solution({
          topic: this.game.topic,
          time: (this.submitted_at - this.game.started_at) / 1000,
          code: code,
          author: this.user }).
        force().save().
        then(function (solution) {
          _this2.solution = solution.toJSON({ req: {} });
          if (_this2.game.isEveryoneDone()) return _this2.game.finish();
          _this2.update();
        }).
        catch(console.error);
      }
    } }, { key: 'giveUp', value: function giveUp()

    {
      if (!this.isDone()) {
        this.given_up_at = new Date();
        if (this.game.isEveryoneDone()) return this.game.finish();
        this.update();
      }
    } }, { key: 'isDone', value: function isDone()

    {
      return this.submitted_at || this.given_up_at;
    } }, { key: 'update', value: function update()

    {
      this.updated_at = new Date();
      this.emit('PLAYER_UPDATED', this);
    } }, { key: 'rate', value: function rate(

    solution_id, stars) {var _this3 = this;
      _models.Solution.get(solution_id).
      then(function (solution) {return solution.rate(stars, _this3.user);}).
      then(function (solution) {
        var ratedPlayer = _this3.game.players.find(function (player) {return player.solution && player.solution._id.equals(solution_id);});
        ratedPlayer.average_stars = solution.average_stars;
        ratedPlayer.ratings[_this3.user.fb_user_id] = stars;
        _this3.game.players = _this3.game.players.sort(function (p1, p2) {return (p2.average_stars || 0) - (p1.average_stars || 0);});
        _this3.game.update();
      }).
      catch(console.error);
    } }, { key: 'toJSON', value: function toJSON()

    {var

      user =






      this.user,submitted_at = this.submitted_at,given_up_at = this.given_up_at,typing = this.typing,solution = this.solution,ratings = this.ratings,average_stars = this.average_stars;
      return {
        user: user,
        submitted_at: submitted_at,
        given_up_at: given_up_at,
        typing: typing,
        solution: solution,
        ratings: ratings,
        average_stars: average_stars };

    } }]);return Player;}(_Emitter3.default);exports.default =


Player;

/***/ })
/******/ ]);
});