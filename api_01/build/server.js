"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.app.use(express_1.default.json()); //el tranformado de json va antes de la config
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.config();
        this.routes();
    }
    config() {
        //settings
        this.app.set('port', process.env.PORT || 4000);
        //midelware
        this.app.use(morgan_1.default('dev'));
        this.app.use(helmet_1.default());
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server on port 4000');
        });
    }
}
const server = new Server;
server.start();
