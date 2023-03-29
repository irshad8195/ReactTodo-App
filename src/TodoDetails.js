import React from 'react'
//import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css'

const TodoDetails = ({e, onEditTodo, onDeleteTodo,isEditing,onCompleteHandler}) => {
  return (
    <div>
      <>
     
      <div className='col-6 text-start'>
        <span onClick={()=>onCompleteHandler(e)}>
        {e.completed ? (<i className="fa-regular fa-sm fa-circle-check me-2"></i>
       ):( <i className="fa-solid fa-stopwatch me-2"></i>)}
        </span>
        {e.text}</div>
      <div className='col-5 mt-4'>
        <button className='btn btn-success me-3' 
        onClick={()=>onEditTodo(e.id)} 
        disabled={isEditing.edit}
        >Edit</button>
        <button className='btn btn-primary'
         onClick={()=>onDeleteTodo(e.id)}>Delete</button>
      </div>
      </>
    </div>
  )
}

export default TodoDetails

