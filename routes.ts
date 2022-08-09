import { Router } from "https://deno.land/x/oak/mod.ts";
import { addTodo,getTodos,updateTodo,getTodo } from "./Controller/todos.ts";

const router = new Router();
router
.post("/api/todos", addTodo)
.get("/api/todos",getTodos)
.put('/api/todos/:id',updateTodo)
.get('/api/todos/:id',getTodo)

export default router;
