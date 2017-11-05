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
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	function hotDisposeChunk(chunkId) { //eslint-disable-line no-unused-vars
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "83580b0e34a87e4eaef0"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/backend/index.js")(__webpack_require__.s = "./src/backend/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./environment.js":
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__dirname) {const path = __webpack_require__(\"path\");\nconst fs = __webpack_require__(\"fs\");\n\nconst {\n  NODE_ENV = 'production',\n\n  HTTP_PORT = '8080',\n  HTTPS_PORT = '8443',\n  DEV_PROXY_PORT = '3000',\n  SOCKET_PORT = '8183',\n\n  CREDENTIALS_ENABLED = '0',\n  CREDENTIALS_PATH,\n  CREDENTIALS_CA,\n  CREDENTIALS_KEY,\n  CREDENTIALS_CERT,\n\n  MONGO_URI = 'mongodb://localhost/code_high',\n  JWT_SECRET = 'JWT_SECRET_KEY_GOES_HERE',\n\n  WEBHOOK_ENABLED = '0',\n  WEBHOOK_SECRET,\n} = process.env;\n\nconst isEnabled = v => v === '1';\n\nconst __PROD__ = NODE_ENV === 'production';\nconst __DEV__ = !__PROD__;\n\nconst httpPort = parseInt(HTTP_PORT);\nconst httpsPort = parseInt(HTTPS_PORT);\nconst devProxyPort = __DEV__ && parseInt(DEV_PROXY_PORT);\nconst socketPort = parseInt(SOCKET_PORT);\n\nconst read = (file) => fs.readFileSync(path.resolve(CREDENTIALS_PATH, file));\nconst credentials = isEnabled(CREDENTIALS_ENABLED) && {\n  ca: read(CREDENTIALS_CA),\n  key: read(CREDENTIALS_KEY),\n  cert: read(CREDENTIALS_CERT),\n};\n\nconst mongoUri = MONGO_URI;\nconst jwtSecret = JWT_SECRET;\n\nconst webhook = isEnabled(WEBHOOK_ENABLED) && {\n  secret: WEBHOOK_SECRET,\n};\n\nconst builtPath = path.resolve(__dirname, 'built');\nconst frontendBuiltPath = path.resolve(builtPath, 'frontend');\nconst backendBuiltPath = path.resolve(builtPath, 'backend');\nconst srcPath = path.resolve(__dirname, 'src');\nconst frontendSrcPath = path.resolve(srcPath, 'frontend');\nconst backendSrcPath = path.resolve(srcPath, 'backend');\nconst publicPath = path.resolve(__dirname, 'public');\n\nconst endpoint = '/api';\n\nmodule.exports = {\n  __PROD__,\n  __DEV__,\n  httpPort,\n  httpsPort,\n  devProxyPort,\n  socketPort,\n  credentials,\n  mongoUri,\n  jwtSecret,\n  webhook,\n  builtPath,\n  frontendBuiltPath,\n  backendBuiltPath,\n  srcPath,\n  frontendSrcPath,\n  backendSrcPath,\n  publicPath,\n  endpoint,\n};\n/* WEBPACK VAR INJECTION */}.call(exports, \"\"))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9lbnZpcm9ubWVudC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Vudmlyb25tZW50LmpzP2IzZmYiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuY29uc3Qge1xuICBOT0RFX0VOViA9ICdwcm9kdWN0aW9uJyxcblxuICBIVFRQX1BPUlQgPSAnODA4MCcsXG4gIEhUVFBTX1BPUlQgPSAnODQ0MycsXG4gIERFVl9QUk9YWV9QT1JUID0gJzMwMDAnLFxuICBTT0NLRVRfUE9SVCA9ICc4MTgzJyxcblxuICBDUkVERU5USUFMU19FTkFCTEVEID0gJzAnLFxuICBDUkVERU5USUFMU19QQVRILFxuICBDUkVERU5USUFMU19DQSxcbiAgQ1JFREVOVElBTFNfS0VZLFxuICBDUkVERU5USUFMU19DRVJULFxuXG4gIE1PTkdPX1VSSSA9ICdtb25nb2RiOi8vbG9jYWxob3N0L2NvZGVfaGlnaCcsXG4gIEpXVF9TRUNSRVQgPSAnSldUX1NFQ1JFVF9LRVlfR09FU19IRVJFJyxcblxuICBXRUJIT09LX0VOQUJMRUQgPSAnMCcsXG4gIFdFQkhPT0tfU0VDUkVULFxufSA9IHByb2Nlc3MuZW52O1xuXG5jb25zdCBpc0VuYWJsZWQgPSB2ID0+IHYgPT09ICcxJztcblxuY29uc3QgX19QUk9EX18gPSBOT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nO1xuY29uc3QgX19ERVZfXyA9ICFfX1BST0RfXztcblxuY29uc3QgaHR0cFBvcnQgPSBwYXJzZUludChIVFRQX1BPUlQpO1xuY29uc3QgaHR0cHNQb3J0ID0gcGFyc2VJbnQoSFRUUFNfUE9SVCk7XG5jb25zdCBkZXZQcm94eVBvcnQgPSBfX0RFVl9fICYmIHBhcnNlSW50KERFVl9QUk9YWV9QT1JUKTtcbmNvbnN0IHNvY2tldFBvcnQgPSBwYXJzZUludChTT0NLRVRfUE9SVCk7XG5cbmNvbnN0IHJlYWQgPSAoZmlsZSkgPT4gZnMucmVhZEZpbGVTeW5jKHBhdGgucmVzb2x2ZShDUkVERU5USUFMU19QQVRILCBmaWxlKSk7XG5jb25zdCBjcmVkZW50aWFscyA9IGlzRW5hYmxlZChDUkVERU5USUFMU19FTkFCTEVEKSAmJiB7XG4gIGNhOiByZWFkKENSRURFTlRJQUxTX0NBKSxcbiAga2V5OiByZWFkKENSRURFTlRJQUxTX0tFWSksXG4gIGNlcnQ6IHJlYWQoQ1JFREVOVElBTFNfQ0VSVCksXG59O1xuXG5jb25zdCBtb25nb1VyaSA9IE1PTkdPX1VSSTtcbmNvbnN0IGp3dFNlY3JldCA9IEpXVF9TRUNSRVQ7XG5cbmNvbnN0IHdlYmhvb2sgPSBpc0VuYWJsZWQoV0VCSE9PS19FTkFCTEVEKSAmJiB7XG4gIHNlY3JldDogV0VCSE9PS19TRUNSRVQsXG59O1xuXG5jb25zdCBidWlsdFBhdGggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnYnVpbHQnKTtcbmNvbnN0IGZyb250ZW5kQnVpbHRQYXRoID0gcGF0aC5yZXNvbHZlKGJ1aWx0UGF0aCwgJ2Zyb250ZW5kJyk7XG5jb25zdCBiYWNrZW5kQnVpbHRQYXRoID0gcGF0aC5yZXNvbHZlKGJ1aWx0UGF0aCwgJ2JhY2tlbmQnKTtcbmNvbnN0IHNyY1BhdGggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyk7XG5jb25zdCBmcm9udGVuZFNyY1BhdGggPSBwYXRoLnJlc29sdmUoc3JjUGF0aCwgJ2Zyb250ZW5kJyk7XG5jb25zdCBiYWNrZW5kU3JjUGF0aCA9IHBhdGgucmVzb2x2ZShzcmNQYXRoLCAnYmFja2VuZCcpO1xuY29uc3QgcHVibGljUGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdwdWJsaWMnKTtcblxuY29uc3QgZW5kcG9pbnQgPSAnL2FwaSc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBfX1BST0RfXyxcbiAgX19ERVZfXyxcbiAgaHR0cFBvcnQsXG4gIGh0dHBzUG9ydCxcbiAgZGV2UHJveHlQb3J0LFxuICBzb2NrZXRQb3J0LFxuICBjcmVkZW50aWFscyxcbiAgbW9uZ29VcmksXG4gIGp3dFNlY3JldCxcbiAgd2ViaG9vayxcbiAgYnVpbHRQYXRoLFxuICBmcm9udGVuZEJ1aWx0UGF0aCxcbiAgYmFja2VuZEJ1aWx0UGF0aCxcbiAgc3JjUGF0aCxcbiAgZnJvbnRlbmRTcmNQYXRoLFxuICBiYWNrZW5kU3JjUGF0aCxcbiAgcHVibGljUGF0aCxcbiAgZW5kcG9pbnQsXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZW52aXJvbm1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IC4vZW52aXJvbm1lbnQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./environment.js\n");

/***/ }),

/***/ "./src/backend/common/config.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var jwtSignOptions = {\n  expiresIn: '30d' };exports.\n\n\n\njwtSignOptions = jwtSignOptions;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9jb21tb24vY29uZmlnLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tlbmQvY29tbW9uL2NvbmZpZy5qcz8zZTM4Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7dmFyIGp3dFNpZ25PcHRpb25zID0ge1xuICBleHBpcmVzSW46ICczMGQnIH07ZXhwb3J0cy5cblxuXG5cbmp3dFNpZ25PcHRpb25zID0gand0U2lnbk9wdGlvbnM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFja2VuZC9jb21tb24vY29uZmlnLmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9iYWNrZW5kL2NvbW1vbi9jb25maWcuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/backend/common/config.js\n");

/***/ }),

/***/ "./src/backend/common/db.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _mongoose = __webpack_require__(\"mongoose\");var _mongoose2 = _interopRequireDefault(_mongoose);\nvar _environment = __webpack_require__(\"./environment.js\");\nvar _plugins = __webpack_require__(\"./src/backend/models/plugins/index.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\n_mongoose2.default.Promise = global.Promise;\n_mongoose2.default.plugin(_plugins.codeHighPlugin);\nvar db = _mongoose2.default.createConnection(_environment.mongoUri);exports.default =\n\ndb;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9jb21tb24vZGIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2VuZC9jb21tb24vZGIuanM/ZTU2ZSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO3ZhciBfbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO3ZhciBfbW9uZ29vc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbW9uZ29vc2UpO1xudmFyIF9lbnZpcm9ubWVudCA9IHJlcXVpcmUoJy9lbnZpcm9ubWVudCcpO1xudmFyIF9wbHVnaW5zID0gcmVxdWlyZSgnL21vZGVscy9wbHVnaW5zJyk7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtyZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTt9XG5cbl9tb25nb29zZTIuZGVmYXVsdC5Qcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG5fbW9uZ29vc2UyLmRlZmF1bHQucGx1Z2luKF9wbHVnaW5zLmNvZGVIaWdoUGx1Z2luKTtcbnZhciBkYiA9IF9tb25nb29zZTIuZGVmYXVsdC5jcmVhdGVDb25uZWN0aW9uKF9lbnZpcm9ubWVudC5tb25nb1VyaSk7ZXhwb3J0cy5kZWZhdWx0ID1cblxuZGI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFja2VuZC9jb21tb24vZGIuanNcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2JhY2tlbmQvY29tbW9uL2RiLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/backend/common/db.js\n");

/***/ }),

/***/ "./src/backend/common/error.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError(\"Cannot call a class as a function\");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");}return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== \"function\" && superClass !== null) {throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}function _extendableBuiltin(cls) {function ExtendableBuiltin() {var instance = Reflect.construct(cls, Array.from(arguments));Object.setPrototypeOf(instance, Object.getPrototypeOf(this));return instance;}ExtendableBuiltin.prototype = Object.create(cls.prototype, { constructor: { value: cls, enumerable: false, writable: true, configurable: true } });if (Object.setPrototypeOf) {Object.setPrototypeOf(ExtendableBuiltin, cls);} else {ExtendableBuiltin.__proto__ = cls;}return ExtendableBuiltin;}var CodeHighError = function (_extendableBuiltin2) {_inherits(CodeHighError, _extendableBuiltin2);function CodeHighError() {_classCallCheck(this, CodeHighError);return _possibleConstructorReturn(this, (CodeHighError.__proto__ || Object.getPrototypeOf(CodeHighError)).apply(this, arguments));}return CodeHighError;}(_extendableBuiltin(Error));var\n\n\nNotFoundError = function (_CodeHighError) {_inherits(NotFoundError, _CodeHighError);function NotFoundError() {_classCallCheck(this, NotFoundError);return _possibleConstructorReturn(this, (NotFoundError.__proto__ || Object.getPrototypeOf(NotFoundError)).apply(this, arguments));}return NotFoundError;}(CodeHighError);var\n\n\nPermissionError = function (_CodeHighError2) {_inherits(PermissionError, _CodeHighError2);function PermissionError() {_classCallCheck(this, PermissionError);return _possibleConstructorReturn(this, (PermissionError.__proto__ || Object.getPrototypeOf(PermissionError)).apply(this, arguments));}return PermissionError;}(CodeHighError);var\n\n\nAuthorizationError = function (_CodeHighError3) {_inherits(AuthorizationError, _CodeHighError3);function AuthorizationError() {_classCallCheck(this, AuthorizationError);return _possibleConstructorReturn(this, (AuthorizationError.__proto__ || Object.getPrototypeOf(AuthorizationError)).apply(this, arguments));}return AuthorizationError;}(CodeHighError);exports.\n\n\n\nCodeHighError = CodeHighError;exports.\nNotFoundError = NotFoundError;exports.\nPermissionError = PermissionError;exports.\nAuthorizationError = AuthorizationError;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9jb21tb24vZXJyb3IuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2VuZC9jb21tb24vZXJyb3IuanM/OGRkNiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge2lmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTt9fWZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtpZiAoIXNlbGYpIHt0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7fXJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO31mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7dGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7fXN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7aWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO31mdW5jdGlvbiBfZXh0ZW5kYWJsZUJ1aWx0aW4oY2xzKSB7ZnVuY3Rpb24gRXh0ZW5kYWJsZUJ1aWx0aW4oKSB7dmFyIGluc3RhbmNlID0gUmVmbGVjdC5jb25zdHJ1Y3QoY2xzLCBBcnJheS5mcm9tKGFyZ3VtZW50cykpO09iamVjdC5zZXRQcm90b3R5cGVPZihpbnN0YW5jZSwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpKTtyZXR1cm4gaW5zdGFuY2U7fUV4dGVuZGFibGVCdWlsdGluLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoY2xzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogY2xzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pO2lmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtPYmplY3Quc2V0UHJvdG90eXBlT2YoRXh0ZW5kYWJsZUJ1aWx0aW4sIGNscyk7fSBlbHNlIHtFeHRlbmRhYmxlQnVpbHRpbi5fX3Byb3RvX18gPSBjbHM7fXJldHVybiBFeHRlbmRhYmxlQnVpbHRpbjt9dmFyIENvZGVIaWdoRXJyb3IgPSBmdW5jdGlvbiAoX2V4dGVuZGFibGVCdWlsdGluMikge19pbmhlcml0cyhDb2RlSGlnaEVycm9yLCBfZXh0ZW5kYWJsZUJ1aWx0aW4yKTtmdW5jdGlvbiBDb2RlSGlnaEVycm9yKCkge19jbGFzc0NhbGxDaGVjayh0aGlzLCBDb2RlSGlnaEVycm9yKTtyZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKENvZGVIaWdoRXJyb3IuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihDb2RlSGlnaEVycm9yKSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7fXJldHVybiBDb2RlSGlnaEVycm9yO30oX2V4dGVuZGFibGVCdWlsdGluKEVycm9yKSk7dmFyXG5cblxuTm90Rm91bmRFcnJvciA9IGZ1bmN0aW9uIChfQ29kZUhpZ2hFcnJvcikge19pbmhlcml0cyhOb3RGb3VuZEVycm9yLCBfQ29kZUhpZ2hFcnJvcik7ZnVuY3Rpb24gTm90Rm91bmRFcnJvcigpIHtfY2xhc3NDYWxsQ2hlY2sodGhpcywgTm90Rm91bmRFcnJvcik7cmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChOb3RGb3VuZEVycm9yLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTm90Rm91bmRFcnJvcikpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO31yZXR1cm4gTm90Rm91bmRFcnJvcjt9KENvZGVIaWdoRXJyb3IpO3ZhclxuXG5cblBlcm1pc3Npb25FcnJvciA9IGZ1bmN0aW9uIChfQ29kZUhpZ2hFcnJvcjIpIHtfaW5oZXJpdHMoUGVybWlzc2lvbkVycm9yLCBfQ29kZUhpZ2hFcnJvcjIpO2Z1bmN0aW9uIFBlcm1pc3Npb25FcnJvcigpIHtfY2xhc3NDYWxsQ2hlY2sodGhpcywgUGVybWlzc2lvbkVycm9yKTtyZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKFBlcm1pc3Npb25FcnJvci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFBlcm1pc3Npb25FcnJvcikpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO31yZXR1cm4gUGVybWlzc2lvbkVycm9yO30oQ29kZUhpZ2hFcnJvcik7dmFyXG5cblxuQXV0aG9yaXphdGlvbkVycm9yID0gZnVuY3Rpb24gKF9Db2RlSGlnaEVycm9yMykge19pbmhlcml0cyhBdXRob3JpemF0aW9uRXJyb3IsIF9Db2RlSGlnaEVycm9yMyk7ZnVuY3Rpb24gQXV0aG9yaXphdGlvbkVycm9yKCkge19jbGFzc0NhbGxDaGVjayh0aGlzLCBBdXRob3JpemF0aW9uRXJyb3IpO3JldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQXV0aG9yaXphdGlvbkVycm9yLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQXV0aG9yaXphdGlvbkVycm9yKSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7fXJldHVybiBBdXRob3JpemF0aW9uRXJyb3I7fShDb2RlSGlnaEVycm9yKTtleHBvcnRzLlxuXG5cblxuQ29kZUhpZ2hFcnJvciA9IENvZGVIaWdoRXJyb3I7ZXhwb3J0cy5cbk5vdEZvdW5kRXJyb3IgPSBOb3RGb3VuZEVycm9yO2V4cG9ydHMuXG5QZXJtaXNzaW9uRXJyb3IgPSBQZXJtaXNzaW9uRXJyb3I7ZXhwb3J0cy5cbkF1dGhvcml6YXRpb25FcnJvciA9IEF1dGhvcml6YXRpb25FcnJvcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYWNrZW5kL2NvbW1vbi9lcnJvci5qc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvYmFja2VuZC9jb21tb24vZXJyb3IuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/backend/common/error.js\n");

