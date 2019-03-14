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
const client_1 = __importDefault(require("./client"));
class DwollaClient {
    getClients() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.default.auth.client()
                .then(appToken => appToken.get('customers'))
                .then(res => res.body._embedded);
        });
    }
    getClientByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            var clientes = yield this.getClients();
            var cliente = yield clientes.customers.find(function (element) {
                return element.email === email;
            });
            return cliente;
        });
    }
    clientCreate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.default.auth.client()
                .then(appToken => appToken.post('customers', date)
                .then(res => res.headers.get('location')));
        });
    }
}
const dwollaClient = new DwollaClient();
exports.default = dwollaClient;
