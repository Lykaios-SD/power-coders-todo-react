import { useEffect, useState } from "react"
import useServer from "../hooks/useServer.js"
import Todo from "../components/Todo.jsx"

function Todos() {
  const { get, post, delete: destroy, put } = useServer()
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

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

  const deleteTodoHandler = async (id) => {
    console.log(id)
    const { data } = await destroy({url: `/todos/${id}`})
    if (data.deleted) {
      const newList = todos.filter(todo => todo.id !== id) 
      setTodos(newList)
    }
  }

  const checkButtonHandler = async ({ id, done }) => {
    console.log({ id, done })
    const { data } = await put({ url:`/todos/${id}`, body: {done} })
    if (!data) return

    const index = todos.findIndex(todo => todo.id === data.id)
    // console.log(index)
    todos[index] = data
    setTodos([...todos])
  }

  const inputChangeHandler = ({target}) => {
    setInputValue(target.value)
  }

  useEffect(() => {
    getTodos()
  }, [])

  // useEffect(() => {
  //   console.log(todos)
  // }, [todos])

  return <>
    <h1>ToDos</h1>
    { todos && <ul> 
      {todos.map(todo => <Todo  key={todo.id} todo={todo} deleteTodo={deleteTodoHandler} checkButton= {checkButtonHandler}/>)}
    </ul> }

      <form onSubmit={createTodoHandler}>
        <input type="text" name="content" value={inputValue} onChange={inputChangeHandler}/>
        <button type="submit">Crear Todo</button>
      </form>
  </>
}

export default Todos
