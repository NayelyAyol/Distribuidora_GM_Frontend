import { Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./features/auth/pages/LoginPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App