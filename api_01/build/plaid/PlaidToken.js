"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clientPlaid_1 = __importDefault(require("./clientPlaid"));
class PlaidToken {
    getToken(PUBLIC_TOKEN, ITEM_ID) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            lo que mando cuando tengo usar
                  req.body.public_token
                  req.body.item_id
            */
            yield clientPlaid_1.default.exchangePublicToken(PUBLIC_TOKEN, (err, res) => __awaiter(this, void 0, void 0, function* () {
                var ACCESS_TOKEN = yield res.access_token;
                //  dataAccount(ACCESS_TOKEN,ITEM_ID)
                yield clientPlaid_1.default.createProcessorToken(ACCESS_TOKEN, ITEM_ID, 'dwolla', function (err, resep) {
                    return __awaiter(this, void 0, void 0, function* () {
                        return yield resep.processor_token;
                    });
                });
            }));
        });
    }
}
var plaidToken = new PlaidToken();
exports.default = plaidToken;
