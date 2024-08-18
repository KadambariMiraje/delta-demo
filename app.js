const express = require("express"); 
const app = express();  
const mongoose = require("mongoose");
const Todo = require("./models/todo.js");  //schema
const path = require("path"); //ejs
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate"); //layout

const MANGO_URL = "mongodb://127.0.0.1:27017/Todo"

//to connect mongoose
main()  
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect(MANGO_URL);
}

app.set("view engine" , "ejs"); //ejs
app.set("views" , path.join(__dirname , "views"));  //ejs
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname , "/public"))); //to use static file


app.get("/" , (req , res ) => {
    res.send("Hi , I am a root");
});

// Index Route
app.get("/todos" ,async (req , res) => {
    const allTodos = await Todo.find({});
    res.render("./todos/index.ejs" , {allTodos});
});

// new route
app.get("/todos/new" , (req , res) => {
    res.render("./todos/new.ejs");
});

// show route
app.get("/todos/:id" , async(req , res) => {
    let {id} = req.params;
    const todo = await Todo.findById(id);
    res.render("./todos/show.ejs" ,{todo});
});

// create route
app.post("/todos" , async(req , res ) => {
    const newTodo = new Todo (req.body.todos);
    await newTodo.save();
    res.redirect("/todos");
});

// Edit route
app.get("/todos/:id/edit" , async(req , res) => {
    let {id} = req.params;
    const todo = await Todo.findById(id);
    res.render("./todos/edit.ejs" , {todo});
});

// update route
app.put("/todos/:id" , async(req , res) => {
    let {id} = req.params;
    await Todo.findByIdAndUpdate(id , {...req.body.todos});
    res.redirect("/todos");
});

// Delete route
app.delete("/todos/:id" ,async (req , res) => {
    let {id} = req.params;
    let deletedTask = await Todo.findByIdAndDelete(id);
    console.log(deletedTask);
    res.redirect("/todos");
});

// app.get("/todo" ,async (req , res ) => {
//     let sampleTodo = new Todo({
//         title:"New ",
//         description:"Web lecture",
//     });
//     await sampleTodo.save();
//     console.log("sample was saved");
//     res.send("Successful");
// });

app.listen(8080 , () => {
    console.log("server is listning to port 8080 ");
});