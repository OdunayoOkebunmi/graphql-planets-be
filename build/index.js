"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKoaServer = void 0;
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const server_1 = require("./server");
const PORT = process.env.PORT || 3000;
async function createKoaServer() {
    const app = new koa_1.default();
    const router = new koa_router_1.default();
    const server = await (0, server_1.createApolloServer)(app);
    router.get("/status", (ctxt) => {
        ctxt.body = { success: true };
    });
    server.applyMiddleware({ app });
    app.listen(PORT);
    console.log(`Server started on http://localhost:${PORT}`);
    return app;
}
exports.createKoaServer = createKoaServer;
createKoaServer();
