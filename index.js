const { response } = require('express')
const express = require('express')
const request = require('request')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json());
const {Todo} = require("./models")
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.get('/',function(request,response){
    response.send('Hello world')
})

app.get("/todos",(request,response) => {
    console.log("Todo list")
})

app.post("/todos",async (request,response) => {
    console.log("creating a todo",request.body)
    //todo
    //here create function is async..so we need to convert it to sync...because even before creating todo instance it may return it.
    try{
    const todo =await Todo.addTodo({title: request.body.title, dueDate: request.body.dueDate, completed:false})
    return response.json(todo)
    }catch(error) {
        console.log(error)
        return response.status(422).json(error)
    }
})

app.put("/todos/:id/markAsCompleted",async (request,response)=>{
    console.log("we have to update a todo with ID:",request.params.id)
    const todo = await Todo.findByPk(request.params.id)
    try{
    const updatedTodo = await todo.markAsCompleted()
    return response.json(updatedTodo)
    }catch (error) {
        console.log(error)
        return response.status(422).json(error)

    }
})

app.delete("/todos/:id",(request,response)=>{
    console.log("Deleting a todo by ID:",request.params.id)
})

app.listen(3000,()=>{
    console.log('Started successfully at port 3000')
})