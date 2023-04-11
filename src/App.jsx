import { Route, Routes } from "react-router-dom"
import NavBar from "./components/Navbar.jsx"
import { PrivateRoutes } from "./components/PrivateRoutes.jsx"

// Views
import Index from "./views/index.jsx"
import Login from "./views/login.jsx"
import Todos from "./views/todos.jsx"

function App() {
  
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path="/" element= {<Index />} />
      <Route path="/login" element= {<Login />} />

      <Route element={<PrivateRoutes />}>
        <Route path="/todos" element= {<Todos />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
