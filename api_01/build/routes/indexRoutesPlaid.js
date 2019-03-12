"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientPlaid_1 = __importDefault(require("../plaid/clientPlaid"));
class IndexRoutesPlaid {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post('/get_access_token', this.getTokenAcess);
    }
    getTokenAcess(req, res) {
        var ACCESS_TOKEN;
        var PUBLIC_TOKEN;
        var ITEM_ID;
        var PROCESSOR_TOKEN;
        PUBLIC_TOKEN = req.body.public_token;
        ITEM_ID = req.body.item_id;
        clientPlaid_1.default.exchangePublicToken(PUBLIC_TOKEN, function (err, rese) {
            ACCESS_TOKEN = rese.access_token;
            clientPlaid_1.default.createProcessorToken(ACCESS_TOKEN, ITEM_ID, 'dwolla', function (err, resep) {
                PROCESSOR_TOKEN = resep.processor_token;
                console.log(PROCESSOR_TOKEN);
            });
        });
    }
}
const indexRouter = new IndexRoutesPlaid();
indexRouter.routes();
exports.default = indexRouter.router;
