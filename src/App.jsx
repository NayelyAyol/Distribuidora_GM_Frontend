import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import Landing from "./pages/Landing"
import Login from "./features/auth/pages/LoginPage"
import Register from "./features/auth/pages/RegisterPage"

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App