/***/ }),

/***/ "./src/backend/common/util.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });exports.now = exports.isMongooseObject = exports.replaceMe = undefined;var _error = __webpack_require__(\"./src/backend/common/error.js\");\n\nvar replaceMe = function replaceMe(req, res, next) {\n  if (req.params.object_id === 'me') {var\n    author = req.author;\n    if (!author.isUser()) return next(new _error.AuthorizationError());\n    req.params.object_id = author._id;\n  }\n  next();\n};\n\nvar isMongooseObject = function isMongooseObject(object) {return object && object.constructor.name === 'model';};\n\nvar now = function now() {\n  return new Date();\n};exports.\n\n\nreplaceMe = replaceMe;exports.\nisMongooseObject = isMongooseObject;exports.\nnow = now;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9jb21tb24vdXRpbC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZW5kL2NvbW1vbi91dGlsLmpzPzY5YTMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtleHBvcnRzLm5vdyA9IGV4cG9ydHMuaXNNb25nb29zZU9iamVjdCA9IGV4cG9ydHMucmVwbGFjZU1lID0gdW5kZWZpbmVkO3ZhciBfZXJyb3IgPSByZXF1aXJlKCcuL2Vycm9yJyk7XG5cbnZhciByZXBsYWNlTWUgPSBmdW5jdGlvbiByZXBsYWNlTWUocmVxLCByZXMsIG5leHQpIHtcbiAgaWYgKHJlcS5wYXJhbXMub2JqZWN0X2lkID09PSAnbWUnKSB7dmFyXG4gICAgYXV0aG9yID0gcmVxLmF1dGhvcjtcbiAgICBpZiAoIWF1dGhvci5pc1VzZXIoKSkgcmV0dXJuIG5leHQobmV3IF9lcnJvci5BdXRob3JpemF0aW9uRXJyb3IoKSk7XG4gICAgcmVxLnBhcmFtcy5vYmplY3RfaWQgPSBhdXRob3IuX2lkO1xuICB9XG4gIG5leHQoKTtcbn07XG5cbnZhciBpc01vbmdvb3NlT2JqZWN0ID0gZnVuY3Rpb24gaXNNb25nb29zZU9iamVjdChvYmplY3QpIHtyZXR1cm4gb2JqZWN0ICYmIG9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lID09PSAnbW9kZWwnO307XG5cbnZhciBub3cgPSBmdW5jdGlvbiBub3coKSB7XG4gIHJldHVybiBuZXcgRGF0ZSgpO1xufTtleHBvcnRzLlxuXG5cbnJlcGxhY2VNZSA9IHJlcGxhY2VNZTtleHBvcnRzLlxuaXNNb25nb29zZU9iamVjdCA9IGlzTW9uZ29vc2VPYmplY3Q7ZXhwb3J0cy5cbm5vdyA9IG5vdztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYWNrZW5kL2NvbW1vbi91dGlsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9iYWNrZW5kL2NvbW1vbi91dGlsLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/backend/common/util.js\n");

/***/ }),

/***/ "./src/backend/controllers/CodeHighRouter.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _express = __webpack_require__(\"express\");var _express2 = _interopRequireDefault(_express);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}\n\nvar create = function create(Model, singular, plural) {var paramReplacer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (req, res, next) {return next();};\n  var router = _express2.default.Router();\n\n  var allObjects = function allObjects(req, res, next) {\n    Model.find(req.options.where(Model)).\n    then(function (objects) {return res.return(_defineProperty({}, plural, objects));}).\n    catch(next);\n  };\n\n  var getObject = function getObject(req, res, next) {var\n    object_id = req.params.object_id;\n    Model.get(object_id).\n    then(function (object) {return res.return(_defineProperty({}, singular, object));}).\n    catch(next);\n  };\n\n  var addObject = function addObject(req, res, next) {var\n    body = req.body;\n    Model.create(body).\n    then(function (object) {return object.setAuthor(req.author).save();}).\n    then(function (object) {return res.return(_defineProperty({}, singular, object));}).\n    catch(next);\n  };\n\n  var updateObject = function updateObject(req, res, next) {var\n    object_id = req.params.object_id;var\n    body = req.body;\n    Model.get(object_id).\n    then(function (object) {return object.setAuthor(req.author).set(body).save();}).\n    then(function (object) {return res.return(_defineProperty({}, singular, object));}).\n    catch(next);\n  };\n\n  var deleteObject = function deleteObject(req, res, next) {var\n    object_id = req.params.object_id;\n    Model.get(object_id).\n    then(function (object) {return object.setAuthor(req.author).remove();}).\n    then(function (object) {return res.return(_defineProperty({}, singular, object));}).\n    catch(next);\n  };\n\n  router.route('/').\n  get(allObjects).\n  post(addObject);\n\n  router.route('/:object_id').\n  all(paramReplacer).\n  get(getObject).\n  put(updateObject).\n  delete(deleteObject);\n\n  return router;\n};exports.default =\n\ncreate;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9jb250cm9sbGVycy9Db2RlSGlnaFJvdXRlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZW5kL2NvbnRyb2xsZXJzL0NvZGVIaWdoUm91dGVyLmpzP2E5ZTEiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTt2YXIgX2V4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7dmFyIF9leHByZXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V4cHJlc3MpO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7cmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07fWZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtpZiAoa2V5IGluIG9iaikge09iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7fSBlbHNlIHtvYmpba2V5XSA9IHZhbHVlO31yZXR1cm4gb2JqO31cblxudmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShNb2RlbCwgc2luZ3VsYXIsIHBsdXJhbCkge3ZhciBwYXJhbVJlcGxhY2VyID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtyZXR1cm4gbmV4dCgpO307XG4gIHZhciByb3V0ZXIgPSBfZXhwcmVzczIuZGVmYXVsdC5Sb3V0ZXIoKTtcblxuICB2YXIgYWxsT2JqZWN0cyA9IGZ1bmN0aW9uIGFsbE9iamVjdHMocmVxLCByZXMsIG5leHQpIHtcbiAgICBNb2RlbC5maW5kKHJlcS5vcHRpb25zLndoZXJlKE1vZGVsKSkuXG4gICAgdGhlbihmdW5jdGlvbiAob2JqZWN0cykge3JldHVybiByZXMucmV0dXJuKF9kZWZpbmVQcm9wZXJ0eSh7fSwgcGx1cmFsLCBvYmplY3RzKSk7fSkuXG4gICAgY2F0Y2gobmV4dCk7XG4gIH07XG5cbiAgdmFyIGdldE9iamVjdCA9IGZ1bmN0aW9uIGdldE9iamVjdChyZXEsIHJlcywgbmV4dCkge3ZhclxuICAgIG9iamVjdF9pZCA9IHJlcS5wYXJhbXMub2JqZWN0X2lkO1xuICAgIE1vZGVsLmdldChvYmplY3RfaWQpLlxuICAgIHRoZW4oZnVuY3Rpb24gKG9iamVjdCkge3JldHVybiByZXMucmV0dXJuKF9kZWZpbmVQcm9wZXJ0eSh7fSwgc2luZ3VsYXIsIG9iamVjdCkpO30pLlxuICAgIGNhdGNoKG5leHQpO1xuICB9O1xuXG4gIHZhciBhZGRPYmplY3QgPSBmdW5jdGlvbiBhZGRPYmplY3QocmVxLCByZXMsIG5leHQpIHt2YXJcbiAgICBib2R5ID0gcmVxLmJvZHk7XG4gICAgTW9kZWwuY3JlYXRlKGJvZHkpLlxuICAgIHRoZW4oZnVuY3Rpb24gKG9iamVjdCkge3JldHVybiBvYmplY3Quc2V0QXV0aG9yKHJlcS5hdXRob3IpLnNhdmUoKTt9KS5cbiAgICB0aGVuKGZ1bmN0aW9uIChvYmplY3QpIHtyZXR1cm4gcmVzLnJldHVybihfZGVmaW5lUHJvcGVydHkoe30sIHNpbmd1bGFyLCBvYmplY3QpKTt9KS5cbiAgICBjYXRjaChuZXh0KTtcbiAgfTtcblxuICB2YXIgdXBkYXRlT2JqZWN0ID0gZnVuY3Rpb24gdXBkYXRlT2JqZWN0KHJlcSwgcmVzLCBuZXh0KSB7dmFyXG4gICAgb2JqZWN0X2lkID0gcmVxLnBhcmFtcy5vYmplY3RfaWQ7dmFyXG4gICAgYm9keSA9IHJlcS5ib2R5O1xuICAgIE1vZGVsLmdldChvYmplY3RfaWQpLlxuICAgIHRoZW4oZnVuY3Rpb24gKG9iamVjdCkge3JldHVybiBvYmplY3Quc2V0QXV0aG9yKHJlcS5hdXRob3IpLnNldChib2R5KS5zYXZlKCk7fSkuXG4gICAgdGhlbihmdW5jdGlvbiAob2JqZWN0KSB7cmV0dXJuIHJlcy5yZXR1cm4oX2RlZmluZVByb3BlcnR5KHt9LCBzaW5ndWxhciwgb2JqZWN0KSk7fSkuXG4gICAgY2F0Y2gobmV4dCk7XG4gIH07XG5cbiAgdmFyIGRlbGV0ZU9iamVjdCA9IGZ1bmN0aW9uIGRlbGV0ZU9iamVjdChyZXEsIHJlcywgbmV4dCkge3ZhclxuICAgIG9iamVjdF9pZCA9IHJlcS5wYXJhbXMub2JqZWN0X2lkO1xuICAgIE1vZGVsLmdldChvYmplY3RfaWQpLlxuICAgIHRoZW4oZnVuY3Rpb24gKG9iamVjdCkge3JldHVybiBvYmplY3Quc2V0QXV0aG9yKHJlcS5hdXRob3IpLnJlbW92ZSgpO30pLlxuICAgIHRoZW4oZnVuY3Rpb24gKG9iamVjdCkge3JldHVybiByZXMucmV0dXJuKF9kZWZpbmVQcm9wZXJ0eSh7fSwgc2luZ3VsYXIsIG9iamVjdCkpO30pLlxuICAgIGNhdGNoKG5leHQpO1xuICB9O1xuXG4gIHJvdXRlci5yb3V0ZSgnLycpLlxuICBnZXQoYWxsT2JqZWN0cykuXG4gIHBvc3QoYWRkT2JqZWN0KTtcblxuICByb3V0ZXIucm91dGUoJy86b2JqZWN0X2lkJykuXG4gIGFsbChwYXJhbVJlcGxhY2VyKS5cbiAgZ2V0KGdldE9iamVjdCkuXG4gIHB1dCh1cGRhdGVPYmplY3QpLlxuICBkZWxldGUoZGVsZXRlT2JqZWN0KTtcblxuICByZXR1cm4gcm91dGVyO1xufTtleHBvcnRzLmRlZmF1bHQgPVxuXG5jcmVhdGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFja2VuZC9jb250cm9sbGVycy9Db2RlSGlnaFJvdXRlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvYmFja2VuZC9jb250cm9sbGVycy9Db2RlSGlnaFJvdXRlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/backend/controllers/CodeHighRouter.js\n");

/***/ }),

