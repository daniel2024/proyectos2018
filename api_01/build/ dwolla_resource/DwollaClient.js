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
const client_2 = __importDefault(require("./client"));
const lodash_1 = __importDefault(require("lodash"));
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
            return yield client_2.default.auth.client()
                .then(appToken => appToken.get('customers', { search: email })
                .then(res => res.body._embedded.customers[0]));
        });
    }
    clientCreate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.default.auth.client()
                .then(appToken => appToken.post('customers', date)
                .then(res => res.headers.get('location')));
        });
    }
    getFundingSources(email) {
        return __awaiter(this, void 0, void 0, function* () {
            //alguna forma de tener todas las rutas guardadas
            var urlClient = yield this.getClientByEmail(email)
                .then(client => 'https://api-sandbox.dwolla.com/customers/' + client.id);
            return yield client_1.default.auth.client()
                .then(appToken => appToken.get(`${urlClient}/funding-sources`, { removed: false })
                .then(res => res.body._embedded['funding-sources']));
        });
    }
    getFundingSourcesByNameAndType(email, name, type) {
        return __awaiter(this, void 0, void 0, function* () {
            var foundingSources = yield this.getFundingSources(email);
            return yield foundingSources.find(function (element) {
                return (element.name == name && element.bankAccountType == type);
            });
        });
    }
    fundingSourceCreate(requestBody, email) {
        return __awaiter(this, void 0, void 0, function* () {
            var customerUrl = yield this.founRoutes(yield this.getClientByEmail(email), 'funding-sources');
            return yield client_1.default.auth.client()
                .then(appToken => appToken.post(customerUrl, requestBody)
                .then(res => res.headers.get('location')));
        });
    }
    //obtiene las rutas de los objetos de dwolla
    //(objeto , string (elmeto q se quiere)) si no se manda elemento te da los item q no son rutas  
    founRoutes(elemento, ruta) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ruta) {
                var path;
                return yield lodash_1.default.get(elemento, path = `_links.${ruta}.href`);
            }
            else {
                yield delete elemento._links;
                return elemento;
            }
        });
    }
}
const dwollaClient = new DwollaClient();
exports.default = dwollaClient;
