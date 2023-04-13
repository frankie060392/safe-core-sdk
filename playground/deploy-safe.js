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
        while (_) try {
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
exports.__esModule = true;
var safe_core_sdk_1 = require("@safe-global/safe-core-sdk");
var safe_ethers_lib_1 = require("@safe-global/safe-ethers-lib");
var ethers_1 = require("ethers");
var config = {
    RPC_URL: 'https://rpc-testnet.tbcscan.com',
    DEPLOYER_ADDRESS_PRIVATE_KEY: '0xda8398e31e3c92bcc69bd9d3cfd0700829d94b4ef5a920639267eed01b4b8f59',
    DEPLOY_SAFE: {
        OWNERS: [
            '0x84EFe423435Dc88D299dBDa182060516c8f3D71A',
            '0x30A51F516704D7de556a6181B56EcE1A29720900'
        ],
        THRESHOLD: 1,
        SALT_NONCE: '0'
    }
};
function main() {
    return __awaiter(this, void 0, void 0, function () {
        function callback(txHash) {
            console.log('Transaction hash:', txHash);
        }
        var provider, deployerSigner, ethAdapter, safeFactory, safeAccountConfig, safeDeploymentConfig, predictedDeployAddress, safe;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = new ethers_1.ethers.providers.JsonRpcProvider(config.RPC_URL);
                    deployerSigner = new ethers_1.ethers.Wallet(config.DEPLOYER_ADDRESS_PRIVATE_KEY, provider);
                    ethAdapter = new safe_ethers_lib_1["default"]({
                        ethers: ethers_1.ethers,
                        signerOrProvider: deployerSigner
                    });
                    return [4 /*yield*/, safe_core_sdk_1.SafeFactory.create({ ethAdapter: ethAdapter })
                        // Config of the deployed Safe
                    ];
                case 1:
                    safeFactory = _a.sent();
                    safeAccountConfig = {
                        owners: config.DEPLOY_SAFE.OWNERS,
                        threshold: config.DEPLOY_SAFE.THRESHOLD
                    };
                    safeDeploymentConfig = {
                        saltNonce: config.DEPLOY_SAFE.SALT_NONCE
                    };
                    return [4 /*yield*/, safeFactory.predictSafeAddress({
                            safeAccountConfig: safeAccountConfig,
                            safeDeploymentConfig: safeDeploymentConfig
                        })];
                case 2:
                    predictedDeployAddress = _a.sent();
                    return [4 /*yield*/, safeFactory.deploySafe({
                            safeAccountConfig: safeAccountConfig,
                            safeDeploymentConfig: safeDeploymentConfig,
                            callback: callback
                        })];
                case 3:
                    safe = _a.sent();
                    console.log('Predicted deployed address:', predictedDeployAddress);
                    console.log('Deployed Safe:', safe.getAddress());
                    return [2 /*return*/];
            }
        });
    });
}
main();
