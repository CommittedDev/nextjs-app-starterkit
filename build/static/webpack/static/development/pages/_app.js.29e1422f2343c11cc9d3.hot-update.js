webpackHotUpdate("static\\development\\pages\\_app.js",{

/***/ "./src/store/tables/workers/updateTablesValues.js":
/*!********************************************************!*\
  !*** ./src/store/tables/workers/updateTablesValues.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return updateTablesValues; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js");
/* harmony import */ var _services_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/logger */ "./src/services/logger/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./src/store/tables/actions.js");


var _marked =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(updateTablesValues);




function updateTablesValues(action) {
  var values, res;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function updateTablesValues$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          debugger;
          values = action.payload.values;
          _context.prev = 2;
          //     yield put(setRamzorPress({ storeKey, status: consts.API_STATUS.START, error: null, loading: true, data: dataForClient }));
          //     const res = yield httpRequest(api.request, { url: 'setCompliance', method: 'post', data: dataToSend });
          //     if (res.error) {
          //         const errType = res.message === 'Network Error' ? consts.API_STATUS.FAILED_NETWORK : consts.API_STATUS.FAILED;
          //         yield put(setRamzorPress({ storeKey, status: errType, error: res, loading: false, data: dataForClient }));
          //     } else {
          //         yield put(setRamzorPress({
          //             storeKey, status: consts.API_STATUS.FINISHED, error: null, loading: false, data: dataForClient
          //         }));
          //     }
          res = values;
          _context.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])(Object(_actions__WEBPACK_IMPORTED_MODULE_3__["setValues"])({
            storeKey: storeKey,
            status: consts.API_STATUS.FINISHED,
            error: null,
            loading: false,
            data: res
          }));

        case 6:
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](2);
          _services_logger__WEBPACK_IMPORTED_MODULE_2__["logger"].log('error in onRamzorPress', _context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[2, 8]]);
}

/***/ })

})
//# sourceMappingURL=_app.js.29e1422f2343c11cc9d3.hot-update.js.map