/***/ "./src/backend/controllers/auth.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _express = __webpack_require__(\"express\");var _express2 = _interopRequireDefault(_express);\nvar _fb = __webpack_require__(\"fb\");var _fb2 = _interopRequireDefault(_fb);\nvar _models = __webpack_require__(\"./src/backend/models/index.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\nvar router = _express2.default.Router();\n\nvar createAuth = function createAuth(req, res, next) {var\n  fb_access_token = req.body.fb_access_token;\n  _fb2.default.setAccessToken(fb_access_token);\n  _fb2.default.options({ Promise: Promise });\n  _fb2.default.api('me?fields=first_name,name').\n  then(function (response) {var\n    name = response.name,first_name = response.first_name,fb_user_id = response.id;\n    return _models.User.findOne({ fb_user_id: fb_user_id }).\n    then(function (user) {\n      if (user) return _models.Auth.sign(user);else\n      {\n        return new _models.User({\n          fb_user_id: fb_user_id,\n          name: name,\n          first_name: first_name }).\n        save().\n        then(_models.Auth.sign);\n      }\n    });\n  }).\n  then(function (auth) {return auth.save();}).\n  then(function (auth) {\n    res.cookie('token', auth.token);\n    res.return({ auth: auth });\n  }).\n  catch(next);\n};\n\nvar destroyAuth = function destroyAuth(req, res, next) {var\n  token = req.cookies.token;\n  _models.Auth.findOne({ token: token }).\n  then(function (auth) {\n    if (!auth) return auth;\n    return auth.remove();\n  }).\n  then(function (auth) {\n    res.cookie('token', '');\n    res.return({ auth: auth });\n  }).\n  catch(next);\n};\n\nrouter.route('/').\npost(createAuth).\ndelete(destroyAuth);exports.default =\n\nrouter;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9jb250cm9sbGVycy9hdXRoLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tlbmQvY29udHJvbGxlcnMvYXV0aC5qcz8yYWU5Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7dmFyIF9leHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO3ZhciBfZXhwcmVzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leHByZXNzKTtcbnZhciBfZmIgPSByZXF1aXJlKCdmYicpO3ZhciBfZmIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZmIpO1xudmFyIF9tb2RlbHMgPSByZXF1aXJlKCcvbW9kZWxzJyk7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtyZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTt9XG5cbnZhciByb3V0ZXIgPSBfZXhwcmVzczIuZGVmYXVsdC5Sb3V0ZXIoKTtcblxudmFyIGNyZWF0ZUF1dGggPSBmdW5jdGlvbiBjcmVhdGVBdXRoKHJlcSwgcmVzLCBuZXh0KSB7dmFyXG4gIGZiX2FjY2Vzc190b2tlbiA9IHJlcS5ib2R5LmZiX2FjY2Vzc190b2tlbjtcbiAgX2ZiMi5kZWZhdWx0LnNldEFjY2Vzc1Rva2VuKGZiX2FjY2Vzc190b2tlbik7XG4gIF9mYjIuZGVmYXVsdC5vcHRpb25zKHsgUHJvbWlzZTogUHJvbWlzZSB9KTtcbiAgX2ZiMi5kZWZhdWx0LmFwaSgnbWU/ZmllbGRzPWZpcnN0X25hbWUsbmFtZScpLlxuICB0aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge3ZhclxuICAgIG5hbWUgPSByZXNwb25zZS5uYW1lLGZpcnN0X25hbWUgPSByZXNwb25zZS5maXJzdF9uYW1lLGZiX3VzZXJfaWQgPSByZXNwb25zZS5pZDtcbiAgICByZXR1cm4gX21vZGVscy5Vc2VyLmZpbmRPbmUoeyBmYl91c2VyX2lkOiBmYl91c2VyX2lkIH0pLlxuICAgIHRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgIGlmICh1c2VyKSByZXR1cm4gX21vZGVscy5BdXRoLnNpZ24odXNlcik7ZWxzZVxuICAgICAge1xuICAgICAgICByZXR1cm4gbmV3IF9tb2RlbHMuVXNlcih7XG4gICAgICAgICAgZmJfdXNlcl9pZDogZmJfdXNlcl9pZCxcbiAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgIGZpcnN0X25hbWU6IGZpcnN0X25hbWUgfSkuXG4gICAgICAgIHNhdmUoKS5cbiAgICAgICAgdGhlbihfbW9kZWxzLkF1dGguc2lnbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pLlxuICB0aGVuKGZ1bmN0aW9uIChhdXRoKSB7cmV0dXJuIGF1dGguc2F2ZSgpO30pLlxuICB0aGVuKGZ1bmN0aW9uIChhdXRoKSB7XG4gICAgcmVzLmNvb2tpZSgndG9rZW4nLCBhdXRoLnRva2VuKTtcbiAgICByZXMucmV0dXJuKHsgYXV0aDogYXV0aCB9KTtcbiAgfSkuXG4gIGNhdGNoKG5leHQpO1xufTtcblxudmFyIGRlc3Ryb3lBdXRoID0gZnVuY3Rpb24gZGVzdHJveUF1dGgocmVxLCByZXMsIG5leHQpIHt2YXJcbiAgdG9rZW4gPSByZXEuY29va2llcy50b2tlbjtcbiAgX21vZGVscy5BdXRoLmZpbmRPbmUoeyB0b2tlbjogdG9rZW4gfSkuXG4gIHRoZW4oZnVuY3Rpb24gKGF1dGgpIHtcbiAgICBpZiAoIWF1dGgpIHJldHVybiBhdXRoO1xuICAgIHJldHVybiBhdXRoLnJlbW92ZSgpO1xuICB9KS5cbiAgdGhlbihmdW5jdGlvbiAoYXV0aCkge1xuICAgIHJlcy5jb29raWUoJ3Rva2VuJywgJycpO1xuICAgIHJlcy5yZXR1cm4oeyBhdXRoOiBhdXRoIH0pO1xuICB9KS5cbiAgY2F0Y2gobmV4dCk7XG59O1xuXG5yb3V0ZXIucm91dGUoJy8nKS5cbnBvc3QoY3JlYXRlQXV0aCkuXG5kZWxldGUoZGVzdHJveUF1dGgpO2V4cG9ydHMuZGVmYXVsdCA9XG5cbnJvdXRlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYWNrZW5kL2NvbnRyb2xsZXJzL2F1dGguanNcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2JhY2tlbmQvY29udHJvbGxlcnMvYXV0aC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/backend/controllers/auth.js\n");

/***/ }),

/***/ "./src/backend/controllers/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i[\"return\"]) _i[\"return\"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError(\"Invalid attempt to destructure non-iterable instance\");}};}();var _express = __webpack_require__(\"express\");var _express2 = _interopRequireDefault(_express);\nvar _models = __webpack_require__(\"./src/backend/models/index.js\");\nvar _util = __webpack_require__(\"./src/backend/common/util.js\");\nvar _error = __webpack_require__(\"./src/backend/common/error.js\");\nvar _CodeHighRouter = __webpack_require__(\"./src/backend/controllers/CodeHighRouter.js\");var _CodeHighRouter2 = _interopRequireDefault(_CodeHighRouter);\nvar _auth = __webpack_require__(\"./src/backend/controllers/auth.js\");var _auth2 = _interopRequireDefault(_auth);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectWithoutProperties(obj, keys) {var target = {};for (var i in obj) {if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}\n\nvar router = new _express2.default.Router();\n\nvar processWhere = function processWhere(Model, where) {\n  var definition = Model.schema.obj;\n  var $and = [];\n  var keys = Object.keys(where);var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {\n    for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var key = _step.value;\n      if (!definition[key]) continue;\n      var property = definition[key];\n      var value = where[key];\n      switch (property.type) {\n        case String:\n          if (property.enum) {\n            $and.push(_defineProperty({}, key, value));\n          } else {\n            $and.push(_defineProperty({}, key, new RegExp(value, 'i')));\n          }\n          break;\n        default:\n          $and.push(_defineProperty({}, key, value));}\n\n    }} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}\n  return $and.length ? { $and: $and } : {};\n};\n\nvar getRequestOptions = function getRequestOptions(req) {var _req$query =\n\n\n\n  req.query,_req$query$populate = _req$query.populate,populate = _req$query$populate === undefined ? '' : _req$query$populate,_where = _objectWithoutProperties(_req$query, ['populate']);\n  return {\n    populate: populate.split(','),\n    where: function where(Object) {return processWhere(Object, _where);} };\n\n};\n\nrouter.use(function (req, res, next) {\n  req.options = getRequestOptions(req);\n\n  res.return = function (obj) {\n    var flat = {};\n    var keys = Object.keys(obj);\n    var promises = keys.map(function (key) {return new Promise(function (resolve, reject) {\n        var value = obj[key];\n        if ((0, _util.isMongooseObject)(value)) {\n          var _Object = value.constructor;\n          resolve(_Object.populate(value, req.options.populate).\n          then(function (newValue) {\n            flat[key] = newValue.toJSON({ req: req });\n          }));\n        } else if (Array.isArray(value) && (0, _util.isMongooseObject)(value[0])) {\n          var _Object2 = value[0].constructor;\n          resolve(_Object2.populate(value, req.options.populate).\n          then(function (newValue) {\n            flat[key] = newValue.map(function (elem) {return elem.toJSON({ req: req });});\n          }));\n        } else {\n          flat[key] = value;\n          resolve();\n        }\n      });});\n    return Promise.all(promises).\n    then(function () {return res.json(flat);});\n  };var\n\n  token = req.cookies.token;\n  if (token) {\n    _models.Auth.verify(token).\n    catch(function () {\n      res.cookie('token', '');\n      throw new _error.AuthorizationError();\n    }).\n    then(function (auth) {return _models.Auth.populate(auth, 'user');}).\n    then(function (auth) {return auth.refresh();}).\n    then(function (auth) {\n      req.author = auth.user;\n      next();\n    }).\n    catch(next);\n  } else {\n    req.author = new _models.User();\n    next();\n  }\n});\nrouter.use('/auth', _auth2.default);\nrouter.use('/rating', (0, _CodeHighRouter2.default)(_models.Rating, 'rating', 'ratings'));\nrouter.use('/solution', (0, _CodeHighRouter2.default)(_models.Solution, 'solution', 'solutions'));\nrouter.use('/testcase', (0, _CodeHighRouter2.default)(_models.Testcase, 'testcase', 'testcases'));\nrouter.use('/topic', (0, _CodeHighRouter2.default)(_models.Topic, 'topic', 'topics'));\nrouter.use('/user', (0, _CodeHighRouter2.default)(_models.User, 'user', 'users', _util.replaceMe));\nrouter.use(function (req, res, next) {return next(new _error.NotFoundError());});\nrouter.use(function (err, req, res, next) {\n  var statusMap = [\n  [_error.AuthorizationError, 401],\n  [_error.PermissionError, 403],\n  [_error.NotFoundError, 404],\n  [Error, 500]];var _statusMap$find =\n\n  statusMap.find(function (_ref) {var _ref2 = _slicedToArray(_ref, 1),Error = _ref2[0];return err instanceof Error;}),_statusMap$find2 = _slicedToArray(_statusMap$find, 2),status = _statusMap$find2[1];\n  res.status(status);\n  res.json({\n    status: status,\n    err: err });\n\n  console.error(err);\n});exports.default =\n\nrouter;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9jb250cm9sbGVycy9pbmRleC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZW5kL2NvbnRyb2xsZXJzL2luZGV4LmpzPzVmYTciXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTt2YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7ZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHt2YXIgX2FyciA9IFtdO3ZhciBfbiA9IHRydWU7dmFyIF9kID0gZmFsc2U7dmFyIF9lID0gdW5kZWZpbmVkO3RyeSB7Zm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge19hcnIucHVzaChfcy52YWx1ZSk7aWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO319IGNhdGNoIChlcnIpIHtfZCA9IHRydWU7X2UgPSBlcnI7fSBmaW5hbGx5IHt0cnkge2lmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7fSBmaW5hbGx5IHtpZiAoX2QpIHRocm93IF9lO319cmV0dXJuIF9hcnI7fXJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7aWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge3JldHVybiBhcnI7fSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHtyZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO30gZWxzZSB7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7fX07fSgpO3ZhciBfZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTt2YXIgX2V4cHJlc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXhwcmVzcyk7XG52YXIgX21vZGVscyA9IHJlcXVpcmUoJy9tb2RlbHMnKTtcbnZhciBfdXRpbCA9IHJlcXVpcmUoJy9jb21tb24vdXRpbCcpO1xudmFyIF9lcnJvciA9IHJlcXVpcmUoJy9jb21tb24vZXJyb3InKTtcbnZhciBfQ29kZUhpZ2hSb3V0ZXIgPSByZXF1aXJlKCcuL0NvZGVIaWdoUm91dGVyJyk7dmFyIF9Db2RlSGlnaFJvdXRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db2RlSGlnaFJvdXRlcik7XG52YXIgX2F1dGggPSByZXF1aXJlKCcuL2F1dGgnKTt2YXIgX2F1dGgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXV0aCk7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtyZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTt9ZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykge3ZhciB0YXJnZXQgPSB7fTtmb3IgKHZhciBpIGluIG9iaikge2lmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7aWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7dGFyZ2V0W2ldID0gb2JqW2ldO31yZXR1cm4gdGFyZ2V0O31mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7aWYgKGtleSBpbiBvYmopIHtPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pO30gZWxzZSB7b2JqW2tleV0gPSB2YWx1ZTt9cmV0dXJuIG9iajt9XG5cbnZhciByb3V0ZXIgPSBuZXcgX2V4cHJlc3MyLmRlZmF1bHQuUm91dGVyKCk7XG5cbnZhciBwcm9jZXNzV2hlcmUgPSBmdW5jdGlvbiBwcm9jZXNzV2hlcmUoTW9kZWwsIHdoZXJlKSB7XG4gIHZhciBkZWZpbml0aW9uID0gTW9kZWwuc2NoZW1hLm9iajtcbiAgdmFyICRhbmQgPSBbXTtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh3aGVyZSk7dmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO3ZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO3ZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDt0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGtleXNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7dmFyIGtleSA9IF9zdGVwLnZhbHVlO1xuICAgICAgaWYgKCFkZWZpbml0aW9uW2tleV0pIGNvbnRpbnVlO1xuICAgICAgdmFyIHByb3BlcnR5ID0gZGVmaW5pdGlvbltrZXldO1xuICAgICAgdmFyIHZhbHVlID0gd2hlcmVba2V5XTtcbiAgICAgIHN3aXRjaCAocHJvcGVydHkudHlwZSkge1xuICAgICAgICBjYXNlIFN0cmluZzpcbiAgICAgICAgICBpZiAocHJvcGVydHkuZW51bSkge1xuICAgICAgICAgICAgJGFuZC5wdXNoKF9kZWZpbmVQcm9wZXJ0eSh7fSwga2V5LCB2YWx1ZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkYW5kLnB1c2goX2RlZmluZVByb3BlcnR5KHt9LCBrZXksIG5ldyBSZWdFeHAodmFsdWUsICdpJykpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgJGFuZC5wdXNoKF9kZWZpbmVQcm9wZXJ0eSh7fSwga2V5LCB2YWx1ZSkpO31cblxuICAgIH19IGNhdGNoIChlcnIpIHtfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7X2l0ZXJhdG9yRXJyb3IgPSBlcnI7fSBmaW5hbGx5IHt0cnkge2lmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7X2l0ZXJhdG9yLnJldHVybigpO319IGZpbmFsbHkge2lmIChfZGlkSXRlcmF0b3JFcnJvcikge3Rocm93IF9pdGVyYXRvckVycm9yO319fVxuICByZXR1cm4gJGFuZC5sZW5ndGggPyB7ICRhbmQ6ICRhbmQgfSA6IHt9O1xufTtcblxudmFyIGdldFJlcXVlc3RPcHRpb25zID0gZnVuY3Rpb24gZ2V0UmVxdWVzdE9wdGlvbnMocmVxKSB7dmFyIF9yZXEkcXVlcnkgPVxuXG5cblxuICByZXEucXVlcnksX3JlcSRxdWVyeSRwb3B1bGF0ZSA9IF9yZXEkcXVlcnkucG9wdWxhdGUscG9wdWxhdGUgPSBfcmVxJHF1ZXJ5JHBvcHVsYXRlID09PSB1bmRlZmluZWQgPyAnJyA6IF9yZXEkcXVlcnkkcG9wdWxhdGUsX3doZXJlID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZXEkcXVlcnksIFsncG9wdWxhdGUnXSk7XG4gIHJldHVybiB7XG4gICAgcG9wdWxhdGU6IHBvcHVsYXRlLnNwbGl0KCcsJyksXG4gICAgd2hlcmU6IGZ1bmN0aW9uIHdoZXJlKE9iamVjdCkge3JldHVybiBwcm9jZXNzV2hlcmUoT2JqZWN0LCBfd2hlcmUpO30gfTtcblxufTtcblxucm91dGVyLnVzZShmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtcbiAgcmVxLm9wdGlvbnMgPSBnZXRSZXF1ZXN0T3B0aW9ucyhyZXEpO1xuXG4gIHJlcy5yZXR1cm4gPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIGZsYXQgPSB7fTtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgdmFyIHByb21pc2VzID0ga2V5cy5tYXAoZnVuY3Rpb24gKGtleSkge3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IG9ialtrZXldO1xuICAgICAgICBpZiAoKDAsIF91dGlsLmlzTW9uZ29vc2VPYmplY3QpKHZhbHVlKSkge1xuICAgICAgICAgIHZhciBfT2JqZWN0ID0gdmFsdWUuY29uc3RydWN0b3I7XG4gICAgICAgICAgcmVzb2x2ZShfT2JqZWN0LnBvcHVsYXRlKHZhbHVlLCByZXEub3B0aW9ucy5wb3B1bGF0ZSkuXG4gICAgICAgICAgdGhlbihmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGZsYXRba2V5XSA9IG5ld1ZhbHVlLnRvSlNPTih7IHJlcTogcmVxIH0pO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiAoMCwgX3V0aWwuaXNNb25nb29zZU9iamVjdCkodmFsdWVbMF0pKSB7XG4gICAgICAgICAgdmFyIF9PYmplY3QyID0gdmFsdWVbMF0uY29uc3RydWN0b3I7XG4gICAgICAgICAgcmVzb2x2ZShfT2JqZWN0Mi5wb3B1bGF0ZSh2YWx1ZSwgcmVxLm9wdGlvbnMucG9wdWxhdGUpLlxuICAgICAgICAgIHRoZW4oZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBmbGF0W2tleV0gPSBuZXdWYWx1ZS5tYXAoZnVuY3Rpb24gKGVsZW0pIHtyZXR1cm4gZWxlbS50b0pTT04oeyByZXE6IHJlcSB9KTt9KTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmxhdFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTt9KTtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLlxuICAgIHRoZW4oZnVuY3Rpb24gKCkge3JldHVybiByZXMuanNvbihmbGF0KTt9KTtcbiAgfTt2YXJcblxuICB0b2tlbiA9IHJlcS5jb29raWVzLnRva2VuO1xuICBpZiAodG9rZW4pIHtcbiAgICBfbW9kZWxzLkF1dGgudmVyaWZ5KHRva2VuKS5cbiAgICBjYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICByZXMuY29va2llKCd0b2tlbicsICcnKTtcbiAgICAgIHRocm93IG5ldyBfZXJyb3IuQXV0aG9yaXphdGlvbkVycm9yKCk7XG4gICAgfSkuXG4gICAgdGhlbihmdW5jdGlvbiAoYXV0aCkge3JldHVybiBfbW9kZWxzLkF1dGgucG9wdWxhdGUoYXV0aCwgJ3VzZXInKTt9KS5cbiAgICB0aGVuKGZ1bmN0aW9uIChhdXRoKSB7cmV0dXJuIGF1dGgucmVmcmVzaCgpO30pLlxuICAgIHRoZW4oZnVuY3Rpb24gKGF1dGgpIHtcbiAgICAgIHJlcS5hdXRob3IgPSBhdXRoLnVzZXI7XG4gICAgICBuZXh0KCk7XG4gICAgfSkuXG4gICAgY2F0Y2gobmV4dCk7XG4gIH0gZWxzZSB7XG4gICAgcmVxLmF1dGhvciA9IG5ldyBfbW9kZWxzLlVzZXIoKTtcbiAgICBuZXh0KCk7XG4gIH1cbn0pO1xucm91dGVyLnVzZSgnL2F1dGgnLCBfYXV0aDIuZGVmYXVsdCk7XG5yb3V0ZXIudXNlKCcvcmF0aW5nJywgKDAsIF9Db2RlSGlnaFJvdXRlcjIuZGVmYXVsdCkoX21vZGVscy5SYXRpbmcsICdyYXRpbmcnLCAncmF0aW5ncycpKTtcbnJvdXRlci51c2UoJy9zb2x1dGlvbicsICgwLCBfQ29kZUhpZ2hSb3V0ZXIyLmRlZmF1bHQpKF9tb2RlbHMuU29sdXRpb24sICdzb2x1dGlvbicsICdzb2x1dGlvbnMnKSk7XG5yb3V0ZXIudXNlKCcvdGVzdGNhc2UnLCAoMCwgX0NvZGVIaWdoUm91dGVyMi5kZWZhdWx0KShfbW9kZWxzLlRlc3RjYXNlLCAndGVzdGNhc2UnLCAndGVzdGNhc2VzJykpO1xucm91dGVyLnVzZSgnL3RvcGljJywgKDAsIF9Db2RlSGlnaFJvdXRlcjIuZGVmYXVsdCkoX21vZGVscy5Ub3BpYywgJ3RvcGljJywgJ3RvcGljcycpKTtcbnJvdXRlci51c2UoJy91c2VyJywgKDAsIF9Db2RlSGlnaFJvdXRlcjIuZGVmYXVsdCkoX21vZGVscy5Vc2VyLCAndXNlcicsICd1c2VycycsIF91dGlsLnJlcGxhY2VNZSkpO1xucm91dGVyLnVzZShmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHtyZXR1cm4gbmV4dChuZXcgX2Vycm9yLk5vdEZvdW5kRXJyb3IoKSk7fSk7XG5yb3V0ZXIudXNlKGZ1bmN0aW9uIChlcnIsIHJlcSwgcmVzLCBuZXh0KSB7XG4gIHZhciBzdGF0dXNNYXAgPSBbXG4gIFtfZXJyb3IuQXV0aG9yaXphdGlvbkVycm9yLCA0MDFdLFxuICBbX2Vycm9yLlBlcm1pc3Npb25FcnJvciwgNDAzXSxcbiAgW19lcnJvci5Ob3RGb3VuZEVycm9yLCA0MDRdLFxuICBbRXJyb3IsIDUwMF1dO3ZhciBfc3RhdHVzTWFwJGZpbmQgPVxuXG4gIHN0YXR1c01hcC5maW5kKGZ1bmN0aW9uIChfcmVmKSB7dmFyIF9yZWYyID0gX3NsaWNlZFRvQXJyYXkoX3JlZiwgMSksRXJyb3IgPSBfcmVmMlswXTtyZXR1cm4gZXJyIGluc3RhbmNlb2YgRXJyb3I7fSksX3N0YXR1c01hcCRmaW5kMiA9IF9zbGljZWRUb0FycmF5KF9zdGF0dXNNYXAkZmluZCwgMiksc3RhdHVzID0gX3N0YXR1c01hcCRmaW5kMlsxXTtcbiAgcmVzLnN0YXR1cyhzdGF0dXMpO1xuICByZXMuanNvbih7XG4gICAgc3RhdHVzOiBzdGF0dXMsXG4gICAgZXJyOiBlcnIgfSk7XG5cbiAgY29uc29sZS5lcnJvcihlcnIpO1xufSk7ZXhwb3J0cy5kZWZhdWx0ID1cblxucm91dGVyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JhY2tlbmQvY29udHJvbGxlcnMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2JhY2tlbmQvY29udHJvbGxlcnMvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/backend/controllers/index.js\n");

