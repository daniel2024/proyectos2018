"use strict";
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
            appToken
                .get('customers', { limit: 10 })
                .then(res => console.log(res.body._embedded['customers']));
        });
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
        PUBLIC_TOKEN = req.body.public_token;
        ITEM_ID = req.body.item_id;
        clientPlaid_1.default.exchangePublicToken(PUBLIC_TOKEN, function (err, rese) {
            ACCESS_TOKEN = rese.access_token;
            clientPlaid_1.default.getAuth(ACCESS_TOKEN, function (error, authResponse) {
            });
            clientPlaid_1.default.createProcessorToken(ACCESS_TOKEN, ITEM_ID, 'dwolla', function (err, resep) {
                PROCESSOR_TOKEN = resep.processor_token;
            });
            var customerUrl = "https://api-sandbox.dwolla.com/customers/9338b343-21ac-462a-8567-5c08cc7d46bf";
            var requestBody = {
                'routingNumber': '011401533',
                'accountNumber': '1111222233330000',
                'bankAccountType': 'checking',
                'name': 'Plaid Checking',
                'plaidToken': PROCESSOR_TOKEN
            };
            client_1.default.auth.client()
                .then(function (appToken) {
                appToken
                    .post(`${customerUrl}/funding-sources`, requestBody)
                    .then(res => console.log(res.headers.get('location')));
            });
        });
        //-------------------------------------------   
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
        this.router.post('/foundig', this.createFounding);
        this.router.post('/tranfer', this.makeTranfer);
    }
}
const indexRouter = new IndexRoutes();
indexRouter.routes();
exports.default = indexRouter.router;
