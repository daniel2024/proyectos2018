"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
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
        client_1.default.auth.client()
            .then(function (appToken) {
            var customerUrl = 'https://api-sandbox.dwolla.com/customers/276153cd-4ba0-49d8-9fd7-9cf4d7d93954';
            appToken
                .post(`${customerUrl}/funding-sources-token`)
                .then(function (res) {
                console.log(res.body.token);
            });
        });
    }
    routes() {
        this.router.post('/customer/creater', this.createCustomer);
        this.router.get('/customers', this.listCustomers);
        this.router.get('/foundig', this.createFounding);
    }
}
const indexRouter = new IndexRoutes();
indexRouter.routes();
exports.default = indexRouter.router;
