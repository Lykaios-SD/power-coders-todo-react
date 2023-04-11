import { useEffect, useState } from "react"
import useServer from "../hooks/useServer.js"

function Todos() {
  const { get, post } = useServer()
  const [todos, setTodos] = useState([])

  const getTodos = async () => {
    const { data } = await get({ url: '/todos'})
    setTodos(data)
  }

  const createTodoHandler = async (e) => {
    e.preventDefault()

    const todo = Object.fromEntries(new FormData(e.target))
    const { data } = await post({url: '/todos', body: todo})

    setTodos([...todos, data]) 
  }

  useEffect(() => {
    getTodos()
  }, [])

  useEffect(() => {
    console.log(todos)
  }, [todos])

  return <>
    <h1>ToDos</h1>
    { todos && <ul> 
      {todos.map(todo => <li key={todo.id}>{todo.content}</li>)}
    </ul> }

      <form onSubmit={createTodoHandler}>
        <input type="text" name="content"/>
        <button type="submit">Crear Todo</button>
      </form>
  </>
}

export default Todos
