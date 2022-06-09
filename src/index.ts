import Koa from "koa";
import KoaRouter from "koa-router";
import { createApolloServer } from './server'

const PORT = process.env.PORT || 3000;

export async function createKoaServer (): Promise<Koa> {
  const app = new Koa();
  const router = new KoaRouter();

  const server = await createApolloServer(app)

  router.get("/status", (ctxt: any) => {
    ctxt.body = { success: true };
  });
  server.applyMiddleware({ app });

  app.listen(PORT)
  console.log(`Server started on http://localhost:${ PORT }`);

  return app
}

createKoaServer()