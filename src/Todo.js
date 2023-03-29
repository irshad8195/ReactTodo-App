import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";
import TodoDetails from "./TodoDetails";

const Todo = () => {
  //console.log(uuidv4())

  const ALL = "ALL";
  const PENDING = "PENDIG";
  const COMPLETED = "COMPLETED";

  const [input, setInput] = useState(""); //
  const [todo, setTodo] = useState(
    ()=>{
      const todosLS=JSON.parse(localStorage.getItem("todos")) ?? []
    return todosLS;
    }
  ); //
  const [isEditing, setEditing] = useState({
    edit: false,
    gId: "",
  });

  const [filter, setFilter] = useState(ALL);

  const onAddTodo = () => {
    if (!input) return;
    else {
      alert("entered value successfully");
    }
    const newTodo = {
      id: uuidv4().split("-")[0],
      text: input,
      completed: false,
    };
    setTodo([...todo, newTodo]);
    setInput("");
  };

  const onDeleteTodo = (id) => {
    //filter method
    //const deleteArr=todo.filter(el =>  el.id !==id)
    //console.log(id)
    //setTodo(deleteArr)
    //console.log(deleteArr)

    // splice method
    const fIndex = todo.findIndex((ele) => ele.id == id);
    const cloneArr = [...todo];
    console.log(fIndex);
    //if(fIndex !== -1)
    cloneArr.splice(fIndex, 1);
    setTodo(cloneArr);
  };

  const onEditTodo = (id) => {
    //console.log(id)
    const editUpdate = todo.find((ele) => ele.id === id);
    console.log(editUpdate);
    setInput(editUpdate.text);
    setEditing({ edit: true, gId: id });
  };

  const onUpdateTodo = () => {
    const gooId = isEditing.gId;
    const onUpdateArr = todo.findIndex((ele) => (ele.id = gooId));
    const cloneArr = [...todo];
    cloneArr[onUpdateArr] = {
      id: gooId,
      text: input,
    };
    setTodo(cloneArr);
    setInput("");
    setEditing({
      edit: false,
      gId: "",
    });
    //console.log(cloneArr)
    //console.log(onUpdateArr)
    //console.log(isEditing.gId)
  };

  useEffect(()=>{
console.log("use effect called")
localStorage.setItem("todos", JSON.stringify(todo))
  },[todo])

  const onCompleteHandler = (e) => {
    const onUpdateArr = todo.findIndex((ele) => (ele.id = e.id));
    const cloneArr = [...todo];
    cloneArr[onUpdateArr] = {
      id: e.id,
      text: e.text,
      completed: !e.completed,
    };
    setTodo(cloneArr);
  };

  return (
    <div className="conatiner">
      <div className="fs-4 my-3">Todo App</div>
      <div className="d-flex justify-content-center">
        <input
          type="text"
          className="form-control me-2 w-50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {isEditing.edit ? (
          <button className="btn btn-warning" onClick={onUpdateTodo}>
            Update
          </button>
        ) : (
          <button className="btn btn-success" onClick={onAddTodo}>
            Add
          </button>
        )}
      </div>

      <div className="d-flex justify-content-evenly my-2">
        <button className={`${filter === ALL ? "btn-info" : ""} btn`}
        onClick={()=>setFilter(ALL)}>
          All
        </button>
        <button className={`${filter === COMPLETED ? "btn-info" : ""} btn`}
        onClick={()=>setFilter(COMPLETED)}>
          Completed
        </button>
        <button className={`${filter === PENDING ? "btn-info" : ""} btn`}
        onClick ={()=>setFilter(PENDING)}>
          Pending
        </button>
      </div>
      <div className="row mt-3">
        {todo.length>0 && 
        filter===ALL && todo.map((e) => (
          <TodoDetails
            key={e.id}
            e={e}
            onEditTodo={onEditTodo}
            onDeleteTodo={onDeleteTodo}
            isEditing={isEditing}
            onCompleteHandler={onCompleteHandler}
          />
        ))}
     {todo.length>0 && 
        filter===COMPLETED && todo.map((e) => (
          e.completed &&
          <TodoDetails
            key={e.id}
            e={e}
            onEditTodo={onEditTodo}
            onDeleteTodo={onDeleteTodo}
            isEditing={isEditing}
            onCompleteHandler={onCompleteHandler}
          />
        ))}
        {todo.length>0 && 
        filter===PENDING && todo.map((e) => (
         !e.completed && <TodoDetails
            key={e.id}
            e={e}
            onEditTodo={onEditTodo}
            onDeleteTodo={onDeleteTodo}
            isEditing={isEditing}
            onCompleteHandler={onCompleteHandler}
          />
        ))}

      </div>
    </div>
  )
        }
        export default Todo