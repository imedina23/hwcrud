

import React, {useState, useEffect} from 'react'
import { isEmpty, size, set, result } from 'lodash'
import { addDocument, deleteDocument, getCollection, updateDocument } from './actions'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)


  useEffect(() => {
    (async () => {
      const result = await getCollection("tasks")
      if (result.statusResponse){
        setTasks(result.data)
      }
      
    })()
  }, [])
  

  const validForm =() => {
    let isValid = true
    setError(null)

    if (isEmpty(task)){
      setError("Must enter an item")
      isValid = false
      return
   }

   return isValid

  }

  const addTask = async(e) =>{
     e.preventDefault()

     if (!validForm()){
       return
     }

     const result = await addDocument("tasks", {name: task})

     if(!result.statusResponse){
        setError(result.error)
        return
     }

    

     setTasks([ ...tasks, { id: result.data.id, name: task } ])
     
     setTask("")
  }

  const deleteTask = async(id) => {

    const result = await deleteDocument("tasks", id)

    if(!result.statusResponse){
      setError(result.error)
      return
    }

    const filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
  }

  const editTask = (theTask) => {
    
    setEditMode(true)
    setId(theTask.id)
    setTask(theTask.name)

  }

  const saveTask =async(e) =>{
    e.preventDefault()
    
    if (!validForm()){
      return
    }

    const  result = await updateDocument("tasks", id, {name: task})
    if (!result.statusResponse){
      setError(result.error)
      return
    }

    const editedTasks = tasks.map(item => item.id === id ? {id, name:task} : item)
    setTasks(editedTasks)
    setEditMode(false)
    setTask("")
    setId("")
 }

  

 
  return (
    <div className="container mt-5">
      <h1>Homework</h1>
      <hr/>

      <div className="row">
        <div className="col-4">
            <h4 className="text-center">HW List</h4>
          {
            size(tasks) == 0 ? (
              <li className="list-group-item">No Task</li>
            ) : (
              <ul  className="list-group">

              {
                tasks.map((task) => (
                  <li className="list-group-item" key={task.id}>
                  <span className="lead">{task.name}</span>
                  <button className="btn btn-danger btn-sm float-right mx-2"
                  onClick={() => deleteTask(task.id)}
                  >
                    Delete
                    </button>
                  <button className="btn btn-warning btn-sm float-right mx-2"
                  onClick={() => editTask(task)}
                  >
                    Edit
                    </button>
                </li>
                ))
                
              
              }

          </ul>
            )

           
          }
        </div>
        <div className="col-4">
        <h4 className="text-center">
          {editMode ? "Modify List" : "ADD To List"}
        </h4>
        <form onSubmit={editMode ? saveTask : addTask}>
          {
            error && <span className="text-danger mb-2">{error}</span>
          }
          <input type="text"
          className="form-control mb-2"
           placeholder="Enter To List"
          onChange={(text)=> setTask(text.target.value)}
          value={task}
          />
         
          <button className={editMode ? "btn btn-warning btn-block " :  "btn btn-dark btn-block"} 
          type="submit"
          >
            {editMode ?  "Save" : "Add" }
          </button>
        </form>
        </div>

      </div>
    </div>
    )
}

export default App;
