const express = require("express");
const sqlite3 = require("sqlite3");
const path = require("path");
const { open } = require("sqlite");
const app = express();
const dbPath = path.join(__dirname, "todoApplication.db");
let db = null;
const initializeDbServer = () => {
  try {
    db = open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB ERROR:${e.message}`);
    process.exit(1);
  }
};
initializeDbServer();
//API 1

app.get("/todos/", async (request, response) => {
  let updateColumn = "";
  const requestBody = request.query;
  switch (true) {
    case requestBody.status !== undefined:
      updateColumn = "status";
      break;
    case requestBody.priority !== undefined:
      updateColumn = "priority";
      break;
    case requestBody.todo !== undefined:
      updateColumn = "Todo";
      break;
  }

  const getTodoQuery = `SELECT * FROM todo where LIKE '%${updatedColumn}%';`;
  const todoList = await db.all(getTodoQuery);
  response.send(todoList);
});

//API 2

app.get("/todos/:todoId", async (request, response) => {
  const { todoId } = request.params;
  const selectDbQuery = `SELECT * FROM todo WHERE todo.id = ${todoId};`;
  const dbRes = await db.all(selectDbQuery);
  response.send(dbResponse);
});

//API 3

app.post("/todos/", async (request, response) => {
  const { id, todo, priority, status } = request.body;
  const postDbQuery = `INSERT INTO todo(id,todo,priority,status) VALUES (${id},"${todo}","${priority}","${status}");`;
  const postDb = await db.run(postDbQuery);
  response.send("Todo Successfully Added");
});

//API 4
app.put("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  let updateColumn = "";
  const requestBody = request.body;
  switch (true) {
    case requestBody.status !== undefined:
      updatColumn = "status";
      break;
    case requestBody.priority !== undefined:
      updateColumn = "priority";
      break;
    case requestBody.todo !== undefined:
      updateColumn = "Todo";
      break;
  }

  const previousTodoQuery = `SELECT * FROM todo WHERE id=${todoId};`;
  const previousTodo = await db.get(previousTodoQuery);
  const {
    todo = previousTodo.todo,
    priority = previousTodo.priority,
    status = previousTodo.status,
  } = request.body;
  const updateTodoQuery = `UPDATE todo SET 
  todo='${todo}', priority = '${priority}',status = '${status}'
  WHERE id=${todoId};`;
  await db.run(updateTodoQuery);
  response.send(`${updateColumn} Update`);
});

//API 5

app.delete("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const deleteDbQuery = `DELETE  FROM todo WHERE id = ${todoId};`;
  await db.run(deleteDbQuery);
  response.send(deleteDbQuery);
});
