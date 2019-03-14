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
const express_1 = require("express");
const PlaidToken_1 = __importDefault(require("../plaid/PlaidToken"));
const client_1 = __importDefault(require("../ dwolla_resource/client"));
const DwollaClient_1 = __importDefault(require("../ dwolla_resource/DwollaClient"));
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    //lista los clientes
    listCustomers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send(yield DwollaClient_1.default.getClients());
        });
    }
    //obtengo cliente por email
    getCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send(yield DwollaClient_1.default.getClientByEmail(req.body.email));
        });
    }
    //creo cliente
    createCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //campos para un cliente que solo recive
            res.send(yield DwollaClient_1.default.clientCreate(req.body));
        });
    }
    createFounding(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //----------------Plaid----------------------
            /*
             var ACCESS_TOKEN: string;
             var PUBLIC_TOKEN: string;
             var ITEM_ID: string;
             
             req.body.public_token
             ITEM_ID = req.body.item_id
             var ACCOUNT_DATA:any;
         */
            //        ACCOUNT_DATA= await IndexRoutes.dataAccount(ACCESS_TOKEN,ITEM_ID);
            console.log(yield DwollaClient_1.default.getClientByEmail('julio_perez@gmail.com'), _);
            console.log(yield PlaidToken_1.default.getToken(req.body.public_token, req.body.item_id));
            /*  var requestBody = await {
             
              'name':'prueba',// ACCOUNT_DATA.name,
              'plaidToken': PROCESSOR_TOKEN
  
            };
  
             appToken.auth.client()
            .then(appToken => appToken.post(`${customerUrl}/funding-sources`, requestBody)
            .then(res => console.log(res.headers.get('location'))))
  */
        });
    }
    makeTranfer() {
        var tranfer = {
            "_links": {
                "source": {
                    "href": "https://api-sandbox.dwolla.com/funding-sources/68ccc7bc-501f-4de0-b2ec-8acc58653d3f"
                },
                "destination": {
                    "href": "https://api-sandbox.dwolla.com/funding-sources/4d1cd214-8e70-4454-bf60-377c290125a3"
                }
            },
            "amount": {
                "currency": "USD",
                "value": "30.00"
            }
        };
        client_1.default.auth.client()
            .then(function (appToken) {
            appToken
                .post('transfers', tranfer, { "Idempotency-Key": 'e14fbcda-918e-4c2c-bd1b-e2228eb642f5' })
                .then(res => console.log(res.headers.get('location')));
        });
    }
    routes() {
        this.router.post('/customer/creater', this.createCustomer);
        this.router.get('/customers', this.listCustomers);
        this.router.get('/customer', this.getCustomer);
        this.router.post('/foundig', this.createFounding);
        this.router.post('/tranfer', this.makeTranfer);
    }
}
const indexRouter = new IndexRoutes();
indexRouter.routes();
exports.default = indexRouter.router;
