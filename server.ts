import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts";
const port = 3000;
const App = new Application();
App.use(router.routes());
App.use(router.allowedMethods());
App.listen({ port: port });
console.log(`Server running on port ${port}`);