/***/ }),

/***/ "./src/backend/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });exports.io = exports.app = undefined;var _express = __webpack_require__(\"express\");var _express2 = _interopRequireDefault(_express);\nvar _morgan = __webpack_require__(\"morgan\");var _morgan2 = _interopRequireDefault(_morgan);\nvar _cookieParser = __webpack_require__(\"cookie-parser\");var _cookieParser2 = _interopRequireDefault(_cookieParser);\nvar _bodyParser = __webpack_require__(\"body-parser\");var _bodyParser2 = _interopRequireDefault(_bodyParser);\nvar _controllers = __webpack_require__(\"./src/backend/controllers/index.js\");var _controllers2 = _interopRequireDefault(_controllers);\nvar _db = __webpack_require__(\"./src/backend/common/db.js\");var _db2 = _interopRequireDefault(_db);\nvar _io = __webpack_require__(\"./src/backend/io.js\");var _io2 = _interopRequireDefault(_io);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\nvar app = (0, _express2.default)();\n_db2.default.on('error', console.error);\n_db2.default.once('open', function () {\n  app.use((0, _morgan2.default)('tiny'));\n  app.use((0, _cookieParser2.default)());\n  app.use(_bodyParser2.default.json());\n  app.use(_bodyParser2.default.urlencoded({ extended: true }));\n  app.use(_controllers2.default);\n});exports.\n\napp = app;exports.io = _io2.default;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9pbmRleC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZW5kL2luZGV4LmpzP2VjMGUiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtleHBvcnRzLmlvID0gZXhwb3J0cy5hcHAgPSB1bmRlZmluZWQ7dmFyIF9leHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO3ZhciBfZXhwcmVzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leHByZXNzKTtcbnZhciBfbW9yZ2FuID0gcmVxdWlyZSgnbW9yZ2FuJyk7dmFyIF9tb3JnYW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbW9yZ2FuKTtcbnZhciBfY29va2llUGFyc2VyID0gcmVxdWlyZSgnY29va2llLXBhcnNlcicpO3ZhciBfY29va2llUGFyc2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Nvb2tpZVBhcnNlcik7XG52YXIgX2JvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO3ZhciBfYm9keVBhcnNlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ib2R5UGFyc2VyKTtcbnZhciBfY29udHJvbGxlcnMgPSByZXF1aXJlKCcvY29udHJvbGxlcnMnKTt2YXIgX2NvbnRyb2xsZXJzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbnRyb2xsZXJzKTtcbnZhciBfZGIgPSByZXF1aXJlKCcvY29tbW9uL2RiJyk7dmFyIF9kYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kYik7XG52YXIgX2lvID0gcmVxdWlyZSgnLi9pbycpO3ZhciBfaW8yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW8pO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7cmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07fVxuXG52YXIgYXBwID0gKDAsIF9leHByZXNzMi5kZWZhdWx0KSgpO1xuX2RiMi5kZWZhdWx0Lm9uKCdlcnJvcicsIGNvbnNvbGUuZXJyb3IpO1xuX2RiMi5kZWZhdWx0Lm9uY2UoJ29wZW4nLCBmdW5jdGlvbiAoKSB7XG4gIGFwcC51c2UoKDAsIF9tb3JnYW4yLmRlZmF1bHQpKCd0aW55JykpO1xuICBhcHAudXNlKCgwLCBfY29va2llUGFyc2VyMi5kZWZhdWx0KSgpKTtcbiAgYXBwLnVzZShfYm9keVBhcnNlcjIuZGVmYXVsdC5qc29uKCkpO1xuICBhcHAudXNlKF9ib2R5UGFyc2VyMi5kZWZhdWx0LnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG4gIGFwcC51c2UoX2NvbnRyb2xsZXJzMi5kZWZhdWx0KTtcbn0pO2V4cG9ydHMuXG5cbmFwcCA9IGFwcDtleHBvcnRzLmlvID0gX2lvMi5kZWZhdWx0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JhY2tlbmQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2JhY2tlbmQvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/backend/index.js\n");

/***/ }),

