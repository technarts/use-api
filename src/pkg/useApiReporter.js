"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function useApiReporter(params) {
    var _a = React.useState(false), isStarted = _a[0], setStarted = _a[1];
    React.useEffect(function () {
        var _a, _b;
        if (params.apiCounsel.inFlight) {
            (_a = params.start) === null || _a === void 0 ? void 0 : _a.call(params);
            setStarted(true);
        }
        else if (isStarted && !params.apiCounsel.inFlight) {
            (_b = params.end) === null || _b === void 0 ? void 0 : _b.call(params, params.apiCounsel.RESP, params.apiCounsel.error, params.apiCounsel.fault);
            setStarted(false);
        }
    }, [params.apiCounsel.inFlight, isStarted]);
}
exports.default = useApiReporter;
