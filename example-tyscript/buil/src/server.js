"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const index_Routes_1 = __importDefault(require("../routers/index.Routes"));
const PostRoutes_1 = __importDefault(require("../routers/PostRoutes"));
const UserRoutes_1 = __importDefault(require("../routers/UserRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
class Server {
    constructor() {
        this.app = express_1.default();
        //midelware
        this.app.use(express_1.default.json()); //el tranformado de json va antes de la config
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.config();
        this.app.use(helmet_1.default());
        this.app.use(cors_1.default());
        this.app.use(compression_1.default());
    }
    config() {
        const MONGO_URI = 'mongodb://localhost/ts';
        mongoose_1.default.set('useFindAndModify', true);
        mongoose_1.default.connect(MONGO_URI || process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true
        })
            .then(db => console.log('db is conect'));
        //setings
        this.app.set('port', process.env.PORT || 3000);
        //midalware
        this.app.use(morgan_1.default('dev'));
        this.routes();
    }
    routes() {
        this.app.use(index_Routes_1.default);
        this.app.use('/api/posts', PostRoutes_1.default);
        this.app.use('/api/user', UserRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
