const mongoose = require("mongoose");
const initData = require("./data.js");
const Todo = require("../models/todo.js");

const MANGO_URL = "mongodb://127.0.0.1:27017/Todo"

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

const initDB = async () => {
    await Todo.deleteMany({});
    await Todo.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();