/***/ "./src/backend/io.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _socket = __webpack_require__(\"socket.io\");var _socket2 = _interopRequireDefault(_socket);\nvar _models = __webpack_require__(\"./src/backend/models/index.js\");\nvar _randomstring = __webpack_require__(\"randomstring\");var _randomstring2 = _interopRequireDefault(_randomstring);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\n\nvar io = (0, _socket2.default)();\nvar games = [];\nio.on('connection', function (socket) {\n  var socketUser = null;\n\n  socket.on('AUTH', function (data) {var\n    token = data.token;\n    _models.Auth.verify(token).\n    then(function (auth) {return _models.Auth.populate(auth, 'user');}).\n    then(function (auth) {return auth.refresh();}).\n    then(function (auth) {\n      socketUser = auth.user;var _auth$user =\n      auth.user,fb_user_id = _auth$user.fb_user_id,name = _auth$user.name;\n      assignPlayer({ fb_user_id: fb_user_id, name: name });\n    }).\n    catch(function (err) {\n      console.error(err);\n      socket.disconnect();\n    });\n  });\n\n  var assignPlayer = function assignPlayer(user) {\n    var game = games.find(function (game) {return game.players.some(function (player) {return !game.finished_at && user.fb_user_id === player.user.fb_user_id;});});\n    if (!game) {\n      game = games.find(function (game) {return !game.started_at;});\n    }\n    if (!game) {\n      game = {\n        room: _randomstring2.default.generate(),\n        started_at: null,\n        updated_at: null,\n        finished_at: null,\n        players: [],\n        topic_id: null,\n        topic_time: null };\n\n      games.push(game);\n    }\n    socket.join(game.room);\n\n    var player = game.players.find(function (player) {return user.fb_user_id === player.user.fb_user_id;});\n    if (!player) {\n      player = {\n        user: user,\n        submitted_at: null,\n        given_up_at: null,\n        code: null,\n        typing: false,\n        solution_id: null,\n        ratings: [],\n        average_rating: null };\n\n      game.players.push(player);\n    }\n\n    if (game.started_at || game.players.length < 2) {\n      updateGame(game);\n    } else {\n      game.started_at = new Date();\n      _models.Topic.count().\n      then(function (count) {\n        var random = Math.random() * count | 0;\n        return _models.Topic.findOne().skip(random);\n      }).\n      then(function (topic) {\n        game.topic_id = topic._id;\n        game.topic_time = topic.time;\n        updateGame(game);\n      }).\n      catch(console.error);\n    }\n\n    socket.on('START_TYPING', function () {\n      player.typing = true;\n      updateGame(game);\n    });\n    socket.on('STOP_TYPING', function () {\n      player.typing = false;\n      updateGame(game);\n    });\n    socket.on('SUBMIT', function (code) {\n      player.submitted_at = new Date();\n      player.code = code;\n      new _models.Solution({\n        topic: game.topic_id,\n        time: (player.submitted_at - game.started_at) / 1000,\n        code: code }).\n      setAuthor(socketUser).save().\n      then(function (solution) {\n        player.solution_id = solution._id;\n        updateGame(game);\n      }).\n      catch(console.error);\n    });\n    socket.on('GIVE_UP', function () {\n      player.given_up_at = new Date();\n      updateGame(game);\n    });\n    socket.on('RATE', function (data) {var\n      solution = data.solution_id,stars = data.stars;\n      var authors = [socketUser];\n      var query = { solution: solution, authors: authors };\n      var body = { solution: solution, stars: stars, authors: authors };\n      _models.Rating.findOneAndUpdate(query, body, { upsert: true }).\n      then(function () {return _models.Rating.find({ solution: solution }).populate('authors');}).\n      then(function (ratings) {\n        var ratedPlayer = game.players.find(function (player) {return player.solution_id && player.solution_id.equals(solution);});\n        ratedPlayer.ratings = ratings.map(function (rating) {\n          var fb_user_id = rating.authors[0].fb_user_id;\n          var stars = rating.stars;\n          return { fb_user_id: fb_user_id, stars: stars };\n        });\n        var total_rating = ratedPlayer.ratings.reduce(function (sum, rating) {return sum + rating.stars;}, 0);\n        ratedPlayer.average_rating = ratedPlayer.ratings.length ? total_rating / ratedPlayer.ratings.length : null;\n        game.players = game.players.sort(function (p1, p2) {return (p2.average_rating || 0) - (p1.average_rating || 0);});\n        updateGame(game);\n      }).\n      catch(console.error);\n    });\n  };\n\n  var updateGame = function updateGame(game) {\n    game.updated_at = new Date();\n    var all_submitted = game.players.every(function (player) {return player.submitted_at || player.given_up_at;});\n    var time_done = game.topic_id && (game.updated_at - game.started_at) / 1000 > game.topic_time;\n    if (!game.finished_at && (all_submitted || time_done)) {\n      game.finished_at = game.updated_at;\n      setTimeout(function () {\n        io.to(game.room).emit('GAME_REMOVED');\n        var index = games.indexOf(game);\n        if (~index) games.splice(index, 1);\n      }, 5 * 60 * 1000);\n    }\n    console.log(game);\n    io.to(game.room).emit('GAME_UPDATED', game);\n  };\n});exports.default =\n\nio;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9pby5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZW5kL2lvLmpzPzRjMjciXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTt2YXIgX3NvY2tldCA9IHJlcXVpcmUoJ3NvY2tldC5pbycpO3ZhciBfc29ja2V0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NvY2tldCk7XG52YXIgX21vZGVscyA9IHJlcXVpcmUoJy9tb2RlbHMnKTtcbnZhciBfcmFuZG9tc3RyaW5nID0gcmVxdWlyZSgncmFuZG9tc3RyaW5nJyk7dmFyIF9yYW5kb21zdHJpbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmFuZG9tc3RyaW5nKTtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge3JldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9O31cblxudmFyIGlvID0gKDAsIF9zb2NrZXQyLmRlZmF1bHQpKCk7XG52YXIgZ2FtZXMgPSBbXTtcbmlvLm9uKCdjb25uZWN0aW9uJywgZnVuY3Rpb24gKHNvY2tldCkge1xuICB2YXIgc29ja2V0VXNlciA9IG51bGw7XG5cbiAgc29ja2V0Lm9uKCdBVVRIJywgZnVuY3Rpb24gKGRhdGEpIHt2YXJcbiAgICB0b2tlbiA9IGRhdGEudG9rZW47XG4gICAgX21vZGVscy5BdXRoLnZlcmlmeSh0b2tlbikuXG4gICAgdGhlbihmdW5jdGlvbiAoYXV0aCkge3JldHVybiBfbW9kZWxzLkF1dGgucG9wdWxhdGUoYXV0aCwgJ3VzZXInKTt9KS5cbiAgICB0aGVuKGZ1bmN0aW9uIChhdXRoKSB7cmV0dXJuIGF1dGgucmVmcmVzaCgpO30pLlxuICAgIHRoZW4oZnVuY3Rpb24gKGF1dGgpIHtcbiAgICAgIHNvY2tldFVzZXIgPSBhdXRoLnVzZXI7dmFyIF9hdXRoJHVzZXIgPVxuICAgICAgYXV0aC51c2VyLGZiX3VzZXJfaWQgPSBfYXV0aCR1c2VyLmZiX3VzZXJfaWQsbmFtZSA9IF9hdXRoJHVzZXIubmFtZTtcbiAgICAgIGFzc2lnblBsYXllcih7IGZiX3VzZXJfaWQ6IGZiX3VzZXJfaWQsIG5hbWU6IG5hbWUgfSk7XG4gICAgfSkuXG4gICAgY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgc29ja2V0LmRpc2Nvbm5lY3QoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgdmFyIGFzc2lnblBsYXllciA9IGZ1bmN0aW9uIGFzc2lnblBsYXllcih1c2VyKSB7XG4gICAgdmFyIGdhbWUgPSBnYW1lcy5maW5kKGZ1bmN0aW9uIChnYW1lKSB7cmV0dXJuIGdhbWUucGxheWVycy5zb21lKGZ1bmN0aW9uIChwbGF5ZXIpIHtyZXR1cm4gIWdhbWUuZmluaXNoZWRfYXQgJiYgdXNlci5mYl91c2VyX2lkID09PSBwbGF5ZXIudXNlci5mYl91c2VyX2lkO30pO30pO1xuICAgIGlmICghZ2FtZSkge1xuICAgICAgZ2FtZSA9IGdhbWVzLmZpbmQoZnVuY3Rpb24gKGdhbWUpIHtyZXR1cm4gIWdhbWUuc3RhcnRlZF9hdDt9KTtcbiAgICB9XG4gICAgaWYgKCFnYW1lKSB7XG4gICAgICBnYW1lID0ge1xuICAgICAgICByb29tOiBfcmFuZG9tc3RyaW5nMi5kZWZhdWx0LmdlbmVyYXRlKCksXG4gICAgICAgIHN0YXJ0ZWRfYXQ6IG51bGwsXG4gICAgICAgIHVwZGF0ZWRfYXQ6IG51bGwsXG4gICAgICAgIGZpbmlzaGVkX2F0OiBudWxsLFxuICAgICAgICBwbGF5ZXJzOiBbXSxcbiAgICAgICAgdG9waWNfaWQ6IG51bGwsXG4gICAgICAgIHRvcGljX3RpbWU6IG51bGwgfTtcblxuICAgICAgZ2FtZXMucHVzaChnYW1lKTtcbiAgICB9XG4gICAgc29ja2V0LmpvaW4oZ2FtZS5yb29tKTtcblxuICAgIHZhciBwbGF5ZXIgPSBnYW1lLnBsYXllcnMuZmluZChmdW5jdGlvbiAocGxheWVyKSB7cmV0dXJuIHVzZXIuZmJfdXNlcl9pZCA9PT0gcGxheWVyLnVzZXIuZmJfdXNlcl9pZDt9KTtcbiAgICBpZiAoIXBsYXllcikge1xuICAgICAgcGxheWVyID0ge1xuICAgICAgICB1c2VyOiB1c2VyLFxuICAgICAgICBzdWJtaXR0ZWRfYXQ6IG51bGwsXG4gICAgICAgIGdpdmVuX3VwX2F0OiBudWxsLFxuICAgICAgICBjb2RlOiBudWxsLFxuICAgICAgICB0eXBpbmc6IGZhbHNlLFxuICAgICAgICBzb2x1dGlvbl9pZDogbnVsbCxcbiAgICAgICAgcmF0aW5nczogW10sXG4gICAgICAgIGF2ZXJhZ2VfcmF0aW5nOiBudWxsIH07XG5cbiAgICAgIGdhbWUucGxheWVycy5wdXNoKHBsYXllcik7XG4gICAgfVxuXG4gICAgaWYgKGdhbWUuc3RhcnRlZF9hdCB8fCBnYW1lLnBsYXllcnMubGVuZ3RoIDwgMikge1xuICAgICAgdXBkYXRlR2FtZShnYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2FtZS5zdGFydGVkX2F0ID0gbmV3IERhdGUoKTtcbiAgICAgIF9tb2RlbHMuVG9waWMuY291bnQoKS5cbiAgICAgIHRoZW4oZnVuY3Rpb24gKGNvdW50KSB7XG4gICAgICAgIHZhciByYW5kb20gPSBNYXRoLnJhbmRvbSgpICogY291bnQgfCAwO1xuICAgICAgICByZXR1cm4gX21vZGVscy5Ub3BpYy5maW5kT25lKCkuc2tpcChyYW5kb20pO1xuICAgICAgfSkuXG4gICAgICB0aGVuKGZ1bmN0aW9uICh0b3BpYykge1xuICAgICAgICBnYW1lLnRvcGljX2lkID0gdG9waWMuX2lkO1xuICAgICAgICBnYW1lLnRvcGljX3RpbWUgPSB0b3BpYy50aW1lO1xuICAgICAgICB1cGRhdGVHYW1lKGdhbWUpO1xuICAgICAgfSkuXG4gICAgICBjYXRjaChjb25zb2xlLmVycm9yKTtcbiAgICB9XG5cbiAgICBzb2NrZXQub24oJ1NUQVJUX1RZUElORycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHBsYXllci50eXBpbmcgPSB0cnVlO1xuICAgICAgdXBkYXRlR2FtZShnYW1lKTtcbiAgICB9KTtcbiAgICBzb2NrZXQub24oJ1NUT1BfVFlQSU5HJywgZnVuY3Rpb24gKCkge1xuICAgICAgcGxheWVyLnR5cGluZyA9IGZhbHNlO1xuICAgICAgdXBkYXRlR2FtZShnYW1lKTtcbiAgICB9KTtcbiAgICBzb2NrZXQub24oJ1NVQk1JVCcsIGZ1bmN0aW9uIChjb2RlKSB7XG4gICAgICBwbGF5ZXIuc3VibWl0dGVkX2F0ID0gbmV3IERhdGUoKTtcbiAgICAgIHBsYXllci5jb2RlID0gY29kZTtcbiAgICAgIG5ldyBfbW9kZWxzLlNvbHV0aW9uKHtcbiAgICAgICAgdG9waWM6IGdhbWUudG9waWNfaWQsXG4gICAgICAgIHRpbWU6IChwbGF5ZXIuc3VibWl0dGVkX2F0IC0gZ2FtZS5zdGFydGVkX2F0KSAvIDEwMDAsXG4gICAgICAgIGNvZGU6IGNvZGUgfSkuXG4gICAgICBzZXRBdXRob3Ioc29ja2V0VXNlcikuc2F2ZSgpLlxuICAgICAgdGhlbihmdW5jdGlvbiAoc29sdXRpb24pIHtcbiAgICAgICAgcGxheWVyLnNvbHV0aW9uX2lkID0gc29sdXRpb24uX2lkO1xuICAgICAgICB1cGRhdGVHYW1lKGdhbWUpO1xuICAgICAgfSkuXG4gICAgICBjYXRjaChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcbiAgICBzb2NrZXQub24oJ0dJVkVfVVAnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBwbGF5ZXIuZ2l2ZW5fdXBfYXQgPSBuZXcgRGF0ZSgpO1xuICAgICAgdXBkYXRlR2FtZShnYW1lKTtcbiAgICB9KTtcbiAgICBzb2NrZXQub24oJ1JBVEUnLCBmdW5jdGlvbiAoZGF0YSkge3ZhclxuICAgICAgc29sdXRpb24gPSBkYXRhLnNvbHV0aW9uX2lkLHN0YXJzID0gZGF0YS5zdGFycztcbiAgICAgIHZhciBhdXRob3JzID0gW3NvY2tldFVzZXJdO1xuICAgICAgdmFyIHF1ZXJ5ID0geyBzb2x1dGlvbjogc29sdXRpb24sIGF1dGhvcnM6IGF1dGhvcnMgfTtcbiAgICAgIHZhciBib2R5ID0geyBzb2x1dGlvbjogc29sdXRpb24sIHN0YXJzOiBzdGFycywgYXV0aG9yczogYXV0aG9ycyB9O1xuICAgICAgX21vZGVscy5SYXRpbmcuZmluZE9uZUFuZFVwZGF0ZShxdWVyeSwgYm9keSwgeyB1cHNlcnQ6IHRydWUgfSkuXG4gICAgICB0aGVuKGZ1bmN0aW9uICgpIHtyZXR1cm4gX21vZGVscy5SYXRpbmcuZmluZCh7IHNvbHV0aW9uOiBzb2x1dGlvbiB9KS5wb3B1bGF0ZSgnYXV0aG9ycycpO30pLlxuICAgICAgdGhlbihmdW5jdGlvbiAocmF0aW5ncykge1xuICAgICAgICB2YXIgcmF0ZWRQbGF5ZXIgPSBnYW1lLnBsYXllcnMuZmluZChmdW5jdGlvbiAocGxheWVyKSB7cmV0dXJuIHBsYXllci5zb2x1dGlvbl9pZCAmJiBwbGF5ZXIuc29sdXRpb25faWQuZXF1YWxzKHNvbHV0aW9uKTt9KTtcbiAgICAgICAgcmF0ZWRQbGF5ZXIucmF0aW5ncyA9IHJhdGluZ3MubWFwKGZ1bmN0aW9uIChyYXRpbmcpIHtcbiAgICAgICAgICB2YXIgZmJfdXNlcl9pZCA9IHJhdGluZy5hdXRob3JzWzBdLmZiX3VzZXJfaWQ7XG4gICAgICAgICAgdmFyIHN0YXJzID0gcmF0aW5nLnN0YXJzO1xuICAgICAgICAgIHJldHVybiB7IGZiX3VzZXJfaWQ6IGZiX3VzZXJfaWQsIHN0YXJzOiBzdGFycyB9O1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHRvdGFsX3JhdGluZyA9IHJhdGVkUGxheWVyLnJhdGluZ3MucmVkdWNlKGZ1bmN0aW9uIChzdW0sIHJhdGluZykge3JldHVybiBzdW0gKyByYXRpbmcuc3RhcnM7fSwgMCk7XG4gICAgICAgIHJhdGVkUGxheWVyLmF2ZXJhZ2VfcmF0aW5nID0gcmF0ZWRQbGF5ZXIucmF0aW5ncy5sZW5ndGggPyB0b3RhbF9yYXRpbmcgLyByYXRlZFBsYXllci5yYXRpbmdzLmxlbmd0aCA6IG51bGw7XG4gICAgICAgIGdhbWUucGxheWVycyA9IGdhbWUucGxheWVycy5zb3J0KGZ1bmN0aW9uIChwMSwgcDIpIHtyZXR1cm4gKHAyLmF2ZXJhZ2VfcmF0aW5nIHx8IDApIC0gKHAxLmF2ZXJhZ2VfcmF0aW5nIHx8IDApO30pO1xuICAgICAgICB1cGRhdGVHYW1lKGdhbWUpO1xuICAgICAgfSkuXG4gICAgICBjYXRjaChjb25zb2xlLmVycm9yKTtcbiAgICB9KTtcbiAgfTtcblxuICB2YXIgdXBkYXRlR2FtZSA9IGZ1bmN0aW9uIHVwZGF0ZUdhbWUoZ2FtZSkge1xuICAgIGdhbWUudXBkYXRlZF9hdCA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIGFsbF9zdWJtaXR0ZWQgPSBnYW1lLnBsYXllcnMuZXZlcnkoZnVuY3Rpb24gKHBsYXllcikge3JldHVybiBwbGF5ZXIuc3VibWl0dGVkX2F0IHx8IHBsYXllci5naXZlbl91cF9hdDt9KTtcbiAgICB2YXIgdGltZV9kb25lID0gZ2FtZS50b3BpY19pZCAmJiAoZ2FtZS51cGRhdGVkX2F0IC0gZ2FtZS5zdGFydGVkX2F0KSAvIDEwMDAgPiBnYW1lLnRvcGljX3RpbWU7XG4gICAgaWYgKCFnYW1lLmZpbmlzaGVkX2F0ICYmIChhbGxfc3VibWl0dGVkIHx8IHRpbWVfZG9uZSkpIHtcbiAgICAgIGdhbWUuZmluaXNoZWRfYXQgPSBnYW1lLnVwZGF0ZWRfYXQ7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaW8udG8oZ2FtZS5yb29tKS5lbWl0KCdHQU1FX1JFTU9WRUQnKTtcbiAgICAgICAgdmFyIGluZGV4ID0gZ2FtZXMuaW5kZXhPZihnYW1lKTtcbiAgICAgICAgaWYgKH5pbmRleCkgZ2FtZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH0sIDUgKiA2MCAqIDEwMDApO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhnYW1lKTtcbiAgICBpby50byhnYW1lLnJvb20pLmVtaXQoJ0dBTUVfVVBEQVRFRCcsIGdhbWUpO1xuICB9O1xufSk7ZXhwb3J0cy5kZWZhdWx0ID1cblxuaW87XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFja2VuZC9pby5qc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvYmFja2VuZC9pby5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/backend/io.js\n");

/***/ }),

