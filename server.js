const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

let tasks = [];

app.get("/", (req, res) => {
    let list = tasks.map((task, index) => {
        return `<li>${task} 
                <a href="/delete/${index}" style="color:red;">Delete</a>
                </li>`;
    }).join("");

    res.send(`
        <html>
        <head>
            <title>To-Do App</title>
        </head>
        <body style="font-family: Arial; text-align:center; background:#f2f2f2;">
            <h2>My To-Do List</h2>
            <form method="POST" action="/add">
                <input type="text" name="task" required />
                <button type="submit">Add Task</button>
            </form>
            <ul style="list-style:none;">
                ${list}
            </ul>
        </body>
        </html>
    `);
});

app.post("/add", (req, res) => {
    tasks.push(req.body.task);
    res.redirect("/");
});

app.get("/delete/:index", (req, res) => {
    tasks.splice(req.params.index, 1);
    res.redirect("/");
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on port 3000");
});