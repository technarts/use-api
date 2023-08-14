"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function useApi(params) {
    var _this = this;
    var url = React.useState(params.url)[0];
    // Data after a successful fetch operation:
    var _a = React.useState(null), RESP = _a[0], setResp = _a[1];
    // Data after a successful fetch operation,
    // but the response is not ok:
    var _b = React.useState(null), error = _b[0], setError = _b[1];
    // Data after an unsuccessful fetch operation:
    var _c = React.useState(null), fault = _c[0], setFault = _c[1];
    // Is there an ongoing request?:
    var _d = React.useState(false), inFlight = _d[0], setInFlight = _d[1];
    var call = function (callParams) { return __awaiter(_this, void 0, void 0, function () {
        var _url, _headers, _body, options, response, _a, _b, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    setInFlight(true);
                    _url = (callParams === null || callParams === void 0 ? void 0 : callParams.url) || params.url;
                    _headers = (callParams === null || callParams === void 0 ? void 0 : callParams.headers) || params.headers;
                    _body = (callParams === null || callParams === void 0 ? void 0 : callParams.payload) ? JSON.stringify(callParams.payload) : undefined;
                    options = {
                        method: params.method === "DOWNLOAD" ? "GET" : params.method,
                        headers: _headers,
                        body: _body,
                    };
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 7, 8, 9]);
                    return [4 /*yield*/, fetch(_url, options)
                            .then(function (r) { var _a; return ((_a = params.responseGuard) === null || _a === void 0 ? void 0 : _a.call(params, r, { url: _url, headers: _headers, payload: callParams === null || callParams === void 0 ? void 0 : callParams.payload })) || Promise.resolve(r); })
                            .then(function (r) { return ({
                            ok: r.ok,
                            data: params.method === "DOWNLOAD" ? r.blob() : r.json()
                        }); })];
                case 2:
                    response = _c.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    setError(null);
                    setFault(null);
                    _a = setResp;
                    return [4 /*yield*/, response.data];
                case 3:
                    _a.apply(void 0, [_c.sent()]);
                    return [3 /*break*/, 6];
                case 4:
                    setResp(null);
                    setFault(null);
                    _b = setError;
                    return [4 /*yield*/, response.data];
                case 5:
                    _b.apply(void 0, [_c.sent()]);
                    _c.label = 6;
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_1 = _c.sent();
                    setResp(null);
                    setError(null);
                    setFault(e_1);
                    return [3 /*break*/, 9];
                case 8:
                    setInFlight(false);
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    return {
        RESP: RESP,
        inFlight: inFlight,
        error: error,
        fault: fault,
        url: url,
        call: call,
    };
}
exports.default = useApi;