/***/ "./src/backend/models/Auth.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _mongoose = __webpack_require__(\"mongoose\");var _mongoose2 = _interopRequireDefault(_mongoose);\nvar _jsonwebtoken = __webpack_require__(\"jsonwebtoken\");var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);\nvar _db = __webpack_require__(\"./src/backend/common/db.js\");var _db2 = _interopRequireDefault(_db);\nvar _environment = __webpack_require__(\"./environment.js\");\nvar _config = __webpack_require__(\"./src/backend/common/config.js\");\nvar _error = __webpack_require__(\"./src/backend/common/error.js\");\nvar _util = __webpack_require__(\"./src/backend/common/util.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var\n\nSchema = _mongoose2.default.Schema;var\nObjectId = Schema.Types.ObjectId;\n\nvar authSchema = new Schema({\n  user: { type: ObjectId, ref: 'User', required: true },\n  token: { type: String, required: true },\n  expiresAt: { type: Date, required: true } });\n\n\nvar getExpiresAt = function getExpiresAt() {\n  var date = (0, _util.now)();\n  date.setDate(date.getDate() + 1);\n  return date;\n};\n\nauthSchema.statics.sign = function (user) {\n  return new Promise(function (resolve, reject) {\n    _jsonwebtoken2.default.sign({\n      user_id: user._id }, _environment.jwtSecret, _config.jwtSignOptions,\n    function (err, token) {\n      if (err) return reject(err);\n      var expiresAt = getExpiresAt();\n      resolve(new Auth({\n        user: user._id,\n        token: token,\n        expiresAt: expiresAt }));\n\n    });\n  });\n};\n\nauthSchema.statics.verify = function (token) {\n  return Auth.findOne({ token: token }).\n  then(function (auth) {\n    if (!auth) throw new _error.AuthorizationError();\n    return auth.verify();\n  });\n};\n\nauthSchema.methods.verify = function () {\n  var auth = this;\n  return new Promise(function (resolve, reject) {\n    if (auth.expiresAt < (0, _util.now)()) return reject(true);\n    _jsonwebtoken2.default.verify(auth.token, _environment.jwtSecret, function (err, decoded) {\n      if (err) return reject(err);\n      if (!auth.user.equals(decoded.user_id)) return reject(true);\n      resolve(auth);\n    });\n  });\n};\n\nauthSchema.methods.refresh = function () {\n  this.expiresAt = getExpiresAt();\n  return this.save();\n};\n\nvar Auth = _db2.default.model('Auth', authSchema);exports.default =\nAuth;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9tb2RlbHMvQXV0aC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZW5kL21vZGVscy9BdXRoLmpzPzM4MWEiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTt2YXIgX21vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTt2YXIgX21vbmdvb3NlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21vbmdvb3NlKTtcbnZhciBfanNvbndlYnRva2VuID0gcmVxdWlyZSgnanNvbndlYnRva2VuJyk7dmFyIF9qc29ud2VidG9rZW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfanNvbndlYnRva2VuKTtcbnZhciBfZGIgPSByZXF1aXJlKCcvY29tbW9uL2RiJyk7dmFyIF9kYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kYik7XG52YXIgX2Vudmlyb25tZW50ID0gcmVxdWlyZSgnL2Vudmlyb25tZW50Jyk7XG52YXIgX2NvbmZpZyA9IHJlcXVpcmUoJy9jb21tb24vY29uZmlnJyk7XG52YXIgX2Vycm9yID0gcmVxdWlyZSgnL2NvbW1vbi9lcnJvcicpO1xudmFyIF91dGlsID0gcmVxdWlyZSgnL2NvbW1vbi91dGlsJyk7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtyZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTt9dmFyXG5cblNjaGVtYSA9IF9tb25nb29zZTIuZGVmYXVsdC5TY2hlbWE7dmFyXG5PYmplY3RJZCA9IFNjaGVtYS5UeXBlcy5PYmplY3RJZDtcblxudmFyIGF1dGhTY2hlbWEgPSBuZXcgU2NoZW1hKHtcbiAgdXNlcjogeyB0eXBlOiBPYmplY3RJZCwgcmVmOiAnVXNlcicsIHJlcXVpcmVkOiB0cnVlIH0sXG4gIHRva2VuOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgZXhwaXJlc0F0OiB7IHR5cGU6IERhdGUsIHJlcXVpcmVkOiB0cnVlIH0gfSk7XG5cblxudmFyIGdldEV4cGlyZXNBdCA9IGZ1bmN0aW9uIGdldEV4cGlyZXNBdCgpIHtcbiAgdmFyIGRhdGUgPSAoMCwgX3V0aWwubm93KSgpO1xuICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyAxKTtcbiAgcmV0dXJuIGRhdGU7XG59O1xuXG5hdXRoU2NoZW1hLnN0YXRpY3Muc2lnbiA9IGZ1bmN0aW9uICh1c2VyKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgX2pzb253ZWJ0b2tlbjIuZGVmYXVsdC5zaWduKHtcbiAgICAgIHVzZXJfaWQ6IHVzZXIuX2lkIH0sIF9lbnZpcm9ubWVudC5qd3RTZWNyZXQsIF9jb25maWcuand0U2lnbk9wdGlvbnMsXG4gICAgZnVuY3Rpb24gKGVyciwgdG9rZW4pIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgIHZhciBleHBpcmVzQXQgPSBnZXRFeHBpcmVzQXQoKTtcbiAgICAgIHJlc29sdmUobmV3IEF1dGgoe1xuICAgICAgICB1c2VyOiB1c2VyLl9pZCxcbiAgICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICBleHBpcmVzQXQ6IGV4cGlyZXNBdCB9KSk7XG5cbiAgICB9KTtcbiAgfSk7XG59O1xuXG5hdXRoU2NoZW1hLnN0YXRpY3MudmVyaWZ5ID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gIHJldHVybiBBdXRoLmZpbmRPbmUoeyB0b2tlbjogdG9rZW4gfSkuXG4gIHRoZW4oZnVuY3Rpb24gKGF1dGgpIHtcbiAgICBpZiAoIWF1dGgpIHRocm93IG5ldyBfZXJyb3IuQXV0aG9yaXphdGlvbkVycm9yKCk7XG4gICAgcmV0dXJuIGF1dGgudmVyaWZ5KCk7XG4gIH0pO1xufTtcblxuYXV0aFNjaGVtYS5tZXRob2RzLnZlcmlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGF1dGggPSB0aGlzO1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGlmIChhdXRoLmV4cGlyZXNBdCA8ICgwLCBfdXRpbC5ub3cpKCkpIHJldHVybiByZWplY3QodHJ1ZSk7XG4gICAgX2pzb253ZWJ0b2tlbjIuZGVmYXVsdC52ZXJpZnkoYXV0aC50b2tlbiwgX2Vudmlyb25tZW50Lmp3dFNlY3JldCwgZnVuY3Rpb24gKGVyciwgZGVjb2RlZCkge1xuICAgICAgaWYgKGVycikgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgaWYgKCFhdXRoLnVzZXIuZXF1YWxzKGRlY29kZWQudXNlcl9pZCkpIHJldHVybiByZWplY3QodHJ1ZSk7XG4gICAgICByZXNvbHZlKGF1dGgpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmF1dGhTY2hlbWEubWV0aG9kcy5yZWZyZXNoID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmV4cGlyZXNBdCA9IGdldEV4cGlyZXNBdCgpO1xuICByZXR1cm4gdGhpcy5zYXZlKCk7XG59O1xuXG52YXIgQXV0aCA9IF9kYjIuZGVmYXVsdC5tb2RlbCgnQXV0aCcsIGF1dGhTY2hlbWEpO2V4cG9ydHMuZGVmYXVsdCA9XG5BdXRoO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JhY2tlbmQvbW9kZWxzL0F1dGguanNcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2JhY2tlbmQvbW9kZWxzL0F1dGguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/backend/models/Auth.js\n");

/***/ }),

/***/ "./src/backend/models/Rating.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _mongoose = __webpack_require__(\"mongoose\");var _mongoose2 = _interopRequireDefault(_mongoose);\nvar _db = __webpack_require__(\"./src/backend/common/db.js\");var _db2 = _interopRequireDefault(_db);\nvar _plugins = __webpack_require__(\"./src/backend/models/plugins/index.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var\n\nSchema = _mongoose2.default.Schema;var\nObjectId = Schema.Types.ObjectId;\n\nvar modelName = 'Rating';\nvar ratingSchema = new Schema({\n  solution: { type: ObjectId, ref: 'Solution', required: true },\n  stars: { type: Number, required: true, min: 1, max: 5, validate: Number.isInteger } });\n\nratingSchema.index({ solution: 1, authors: 1 });\n\nratingSchema.plugin(_plugins.authorPlugin, {\n  authorsField: true,\n  set: {\n    owner: true },\n\n  get: {\n    guest: true },\n\n  remove: {\n    owner: true } });\n\n\n\nvar Rating = _db2.default.model(modelName, ratingSchema);exports.default =\nRating;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9tb2RlbHMvUmF0aW5nLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tlbmQvbW9kZWxzL1JhdGluZy5qcz9hY2I5Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7dmFyIF9tb25nb29zZSA9IHJlcXVpcmUoJ21vbmdvb3NlJyk7dmFyIF9tb25nb29zZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tb25nb29zZSk7XG52YXIgX2RiID0gcmVxdWlyZSgnL2NvbW1vbi9kYicpO3ZhciBfZGIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGIpO1xudmFyIF9wbHVnaW5zID0gcmVxdWlyZSgnL21vZGVscy9wbHVnaW5zJyk7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtyZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTt9dmFyXG5cblNjaGVtYSA9IF9tb25nb29zZTIuZGVmYXVsdC5TY2hlbWE7dmFyXG5PYmplY3RJZCA9IFNjaGVtYS5UeXBlcy5PYmplY3RJZDtcblxudmFyIG1vZGVsTmFtZSA9ICdSYXRpbmcnO1xudmFyIHJhdGluZ1NjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICBzb2x1dGlvbjogeyB0eXBlOiBPYmplY3RJZCwgcmVmOiAnU29sdXRpb24nLCByZXF1aXJlZDogdHJ1ZSB9LFxuICBzdGFyczogeyB0eXBlOiBOdW1iZXIsIHJlcXVpcmVkOiB0cnVlLCBtaW46IDEsIG1heDogNSwgdmFsaWRhdGU6IE51bWJlci5pc0ludGVnZXIgfSB9KTtcblxucmF0aW5nU2NoZW1hLmluZGV4KHsgc29sdXRpb246IDEsIGF1dGhvcnM6IDEgfSk7XG5cbnJhdGluZ1NjaGVtYS5wbHVnaW4oX3BsdWdpbnMuYXV0aG9yUGx1Z2luLCB7XG4gIGF1dGhvcnNGaWVsZDogdHJ1ZSxcbiAgc2V0OiB7XG4gICAgb3duZXI6IHRydWUgfSxcblxuICBnZXQ6IHtcbiAgICBndWVzdDogdHJ1ZSB9LFxuXG4gIHJlbW92ZToge1xuICAgIG93bmVyOiB0cnVlIH0gfSk7XG5cblxuXG52YXIgUmF0aW5nID0gX2RiMi5kZWZhdWx0Lm1vZGVsKG1vZGVsTmFtZSwgcmF0aW5nU2NoZW1hKTtleHBvcnRzLmRlZmF1bHQgPVxuUmF0aW5nO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JhY2tlbmQvbW9kZWxzL1JhdGluZy5qc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvYmFja2VuZC9tb2RlbHMvUmF0aW5nLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/backend/models/Rating.js\n");

/***/ }),

/***/ "./src/backend/models/Solution.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _mongoose = __webpack_require__(\"mongoose\");var _mongoose2 = _interopRequireDefault(_mongoose);\nvar _db = __webpack_require__(\"./src/backend/common/db.js\");var _db2 = _interopRequireDefault(_db);\nvar _plugins = __webpack_require__(\"./src/backend/models/plugins/index.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var\n\nSchema = _mongoose2.default.Schema;var\nObjectId = Schema.Types.ObjectId;\n\nvar modelName = 'Solution';\nvar solutionSchema = new Schema({\n  topic: { type: ObjectId, ref: 'Topic', required: true },\n  time: { type: Number, required: true },\n  code: { type: String, required: true } });\n\n\nsolutionSchema.plugin(_plugins.authorPlugin, {\n  authorsField: true,\n  insert: {\n    user: true },\n\n  modify: {\n    none: true },\n\n  get: {\n    guest: true },\n\n  remove: {\n    none: true } });\n\n\n\nvar Solution = _db2.default.model(modelName, solutionSchema);exports.default =\nSolution;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9tb2RlbHMvU29sdXRpb24uanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2VuZC9tb2RlbHMvU29sdXRpb24uanM/NTQ2OSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO3ZhciBfbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO3ZhciBfbW9uZ29vc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbW9uZ29vc2UpO1xudmFyIF9kYiA9IHJlcXVpcmUoJy9jb21tb24vZGInKTt2YXIgX2RiMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RiKTtcbnZhciBfcGx1Z2lucyA9IHJlcXVpcmUoJy9tb2RlbHMvcGx1Z2lucycpO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7cmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07fXZhclxuXG5TY2hlbWEgPSBfbW9uZ29vc2UyLmRlZmF1bHQuU2NoZW1hO3ZhclxuT2JqZWN0SWQgPSBTY2hlbWEuVHlwZXMuT2JqZWN0SWQ7XG5cbnZhciBtb2RlbE5hbWUgPSAnU29sdXRpb24nO1xudmFyIHNvbHV0aW9uU2NoZW1hID0gbmV3IFNjaGVtYSh7XG4gIHRvcGljOiB7IHR5cGU6IE9iamVjdElkLCByZWY6ICdUb3BpYycsIHJlcXVpcmVkOiB0cnVlIH0sXG4gIHRpbWU6IHsgdHlwZTogTnVtYmVyLCByZXF1aXJlZDogdHJ1ZSB9LFxuICBjb2RlOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSB9KTtcblxuXG5zb2x1dGlvblNjaGVtYS5wbHVnaW4oX3BsdWdpbnMuYXV0aG9yUGx1Z2luLCB7XG4gIGF1dGhvcnNGaWVsZDogdHJ1ZSxcbiAgaW5zZXJ0OiB7XG4gICAgdXNlcjogdHJ1ZSB9LFxuXG4gIG1vZGlmeToge1xuICAgIG5vbmU6IHRydWUgfSxcblxuICBnZXQ6IHtcbiAgICBndWVzdDogdHJ1ZSB9LFxuXG4gIHJlbW92ZToge1xuICAgIG5vbmU6IHRydWUgfSB9KTtcblxuXG5cbnZhciBTb2x1dGlvbiA9IF9kYjIuZGVmYXVsdC5tb2RlbChtb2RlbE5hbWUsIHNvbHV0aW9uU2NoZW1hKTtleHBvcnRzLmRlZmF1bHQgPVxuU29sdXRpb247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFja2VuZC9tb2RlbHMvU29sdXRpb24uanNcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2JhY2tlbmQvbW9kZWxzL1NvbHV0aW9uLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/backend/models/Solution.js\n");

/***/ }),

/***/ "./src/backend/models/Testcase.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _mongoose = __webpack_require__(\"mongoose\");var _mongoose2 = _interopRequireDefault(_mongoose);\nvar _db = __webpack_require__(\"./src/backend/common/db.js\");var _db2 = _interopRequireDefault(_db);\nvar _plugins = __webpack_require__(\"./src/backend/models/plugins/index.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var\n\nSchema = _mongoose2.default.Schema;var\nObjectId = Schema.Types.ObjectId;\n\nvar modelName = 'Testcase';\nvar testcaseSchema = new Schema({\n  topic: { type: ObjectId, ref: 'Topic', required: true },\n  eval: { type: String, required: true },\n  public: { type: Boolean, required: true } });\n\n\ntestcaseSchema.plugin(_plugins.authorPlugin, {\n  set: {\n    none: true },\n\n  get: {\n    guest: true },\n\n  remove: {\n    none: true } });\n\n\n\nvar Testcase = _db2.default.model(modelName, testcaseSchema);exports.default =\nTestcase;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9tb2RlbHMvVGVzdGNhc2UuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2VuZC9tb2RlbHMvVGVzdGNhc2UuanM/ZmI1NyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO3ZhciBfbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO3ZhciBfbW9uZ29vc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbW9uZ29vc2UpO1xudmFyIF9kYiA9IHJlcXVpcmUoJy9jb21tb24vZGInKTt2YXIgX2RiMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RiKTtcbnZhciBfcGx1Z2lucyA9IHJlcXVpcmUoJy9tb2RlbHMvcGx1Z2lucycpO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7cmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07fXZhclxuXG5TY2hlbWEgPSBfbW9uZ29vc2UyLmRlZmF1bHQuU2NoZW1hO3ZhclxuT2JqZWN0SWQgPSBTY2hlbWEuVHlwZXMuT2JqZWN0SWQ7XG5cbnZhciBtb2RlbE5hbWUgPSAnVGVzdGNhc2UnO1xudmFyIHRlc3RjYXNlU2NoZW1hID0gbmV3IFNjaGVtYSh7XG4gIHRvcGljOiB7IHR5cGU6IE9iamVjdElkLCByZWY6ICdUb3BpYycsIHJlcXVpcmVkOiB0cnVlIH0sXG4gIGV2YWw6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxuICBwdWJsaWM6IHsgdHlwZTogQm9vbGVhbiwgcmVxdWlyZWQ6IHRydWUgfSB9KTtcblxuXG50ZXN0Y2FzZVNjaGVtYS5wbHVnaW4oX3BsdWdpbnMuYXV0aG9yUGx1Z2luLCB7XG4gIHNldDoge1xuICAgIG5vbmU6IHRydWUgfSxcblxuICBnZXQ6IHtcbiAgICBndWVzdDogdHJ1ZSB9LFxuXG4gIHJlbW92ZToge1xuICAgIG5vbmU6IHRydWUgfSB9KTtcblxuXG5cbnZhciBUZXN0Y2FzZSA9IF9kYjIuZGVmYXVsdC5tb2RlbChtb2RlbE5hbWUsIHRlc3RjYXNlU2NoZW1hKTtleHBvcnRzLmRlZmF1bHQgPVxuVGVzdGNhc2U7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFja2VuZC9tb2RlbHMvVGVzdGNhc2UuanNcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2JhY2tlbmQvbW9kZWxzL1Rlc3RjYXNlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/backend/models/Testcase.js\n");

/***/ }),

