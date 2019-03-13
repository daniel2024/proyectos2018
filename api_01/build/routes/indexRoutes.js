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
const clientPlaid_1 = __importDefault(require("../plaid/clientPlaid"));
const client_1 = __importDefault(require("../ dwolla_resource/client"));
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    //lista los clientes
    listCustomers(req, res) {
        client_1.default.auth.client()
            .then(function (appToken) {
            console.log(appToken);
        });
        /*appToken.auth.client()
          .then(function (appToken: any) {
            appToken
              .get('customers', { limit: 10 })
              .then(res => console.log(res.body._embedded['customers']))
    
          })*/
    }
    //creo cliente
    createCustomer(req, res) {
        //campos para un cliente que solo recive
        var requestBody = {
            firstName: 'Jane',
            lastName: 'Merchant',
            email: 'jmerchant@nomail.net',
            type: 'receive-only',
            businessName: 'Jane Corp llc',
            ipAddress: '99.99.99.99'
        };
        client_1.default.auth.client()
            .then(function (appToken) {
            appToken
                .post('customers', requestBody)
                .then(res => console.log(res.headers.get('location')));
        });
    }
    createFounding(req, res) {
        //----------------Plaid----------------------
        var ACCESS_TOKEN;
        var PUBLIC_TOKEN;
        var ITEM_ID;
        var PROCESSOR_TOKEN;
        var ACCOUNT_DATA;
        PUBLIC_TOKEN = req.body.public_token;
        ITEM_ID = req.body.item_id;
        clientPlaid_1.default.exchangePublicToken(PUBLIC_TOKEN, function (err, rese) {
            return __awaiter(this, void 0, void 0, function* () {
                ACCESS_TOKEN = rese.access_token;
                ACCOUNT_DATA = yield IndexRoutes.dataAccount(ACCESS_TOKEN, ITEM_ID);
                clientPlaid_1.default.createProcessorToken(ACCESS_TOKEN, ITEM_ID, 'dwolla', function (err, resep) {
                    PROCESSOR_TOKEN = resep.processor_token;
                    var customerUrl = "https://api-sandbox.dwolla.com/customers/9338b343-21ac-462a-8567-5c08cc7d46bf";
                    var requestBody = {
                        'routingNumber': ACCOUNT_DATA.routingNumber,
                        'accountNumber': ACCOUNT_DATA.accountNumber,
                        'bankAccountType': ACCOUNT_DATA.bankAccountType,
                        'name': ACCOUNT_DATA.name,
                        'plaidToken': PROCESSOR_TOKEN
                    };
                    client_1.default.auth.client()
                        .then(function (appToken) {
                        appToken
                            .post(`${customerUrl}/funding-sources`, requestBody)
                            .then(res => console.log(res.headers.get('location')));
                    });
                });
            });
        });
    }
    //-------------------------------------------   
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
        this.router.post('/foundig', this.createFounding);
        this.router.post('/tranfer', this.makeTranfer);
    }
    // funciones auxiliares
    static dataAccount(ACCESS_TOKEN, ITEM_ID) {
        var ACCOUNT_DATA;
        clientPlaid_1.default.getAuth(ACCESS_TOKEN, function (error, authResponse) {
            if (error != null) {
                console.log(error);
            }
            //filtro el vector por id de la cuenta  en ambos casos 
            //y obtengo de uno el roting y el numero de cuenta
            //del otro tipo de cuenta y nombre.Devuelve un object
            var account = authResponse.numbers.ach.find(function (element) {
                return element.account_id === ITEM_ID;
            });
            var account2 = authResponse.accounts.find(function (element) {
                return element.account_id === ITEM_ID;
            });
            ACCOUNT_DATA = {
                'routingNumber': account.routing,
                'accountNumber': account.account,
                'name': account2.name,
                'bankAccountType': account2.subtype,
            };
            console.log(ACCOUNT_DATA);
            return ACCOUNT_DATA;
        });
    }
}
const indexRouter = new IndexRoutes();
indexRouter.routes();
exports.default = indexRouter.router;