/***/ "./src/backend/models/Topic.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _mongoose = __webpack_require__(\"mongoose\");var _mongoose2 = _interopRequireDefault(_mongoose);\nvar _db = __webpack_require__(\"./src/backend/common/db.js\");var _db2 = _interopRequireDefault(_db);\nvar _plugins = __webpack_require__(\"./src/backend/models/plugins/index.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var\n\nSchema = _mongoose2.default.Schema;\n\nvar modelName = 'Topic';\nvar topicSchema = new Schema({\n  content: { type: String, required: true },\n  time: { type: Number, required: true, min: 1, validate: Number.isInteger } });\n\n\ntopicSchema.plugin(_plugins.authorPlugin, {\n  set: {\n    none: true },\n\n  get: {\n    guest: true },\n\n  remove: {\n    none: true } });\n\n\n\nvar Topic = _db2.default.model(modelName, topicSchema);exports.default =\nTopic;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9tb2RlbHMvVG9waWMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2VuZC9tb2RlbHMvVG9waWMuanM/ZTNiYyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO3ZhciBfbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO3ZhciBfbW9uZ29vc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbW9uZ29vc2UpO1xudmFyIF9kYiA9IHJlcXVpcmUoJy9jb21tb24vZGInKTt2YXIgX2RiMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RiKTtcbnZhciBfcGx1Z2lucyA9IHJlcXVpcmUoJy9tb2RlbHMvcGx1Z2lucycpO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7cmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07fXZhclxuXG5TY2hlbWEgPSBfbW9uZ29vc2UyLmRlZmF1bHQuU2NoZW1hO1xuXG52YXIgbW9kZWxOYW1lID0gJ1RvcGljJztcbnZhciB0b3BpY1NjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICBjb250ZW50OiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgdGltZTogeyB0eXBlOiBOdW1iZXIsIHJlcXVpcmVkOiB0cnVlLCBtaW46IDEsIHZhbGlkYXRlOiBOdW1iZXIuaXNJbnRlZ2VyIH0gfSk7XG5cblxudG9waWNTY2hlbWEucGx1Z2luKF9wbHVnaW5zLmF1dGhvclBsdWdpbiwge1xuICBzZXQ6IHtcbiAgICBub25lOiB0cnVlIH0sXG5cbiAgZ2V0OiB7XG4gICAgZ3Vlc3Q6IHRydWUgfSxcblxuICByZW1vdmU6IHtcbiAgICBub25lOiB0cnVlIH0gfSk7XG5cblxuXG52YXIgVG9waWMgPSBfZGIyLmRlZmF1bHQubW9kZWwobW9kZWxOYW1lLCB0b3BpY1NjaGVtYSk7ZXhwb3J0cy5kZWZhdWx0ID1cblRvcGljO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JhY2tlbmQvbW9kZWxzL1RvcGljLmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9iYWNrZW5kL21vZGVscy9Ub3BpYy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/backend/models/Topic.js\n");

/***/ }),

/***/ "./src/backend/models/User.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _mongoose = __webpack_require__(\"mongoose\");var _mongoose2 = _interopRequireDefault(_mongoose);\nvar _db = __webpack_require__(\"./src/backend/common/db.js\");var _db2 = _interopRequireDefault(_db);\nvar _plugins = __webpack_require__(\"./src/backend/models/plugins/index.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var\n\nSchema = _mongoose2.default.Schema;\n\nvar modelName = 'User';\nvar userSchema = new Schema({\n  fb_user_id: { type: String, required: true, unique: true },\n  name: { type: String, required: true },\n  first_name: { type: String, required: true } });\n\n\nuserSchema.plugin(_plugins.authorPlugin, {\n  insert: {\n    guest: true },\n\n  modify: {\n    none: ['fb_user_id'],\n    self: true },\n\n  get: {\n    guest: true },\n\n  remove: {\n    self: true } });\n\n\n\nuserSchema.methods.isUser = function () {\n  return !this.isNew;\n};\n\nuserSchema.methods.isOwner = function (doc) {\n  return this._id.equals(doc.authors[0]);\n};\n\nuserSchema.methods.isSelf = function (doc) {\n  return this._id.equals(doc._id);\n};\n\nvar User = _db2.default.model(modelName, userSchema);exports.default =\nUser;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9tb2RlbHMvVXNlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZW5kL21vZGVscy9Vc2VyLmpzPzliM2MiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTt2YXIgX21vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTt2YXIgX21vbmdvb3NlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21vbmdvb3NlKTtcbnZhciBfZGIgPSByZXF1aXJlKCcvY29tbW9uL2RiJyk7dmFyIF9kYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kYik7XG52YXIgX3BsdWdpbnMgPSByZXF1aXJlKCcvbW9kZWxzL3BsdWdpbnMnKTtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge3JldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9O312YXJcblxuU2NoZW1hID0gX21vbmdvb3NlMi5kZWZhdWx0LlNjaGVtYTtcblxudmFyIG1vZGVsTmFtZSA9ICdVc2VyJztcbnZhciB1c2VyU2NoZW1hID0gbmV3IFNjaGVtYSh7XG4gIGZiX3VzZXJfaWQ6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSwgdW5pcXVlOiB0cnVlIH0sXG4gIG5hbWU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxuICBmaXJzdF9uYW1lOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSB9KTtcblxuXG51c2VyU2NoZW1hLnBsdWdpbihfcGx1Z2lucy5hdXRob3JQbHVnaW4sIHtcbiAgaW5zZXJ0OiB7XG4gICAgZ3Vlc3Q6IHRydWUgfSxcblxuICBtb2RpZnk6IHtcbiAgICBub25lOiBbJ2ZiX3VzZXJfaWQnXSxcbiAgICBzZWxmOiB0cnVlIH0sXG5cbiAgZ2V0OiB7XG4gICAgZ3Vlc3Q6IHRydWUgfSxcblxuICByZW1vdmU6IHtcbiAgICBzZWxmOiB0cnVlIH0gfSk7XG5cblxuXG51c2VyU2NoZW1hLm1ldGhvZHMuaXNVc2VyID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gIXRoaXMuaXNOZXc7XG59O1xuXG51c2VyU2NoZW1hLm1ldGhvZHMuaXNPd25lciA9IGZ1bmN0aW9uIChkb2MpIHtcbiAgcmV0dXJuIHRoaXMuX2lkLmVxdWFscyhkb2MuYXV0aG9yc1swXSk7XG59O1xuXG51c2VyU2NoZW1hLm1ldGhvZHMuaXNTZWxmID0gZnVuY3Rpb24gKGRvYykge1xuICByZXR1cm4gdGhpcy5faWQuZXF1YWxzKGRvYy5faWQpO1xufTtcblxudmFyIFVzZXIgPSBfZGIyLmRlZmF1bHQubW9kZWwobW9kZWxOYW1lLCB1c2VyU2NoZW1hKTtleHBvcnRzLmRlZmF1bHQgPVxuVXNlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYWNrZW5kL21vZGVscy9Vc2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9iYWNrZW5kL21vZGVscy9Vc2VyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/backend/models/User.js\n");

/***/ }),

/***/ "./src/backend/models/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _Auth = __webpack_require__(\"./src/backend/models/Auth.js\");Object.defineProperty(exports, 'Auth', { enumerable: true, get: function get() {return _interopRequireDefault(_Auth).default;} });var _Rating = __webpack_require__(\"./src/backend/models/Rating.js\");Object.defineProperty(exports, 'Rating', { enumerable: true, get: function get() {return _interopRequireDefault(_Rating).\n    default;} });var _Solution = __webpack_require__(\"./src/backend/models/Solution.js\");Object.defineProperty(exports, 'Solution', { enumerable: true, get: function get() {return _interopRequireDefault(_Solution).\n    default;} });var _Testcase = __webpack_require__(\"./src/backend/models/Testcase.js\");Object.defineProperty(exports, 'Testcase', { enumerable: true, get: function get() {return _interopRequireDefault(_Testcase).\n    default;} });var _Topic = __webpack_require__(\"./src/backend/models/Topic.js\");Object.defineProperty(exports, 'Topic', { enumerable: true, get: function get() {return _interopRequireDefault(_Topic).\n    default;} });var _User = __webpack_require__(\"./src/backend/models/User.js\");Object.defineProperty(exports, 'User', { enumerable: true, get: function get() {return _interopRequireDefault(_User).\n    default;} });function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9tb2RlbHMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2VuZC9tb2RlbHMvaW5kZXguanM/ODcwMSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO3ZhciBfQXV0aCA9IHJlcXVpcmUoJy4vQXV0aCcpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnQXV0aCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7cmV0dXJuIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0F1dGgpLmRlZmF1bHQ7fSB9KTt2YXIgX1JhdGluZyA9IHJlcXVpcmUoJy4vUmF0aW5nJyk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdSYXRpbmcnLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gZ2V0KCkge3JldHVybiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9SYXRpbmcpLlxuICAgIGRlZmF1bHQ7fSB9KTt2YXIgX1NvbHV0aW9uID0gcmVxdWlyZSgnLi9Tb2x1dGlvbicpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnU29sdXRpb24nLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gZ2V0KCkge3JldHVybiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Tb2x1dGlvbikuXG4gICAgZGVmYXVsdDt9IH0pO3ZhciBfVGVzdGNhc2UgPSByZXF1aXJlKCcuL1Rlc3RjYXNlJyk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdUZXN0Y2FzZScsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7cmV0dXJuIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1Rlc3RjYXNlKS5cbiAgICBkZWZhdWx0O30gfSk7dmFyIF9Ub3BpYyA9IHJlcXVpcmUoJy4vVG9waWMnKTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1RvcGljJywgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtyZXR1cm4gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVG9waWMpLlxuICAgIGRlZmF1bHQ7fSB9KTt2YXIgX1VzZXIgPSByZXF1aXJlKCcuL1VzZXInKTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ1VzZXInLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gZ2V0KCkge3JldHVybiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Vc2VyKS5cbiAgICBkZWZhdWx0O30gfSk7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtyZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTt9XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFja2VuZC9tb2RlbHMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2JhY2tlbmQvbW9kZWxzL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/backend/models/index.js\n");

/***/ }),

/***/ "./src/backend/models/plugins/authorPlugin.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i[\"return\"]) _i[\"return\"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError(\"Invalid attempt to destructure non-iterable instance\");}};}();var _mongoose = __webpack_require__(\"mongoose\");var _mongoose2 = _interopRequireDefault(_mongoose);\nvar _error = __webpack_require__(\"./src/backend/common/error.js\");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}var\n\nSchema = _mongoose2.default.Schema;var\nObjectId = Schema.Types.ObjectId;\n\nvar merge = function merge() {for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}\n  var permissions = {};var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {\n    for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var arg = _step.value;\n      var keys = Object.keys(arg || {});var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {\n        for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var key = _step2.value;\n          if (permissions[key] === true) continue;\n          if (arg[key] === true) permissions[key] = true;else\n          {var _permissions$key;\n            if (!permissions[key]) permissions[key] = [];\n            (_permissions$key = permissions[key]).push.apply(_permissions$key, _toConsumableArray(arg[key]));\n          }\n        }} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}\n    }} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}\n  return permissions;\n};\n\nvar getMatch = function getMatch() {var permissions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  return [\n  [permissions.none, function (author) {return false;}],\n  [permissions.user, function (author) {return author.isUser();}],\n  [permissions.owner, function (author, doc) {return author.isOwner(doc);}],\n  [permissions.self, function (author, doc) {return author.isSelf(doc);}],\n  [permissions.guest, function (author) {return true;}]];\n\n};\n\nvar check = function check(match, author, doc, process) {var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {\n    for (var _iterator3 = match[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var _step3$value = _slicedToArray(_step3.value, 2),fields = _step3$value[0],func = _step3$value[1];\n      if (fields === undefined) continue;\n      var permitted = func(author, doc);\n      if (!permitted) {\n        if (fields === true) throw new _error.PermissionError();\n        if (process) {\n          fields.forEach(process);\n        }\n      }\n    }} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}\n};\n\nvar processSet = function processSet(schema, options) {\n  var insertMatch = getMatch(merge(options.set, options.insert));\n  var modifyMatch = getMatch(merge(options.set, options.modify));\n  schema.pre('save', function (next) {\n    var doc = this;\n    if (options.authorsField) {\n      if (doc.isModified('authors')) return next(new _error.PermissionError());\n      doc.authors.addToSet(doc.author);\n    }\n    try {\n      check(doc.isNew ? insertMatch : modifyMatch, doc.author, doc, function (field) {\n        if (doc.isModified(field)) throw new _error.PermissionError();\n      });\n      next();\n    } catch (err) {\n      next(err);\n    }\n  });\n};\n\nvar processGet = function processGet(schema, options) {\n  var match = getMatch(options.get);\n  var _toJSON = schema.options.toJSON;\n  schema.options.toJSON = {\n    transform: function transform(doc, ret, options) {\n      if (_toJSON && _toJSON.transform) {\n        ret = _toJSON.transform(doc, ret, options);\n      }\n      check(match, options.req.author, doc, function (field) {\n        delete ret[field];\n      });\n      return ret;\n    } };\n\n};\n\nvar processRemove = function processRemove(schema, options) {\n  var match = getMatch(options.remove);\n  schema.pre('remove', function (next) {\n    var doc = this;\n    try {\n      check(match, doc.author, doc);\n      next();\n    } catch (err) {\n      next(err);\n    }\n  });\n};\n\nvar authorPlugin = function authorPlugin(schema, options) {\n  options = _extends({\n    authorsField: false,\n    set: {},\n    insert: {},\n    modify: {},\n    get: {},\n    remove: {} },\n  options);\n\n\n  if (options.authorsField) {\n    schema.add({\n      authors: [{ type: ObjectId, ref: 'User' }] });\n\n  }\n\n  schema.methods.setAuthor = function (author) {\n    this.author = author;\n    return this;\n  };\n\n  processSet(schema, options);\n  processGet(schema, options);\n  processRemove(schema, options);\n};exports.default =\n\nauthorPlugin;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9tb2RlbHMvcGx1Z2lucy9hdXRob3JQbHVnaW4uanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFja2VuZC9tb2RlbHMvcGx1Z2lucy9hdXRob3JQbHVnaW4uanM/MjUzYSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO3ZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge2ZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7dmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHt0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO319fXJldHVybiB0YXJnZXQ7fTt2YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7ZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHt2YXIgX2FyciA9IFtdO3ZhciBfbiA9IHRydWU7dmFyIF9kID0gZmFsc2U7dmFyIF9lID0gdW5kZWZpbmVkO3RyeSB7Zm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge19hcnIucHVzaChfcy52YWx1ZSk7aWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO319IGNhdGNoIChlcnIpIHtfZCA9IHRydWU7X2UgPSBlcnI7fSBmaW5hbGx5IHt0cnkge2lmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7fSBmaW5hbGx5IHtpZiAoX2QpIHRocm93IF9lO319cmV0dXJuIF9hcnI7fXJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7aWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge3JldHVybiBhcnI7fSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHtyZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO30gZWxzZSB7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7fX07fSgpO3ZhciBfbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO3ZhciBfbW9uZ29vc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbW9uZ29vc2UpO1xudmFyIF9lcnJvciA9IHJlcXVpcmUoJy9jb21tb24vZXJyb3InKTtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge3JldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9O31mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7aWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge2ZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHthcnIyW2ldID0gYXJyW2ldO31yZXR1cm4gYXJyMjt9IGVsc2Uge3JldHVybiBBcnJheS5mcm9tKGFycik7fX12YXJcblxuU2NoZW1hID0gX21vbmdvb3NlMi5kZWZhdWx0LlNjaGVtYTt2YXJcbk9iamVjdElkID0gU2NoZW1hLlR5cGVzLk9iamVjdElkO1xuXG52YXIgbWVyZ2UgPSBmdW5jdGlvbiBtZXJnZSgpIHtmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge2FyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07fVxuICB2YXIgcGVybWlzc2lvbnMgPSB7fTt2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7dmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7dmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO3RyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gYXJnc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHt2YXIgYXJnID0gX3N0ZXAudmFsdWU7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFyZyB8fCB7fSk7dmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTt2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7dmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDt0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0ga2V5c1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge3ZhciBrZXkgPSBfc3RlcDIudmFsdWU7XG4gICAgICAgICAgaWYgKHBlcm1pc3Npb25zW2tleV0gPT09IHRydWUpIGNvbnRpbnVlO1xuICAgICAgICAgIGlmIChhcmdba2V5XSA9PT0gdHJ1ZSkgcGVybWlzc2lvbnNba2V5XSA9IHRydWU7ZWxzZVxuICAgICAgICAgIHt2YXIgX3Blcm1pc3Npb25zJGtleTtcbiAgICAgICAgICAgIGlmICghcGVybWlzc2lvbnNba2V5XSkgcGVybWlzc2lvbnNba2V5XSA9IFtdO1xuICAgICAgICAgICAgKF9wZXJtaXNzaW9ucyRrZXkgPSBwZXJtaXNzaW9uc1trZXldKS5wdXNoLmFwcGx5KF9wZXJtaXNzaW9ucyRrZXksIF90b0NvbnN1bWFibGVBcnJheShhcmdba2V5XSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfX0gY2F0Y2ggKGVycikge19kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7X2l0ZXJhdG9yRXJyb3IyID0gZXJyO30gZmluYWxseSB7dHJ5IHtpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7X2l0ZXJhdG9yMi5yZXR1cm4oKTt9fSBmaW5hbGx5IHtpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7dGhyb3cgX2l0ZXJhdG9yRXJyb3IyO319fVxuICAgIH19IGNhdGNoIChlcnIpIHtfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7X2l0ZXJhdG9yRXJyb3IgPSBlcnI7fSBmaW5hbGx5IHt0cnkge2lmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7X2l0ZXJhdG9yLnJldHVybigpO319IGZpbmFsbHkge2lmIChfZGlkSXRlcmF0b3JFcnJvcikge3Rocm93IF9pdGVyYXRvckVycm9yO319fVxuICByZXR1cm4gcGVybWlzc2lvbnM7XG59O1xuXG52YXIgZ2V0TWF0Y2ggPSBmdW5jdGlvbiBnZXRNYXRjaCgpIHt2YXIgcGVybWlzc2lvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICByZXR1cm4gW1xuICBbcGVybWlzc2lvbnMubm9uZSwgZnVuY3Rpb24gKGF1dGhvcikge3JldHVybiBmYWxzZTt9XSxcbiAgW3Blcm1pc3Npb25zLnVzZXIsIGZ1bmN0aW9uIChhdXRob3IpIHtyZXR1cm4gYXV0aG9yLmlzVXNlcigpO31dLFxuICBbcGVybWlzc2lvbnMub3duZXIsIGZ1bmN0aW9uIChhdXRob3IsIGRvYykge3JldHVybiBhdXRob3IuaXNPd25lcihkb2MpO31dLFxuICBbcGVybWlzc2lvbnMuc2VsZiwgZnVuY3Rpb24gKGF1dGhvciwgZG9jKSB7cmV0dXJuIGF1dGhvci5pc1NlbGYoZG9jKTt9XSxcbiAgW3Blcm1pc3Npb25zLmd1ZXN0LCBmdW5jdGlvbiAoYXV0aG9yKSB7cmV0dXJuIHRydWU7fV1dO1xuXG59O1xuXG52YXIgY2hlY2sgPSBmdW5jdGlvbiBjaGVjayhtYXRjaCwgYXV0aG9yLCBkb2MsIHByb2Nlc3MpIHt2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlO3ZhciBfZGlkSXRlcmF0b3JFcnJvcjMgPSBmYWxzZTt2YXIgX2l0ZXJhdG9yRXJyb3IzID0gdW5kZWZpbmVkO3RyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yMyA9IG1hdGNoW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAzOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gKF9zdGVwMyA9IF9pdGVyYXRvcjMubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlKSB7dmFyIF9zdGVwMyR2YWx1ZSA9IF9zbGljZWRUb0FycmF5KF9zdGVwMy52YWx1ZSwgMiksZmllbGRzID0gX3N0ZXAzJHZhbHVlWzBdLGZ1bmMgPSBfc3RlcDMkdmFsdWVbMV07XG4gICAgICBpZiAoZmllbGRzID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuICAgICAgdmFyIHBlcm1pdHRlZCA9IGZ1bmMoYXV0aG9yLCBkb2MpO1xuICAgICAgaWYgKCFwZXJtaXR0ZWQpIHtcbiAgICAgICAgaWYgKGZpZWxkcyA9PT0gdHJ1ZSkgdGhyb3cgbmV3IF9lcnJvci5QZXJtaXNzaW9uRXJyb3IoKTtcbiAgICAgICAgaWYgKHByb2Nlc3MpIHtcbiAgICAgICAgICBmaWVsZHMuZm9yRWFjaChwcm9jZXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH19IGNhdGNoIChlcnIpIHtfZGlkSXRlcmF0b3JFcnJvcjMgPSB0cnVlO19pdGVyYXRvckVycm9yMyA9IGVycjt9IGZpbmFsbHkge3RyeSB7aWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyAmJiBfaXRlcmF0b3IzLnJldHVybikge19pdGVyYXRvcjMucmV0dXJuKCk7fX0gZmluYWxseSB7aWYgKF9kaWRJdGVyYXRvckVycm9yMykge3Rocm93IF9pdGVyYXRvckVycm9yMzt9fX1cbn07XG5cbnZhciBwcm9jZXNzU2V0ID0gZnVuY3Rpb24gcHJvY2Vzc1NldChzY2hlbWEsIG9wdGlvbnMpIHtcbiAgdmFyIGluc2VydE1hdGNoID0gZ2V0TWF0Y2gobWVyZ2Uob3B0aW9ucy5zZXQsIG9wdGlvbnMuaW5zZXJ0KSk7XG4gIHZhciBtb2RpZnlNYXRjaCA9IGdldE1hdGNoKG1lcmdlKG9wdGlvbnMuc2V0LCBvcHRpb25zLm1vZGlmeSkpO1xuICBzY2hlbWEucHJlKCdzYXZlJywgZnVuY3Rpb24gKG5leHQpIHtcbiAgICB2YXIgZG9jID0gdGhpcztcbiAgICBpZiAob3B0aW9ucy5hdXRob3JzRmllbGQpIHtcbiAgICAgIGlmIChkb2MuaXNNb2RpZmllZCgnYXV0aG9ycycpKSByZXR1cm4gbmV4dChuZXcgX2Vycm9yLlBlcm1pc3Npb25FcnJvcigpKTtcbiAgICAgIGRvYy5hdXRob3JzLmFkZFRvU2V0KGRvYy5hdXRob3IpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgY2hlY2soZG9jLmlzTmV3ID8gaW5zZXJ0TWF0Y2ggOiBtb2RpZnlNYXRjaCwgZG9jLmF1dGhvciwgZG9jLCBmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgaWYgKGRvYy5pc01vZGlmaWVkKGZpZWxkKSkgdGhyb3cgbmV3IF9lcnJvci5QZXJtaXNzaW9uRXJyb3IoKTtcbiAgICAgIH0pO1xuICAgICAgbmV4dCgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbmV4dChlcnIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG52YXIgcHJvY2Vzc0dldCA9IGZ1bmN0aW9uIHByb2Nlc3NHZXQoc2NoZW1hLCBvcHRpb25zKSB7XG4gIHZhciBtYXRjaCA9IGdldE1hdGNoKG9wdGlvbnMuZ2V0KTtcbiAgdmFyIF90b0pTT04gPSBzY2hlbWEub3B0aW9ucy50b0pTT047XG4gIHNjaGVtYS5vcHRpb25zLnRvSlNPTiA9IHtcbiAgICB0cmFuc2Zvcm06IGZ1bmN0aW9uIHRyYW5zZm9ybShkb2MsIHJldCwgb3B0aW9ucykge1xuICAgICAgaWYgKF90b0pTT04gJiYgX3RvSlNPTi50cmFuc2Zvcm0pIHtcbiAgICAgICAgcmV0ID0gX3RvSlNPTi50cmFuc2Zvcm0oZG9jLCByZXQsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgY2hlY2sobWF0Y2gsIG9wdGlvbnMucmVxLmF1dGhvciwgZG9jLCBmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgZGVsZXRlIHJldFtmaWVsZF07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSB9O1xuXG59O1xuXG52YXIgcHJvY2Vzc1JlbW92ZSA9IGZ1bmN0aW9uIHByb2Nlc3NSZW1vdmUoc2NoZW1hLCBvcHRpb25zKSB7XG4gIHZhciBtYXRjaCA9IGdldE1hdGNoKG9wdGlvbnMucmVtb3ZlKTtcbiAgc2NoZW1hLnByZSgncmVtb3ZlJywgZnVuY3Rpb24gKG5leHQpIHtcbiAgICB2YXIgZG9jID0gdGhpcztcbiAgICB0cnkge1xuICAgICAgY2hlY2sobWF0Y2gsIGRvYy5hdXRob3IsIGRvYyk7XG4gICAgICBuZXh0KCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBuZXh0KGVycik7XG4gICAgfVxuICB9KTtcbn07XG5cbnZhciBhdXRob3JQbHVnaW4gPSBmdW5jdGlvbiBhdXRob3JQbHVnaW4oc2NoZW1hLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBfZXh0ZW5kcyh7XG4gICAgYXV0aG9yc0ZpZWxkOiBmYWxzZSxcbiAgICBzZXQ6IHt9LFxuICAgIGluc2VydDoge30sXG4gICAgbW9kaWZ5OiB7fSxcbiAgICBnZXQ6IHt9LFxuICAgIHJlbW92ZToge30gfSxcbiAgb3B0aW9ucyk7XG5cblxuICBpZiAob3B0aW9ucy5hdXRob3JzRmllbGQpIHtcbiAgICBzY2hlbWEuYWRkKHtcbiAgICAgIGF1dGhvcnM6IFt7IHR5cGU6IE9iamVjdElkLCByZWY6ICdVc2VyJyB9XSB9KTtcblxuICB9XG5cbiAgc2NoZW1hLm1ldGhvZHMuc2V0QXV0aG9yID0gZnVuY3Rpb24gKGF1dGhvcikge1xuICAgIHRoaXMuYXV0aG9yID0gYXV0aG9yO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHByb2Nlc3NTZXQoc2NoZW1hLCBvcHRpb25zKTtcbiAgcHJvY2Vzc0dldChzY2hlbWEsIG9wdGlvbnMpO1xuICBwcm9jZXNzUmVtb3ZlKHNjaGVtYSwgb3B0aW9ucyk7XG59O2V4cG9ydHMuZGVmYXVsdCA9XG5cbmF1dGhvclBsdWdpbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYWNrZW5kL21vZGVscy9wbHVnaW5zL2F1dGhvclBsdWdpbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9zcmMvYmFja2VuZC9tb2RlbHMvcGx1Z2lucy9hdXRob3JQbHVnaW4uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/backend/models/plugins/authorPlugin.js\n");

/***/ }),

/***/ "./src/backend/models/plugins/codeHighPlugin.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _error = __webpack_require__(\"./src/backend/common/error.js\");\n\nvar codeHighPlugin = function codeHighPlugin(schema, options) {\n  schema.statics.create = function (body) {\n    var Model = this;\n    return new Promise(function (resolve, reject) {return resolve(new Model(body));});\n  };\n\n  schema.statics.get = function (doc_id) {\n    var Model = this;\n    return Model.findById(doc_id).\n    then(function (doc) {\n      if (!doc) throw new _error.NotFoundError();\n      return doc;\n    });\n  };\n\n  var _toJSON = schema.options.toJSON;\n  schema.options.toJSON = {\n    transform: function transform(doc, ret, options) {\n      if (_toJSON && _toJSON.transform) {\n        ret = _toJSON.transform(doc, ret, options);\n      }\n      delete ret.__v;\n      return ret;\n    } };\n\n};exports.default =\n\ncodeHighPlugin;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9tb2RlbHMvcGx1Z2lucy9jb2RlSGlnaFBsdWdpbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZW5kL21vZGVscy9wbHVnaW5zL2NvZGVIaWdoUGx1Z2luLmpzPzVkMGMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTt2YXIgX2Vycm9yID0gcmVxdWlyZSgnL2NvbW1vbi9lcnJvcicpO1xuXG52YXIgY29kZUhpZ2hQbHVnaW4gPSBmdW5jdGlvbiBjb2RlSGlnaFBsdWdpbihzY2hlbWEsIG9wdGlvbnMpIHtcbiAgc2NoZW1hLnN0YXRpY3MuY3JlYXRlID0gZnVuY3Rpb24gKGJvZHkpIHtcbiAgICB2YXIgTW9kZWwgPSB0aGlzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7cmV0dXJuIHJlc29sdmUobmV3IE1vZGVsKGJvZHkpKTt9KTtcbiAgfTtcblxuICBzY2hlbWEuc3RhdGljcy5nZXQgPSBmdW5jdGlvbiAoZG9jX2lkKSB7XG4gICAgdmFyIE1vZGVsID0gdGhpcztcbiAgICByZXR1cm4gTW9kZWwuZmluZEJ5SWQoZG9jX2lkKS5cbiAgICB0aGVuKGZ1bmN0aW9uIChkb2MpIHtcbiAgICAgIGlmICghZG9jKSB0aHJvdyBuZXcgX2Vycm9yLk5vdEZvdW5kRXJyb3IoKTtcbiAgICAgIHJldHVybiBkb2M7XG4gICAgfSk7XG4gIH07XG5cbiAgdmFyIF90b0pTT04gPSBzY2hlbWEub3B0aW9ucy50b0pTT047XG4gIHNjaGVtYS5vcHRpb25zLnRvSlNPTiA9IHtcbiAgICB0cmFuc2Zvcm06IGZ1bmN0aW9uIHRyYW5zZm9ybShkb2MsIHJldCwgb3B0aW9ucykge1xuICAgICAgaWYgKF90b0pTT04gJiYgX3RvSlNPTi50cmFuc2Zvcm0pIHtcbiAgICAgICAgcmV0ID0gX3RvSlNPTi50cmFuc2Zvcm0oZG9jLCByZXQsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgZGVsZXRlIHJldC5fX3Y7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0gfTtcblxufTtleHBvcnRzLmRlZmF1bHQgPVxuXG5jb2RlSGlnaFBsdWdpbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYWNrZW5kL21vZGVscy9wbHVnaW5zL2NvZGVIaWdoUGx1Z2luLmpzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9iYWNrZW5kL21vZGVscy9wbHVnaW5zL2NvZGVIaWdoUGx1Z2luLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/backend/models/plugins/codeHighPlugin.js\n");

/***/ }),

/***/ "./src/backend/models/plugins/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports, \"__esModule\", { value: true });var _authorPlugin = __webpack_require__(\"./src/backend/models/plugins/authorPlugin.js\");Object.defineProperty(exports, 'authorPlugin', { enumerable: true, get: function get() {return _interopRequireDefault(_authorPlugin).default;} });var _codeHighPlugin = __webpack_require__(\"./src/backend/models/plugins/codeHighPlugin.js\");Object.defineProperty(exports, 'codeHighPlugin', { enumerable: true, get: function get() {return _interopRequireDefault(_codeHighPlugin).\n    default;} });function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmFja2VuZC9tb2RlbHMvcGx1Z2lucy9pbmRleC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iYWNrZW5kL21vZGVscy9wbHVnaW5zL2luZGV4LmpzP2NhNGEiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTt2YXIgX2F1dGhvclBsdWdpbiA9IHJlcXVpcmUoJy4vYXV0aG9yUGx1Z2luJyk7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdhdXRob3JQbHVnaW4nLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gZ2V0KCkge3JldHVybiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hdXRob3JQbHVnaW4pLmRlZmF1bHQ7fSB9KTt2YXIgX2NvZGVIaWdoUGx1Z2luID0gcmVxdWlyZSgnLi9jb2RlSGlnaFBsdWdpbicpO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnY29kZUhpZ2hQbHVnaW4nLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gZ2V0KCkge3JldHVybiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb2RlSGlnaFBsdWdpbikuXG4gICAgZGVmYXVsdDt9IH0pO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7cmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07fVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JhY2tlbmQvbW9kZWxzL3BsdWdpbnMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vc3JjL2JhY2tlbmQvbW9kZWxzL3BsdWdpbnMvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/backend/models/plugins/index.js\n");

/***/ }),

/***/ "body-parser":
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cookie-parser":
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "express":
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "fb":
/***/ (function(module, exports) {

module.exports = require("fb");

/***/ }),

/***/ "fs":
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "jsonwebtoken":
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "morgan":
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),

/***/ "path":
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "randomstring":
/***/ (function(module, exports) {

module.exports = require("randomstring");

/***/ }),

/***/ "socket.io":
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ })

/******/ });
});